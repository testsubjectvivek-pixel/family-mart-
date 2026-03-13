import { useState, useEffect } from 'react';

function OrderTimeline({ status = 'pending', showDate = false }) {
  const steps = [
    { key: 'pending', label: 'Order Placed', icon: '📝' },
    { key: 'confirmed', label: 'Confirmed', icon: '✅' },
    { key: 'packed', label: 'Packed', icon: '📦' },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: '🚚' },
    { key: 'delivered', label: 'Delivered', icon: '🏠' }
  ];

  const cancelledStep = { key: 'cancelled', label: 'Cancelled', icon: '❌' };

  const isCancelled = status === 'cancelled';
  const currentIndex = isCancelled ? -1 : steps.findIndex(s => s.key === status);
  const activeIndex = currentIndex >= 0 ? currentIndex : steps.length - 1;

  const getStepStatus = (index) => {
    if (isCancelled) return 'cancelled';
    if (index < activeIndex) return 'completed';
    if (index === activeIndex) return 'current';
    return 'pending';
  };

  if (isCancelled) {
    return (
      <div className="relative">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-3">
              <span className="text-2xl">❌</span>
            </div>
            <p className="text-lg font-semibold text-red-600">Order Cancelled</p>
            <p className="text-sm text-gray-500 mt-1">This order has been cancelled</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-start justify-between">
        {steps.map((step, index) => {
          const stepStatus = getStepStatus(index);
          
          return (
            <div key={step.key} className="flex flex-col items-center flex-1 relative z-10">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                  stepStatus === 'completed' 
                    ? 'bg-primary text-white' 
                    : stepStatus === 'current'
                      ? 'bg-primary text-white ring-4 ring-primary/20'
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {stepStatus === 'completed' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{step.icon}</span>
                )}
              </div>
              
              <div className="mt-2 text-center">
                <p className={`text-xs font-medium ${
                  stepStatus === 'completed' || stepStatus === 'current'
                    ? 'text-gray-900' 
                    : 'text-gray-400'
                }`}>
                  {step.label}
                </p>
                {showDate && stepStatus === 'completed' && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date().toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 -z-0">
        <div 
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default OrderTimeline;
