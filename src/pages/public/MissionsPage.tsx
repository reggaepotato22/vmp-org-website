import MissionsGrid from "@/features/public/missions/MissionsGrid";
import { Button } from "@/components/ui/button";

const MissionsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
       {/* Page Header */}
       <section className="bg-emerald-50 text-slate-900 py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 text-center relative z-10">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Mission Reports</h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                    Documenting our journey of service and compassion across Kenya.
                </p>
            </div>
        </section>

        <MissionsGrid />

        {/* Call to Action */}
        <section className="py-16 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 text-center">
                <h3 className="text-2xl font-heading font-bold text-slate-800 mb-6">
                    Want to join us on our next mission?
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-blue-200 hover:bg-blue-300 text-slate-900 font-bold rounded-full px-8">
                        Volunteer With Us
                    </Button>
                    <Button size="lg" variant="outline" className="border-blue-600 text-blue-900 hover:bg-blue-50 font-bold rounded-full px-8">
                        Support a Mission
                    </Button>
                </div>
            </div>
        </section>
    </div>
  );
};

export default MissionsPage;
