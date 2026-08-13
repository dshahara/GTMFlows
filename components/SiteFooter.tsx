import { BRAND_LOGO_SRC, BRAND_WORDMARK } from "@/lib/brand";

type SiteFooterProps = {
  source?: string;
};

export function SiteFooter({ source: _source = "Website footer" }: SiteFooterProps) {
  return (
    <footer className="marketing-footer" id="contact">
      <div className="shell">
        <div className="marketing-footer-top">
          <div>
            <a className="brand" href="/" aria-label="GTM Flows home">
              <img className="brand-logo" src={BRAND_LOGO_SRC} alt="" />
              <span>{BRAND_WORDMARK}</span>
            </a>
            <p className="marketing-footer-tagline">Automated revenue systems</p>
            <p className="marketing-footer-location">HSR Layout, Bengaluru, Karnataka, India</p>
            <a className="marketing-footer-email" href="mailto:contact@gtmflows.co">contact@gtmflows.co</a>
          </div>

          <nav className="marketing-footer-nav" aria-label="Footer navigation">
            <div>
              <span>Systems</span>
              <a href="/how-we-build">How We Build</a>
              <a href="/catalogue">Automation Catalogue</a>
            </div>
            <div>
              <span>Explore</span>
              <a href="/catalogue#roi">ROI Calculator</a>
              <a href="/faq">FAQ</a>
              <a href="/contact">Fit Check</a>
            </div>
            <div>
              <span>Company</span>
              <a href="https://www.linkedin.com/company/gtm-flows/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="/contact">Contact</a>
            </div>
          </nav>
        </div>

        <div className="marketing-footer-bottom">
          <p>© {new Date().getFullYear()} GTM Flows. All rights reserved.</p>
          <p>Client-owned software, data and sending accounts.</p>
        </div>
      </div>
    </footer>
  );
}
