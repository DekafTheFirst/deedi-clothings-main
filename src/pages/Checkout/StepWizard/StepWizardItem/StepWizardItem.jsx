import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearPreviewedStep, setCurrentStep, setPreviewedStep } from '../../../../redux/checkoutReducer'
import { getCompletedStepsFromSession, getCurrentStepFromSession } from '../../../../utils/session';

const StepWizardItem = ({ stepItem }) => {
    const dispatch = useDispatch()
    
    const currentStep = useSelector(state => state.checkout.currentStep);
    const previewedStep = useSelector(state => state.checkout.previewedStep);
    const completedSteps = useSelector(state => state.checkout.completedSteps);
    // console.log('currentStep', currentStep, '\n\n', 'previewed step', previewedStep?.id);

    const completedStepsFromSession = getCompletedStepsFromSession();
    const currentStepFromSession = getCurrentStepFromSession();
    

    const stepHasBeenCompleted = completedSteps.some((item) => item.id === stepItem.id);

    const handleClick = () => {
        if (currentStep.id == stepItem.id && previewedStep) {
            dispatch(clearPreviewedStep())
        }

        if (stepHasBeenCompleted) {
            dispatch(setPreviewedStep(stepItem.id));
        }
    };

    return (
        <li
            className={`
                step-wizard-item 
                ${currentStep.id === stepItem.id ? 'current-item' : ''} 
                ${previewedStep && previewedStep.id !== stepItem.id && currentStep.id == stepItem.id ? 'current-but-previewing-others' : ''}
                ${previewedStep?.id === stepItem.id && currentStep.id !== stepItem.id ? 'previewed-item' : ''}
            `}
            onClick={handleClick}
        >
            <span className="progress-count">{stepItem.id}</span>
            <span className="progress-label">{stepItem.label}</span>
        </li>
    )
}

export default StepWizardItem