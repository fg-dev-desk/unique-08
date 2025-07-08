import React from 'react';

import ProfileLayout from '../ProfileLayout/ProfileLayout';

import { useMyListings } from './useMyListings';

const MyListings = () => {
  const { myListingsHelpers, myListingsData, listings } = useMyListings();

  return (
    <ProfileLayout title={myListingsData.title}>
      <div className="user-profile-card">
        <div className="user-profile-card-title">
          <h4>{myListingsData.cardTitle}</h4>
        </div>
        <div className="car-table-content">
          <div className="car-table table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  {myListingsData.tableHeaders.map((header, index) => (
                    <th key={index} scope="col">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {listings.map(listing => (
                  <tr key={listing.id}>
                    <td>
                      <div className="car-table-item">
                        <div className="car-table-item-img">
                          <img src={myListingsHelpers.getCarImage(listing)} alt={myListingsHelpers.getCarName(listing)} />
                        </div>
                        <div className="car-table-item-content">
                          <h6 className="car-table-item-title">
                            <a href="#">{myListingsHelpers.getCarName(listing)}</a>
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="car-table-year">{listing.year}</div>
                    </td>
                    <td>
                      <div className="car-table-transmission">{listing.transmission}</div>
                    </td>
                    <td>
                      <div className="car-table-fuel">{listing.fuelType}</div>
                    </td>
                    <td>
                      <div className="car-table-price">{myListingsHelpers.formatPrice(listing.price)}</div>
                    </td>
                    <td>
                      <div className="car-table-action">
                        <a href="#" className="car-action-btn"><i className="far fa-eye"></i></a>
                        <a href="#" className="car-action-btn"><i className="far fa-pen"></i></a>
                        <button 
                          type="button"
                          className="car-action-btn"
                          onClick={() => myListingsHelpers.handleRemoveListing(listing.id)}
                        >
                          <i className="far fa-trash-can"></i>
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

export default MyListings;