import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ExternalLink, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const News = () => {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const featuredNews = {
    title: "VMP Website launched",
    excerpt: "Reflecting on over a decade of transforming communities through faith-based veterinary care, with over 10,000 animals treated across 25+ countries.",
    date: "1st October 2025",
    category: "complete",
    image: "/src/assets/vmphotos/calf.jpg",
    readTime: "∞",
    link: "kenyavetsmission.org",
  };

  const recentNews = [
    {
      title: "Mataarba Mission",
      excerpt: " Provided essential veterinary care and spiritual support to the Mataarba community with comprehensive animal health services.",
      date: "July 15-22, 2025",
      category: "Mission Report",
      readTime: "5 min read",
      link: "/missions/mataarba/mataarba-2025"
    },
    // {
    //   title: "Partnership with Local Veterinary Schools",
    //   excerpt: "VMP announces collaborative training programs with veterinary institutions in Maasai Mara University.",
    //   date: "February 28, 2024", 
    //   category: "Partnership",
    //   readTime: "4 min read"
    // },
    // {
    //   title: "Emergency Response Team Deployed to Maasai Mara",
    //   excerpt: "Following recent natural disasters, VMP's rapid response team provided critical care to affected animals.",
    //   date: "February 15, 2024",
    //   category: "Emergency Response",
    //   readTime: "3 min read"
    // },
    // {
    //   title: "Volunteer Spotlight: Dr. George Mulovi",
    //   excerpt: "Meet Dr. Mulovi, who has served on 8 VMP missions, bringing hope and healing to communities worldwide.",
    //   date: "February 5, 2024",
    //   category: "Volunteer Story",
    //   readTime: "6 min read"
    // }
  ];

  const upcomingEvents = [
    // {
    //   title: "Annual VMP Fundraising Gala",
    //   date: "May 18, 2024",
    //   time: "6:00 PM",
    //   location: "Ole Sereni, Southern Bypass",
    //   description: "Join us for an evening of celebration, fellowship, and fundraising for our global missions.",
    //   type: "Fundraiser"
    // },
    // {
    //   title: "Volunteer Training Workshop",
    //   date: "April 22, 2024", 
    //   time: "9:00 AM - 4:00 PM",
    //   location: "VMP Headquarters",
    //   description: "Comprehensive training for new volunteers preparing for international missions.",
    //   type: "Training"
    // },
    // {
    //   title: "Mission Preparation Meeting - Uganda",
    //   date: "April 15, 2024",
    //   time: "7:00 PM",
    //   location: "Virtual Meeting",
    //   description: "Pre-mission briefing for volunteers joining our Uganda livestock health initiative.",
    //   type: "Meeting"
    // },
    // {
    //   title: "Community Outreach - Kimuka Animal healthcare",
    //   date: "April 6, 2024",
    //   time: "10:00 AM - 2:00 PM", 
    //   location: "Kimuka Animal Shelter",
    //   description: "Local volunteer opportunity providing veterinary care at our partner shelter.",
    //   type: "Local Service"
    // }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Mission Report": return "bg-blue-100 text-blue-800";
      case "Partnership": return "bg-green-100 text-green-800";
      case "Emergency Response": return "bg-red-100 text-red-800";
      case "Volunteer Story": return "bg-purple-100 text-purple-800";
      case "Milestone": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Fundraiser": return "bg-primary/10 text-primary";
      case "Training": return "bg-blue-100 text-blue-800";
      case "Meeting": return "bg-orange-100 text-orange-800";
      case "Local Service": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              News & Events
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with our latest missions, partnerships, and upcoming events as we continue enhancing God's Kingdom worldwide.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Article */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Featured Story</h2>
              <Card className="overflow-hidden">
                <div className="h-64 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">Featured Image</span>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getCategoryColor(featuredNews.category)}>
                      {featuredNews.category}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredNews.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{featuredNews.title}</CardTitle>
                  <CardDescription className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {featuredNews.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{featuredNews.excerpt}</p>
                  <Button>
                    Read Full Article
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent News */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Recent News</h2>
              <div className="space-y-6">
                {recentNews.map((article, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor(article.category)}>
                          {article.category}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                      <CardDescription className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {article.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                      {article.link ? (
                        <Button asChild variant="outline" size="sm">
                          <Link to={article.link} onClick={handleLinkClick}>
                            Read More
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          Read More
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  View All News Articles
                </Button>
              </div> */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Upcoming Events */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {event.date} at {event.time}
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.location}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                      <Button size="sm" className="w-full">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <p>
                  No Events available
                </p>
                {/* <Button variant="outline">
                  View All Events
                </Button> */}
              </div>
            </div>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle>Stay Connected</CardTitle>
                <CardDescription>
                  Subscribe to our newsletter for mission updates and event announcements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-border rounded-md text-sm"
                  />
                  <Button className="w-full">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default News;