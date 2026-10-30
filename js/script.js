document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("open-btn");
  const sidebar = document.getElementById("sidebar");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  // 1. إعداد وتبديل القائمة الجانبية (Sidebar Toggle)
  if (closeIcon) closeIcon.style.display = "none";

  function toggleMenu(forceState) {
    if (!sidebar) return;

    // تحديد حالة الفتح أو تبديلها
    const isOpen = forceState !== undefined ? forceState : !sidebar.classList.contains("show");

    sidebar.classList.toggle("show", isOpen);
    sidebar.classList.toggle("active", isOpen);

    if (menuIcon && closeIcon) {
      menuIcon.style.display = isOpen ? "none" : "block";
      closeIcon.style.display = isOpen ? "block" : "none";
    }
  }

  if (openBtn && sidebar) {
    // فتح/إغلاق عند الضغط على الزر
    openBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // إغلاق عند الضغط خارج القائمة
    document.addEventListener("click", (e) => {
      if (
        sidebar.classList.contains("show") &&
        !sidebar.contains(e.target) &&
        !openBtn.contains(e.target)
      ) {
        toggleMenu(false);
      }
    });
  }

  // 2. التمرير السلس والتحديث الفوري للرابط النشط (Smooth Scroll)
  const navLinks = document.querySelectorAll('a.links[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId === "#") return;

      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        e.preventDefault();

        // التمرير إلى القسم المطلوب
        targetSection.scrollIntoView({ behavior: "smooth" });

        // تفعيل الرابط المضروب فوراً
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");

        // إغلاق السايدبار بعد الضغط على الرابط
        toggleMenu(false);
      }
    });
  });

  // 3. التحديث التلقائي للرابط النشط أثناء التصفح بالماوس (ScrollSpy)
  window.addEventListener("scroll", () => {
    let currentSectionId = "";

    navLinks.forEach((link) => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId !== "#") {
        const section = document.querySelector(targetId);
        if (section) {
          const sectionTop = section.offsetTop - 150; // offset لضبط بداية رؤية السكشن
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

  // 4. منع إعادة تحميل الصفحة عند إرسال نموذج البحث
  const searchForm = document.getElementById("search-form");
  const featured = document.getElementById("featured-properties");

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (featured) featured.scrollIntoView({ behavior: "smooth" });
    });
  }

  // 5. نموذج التواصل: المتصفح يتحقق من الحقول المطلوبة، وبعدها نعرض رسالة نجاح
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    const sendBtn = contactForm.querySelector("button");
    const sendBtnHTML = sendBtn ? sendBtn.innerHTML : "";

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      contactForm.reset();

      if (sendBtn) {
        sendBtn.textContent = "Message Sent ✓";
        sendBtn.disabled = true;
        setTimeout(() => {
          sendBtn.innerHTML = sendBtnHTML;
          sendBtn.disabled = false;
        }, 3000);
      }
    });
  }
});