import React from 'react';

import { useFaqSection } from './useFaqSection';

const FaqSection = () => {
  const { faqHelpers, faqData } = useFaqSection();

  return (
    <div className="faq-area py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="faq-right">
              <div className="site-heading mb-3">
                <span className="site-title-tagline">
                  {faqData.content.tagline}
                </span>
                <h2 className="site-title my-3">
                  {faqData.content.title.before} <span>{faqData.content.title.highlight}</span> {faqData.content.title.after}
                </h2>
              </div>
              <p className="about-text">
                {faqData.content.description}
              </p>
              <div className="faq-img mt-3">
                <img src={faqData.image.src} alt={faqData.image.alt} />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            {faqHelpers.hasValidFaqs(faqData.faqs) && (
              <div className="accordion" id="accordionExample">
                {faqData.faqs.map((faq, index) => (
                  <div key={index} className="accordion-item">
                    <h2 className="accordion-header" id={faqHelpers.getHeadingId(faq)}>
                      <button 
                        className={faqHelpers.getAccordionClass(index)} 
                        type="button" 
                        data-bs-toggle="collapse"
                        data-bs-target={`#${faqHelpers.getAccordionId(faq)}`} 
                        aria-expanded={faqHelpers.getAriaExpanded(index)} 
                        aria-controls={faqHelpers.getAccordionId(faq)}
                      >
                        <span><i className="far fa-question"></i></span> {faq.question}
                      </button>
                    </h2>
                    <div 
                      id={faqHelpers.getAccordionId(faq)} 
                      className={faqHelpers.getCollapseClass(index)}
                      aria-labelledby={faqHelpers.getHeadingId(faq)} 
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;