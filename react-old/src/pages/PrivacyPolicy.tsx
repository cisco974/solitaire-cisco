import React from 'react';
import { StandardPage } from '../components/StandardPage';

export function PrivacyPolicy() {
  return (
    <StandardPage title="Privacy Policy">
      <p className="lead text-xl text-gray-600 mb-8">
        At SLTR.com, we take your privacy seriously. This Privacy Policy explains how 
        we collect, use, disclose, and safeguard your information when you visit our website.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Information We Collect</h2>
      <p>
        We collect information that you voluntarily provide to us when you:
      </p>
      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>Register an account</li>
        <li>Sign up for our newsletter</li>
        <li>Contact us through our support channels</li>
        <li>Participate in our community features</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How We Use Your Information</h2>
      <p>
        The information we collect is used to:
      </p>
      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>Provide and maintain our service</li>
        <li>Notify you about changes to our service</li>
        <li>Allow you to participate in interactive features</li>
        <li>Provide customer support</li>
        <li>Monitor the usage of our service</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Cookies and Tracking</h2>
      <p>
        We use cookies and similar tracking technologies to track activity on our website 
        and hold certain information. Cookies are files with small amount of data which 
        may include an anonymous unique identifier.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Data Security</h2>
      <p>
        The security of your data is important to us, but remember that no method of 
        transmission over the Internet, or method of electronic storage is 100% secure. 
        While we strive to use commercially acceptable means to protect your personal 
        information, we cannot guarantee its absolute security.
      </p>

      <div className="bg-gray-50 rounded-xl p-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Rights</h2>
        <p className="text-gray-600">
          You have the right to:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
          <li>Access your personal data</li>
          <li>Correct inaccurate personal data</li>
          <li>Request deletion of your personal data</li>
          <li>Object to our processing of your personal data</li>
          <li>Request restriction of processing your personal data</li>
        </ul>
      </div>

      <div className="bg-emerald-50 rounded-xl p-8 mt-12">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Contact Information</h2>
        <p className="text-emerald-800">
          If you have any questions about this Privacy Policy, please contact us at{' '}
          <a href="mailto:privacy@sltr.com" className="text-emerald-600 hover:text-emerald-700">
            privacy@sltr.com
          </a>
        </p>
      </div>
    </StandardPage>
  );
}