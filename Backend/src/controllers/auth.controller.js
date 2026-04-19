import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import { createStreamUser } from "../lib/stream.js";

export async function signup(req, res) {
  const { email, password, fullName } = req.body;

  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(400)
        .json({ message: "Email already exists, please use different one." });

    const index = Math.floor(Math.random() * 100) + 1;

    const randomAvathar = `https://avatar.iran.liara.run/public/${index}.png`;

    const newUser = await User.create({
      email,
      fullName,
      password,
      profilePic: randomAvathar,
    });

    try {
      await createStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });

      console.log(`Stream User created ${newUser.fullName}`);
    } catch (error) {
      console.error("Error creating a steam user");
    }

    if (newUser) {
      // generate jwt token here
      const token = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "7d",
        }
      );

      res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      await newUser.save();

      res.status(201).json({ success: true, user: newUser });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = await User.findOne({ email });
    const isPassworCorrect = await user.matchPassword(password);
    if (!user || !isPassworCorrect)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout successful" });
}

export async function onboard(req, res) {
  try {
    const userId = req.user._id;
    const { fullName, bio, nativeLanguage, learningLanguage, location } =
      req.body;

    if (
      !fullName ||
      !bio ||
      !nativeLanguage ||
      !learningLanguage ||
      !location
    ) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnBoarded: true,
      },
      { new: true }
    );

    if (!updateUser) return res.status(404).json({ message: "User not found" });

    try {
      await createStreamUser({
        id: updateUser._id.toString(),
        name: updateUser.fullName,
        image: updateUser.profilePic || "",
      });
      console.log("Stream User Updated after anboarding");
    } catch (error) {
      console.error("Error updating stream user during onboard", error.message);
    }

    res.status(200).json({ success: true, user: updateUser });
  } catch (error) {
    console.error("On boarding error");
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function updateProfile(req, res) {
  try {
    const { profilePic, profilePicType = "image" } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    // Validation for uploaded images
    if (profilePicType === "image") {
      // Check if it's a valid Base64 image
      if (!profilePic.startsWith("data:image/")) {
        return res.status(400).json({ message: "Invalid image format" });
      }

      // Approximate size check (Base64 is ~33% larger than binary)
      // 2MB binary is ~2.7MB Base64
      const sizeInBytes = (profilePic.length * 3) / 4;
      if (sizeInBytes > 2 * 1024 * 1024) {
        return res.status(400).json({ message: "Image size must be less than 2MB" });
      }
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has updated their profile pic in the last week
    if (user.lastProfilePicUpdate) {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      if (user.lastProfilePicUpdate > oneWeekAgo) {
        const nextAvailableDate = new Date(user.lastProfilePicUpdate);
        nextAvailableDate.setDate(nextAvailableDate.getDate() + 7);

        return res.status(403).json({
          message: "You can only update your profile picture once a week",
          nextAvailableDate: nextAvailableDate.toISOString(),
        });
      }
    }

    user.profilePic = profilePic;
    user.profilePicType = profilePicType;
    user.lastProfilePicUpdate = new Date();
    await user.save();

    // Sync with Stream AI
    try {
      await createStreamUser({
        id: user._id.toString(),
        name: user.fullName,
        image: profilePicType === "image" ? user.profilePic : "", // GetStream might not handle avatar JSON strings well, so we pass empty or we could pass a default URL
      });
      console.log("Stream User Profile Pic Updated");
    } catch (error) {
      console.error("Error updating stream user profile pic", error.message);
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Update profile error", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
