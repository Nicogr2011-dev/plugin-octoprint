/*
 * Eclipse Minimal Premium — OctoPrint Theme JS
 * Applies runtime DOM tweaks that CSS alone cannot do.
 */
(function () {
  "use strict";

  /* ── Wait for OctoPrint's KO bindings to settle ── */
  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  /* ── Inject Google Font link if not already present ── */
  function ensureFont() {
    if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Inter"]')) {
      var link = document.createElement("link");
      link.rel  = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght=200;300;400;600;700&display=swap";
      document.head.appendChild(link);
    }
  }

  /* ── Remove Bootstrap gradient inline styles that OctoPrint injects ── */
  function stripBootstrapGradients() {
    document.querySelectorAll(
      ".btn, .navbar, .progress-bar, .accordion-heading, .panel-heading"
    ).forEach(function (el) {
      el.style.backgroundImage = "none";
      el.style.textShadow      = "none";
      el.style.boxShadow       = "none";
      el.style.filter          = "none";
    });
  }

  /* ── Wrap sidebar accordion groups in a cleaner container ── */
  function styleSidebar() {
    var sidebar = document.getElementById("sidebar");
    if (sidebar) {
      sidebar.style.paddingTop = "16px";
    }
  }

  /* ── Add uppercase letter-spaced labels to accordion toggles ── */
  function styleAccordionToggles() {
    document.querySelectorAll(".accordion-toggle, .panel-title a").forEach(function (el) {
      el.style.fontWeight    = "600";
      el.style.letterSpacing = "1px";
      el.style.textTransform = "uppercase";
      el.style.fontSize      = "8.5pt";
    });
  }

  /* ── Format large temperature numbers: add °C sibling ── */
  function enhanceTemperatureDisplay() {
    var tempCells = document.querySelectorAll("td.cell-actual");
    tempCells.forEach(function (cell) {
      if (!cell.dataset.eclipseDone) {
        var text = cell.textContent.trim();
        var num  = parseFloat(text);
        if (!isNaN(num)) {
          cell.innerHTML =
            '<span style="font-size:48pt;font-weight:300;line-height:1;letter-spacing:-2px;color:#333333;">' +
            Math.round(num) +
            '</span><span style="font-size:18pt;font-weight:300;color:#AAAAAA;margin-left:4px;">°C</span>';
          cell.dataset.eclipseDone = "1";
        }
      }
    });
  }

  /* ── Tab switch animation via class toggle ── */
  function attachTabAnimation() {
    document.querySelectorAll('[data-toggle="tab"], .nav-tabs a').forEach(function (tab) {
      tab.addEventListener("shown", function () {
        var target = document.querySelector(tab.getAttribute("href"));
        if (target) {
          target.style.animation = "none";
          // Force reflow
          void target.offsetWidth;
          target.style.animation =
            "eclipseFadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards";
        }
      });
    });
  }

  /* ── Connection status dot ── */
  function styleConnectionStatus() {
    var statusEl = document.getElementById("state");
    if (!statusEl) return;

    var dot = document.createElement("span");
    dot.id = "eclipse-status-dot";
    dot.style.cssText = [
      "display:inline-block",
      "width:7px",
      "height:7px",
      "border-radius:50%",
      "background:#2ECC71",
      "margin-right:8px",
      "vertical-align:middle",
      "transition:background 0.3s",
    ].join(";");

    var heading = statusEl.querySelector(".accordion-heading");
    if (heading) {
      var toggle = heading.querySelector(".accordion-toggle");
      if (toggle && !document.getElementById("eclipse-status-dot")) {
        toggle.prepend(dot);
      }
    }
  }

  /* ── Observe OctoPrint state changes for the status dot ── */
  function watchConnectionState() {
    var dot = null;
    function getDot() {
      if (!dot) dot = document.getElementById("eclipse-status-dot");
      return dot;
    }

    /* OctoPrint fires custom events on connection change */
    document.addEventListener("octoprint.printer.connection", function (e) {
      var d = getDot();
      if (!d) return;
      var connected = e.detail && e.detail.state &&
        e.detail.state.text && e.detail.state.text.toLowerCase().indexOf("print") !== -1;
      d.style.background = connected ? "#2ECC71" : "#E74C3C";
    });
  }

  /* ── MutationObserver to re-apply tweaks on dynamic DOM changes ── */
  function observeDOMChanges() {
    var observer = new MutationObserver(function () {
      stripBootstrapGradients();
      enhanceTemperatureDisplay();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  /* ── INIT ── */
  ready(function () {
    ensureFont();
    stripBootstrapGradients();
    styleSidebar();
    styleAccordionToggles();
    attachTabAnimation();
    styleConnectionStatus();
    watchConnectionState();
    observeDOMChanges();

    /* Deferred for KO to finish rendering */
    setTimeout(function () {
      enhanceTemperatureDisplay();
      stripBootstrapGradients();
    }, 800);
  });
})();
