import React, { useState } from 'react';
import './StepWizard.scss';
import StepWizardItem from './StepWizardItem/StepWizardItem';
import { useSelector } from 'react-redux';
import { steps } from '../../../redux/checkout/checkoutReducer';



const StepWizard = () => {
  return (
    <section className="step-wizard">
      <ul className="step-wizard-list">
        {steps.map((stepItem) => (
          <StepWizardItem key={stepItem.id} stepItem={stepItem} />
        ))}
      </ul>
    </section>
  );
};

export default StepWizard;
