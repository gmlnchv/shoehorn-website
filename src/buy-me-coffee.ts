export function initBuyMeCoffee() {
    const container = document.createElement('a');
    container.href = 'https://buymeacoffee.com/chrctr';
    container.target = '_blank';
    container.rel = 'noreferrer';
    container.className = `
    fixed bottom-6 right-6 z-50
    flex items-center justify-center
    w-14 h-14 md:w-16 md:h-16
    bg-[#FFDD00] text-black
    rounded-full shadow-lg
    hover:scale-110 hover:shadow-xl hover:-rotate-6
    active:scale-95
    transition-all duration-300 ease-spring
    group
    cursor-pointer
  `;
    container.setAttribute('aria-label', 'Buy me a coffee');

    // SVG Icon
    container.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" 
         viewBox="0 0 24 24" 
         fill="currentColor" 
         class="w-7 h-7 md:w-8 md:h-8 group-hover:animate-bounce-subtle"
         style="animation-duration: 2s;">
      <path d="M12.75 4.75a.75.75 0 00-1.5 0v.5c0 .056.002.112.007.167h.004c.08.835.632 1.54 1.341 1.874.1.047.206.085.315.115l.004.001.076.018a3.253 3.253 0 012.253 3.15V13c0 1.285-.808 2.38-1.94 2.846l-.004.002-.026.01a4.23 4.23 0 001.066.52l.024.007.03.007a6.002 6.002 0 004.57-1.125.75.75 0 00-1.028-1.082 4.5 4.5 0 01-3.15.828l-.078-.01a2.76 2.76 0 01-2.433-2.753V10.5h1.5a.75.75 0 000-1.5h-1.5V6.425a1.753 1.753 0 00-1.31-1.657l-.027-.006-.027-.005a.26.26 0 01-.009-.007H12.75v-.5z" />
      <path d="M9 14.25a3 3 0 00-3-3h-.75a2.25 2.25 0 010-4.5h3.75a.75.75 0 000-1.5H5.25a3.75 3.75 0 000 7.5H6a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5H3.75A2.25 2.25 0 011.5 16.5V11.25a.75.75 0 00-1.5 0v5.25A3.75 3.75 0 003.75 20.25H6A3 3 0 009 17.25v-3zM10.5 6.75a2.25 2.25 0 000 4.5h.75a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-2.25a3 3 0 003 3H16.5a2.25 2.25 0 002.25-2.25V11.25a.75.75 0 00-1.5 0v6.75A.75.75 0 0116.5 18.75h-4.5a1.5 1.5 0 01-1.5-1.5v-3a3 3 0 00-3-3h-.75a.75.75 0 010-1.5h2.25a.75.75 0 000-1.5H10.5z" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 20.25v.75a.75.75 0 001.5 0v-.75a.75.75 0 00-1.5 0zM12 20.25v.75a.75.75 0 001.5 0v-.75a.75.75 0 00-1.5 0zM16.5 20.25v.75a.75.75 0 001.5 0v-.75a.75.75 0 00-1.5 0zM8.25 20.25v.75a.75.75 0 001.5 0v-.75a.75.75 0 00-1.5 0z" />
      <path d="M4 19a1 1 0 011-1h14a1 1 0 011 1v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-1z"  opacity="0.3"/>
    </svg>
    <div class="absolute -top-1 -right-1 flex h-3 w-3">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
    </div>
  `;

    // Use a simpler, more robust SVG that looks like a coffee cup
    // Using a custom path for a cute coffee cup
    container.innerHTML = `
   <div class="relative w-full h-full flex items-center justify-center transform group-hover:-translate-y-1 transition-transform duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-black">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
      <!-- Heart buble -->
      <div class="absolute -top-1 -right-0 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500 text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
             <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </div>
   </div>
  `;

    document.body.appendChild(container);
}
