import { useState, useEffect, useRef } from "react";

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
  const [display, setDisplay] = useState("");
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
    } else if (deleting && charIdx === 0) {
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
  return (
    <span style={{ opacity: vis ? 1 : 0, color: "#3B82F6" }}>|</span>
  );
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div
          className="font-mono font-bold text-lg text-white cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="text-blue-400">{"<"}</span>MK<span className="text-blue-400">{"/>"}</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              className={`border-none bg-none cursor-pointer text-xs font-medium tracking-widest uppercase transition-colors duration-200 pb-0.5 ${
                active === link
                  ? "text-blue-400 border-b border-blue-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-none border-none cursor-pointer p-2 flex flex-col gap-1.5"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-5 h-[1.5px] bg-slate-300 transition-all duration-200 ${
                menuOpen && i === 0 ? "rotate-45 translate-y-[7px]"
                : menuOpen && i === 1 ? "opacity-0"
                : menuOpen && i === 2 ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          ))}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-slate-900/98 border-t border-slate-700/50 px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              className={`border-none bg-none cursor-pointer text-sm font-medium text-left py-2.5 px-3 rounded-md transition-colors duration-200 ${
                active === link ? "text-blue-400 bg-blue-500/10" : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
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
    75,
    2000
  );

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 pt-16 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-slate-900 to-slate-900 z-0" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/8 blur-3xl z-0 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center w-full">
        <div className="inline-flex items-center gap-2 border border-blue-500/25 bg-blue-500/8 rounded-full px-4 py-1.5 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" style={{ animation: "pulse 2s infinite" }} />
          <span className="font-mono text-[0.65rem] text-blue-300 tracking-widest uppercase">
            Available for Attachments
          </span>
        </div>

        <h1 className="font-space text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-3">
          <span className="text-white">Mark Koome </span>
          <span className="text-blue-400">Kaai</span>
        </h1>

        <div className="font-mono text-base sm:text-lg text-slate-400 mb-8 h-7">
          {typed}
          <Cursor />
        </div>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-10">
          Software Engineering student at Multimedia University of Kenya, building
          real-world solutions with a focus on usability, performance, and clean code.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-7 py-3 bg-blue-600 hover:bg-blue-500 border-none rounded-lg font-medium text-sm text-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
          >
            View Projects
          </button>
          <a
            href="mailto:markkaai2005@gmail.com"
            className="px-7 py-3 bg-transparent border border-slate-600 hover:border-blue-400 rounded-lg font-medium text-sm text-slate-300 hover:text-white no-underline inline-block transition-all duration-200 hover:-translate-y-0.5"
          >
            Get In Touch
          </a>
        </div>

        <div className="flex gap-6 justify-center">
          {[
            { href: "https://github.com/markkaai", label: "GitHub", icon: "github" },
            { href: "mailto:markkaai2005@gmail.com", label: "Email", icon: "mail" },
            { href: "tel:+254798774223", label: "Phone", icon: "phone" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-center gap-2 text-slate-500 hover:text-blue-400 no-underline transition-colors duration-200"
            >
              <span className="w-8 h-8 rounded-full border border-slate-700 group-hover:border-blue-500/50 flex items-center justify-center transition-colors duration-200">
                {item.icon === "github" && (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                )}
                {item.icon === "mail" && (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                )}
                {item.icon === "phone" && (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.62 4.4 2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l1.12-1.07a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                )}
              </span>
              <span className="text-[0.65rem] tracking-widest uppercase font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Divider() {
  return <div className="max-w-5xl mx-auto px-6"><div className="border-t border-slate-800" /></div>;
}

function SectionLabel({ children }) {
  return (
    <p className="font-mono text-[0.65rem] text-blue-400 tracking-[0.2em] uppercase mb-3">{children}</p>
  );
}

function ExperienceSection() {
  const [active, setActive] = useState(0);
  const exp = EXPERIENCES[active];

  return (
    <section id="experience" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <SectionLabel>Experience</SectionLabel>
        <h2 className="font-space text-3xl sm:text-4xl font-bold text-white">Where I've worked</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-8 max-w-3xl mx-auto">
        <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 md:min-w-[180px]">
          {EXPERIENCES.map((e, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`border-none px-4 py-3 cursor-pointer text-left rounded-lg flex-shrink-0 transition-all duration-200 ${
                active === i
                  ? "bg-blue-600/15 border-l-2 border-blue-400"
                  : "hover:bg-slate-800"
              }`}
            >
              <div className={`font-medium text-sm ${active === i ? "text-white" : "text-slate-400"}`}>
                {e.company}
              </div>
              <div className={`font-mono text-[0.6rem] mt-0.5 ${active === i ? "text-blue-400" : "text-slate-600"}`}>
                {e.period}
              </div>
            </button>
          ))}
        </div>

        <div className="flex-1">
          <h3 className="font-space text-xl font-bold text-white mb-1">{exp.role}</h3>
          <p className="font-mono text-xs text-blue-400 mb-6">{exp.company} · {exp.period}</p>
          <ul className="space-y-4 list-none p-0 m-0">
            {exp.points.map((pt, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-blue-400 mt-1 flex-shrink-0 text-xs">▸</span>
                <span className="text-slate-400 text-sm leading-relaxed">{pt}</span>
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
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <SectionLabel>Projects</SectionLabel>
        <h2 className="font-space text-3xl sm:text-4xl font-bold text-white">What I've built</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {PROJECTS.map((p, idx) => (
          <a
            key={idx}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="no-underline group"
          >
            <div className="h-full bg-slate-800/60 border border-slate-700/60 rounded-xl p-6 transition-all duration-200 hover:border-blue-500/40 hover:bg-slate-800 hover:-translate-y-1">
              <div className="flex justify-between items-start mb-5">
                <span className="font-mono text-[0.6rem] text-blue-400 tracking-widest uppercase">Project</span>
                <svg className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </div>
              <h3 className="font-space font-bold text-base text-white mb-2 group-hover:text-blue-300 transition-colors duration-200 leading-snug">
                {p.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-5">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[0.55rem] text-blue-300 bg-blue-500/10 border border-blue-500/15 rounded-full px-2.5 py-0.5">
                    {tag}
                  </span>
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
    <section id="skills" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <SectionLabel>Skills</SectionLabel>
        <h2 className="font-space text-3xl sm:text-4xl font-bold text-white">Tools & Technologies</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto mb-10">
        {Object.entries(SKILLS).map(([category, items]) => (
          <div
            key={category}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 transition-colors duration-200"
          >
            <p className="font-mono text-[0.55rem] text-blue-400 tracking-widest uppercase mb-3">{category}</p>
            <div className="flex flex-col gap-1.5">
              {items.map((skill) => (
                <span key={skill} className="text-xs text-slate-300">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {[
          {
            label: "Education",
            title: "B.Sc. Software Engineering",
            institution: "Multimedia University of Kenya",
            period: "Sep 2023 – Present",
          },
          {
            label: "Certification",
            title: "Python Developer",
            institution: "Sololearn",
            period: "Oct – Nov 2024",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600 transition-colors duration-200"
          >
            <p className="font-mono text-[0.55rem] text-blue-400 tracking-widest uppercase mb-3">{item.label}</p>
            <p className="font-space font-bold text-sm text-white mb-1">{item.title}</p>
            <p className="text-xs text-blue-300">{item.institution}</p>
            <p className="font-mono text-[0.65rem] text-slate-500 mt-1">{item.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto text-center">
      <SectionLabel>Contact</SectionLabel>
      <h2 className="font-space text-3xl sm:text-4xl font-bold text-white mb-4">
        Let's build something{" "}
        <span className="text-blue-400">together</span>
      </h2>
      <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto mb-10">
        Open to internship opportunities, freelance projects, and collaboration.
        Drop a message and let's connect.
      </p>
      <div className="flex flex-wrap gap-3 justify-center mb-20">
        <a
          href="mailto:markkaai2005@gmail.com"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium text-sm text-white no-underline inline-block transition-all duration-200 hover:-translate-y-0.5"
        >
          Send an Email →
        </a>
        <a
          href="https://github.com/markkaai"
          target="_blank"
          rel="noreferrer"
          className="px-8 py-3 bg-transparent border border-slate-600 hover:border-blue-400 rounded-lg font-medium text-sm text-slate-300 hover:text-white no-underline inline-block transition-all duration-200 hover:-translate-y-0.5"
        >
          GitHub Profile
        </a>
      </div>
      <div className="border-t border-slate-800 pt-8 font-mono text-[0.6rem] text-slate-600 tracking-wider">
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
      { threshold: 0.3 }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: #0F172A;
          color: #F1F5F9;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0F172A; }
        ::-webkit-scrollbar-thumb { background: #3B82F6; border-radius: 3px; }

        .font-space { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
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