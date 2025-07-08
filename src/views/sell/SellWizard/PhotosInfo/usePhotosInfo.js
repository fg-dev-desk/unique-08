import { useState } from 'react';

export const usePhotosInfo = ({ formData, updateFormData }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const maxImages = 5;
      const currentImages = formData.images || [];
      const newImages = [...currentImages, ...files].slice(0, maxImages);
      updateFormData('images', newImages);
    }
  };

  const removeImage = (index) => {
    const currentImages = formData.images || [];
    const newImages = currentImages.filter((_, i) => i !== index);
    updateFormData('images', newImages);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const maxImages = 5;
      const currentImages = formData.images || [];
      const newImages = [...currentImages, ...files].slice(0, maxImages);
      updateFormData('images', newImages);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const validateImages = () => {
    const currentImages = formData.images || [];
    if (currentImages.length === 0) {
      return 'Debe subir al menos una imagen';
    }
    return null;
  };

  const getRemainingSlots = () => {
    const currentImages = formData.images || [];
    return 5 - currentImages.length;
  };

  return {
    dragActive,
    handleImageUpload,
    removeImage,
    handleDrop,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    validateImages,
    getRemainingSlots
  };
};