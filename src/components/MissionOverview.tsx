import { Heart, Users, Globe, Award } from "lucide-react";

const MissionOverview = () => {
  const stats = [
    { icon: Heart, label: "Born Again", value: "10,000+" },
    { icon: Users, label: "Volunteers", value: "500+" },
    { icon: Globe, label: "Counties Served", value: "25+" },
    { icon: Award, label: "Years of Service", value: "12" },
  ];

  const sponsors = [
    { name: "Mission Aviation Fellowship", logo: "/src/assets/vmphotos/maf.svg", url: "https://maf.org/" },
    { name: "Citam Karen", logo: "/src/assets/vmphotos/citam.jpg", url: "https://citam.org" },
    { name: "Christian Veterinary Mission", logo: "/src/assets/vmphotos/cvm.webp", url: "https://cvm.org" },
    { name: "CVAN", logo: "/src/assets/vmphotos/round.png", url: "https://compassion.com" },
  ];

  return (
    <section id="who-we-are" className="py-16 bg-mission-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Who We Are
          </h2>
        </div>

        {/* Overview Section */}
        <div id="overview" className="mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center">
            Vet Missions is a faith-based organization dedicated to providing veterinary care 
            to animals in underserved communities worldwide. We believe in the power of 
            compassion and service to transform lives—both human and animal—while spreading 
            the message of God's love.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
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
            Founded in 20-- by Dr. Josiah Mandieka, Veterinarians with a Mission began with 
            a small group of volunteers and a vision to make a difference. Over the years, we 
            have expanded our reach, conducting missions in numerous countries and impacting 
            countless lives. Our journey is a testament to the unwavering dedication of our 
            team and the support of our generous donors.
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
              <span className="font-semibold text-foreground">— Community Leader, Kenya</span>
            </div>
            <div className="p-6 bg-white/10 rounded-xl shadow-md">
              <p className="text-muted-foreground mb-4">
                "Their compassion and dedication not only saved animals but also touched lives 
                with God’s message."
              </p>
              <span className="font-semibold text-foreground">— Volunteer Veterinarian</span>
            </div>
          </div>
        </div>

        {/* Sponsors Section */}
        <div id="sponsors">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Our Sponsors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            {sponsors.map((sponsor, index) => (
              <a
                key={index}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center transform transition hover:scale-105"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-16 object-contain grayscale hover:grayscale-0 transition"
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
