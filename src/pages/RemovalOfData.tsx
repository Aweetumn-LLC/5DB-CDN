import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

const RemovalOfData = () => {
  useEffect(() => {
    document.title = "Removal of Data Policy - FiveM Database CDN | Content & Data Removal Procedures";
    
    // SEO meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'FiveM Database CDN Removal of Data Policy - Learn how to request removal of content or personal data, verification procedures, and legal takedown processes.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'FiveM Database CDN Removal of Data Policy - Learn how to request removal of content or personal data, verification procedures, and legal takedown processes.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container py-6">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">FiveM Database CDN – Removal of Data Policy</h1>
        
        <div className="space-y-8 text-left">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">1. Purpose and Scope</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">1.1</span> This Removal of Data Policy governs the procedures for requesting the removal of content or personal data from the FiveM Database CDN platform ("the Service").</p>
              <p><span className="font-medium">1.2</span> This Policy forms part of, and must be read in conjunction with, our Terms of Service, Usage Policy, and Data Usage Policy.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">2. Submission of Removal Requests</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">2.1</span> All requests for the removal of content or personal data must be submitted exclusively through our official removal request portal at:</p>
              <div className="ml-6 my-4 p-4 bg-muted rounded-lg border">
                <a 
                  href="https://discord.fivemdb.online" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium flex items-center gap-2"
                >
                  https://discord.fivemdb.online
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <p><span className="font-medium">2.2</span> Requests submitted via any other method, including email or third-party channels, will not be processed.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">3. Eligibility for Removal</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">3.1</span> Removal requests will only be considered if:</p>
              <ul className="list-none ml-6 space-y-1">
                <li>a) The requester is the original uploader of the content;</li>
                <li>b) The requester is the lawful rights holder of the content;</li>
                <li>c) The content is subject to a valid legal takedown notice; or</li>
                <li>d) The content breaches our Usage Policy or applicable law.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">4. Verification Process</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">4.1</span> FiveM Database CDN reserves the right to verify the identity of any individual submitting a removal request.</p>
              <p><span className="font-medium">4.2</span> Verification may include the provision of account details, email confirmation, or documentary proof of rights ownership.</p>
              <p><span className="font-medium">4.3</span> Requests that cannot be verified will be rejected.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">5. Legal and Judicial Requests</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">5.1</span> Where a removal request is made pursuant to a valid governmental, law enforcement, or judicial order, FiveM Database CDN will act in compliance with such order.</p>
              <p><span className="font-medium">5.2</span> In the event of ongoing legal proceedings, FiveM Database CDN reserves the right to retain the content in question until such proceedings are concluded, unless otherwise directed by a binding court order.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">6. Timeframes and Processing</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">6.1</span> FiveM Database CDN will make reasonable efforts to process verified removal requests promptly; however, no guarantee is made as to specific timeframes.</p>
              <p><span className="font-medium">6.2</span> The retention or removal of content remains at the sole discretion of FiveM Database CDN, except where overridden by applicable law or court order.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">7. Final Authority</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">7.1</span> FiveM Database CDN retains final authority to determine whether requested content will be removed, subject to legal obligations.</p>
              <p><span className="font-medium">7.2</span> Decisions by FiveM Database CDN under this Policy are final unless superseded by a binding judicial decision.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">Contact Information</h2>
            <div className="space-y-2 ml-4 text-center">
              <p>For inquiries regarding this Removal of Data Policy, please contact us at:</p>
              <div className="my-4 p-4 bg-muted rounded-lg border">
                <a 
                  href="mailto:autumn@fivemdb.online" 
                  className="text-primary hover:underline font-medium text-lg"
                >
                  autumn@fivemdb.online
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RemovalOfData;