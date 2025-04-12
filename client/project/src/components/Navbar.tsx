import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hotel, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Hotel className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">HotelHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/search"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Check Booking
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact Us
            </Link>
            <a
              href="#download"
              className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Download
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
  <div className="md:hidden px-4 pb-4 space-y-1.5">
    {[
      { label: 'Check Booking', to: '/search' },
      { label: 'About Us', to: '/about' },
      { label: 'Contact Us', to: '/contact' },
    ].map((item, idx, arr) => (
      <Link
        key={item.to}
        to={item.to}
        className="block border-b border-gray-200 last:border-none bg-gray-50 hover:bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm font-medium shadow-sm  md:shadow-md transition "
        onClick={() => setMenuOpen(false)}
      >
        {item.label}
      </Link>
    ))}
    <a
      href="#download"
      className="block bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm transition w-fit"
      onClick={() => setMenuOpen(false)}
    >
      Download
    </a>
  </div>
)}

    </nav>
  );
};

export default Navbar;
