// Custom element for footer
class MtFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="bg-dark-800 border-t border-slate-800 pt-16 pb-8">
        <div class="container mx-auto px-6">
          <div class="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <img src="../MT-Tech-Industries.png" alt="MT Tech Industries Logo" class="w-8 h-8 rounded-lg object-contain">
                <span class="text-lg font-bold text-slate-100">MT Tech Industries</span>
              </div>
              <p class="text-slate-400 text-sm">
                Advancing applied physics and digital technology for a better tomorrow.
              </p>
            </div>
            
            <div>
              <h4 class="text-slate-200 font-semibold mb-4">Projects</h4>
              <ul class="space-y-2">
                <li><a href="projects/woofwizex-frs.html" class="text-slate-400 hover:text-cyan-400 transition-colors text-sm">WoofWizeX-FRS</a></li>
                <li><a href="projects/paid-fr.html" class="text-slate-400 hover:text-cyan-400 transition-colors text-sm">PAID-FR 4.0</a></li>
                <li><a href="projects/pafft.html" class="text-slate-400 hover:text-cyan-400 transition-colors text-sm">PAFFT Omnimath</a></li>
                <li><a href="projects/bolobeam.html" class="text-slate-400 hover:text-cyan-400 transition-colors text-sm">BoloBeam Mk. II</a></li>
                <li><a href="projects/thefreq.html" class="text-slate-400 hover:text-cyan-400 transition-colors text-sm">theFreq</a></li>
                <li><a href="projects/mk2.html" class="text-slate-400 hover:text-cyan-400 transition-colors text-sm">MK2 Platform</a></li>
                <li><a href="projects/omnix.html" class="text-slate-400 hover:text-cyan-400 transition-colors text-sm">OmniX AI</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-slate-200 font-semibold mb-4">Resources</h4>
              <ul class="space-y-2">
                <li><a href="#" class="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Research Papers</a></li>
                <li><a href="#" class="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Technical Docs</a></li>
                <li><a href="#" class="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Case Studies</a></li>
                <li><a href="#" class="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Publications</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-slate-200 font-semibold mb-4">Connect</h4>
              <ul class="space-y-2">
                <li><a href="mailto:info@mttechindustries.com" class="text-slate-400 hover:text-cyan-400 transition-colors text-sm">General Inquiries</a></li>
                <li><a href="mailto:investors@mttechindustries.com" class="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Investor Relations</a></li>
                <li><a href="mailto:security@mttechindustries.com" class="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Security Reports</a></li>
                <li><a href="#" class="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p class="text-slate-500 text-sm mb-4 md:mb-0">
              &copy; 2026 MT Tech Industries LLC. All Rights Reserved.
            </p>
            <div class="flex gap-6">
              <a href="#" class="text-slate-500 hover:text-cyan-400 transition-colors">
                <i data-feather="github" class="w-5 h-5"></i>
              </a>
              <a href="#" class="text-slate-500 hover:text-cyan-400 transition-colors">
                <i data-feather="linkedin" class="w-5 h-5"></i>
              </a>
              <a href="#" class="text-slate-500 hover:text-cyan-400 transition-colors">
                <i data-feather="twitter" class="w-5 h-5"></i>
              </a>
            </div>
          </div>
          
          <div class="text-slate-500 text-xs text-center mt-4 pt-4 border-t border-slate-800">
            <p>This website and its contents are protected by U.S. and international copyright and intellectual property laws.</p>
            <p>All content is proprietary to MT Tech Industries LLC and may not be reproduced without express written consent.</p>
            <p>Our innovative technologies, including the Omnimath optimization framework, represent original research and development.</p>
            <div class="mt-2 flex justify-center gap-4">
              <a href="privacy-policy.html" class="text-slate-500 hover:text-cyan-400 text-xs">Privacy Policy</a>
              <a href="terms-of-service.html" class="text-slate-500 hover:text-cyan-400 text-xs">Terms of Service</a>
              <a href="secure-access.html" class="text-slate-500 hover:text-cyan-400 text-xs">Secure Access</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('mt-footer', MtFooter);