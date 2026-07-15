(() => {
  "use strict";

  const STORAGE_KEY = "undangan-falah-risyqaa-rsvp-v1";
  const WEDDING_DATE = new Date("2026-08-18T08:00:00").getTime();

  // Feature toggles (equivalent to the design tool's editable props)
  const CONFIG = {
    showCountdown: true,
    showRsvp: true,
    musicEnabled: true,
  };

  const el = (id) => document.getElementById(id);

  const els = {
    petals: el("petals"),
    dayName: el("dayName"),
    countdown: el("countdown"),
    cdDays: el("cdDays"),
    cdHours: el("cdHours"),
    cdMins: el("cdMins"),
    cdSecs: el("cdSecs"),
    rsvpSection: el("rsvpSection"),
    rsvpForm: el("rsvpForm"),
    rsvpName: el("rsvpName"),
    rsvpGuests: el("rsvpGuests"),
    rsvpMessage: el("rsvpMessage"),
    guestsField: el("guestsField"),
    btnHadir: el("btnHadir"),
    btnTidak: el("btnTidak"),
    rsvpError: el("rsvpError"),
    wishCount: el("wishCount"),
    hadirCount: el("hadirCount"),
    wishes: el("wishes"),
    cover: el("cover"),
    guestName: el("guestName"),
    openBtn: el("openBtn"),
    curtain: el("curtain"),
    drapeLeft: el("drapeLeft"),
    drapeRight: el("drapeRight"),
    valance: el("valance"),
    scrollHint: el("scrollHint"),
    musicBtn: el("musicBtn"),
    musicIcon: el("musicIcon"),
    audio: el("audio"),
  };

  const state = {
    attend: "hadir",
    wishes: [],
  };

  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));

  // ---------- guest name from ?to= / ?kepada= / ?guest= ----------
  function initGuestName() {
    try {
      const p = new URLSearchParams(window.location.search);
      const to = p.get("to") || p.get("kepada") || p.get("guest");
      if (to) {
        const name = decodeURIComponent(to.replace(/\+/g, " "));
        els.guestName.textContent = name;
      }
    } catch (e) {}
  }

  // ---------- countdown ----------
  function tickCountdown() {
    if (!CONFIG.showCountdown) return;
    const pad = (n) => String(n).padStart(2, "0");
    let diff = Math.max(0, WEDDING_DATE - Date.now());
    const days = Math.floor(diff / 86400000); diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
    const mins = Math.floor(diff / 60000); diff -= mins * 60000;
    const secs = Math.floor(diff / 1000);
    els.cdDays.textContent = pad(days);
    els.cdHours.textContent = pad(hours);
    els.cdMins.textContent = pad(mins);
    els.cdSecs.textContent = pad(secs);
  }

  function initCountdown() {
    if (!CONFIG.showCountdown) {
      els.countdown.hidden = true;
      return;
    }
    const wd = new Date("2026-08-18T00:00:00");
    try { els.dayName.textContent = wd.toLocaleDateString("id-ID", { weekday: "long" }); } catch (e) {}
    tickCountdown();
    setInterval(tickCountdown, 1000);
  }

  // ---------- RSVP ----------
  function setAttend(value) {
    state.attend = value;
    const isHadir = value === "hadir";
    els.btnHadir.classList.toggle("is-active", isHadir);
    els.btnTidak.classList.toggle("is-active", !isHadir);
    els.guestsField.hidden = !isHadir;
  }

  function loadWishes() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      state.wishes = raw ? JSON.parse(raw) : [];
    } catch (e) {
      state.wishes = [];
    }
  }

  function saveWishes() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.wishes)); } catch (e) {}
  }

  function renderWishes() {
    const hadirCount = state.wishes.filter((w) => w.attend === "hadir").length;
    els.wishCount.textContent = String(state.wishes.length);
    els.hadirCount.textContent = String(hadirCount);

    if (!state.wishes.length) {
      els.wishes.hidden = true;
      els.wishes.innerHTML = "";
      return;
    }
    els.wishes.hidden = false;
    els.wishes.innerHTML = state.wishes.map((w) => {
      const initial = (w.name || "?").trim().charAt(0).toUpperCase();
      const attendLabel = w.attend === "hadir"
        ? (w.guests ? `Hadir · ${escapeHtml(w.guests)} orang` : "Hadir")
        : "Berhalangan hadir";
      const statusClass = w.attend === "hadir" ? "wish-status--hadir" : "wish-status--tidak";
      const message = w.message
        ? `<p class="wish-message">${escapeHtml(w.message)}</p>`
        : "";
      return `
        <div class="wish-card">
          <div class="wish-head">
            <span class="wish-avatar">${escapeHtml(initial)}</span>
            <div class="wish-body">
              <div class="wish-name">${escapeHtml(w.name)}</div>
              <div class="wish-status ${statusClass}">${attendLabel}</div>
            </div>
          </div>
          ${message}
        </div>`;
    }).join("");
  }

  function submitRsvp(e) {
    e.preventDefault();
    const name = els.rsvpName.value.trim();
    if (!name) {
      els.rsvpError.hidden = false;
      return;
    }
    els.rsvpError.hidden = true;
    const entry = {
      id: Date.now(),
      name,
      attend: state.attend,
      guests: state.attend === "hadir" ? els.rsvpGuests.value : "",
      message: els.rsvpMessage.value.trim(),
    };
    state.wishes = [entry, ...state.wishes];
    saveWishes();
    renderWishes();
    els.rsvpName.value = "";
    els.rsvpMessage.value = "";
  }

  function initRsvp() {
    if (!CONFIG.showRsvp) {
      els.rsvpSection.hidden = true;
      return;
    }
    loadWishes();
    renderWishes();
    setAttend("hadir");
    els.btnHadir.addEventListener("click", () => setAttend("hadir"));
    els.btnTidak.addEventListener("click", () => setAttend("tidak"));
    els.rsvpName.addEventListener("input", () => { els.rsvpError.hidden = true; });
    els.rsvpForm.addEventListener("submit", submitRsvp);
  }

  // ---------- scroll-reveal ----------
  let revealObserver = null;
  function setupReveal() {
    if (revealObserver) return;
    try {
      const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const nodes = document.querySelectorAll("[data-reveal]");
      if (reduce) { nodes.forEach((n) => n.classList.add("in")); return; }

      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const delay = Math.min(0.24, Number(target.getAttribute("data-rd")) || 0);
            target.style.transitionDelay = delay + "s";
            target.classList.add("in");
            revealObserver.unobserve(target);
          }
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

      // stagger siblings within the same section
      const seen = new Map();
      nodes.forEach((n) => {
        const sec = n.closest("section") || n.parentElement;
        const i = seen.get(sec) || 0;
        n.setAttribute("data-rd", i * 0.12);
        seen.set(sec, i + 1);
        revealObserver.observe(n);
      });
    } catch (e) {}
  }

  // ---------- ambient parallax on background glows ----------
  function initParallax() {
    const nodes = Array.from(document.querySelectorAll("[data-parallax]"));
    if (!nodes.length) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const apply = () => {
      const mid = window.innerHeight / 2;
      nodes.forEach((n) => {
        const factor = parseFloat(n.getAttribute("data-parallax")) || 0;
        const rect = n.getBoundingClientRect();
        const offset = (mid - (rect.top + rect.height / 2)) * factor;
        n.style.transform = `translateY(${offset.toFixed(1)}px)`;
      });
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
  }

  // ---------- curtain (scroll-locked opening) ----------
  let curtainBound = false;
  let curtainProgress = 0;
  let curtainSpan = 1;
  let curtainDone = false;
  let wheelHandler, touchStartHandler, touchMoveHandler, keyHandler;
  let lastTouchY = null;

  function removeCurtainListeners() {
    if (wheelHandler) window.removeEventListener("wheel", wheelHandler, { passive: false });
    if (touchStartHandler) window.removeEventListener("touchstart", touchStartHandler);
    if (touchMoveHandler) window.removeEventListener("touchmove", touchMoveHandler, { passive: false });
    if (keyHandler) window.removeEventListener("keydown", keyHandler);
    wheelHandler = touchStartHandler = touchMoveHandler = keyHandler = null;
  }

  function renderCurtain() {
    const l = els.drapeLeft, r = els.drapeRight;
    if (!l || !r) return;
    const p = Math.min(1, Math.max(0, curtainProgress / curtainSpan));
    const eased = 1 - Math.pow(1 - p, 3);
    const rot = eased * 64;
    const slide = eased * 48;
    const fade = p > 0.8 ? (p - 0.8) / 0.2 : 0;
    l.style.opacity = String(1 - fade);
    r.style.opacity = String(1 - fade);
    l.style.transform = `translateX(${-slide}%) rotateY(${rot}deg)`;
    r.style.transform = `translateX(${slide}%) rotateY(${-rot}deg)`;
    if (els.valance) {
      els.valance.style.transform = `translateY(${-eased * 120}%)`;
      els.valance.style.opacity = String(1 - fade);
    }
    if (els.scrollHint) {
      els.scrollHint.style.opacity = String(Math.max(0, 1 - p * 2.4));
    }
  }

  function finishCurtain() {
    removeCurtainListeners();
    try { document.body.style.overflow = ""; window.scrollTo(0, 0); } catch (e) {}
    curtainDone = true;
    els.curtain.hidden = true;
  }

  function advanceCurtain(delta) {
    curtainProgress = Math.min(curtainSpan, Math.max(0, curtainProgress + delta));
    window.requestAnimationFrame(renderCurtain);
    if (curtainProgress >= curtainSpan) finishCurtain();
  }

  function setupCurtain() {
    if (curtainBound) return;
    curtainBound = true;

    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      curtainDone = true;
      els.curtain.hidden = true;
      return;
    }

    els.curtain.hidden = false;
    curtainProgress = 0;
    curtainSpan = Math.max(1, window.innerHeight * 0.9);
    try { document.body.style.overflow = "hidden"; window.scrollTo(0, 0); } catch (e) {}

    wheelHandler = (e) => {
      if (curtainDone) return;
      e.preventDefault();
      advanceCurtain(e.deltaY);
    };
    touchStartHandler = (e) => { lastTouchY = e.touches[0].clientY; };
    touchMoveHandler = (e) => {
      if (curtainDone || lastTouchY == null) return;
      e.preventDefault();
      const y = e.touches[0].clientY;
      advanceCurtain((lastTouchY - y) * 1.6);
      lastTouchY = y;
    };
    keyHandler = (e) => {
      if (curtainDone) return;
      if (["ArrowDown", "PageDown", " ", "Spacebar"].includes(e.key)) {
        e.preventDefault();
        advanceCurtain(curtainSpan * 0.22);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        advanceCurtain(-curtainSpan * 0.22);
      }
    };

    window.addEventListener("wheel", wheelHandler, { passive: false });
    window.addEventListener("touchstart", touchStartHandler, { passive: true });
    window.addEventListener("touchmove", touchMoveHandler, { passive: false });
    window.addEventListener("keydown", keyHandler);
    renderCurtain();
  }

  // ---------- music ----------
  function setMusicSpinning(spinning) {
    els.musicIcon.classList.toggle("is-spinning", spinning);
  }

  function toggleMusic() {
    const a = els.audio;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setMusicSpinning(true)).catch(() => {});
    } else {
      a.pause();
      setMusicSpinning(false);
    }
  }

  function initMusic() {
    if (!CONFIG.musicEnabled) {
      els.musicBtn.hidden = true;
      return;
    }
    els.musicBtn.addEventListener("click", toggleMusic);
  }

  // ---------- open invitation ----------
  function openInvitation() {
    els.cover.hidden = true;
    els.petals.hidden = false;
    try { document.body.style.overflow = ""; window.scrollTo(0, 0); } catch (e) {}
    setTimeout(setupReveal, 60);
    setTimeout(setupCurtain, 60);
    if (CONFIG.musicEnabled) {
      els.musicBtn.hidden = false;
      const a = els.audio;
      if (a) a.play().then(() => setMusicSpinning(true)).catch(() => {});
    }
  }

  function init() {
    try { document.body.style.overflow = "hidden"; } catch (e) {}
    initGuestName();
    initCountdown();
    initRsvp();
    initMusic();
    initParallax();
    els.openBtn.addEventListener("click", openInvitation);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
