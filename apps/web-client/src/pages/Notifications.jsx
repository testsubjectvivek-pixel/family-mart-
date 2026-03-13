import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, markAsRead, markAllAsRead, deleteNotification } from '../store/slices/notificationSlice';
import { Bell, CheckCheck, Trash2, Package, ShoppingCart, Tag, AlertCircle } from 'lucide-react';

function Notifications() {
  const dispatch = useDispatch();
  const { notifications, unreadCount, loading } = useSelector(state => state.notifications);

  useEffect(() => {
    dispatch(getNotifications({ page: 1, limit: 50 }));
  }, [dispatch]);

  const handleMarkAsRead = (id) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllRead = () => {
    dispatch(markAllAsRead());
  };

  const handleDelete = (id) => {
    dispatch(deleteNotification(id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'order': return <Package className="w-5 h-5" />;
      case 'promo': return <Tag className="w-5 h-5" />;
      case 'cart': return <ShoppingCart className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'order': return 'bg-blue-100 text-blue-600';
      case 'promo': return 'bg-green-100 text-green-600';
      case 'cart': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-app">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-2 text-blinkit-green font-medium hover:underline"
            >
              <CheckCheck className="w-5 h-5" />
              Mark all as read
            </button>
          )}
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-8 h-8 border-4 border-blinkit-green border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No notifications yet</h3>
            <p className="text-gray-500">We'll notify you when something new happens!</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`p-4 flex items-start gap-4 ${!notification.read ? 'bg-blue-50/50' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconBg(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={`font-medium ${!notification.read ? 'text-gray-800' : 'text-gray-600'}`}>
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(notification.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification._id)}
                          className="p-2 text-gray-400 hover:text-blinkit-green transition-colors"
                          title="Mark as read"
                        >
                          <CheckCheck className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification._id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blinkit-green rounded-full flex-shrink-0 mt-2"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
