import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">JobHunt</h2>
          <p>Your dream job is just a click away. Find the right opportunity that matches your skills and goals.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
            <li><a href="/careers" className="hover:text-gray-400">Careers</a></li>
            <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2">
            <li><a href="/blog" className="hover:text-gray-400">Blog</a></li>
            <li><a href="/help" className="hover:text-gray-400">Help Center</a></li>
            <li><a href="/privacy" className="hover:text-gray-400">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-gray-400"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-gray-400"><FaLinkedinIn size={20} /></a>
            <a href="#" className="hover:text-gray-400"><FaInstagram size={20} /></a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p>&copy; {new Date().getFullYear()} JobHunt. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;