import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export const useProfileSettings = () => {
  const { user } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  // Profile Update Form State
  const [profileData, setProfileData] = useState({
    firstName: user?.nombre?.split(' ')[0] || '',
    lastName: user?.nombre?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.telefono || '',
    address: user?.direccion || ''
  });

  // Password Change Form State
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (profileErrors[name]) {
      setProfileErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateProfileForm = (validation) => {
    const errors = {};
    
    if (!profileData.firstName) {
      errors.firstName = validation.firstNameRequired;
    }
    
    if (!profileData.lastName) {
      errors.lastName = validation.lastNameRequired;
    }
    
    if (!profileData.email) {
      errors.email = validation.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      errors.email = validation.emailInvalid;
    }
    
    return errors;
  };

  const validatePasswordForm = (validation) => {
    const errors = {};
    
    if (!passwordData.oldPassword) {
      errors.oldPassword = validation.currentPasswordRequired;
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = validation.newPasswordRequired;
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = validation.passwordMinLength;
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = validation.confirmPasswordRequired;
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = validation.passwordsDoNotMatch;
    }
    
    return errors;
  };

  const handleProfileSubmit = async (e, validation, labels) => {
    e.preventDefault();
    const errors = validateProfileForm(validation);
    
    if (Object.keys(errors).length === 0) {
      setIsUpdatingProfile(true);
      try {
        // TODO: Dispatch update profile action
        const updateData = {
          nombre: `${profileData.firstName} ${profileData.lastName}`,
          email: profileData.email,
          telefono: profileData.phone,
          direccion: profileData.address
        };
        console.log('Update profile:', updateData);
        
        // Simulate API call
        setTimeout(() => {
          setIsUpdatingProfile(false);
          alert(labels.profileUpdatedSuccessfully);
        }, 2000);
      } catch (error) {
        setIsUpdatingProfile(false);
        console.error('Error updating profile:', error);
      }
    } else {
      setProfileErrors(errors);
    }
  };

  const handlePasswordSubmit = async (e, validation, labels) => {
    e.preventDefault();
    const errors = validatePasswordForm(validation);
    
    if (Object.keys(errors).length === 0) {
      setIsChangingPassword(true);
      try {
        // TODO: Dispatch change password action
        console.log('Change password:', {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword
        });
        
        // Simulate API call
        setTimeout(() => {
          setIsChangingPassword(false);
          setPasswordData({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
          alert(labels.passwordChangedSuccessfully);
        }, 2000);
      } catch (error) {
        setIsChangingPassword(false);
        console.error('Error changing password:', error);
      }
    } else {
      setPasswordErrors(errors);
    }
  };

  return {
    profileData,
    passwordData,
    profileErrors,
    passwordErrors,
    isUpdatingProfile,
    isChangingPassword,
    handleProfileChange,
    handlePasswordChange,
    handleProfileSubmit,
    handlePasswordSubmit
  };
};