import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const DataUsage = () => {
  useEffect(() => {
    document.title = "Data Usage Policy - ZWRKS CDN | Privacy & Data Protection";
    
    // SEO meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'ZWRKS CDN Data Usage Policy - Learn how we collect, store, process, and protect your personal data in compliance with privacy regulations.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'ZWRKS CDN Data Usage Policy - Learn how we collect, store, process, and protect your personal data in compliance with privacy regulations.';
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
        <h1 className="text-4xl font-bold mb-8 text-center">ZWRKS CDN – Data Usage Policy</h1>
        
        <div className="space-y-8 text-left">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">1. Purpose and Scope</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">1.1</span> This Data Usage Policy governs the collection, storage, processing, and disclosure of personal data by ZWRKS CDN ("the Service").</p>
              <p><span className="font-medium">1.2</span> By using the Service, you consent to the practices described herein, in addition to our Terms of Service and Usage Policy.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">2. Data Collected</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">2.1</span> ZWRKS CDN may collect and store the following categories of data:</p>
              <ul className="list-none ml-6 space-y-1">
                <li>a) Account Information – including usernames, email addresses, and associated credentials;</li>
                <li>b) Usage Data – including IP addresses, access logs, and file upload activity;</li>
                <li>c) Uploaded Content Metadata – including file names, formats, and timestamps.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">3. Purpose of Data Processing</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">3.1</span> Data is collected and processed for the following purposes:</p>
              <ul className="list-none ml-6 space-y-1">
                <li>a) To provide and maintain the functionality of the Service;</li>
                <li>b) To enforce compliance with our Terms of Service and Usage Policy;</li>
                <li>c) To ensure the security and integrity of our platform;</li>
                <li>d) To comply with legal obligations under applicable laws.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">4. Data Security</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">4.1</span> ZWRKS CDN employs industry-standard technical and organisational measures to protect data from unauthorised access, disclosure, alteration, or destruction.</p>
              <p><span className="font-medium">4.2</span> While we strive to maintain secure systems, no method of electronic storage or transmission is entirely immune to breaches. Users acknowledge this risk by using the Service.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">5. Data Disclosure and Legal Requests</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">5.1</span> ZWRKS CDN will not sell, rent, or trade user data to any third party.</p>
              <p><span className="font-medium">5.2</span> We may disclose user data, including usernames and email addresses, only in the following circumstances:</p>
              <ul className="list-none ml-6 space-y-1">
                <li>a) In response to a valid request by a governmental authority, law enforcement agency, or regulatory body;</li>
                <li>b) Pursuant to a binding judicial order or other lawful process issued by a court of competent jurisdiction;</li>
                <li>c) Where disclosure is required to comply with applicable law.</li>
              </ul>
              <p><span className="font-medium">5.3</span> Users acknowledge and agree that ZWRKS CDN is legally required to provide such data in the circumstances described above and that such disclosures shall not constitute a breach of this Policy.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">6. Data Retention</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">6.1</span> Personal data will be retained only for as long as is necessary to fulfil the purposes outlined in this Policy or to comply with legal obligations.</p>
              <p><span className="font-medium">6.2</span> Certain data, including usernames, email addresses, and access logs, may be retained for a longer period if required for legal, regulatory, or security purposes.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">7. User Rights</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">7.1</span> Subject to applicable law, users may:</p>
              <ul className="list-none ml-6 space-y-1">
                <li>a) Request access to the personal data we hold about them;</li>
                <li>b) Request correction of inaccurate or incomplete data;</li>
                <li>c) Request deletion of data, except where retention is required by law or ongoing legal proceedings.</li>
              </ul>
              <p><span className="font-medium">7.2</span> All such requests must be submitted in writing to ZWRKS CDN via the contact details provided on our website.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">8. Amendments</h2>
            <div className="space-y-2 ml-4">
              <p><span className="font-medium">8.1</span> ZWRKS CDN reserves the right to amend this Data Usage Policy at any time.</p>
              <p><span className="font-medium">8.2</span> Continued use of the Service following any amendment constitutes acceptance of the revised Policy.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">Contact Information</h2>
            <div className="space-y-2 ml-4 text-center">
              <p>For inquiries regarding this Data Usage Policy, please contact us at:</p>
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

export default DataUsage;