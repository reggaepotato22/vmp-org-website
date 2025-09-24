import React from 'react';
import { Button } from '@/components/ui/button';
// import { ImageSlideshow } from '@/components/ui/ImageSlideshow';
import { Link } from 'react-router-dom';
import vetWithDogImage from '@/assets/flock.jpg';
import communityOutreachImage from '@/assets/lodwar.jpg';
import naturalFigureImage from '@/assets/hero-cross.png';
import { ImageSlideshow } from '@/components/ui/ImageSlideshow';

const Reports = () => {
  const slideshowImages = [
    {
      src: vetWithDogImage,
      alt: 'Veterinarian providing care to animals'
    },
    {
      src: communityOutreachImage,
      alt: 'Community outreach and engagement activities'
    }
  ];

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link to="/missions" className="hover:text-foreground transition-colors">
              Missions
            </Link>
            <span className="mx-2">/</span>
            <Link to="/missions/2025" className="hover:text-foreground transition-colors">
              2025
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Mataarba Report</span>
          </div>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Mataarba Mission 2025 Report
          </h1>
        </header>

        {/* Mission Overview */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Mission Overview
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The Mataarba Mission 2025 team from July 15th to July 22nd, aimed to provide essential veterinary care and spiritual support to the 
            Mataarba community. Our team of 12 volunteers including veterinarians, technicians, and support staff, worked tirelessly to address the 
            health needs of both livestock and pets, while also engaging in community outreach activities.
          </p>
          
          {/* Natural Figure Image */}
          <div className="w-full h-64 mb-8 rounded-lg overflow-hidden">
            <img
              src={naturalFigureImage}
              alt="Mission natural figure illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Activities & Outcomes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Activities & Outcomes
          </h2>
          
          <h3 className="text-lg font-medium text-foreground mb-3">
            Veterinary Services
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Our veterinary team treated over 300 animals, including cattle, goats, sheep, dogs and cats. Common ailments treated included parasitic 
            infections, respiratory diseases, and injuries. We also provided vaccinations and performed routine surgical procedures. The total value of 
            veterinary services provided was estimated at $15,000.
          </p>

          {/* Image Slideshow */}
          <ImageSlideshow images={slideshowImages} className="mb-6" />
        </section>

        {/* Spiritual Outreach */}
        <section className="mb-8">
          <h3 className="text-lg font-medium text-foreground mb-3">
            Spiritual Outreach
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            In addition to veterinary care, we conducted daily community gatherings, sharing messages of hope and faith. We engaged in biblical 
            discussions, participated in local Bible ceremonies, and organized devotions. We also distributed over 200 Bibles and organized evangelistic 
            opportunities with community members. The team also participated in individual and overall housing, education and spiritual activities, 
            providing both spiritual and practical support to community members.
          </p>
        </section>

        {/* Impact on the Community */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Impact on the Community
          </h2>
          
          <h3 className="text-lg font-medium text-foreground mb-3">
            Veterinary
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The mission significantly improved the health and well-being of domestic animals in Mataarba, leading to increased productivity and 
            reduced animal suffering. Local farmers received valuable training and education, improving their long-term animal husbandry practices and the overall health of 
            livestock in the community.
          </p>

          <h3 className="text-lg font-medium text-foreground mb-3">
            Spiritual
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Our spiritual outreach efforts, including church ceremonies, Bible connections, and materials, had a profound impact on the community. 
            Many community members expressed desire for spiritual guidance and support, strengthening their faith in Christ and enhancing their understanding of 
            possibilities for the heart. Our work for Christ brought spiritual relief and strengthened faith for the community. The mission strengthened 
            relationships between our organizations and the faithful by encouraging connection and spiritual understanding.
          </p>
        </section>

        {/* Challenges */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Challenges
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The mission faced several challenges, including limited resources, logistical difficulties in transporting supplies, and language barriers. 
            Despite these obstacles, the team remained committed and successfully achieved its objectives. We learned valuable lessons that will inform our 
            planning for future missions.
          </p>
        </section>

        {/* Conclusion */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Conclusion
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The Mataarba Mission 2025 was a resounding success, achieving significant veterinary and spiritual support to the community. The 
            dedication and hard work of our volunteers made a tangible difference in the lives of both animals and people. We are grateful for this 
            opportunity to serve and look forward to continuing our partnerships with the Mataarba community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/missions/2025">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Return to 2025 Missions
              </Button>
            </Link>
            <Link to="/missions">
              <Button variant="outline">
                Return to Mission Database
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Reports;