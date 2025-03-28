
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">KJ CONNECT</h3>
            <p className="text-gray-600 mb-4">
              A platform for college committees to manage and post events while providing students with easy access to event details and registration.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-kj-blue">Home</Link></li>
              <li><Link to="/events" className="text-gray-600 hover:text-kj-blue">Events</Link></li>
              <li><Link to="/internships" className="text-gray-600 hover:text-kj-blue">Internships</Link></li>
              <li><Link to="/exam-cell" className="text-gray-600 hover:text-kj-blue">Exam Cell</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-600">
              Email: support@kjconnect.com<br />
              Location: KJ Somaiya College of Engineering<br />
              Mumbai, Maharashtra
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} KJ CONNECT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
