import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ExternalLink, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useNewsContext } from '../context/NewsContext';

const News = () => {
  const { featuredNews, recentNews, upcomingEvents } = useNewsContext();

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Mission Report": return "bg-blue-100 text-blue-800";
      case "Partnership": return "bg-green-100 text-green-800";
      case "Emergency Response": return "bg-red-100 text-red-800";
      case "Volunteer Story": return "bg-purple-100 text-purple-800";
      case "Milestone": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getEventTypeColor = (type) => {
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
              {featuredNews && (
                <Card className="overflow-hidden">
                  {/* Display uploaded image or placeholder */}
                  {featuredNews.imageUrl || featuredNews.image ? (
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={featuredNews.imageUrl || featuredNews.image} 
                        alt={featuredNews.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-64 bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">No Image Available</span>
                    </div>
                  )}
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
              )}
            </div>

            {/* Recent News */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Recent News</h2>
              <div className="space-y-6">
                {recentNews.map((article, index) => (
                  <Card key={article.id || index}>
                    {/* Display uploaded image for recent news */}
                    {(article.imageUrl || article.image) && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={article.imageUrl || article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
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
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Upcoming Events */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <Card key={event.id || index}>
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
                {upcomingEvents.length === 0 ? (
                  <p className='text-muted-foreground'>No Events available</p>
                ) : null}
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