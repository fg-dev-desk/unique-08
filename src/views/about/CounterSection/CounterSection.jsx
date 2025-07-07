import React from 'react';

// data
const counterData = {
  counters: [
    {
      icon: "assets/img/icon/car.svg",
      value: "2500",
      dataTo: "2500",
      title: "+ Vehículos Subastados"
    },
    {
      icon: "assets/img/icon/car-rent.svg",
      value: "1200",
      dataTo: "1200",
      title: "+ Usuarios Activos"
    },
    {
      icon: "assets/img/icon/driver.svg",
      value: "850",
      dataTo: "850",
      title: "+ Subastas Exitosas"
    },
    {
      icon: "assets/img/icon/experince.svg",
      value: "5",
      dataTo: "5",
      title: "+ Años de Experiencia"
    }
  ]
};

const CounterSection = () => {
  // render
  return (
    <div className="counter-area pt-30 pb-30">
      <div className="container">
        <div className="row">
          {counterData.counters.map((counter, index) => (
            <div key={index} className="col-lg-3 col-sm-6">
              <div className="counter-box">
                <div className="icon">
                  <img src={counter.icon} alt="" />
                </div>
                <div>
                  <span 
                    className="counter" 
                    data-count="+" 
                    data-to={counter.dataTo} 
                    data-speed="3000"
                  >
                    {counter.value}
                  </span>
                  <h6 className="title">
                    {counter.title}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterSection;