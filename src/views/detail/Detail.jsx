import React from 'react';

import CarImages from './CarImages/CarImages';
import CarInfo from './CarInfo/CarInfo';
import CarTabs from './CarTabs/CarTabs';
import RelatedCars from './RelatedCars/RelatedCars';
import Breadcrumb from '../../components/ui/Breadcrumb';
import detailData from './detailData.json';

const Detail = () => {
  return (
    <>
      <Breadcrumb 
        title={detailData.breadcrumb.title} 
        currentPage={detailData.breadcrumb.currentPage}
      />
      
      {/* car single */}
      <div className="car-item-single py-120">
        <div className="container">
          <div className="car-single-wrapper">
            <div className="row">
              <CarImages />
              <CarInfo />
            </div>
          </div>
        </div>
      </div>
      
      <CarTabs />
      <RelatedCars />
    </>
  );
};

export default Detail;