export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl border p-8 shadow-sm">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using Tasket ("the Platform"), you agree to be bound by these Terms of Service. 
                If you disagree with any part of these terms, you may not access the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed">
                UniDocs provides a platform for university students to access lecture notes, past exams, modules, 
                and other academic study materials organized by department, year, and course.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
              <p className="text-gray-700 leading-relaxed mb-3">To access the platform, you must:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Create an account with accurate and complete information</li>
                <li>Be a current university student or academic user</li>
                <li>Safeguard your login credentials</li>
                <li>Be at least 13 years old</li>
                <li>Notify us immediately of any unauthorized account access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. User Conduct</h2>
              <p className="text-gray-700 leading-relaxed mb-3">You agree NOT to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Upload copyrighted material without proper authorization</li>
                <li>Share your account credentials with others</li>
                <li>Use the platform for any illegal purpose</li>
                <li>Attempt to bypass security measures</li>
                <li>Download materials for commercial redistribution</li>
                <li>Harass, abuse, or harm other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Content Ownership and License</h2>
              <p className="text-gray-700 leading-relaxed">
                Users retain ownership of the content they upload. By uploading content, you grant UniDocs a non-exclusive 
                license to host, store, and display the content for the purpose of providing the service. You represent that 
                you have the right to share any materials you upload.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Copyright Infringement</h2>
              <p className="text-gray-700 leading-relaxed">
                We respect intellectual property rights and expect our users to do the same. If you believe your copyrighted 
                work has been used without permission, please contact us with:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
                <li>Description of the copyrighted work</li>
                <li>Location of the material on our platform</li>
                <li>Your contact information</li>
                <li>A statement of good faith belief of unauthorized use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice, for conduct that violates 
                these Terms or is harmful to other users. You may delete your account at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Disclaimer of Warranties</h2>
              <p className="text-gray-700 leading-relaxed">
                The platform is provided "as is" without warranties of any kind. We do not guarantee the accuracy, 
                completeness, or usefulness of any study materials. Content is user-uploaded and may contain errors.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the maximum extent permitted by law, UniDocs shall not be liable for any indirect, incidental, 
                or consequential damages arising from your use of the platform, including but not limited to academic 
                performance issues arising from reliance on study materials.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of the platform after changes 
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws applicable in your jurisdiction, 
                without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">12. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                Questions about these Terms should be sent to:{' '}
                <a href="mailto:legal@unidocs.com" className="text-purple-600 hover:underline">
                  legal@unidocs.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}