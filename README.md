# Family Mart - E-Commerce Platform

Enterprise-grade e-commerce platform rebuilt with clean architecture.

## Architecture

```
family-mart/
├── apps/
│   ├── web-client/          # React + Vite customer frontend
│   ├── admin-dashboard/     # React + Vite admin panel
│   └── mobile-app/          # Flutter Android app
├── services/
│   └── api-gateway/         # Node.js Express backend API
├── packages/
│   ├── ui-components/       # Shared UI components
│   ├── shared-utils/        # Shared utilities
│   ├── api-client/          # Shared API client
│   └── config/              # Shared configuration
├── infrastructure/
│   ├── docker/              # Docker configurations
│   └── ci-cd/               # CI/CD pipelines
├── scripts/                 # Build/deploy scripts
└── docs/                    # Documentation
```

## Quick Start

### Prerequisites
- Node.js 18+
- npm 9+
- Flutter 3.0+
- Docker & Docker Compose

### Development

```bash
# Install dependencies
npm install

# Start web client
npm run dev:web

# Start admin dashboard
npm run dev:admin

# Start backend API
npm run dev:backend

# Start mobile app
npm run dev:mobile
```

### Production Build

```bash
# Build all apps
npm run build

# Start with Docker
docker-compose -f infrastructure/docker/docker-compose.yml up -d
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `MONGODB_URI` - MongoDB connection string
- `REDIS_URL` - Redis connection URL
- `JWT_SECRET` - JWT signing secret
- `RAZORPAY_KEY_ID` - Razorpay API key
- `CLOUDINARY_URL` - Cloudinary config

## Features

### Customer Web App
- Product browsing & search
- Shopping cart
- Checkout & payment
- Order tracking
- User profile management

### Admin Dashboard
- Analytics & reports
- Product management
- Order management
- User management
- Promo codes

### Mobile App (Flutter)
- Native Android app
- Push notifications
- Offline support
- Payment integration

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/auth` | Authentication |
| `/api/products` | Products CRUD |
| `/api/categories` | Categories |
| `/api/cart` | Shopping cart |
| `/api/orders` | Orders |
| `/api/users` | User management |
| `/api/wishlist` | Wishlist |
| `/api/notifications` | Notifications |

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS, Redux
- **Backend**: Node.js, Express, MongoDB
- **Mobile**: Flutter, Dart
- **Cache**: Redis
- **Search**: Elasticsearch
- **Payments**: Razorpay, Stripe

## License

ISC
