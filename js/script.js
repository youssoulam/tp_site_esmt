document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('nav a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});