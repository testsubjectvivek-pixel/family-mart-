import { useState, useEffect } from 'react';
import { promoCodesAPI } from '../../services/api';
import toast from 'react-hot-toast';

function PromoCodeList() {
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    minOrderAmount: '',
    maxDiscount: '',
    usageLimit: '',
    isActive: true
  });

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const fetchPromoCodes = async () => {
    try {
      const response = await promoCodesAPI.getAll();
      setPromoCodes(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch promo codes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        discountValue: Number(formData.discountValue),
        minOrderAmount: Number(formData.minOrderAmount),
        maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : undefined,
        usageLimit: Number(formData.usageLimit)
      };

      if (editingId) {
        await promoCodesAPI.update(editingId, data);
        toast.success('Promo code updated!');
      } else {
        await promoCodesAPI.create(data);
        toast.success('Promo code created!');
      }
      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchPromoCodes();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save promo code');
    }
  };

  const handleEdit = (promo) => {
    setFormData({
      code: promo.code,
      description: promo.description || '',
      discountType: promo.discountType,
      discountValue: promo.discountValue.toString(),
      minOrderAmount: promo.minOrderAmount?.toString() || '',
      maxDiscount: promo.maxDiscount?.toString() || '',
      usageLimit: promo.usageLimit?.toString() || '',
      isActive: promo.isActive
    });
    setEditingId(promo._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this promo code?')) {
      try {
        await promoCodesAPI.delete(id);
        toast.success('Promo code deleted!');
        fetchPromoCodes();
      } catch (error) {
        toast.error('Failed to delete promo code');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      description: '',
      discountType: 'percentage',
      discountValue: '',
      minOrderAmount: '',
      maxDiscount: '',
      usageLimit: '',
      isActive: true
    });
  };

  const toggleActive = async (promo) => {
    try {
      await updatePromoCode(promo._id, { isActive: !promo.isActive });
      toast.success(`Promo code ${promo.isActive ? 'deactivated' : 'activated'}!`);
      fetchPromoCodes();
    } catch (error) {
      toast.error('Failed to update promo code');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Promo Codes</h2>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); resetForm(); }}
          className="btn-primary px-5 py-2.5"
        >
          {showForm ? 'Cancel' : '+ Add Promo Code'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-4">{editingId ? 'Edit' : 'Add New'} Promo Code</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  placeholder="e.g., SUMMER20"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                <select
                  value={formData.discountType}
                  onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (₹)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
                <input
                  type="number"
                  value={formData.discountValue}
                  onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  placeholder={formData.discountType === 'percentage' ? '20' : '100'}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Order Amount (₹)</label>
                <input
                  type="number"
                  value={formData.minOrderAmount}
                  onChange={(e) => setFormData({ ...formData, minOrderAmount: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  placeholder="499"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Discount (₹)</label>
                <input
                  type="number"
                  value={formData.maxDiscount}
                  onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  placeholder="200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit</label>
                <input
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  placeholder="100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  placeholder="Summer sale discount"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => { setShowForm(false); resetForm(); }}
                className="px-5 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary px-5 py-2.5">
                {editingId ? 'Update' : 'Create'} Promo Code
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Code</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Discount</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Min Order</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Usage</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {promoCodes.map((promo) => (
              <tr key={promo._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">{promo.code}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-green-600 font-semibold">
                    {promo.discountType === 'percentage' ? `${promo.discountValue}%` : `₹${promo.discountValue}`}
                  </span>
                  {promo.maxDiscount && <span className="text-gray-500 text-sm ml-1">max ₹{promo.maxDiscount}</span>}
                </td>
                <td className="px-6 py-4 text-gray-600">₹{promo.minOrderAmount || 0}</td>
                <td className="px-6 py-4 text-gray-600">
                  {promo.usedCount || 0} / {promo.usageLimit || '∞'}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleActive(promo)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${promo.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                  >
                    {promo.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button onClick={() => handleEdit(promo)} className="text-sm text-primary hover:text-primary/80 font-medium">Edit</button>
                    <button onClick={() => handleDelete(promo._id)} className="text-sm text-red-600 hover:text-red-700 font-medium">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {promoCodes.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No promo codes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PromoCodeList;
