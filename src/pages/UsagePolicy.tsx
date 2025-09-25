import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const UsagePolicy = () => {
  useEffect(() => {
    document.title = "Usage Policy - FiveM Database CDN | Acceptable Use Guidelines";
    
    // SEO meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'FiveM Database CDN Usage Policy - Guidelines for acceptable use, prohibited activities, and user responsibilities for our image hosting service.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'FiveM Database CDN Usage Policy - Guidelines for acceptable use, prohibited activities, and user responsibilities for our image hosting service.';
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
        <h1 className="text-4xl font-bold mb-8 text-center">FiveM Database CDN – Usage Policy</h1>
        
        <div className="space-y-8 text-left">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">1. Purpose and Scope</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">1.1</span> This Usage Policy governs all access to and use of the FiveM Database CDN platform ("the Service").</p>
              <p><span className="font-medium">1.2</span> By using the Service, you acknowledge and agree to comply fully with this Usage Policy in addition to our Terms of Service.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">2. Permitted Use</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">2.1</span> The Service is provided solely for the lawful hosting, storage, and sharing of image files.</p>
              <p><span className="font-medium">2.2</span> Users may only upload content that:</p>
              <ul className="list-none ml-6 space-y-1">
                <li>a) They own or have obtained the necessary rights, licences, or permissions to use; and</li>
                <li>b) Does not infringe the intellectual property, privacy, or other rights of any third party.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">3. Prohibited Activities</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">3.1</span> Users must not, under any circumstances, upload, store, or distribute content that:</p>
              <ul className="list-none ml-6 space-y-1">
                <li>a) Is unlawful, defamatory, obscene, pornographic, hateful, discriminatory, or otherwise objectionable under applicable law;</li>
                <li>b) Contains material that violates intellectual property rights without the authorisation of the rights holder;</li>
                <li>c) Promotes violence, terrorism, or criminal activity;</li>
                <li>d) Contains personal data of third parties without their consent;</li>
                <li>e) Is designed to harm, exploit, or deceive others.</li>
              </ul>
              <p><span className="font-medium">3.2</span> Users must not use the Service for:</p>
              <ul className="list-none ml-6 space-y-1">
                <li>a) Hosting malicious software, viruses, or code intended to disrupt systems;</li>
                <li>b) Circumventing or attempting to circumvent security measures;</li>
                <li>c) Engaging in any conduct likely to impair the operation, security, or accessibility of the Service.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">4. User Responsibility and Liability</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">4.1</span> Users are solely and entirely responsible for all content uploaded under their account or via their access credentials.</p>
              <p><span className="font-medium">4.2</span> FiveM Database CDN accepts no responsibility or liability for any legal consequences arising from User Content.</p>
              <p><span className="font-medium">4.3</span> Any breach of this Usage Policy may result in:</p>
              <ul className="list-none ml-6 space-y-1">
                <li>a) Immediate removal of the infringing content;</li>
                <li>b) Suspension or termination of the user's account;</li>
                <li>c) Referral to law enforcement or regulatory authorities where appropriate.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">5. Legal Requests and Content Retention</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">5.1</span> FiveM Database CDN reserves the right to retain or remove content in response to valid legal requests or proceedings, as outlined in our Terms of Service.</p>
              <p><span className="font-medium">5.2</span> Where legal proceedings are initiated against an uploader, FiveM Database CDN may retain the content in question until the conclusion of such proceedings.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">6. Disclosure of Information</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">6.1</span> FiveM Database CDN will only disclose user-identifying information, including usernames and email addresses, in compliance with a valid legal request or binding court order.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">7. Enforcement and Final Authority</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">7.1</span> FiveM Database CDN reserves sole and absolute discretion to determine whether a user's conduct or content violates this Usage Policy.</p>
              <p><span className="font-medium">7.2</span> All determinations made by FiveM Database CDN shall be final unless otherwise overruled by a binding judicial decision.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">Contact Information</h2>
            <div className="space-y-2 ml-4 text-center">
              <p>For inquiries regarding this Usage Policy, please contact us at:</p>
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

export default UsagePolicy;