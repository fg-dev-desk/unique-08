import React, { useState } from 'react';

// data
const contactData = {
  form: {
    title: "Contáctanos",
    description: "¿Tienes alguna pregunta sobre nuestras subastas de vehículos? Estamos aquí para ayudarte. Envíanos un mensaje y nos pondremos en contacto contigo lo antes posible.",
    placeholders: {
      name: "Tu Nombre",
      email: "Tu Correo Electrónico",
      subject: "Asunto",
      message: "Escribe tu mensaje"
    },
    buttons: {
      submit: "Enviar Mensaje",
      submitting: "Enviando..."
    }
  },
  messages: {
    success: "¡Gracias! Tu mensaje ha sido enviado exitosamente.",
    error: "Lo sentimos, hubo un error al enviar tu mensaje. Por favor intenta de nuevo."
  },
  image: {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Contacto"
  }
};

const ContactForm = () => {
  // state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitMessage(contactData.messages.success);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitMessage(contactData.messages.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // render
  return (
    <div className="contact-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <div className="contact-img">
              <img src={contactData.image.src} alt={contactData.image.alt} />
            </div>
          </div>
          <div className="col-lg-6 align-self-center">
            <div className="contact-form">
              <div className="contact-form-header">
                <h2>{contactData.form.title}</h2>
                <p>
                  {contactData.form.description}
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        name="name"
                        placeholder={contactData.form.placeholders.name}
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input 
                        type="email" 
                        className="form-control" 
                        name="email"
                        placeholder={contactData.form.placeholders.email} 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    name="subject"
                    placeholder={contactData.form.placeholders.subject} 
                    value={formData.subject}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    name="message" 
                    cols="30" 
                    rows="5" 
                    className="form-control"
                    placeholder={contactData.form.placeholders.message}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="theme-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? contactData.form.buttons.submitting : contactData.form.buttons.submit} 
                  <i className="far fa-paper-plane"></i>
                </button>
                <div className="col-md-12 mt-3">
                  <div className={`form-messege ${submitMessage.includes('Thank you') ? 'text-success' : 'text-danger'}`}>
                    {submitMessage}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;