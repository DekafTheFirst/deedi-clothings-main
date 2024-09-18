import React from 'react';
import './StatusElement.scss';
import { getOrderStatusDetails } from './utils/orderStatusUtils';



const StatusElement = ({ status }) => {

  const { statusToDisplay, styles } = getOrderStatusDetails(status);

  return (
    <div
      className={`status-element ${status}`}
      style={{ backgroundColor: styles.backgroundColor }}
    >
      <span
        className="status-dot"
        style={{ backgroundColor: styles.dotColor }}
      />
      <span
        className="status-label"
        style={{ color: styles.textColor }}
      >
        {statusToDisplay}
      </span>
    </div>
  );
};

export default StatusElement;
