class MtFooter extends HTMLElement {
  connectedCallback() {
    const inProjects = location.pathname.includes('/projects/');
    const base = inProjects ? '../' : '';

    this.innerHTML = `
      <footer class="border-t border-slate-800 bg-slate-950 pt-16 pb-8">
        <div class="mx-auto max-w-7xl px-6">
          <div class="grid gap-10 md:grid-cols-4 mb-12">

            <!-- Brand -->
            <div class="md:col-span-1">
              <a href="${base}index.html" class="flex items-center gap-3 mb-4">
                <img src="${base}MT-Tech-Industries.png" alt="MT Tech Industries" class="h-8 w-8 rounded-md object-contain">
                <span class="text-base font-bold text-slate-100">MT Tech Industries</span>
              </a>
              <p class="text-sm leading-7 text-slate-500">
                Inventor-led R&D. Michigan, USA.<br>
                Marc Tuinier — sole inventor on all filed MT Tech IP.
              </p>
              <p class="mt-4 text-xs text-slate-600">
                Five filed U.S. patent applications — patent pending.
              </p>
            </div>

            <!-- IP & Core Frameworks -->
            <div>
              <h4 class="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-300">IP &amp; Frameworks</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="${base}projects/PST.html"          class="text-slate-500 transition hover:text-cyan-400">Polyvalent Stability Theory</a></li>
                <li><a href="${base}projects/pre-physical.html" class="text-slate-500 transition hover:text-cyan-400">Pre-Physical Expansion</a></li>
                <li><a href="${base}projects/omnimath.html"     class="text-slate-500 transition hover:text-cyan-400">Omnimathematics</a></li>
                <li><a href="${base}projects/platform.html"     class="text-slate-500 transition hover:text-cyan-400">Technology Platform</a></li>
              </ul>
            </div>

            <!-- Applied Research -->
            <div>
              <h4 class="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-300">Applied Research</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="${base}projects/paid-fr.html"       class="text-slate-500 transition hover:text-cyan-400">PAID-FR 4.0</a></li>
                <li><a href="${base}projects/bolobeam.html"      class="text-slate-500 transition hover:text-cyan-400">BoloBeam Mk. II</a></li>
                <li><a href="${base}projects/woofwizex-frs.html" class="text-slate-500 transition hover:text-cyan-400">WoofWizeX-FRS</a></li>
                <li><a href="${base}projects/dnea.html"          class="text-slate-500 transition hover:text-cyan-400">DNEA</a></li>
                <li><a href="${base}projects/thefreq.html"       class="text-slate-500 transition hover:text-cyan-400">theFreq</a></li>
                <li><a href="${base}projects/omnix.html"         class="text-slate-500 transition hover:text-cyan-400">OmniX</a></li>
                <li><a href="${base}projects/aigent.html"        class="text-slate-500 transition hover:text-cyan-400">aiGENT</a></li>
              </ul>
            </div>

            <!-- Contact -->
            <div>
              <h4 class="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-300">Contact</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="mailto:info@mttechindustries.com"      class="text-slate-500 transition hover:text-cyan-400">General Inquiries</a></li>
                <li><a href="mailto:research@mttechindustries.com"  class="text-slate-500 transition hover:text-cyan-400">Research &amp; Licensing</a></li>
                <li><a href="mailto:investors@mttechindustries.com" class="text-slate-500 transition hover:text-cyan-400">Investor Relations</a></li>
                <li><a href="${base}nda_form.html"                  class="text-slate-500 transition hover:text-cyan-400">Request NDA Access</a></li>
                <li><a href="${base}privacy-policy.html"            class="text-slate-500 transition hover:text-cyan-400">Privacy Policy</a></li>
                <li><a href="${base}terms-of-service.html"          class="text-slate-500 transition hover:text-cyan-400">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div class="border-t border-slate-800 pt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p class="text-xs text-slate-600">
              &copy; 2026 MT Tech Industries LLC. All Rights Reserved. Public materials are summary-level only. Frameworks, formulations, implementations, and supporting technical materials remain proprietary unless expressly released in writing.
            </p>
            <a href="https://github.com/mttechindustries" target="_blank" rel="noopener"
               class="text-slate-600 hover:text-cyan-400 transition" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('mt-footer', MtFooter);
