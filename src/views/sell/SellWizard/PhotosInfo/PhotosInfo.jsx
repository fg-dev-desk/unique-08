import React from 'react';
import { usePhotosInfo } from './usePhotosInfo';
import photosInfoData from './photosInfoData.json';

const PhotosInfo = ({ formData, updateFormData }) => {
  const {
    dragActive,
    handleImageUpload,
    removeImage,
    handleDrop,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    getRemainingSlots
  } = usePhotosInfo({ formData, updateFormData });

  return (
    <div className="row">
      <div className="col-md-12 mb-4">
        <h5 className="mb-3">
          <i className="fas fa-camera me-2"></i>
          {photosInfoData.title}
        </h5>
        <p className="text-muted">
          {photosInfoData.description}
        </p>
      </div>
      
      {/* Upload Area */}
      <div className="col-md-12">
        <div 
          className={`upload-area ${dragActive ? 'drag-active' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <div className="upload-content">
            <i className="fas fa-cloud-upload-alt"></i>
            <h5>{photosInfoData.uploadArea.title}</h5>
            <p>{photosInfoData.uploadArea.subtitle}</p>
            <p className="text-muted small">{photosInfoData.uploadArea.formats}</p>
            <p className="text-muted small">{photosInfoData.uploadArea.maxFiles} ({getRemainingSlots()} restantes)</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="upload-input"
            />
          </div>
        </div>
      </div>

      {/* Preview Images */}
      {formData.images && formData.images.length > 0 && (
        <div className="col-md-12 mt-4">
          <h6>{photosInfoData.preview.title}</h6>
          <div className="row">
            {formData.images.map((image, index) => (
              <div key={index} className="col-md-3 mb-3">
                <div className="image-preview">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt={`Preview ${index + 1}`}
                    className="preview-img"
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => removeImage(index)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="col-md-12 mt-4">
        <div className="summary-card">
          <h6><i className="fas fa-check-circle me-2"></i>{photosInfoData.summary.title}</h6>
          <div className="row">
            <div className="col-md-6">
              <p><strong>{photosInfoData.summary.fields.vendedor}:</strong> {formData.nombre}</p>
              <p><strong>{photosInfoData.summary.fields.email}:</strong> {formData.email}</p>
              <p><strong>{photosInfoData.summary.fields.telefono}:</strong> {formData.telefono}</p>
            </div>
            <div className="col-md-6">
              <p><strong>{photosInfoData.summary.fields.vehiculo}:</strong> {formData.marca} {formData.modelo} {formData.año}</p>
              <p><strong>{photosInfoData.summary.fields.precio}:</strong> ${formData.precio}</p>
              <p><strong>{photosInfoData.summary.fields.fotos}:</strong> {formData.images ? formData.images.length : 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotosInfo;