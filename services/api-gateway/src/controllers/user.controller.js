const User = require('../models/User.model');
const Order = require('../models/Order.model');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUser = async (req, res) => {
  try {
    const { name, phone, addresses } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update basic info
    if (name) user.name = name;
    if (phone) user.phone = phone;

    // Update addresses
    if (addresses && Array.isArray(addresses)) {
      user.addresses = addresses;
    }

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete user profile
// @route   DELETE /api/users/profile
// @access  Private
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.deleteOne();

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user addresses
// @route   GET /api/users/addresses
// @access  Private
const getUserAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      data: user.addresses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add user address
// @route   POST /api/users/addresses
// @access  Private
const addAddress = async (req, res) => {
  try {
    const { fullName, street, city, pincode, phone, isDefault, landmark } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const newAddress = {
      fullName,
      street,
      city,
      pincode,
      phone,
      isDefault,
      landmark
    };

    user.addresses.push(newAddress);

    // Set isDefault to false for other addresses if new one is default
    if (isDefault) {
      user.addresses.forEach(address => {
        if (address._id.toString() !== newAddress._id.toString()) {
          address.isDefault = false;
        }
      });
    }

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      data: user.addresses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user address
// @route   PUT /api/users/addresses/:addressId
// @access  Private
const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { fullName, street, city, pincode, phone, isDefault, landmark } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);

    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    const existingAddress = user.addresses[addressIndex];

    // Update address fields
    existingAddress.fullName = fullName || existingAddress.fullName;
    existingAddress.street = street || existingAddress.street;
    existingAddress.city = city || existingAddress.city;
    existingAddress.pincode = pincode || existingAddress.pincode;
    existingAddress.phone = phone || existingAddress.phone;
    existingAddress.isDefault = isDefault !== undefined ? isDefault : existingAddress.isDefault;
    existingAddress.landmark = landmark || existingAddress.landmark;

    // Set isDefault to false for other addresses if this one is default
    if (isDefault) {
      user.addresses.forEach(addr => {
        if (addr._id.toString() !== addressId) {
          addr.isDefault = false;
        }
      });
    }

    await user.save();

    res.json({
      success: true,
      message: 'Address updated successfully',
      data: user.addresses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete user address
// @route   DELETE /api/users/addresses/:addressId
// @access  Private
const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);

    await user.save();

    res.json({
      success: true,
      message: 'Address deleted successfully',
      data: user.addresses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Block user
// @route   PUT /api/users/:userId/block
// @access  Private (Super Admin only)
const blockUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isActive = false;
    await user.save();

    res.json({
      success: true,
      message: 'User blocked successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Unblock user
// @route   PUT /api/users/:userId/unblock
// @access  Private (Super Admin only)
const unblockUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isActive = true;
    await user.save();

    res.json({
      success: true,
      message: 'User unblocked successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private (Super Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUserAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  blockUser,
  unblockUser,
  getAllUsers
};
