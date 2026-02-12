import { Link } from "react-router-dom";
import { Twitter, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import logoImage from "@/assets/kenyavetsmission-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { settings } = useSettings();

  const footerLinks = {
    organization: [
      { name: "About Us", path: "/about/overview" },
      { name: "Our Missions", path: "/missions" },
      { name: "News & Events", path: "/news" },
      { name: "Gallery", path: "/gallery" },
    ],
    support: [
      { name: "Donate Now", path: "/donate" },
      { name: "Volunteer", path: "/volunteer" },
      { name: "Contact Us", path: "/contact" },
      { name: "Privacy Policy", path: "/privacy" },
    ]
  };

  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: About */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-6 bg-white p-2 rounded-lg">
              <img src={logoImage} alt="KVM Logo" className="h-12 w-auto" />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Veterinarians with a Mission Programme is dedicated to providing veterinary care to underserved communities while spreading the message of hope and compassion.
            </p>
            <div className="flex space-x-4">
              {settings.socialLinks.facebook && (
                <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-secondary hover:text-slate-900 p-2 rounded-md transition-all">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {settings.socialLinks.twitter && (
                <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-secondary hover:text-slate-900 p-2 rounded-md transition-all">
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {settings.socialLinks.instagram && (
                <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-secondary hover:text-slate-900 p-2 rounded-md transition-all">
                  <Instagram className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Organization</h3>
            <ul className="space-y-3">
              {footerLinks.organization.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-white/80 hover:text-white hover:translate-x-1 transition-all inline-block text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-300 shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">
                  {settings.address || "Ultimate House, Oloolua Road, Ngong Town"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-300 shrink-0" />
                <span className="text-white/80 text-sm">{settings.phone || "0116-922-908"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-300 shrink-0" />
                <span className="text-white/80 text-sm">{settings.contactEmail || "info@kenyavetsmission.org"}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter / Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/60 text-sm">
            © {currentYear} {settings.siteTitle || "Kenya Vets Mission"}. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-white/60">
             <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
             <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
