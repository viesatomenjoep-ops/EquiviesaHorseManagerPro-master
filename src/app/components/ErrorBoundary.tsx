import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="bg-white border border-rose-200 rounded-2xl shadow-xl p-8 max-w-2xl w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                <span className="text-rose-600 font-bold text-xl">!</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Oeps, er is iets misgegaan.</h1>
            </div>
            <p className="text-slate-600 mb-6">Er is een fout opgetreden bij het laden van dit onderdeel. De technische details staan hieronder:</p>
            
            <div className="bg-slate-900 rounded-xl p-4 overflow-auto max-h-96">
              <pre className="text-rose-400 font-mono text-sm whitespace-pre-wrap">
                {this.state.error?.toString()}
              </pre>
              <pre className="text-slate-400 font-mono text-xs mt-4 whitespace-pre-wrap">
                {this.state.errorInfo?.componentStack}
              </pre>
            </div>
            
            <div className="mt-6">
              <button 
                onClick={() => window.location.href = "/"}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
              >
                Terug naar Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
