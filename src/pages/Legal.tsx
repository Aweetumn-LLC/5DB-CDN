import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Legal = () => {
  useEffect(() => {
    document.title = "Legal - ZWRKS CDN";
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
        <h1 className="text-4xl font-bold mb-8 text-center">ZWRKS CDN – Legal Notice & Terms of Service</h1>
        
        <div className="space-y-8 text-left">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">1. Corporate Registration and Jurisdiction</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">1.1</span> ZWRKS CDN is a service operating under and registered with the Velocity Network corporate structure.</p>
              <p><span className="font-medium">1.2</span> All operations, agreements, and disputes shall be governed exclusively by the laws of England and Wales, and any proceedings shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">2. Data Protection and Security</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">2.1</span> ZWRKS CDN undertakes to maintain all user data in a secure environment in compliance with applicable UK data protection laws, including but not limited to the Data Protection Act 2018 and the UK GDPR.</p>
              <p><span className="font-medium">2.2</span> All data is treated as confidential and will not be disclosed to third parties except:</p>
              <ul className="list-none ml-6 space-y-1">
                <li>a) Where disclosure is required by law, court order, or lawful authority; or</li>
                <li>b) As necessary to enforce these Terms of Service.</li>
              </ul>
              <p><span className="font-medium">2.3</span> Industry-standard security measures are implemented to protect data from unauthorised access, alteration, or disclosure.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">3. Acceptance of Terms</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">3.1</span> By accessing or using the ZWRKS CDN platform, you acknowledge and agree to be bound by these Terms of Service, our Usage Policy, and our Data Usage Policy, as amended from time to time.</p>
              <p><span className="font-medium">3.2</span> Continued use of the service following the publication of amendments constitutes acceptance of such amendments.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">4. User Content and Liability</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">4.1</span> All content uploaded by a user ("User Content") remains the sole responsibility of the user who uploaded it.</p>
              <p><span className="font-medium">4.2</span> The user warrants and represents that they hold all rights, licences, and permissions necessary to upload and distribute such content.</p>
              <p><span className="font-medium">4.3</span> ZWRKS CDN accepts no liability whatsoever for the legality, accuracy, or appropriateness of User Content, and all civil, criminal, and regulatory responsibility shall rest solely with the user.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">5. Legal Takedown Requests and Retention Rights</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">5.1</span> Upon receipt of a valid legal notice or takedown request, ZWRKS CDN may, at its sole discretion, remove or restrict access to the relevant content.</p>
              <p><span className="font-medium">5.2</span> Notwithstanding Clause 5.1, ZWRKS CDN reserves the right to retain the content in question until such time as any associated legal proceedings against the uploader are concluded.</p>
              <p><span className="font-medium">5.3</span> ZWRKS CDN shall have the final authority to determine whether any content remains hosted on the platform, save where otherwise directed by a binding judicial decision.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">6. Disclosure of User Information</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">6.1</span> ZWRKS CDN will only disclose user-identifying information, including usernames and email addresses, in response to:</p>
              <ul className="list-none ml-6 space-y-1">
                <li>a) A valid legal request issued by a competent law enforcement authority; or</li>
                <li>b) A binding order of a court with jurisdiction over ZWRKS CDN.</li>
              </ul>
              <p><span className="font-medium">6.2</span> No identifying information shall be disclosed to private individuals or entities without due legal process.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">7. Nature of the Service and Limitation of Liability</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">7.1</span> ZWRKS CDN operates solely as an image hosting provider enabling users to upload images and generate publicly shareable links.</p>
              <p><span className="font-medium">7.2</span> ZWRKS CDN does not pre-screen, monitor, or otherwise review uploaded content prior to publication.</p>
              <p><span className="font-medium">7.3</span> To the maximum extent permitted by law, ZWRKS CDN disclaims all warranties, express or implied, and shall not be liable for any loss, damage, claim, or liability arising from User Content.</p>
              <p><span className="font-medium">7.4</span> All legal responsibility for uploaded files rests solely and entirely with the uploader.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">8. Final Authority</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">8.1</span> ZWRKS CDN reserves absolute discretion to determine whether content remains hosted on its platform following any legal process.</p>
              <p><span className="font-medium">8.2</span> Such discretion shall only be overridden by a binding order from a court of competent jurisdiction.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">Contact Information</h2>
            <div className="space-y-2 ml-4 text-center">
              <p>For legal inquiries, please contact us at:</p>
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

export default Legal;