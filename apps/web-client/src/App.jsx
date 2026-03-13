import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import DashboardLayout from './components/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import SkeletonLoader from './components/SkeletonLoader';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const ProductList = lazy(() => import('./pages/ProductList'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderHistory = lazy(() => import('./pages/OrderHistory'));
const OrderDetail = lazy(() => import('./pages/OrderDetail'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Search = lazy(() => import('./pages/Search'));
const TrackOrder = lazy(() => import('./pages/TrackOrder'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const Reorder = lazy(() => import('./pages/Reorder'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Shipping = lazy(() => import('./pages/Shipping'));
const Returns = lazy(() => import('./pages/Returns'));
const Wallet = lazy(() => import('./pages/Wallet'));
const ReferEarn = lazy(() => import('./pages/ReferEarn'));
const Notifications = lazy(() => import('./pages/Notifications'));
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Compare = lazy(() => import('./pages/Compare'));

const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProductList = lazy(() => import('./pages/admin/ProductList'));
const AdminProductCreate = lazy(() => import('./pages/admin/ProductCreate'));
const AdminProductEdit = lazy(() => import('./pages/admin/ProductEdit'));
const AdminCategoryList = lazy(() => import('./pages/admin/CategoryList'));
const AdminOrderList = lazy(() => import('./pages/admin/OrderList'));
const AdminUserList = lazy(() => import('./pages/admin/UserList'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));
const PromoCodeList = lazy(() => import('./pages/admin/PromoCodeList'));
const AdminAnalytics = lazy(() => import('./pages/admin/Analytics'));
const InventoryAlerts = lazy(() => import('./pages/admin/InventoryAlerts'));
const SalesReports = lazy(() => import('./pages/admin/SalesReports'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <SkeletonLoader className="w-full h-64" />
  </div>
);

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
            <Route path="/orders/:id" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
            <Route path="/search" element={<Search />} />
            <Route path="/orders/:id/track" element={<PrivateRoute><TrackOrder /></PrivateRoute>} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/orders/:id/reorder" element={<PrivateRoute><Reorder /></PrivateRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/wallet" element={<PrivateRoute><Wallet /></PrivateRoute>} />
            <Route path="/refer-earn" element={<PrivateRoute><ReferEarn /></PrivateRoute>} />
            <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/compare" element={<Compare />} />

            <Route path="/admin/dashboard" element={<AdminRoute><DashboardLayout><AdminDashboard /></DashboardLayout></AdminRoute>} />
            <Route path="/admin/analytics" element={<AdminRoute><DashboardLayout><AdminAnalytics /></DashboardLayout></AdminRoute>} />
            <Route path="/admin/inventory" element={<AdminRoute><DashboardLayout><InventoryAlerts /></DashboardLayout></AdminRoute>} />
            <Route path="/admin/reports" element={<AdminRoute><DashboardLayout><SalesReports /></DashboardLayout></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><DashboardLayout><AdminProductList /></DashboardLayout></AdminRoute>} />
            <Route path="/admin/products/new" element={<AdminRoute><DashboardLayout><AdminProductCreate /></DashboardLayout></AdminRoute>} />
            <Route path="/admin/products/:id/edit" element={<AdminRoute><DashboardLayout><AdminProductEdit /></DashboardLayout></AdminRoute>} />
            <Route path="/admin/categories" element={<AdminRoute><DashboardLayout><AdminCategoryList /></DashboardLayout></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><DashboardLayout><AdminOrderList /></DashboardLayout></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><DashboardLayout><AdminUserList /></DashboardLayout></AdminRoute>} />
            <Route path="/admin/promo-codes" element={<AdminRoute><DashboardLayout><PromoCodeList /></DashboardLayout></AdminRoute>} />
            <Route path="/admin/settings" element={<AdminRoute><DashboardLayout><AdminSettings /></DashboardLayout></AdminRoute>} />

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default App;
