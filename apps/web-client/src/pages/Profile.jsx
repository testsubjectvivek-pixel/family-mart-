import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersAPI } from '../services/api';
import { updateProfile } from '../store/slices/authSlice';
import toast from 'react-hot-toast';

function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [addressData, setAddressData] = useState({
    fullName: '',
    street: '',
    city: 'New Delhi',
    pincode: '',
    phone: '',
    isDefault: false,
    landmark: ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        phone: currentUser.phone || ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(updateProfile(formData)).unwrap();
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await usersAPI.addAddress(addressData);
      toast.success('Address added successfully!');
      setShowAddressForm(false);
      setAddressData({
        fullName: '', street: '', city: 'New Delhi', pincode: '',
        phone: '', isDefault: false, landmark: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add address');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await usersAPI.deleteAddress(addressId);
        toast.success('Address deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete address');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">Personal Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                value={currentUser?.email || ''}
                disabled
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-sm font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-5 btn-primary px-6 py-2.5 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Saved Addresses</h2>
          <button
            onClick={() => setShowAddressForm(!showAddressForm)}
            className="btn-primary px-4 py-2"
          >
            {showAddressForm ? 'Cancel' : '+ Add Address'}
          </button>
        </div>

        {showAddressForm && (
          <form onSubmit={handleAddAddress} className="bg-gray-50 p-5 rounded-xl mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={addressData.fullName}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={addressData.phone}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2 text-sm font-medium">Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={addressData.street}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">City</label>
                <input
                  type="text"
                  name="city"
                  value={addressData.city}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={addressData.pincode}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2 text-sm font-medium">Landmark (Optional)</label>
                <input
                  type="text"
                  name="landmark"
                  value={addressData.landmark}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl"
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={addressData.isDefault}
                    onChange={(e) => setAddressData({ ...addressData, isDefault: e.target.checked })}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <span className="text-sm text-gray-600">Set as default address</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-5 btn-primary px-6 py-2.5 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Address'}
            </button>
          </form>
        )}

        <div className="space-y-4">
          {currentUser?.addresses?.map((address) => (
            <div key={address._id} className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{address.fullName}</h3>
                    {address.isDefault && (
                      <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">Default</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{address.street}</p>
                  <p className="text-sm text-gray-600">{address.city} - {address.pincode}</p>
                  <p className="text-sm text-gray-500">Phone: {address.phone}</p>
                </div>
                <button
                  onClick={() => handleDeleteAddress(address._id)}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {(!currentUser?.addresses || currentUser.addresses.length === 0) && !showAddressForm && (
            <p className="text-gray-500 text-center py-8">No saved addresses</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
