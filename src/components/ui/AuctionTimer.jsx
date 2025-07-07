import { useState, useEffect } from 'react';

export const AuctionTimer = ({ endDate, className = "" }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  // Debug logging (remove in production)
  useEffect(() => {
    console.log('AuctionTimer initialized with endDate:', endDate);
  }, [endDate]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Validate endDate
      if (!endDate) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true
        });
        return;
      }

      const now = new Date().getTime();
      const targetDate = new Date(endDate).getTime();
      
      // Check if date is valid
      if (isNaN(targetDate)) {
        console.warn('Invalid date provided to AuctionTimer:', endDate);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true
        });
        return;
      }

      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  const getDisplayTime = () => {
    if (timeLeft.isExpired) {
      return 'Terminada';
    }

    if (timeLeft.days > 0) {
      return `${timeLeft.days}d ${formatTime(timeLeft.hours)}:${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}`;
    } else {
      return `${formatTime(timeLeft.hours)}:${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}`;
    }
  };

  const getBadgeClass = () => {
    if (timeLeft.isExpired) {
      return 'bg-warning text-dark';
    }
    return 'bg-success text-white';
  };

  const getIcon = () => {
    if (timeLeft.isExpired) {
      // Usando Font Awesome para el ícono de terminada
      return <i className="fas fa-check-circle me-1"></i>;
    }
    // Usando Font Awesome para el ícono de reloj
    return <i className="fas fa-clock me-1"></i>;
  };

  return (
    <div className={`auction-timer-badge position-absolute ${className}`} 
         style={{
           top: '10px',
           right: '10px',
           zIndex: 2
         }}>
      <span className={`badge ${getBadgeClass()} px-2 py-2 rounded-pill shadow-sm`}
            style={{
              fontSize: '0.75rem',
              fontWeight: '600'
            }}>
        {getIcon()}
        {getDisplayTime()}
      </span>
    </div>
  );
};

export default AuctionTimer;