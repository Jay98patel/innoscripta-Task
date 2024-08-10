import React from "react";
import { ErrorContext } from "../components/ErrorContext";

interface Props {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<Props> {
  static contextType = ErrorContext;
  context!: React.ContextType<typeof ErrorContext>;

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.context.setError(true);
  }

  render() {
    if (this.context.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <button onClick={() => this.context.setError(false)}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
