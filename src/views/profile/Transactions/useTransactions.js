import { useState } from 'react';
import transactionsData from './transactionsData.json';

export const useTransactions = () => {
  const [transactions] = useState(transactionsData.mockData);
  
  // helpers
  const transactionsHelpers = {
    handleViewTransaction: (transactionId) => {
      console.log('View transaction:', transactionId);
      // TODO: Navigate to transaction detail or show modal
    },
    
    getStatusClass: (status) => {
      const statusClasses = {
        'Completed': 'text-success',
        'Pending': 'text-warning', 
        'Cancelled': 'text-danger',
        'Active': 'text-primary'
      };
      return statusClasses[status] || 'text-secondary';
    }
  };

  return {
    transactionsHelpers,
    transactionsData,
    transactions
  };
};