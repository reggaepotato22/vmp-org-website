import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4"
        >
          {/* Expanded Conversation Modal */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl p-6 w-80 mb-2 border border-emerald-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Hi there! 👋</h4>
                      <p className="text-xs text-slate-500">How would you like to help?</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsExpanded(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    variant="default" 
                    className="w-full justify-start bg-amber-500 hover:bg-amber-600 text-white"
                    onClick={() => navigate("/donate")}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    I want to Donate
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    onClick={() => navigate("/volunteer")}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    I want to Volunteer
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Trigger Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
              flex items-center gap-2 px-6 py-4 rounded-full shadow-xl transition-all duration-300
              ${isExpanded 
                ? "bg-slate-900 text-white" 
                : "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:shadow-emerald-500/25"
              }
            `}
          >
            {isExpanded ? (
              <>
                <X className="w-5 h-5" />
                <span className="font-medium">Close</span>
              </>
            ) : (
              <>
                <Heart className="w-5 h-5 fill-current animate-pulse" />
                <span className="font-bold">Support Us</span>
              </>
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
