/**
 * Floating doodle-icon landing page (Mac-desktop style).
 *
 * Each entry is a link shown as a floating icon + handwritten label.
 *   href  — destination
 *   label — caption under the icon
 *   img   — path to a doodle logo (optional)
 *   color — pastel fill used for the placeholder until an img is added
 *   left/top — center position (% of viewport)
 *   w     — icon width (vw)
 *   delay — float animation offset (so they bob out of sync)
 *
 * To swap a placeholder for a real doodle, drop the image in
 * assets/icons/ and set `img` (e.g. img: "assets/icons/blog.png").
 */
const ICONS = [
  { slug: "awesomesauce", href: "awesomesauce/", label: "Awesomesauce", img: "assets/icons/blog.png", w: "14vw", delay: "0s"   },
  { slug: "projects",     href: "projects/",     label: "Projects",     img: "assets/icons/projects.png", w: "15vw", delay: "0.6s" },
  { slug: "about",        href: "about/",        label: "About",        img: "assets/icons/about.png",    w: "15vw", delay: "1.2s" },
  { slug: "contact",      href: "contact/",      label: "Contact",      img: "assets/icons/contact.png",  w: "10vw", delay: "0.3s", prominent: true },
  { slug: "videos",       href: "https://www.youtube.com/@angelaqqin", label: "VIDEOS", img: "assets/icons/youtube.png", w: "13vw", delay: "0.9s" },
  { slug: "reading",      href: "https://docs.google.com/spreadsheets/d/1hKMamrm4GyclMRLyLSSJDj98HoBlrMhFKoNG3nEoJqE/edit?usp=sharing", label: "Reading", img: "assets/icons/learning.png", w: "11vw", delay: "1.5s" },
];

/** hand-drawn placeholder icon shown until a real doodle is supplied */
function placeholderSvg(label, color) {
  const letter = (label[0] || "?").toUpperCase();
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="13" y="15" width="74" height="70" rx="20" ry="22"
      fill="${color}" stroke="#111" stroke-width="4.5"/>
    <path d="M24 26 Q22 34 23 44" fill="none" stroke="#fff" stroke-width="3"
      stroke-linecap="round" opacity="0.85"/>
    <text x="50" y="50" text-anchor="middle" dominant-baseline="central"
      font-family="Gaegu,'Patrick Hand',cursive" font-size="44"
      font-weight="700" fill="#111">${letter}</text>
  </svg>`;
}

/** a hand-drawn "scribble" patch (organic blob shape) to clear bg clutter */
function scribbleSvg() {
  const W = 1000, H = 300, bands = 9, m = 22;
  const cx = W / 2 + 18; // nudge right so the blob extends further left
  const cy = H / 2;
  const ry = H / 2 - m;
  const maxHW = W / 2 - m;
  const step = (H - 2 * m) / (bands - 1);
  const sweepPath = (yShift, leftBoost = 1) => {
    let d = "";
    let dir = 1;
    let first = true;
    for (let i = 0; i < bands; i++) {
      const y = m + i * step + yShift;
      const norm = Math.min(1, Math.abs((y - cy) / ry));
      let hw = maxHW * Math.sqrt(Math.max(0, 1 - norm * norm));
      hw *= 0.86 + 0.14 * Math.sin(i * 1.7 + 0.6);
      if (hw < 30) continue;
      const leftHw = hw * (1.08 * leftBoost);
      const rightHw = hw * 0.96;
      const segs = 14;
      const x0 = dir > 0 ? cx - leftHw : cx + rightHw;
      const x1 = dir > 0 ? cx + rightHw : cx - leftHw;
      for (let s = 0; s <= segs; s++) {
        const t = s / segs;
        const x = x0 + (x1 - x0) * t;
        const yy = y + Math.sin(t * Math.PI * 3 + i * 1.3) * (step * 0.24);
        d += (first && s === 0 ? "M" : "L") + x.toFixed(1) + "," + yy.toFixed(1) + " ";
      }
      first = false;
      dir *= -1;
    }
    return d;
  };
  const sw = step * 1.35;
  return `<svg class="hero-scribble" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <path d="${sweepPath(0, 1.05)}" fill="none" stroke="#f8f7ea" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${sweepPath(step / 2, 1.08)}" fill="none" stroke="#f8f7ea" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${sweepPath(-step / 4, 1.12)}" fill="none" stroke="#f8f7ea" stroke-width="${sw * 0.92}" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

function buildHero() {
  const hero = document.createElement("div");
  hero.className = "hero";
  hero.innerHTML = `${scribbleSvg()}<span class="hero-text">Hi, I'm Angela!</span>`;
  document.querySelector(".viewport").prepend(hero);
}

function buildBoard() {
  const board = document.getElementById("board");
  const frag = document.createDocumentFragment();

  ICONS.forEach((ic) => {
    const a = document.createElement("a");
    a.className = `icon icon--${ic.slug}`;
    a.href = ic.href;
    if (/^https?:\/\//.test(ic.href)) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    a.setAttribute("aria-label", ic.label);
    a.style.setProperty("--w", ic.w);
    a.style.setProperty("--delay", ic.delay);

    const art = document.createElement("span");
    art.className = [
      "icon-art",
      ic.plate ? "icon-art--plate" : "",
      ic.prominent ? "icon-art--prominent" : "",
    ].filter(Boolean).join(" ");
    art.innerHTML = ic.img
      ? `<img src="${ic.img}" alt="${ic.label}">`
      : placeholderSvg(ic.label, ic.color);

    const label = document.createElement("span");
    label.className = "icon-label";
    label.textContent = ic.label;

    a.append(art, label);
    frag.appendChild(a);
  });

  board.appendChild(frag);
}

buildHero();
buildBoard();
document.querySelector(".viewport").insertAdjacentHTML("beforeend", SiteCopyright());

/** Extra scroll room above the home layout; default view matches pre-headroom design. */
(function setHomeScrollHeadroom() {
  const viewport = document.querySelector(".viewport");
  if (!viewport) return;

  const apply = () => {
    const y = parseFloat(getComputedStyle(viewport).paddingTop) || 0;
    if (y > 0) window.scrollTo(0, y);
  };

  if (document.readyState === "complete") apply();
  else window.addEventListener("load", apply, { once: true });

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) apply();
  });
})();
