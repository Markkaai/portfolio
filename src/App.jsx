import { useState, useEffect } from "react";

const NAV_LINKS = ["About", "Experience", "Projects", "Skills", "Contact"];

const SKILLS = {
  Languages: ["Java", "C++", "Python", "SQL"],
  Web: ["HTML5", "CSS3", "JavaScript", "React"],
  Databases: ["MySQL", "MongoDB", "Firebase"],
  Tools: ["Git", "IntelliJ IDEA", "VS Code", "JetBrains"],
  Office: ["Excel", "Word", "PowerPoint"],
};

const PROJECTS = [
  {
    title: "Event Booking Application",
    desc: "A fully functional React event booking app with smooth user flows, form handling, and real-time feedback.",
    tags: ["React", "JavaScript", "CSS"],
    link: "https://github.com/Markkaai/react-fit-app.git",
  },
  {
    title: "Animated Login Form",
    desc: "A polished animated login form featuring micro-interactions, CSS transitions, and accessibility-conscious design.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/Markkaai/miniprojects.git",
  },
  {
    title: "Full-Stack Movie & Series Platform",
    desc: "A complete streaming catalogue app with Firebase authentication, real-time data management, and responsive UI.",
    tags: ["React", "Firebase", "MongoDB"],
    link: "https://github.com/markkaai",
  },

 {
  title: "Soccer AI — EPL Predictive Model",
  desc: "A machine learning model that analyses historic and live EPL data to predict upcoming match outcomes with statistical confidence.",
  tags: ["Python", "React"],
  link: "https://github.com/markkaai",
},

];

const EXPERIENCES = [
  {
    role: "Frontend Developer Intern",
    company: "Affam Limited",
    period: "May 2025 – Aug 2025",
    points: [
      "Designed and refined responsive UIs for web pages and application features",
      "Translated wireframes into functional front-end components",
      "Improved usability, layout consistency, and overall UX",
      "Built accessible interfaces using HTML, CSS and front-end frameworks",
    ],
  },
  {
    role: "Freelance Software Developer",
    company: "Self-Employed",
    period: "2024 – Present",
    points: [
      "Developed and deployed full-stack websites using React, JavaScript, HTML5 & CSS",
      "Optimised client sites for speed and responsiveness — improving performance by 30%+",
      "Managed both front-end design and back-end architecture independently",
    ],
  },
];

function useTypewriter(phrases, speed = 80, pause = 1800) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

  return phrases[phraseIdx].slice(0, charIdx);
}

function Cursor() {
  const [vis, setVis] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setVis((v) => !v), 530);
    return () => clearInterval(t);
  }, []);
  return <span style={{ opacity: vis ? 1 : 0, color: "#60a5fa" }}>|</span>;
}

