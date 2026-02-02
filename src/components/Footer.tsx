import { Link } from "react-router-dom";
import { Heart, Twitter, Facebook, Instagram } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { settings } = useSettings();

  const footerLinks = {
    organization: [
      { name: "About", path: "/about/overview" },
      { name: "Missions", path: "/missions" },
      { name: "News & Events", path: "/news" },
      { name: "Contact", path: "/contact" },
    ],
    support: [
      { name: "Donate", path: "/donate" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
    ]
  };

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold">Contact info</span>
            </div>
            <div className="space-y-2 text-sm text-white/80">
              <div className="font-semibold text-white">{settings.siteTitle || "Veterinarians with a Mission Programme"}</div>
              <div>Ultimate House,</div>
              <div>Oloolua Road, Ngong Town.</div>
              <div className="mt-2">Phone: 0116-922-908</div>
              <div>Email: {settings.contactEmail || "info@kenyavetsmission.org"}</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Organization</h3>
            <ul className="space-y-2">
              {footerLinks.organization.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                {settings.socialLinks.twitter && (
                  <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {settings.socialLinks.facebook && (
                  <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {settings.socialLinks.instagram && (
                  <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
          © {currentYear} {settings.siteTitle || "veterinarianswithamissionprogramme.org"}  All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
