(function () {
  var KEY = "topi-demo-theme", root = document.documentElement;

  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function isLight() { return root.getAttribute("data-theme") === "light"; }

  function sync() {
    var light = isLight();
    document.querySelectorAll(".theme-toggle").forEach(function (b) {
      b.setAttribute("aria-checked", light ? "true" : "false");
      var label = light ? "Thème clair activé. Passer au thème sombre" : "Thème sombre activé. Passer au thème clair";
      b.setAttribute("aria-label", label);
      b.title = label;
    });
  }

  function apply(theme) {
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    sync();
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".theme-toggle");
    if (!b) return;
    var next = isLight() ? "dark" : "light";
    apply(next);
    try { localStorage.setItem(KEY, next); } catch (err) {}
  });

  window.addEventListener("storage", function (e) {
    if (e.key === KEY) apply(e.newValue);
  });

  sync();
})();
