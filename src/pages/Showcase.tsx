import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft, Globe, Shield, Zap, Users } from "lucide-react";

const websites = [
  {
    name: "FiveMDB.net",
    url: "https://fivemdb.net",
    description: "Premier FiveM server database and community platform",
    category: "Gaming & Community"
  },
  {
    name: "FiveMDB.online", 
    url: "https://fivemdb.online",
    description: "Online extension of the FiveM database ecosystem",
    category: "Gaming & Community"
  },
  {
    name: "Nexora Data Ltd.",
    url: "https://nexoradata.ltd",
    description: "Enterprise data solutions and analytics platform",
    category: "Business & Analytics"
  },
  {
    name: "Creator Justice",
    url: "https://creatorjustice.org",
    description: "Digital rights advocacy and creator protection platform",
    category: "Legal & Advocacy"
  }
];

const stats = [
  {
    icon: Globe,
    label: "Global Reach",
    value: "99.9%",
    description: "Uptime guarantee"
  },
  {
    icon: Zap,
    label: "Lightning Fast", 
    value: "<50ms",
    description: "Average response time"
  },
  {
    icon: Shield,
    label: "Enterprise Security",
    value: "SSL/TLS",
    description: "End-to-end encryption"
  },
  {
    icon: Users,
    label: "Trusted By",
    value: "1000+",
    description: "Active websites"
  }
];

const Showcase = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Showcase - Websites Using FiveM Database CDN";
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
              Websites Using FiveM Database CDN
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
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              From gaming platforms to enterprise solutions, discover the websites 
              that rely on FiveM Database CDN for their content delivery needs.
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
              Ready to Join Them?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Experience the same premium content delivery that powers these industry-leading websites.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="elegant-button" onClick={() => navigate("/")}>
                <Zap className="h-5 w-5 mr-2" />
                Start Using CDN
              </Button>
              <Button variant="outline" size="lg" className="elegant-button" onClick={() => navigate("/auth")}>
                Get Enterprise Access
              </Button>
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