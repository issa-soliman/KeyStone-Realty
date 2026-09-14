document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("open-btn");
  const sidebar = document.getElementById("sidebar");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  // 1. فتح وإغلاق السايدبار
  if (openBtn && sidebar) {
    openBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = sidebar.classList.toggle("active");
      sidebar.classList.toggle("show");

      if (menuIcon && closeIcon) {
        menuIcon.style.display = isOpen ? "none" : "block";
        closeIcon.style.display = isOpen ? "block" : "none";
      }
    });

    // إغلاق عند الضغط خارجاً
    document.addEventListener("click", (e) => {
      if (!sidebar.contains(e.target) && !openBtn.contains(e.target)) {
        sidebar.classList.remove("active", "show");
        if (menuIcon) menuIcon.style.display = "block";
        if (closeIcon) closeIcon.style.display = "none";
      }
    });
  }

  // 2. التمرير والإضاءة عند الضغط والتصفح
  const navLinks = document.querySelectorAll('a.links[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId === "#") return;

      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        e.preventDefault();
        
        // التمرير للسكشن
        targetSection.scrollIntoView({ behavior: "smooth" });

        // تفعيل الرابط المضروب فوراً
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");

        // إغلاق السايدبار بعد الضغط
        if (sidebar) {
          sidebar.classList.remove("active", "show");
          if (menuIcon) menuIcon.style.display = "block";
          if (closeIcon) closeIcon.style.display = "none";
        }
      }
    });
  });

  // 3. التحديث التلقائي أثناء السكرول بالماوس
  window.addEventListener("scroll", () => {
    let currentSectionId = "";

    navLinks.forEach((link) => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId !== "#") {
        const section = document.querySelector(targetId);
        if (section) {
          const sectionTop = section.offsetTop - 150; // offset لضبط بداية الرؤية
          if (window.scrollY >= sectionTop) {
            currentSectionId = targetId;
          }
        }
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === currentSectionId) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  });
});