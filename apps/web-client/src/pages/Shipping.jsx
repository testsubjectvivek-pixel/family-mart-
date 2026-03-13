import { Truck, Clock, MapPin, Package, Shield, RefreshCw } from 'lucide-react';

function Shipping() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blinkit-green to-blinkit-greenDark py-16">
        <div className="container-app">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shipping & Delivery</h1>
            <p className="text-xl text-white/90">
              Fast and reliable delivery across New Delhi
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-app">
          {/* Delivery Options */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Our Delivery Options</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-blinkit-green" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Express Delivery</h3>
                <p className="text-blinkit-green font-bold text-2xl mb-2">15 min</p>
                <p className="text-gray-600 text-sm">For urgent orders</p>
                <p className="text-gray-500 text-sm mt-2">₹39 delivery fee</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm text-center border-2 border-blinkit-green">
                <div className="absolute top-3 right-3 bg-blinkit-green text-white text-xs px-2 py-1 rounded-full">Popular</div>
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-7 h-7 text-blinkit-green" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Standard Delivery</h3>
                <p className="text-blinkit-green font-bold text-2xl mb-2">15-30 min</p>
                <p className="text-gray-600 text-sm">Fast & reliable</p>
                <p className="text-gray-500 text-sm mt-2">Free above ₹199</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-blinkit-green" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Scheduled Delivery</h3>
                <p className="text-blinkit-green font-bold text-2xl mb-2">Pick your slot</p>
                <p className="text-gray-600 text-sm">Plan ahead</p>
                <p className="text-gray-500 text-sm mt-2">Free above ₹199</p>
              </div>
            </div>
          </div>

          {/* Delivery Areas */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-blinkit-green" />
                <h2 className="text-2xl font-bold text-gray-800">Delivery Areas</h2>
              </div>
              <p className="text-gray-600 mb-4">We currently deliver to the following areas in Delhi-NCR:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Delhi</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Central Delhi (Connaught Place, Karol Bagh)</li>
                    <li>• South Delhi (Saket, Greater Kailash)</li>
                    <li>• North Delhi (Rohini, Pitampura)</li>
                    <li>• East Delhi (Mayur Vihar, Preet Vihar)</li>
                    <li>• West Delhi (Rajouri Garden, Janakpuri)</li>
                    <li>• Dwarka, Vasant Kunj, Gurgaon</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Coming Soon</h3>
                  <ul className="text-gray-500 space-y-1">
                    <li>• Noida</li>
                    <li>• Faridabad</li>
                    <li>• Ghaziabad</li>
                    <li>• More areas in Delhi</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Process */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">How Delivery Works</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blinkit-green text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Place Your Order</h3>
                    <p className="text-gray-600">Browse products, add to cart, and checkout. Choose your preferred delivery time.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blinkit-green text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Order Confirmed</h3>
                    <p className="text-gray-600">You'll receive an SMS confirmation with order details and estimated delivery time.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blinkit-green text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Packing in Progress</h3>
                    <p className="text-gray-600">Our partners carefully pick and pack your items to ensure freshness.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blinkit-green text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Out for Delivery</h3>
                    <p className="text-gray-600">Track your order in real-time. Our delivery partner is on the way!</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blinkit-green text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">5</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Delivered</h3>
                    <p className="text-gray-600">Your fresh groceries delivered to your doorstep. Enjoy!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Tips */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-green-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Tips</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <Package className="w-6 h-6 text-blinkit-green flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Be Available</h3>
                    <p className="text-gray-600 text-sm">Please be available at the delivery address during the selected time slot.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Shield className="w-6 h-6 text-blinkit-green flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Check Before Accepting</h3>
                    <p className="text-gray-600 text-sm">Check your order items before accepting delivery.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-6 h-6 text-blinkit-green flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Accurate Address</h3>
                    <p className="text-gray-600 text-sm">Provide clear delivery instructions for easier locating.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <RefreshCw className="w-6 h-6 text-blinkit-green flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Easy Returns</h3>
                    <p className="text-gray-600 text-sm">Not satisfied? Contact us within 24 hours for returns.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shipping;
