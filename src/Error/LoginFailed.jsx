import React from "react";
import ErrorCard from "./ErrorCard";

const LoginFailed = ({ message = "We couldn’t sign you in. Please check your email and password and try again.", onRetry }) => {
  return (
    <ErrorCard
      title="Login failed"
      message={message}
      onRetry={onRetry}
      actionLabel="Try again"
      compact
    />
  );
};

export default LoginFailed;
