import DonationForm from "@/features/public/donate/DonationForm";
import ImpactLevels from "@/features/public/donate/ImpactLevels";
import { CheckCircle2 } from "lucide-react";

const DonatePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <section className="bg-blue-50 text-slate-900 pt-20 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Support Our Mission
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Your generosity empowers us to provide essential veterinary care, training, and hope to communities that need it most.
            </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 -mt-20 relative z-20 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column: Form */}
            <div className="w-full lg:w-5/12 order-2 lg:order-1">
                <DonationForm />
            </div>

            {/* Right Column: Info & Impact */}
            <div className="w-full lg:w-7/12 order-1 lg:order-2 lg:pt-20">
                <div className="mb-12">
                    <h2 className="text-3xl font-heading font-bold text-slate-800 mb-6">
                        How Your Gift Helps
                    </h2>
                    <ImpactLevels />
                </div>

                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Why Give to Kenya Vets Mission?</h3>
                    <ul className="space-y-4">
                        {[
                            "Direct Impact: 90% of funds go directly to field operations.",
                            "Sustainable Change: We train locals to care for their own animals.",
                            "Holistic Care: We address both animal health and human spiritual needs.",
                            "Transparency: We provide regular reports on how funds are used."
                        ].map((item, i) => (
                            <li key={i} className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-600">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default DonatePage;
