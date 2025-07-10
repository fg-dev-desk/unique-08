import React from 'react';
import { usePersonalInfo } from './usePersonalInfo';
import personalInfoData from './personalInfoData.json';

const PersonalInfo = ({ formData, updateFormData }) => {
  const { handleInputChange } = usePersonalInfo({ formData, updateFormData });

  return (
    <div className="row">
      <div className="col-md-12 mb-4">
        <h5 className="mb-3">
          <i className="fas fa-user me-2"></i>
          {personalInfoData.title}
        </h5>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>
            <i className="fas fa-user me-2"></i>
            {personalInfoData.fields.nombre.label}
          </label>
          <input
            type="text"
            className="form-control"
            value={formData.nombre}
            onChange={(e) => handleInputChange('nombre', e.target.value)}
            placeholder={personalInfoData.fields.nombre.placeholder}
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>
            <i className="fas fa-envelope me-2"></i>
            {personalInfoData.fields.email.label}
          </label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder={personalInfoData.fields.email.placeholder}
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>
            <i className="fas fa-phone me-2"></i>
            {personalInfoData.fields.telefono.label}
          </label>
          <input
            type="tel"
            className="form-control"
            value={formData.telefono}
            onChange={(e) => handleInputChange('telefono', e.target.value)}
            placeholder={personalInfoData.fields.telefono.placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;