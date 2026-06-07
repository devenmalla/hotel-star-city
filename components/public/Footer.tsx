import Link from 'next/link';
import Logo from '@/components/Logo';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1B1B1B] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo className="h-12 w-12" />
              <div>
                <p className="font-bold text-white text-lg leading-tight">Hotel Star City</p>
                <p className="text-[#A8C65B] text-sm">Lodging & Fooding</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A comfortable and affordable stay in the heart of Dimapur, Nagaland.
              Your home away from home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/rooms', label: 'Our Rooms' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
                { href: '/booking', label: 'Book Now' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#A8C65B] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4 text-[#5F8C3F] mt-0.5 shrink-0" />
                M.P. Road, Murgi Patti, Dimapur - 797112, Nagaland
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="h-4 w-4 text-[#5F8C3F] shrink-0" />
                <a href="tel:+918787430576" className="hover:text-[#A8C65B]">
                  +91 8787430576
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="h-4 w-4 text-[#5F8C3F] shrink-0" />
                <a href="mailto:hotelstarcityofficial@gmail.com" className="hover:text-[#A8C65B]">
                  hotelstarcityofficial@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Hotel Star City. All rights reserved.
        </div>
      </div>
    </footer>
  );
}