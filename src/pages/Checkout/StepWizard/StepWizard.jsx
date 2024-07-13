import React from 'react'
import './StepWizard.scss'

const StepWizard = () => {
    return (
        <section class="step-wizard">
            <ul class="step-wizard-list">
                <li class="step-wizard-item ">
                    <span class="progress-count ">1</span>
                    <span class="progress-label">Shipping</span>
                </li>
                <li class="step-wizard-item ">
                    <span class="progress-count">2</span>
                    <span class="progress-label">Billing</span>
                </li>
                <li class="step-wizard-item current-item">
                    <span class="progress-count ">3</span>
                    <span class="progress-label">Complete</span>
                </li>
            </ul>
        </section>
    )
}

export default StepWizard