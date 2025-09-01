import { Heart, Users, Globe, Award } from "lucide-react";

const MissionOverview = () => {
  const stats = [
    { icon: Heart, label: "Animals Treated", value: "10,000+" },
    { icon: Users, label: "Volunteers", value: "500+" },
    { icon: Globe, label: "Countries Served", value: "25+" },
    { icon: Award, label: "Years of Service", value: "14" },
  ];

  return (
    <section className="py-16 bg-mission-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Who We Are
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Vet Missions is a faith-based organization dedicated to providing veterinary care to animals 
            in underserved communities worldwide. We believe in the power of compassion and service to 
            transform lives, both human and animal, while spreading the message of God's love.
          </p>
        </div>

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

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">What We Do</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We organize veterinary mission trips to various locations, offering essential medical 
              services to animals in need. Our teams of skilled veterinarians and volunteers work 
              tirelessly to improve animal health, prevent diseases, and educate local communities 
              on animal care practices.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Free veterinary care and medical treatments</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Community education on animal welfare</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Training local volunteers and staff</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Spay and neuter programs</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Our History</h3>
            <p className="text-muted-foreground leading-relaxed">
              Founded in 20-- by Dr. Josiah Mandieka, Veterianrians with a Mission Programe began with a small group of volunteers 
              and a vision to make a difference. Over the years, we have expanded our reach, conducting 
              missions in numerous countries and impacting countless lives. Our journey is a testament to 
              the unwavering dedication of our team and the support of our generous donors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionOverview;