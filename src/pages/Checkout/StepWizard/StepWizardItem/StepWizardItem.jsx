import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep, setPreviewedStep } from '../../../../redux/checkoutReducer'

const StepWizardItem = ({ stepItem }) => {
    const dispatch = useDispatch()
    const currentStep = useSelector(state => state.checkout.currentStep);
    const previewedStep = useSelector(state => state.checkout.previewedStep);
    const completedSteps = useSelector(state => state.checkout.completedSteps);
    console.log('currentStep', currentStep, '\n\n', 'previewed step', previewedStep?.id);

    const stepHasBeenCompleted = completedSteps.some((item) => item.id === stepItem.id );

    if(stepHasBeenCompleted) console.log(stepItem.title, stepHasBeenCompleted);
    // console.log('previewedStep',previewedStep);
    // console.log((currentStep.id === stepItem.id || previewedStep?.id === stepItem.id))
    const handleClick = () => {
        if (stepHasBeenCompleted) {
            dispatch(setPreviewedStep(stepItem.id)); // Dispatch action to set current step
        }
    };

    return (
        <li
            className={`
                step-wizard-item 
                ${currentStep.id === stepItem.id ? 'current-item' : ''} 
                ${previewedStep && previewedStep !== currentStep && currentStep !== stepItem.id ? 'current-but-previewing-others' : ''}
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