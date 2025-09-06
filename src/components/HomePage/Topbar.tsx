import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
} from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <div className="bg-[#2E363A] text-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-2 md:flex-row">
        {/* Left side - Contact Info (hide on mobile) */}
        <div className="hidden flex-wrap items-center gap-6 text-[#888888] sm:flex">
          <p className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-400" /> India
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} className="text-green-400" /> +91 - 87677 85461
          </p>
          <p className="flex items-center gap-2">
            <Mail size={16} className="text-red-400" />{' '}
            sjcgroupconsultant@gmail.com
          </p>
        </div>

        {/* Right side - Social Icons (always visible) */}
        <div className="flex gap-4 text-white">
          <a href="#" className="hover:text-blue-500">
            <Facebook size={18} />
          </a>
          <a href="#" className="hover:text-sky-400">
            <Twitter size={18} />
          </a>
          <a href="#" className="hover:text-red-500">
            <Youtube size={18} />
          </a>
          <a href="#" className="hover:text-blue-600">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
