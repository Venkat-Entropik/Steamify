import { capitialize } from "../utils/utils";

describe("Capitilize util", () => {
  test("Should capitalize the word", () => {
    const nameOfThisProject = "streamify";
    expect(capitialize(nameOfThisProject)).toBe("Streamify");
  });

  test("Should not capitalize the word with sTreaMify", () => {
    const nameOfThisProject = "sTreaMify";
    expect(capitialize(nameOfThisProject)).not.toBe("Streamify");
  });

  test("Should capitalize the word with sTreaMify", () => {
    const nameOfThisProject = "sTreaMify";
    expect(capitialize(nameOfThisProject)).not.toBe("StreaMify");
  });
});
