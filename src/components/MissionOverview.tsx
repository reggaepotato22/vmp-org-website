import { Heart, Users, Globe, Award } from "lucide-react";

const MissionOverview = () => {
  const stats = [
    { icon: Heart, label: "Born Again", value: "2,000+" },
    { icon: Users, label: "Volunteers", value: "500+" },
    { icon: Globe, label: "Counties Served", value: "10+" },
    { icon: Award, label: "Years of Service", value: "15+" },
  ];

  const sponsors = [
    { 
      name: "Mission Aviation Fellowship", 
      logo: new URL('/src/assets/vmphotos/maf.svg', import.meta.url).href, 
      url: "https://maf.org/" 
    },
    { 
      name: "Citam Karen", 
      logo: new URL('/src/assets/vmphotos/citam.jpg', import.meta.url).href, 
      url: "https://citam.org" 
    },
    { 
      name: "Christian Veterinary Mission", 
      logo: new URL('/src/assets/vmphotos/cvm.webp', import.meta.url).href, 
      url: "https://cvm.org" 
    },
    { 
      name: "Ultimate Vetserve Limited", 
      logo: new URL('/src/assets/vmphotos/uvs.svg', import.meta.url).href, 
      url: "https://ultimatevetserve.com" 
    },
  ];

  return (
    <section id="who-we-are" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Vision & Mission Section - ShareInt Style */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-2">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Our Vision
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed font-medium">
              To enhance God’s Kingdom on earth.
            </p>
          </div>
          
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-block p-3 bg-secondary/10 rounded-full mb-2">
              <Heart className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Our Mission
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed font-medium">
              To share the love of God to mankind through veterinary skills.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-100 mb-20"></div>

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Who We Are
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Veterinarians with a Mission Programme is a faith-based organization dedicated to providing veterinary care 
            to animals in underserved communities worldwide. We believe in the power of 
            compassion and service to transform lives—both human and animal—while spreading 
            the message of God's love.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* History Section */}
        <div id="history" className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-4 text-center">Our History</h3>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto text-center">
            Founded in 2010 by Dr. Josiah Mandieka, and other directors, Mrs. Phellis Mandieka, Dr. John Mwangi, and Dr. Ezra Saitoti . Veterinarians with a Mission began with 
            a small group of volunteers and a vision to make a difference in the lives of the unreached pastoral communities in Kenya with the gospel of Jesus Christ and veterinary care. Over the years, we 
            have expanded our reach, conducting missions in numerous counties in Kenya and impacting 
            countless lives. Our journey is a testament to the unwavering dedication of our 
            teams and the support of our generous donors.
          </p>
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">What People Say</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white/10 rounded-xl shadow-md">
              <p className="text-muted-foreground mb-4">
                "Vet Missions transformed our community by bringing veterinary care and hope 
                through Christ’s love."
              </p>
              <span className="font-semibold text-foreground">— Dr. Josiah Mandieka</span>
            </div>
            <div className="p-6 bg-white/10 rounded-xl shadow-md">
              <p className="text-muted-foreground mb-4">
                "Their compassion and dedication not only saved animals but also touched lives 
                with God’s message."
              </p>
              <span className="font-semibold text-foreground">Dr. Ezra Saitoti</span>
            </div>
          </div>
        </div>

        {/* Sponsors Section */}
        <div id="sponsors">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Our Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            {sponsors.map((sponsor, index) => (
              <a
                key={index}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center transform transition hover:scale-110"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-20 md:h-24 max-w-[160px] object-contain grayscale hover:grayscale-0 transition"
                />
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MissionOverview;

