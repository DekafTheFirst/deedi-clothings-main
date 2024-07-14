import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {setCurrentStep} from '../../../../redux/checkoutReducer'

const StepWizardItem = ({ stepItem }) => {
    const dispatch = useDispatch()
    const currentStep = useSelector(state => state.checkout.currentStep);

    const handleClick = () => {
        if (stepItem.step <= currentStep) {
            dispatch(setCurrentStep(stepItem.step)); // Dispatch action to set current step
        }
        console.log('currentStep', currentStep, '\n\n', 'stepItem.step', stepItem.step)
    };

    return (
        <li
            className={`step-wizard-item ${currentStep === stepItem.step ? 'current-item' : ''}`}
            onClick={handleClick}
        >
            <span className="progress-count">{stepItem.step}</span>
            <span className="progress-label">{stepItem.label}</span>
        </li>
    )
}

export default StepWizardItem