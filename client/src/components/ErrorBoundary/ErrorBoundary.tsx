import React from 'react';
import { Redirect } from 'react-router';
import * as sentry from '@sentry/browser';

import { paths } from 'src/constants';

interface State {
  error: boolean;
}

class ErrorBoundary extends React.Component<{}, State> {
  state = { error: false };

  static getDerivedStateFromError = () => ({ error: true });

  componentDidCatch = (error: Error, errorInfo: React.ErrorInfo) => {
    sentry.captureException(error, {
      level: sentry.Severity.Fatal,
      extra: {
        errorInfo,
      },
    });
  };

  render = () => {
    if (this.state.error) {
      return <Redirect to={paths.error(500)} />;
    }
    return this.props.children;
  };
}

export default ErrorBoundary;
