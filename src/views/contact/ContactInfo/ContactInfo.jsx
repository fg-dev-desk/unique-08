import React from 'react';

// data
const contactInfoData = {
  contactInfo: [
    {
      icon: "fal fa-map-marker-alt",
      title: "Dirección de Oficina",
      content: "Av. Revolución 1234, CDMX"
    },
    {
      icon: "fal fa-phone",
      title: "Llámanos",
      content: "+52 55 1234 5678"
    },
    {
      icon: "fal fa-envelope",
      title: "Escríbenos",
      content: "contacto@uniquemotors.mx"
    },
    {
      icon: "fal fa-clock",
      title: "Horario de Atención",
      content: "Lun - Vie (9:00AM - 6:00PM)"
    }
  ]
};

const ContactInfo = () => {
  // render
  return (
    <div className="contact-area py-120">
      <div className="container">
        <div className="contact-content">
          <div className="row">
            {contactInfoData.contactInfo.map((info, index) => (
              <div key={index} className="col-md-3">
                <div className="contact-info">
                  <div className="contact-info-icon">
                    <i className={info.icon}></i>
                  </div>
                  <div className="contact-info-content">
                    <h5>{info.title}</h5>
                    <p>{info.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;