import { Link } from 'react-router-dom';
import { Store, Clock, Shield, Truck, Users, Heart } from 'lucide-react';

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blinkit-green to-blinkit-greenDark py-16">
        <div className="container-app">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About FamilyMart</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Your neighborhood grocery store, now just a tap away
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container-app">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              FamilyMart was founded with a simple mission: to make fresh groceries accessible to everyone in New Delhi, delivered straight to their doorstep within minutes. We believe that quality groceries should be convenient, affordable, and accessible to all.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blinkit-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8 text-blinkit-green" />
              </div>
              <div className="text-3xl font-bold text-gray-800">500+</div>
              <div className="text-gray-600">Partner Stores</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blinkit-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blinkit-green" />
              </div>
              <div className="text-3xl font-bold text-gray-800">1M+</div>
              <div className="text-gray-600">Orders Delivered</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blinkit-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blinkit-green" />
              </div>
              <div className="text-3xl font-bold text-gray-800">200K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blinkit-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blinkit-green" />
              </div>
              <div className="text-3xl font-bold text-gray-800">15min</div>
              <div className="text-gray-600">Avg Delivery Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container-app">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Choose FamilyMart?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-blinkit-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Super Fast Delivery</h3>
              <p className="text-gray-600">
                Get your groceries delivered within 15-30 minutes. We understand that your time is valuable.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-blinkit-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality Guaranteed</h3>
              <p className="text-gray-600">
                We source the freshest produce directly from farmers and trusted suppliers.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-blinkit-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Customer First</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We offer easy returns and 24/7 customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container-app text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Shop?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Join thousands of happy customers in New Delhi who trust FamilyMart for their daily grocery needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-8 py-3 bg-blinkit-green text-white font-semibold rounded-lg hover:bg-blinkit-greenDark transition-colors"
            >
              Browse Products
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border-2 border-blinkit-green text-blinkit-green font-semibold rounded-lg hover:bg-blinkit-green hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
