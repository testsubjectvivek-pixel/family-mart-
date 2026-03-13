import { useState, useEffect } from 'react';

const useDeliveryEstimate = (distance = 2) => {
  const [estimate, setEstimate] = useState(10);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const calculateEstimate = () => {
      setIsCalculating(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Base delivery time: 10 minutes for 2km
        // Add 5 minutes per additional km
        const baseTime = 10;
        const additionalTime = Math.max(0, (distance - 2)) * 5;
        const totalTime = baseTime + additionalTime;
        
        // Add some randomness (±3 minutes)
        const randomOffset = Math.floor(Math.random() * 7) - 3;
        const finalEstimate = Math.max(8, totalTime + randomOffset);
        
        setEstimate(finalEstimate);
        setIsCalculating(false);
      }, 500);
    };

    calculateEstimate();
  }, [distance]);

  return { estimate, isCalculating };
};

export default useDeliveryEstimate;
