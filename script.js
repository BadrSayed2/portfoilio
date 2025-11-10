// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Mobile navigation toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    hamburger.classList.toggle("active")
  })
}

// Contact form handling
const contactForm = document.getElementById("contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value

    // Basic validation
    if (!name || !email || !message) {
      alert("Please fill in all fields")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address")
      return
    }

    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    alert("Thank you for your message! I'll get back to you soon.")

    // Reset form
    contactForm.reset()
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")

      // Animate progress bars when they come into view
      if (entry.target.classList.contains("skills-progress")) {
        const progressBars = entry.target.querySelectorAll(".progress-fill")
        progressBars.forEach((bar) => {
          const width = bar.style.width
          bar.style.width = "0%"
          setTimeout(() => {
            bar.style.width = width
          }, 200)
        })
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".about, .education, .services, .projects, .skills, .contact")
  animatedElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })

  // Observe skills progress specifically
  const skillsProgress = document.querySelector(".skills-progress")
  if (skillsProgress) {
    observer.observe(skillsProgress)
  }
})

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
  } else {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.8)"
  }
})

// Handle image loading errors
document.addEventListener("DOMContentLoaded", () => {
  const avatarImg = document.querySelector(".avatar img")
  const avatarFallback = document.querySelector(".avatar-fallback")

  if (avatarImg && avatarFallback) {
    avatarImg.addEventListener("error", () => {
      avatarImg.style.display = "none"
      avatarFallback.style.display = "flex"
    })
  }
})

// Add CSS for active nav link
const style = document.createElement("style")
style.textContent = `
    .nav-link.active {
        color: var(--primary) !important;
        font-weight: 600;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 4rem;
            flex-direction: column;
            background-color: var(--background);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
            border-top: 1px solid var(--border);
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`
document.head.appendChild(style)
