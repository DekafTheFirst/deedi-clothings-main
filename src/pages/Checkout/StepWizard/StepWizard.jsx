import React from 'react';
import './StepWizard.scss';
import StepWizardItem from './StepWizardItem/StepWizardItem';
import { useSelector } from 'react-redux';

const StepWizard = () => {

  const steps = [
    { label: 'Shipping', step: 1 },
    { label: 'Billing', step: 2 },
    { label: 'Complete', step: 3 },
  ];

  

  return (
    <section className="step-wizard">
      <ul className="step-wizard-list">
        {steps.map((stepItem, index) => (
          <StepWizardItem key={index}  stepItem={stepItem}/>
        ))}
      </ul>
    </section>
  );
};

export default StepWizard;
