import React from 'react';

import ProfileLayout from '../ProfileLayout/ProfileLayout';

import { useTransactions } from './useTransactions';

const Transactions = () => {
  const { transactionsHelpers, transactionsData, transactions } = useTransactions();

  return (
    <ProfileLayout title={transactionsData.title}>
      <div className="user-profile-card">
        <div className="user-profile-card-title">
          <h4>{transactionsData.cardTitle}</h4>
        </div>
        <div className="car-table-content">
          <div className="car-table table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  {transactionsData.tableHeaders.map((header, index) => (
                    <th key={index} scope="col">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td>
                      <div className="order-id">{transaction.id}</div>
                    </td>
                    <td>
                      <div className="pick-up">{transaction.pickUp}</div>
                    </td>
                    <td>
                      <div className="drop-up">{transaction.dropUp}</div>
                    </td>
                    <td>
                      <div className="duration">{transaction.duration}</div>
                    </td>
                    <td>
                      <div className="price">{transaction.price}</div>
                    </td>
                    <td>
                      <div className={`status ${transactionsHelpers.getStatusClass(transaction.status)}`}>
                        {transaction.status}
                      </div>
                    </td>
                    <td>
                      <div className="car-table-action">
                        <button 
                          type="button"
                          className="car-action-btn"
                          onClick={() => transactionsHelpers.handleViewTransaction(transaction.id)}
                        >
                          <i className="far fa-eye"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Transactions;