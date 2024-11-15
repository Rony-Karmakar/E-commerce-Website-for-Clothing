import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:justify-around">
        <div className="sm:w-1/4 px-4 mb-8 sm:mb-0">
          <h4 className="text-lg font-bold text-gray-800 mb-6">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-gray-800">About Us</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Our Services</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Affiliate Program</a></li>
          </ul>
        </div>

        <div className="sm:w-1/4 px-4 mb-8 sm:mb-0">
          <h4 className="text-lg font-bold text-gray-800 mb-6">Get Help</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-gray-800">FAQ</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Shipping</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Returns</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Order Status</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Payment Options</a></li>
          </ul>
        </div>

        <div className="sm:w-1/4 px-4">
          <h4 className="text-lg font-bold text-gray-800 mb-6">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-black text-2xl"><FaFacebook /></a>
            <a href="#" className="text-gray-600 hover:text-black text-2xl"><FaTwitter /></a>
            <a href="#" className="text-gray-600 hover:text-black text-2xl"><FaInstagram /></a>
            <a href="#" className="text-gray-600 hover:text-black text-2xl"><FaYoutube /></a>
            <a href="#" className="text-gray-600 hover:text-black text-2xl"><FaLinkedin /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
