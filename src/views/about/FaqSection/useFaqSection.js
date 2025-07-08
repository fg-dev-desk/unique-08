import faqData from './faqData.json';

export const useFaqSection = () => {
  
  // helpers
  const faqHelpers = {
    getAccordionId: (faq) => {
      return `collapse${faq.id}`;
    },
    
    getHeadingId: (faq) => {
      return `heading${faq.id}`;
    },
    
    isFirstFaq: (index) => {
      return index === 0;
    },
    
    getAccordionClass: (index) => {
      return `accordion-button ${faqHelpers.isFirstFaq(index) ? '' : 'collapsed'}`;
    },
    
    getCollapseClass: (index) => {
      return `accordion-collapse collapse ${faqHelpers.isFirstFaq(index) ? 'show' : ''}`;
    },
    
    getAriaExpanded: (index) => {
      return faqHelpers.isFirstFaq(index) ? 'true' : 'false';
    },
    
    hasValidFaqs: (faqs) => {
      return Array.isArray(faqs) && faqs.length > 0;
    }
  };

  return {
    faqHelpers,
    faqData
  };
};