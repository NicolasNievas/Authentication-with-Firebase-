import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 text-center">
      <div className="container mx-auto">
        <p className="text-sm">
          <a href="https://www.linkedin.com/in/nievas-nicolas/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            © 2024 Nicolas Nievas
          </a>
        </p>
        <p className="text-sm mt-2">
          <a href="https://github.com/NicolasNievas/Authentication-with-Firebase-" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
            GitHub Repository
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
