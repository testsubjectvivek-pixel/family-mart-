function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blinkit-green to-blinkit-greenDark py-16">
        <div className="container-app">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-white/90">
              Your privacy is important to us. Learn how we protect your data.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-app">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-6">Last updated: March 2026</p>

              <h2 className="text-xl font-bold text-gray-800 mb-4">1. Introduction</h2>
              <p className="text-gray-600 mb-6">
                FamilyMart Grocery Pvt. Ltd. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (the "Service").
              </p>

              <h2 className="text-xl font-bold text-gray-800 mb-4">2. Information We Collect</h2>
              <p className="text-gray-600 mb-4">We collect the following types of information:</p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, delivery address</li>
                <li><strong>Payment Information:</strong> Credit/debit card details, UPI IDs, wallet information</li>
                <li><strong>Order Information:</strong> Products purchased, order history, preferences</li>
                <li><strong>Device Information:</strong> Device type, IP address, browser type</li>
                <li><strong>Location Data:</strong> GPS coordinates for delivery (with your consent)</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">We use your information to:</p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Process and deliver your orders</li>
                <li>Send order confirmations and updates</li>
                <li>Provide customer support</li>
                <li>Improve our services and user experience</li>
                <li>Send promotional offers (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mb-4">4. Information Sharing</h2>
              <p className="text-gray-600 mb-4">We may share your information with:</p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li><strong>Delivery Partners:</strong> To deliver your orders</li>
                <li><strong>Partner Stores:</strong> To fulfill your orders</li>
                <li><strong>Payment Processors:</strong> To process payments securely</li>
                <li><strong>Service Providers:</strong> For technical and support services</li>
                <li><strong>Legal Authorities:</strong> When required by law</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mb-4">5. Data Security</h2>
              <p className="text-gray-600 mb-6">
                We implement appropriate technical and organizational measures to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure storage with access controls</li>
                <li>Regular security audits</li>
                <li>Employee training on data protection</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mb-4">6. Your Rights</h2>
              <p className="text-gray-600 mb-4">Under applicable data protection laws, you have the right to:</p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 mb-4">7. Cookies & Tracking</h2>
              <p className="text-gray-600 mb-6">
                We use cookies and similar tracking technologies to enhance your browsing experience. You can manage cookie preferences through your browser settings. Disabling cookies may affect some features of our service.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mb-4">8. Data Retention</h2>
              <p className="text-gray-600 mb-6">
                We retain your personal information for as long as your account is active or as needed to provide you services. We will delete or anonymize your data upon request, unless we are required to retain it for legal, tax, or regulatory purposes.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mb-4">9. Third-Party Links</h2>
              <p className="text-gray-600 mb-6">
                Our service may contain links to third-party websites. We are not responsible for the privacy practices of these websites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mb-4">10. Children's Privacy</h2>
              <p className="text-gray-600 mb-6">
                Our service is not intended for children under 18. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will take steps to delete it.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-600 mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the service after changes constitutes acceptance of the new policy.
              </p>

              <h2 className="text-xl font-bold text-gray-800 mb-4">12. Contact Us</h2>
              <p className="text-gray-600 mb-6">
                For questions about this Privacy Policy, please contact us at:
                <br />
                Email: privacy@familymart.in
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

export default Privacy;
