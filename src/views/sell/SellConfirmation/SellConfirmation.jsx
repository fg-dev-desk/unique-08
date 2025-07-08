import React from 'react';

import { useSellConfirmation } from './useSellConfirmation';

const SellConfirmation = ({ formData, onNewSubmission }) => {
  const { sellConfirmationHelpers, sellConfirmationData } = useSellConfirmation();
  
  const orderId = sellConfirmationHelpers.generateOrderId();

  // render
  return (
    <div className="booking-confirm py-120">
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="booking-confirm-content">
              <i className="far fa-check"></i>
              <h3>{sellConfirmationData.confirmation.title}</h3>
              <p>{sellConfirmationData.confirmation.description}</p>
              <button onClick={onNewSubmission} className="theme-btn">
                {sellConfirmationData.confirmation.button}
              </button>
            </div>
          </div>
          <div className="col-md-8 mx-auto mt-5">
            <div className="booking-summary">
              <h3>{sellConfirmationData.summary.title} (#{orderId})</h3>
              <div className="booking-summary-content">
                <div className="row g-5">
                  <div className="col-lg-6">
                    <div className="booking-summary-list">
                      <h6>{sellConfirmationData.summary.sections.carInfo.title}</h6>
                      <ul>
                        <li>{sellConfirmationData.summary.sections.carInfo.fields.brand} <span>{sellConfirmationHelpers.getFieldValue(formData, 'marca')}</span></li>
                        <li>{sellConfirmationData.summary.sections.carInfo.fields.model} <span>{sellConfirmationHelpers.getFieldValue(formData, 'modelo')}</span></li>
                        <li>{sellConfirmationData.summary.sections.carInfo.fields.year} <span>{sellConfirmationHelpers.getFieldValue(formData, 'año')}</span></li>
                        <li>{sellConfirmationData.summary.sections.carInfo.fields.fuel} <span>{sellConfirmationHelpers.getFieldValue(formData, 'combustible')}</span></li>
                        <li>{sellConfirmationData.summary.sections.carInfo.fields.transmission} <span>{sellConfirmationHelpers.getFieldValue(formData, 'transmision')}</span></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="booking-summary-list">
                      <h6>{sellConfirmationData.summary.sections.carDetails.title}</h6>
                      <ul>
                        <li>{sellConfirmationData.summary.sections.carDetails.fields.mileage} <span>{sellConfirmationHelpers.formatMileage(formData.kilometraje)}</span></li>
                        <li>{sellConfirmationData.summary.sections.carDetails.fields.color} <span>{sellConfirmationHelpers.getFieldValue(formData, 'color')}</span></li>
                        <li>{sellConfirmationData.summary.sections.carDetails.fields.engine} <span>{sellConfirmationHelpers.getFieldValue(formData, 'motor')}</span></li>
                        <li>{sellConfirmationData.summary.sections.carDetails.fields.price} <span>{sellConfirmationHelpers.formatPrice(formData.precio)}</span></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="booking-summary-list">
                      <h6>{sellConfirmationData.summary.sections.personalInfo.title}</h6>
                      <ul>
                        <li>{sellConfirmationData.summary.sections.personalInfo.fields.name} <span>{sellConfirmationHelpers.getFieldValue(formData, 'nombre')}</span></li>
                        <li>{sellConfirmationData.summary.sections.personalInfo.fields.email} <span>{sellConfirmationHelpers.getFieldValue(formData, 'email')}</span></li>
                        <li>{sellConfirmationData.summary.sections.personalInfo.fields.phone} <span>{sellConfirmationHelpers.getFieldValue(formData, 'telefono')}</span></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="booking-summary-list">
                      <h6>{sellConfirmationData.summary.sections.submissionInfo.title}</h6>
                      <ul>
                        <li>{sellConfirmationData.summary.sections.submissionInfo.fields.submissionId} <span>#{orderId}</span></li>
                        <li>{sellConfirmationData.summary.sections.submissionInfo.fields.status} <span className="text-warning">{sellConfirmationData.summary.sections.submissionInfo.statusValue}</span></li>
                        <li>{sellConfirmationData.summary.sections.submissionInfo.fields.submissionDate} <span>{sellConfirmationHelpers.formatDate()}</span></li>
                        <li>{sellConfirmationData.summary.sections.submissionInfo.fields.images} <span>{sellConfirmationHelpers.getImageCount(formData.images)} {sellConfirmationData.summary.sections.submissionInfo.imagesUnit}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={sellConfirmationHelpers.handlePrint} className="theme-btn">
                {sellConfirmationData.summary.printButton} <i className="far fa-print"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellConfirmation;