import React from 'react';

import PersonalInfo from './PersonalInfo/PersonalInfo';
import CarInfo from './CarInfo/CarInfo';
import PhotosInfo from './PhotosInfo/PhotosInfo';
import SellConfirmation from '../SellConfirmation/SellConfirmation';

import { useSellWizard } from './useSellWizard';

const SellWizard = () => {
  const {
    sellWizardHelpers,
    sellWizardData,
    currentStep,
    showConfirmation,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    handleSubmit,
    handleNewSubmission
  } = useSellWizard();

  if (showConfirmation) {
    return (
      <SellConfirmation 
        formData={formData}
        onNewSubmission={handleNewSubmission}
      />
    );
  }

  return (
    <div className="sell-wizard-area py-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            
            {/* Header */}
            <div className="text-center mb-5">
              <div className="site-heading">
                <span className="site-title-tagline">
                  <i className="fas fa-car"></i> {sellWizardData.header.tagline}
                </span>
                <h2 className="site-title">
                  {sellWizardData.header.title.before} <span>{sellWizardData.header.title.highlight}</span> {sellWizardData.header.title.after}
                </h2>
                <p>{sellWizardData.header.description}</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="row mb-5">
              {sellWizardData.steps.map((step, index) => (
                <div key={step.number} className="col-md-4">
                  <div className={`wizard-step ${sellWizardHelpers.isStepActive(step.number) ? 'active' : ''}`}>
                    <div className="wizard-step-icon">
                      <i className={step.icon}></i>
                    </div>
                    <div className="wizard-step-content">
                      <h5>{step.title}</h5>
                      <p>{step.description}</p>
                    </div>
                    {index < sellWizardData.steps.length - 1 && (
                      <div className="wizard-step-connector"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Form Card */}
            <div className="wizard-form-card">
              <div className="wizard-form-header">
                <h4>
                  <i className={sellWizardHelpers.getCurrentStepData().icon}></i>
                  {sellWizardHelpers.getCurrentStepData().title}
                </h4>
              </div>
              
              <div className="wizard-form-body">
                {/* Step Components */}
                {currentStep === 1 && (
                  <PersonalInfo 
                    formData={formData} 
                    updateFormData={updateFormData} 
                  />
                )}
                
                {currentStep === 2 && (
                  <CarInfo 
                    formData={formData} 
                    updateFormData={updateFormData} 
                  />
                )}
                
                {currentStep === 3 && (
                  <PhotosInfo 
                    formData={formData} 
                    updateFormData={updateFormData} 
                  />
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="wizard-form-footer">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className={`theme-btn ${sellWizardHelpers.isFirstStep() ? 'disabled' : ''}`}
                    onClick={prevStep}
                    disabled={sellWizardHelpers.isFirstStep()}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    {sellWizardData.navigation.previous}
                  </button>
                  
                  <div className="step-indicator">
                    {sellWizardData.navigation.stepIndicator} {currentStep} {sellWizardData.navigation.of} {sellWizardData.steps.length}
                  </div>
                  
                  {!sellWizardHelpers.isLastStep() ? (
                    <button
                      type="button"
                      className="theme-btn"
                      onClick={nextStep}
                    >
                      {sellWizardData.navigation.next}
                      <i className="fas fa-arrow-right ms-2"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="theme-btn"
                      onClick={handleSubmit}
                    >
                      <i className="fas fa-check me-2"></i>
                      {sellWizardData.navigation.submit}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellWizard;