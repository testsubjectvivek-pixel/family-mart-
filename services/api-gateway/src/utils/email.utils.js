const nodemailer = require('nodemailer');
const { sendgridApiKey, fromEmail } = require('../config');

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: fromEmail,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

const sendOrderConfirmationEmail = async (to, order) => {
  const subject = `Order Confirmation - Family Mart`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #1a73e8;">Thank you for your order!</h1>
      <p>Your order has been confirmed with the following details:</p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Order #${order._id}</h3>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Total:</strong> ₹${order.totalAmount}</p>
        <p><strong>Payment:</strong> ${order.paymentMethod}</p>
        <p><strong>Delivery Slot:</strong> ${order.deliverySlot || 'As soon as possible'}</p>
      </div>
      
      <h3>Delivery Address:</h3>
      <p>${order.deliveryAddress.fullName}</p>
      <p>${order.deliveryAddress.street}, ${order.deliveryAddress.city}</p>
      <p>${order.deliveryAddress.pincode}</p>
      <p>Phone: ${order.deliveryAddress.phone}</p>
      
      <p>Keep track of your order status in your account dashboard.</p>
      
      <p>Happy shopping!</p>
      <p><strong>The Family Mart Team</strong></p>
    </div>
  `;
  
  return sendEmail(to, subject, html);
};

const sendOrderStatusUpdateEmail = async (to, order, newStatus) => {
  const subject = `Order Update - Family Mart`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #1a73e8;">Your order status has been updated!</h1>
      <p>Order #${order._id} is now: <strong style="color: #28a745;">${newStatus}</strong></p>
      
      <p>The updated order details:</p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Current Status:</strong> ${newStatus}</p>
        <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
      </div>
      
      <p>You can view all your orders in your account dashboard.</p>
    </div>
  `;
  
  return sendEmail(to, subject, html);
};

module.exports = {
  sendEmail,
  sendOrderConfirmationEmail,
  sendOrderStatusUpdateEmail
};
