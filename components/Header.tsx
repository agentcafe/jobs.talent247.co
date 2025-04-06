'use client';

import { useState } from 'react';
import Link from 'next/link'; // Use Next.js Link for internal navigation

// Simple SVG Icons (replace with your preferred icon library if desired)
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' }, // Assuming homepage is at root
    { name: 'Jobs', href: '/jobs' },
    { name: 'Companies', href: '/companies' }, // Add actual paths later
    { name: 'Resources', href: '/resources' }, // Add actual paths later
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              Talent<span className="text-blue-300">247</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-150 ease-in-out"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="px-4 py-2 rounded-md text-sm font-medium border border-white hover:bg-white hover:text-blue-600 transition duration-150 ease-in-out">
              Sign In
            </button>
            <button className="px-4 py-2 rounded-md text-sm font-medium bg-yellow-500 hover:bg-yellow-600 text-blue-900 transition duration-150 ease-in-out">
              Post Job
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-indigo-700 p-2 space-y-1 sm:px-3" id="mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition duration-150 ease-in-out"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 pb-3 border-t border-blue-500 space-y-2">
             <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition duration-150 ease-in-out">
              Sign In
            </button>
            <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium bg-yellow-500 hover:bg-yellow-600 text-blue-900 transition duration-150 ease-in-out">
              Post Job
            </button>
          </div>
        </div>
      )}
    </header>
  );
} 