function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blinkit-green to-blinkit-greenDark py-16">
        <div className="container-app">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-xl text-white/90">
              Please read our terms carefully before using FamilyMart
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-app">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-6">Last updated: March 2026</p>

              <h2 className="text-xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-6">
                By accessing and using the FamilyMart mobile application and website (collectively, the "Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mb-4">2. Use of Service</h2>
              <p className="text-gray-600 mb-4">
                FamilyMart provides grocery delivery services in New Delhi, India. You agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the service only for lawful purposes</li>
                <li>Not engage in any activity that interferes with the service</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mb-4">3. Ordering & Payment</h2>
              <p className="text-gray-600 mb-4">
                When you place an order through FamilyMart:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>You agree to purchase the items at the prices displayed</li>
                <li>Prices may change without notice based on market rates</li>
                <li>We reserve the right to refuse or cancel any order</li>
                <li>Payment must be completed before delivery</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mb-4">4. Delivery</h2>
              <p className="text-gray-600 mb-4">
                Our delivery terms include:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Delivery within 15-30 minutes for standard orders</li>
                <li>Delivery charges may apply for orders below ₹199</li>
                <li>Delivery availability depends on your location</li>
                <li>You must provide accurate delivery address</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mb-4">5. Returns & Refunds</h2>
              <p className="text-gray-600 mb-4">
                We want you to be completely satisfied. Our return policy:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Returns accepted within 24 hours of delivery</li>
                <li>Fresh produce must be returned in original condition</li>
                <li>Refunds processed within 5-7 business days</li>
                <li>Damaged or expired items qualify for immediate refund</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mb-4">6. User Accounts</h2>
              <p className="text-gray-600 mb-6">
                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. FamilyMart reserves the right to terminate accounts at our sole discretion.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-600 mb-6">
                All content, designs, logos, and intellectual property on FamilyMart are owned by FamilyMart Grocery Pvt. Ltd. No part of this service may be reproduced without prior written permission.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-600 mb-6">
                FamilyMart shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service. Our total liability shall not exceed the amount paid for the specific order in question.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mb-4">9. Privacy</h2>
              <p className="text-gray-600 mb-6">
                Your privacy is important to us. Please review our <a href="/privacy" className="text-blinkit-green hover:underline">Privacy Policy</a> to understand how we collect, use, and protect your information.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mb-4">10. Contact Information</h2>
              <p className="text-gray-600 mb-6">
                For questions about these Terms & Conditions, please contact us at:
                <br />
                Email: legal@familymart.in
                <br />
                Phone: +91 98765 43210
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Terms;
