// import Navigation from "@/components/Navigation";
// import Footer from "@/components/Footer";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Calendar, Award, Users, Globe } from "lucide-react";

// const About = () => {
//   const timeline = [
//     {
//       year: "2010",
//       title: "Founding of Vet Missions",
//       description: "Vet Missions was established with a vision to serve communities in need."
//     },
//     {
//       year: "2012", 
//       title: "First International Mission Trip",
//       description: "Our first mission trip to a rural village provided essential veterinary care."
//     },
//     {
//       year: "2015",
//       title: "Expansion to South America", 
//       description: "Expanded our reach to South America, providing care in multiple countries."
//     },
//     {
//       year: "2020",
//       title: "Reached 10,000 Animals Treated",
//       description: "Celebrated a milestone of treating over 10,000 animals worldwide."
//     }
//   ];

//   const testimonials = [
//     {
//       name: "Dr. Kathy Dunaway",
//       role: "Founder & Lead Veterinarian",
//       year: "2022",
//       content: "My experience with Vet Missions was truly life-changing. The opportunity to use my skills to help animals in need while sharing my faith was incredibly rewarding.",
//       rating: 5
//     },
//     {
//       name: "Dr. Troy Sammons",
//       role: "Volunteer Veterinarian", 
//       year: "2023",
//       content: "Vet Missions provides a unique platform for veterinarians to make a global impact. The dedication and compassion of the team are inspiring.",
//       rating: 5
//     }
//   ];

//   return (
//     <div className="min-h-screen">
//       <Navigation />
      
//       <main className="pt-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Hero Banner */}
//           <div className="relative rounded-xl overflow-hidden mb-12">
//             <img 
//               src="src/assets/flock.jpg"
//               alt="Veterinarians working with animals"
//               className="w-full h-64 object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
//               <div className="max-w-3xl px-8">
//                 <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
//                 <p className="text-xl text-white/90">
//                   Learn more about our mission, history, and the dedicated team working to 
//                   improve animal health worldwide.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <Tabs defaultValue="overview" className="mb-16">
//             <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="history">History</TabsTrigger>
//               <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
//             </TabsList>

//             <TabsContent value="overview" className="space-y-8">
//               <div className="prose prose-lg max-w-none">
//                 <p className="text-lg leading-relaxed mb-8">
//                   Vet Missions is a non-profit organization dedicated to providing veterinary care to 
//                   underserved communities around the world. Our mission is to improve animal health and 
//                   welfare, promote public health, and share the love of Christ through compassionate service. 
//                   We believe that by working together, we can make a lasting impact on the lives of both 
//                   animals and people.
//                 </p>
//               </div>

//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 <Card className="text-center">
//                   <CardContent className="p-6">
//                     <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                       <Users className="h-8 w-8 text-primary" />
//                     </div>
//                     <h3 className="font-semibold text-lg mb-2">500+ Volunteers</h3>
//                     <p className="text-muted-foreground text-sm">
//                       Dedicated professionals and volunteers from around the world
//                     </p>
//                   </CardContent>
//                 </Card>

//                 <Card className="text-center">
//                   <CardContent className="p-6">
//                     <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                       <Globe className="h-8 w-8 text-primary" />
//                     </div>
//                     <h3 className="font-semibold text-lg mb-2">25+ Countries</h3>
//                     <p className="text-muted-foreground text-sm">
//                       Serving communities across multiple continents
//                     </p>
//                   </CardContent>
//                 </Card>

//                 <Card className="text-center">
//                   <CardContent className="p-6">
//                     <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                       <Award className="h-8 w-8 text-primary" />
//                     </div>
//                     <h3 className="font-semibold text-lg mb-2">10,000+ Animals</h3>
//                     <p className="text-muted-foreground text-sm">
//                       Lives touched through our veterinary care programs
//                     </p>
//                   </CardContent>
//                 </Card>

//                 <Card className="text-center">
//                   <CardContent className="p-6">
//                     <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                       <Calendar className="h-8 w-8 text-primary" />
//                     </div>
//                     <h3 className="font-semibold text-lg mb-2">14 Years</h3>
//                     <p className="text-muted-foreground text-sm">
//                       Of dedicated service to animals and communities
//                     </p>
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>

//             <TabsContent value="history">
//               <Card>
//                 <CardContent className="p-8">
//                   <h2 className="text-2xl font-bold mb-8">Our History</h2>
//                   <div className="space-y-8">
//                     {timeline.map((item, index) => (
//                       <div key={index} className="flex items-start space-x-4">
//                         <div className="bg-primary rounded-full p-2 flex-shrink-0">
//                           <Award className="h-4 w-4 text-primary-foreground" />
//                         </div>
//                         <div>
//                           <div className="flex items-center space-x-3 mb-2">
//                             <span className="text-xl font-bold text-primary">{item.year}:</span>
//                             <span className="font-semibold text-lg">{item.title}</span>
//                           </div>
//                           <p className="text-muted-foreground">{item.description}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="testimonials">
//               <div className="grid md:grid-cols-2 gap-8">
//                 {testimonials.map((testimonial, index) => (
//                   <Card key={index}>
//                     <CardContent className="p-8">
//                       <div className="flex mb-4">
//                         {[...Array(testimonial.rating)].map((_, i) => (
//                           <span key={i} className="text-accent text-lg">★</span>
//                         ))}
//                       </div>
//                       <blockquote className="text-foreground mb-6 leading-relaxed">
//                         "{testimonial.content}"
//                       </blockquote>
//                       <div>
//                         <div className="font-semibold">{testimonial.name}</div>
//                         <div className="text-sm text-muted-foreground">{testimonial.role}</div>
//                         <div className="text-xs text-muted-foreground">{testimonial.year}</div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default About;