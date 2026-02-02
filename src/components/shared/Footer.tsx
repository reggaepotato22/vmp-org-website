import { Link } from "react-router-dom";
import { Twitter, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          
          {/* Brand & Contact */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-heading font-bold text-white">
                Kenya Vets Mission
              </h3>
              <p className="text-slate-400 max-w-sm">
                Serving God by serving His creation. Providing professional veterinary care to underserved communities.
              </p>
            </div>
            
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5" />
                <span>
                  Ultimate House, Oloolua Road<br />
                  Ngong Town, Kenya
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <span>0116-922-908</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <span>info@kenyavetsmission.org</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-6">Organization</h3>
            <ul className="space-y-4">
              {["About Us", "Our History", "Missions", "News & Events", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(/ /g, "-").replace("&", "")}`}
                    className="hover:text-accent transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-6">Get Involved</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/donate" className="text-accent font-semibold hover:text-white transition-colors">
                  Donate Now
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-accent transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/prayer" className="hover:text-accent transition-colors">
                  Prayer Partners
                </Link>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-accent hover:text-white transition-all">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-accent hover:text-white transition-all">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-accent hover:text-white transition-all">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 text-center text-slate-500 text-sm">
          <p>© {currentYear} Veterinarians With a Mission Programme. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
