import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep, setPreviewedStep } from '../../../../redux/checkoutReducer'

const StepWizardItem = ({ stepItem }) => {
    const dispatch = useDispatch()
    const currentStep = useSelector(state => state.checkout.currentStep);
    const previewedStep = useSelector(state => state.checkout.previewedStep);

    // console.log('previewedStep',previewedStep);
    // console.log((currentStep.id === stepItem.id || previewedStep?.id === stepItem.id))
    const handleClick = () => {
        if (currentStep.completed) {
            dispatch(setPreviewedStep(stepItem.id)); // Dispatch action to set current step
        }
        // console.log('currentStep', currentStep, '\n\n', 'stepItem.step', stepItem.id)
    };

    return (
        <li
            className={`step-wizard-item ${(currentStep.id === stepItem.id) ? 'current-item' : ''} ${previewedStep?.id === stepItem.id && currentStep.id !== stepItem.id ? 'previewed-item': ''}`}
            onClick={handleClick}
        >
            <span className="progress-count">{stepItem.id}</span>
            <span className="progress-label">{stepItem.label}</span>
        </li>
    )
}

export default StepWizardItem