      document.querySelectorAll(".faq-question").forEach((btn) => {
        btn.addEventListener("click", () => {
          const answer = btn.nextElementSibling;
          const toggle = btn.querySelector(".faq-toggle");
          answer.style.display =
            answer.style.display === "block" ? "none" : "block";
          toggle.textContent = answer.style.display === "block" ? "−" : "+";
        });
      });
      // Synchronized counting animation — all finish together
      const counters = document.querySelectorAll(".stat-number");
      const DURATION = 2500; // Total animation time in ms (2.5 seconds)

      const startAllCounters = () => {
        const startTime = performance.now();

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / DURATION, 1); // 0 to 1

          counters.forEach((counter) => {
            const target = +counter.getAttribute("data-target");
            const count = Math.floor(progress * target);
            counter.innerText = count;

            // Add "+" back only at the end
            if (
              progress === 1 &&
              counter.nextSibling?.textContent.includes("+")
            ) {
              counter.innerText = target + "+";
            } else if (
              progress < 1 &&
              counter.nextSibling?.textContent.includes("+")
            ) {
              counter.innerText = count;
            } else {
              counter.innerText = count;
            }
          });

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      };

      // Trigger when in view
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startAllCounters();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.7 }
      );

      // Observe the container (not individual counters)
      const statsSection = document.querySelector(".hero-stats");
      if (statsSection) {
        counters.forEach((c) => (c.innerText = "0")); // Reset
        observer.observe(statsSection);
      }
        // Hamburger Menu Toggle
      const hamburger = document.querySelector('.hamburger');
      const navMenu = document.querySelector('.nav-menu');

      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
      });

      // Close menu when clicking on a link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        });
      });
    