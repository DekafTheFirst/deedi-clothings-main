import React from 'react';
import './StatusElement.scss';

const StatusElement = ({ status }) => {
  const statusMapping = {
    all: "Orders",
    pending: "Pending",
    delivered: "Delivered",
    cancelled: "Cancelled"
  };

  const currentStatus = statusMapping[status] || "Unknown Status";

  return (
    <div className={`status-element ${status}`}>
      <span className="status-dot" />
      <span className="status-label">{currentStatus}</span>
    </div>
  );
};

export default StatusElement;