function NavBar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (item) => {
    setActive(item);
    setMenuOpen(false);
    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(15,23,42,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 18, color: "#fff", cursor: "pointer", letterSpacing: 1 }}
        >
          <span style={{ color: "#60a5fa" }}>{"<"}</span>MK<span style={{ color: "#60a5fa" }}>{"/>"}</span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 36 }} className="desk-nav">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 500,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: active === link ? "#60a5fa" : "#94a3b8",
                borderBottom: active === link ? "1px solid #60a5fa" : "1px solid transparent",
                paddingBottom: 2, transition: "color 0.2s",
              }}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mob-menu-btn"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none", flexDirection: "column", gap: 5 }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block", width: 22, height: 2, background: "#cbd5e1", borderRadius: 2,
              transition: "all 0.25s",
              transform: menuOpen && i === 0 ? "rotate(45deg) translateY(7px)" : menuOpen && i === 2 ? "rotate(-45deg) translateY(-7px)" : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {menuOpen && (
        <div style={{ background: "rgba(15,23,42,0.99)", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "12px 24px 20px" }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              style={{
                display: "block", width: "100%", background: active === link ? "rgba(96,165,250,0.1)" : "none",
                border: "none", cursor: "pointer", textAlign: "left",
                fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500,
                color: active === link ? "#60a5fa" : "#e2e8f0",
                padding: "10px 12px", borderRadius: 8, marginBottom: 2,
              }}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const typed = useTypewriter(
    ["Full-Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Software Engineering Student"],
    75, 2000
  );

  return (
    <section id="about" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      padding: "80px 32px 64px", position: "relative", overflow: "hidden",
    }}>
      {/* Subtle glow */}
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 640, width: "100%", textAlign: "center" }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          border: "1px solid rgba(96,165,250,0.25)", borderRadius: 999,
          padding: "6px 16px", marginBottom: 40,
          background: "rgba(96,165,250,0.06)",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#60a5fa", display: "inline-block", animation: "blink 2s infinite" }} />
          <span style={{ fontFamily: "monospace", fontSize: 10, color: "#93c5fd", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Available for Internships
          </span>
        </div>

        {/* Name */}
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "clamp(40px, 8vw, 68px)", lineHeight: 1.1, margin: "0 0 16px", letterSpacing: "-1px" }}>
          <span style={{ color: "#f1f5f9" }}>Mark Koome </span>
          <span style={{ color: "#3b82f6" }}>Kaai</span>
        </h1>

        {/* Typewriter */}
        <div style={{ fontFamily: "monospace", fontSize: "clamp(14px, 2.5vw, 18px)", color: "#64748b", marginBottom: 28, minHeight: 28 }}>
          <span style={{ color: "#60a5fa" }}>$ </span>{typed}<Cursor />
        </div>

        {/* Bio */}
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.8, color: "#64748b", maxWidth: 500, margin: "0 auto 40px" }}>
          Software Engineering student at Multimedia University of Kenya, building
          real-world solutions with a focus on usability, performance, and clean code.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "12px 28px", background: "#2563eb", border: "none", borderRadius: 8,
              fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "#fff",
              cursor: "pointer", transition: "background 0.2s",
            }}
            onMouseEnter={e => e.target.style.background = "#3b82f6"}
            onMouseLeave={e => e.target.style.background = "#2563eb"}
          >
            View Projects
          </button>
          <a
            href="mailto:markkaai2005@gmail.com"
            style={{
              padding: "12px 28px", background: "transparent",
              border: "1px solid rgba(100,116,139,0.5)", borderRadius: 8,
              fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "#94a3b8",
              textDecoration: "none", display: "inline-block", transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.target.style.borderColor = "#60a5fa"; e.target.style.color = "#fff"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(100,116,139,0.5)"; e.target.style.color = "#94a3b8"; }}
          >
            Get In Touch
          </a>
        </div>

        {/* Social links */}
        <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
          {[
            { href: "https://github.com/markkaai", label: "GitHub", icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            )},
            { href: "mailto:markkaai2005@gmail.com", label: "Email", icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            )},
            { href: "tel:+254798774223", label: "Phone", icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.62 4.4 2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l1.12-1.07a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            )},
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 8, color: "#475569", textDecoration: "none", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
              onMouseLeave={e => e.currentTarget.style.color = "#475569"}
            >
              <span style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(71,85,105,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <p style={{ fontFamily: "monospace", fontSize: 10, color: "#3b82f6", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>{eyebrow}</p>
      <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(26px, 5vw, 36px)", color: "#f1f5f9", margin: 0 }}>{title}</h2>
    </div>
  );
}

function Divider() {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px" }}>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
    </div>
  );
}

function ExperienceSection() {
  const [active, setActive] = useState(0);
  const exp = EXPERIENCES[active];

  return (
    <section id="experience" style={{ padding: "96px 32px", maxWidth: 1000, margin: "0 auto" }}>
      <SectionHeader eyebrow="Experience" title="Where I've worked" />

      <div style={{ display: "flex", gap: 48, maxWidth: 760, margin: "0 auto", flexWrap: "wrap" }}>
        {/* Tab list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 160 }}>
          {EXPERIENCES.map((e, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                background: active === i ? "rgba(37,99,235,0.12)" : "none",
                border: "none",
                borderLeft: active === i ? "2px solid #3b82f6" : "2px solid transparent",
                cursor: "pointer", textAlign: "left",
                padding: "12px 16px", borderRadius: "0 8px 8px 0",
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: active === i ? "#f1f5f9" : "#64748b" }}>{e.company}</div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: active === i ? "#60a5fa" : "#475569", marginTop: 3 }}>{e.period}</div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 20, color: "#f1f5f9", margin: "0 0 4px" }}>{exp.role}</h3>
          <p style={{ fontFamily: "monospace", fontSize: 12, color: "#3b82f6", marginBottom: 24 }}>{exp.company} · {exp.period}</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {exp.points.map((pt, i) => (
              <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "#3b82f6", marginTop: 3, fontSize: 10, flexShrink: 0 }}>▸</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, lineHeight: 1.7, color: "#94a3b8" }}>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" style={{ padding: "96px 32px", maxWidth: 1000, margin: "0 auto" }}>
      <SectionHeader eyebrow="Projects" title="What I've built" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, maxWidth: 900, margin: "0 auto" }}>
        {PROJECTS.map((p, idx) => (
          <a
            key={idx}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: "rgba(30,41,59,0.6)", border: "1px solid rgba(51,65,85,0.8)",
                borderRadius: 12, padding: "28px 24px", height: "100%",
                transition: "border-color 0.2s, transform 0.2s", cursor: "pointer",
                display: "flex", flexDirection: "column",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(51,65,85,0.8)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <span style={{ fontFamily: "monospace", fontSize: 9, color: "#3b82f6", letterSpacing: "0.15em", textTransform: "uppercase" }}>Project</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 16, color: "#e2e8f0", margin: "0 0 10px", lineHeight: 1.4 }}>{p.title}</h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, lineHeight: 1.7, color: "#64748b", margin: "0 0 20px", flex: 1 }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tags.map((tag) => (
                  <span key={tag} style={{
                    fontFamily: "monospace", fontSize: 10, color: "#93c5fd",
                    background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.15)",
                    borderRadius: 999, padding: "3px 10px",
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" style={{ padding: "96px 32px", maxWidth: 1000, margin: "0 auto" }}>
      <SectionHeader eyebrow="Skills" title="Tools & Technologies" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, maxWidth: 900, margin: "0 auto 40px" }}>
        {Object.entries(SKILLS).map(([category, items]) => (
          <div key={category} style={{
            background: "rgba(30,41,59,0.5)", border: "1px solid rgba(51,65,85,0.7)",
            borderRadius: 12, padding: "20px 18px",
          }}>
            <p style={{ fontFamily: "monospace", fontSize: 9, color: "#3b82f6", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>{category}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {items.map((skill) => (
                <span key={skill} style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#cbd5e1" }}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, maxWidth: 600, margin: "0 auto" }}>
        {[
          { label: "Education", title: "B.Sc. Software Engineering", institution: "Multimedia University of Kenya", period: "Sep 2023 – Present" },
          { label: "Certification", title: "Python Developer", institution: "Sololearn", period: "Oct – Nov 2024" },
        ].map((item) => (
          <div key={item.label} style={{
            background: "rgba(30,41,59,0.5)", border: "1px solid rgba(51,65,85,0.7)",
            borderRadius: 12, padding: "24px 20px",
          }}>
            <p style={{ fontFamily: "monospace", fontSize: 9, color: "#3b82f6", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>{item.label}</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 14, color: "#f1f5f9", marginBottom: 4 }}>{item.title}</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#60a5fa", marginBottom: 6 }}>{item.institution}</p>
            <p style={{ fontFamily: "monospace", fontSize: 11, color: "#475569" }}>{item.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" style={{ padding: "96px 32px 80px", maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
      <SectionHeader eyebrow="Contact" title="" />
      <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 6vw, 48px)", color: "#f1f5f9", margin: "0 0 16px", lineHeight: 1.2 }}>
        Let's build something <span style={{ color: "#3b82f6" }}>together</span>
      </h2>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.8, color: "#64748b", maxWidth: 440, margin: "0 auto 40px" }}>
        Open to internship opportunities, freelance projects, and collaboration. Drop a message and let's connect.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 80 }}>
        <a
          href="mailto:markkaai2005@gmail.com"
          style={{
            padding: "13px 32px", background: "#2563eb", borderRadius: 8,
            fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "#fff",
            textDecoration: "none", display: "inline-block", transition: "background 0.2s",
          }}
          onMouseEnter={e => e.target.style.background = "#3b82f6"}
          onMouseLeave={e => e.target.style.background = "#2563eb"}
        >
          Send an Email →
        </a>
        <a
          href="https://github.com/markkaai"
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "13px 32px", background: "transparent", border: "1px solid rgba(100,116,139,0.5)", borderRadius: 8,
            fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "#94a3b8",
            textDecoration: "none", display: "inline-block", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.target.style.borderColor = "#60a5fa"; e.target.style.color = "#fff"; }}
          onMouseLeave={e => { e.target.style.borderColor = "rgba(100,116,139,0.5)"; e.target.style.color = "#94a3b8"; }}
        >
          GitHub Profile
        </a>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 28, fontFamily: "monospace", fontSize: 11, color: "#334155", letterSpacing: "0.08em" }}>
        © 2025 Mark Koome Kaai · Built with React & Tailwind
      </div>
    </section>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("About");

  useEffect(() => {
    const sections = NAV_LINKS.map((n) => document.getElementById(n.toLowerCase()));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.id;
            setActiveNav(id.charAt(0).toUpperCase() + id.slice(1));
          }
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0f172a; color: #f1f5f9; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 2px; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @media (max-width: 640px) {
          .desk-nav { display: none !important; }
          .mob-menu-btn { display: flex !important; }
        }
      `}</style>
      <NavBar active={activeNav} setActive={setActiveNav} />
      <main>
        <HeroSection />
        <Divider />
        <ExperienceSection />
        <Divider />
        <ProjectsSection />
        <Divider />
        <SkillsSection />
        <Divider />
        <ContactSection />
      </main>
    </>
  );
}
