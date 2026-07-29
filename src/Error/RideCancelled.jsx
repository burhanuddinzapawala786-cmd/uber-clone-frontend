import React from "react";
import ErrorCard from "./ErrorCard";

const RideCancelled = ({ message = "The ride was cancelled. You can try booking again whenever you’re ready.", onRetry }) => {
  return (
    <ErrorCard
      title="Ride cancelled"
      message={message}
      onRetry={onRetry}
      actionLabel="Book again"
      compact
    />
  );
};

export default RideCancelled;
