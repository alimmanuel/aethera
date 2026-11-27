document.addEventListener("DOMContentLoaded", () => {
  // 1. Navbar Scroll Effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // 3. Interactive ROAS & Revenue Simulator
  const budgetSlider = document.getElementById("budgetSlider");
  const budgetDisplay = document.getElementById("budgetDisplay");
  const clicksResult = document.getElementById("clicksResult");
  const roasResult = document.getElementById("roasResult");
  const revenueResult = document.getElementById("revenueResult");
  const tierButtons = document.querySelectorAll(".tier-btn");

  let currentRoas = 4.8;
  let currentCpc = 2800;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  const updateSimulation = () => {
    const budget = parseInt(budgetSlider.value, 10);
    const estimatedClicks = Math.round(budget / currentCpc);
    const estimatedRevenue = budget * currentRoas;

    budgetDisplay.textContent = formatRupiah(budget);
    clicksResult.textContent = estimatedClicks.toLocaleString("id-ID");
    roasResult.textContent = currentRoas.toFixed(1) + "x";
    revenueResult.textContent = formatRupiah(estimatedRevenue);
  };

  budgetSlider.addEventListener("input", updateSimulation);

  tierButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tierButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      currentRoas = parseFloat(btn.dataset.roas);
      currentCpc = parseInt(btn.dataset.cpc, 10);
      updateSimulation();
    });
  });

  updateSimulation();

  // 4. Scroll Reveal Animation
  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealElements.forEach((el) => observer.observe(el));

  // 5. Contact Form Submission Handler
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const platform = document.getElementById("platform").value;

    formFeedback.textContent =
      "Terima kasih, " +
      name +
      ". Permintaan audit " +
      platform +
      " Anda telah dijadwalkan.";
    contactForm.reset();

    setTimeout(() => {
      formFeedback.textContent = "";
    }, 6000);
  });
});
