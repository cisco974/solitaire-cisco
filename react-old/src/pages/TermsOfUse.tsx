import React from 'react';
import { StandardPage } from '../components/StandardPage';

export function TermsOfUse() {
  return (
    <StandardPage title="Terms of Use">
      <p className="lead text-xl text-gray-600 mb-8">
        Welcome to SLTR.com. By accessing and using our website, you agree to comply 
        with and be bound by the following terms and conditions of use.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Acceptance of Terms</h2>
      <p>
        By accessing and using SLTR.com, you accept and agree to be bound by the terms 
        and provision of this agreement. Additionally, when using our website's specific 
        services, you shall be subject to any posted guidelines or rules applicable to 
        such services.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. User Account</h2>
      <p>
        Some features of our website may require registration. You agree to provide accurate, 
        current, and complete information during the registration process and to update such 
        information to keep it accurate, current, and complete.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Fair Usage</h2>
      <p>
        You agree to use SLTR.com only for lawful purposes and in a way that does not 
        infringe the rights of, restrict, or inhibit anyone else's use and enjoyment 
        of the website.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Intellectual Property</h2>
      <p>
        The content, organization, graphics, design, compilation, magnetic translation, 
        digital conversion, and other matters related to the Site are protected under 
        applicable copyrights, trademarks, and other proprietary rights.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Limitation of Liability</h2>
      <p>
        SLTR.com shall not be liable for any damages arising out of or in connection 
        with the use or inability to use our services. This includes but is not limited 
        to direct, indirect, incidental, consequential, and punitive damages.
      </p>

      <div className="bg-gray-50 rounded-xl p-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
        <p className="text-gray-600">
          If you have any questions about these Terms of Use, please contact us at{' '}
          <a href="mailto:support@sltr.com" className="text-emerald-600 hover:text-emerald-700">
            support@sltr.com
          </a>
        </p>
      </div>
    </StandardPage>
  );
}