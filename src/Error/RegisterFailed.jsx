import React from "react";
import ErrorCard from "./ErrorCard";

const RegisterFailed = ({ message = "We couldn’t create your account. Please try again with valid details.", onRetry }) => {
  return (
    <ErrorCard
      title="Registration failed"
      message={message}
      onRetry={onRetry}
      actionLabel="Try again"
      compact
    />
  );
};

export default RegisterFailed;
