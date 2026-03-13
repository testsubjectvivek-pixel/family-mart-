# Family Mart API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "customer"
  }
}
```

### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### POST /auth/forgot-password
Request password reset.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

## Products

### GET /products
Get all products with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `category` (optional): Filter by category
- `featured` (optional): Filter featured products
- `trending` (optional): Filter trending products

### GET /products/:id
Get single product by ID.

### GET /products/search
Search products.

**Query Parameters:**
- `q`: Search query

### POST /products
Create new product (Admin only).

### PUT /products/:id
Update product (Admin only).

### DELETE /products/:id
Delete product (Admin only).

## Categories

### GET /categories
Get all categories.

### POST /categories
Create category (Admin only).

## Cart

### GET /cart
Get user's cart.

### POST /cart/add
Add item to cart.

**Request Body:**
```json
{
  "productId": "...",
  "quantity": 2
}
```

### PUT /cart/update/:itemId
Update cart item quantity.

**Request Body:**
```json
{
  "quantity": 3
}
```

### DELETE /cart/remove/:itemId
Remove item from cart.

### POST /cart/apply-coupon
Apply coupon code.

**Request Body:**
```json
{
  "couponCode": "SAVE20"
}
```

## Orders

### GET /orders
Get user's orders.

### GET /orders/:id
Get order details.

### POST /orders
Create new order.

**Request Body:**
```json
{
  "deliveryAddress": {
    "fullName": "John Doe",
    "street": "123 Main St",
    "city": "New Delhi",
    "pincode": "110001",
    "phone": "9876543210"
  },
  "paymentMethod": "razorpay",
  "couponCode": "SAVE20"
}
```

### PUT /orders/:id/cancel
Cancel order.

## Users

### GET /users/profile
Get user profile.

### PUT /users/profile
Update user profile.

### POST /users/addresses
Add new address.

### DELETE /users/addresses/:id
Delete address.

## Promo Codes

### GET /promo
Get all promo codes (Admin).

### POST /promo
Create promo code (Admin).

## Notifications

### GET /notifications
Get user notifications.

### PUT /notifications/:id/read
Mark notification as read.

### PUT /notifications/read-all
Mark all notifications as read.

## Error Responses

All endpoints may return error responses:

```json
{
  "success": false,
  "message": "Error message description"
}
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error
