import { RefreshCw, CheckCircle, XCircle, Clock, AlertCircle, Package } from 'lucide-react';

function Returns() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blinkit-green to-blinkit-greenDark py-16">
        <div className="container-app">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Returns & Refunds</h1>
            <p className="text-xl text-white/90">
              We want you to love your shopping experience
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-app">
          {/* Return Policy Overview */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <RefreshCw className="w-8 h-8 text-blinkit-green" />
                <h2 className="text-2xl font-bold text-gray-800">Our Return Policy</h2>
              </div>
              <p className="text-gray-600 mb-6">
                At FamilyMart, customer satisfaction is our top priority. If you're not completely satisfied with your order, we make it easy to return items and get refunds.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Clock className="w-8 h-8 text-blinkit-green mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">24 Hours</h3>
                  <p className="text-sm text-gray-600">Return window</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Package className="w-8 h-8 text-blinkit-green mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">Easy Process</h3>
                  <p className="text-sm text-gray-600">3-step return</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <RefreshCw className="w-8 h-8 text-blinkit-green mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">5-7 Days</h3>
                  <p className="text-sm text-gray-600">Refund processing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Eligible for Return */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">What Can Be Returned?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Fresh Produce</h3>
                    <p className="text-gray-600 text-sm">Fruits, vegetables, or leafy greens that are not fresh or have quality issues</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Damaged Items</h3>
                    <p className="text-gray-600 text-sm">Products that are damaged, expired, or have broken seals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Wrong Items</h3>
                    <p className="text-gray-600 text-sm">Items delivered different from what you ordered</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Missing Items</h3>
                    <p className="text-gray-600 text-sm">Items mentioned in the order but not delivered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Not Eligible */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">What Cannot Be Returned?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Opened/Used Personal Care</h3>
                    <p className="text-gray-600 text-sm">Items like shampoo, soap, or cosmetics once opened</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Food Items</h3>
                    <p className="text-gray-600 text-sm">Packaged foods that have been consumed or opened</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Wrong Reason Returns</h3>
                    <p className="text-gray-600 text-sm">Items returned without valid quality issues</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Return */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Request a Return</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blinkit-green text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Go to My Orders</h3>
                    <p className="text-gray-600">Open the FamilyMart app and navigate to 'My Orders'</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blinkit-green text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Select the Order</h3>
                    <p className="text-gray-600">Choose the order containing the item(s) you want to return</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blinkit-green text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Report the Issue</h3>
                    <p className="text-gray-600">Select the item(s) and reason for return, then submit</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blinkit-green text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Get Refund</h3>
                    <p className="text-gray-600">Refund will be processed within 5-7 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Methods */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Refund Methods</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 border border-gray-200 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-2">Original Payment Method</h3>
                  <p className="text-gray-600 text-sm">Refunds are credited back to the same payment method used for the order</p>
                  <p className="text-gray-500 text-xs mt-2">5-7 business days</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-2">FamilyMart Wallet</h3>
                  <p className="text-gray-600 text-sm">Get instant refunds to your FamilyMart wallet for faster future orders</p>
                  <p className="text-green-500 text-xs mt-2">Instant credit</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact for Returns */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-green-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-blinkit-green" />
                <h2 className="text-xl font-bold text-gray-800">Need Help?</h2>
              </div>
              <p className="text-gray-600 mb-4">
                If you have any questions about returns or need assistance, please contact our customer support team.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+919876543210" className="px-4 py-2 bg-white rounded-lg text-blinkit-green font-medium hover:underline">
                  Call: +91 98765 43210
                </a>
                <a href="mailto:support@familymart.in" className="px-4 py-2 bg-white rounded-lg text-blinkit-green font-medium hover:underline">
                  Email: support@familymart.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Returns;
