// =============================================================
// SITE-WIDE NAVIGATION
// Edit this file once to update the menu and footer on every page.
// Home-page sections are also available directly from the menu.
// =============================================================

function currentPage() {
  const file = window.location.pathname.split("/").pop();
  return file || "index.html";
}

function homeSectionHref(sectionId) {
  return currentPage() === "index.html" ? `#${sectionId}` : `index.html#${sectionId}`;
}

function navigationItems() {
  return [
    ["Home", currentPage() === "index.html" ? "#home" : "index.html"],
    ["Research & Publications", homeSectionHref("research")],
    ["Education", homeSectionHref("education")],
    ["Experience", homeSectionHref("experience")],
    ["Projects", homeSectionHref("projects")],
    ["Achievements", "achievements.html"],
    ["Activities", "activities.html"],
    ["News", "news.html"],
    ["Stills", "stills.html"]
  ];
}

function renderHeader() {
  const headerTarget = document.getElementById("site-header");
  if (!headerTarget) return;

  const page = currentPage();
  const links = navigationItems().map(([label, href]) => {
    const linkedFile = href.split("#")[0] || "index.html";
    const isStandalonePage = !href.startsWith("#") && !href.includes("index.html#");
    const isActive = isStandalonePage && page === linkedFile;
    return `<a href="${href}" class="${isActive ? "active" : ""}">${label}</a>`;
  }).join("");

  headerTarget.innerHTML = `
    <header class="site-header" id="main-header">
      <div class="container nav-wrap">
        <a class="brand" href="index.html">Sirajam Munira</a>
        <button class="menu-button" id="menu-button" type="button" aria-label="Toggle navigation" aria-expanded="false">
          <i class="fa-solid fa-bars" aria-hidden="true"></i><span>Menu</span>
        </button>
        <nav class="nav-links" id="nav-links" aria-label="Primary navigation">
          ${links}
        </nav>
      </div>
    </header>`;

  const menuButton = document.getElementById("menu-button");
  const navLinks = document.getElementById("nav-links");

  menuButton?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  window.addEventListener("scroll", () => {
    document.getElementById("main-header")?.classList.toggle("scrolled", window.scrollY > 6);
  });
}

function renderFooter() {
  const footerTarget = document.getElementById("site-footer");
  if (!footerTarget) return;

  footerTarget.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-wrap">
        <span>© ${new Date().getFullYear()} Sirajam Munira</span>
        <div class="footer-links" aria-label="Footer links">
          <a href="mailto:munirs@rpi.edu" aria-label="Email"><i class="fa-solid fa-envelope" aria-hidden="true"></i></a>
          <a href="https://linkedin.com/in/munirs" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>
          <a href="https://github.com/Sirajam-Munira" target="_blank" rel="noopener" aria-label="GitHub"><i class="fa-brands fa-github" aria-hidden="true"></i></a>
        </div>
      </div>
    </footer>`;
}

renderHeader();
renderFooter();
