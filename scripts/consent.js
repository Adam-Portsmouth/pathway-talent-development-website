(function () {
  var STORAGE_KEY = "pathway_analytics_consent";
  var GA_ID = "G-EWJP82Z96L";

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };

  var storedConsent = null;
  try { storedConsent = localStorage.getItem(STORAGE_KEY); } catch (e) {}

  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: storedConsent === "granted" ? "granted" : "denied",
    wait_for_update: 500
  });

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);

  window.gtag("js", new Date());
  window.gtag("config", GA_ID);

  function showBanner() {
    var banner = document.createElement("aside");
    banner.className = "consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML =
      '<p>Pathway Talent Development uses Google Analytics, which places first-party cookies on the site to provide anonymous data about how you interact with it. You can <a href="https://support.google.com/analytics/answer/181881?hl=en" target="_blank" rel="noopener">opt out</a>.</p>' +
      '<div class="consent-banner__actions">' +
      '<button type="button" class="consent-banner__accept">OK</button>' +
      "</div>";

    document.body.appendChild(banner);

    banner.querySelector(".consent-banner__accept").addEventListener("click", function () {
      try { localStorage.setItem(STORAGE_KEY, "granted"); } catch (e) {}
      window.gtag("consent", "update", { analytics_storage: "granted" });
      banner.remove();
    });
  }

  function init() {
    if (storedConsent !== "granted") showBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
