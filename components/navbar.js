class MtNav extends HTMLElement {
  connectedCallback() {
    const inProjects = location.pathname.includes('/projects/');
    const base = inProjects ? '../' : '';

    this.innerHTML = `
      <nav class="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="${base}index.html" class="flex items-center gap-3">
            <img src="${base}MT-Tech-Industries.png" alt="MT Tech Industries" class="h-9 w-9 rounded-md object-contain" />
            <span class="text-sm font-semibold tracking-wide text-slate-100 sm:text-base">MT Tech Industries</span>
          </a>

          <div class="hidden items-center gap-7 text-sm text-slate-400 md:flex">
            <a href="${base}index.html#overview"  class="transition hover:text-cyan-400">Overview</a>
            <a href="${base}index.html#patents"   class="transition hover:text-cyan-400">Patent-Pending</a>
            <a href="${base}index.html#projects"  class="transition hover:text-cyan-400">Projects</a>
            <a href="${base}index.html#fit"        class="transition hover:text-cyan-400">Who We Work With</a>
            <a href="${base}index.html#contact"   class="transition hover:text-cyan-400">Contact</a>
          </div>

          <div class="flex items-center gap-3">
            <a href="${base}nda_form.html"
               class="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110 sm:text-sm">
              Request NDA
            </a>
            <button id="mt-mobile-toggle" class="md:hidden rounded-lg border border-slate-700 p-2 text-slate-300 hover:text-cyan-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>

        <div id="mt-mobile-menu" class="hidden border-t border-slate-800 bg-slate-950/95 md:hidden">
          <div class="flex flex-col gap-1 px-6 py-4 text-sm text-slate-400">
            <a href="${base}index.html#overview"  class="py-2 transition hover:text-cyan-400">Overview</a>
            <a href="${base}index.html#patents"   class="py-2 transition hover:text-cyan-400">Patent-Pending</a>
            <a href="${base}index.html#projects"  class="py-2 transition hover:text-cyan-400">Projects</a>
            <a href="${base}index.html#fit"        class="py-2 transition hover:text-cyan-400">Who We Work With</a>
            <a href="${base}index.html#contact"   class="py-2 transition hover:text-cyan-400">Contact</a>
            <a href="${base}nda_form.html"        class="mt-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-center font-semibold text-slate-950">Request NDA</a>
          </div>
        </div>
      </nav>
    `;

    document.getElementById('mt-mobile-toggle').addEventListener('click', () => {
      document.getElementById('mt-mobile-menu').classList.toggle('hidden');
    });
  }
}

customElements.define('mt-nav', MtNav);
