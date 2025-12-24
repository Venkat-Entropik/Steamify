import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Error caught: ", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div>Oops! Something went wrong.</div>;
    }
    return this.props.children; 
  }
}
export default ErrorBoundary;