import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message || "Something went wrong while loading this section.",
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="card">
          <div className="login-error">{this.state.message}</div>
        </div>
      );
    }

    return this.props.children;
  }
}
