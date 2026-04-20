import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { withTranslation, type WithTranslation } from "react-i18next";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps & WithTranslation, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps & WithTranslation) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught: ", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    const { t } = this.props;
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
          <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-error/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
              <div className="relative bg-error/10 p-6 rounded-3xl border border-error/20">
                <AlertCircle className="w-16 h-16 mx-auto text-error" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight text-base-content sm:text-5xl">
                {t('errors.boundaryTitle')}
              </h1>
              <p className="text-lg text-base-content/70">
                {t('errors.boundaryDesc')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button
                onClick={this.handleReload}
                className="btn btn-error btn-lg gap-2 w-full sm:w-auto hover:scale-105 transition-transform shadow-lg shadow-error/20"
              >
                <RefreshCcw className="w-5 h-5" />
                {t('errors.refreshPage')}
              </button>
              <button
                onClick={this.handleGoHome}
                className="btn btn-ghost btn-lg gap-2 w-full sm:w-auto hover:bg-base-200 transition-colors"
              >
                <Home className="w-5 h-5" />
                {t('errors.backToHome')}
              </button>
            </div>

            <div className="pt-12 text-xs text-base-content/40 font-mono">
              ERROR_ID: {Math.random().toString(36).substring(7).toUpperCase()}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundaryWithTranslation = withTranslation()(ErrorBoundary);
export default ErrorBoundaryWithTranslation;