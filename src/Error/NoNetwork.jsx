import React from "react";
import ErrorCard from "./ErrorCard";

const NoNetwork = ({ message = "Your connection seems unstable. Please check your network and try again.", onRetry }) => {
  return (
    <ErrorCard
      title="Network error"
      message={message}
      onRetry={onRetry}
      actionLabel="Retry"
      compact
    />
  );
};

export default NoNetwork;
