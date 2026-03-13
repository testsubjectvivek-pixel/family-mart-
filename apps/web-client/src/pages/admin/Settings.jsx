import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function Settings() {
  const [settings, setSettings] = useState({
    deliveryCharges: {
      standard: 40,
      freeFrom: 499
    },
    taxRates: {
      defaultGST: 5,
      reducedGST: 12,
      standardGST: 18
    },
    paymentMethods: {
      razorpay: true,
      cod: true
    },
    lowStockThreshold: 10,
    deliverySlots: ['9-12', '12-3', '3-6', '6-9']
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('siteSettings', JSON.stringify(settings));
      setLoading(false);
      toast.success('Settings saved successfully!');
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Settings</h2>
        <button onClick={handleSave} disabled={loading} className="btn-primary px-5 py-2.5">
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-4">Delivery Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Standard Delivery Charge (₹)</label>
            <input
              type="number"
              value={settings.deliveryCharges.standard}
              onChange={(e) => setSettings({
                ...settings,
                deliveryCharges: { ...settings.deliveryCharges, standard: Number(e.target.value) }
              })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Free Delivery Above (₹)</label>
            <input
              type="number"
              value={settings.deliveryCharges.freeFrom}
              onChange={(e) => setSettings({
                ...settings,
                deliveryCharges: { ...settings.deliveryCharges, freeFrom: Number(e.target.value) }
              })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-4">Tax Settings (GST)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Default GST Rate (%)</label>
            <input
              type="number"
              value={settings.taxRates.defaultGST}
              onChange={(e) => setSettings({
                ...settings,
                taxRates: { ...settings.taxRates, defaultGST: Number(e.target.value) }
              })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reduced GST Rate (%)</label>
            <input
              type="number"
              value={settings.taxRates.reducedGST}
              onChange={(e) => setSettings({
                ...settings,
                taxRates: { ...settings.taxRates, reducedGST: Number(e.target.value) }
              })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Standard GST Rate (%)</label>
            <input
              type="number"
              value={settings.taxRates.standardGST}
              onChange={(e) => setSettings({
                ...settings,
                taxRates: { ...settings.taxRates, standardGST: Number(e.target.value) }
              })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.paymentMethods.razorpay}
              onChange={(e) => setSettings({
                ...settings,
                paymentMethods: { ...settings.paymentMethods, razorpay: e.target.checked }
              })}
              className="w-5 h-5 text-primary rounded"
            />
            <span className="text-gray-700">Razorpay (Cards, UPI, Netbanking)</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.paymentMethods.cod}
              onChange={(e) => setSettings({
                ...settings,
                paymentMethods: { ...settings.paymentMethods, cod: e.target.checked }
              })}
              className="w-5 h-5 text-primary rounded"
            />
            <span className="text-gray-700">Cash on Delivery (COD)</span>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-4">Inventory Settings</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Low Stock Alert Threshold</label>
          <input
            type="number"
            value={settings.lowStockThreshold}
            onChange={(e) => setSettings({
              ...settings,
              lowStockThreshold: Number(e.target.value)
            })}
            className="w-full md:w-1/3 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
          />
          <p className="text-sm text-gray-500 mt-2">
            Products with stock below this threshold will show low stock alerts
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-4">Delivery Slots</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {settings.deliverySlots.map((slot, index) => (
            <input
              key={index}
              type="text"
              value={slot}
              onChange={(e) => {
                const newSlots = [...settings.deliverySlots];
                newSlots[index] = e.target.value;
                setSettings({ ...settings, deliverySlots: newSlots });
              }}
              className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-center"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Settings;
