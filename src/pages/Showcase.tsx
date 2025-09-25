import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft, Zap, Users, Database, Earth, ChartArea } from "lucide-react";

const websites = [
  {
  name: "FiveM Database (.net domain)",
  url: "https://fivemdb.net",
  description: "The platform Leading Database to assist you as a server owner, creator, developer and player understanding compliance and what is right and wrong.",
  category: "Guidance tools, complaince and assistance"
  },
  {
  name: "FiveM Database (.online domain)",
  url: "https://fivemdb.Online",
  description: "The platform Leading Database to assist you as a server owner, creator, developer and player understanding compliance and what is right and wrong.",
  category: "Guidance tools, complaince and assistance"
  }
];

const stats = [
   {
     icon: Users,
     label: "Trusted By",
     value: "2,500+",
     description: "Weekly Users"
   },
   {
     icon: Database,
     label: "Data Stored",
     value: "3.5 TiB",
     description: "on FiveM Database"
   },
   {
     icon: Earth,
     label: "Utilised in over",
     value: "150+",
     description: "Diffirent countries"
   },
   {
     icon: ChartArea,
     label: "Total Visitors",
     value: "1,500,000+",
     description: "Globaly"
   }

];

const Showcase = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Showcase - FiveM Database CDN Information";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/30 elegant-card">
        <div className="container py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="elegant-button"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to CDN
            </Button>
            <div className="h-6 w-px bg-border/50" />
            <h1 className="text-3xl font-bold text-gradient">
              Showcase - FiveM Database CDN Information
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="elegant-card inline-block px-8 py-6 rounded-2xl mb-6">
            <h2 className="text-4xl font-black mb-4 text-gradient">
              FiveM Database's Official Self Created CDN
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              From a FiveM Server owner, to a creator to a platform that has helped over 1,000+ Users on the platform 
              stay safe and help them avoid being scammed, damaged or harmed by creators that have stolen work and damaged
              the platforms Eco-System
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="elegant-card p-6 rounded-xl text-center hover:scale-105 transition-all duration-300">
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Websites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {websites.map((website, index) => (
            <article 
              key={index} 
              className="elegant-card p-8 rounded-xl elegant-border hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                    {website.category}
                  </div>
                  <h3 className="text-2xl font-bold text-gradient mb-2">
                    {website.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {website.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-border/30">
                <div className="text-sm text-muted-foreground font-mono">
                  {website.url.replace('https://', '')}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(website.url, '_blank')}
                  className="elegant-button group-hover:shadow-lg"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Site
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="elegant-card p-12 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gradient mb-4">
              Ready to feel the change?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Experience the same premium content delivery that powers our websites and Projects.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="elegant-button" onClick={() => navigate("/")}>
                <Zap className="h-5 w-5 mr-2" />
                Start Browsing CDN
              </Button>
              {/* <Button variant="outline" size="lg" className="elegant-button" onClick={() => navigate("/auth")}>
                Get Enterprise Access
              </Button> */}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 elegant-card mt-auto">
        <div className="container py-8 text-center">
          <div className="elegant-card inline-block px-8 py-4 rounded-xl">
            <p className="text-sm text-muted-foreground mb-2">
              © {new Date().getFullYear()} FiveM Database CDN - Elite Content Delivery
            </p>
            <p className="text-xs text-muted-foreground/70">
              Powering the world's most demanding applications
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Showcase;