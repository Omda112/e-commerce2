import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-lg font-bold mb-4 text-green-700">Company</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-green-600">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">Careers</a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">Brand Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">Blog</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4 text-green-700">Help center</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-green-600">Discord Server</a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">Twitter</a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">Facebook</a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">Contact Us</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4 text-green-700">Legal</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-green-600">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">Licensing</a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">Terms & Conditions</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4 text-green-700">Social Media</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-green-600">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-200 pt-4 text-center">
          <p className="text-sm">© 2025 YourBrand™. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
