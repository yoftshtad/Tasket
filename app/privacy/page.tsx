export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl border p-8 shadow-sm">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Tasket ("we," "our," or "us"). We are committed to protecting your personal information 
                and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard 
                your information when you use our platform to access study materials, lecture notes, and academic documents.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-3">We collect information that you provide directly to us:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Account information (name, email address, password)</li>
                <li>Profile data (department, year of study)</li>
                <li>Document access history and downloads</li>
                <li>Communications with us (support requests, feedback)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-3">We use your information to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide, operate, and maintain the platform</li>
                <li>Grant you access to study materials</li>
                <li>Track document downloads for analytics</li>
                <li>Improve user experience and content recommendations</li>
                <li>Communicate important updates about the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. 
                Your data is stored securely using Supabase's encrypted database and authenticated access controls. However, 
                no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Document Ownership</h2>
              <p className="text-gray-700 leading-relaxed">
                All documents uploaded to Tasket are the property of their respective copyright holders. Users may only 
                upload materials they have the right to share. We do not claim ownership of any user-uploaded content.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our platform and store certain information. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed">
                We use Supabase for authentication and database management. Your data is processed in accordance with their 
                privacy policy and security standards. We do not sell or share your personal information with third parties 
                for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-3">Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your account and data</li>
                <li>Opt-out of certain data processing activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our service is intended for university students and academic users. We do not knowingly collect personal 
                information from children under 13. If you become aware that a child has provided us with personal information, 
                please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:{' '}
                <a href="mailto:privacy@unidocs.com" className="text-purple-600 hover:underline">
                  privacy@unidocs.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}