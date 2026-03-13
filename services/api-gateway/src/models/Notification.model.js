const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['order', 'promotion', 'system', 'review', 'wishlist', 'general']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  data: {
    orderId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
    link: String
  },
  read: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  }
}, {
  timestamps: true
});

notificationSchema.index({ user: 1, createdAt: -1 });
notificationSchema.index({ user: 1, read: 1 });

notificationSchema.statics.createNotification = async function(data) {
  return await this.create(data);
};

notificationSchema.statics.createOrderNotification = async function(userId, orderId, status) {
  const notifications = {
    confirmed: { title: 'Order Confirmed', message: 'Your order has been confirmed and is being prepared.' },
    packed: { title: 'Order Packed', message: 'Your order has been packed and will be dispatched soon.' },
    out_for_delivery: { title: 'Out for Delivery', message: 'Your order is out for delivery.' },
    delivered: { title: 'Order Delivered', message: 'Your order has been delivered. Thank you for shopping with us!' },
    cancelled: { title: 'Order Cancelled', message: 'Your order has been cancelled.' }
  };

  const notif = notifications[status];
  if (notif) {
    await this.create({
      user: userId,
      type: 'order',
      title: notif.title,
      message: notif.message,
      data: { orderId, link: `/orders/${orderId}` }
    });
  }
};

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
