import React from "react";
import ErrorCard from "./ErrorCard";

const NoDriver = ({ message = "No driver is available right now. Please try again in a moment.", onRetry }) => {
  return (
    <ErrorCard
      title="No driver available"
      message={message}
      onRetry={onRetry}
      actionLabel="Retry"
      compact
    />
  );
};

export default NoDriver;
