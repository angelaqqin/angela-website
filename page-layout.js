/* ───────────────────────────────────────────────────────────
   Reusable notebook page building blocks (vanilla, no deps).

   PaperPanel(opts)         -> a cream "carved-out" paper cutout
   NotebookPageLayout(opts) -> page shell w/ home link + title

   Each sub-page renders into <div id="app"> like:

     document.getElementById("app").innerHTML = NotebookPageLayout({
       title: "About",
       children: PaperPanel({ title: "...", body: "<p>...</p>" })
     });
   ─────────────────────────────────────────────────────────── */

/**
 * A single cream paper panel.
 * @param {Object} o
 * @param {string} [o.title]     heading text
 * @param {string} [o.meta]      small meta line (e.g. a date)
 * @param {string} [o.body]      body HTML (wrapped in .panel-body)
 * @param {string} [o.html]      raw HTML instead of body (no wrapper)
 * @param {string} [o.footer]    raw HTML appended after body (e.g. a link)
 * @param {string} [o.className] extra classes
 * @param {number} [o.tilt]      rotation in degrees for organic feel
 */
function PaperPanel(o = {}) {
  const { title = "", meta = "", body = "", html = "", footer = "", className = "", tilt = 0 } = o;
  const titleHTML = title ? `<h2 class="panel-title">${title}</h2>` : "";
  const metaHTML = meta ? `<p class="panel-meta">${meta}</p>` : "";
  const bodyHTML = html ? html : (body ? `<div class="panel-body">${body}</div>` : "");
  const style = tilt ? ` style="--tilt:${tilt}deg"` : "";
  return `<section class="paper-panel ${className}"${style}>${titleHTML}${metaHTML}${bodyHTML}${footer}</section>`;
}

function SiteCopyright() {
  return `<footer class="site-copyright">© 2026 Angela Qin</footer>`;
}

/**
 * Page shell shared by every sub-page.
 * @param {Object} o
 * @param {string} o.title        big handwritten page title
 * @param {string} [o.subtitle]   optional small note under the title
 * @param {string} o.children     inner HTML (usually PaperPanel calls)
 * @param {string} [o.homeHref]   link back to the home screen
 */
function NotebookPageLayout(o = {}) {
  const { title = "", subtitle = "", titleAside = "", children = "", homeHref = "../" } = o;
  const sub = subtitle ? `<p class="page-subtitle">${subtitle}</p>` : "";
  const titleBlock = titleAside
    ? `<div class="page-title-row"><h1 class="page-title">${title}</h1><p class="page-title-aside">${titleAside}</p></div>`
    : `<h1 class="page-title">${title}</h1>`;
  return `
  <div class="notebook-page">
    <header class="page-header">
      <a class="home-link" href="${homeHref}">&#8962; home</a>
    </header>
    ${titleBlock}
    ${sub}
    <div class="page-content">${children}</div>
  </div>
  ${SiteCopyright()}`;
}
