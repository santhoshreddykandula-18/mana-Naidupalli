import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, MessageSquare, Camera, Video } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Mana Naidupalli</h3>
            <p className="text-primary-light text-sm leading-relaxed">
              A digital platform connecting our village, our people, our culture and our future.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary-light">
              <MapPin size={16} />
              <span>Naidupalli Village</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Explore</h3>
            <ul className="space-y-2 text-sm text-primary-light">
              <li><Link to="/announcements" className="hover:text-white transition-colors">Announcements</Link></li>
              <li><Link to="/events" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link to="/temples" className="hover:text-white transition-colors">Temples</Link></li>
              <li><Link to="/cricket" className="hover:text-white transition-colors">Cricket</Link></li>
              <li><Link to="/agriculture" className="hover:text-white transition-colors">Agriculture</Link></li>
              <li><Link to="/education" className="hover:text-white transition-colors">Education</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-primary-light">
              <li><Link to="/government" className="hover:text-white transition-colors">Government Services</Link></li>
              <li><Link to="/emergency" className="hover:text-white transition-colors">Emergency Contacts</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-light hover:text-white transition-colors" aria-label="Website">
                <Globe size={20} />
              </a>
              <a href="#" className="text-primary-light hover:text-white transition-colors" aria-label="Messages">
                <MessageSquare size={20} />
              </a>
              <a href="#" className="text-primary-light hover:text-white transition-colors" aria-label="Instagram">
                <Camera size={20} />
              </a>
              <a href="#" className="text-primary-light hover:text-white transition-colors" aria-label="YouTube">
                <Video size={20} />
              </a>
            </div>
            <div className="space-y-2 text-sm text-primary-light">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@mananaidupalli.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91-xxxxxxxxxx</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-light text-sm">
              © {currentYear} Mana Naidupalli. Built for our village community. -santhosh reddy
            </p>
            <p className="text-primary-light/70 text-xs">
              This is a community website, not an official government portal.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}