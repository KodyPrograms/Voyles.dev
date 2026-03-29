import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import heroImage from "./assets/kodyv.jpg";

type ProjectLink = {
  label: string;
  href: string;
};

type Project = {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  status: string;
  github?: string;
  demo?: string;
  stack: string[];
  role: string;
  focus: string;
  highlights: string[];
  links?: ProjectLink[];
  liveLinks?: ProjectLink[];
  deploymentNote?: string;
  localRun?: string[];
  demoAccounts?: string[];
  architecture?: string[];
  apiNotes?: string[];
};

type PortfolioButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "compact" | "compactSecondary";
  children: ReactNode;
  external?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  className?: string;
  type?: "a" | "button";
};

type ToastProps = {
  message: string;
};

type DetailModalProps = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string) => void;
};

const cardClassName =
  "rounded-[2rem] border border-[#e7e0d7]/80 bg-white/88 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.18)] backdrop-blur";

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ExternalLinkIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 3h7v7" />
      <path d="M10 14 21 3" />
      <path d="M21 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    </svg>
  );
}

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.08 3.29 9.38 7.86 10.9.58.11.79-.25.79-.56 0-.28-.01-1.2-.02-2.18-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.69 1.26 3.35.96.11-.75.4-1.26.72-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.45.11-3.03 0 0 .97-.31 3.18 1.18a11.02 11.02 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.74.11 3.03.73.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.42.36.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56 4.57-1.53 7.85-5.82 7.85-10.9C23.5 5.66 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5ZM.5 8h4V23h-4V8Zm7 0h3.83v2.05h.05c.53-1.01 1.84-2.08 3.79-2.08 4.05 0 4.8 2.67 4.8 6.14V23h-4v-7.88c0-1.88-.03-4.29-2.62-4.29-2.62 0-3.02 2.05-3.02 4.16V23h-4V8Z" />
    </svg>
  );
}

function MailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function MenuIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function XIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ButtonArrow() {
  return <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />;
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7c6f67]">{children}</p>;
}

function StatusPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-[#ddd2c8] bg-[#f8f4ee] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#6b7280]">
      {children}
    </span>
  );
}

function Toast({ message }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-5 right-5 z-[100] rounded-2xl bg-[#111827] px-5 py-3 text-sm text-white shadow-[0_20px_40px_-18px_rgba(15,23,42,0.6)]"
      role="status"
      aria-live="polite"
    >
      {message}
    </motion.div>
  );
}

function PortfolioButton({
  href = "#",
  variant = "primary",
  children,
  external = false,
  onClick,
  className = "",
  type = "a",
}: PortfolioButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full border text-sm font-medium transition duration-200 hover:-translate-y-0.5";
  const variants: Record<NonNullable<PortfolioButtonProps["variant"]>, string> = {
    primary:
      "border-[#111827] bg-[#111827] px-5 py-3 text-white shadow-[0_14px_30px_-18px_rgba(17,24,39,0.55)] hover:bg-[#1f2937]",
    secondary:
      "border-[#d9d0c5] bg-white px-5 py-3 text-[#111827] hover:bg-[#faf7f2] hover:border-[#cbbeb0]",
    ghost:
      "border-transparent bg-transparent px-3 py-2 text-[#111827] hover:bg-white/80",
    compact:
      "border-[#111827] bg-[#111827] px-4 py-2.5 text-white shadow-[0_14px_30px_-18px_rgba(17,24,39,0.55)] hover:bg-[#1f2937]",
    compactSecondary:
      "border-[#d9d0c5] bg-white px-4 py-2.5 text-[#111827] hover:bg-[#faf7f2] hover:border-[#cbbeb0]",
  };

  const combinedClassName = `${base} ${variants[variant]} ${className}`.trim();

  if (type === "button") {
    return (
      <button type="button" onClick={onClick} className={combinedClassName}>
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onClick={onClick}
      className={combinedClassName}
    >
      {children}
    </a>
  );
}

function DetailModal({ project, isOpen, onClose, onShowToast }: DetailModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const isAutomotiveProject = project.title === "Automotive Website & Marketing Work";
  const leftColumnCards = {
    showLiveLinks: Boolean(project.liveLinks?.length),
    showLocalRun: Boolean(project.localRun?.length),
    showDemoAccounts: Boolean(project.demoAccounts?.length),
  };
  const rightColumnCards = {
    showDeploymentNote: Boolean(project.deploymentNote),
    showArchitecture: Boolean(project.architecture?.length),
    showApiNotes: Boolean(project.apiNotes?.length),
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#111827]/55 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/50 bg-[#fcfbf8] shadow-[0_28px_90px_-36px_rgba(15,23,42,0.55)]"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 inline-flex rounded-full border border-[#e7e0d7] bg-white/90 p-2 text-[#111827] transition hover:bg-[#faf7f2]"
              aria-label="Close project details"
            >
              <XIcon className="h-5 w-5" />
            </button>

            <div className="border-b border-[#ece4d8] px-6 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-8">
              <SectionEyebrow>Project Details</SectionEyebrow>
              <h3 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-[#111827] sm:text-[2.2rem]">
                {project.title}
              </h3>
              <p className="mt-3 text-sm text-[#6b7280]">{project.subtitle}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#e6ddd2] bg-white px-3 py-1.5 text-sm text-[#4b5563]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="custom-scroll grid max-h-[70vh] gap-6 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-6">
                <div className={`${cardClassName} bg-white p-6`}>
                  <h4 className="text-lg font-semibold text-[#111827]">Overview</h4>
                  <p className="mt-4 text-sm leading-8 text-[#4b5563]">{project.longDescription}</p>
                </div>

                <div className={`${cardClassName} bg-white p-6`}>
                  <h4 className="text-lg font-semibold text-[#111827]">Highlights</h4>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4b5563]">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#111827]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {leftColumnCards.showLiveLinks ? (
                  <div className={`${cardClassName} bg-white p-6`}>
                    <h4 className="text-lg font-semibold text-[#111827]">Live App</h4>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {project.liveLinks?.map((link) => (
                        <PortfolioButton
                          key={`${link.href}-${link.label}`}
                          href={link.href}
                          variant="compactSecondary"
                          external
                        >
                          <ExternalLinkIcon className="h-4 w-4" />
                          {link.label}
                        </PortfolioButton>
                      ))}
                    </div>
                  </div>
                ) : null}

                {leftColumnCards.showLocalRun ? (
                  <div className={`${cardClassName} bg-white p-6`}>
                    <h4 className="text-lg font-semibold text-[#111827]">Running Locally</h4>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4b5563]">
                      {project.localRun?.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#111827]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {leftColumnCards.showDemoAccounts ? (
                  <div className={`${cardClassName} bg-white p-6`}>
                    <h4 className="text-lg font-semibold text-[#111827]">Demo Accounts</h4>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4b5563]">
                      {project.demoAccounts?.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#111827]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="space-y-6">
                <div className="rounded-[1.75rem] bg-[#111827] p-6 text-white shadow-[0_18px_40px_-24px_rgba(17,24,39,0.55)]">
                  <h4 className="text-lg font-semibold">My Role</h4>
                  <p className="mt-4 text-sm leading-7 text-white/80">{project.role}</p>
                </div>

                <div className={`${cardClassName} bg-[#fffdf9] p-6`}>
                  <h4 className="text-lg font-semibold text-[#111827]">Project Focus</h4>
                  <p className="mt-4 text-sm leading-7 text-[#4b5563]">{project.focus}</p>
                </div>

                {rightColumnCards.showDeploymentNote ? (
                  <div className={`${cardClassName} bg-white p-6`}>
                    <h4 className="text-lg font-semibold text-[#111827]">Deployment Note</h4>
                    <p className="mt-4 text-sm leading-7 text-[#4b5563]">{project.deploymentNote}</p>
                  </div>
                ) : null}

                {rightColumnCards.showArchitecture ? (
                  <div className={`${cardClassName} bg-white p-6`}>
                    <h4 className="text-lg font-semibold text-[#111827]">Architecture</h4>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4b5563]">
                      {project.architecture?.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#111827]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {rightColumnCards.showApiNotes ? (
                  <div className={`${cardClassName} bg-white p-6`}>
                    <h4 className="text-lg font-semibold text-[#111827]">API Notes</h4>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4b5563]">
                      {project.apiNotes?.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#111827]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className={`${cardClassName} bg-white p-6`}>
                  <h4 className="text-lg font-semibold text-[#111827]">Links</h4>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {isAutomotiveProject
                      ? project.links?.map((link) => (
                          <PortfolioButton
                            key={`${link.href}-${link.label}`}
                            href={link.href}
                            variant="compactSecondary"
                            external={link.href !== "#"}
                            onClick={(event) => {
                              if (link.href === "#") {
                                event.preventDefault();
                                onShowToast("Link coming soon");
                              }
                            }}
                          >
                            <ExternalLinkIcon className="h-4 w-4" />
                            {link.label}
                          </PortfolioButton>
                        ))
                      : (
                        <>
                          {project.demo ? (
                            <PortfolioButton
                              href={project.demo}
                              variant="compact"
                              external={project.demo !== "#"}
                              onClick={(event) => {
                                if (project.demo === "#" && project.title !== "RevuMe") {
                                  event.preventDefault();
                                  onShowToast("Live Demo coming soon");
                                }
                              }}
                            >
                              <ExternalLinkIcon className="h-4 w-4" />
                              Live Demo
                              <ButtonArrow />
                            </PortfolioButton>
                          ) : null}

                          {project.github ? (
                            <PortfolioButton href={project.github} variant="compactSecondary" external>
                              <GithubIcon className="h-4 w-4" />
                              GitHub
                            </PortfolioButton>
                          ) : null}
                        </>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function PortfolioLandingPage() {
  const githubProfile = "https://github.com/KodyPrograms";
  const linkedinProfile = "https://www.linkedin.com/in/kody-voyles/";
  const emailAddress = "kody@voyles.dev";

  const headerRef = useRef<HTMLElement | null>(null);
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 2300);
  };

  const projects = useMemo<Project[]>(
    () => [
      {
        title: "IT Ticketing & Service Request System",
        subtitle: "Spring Boot / MySQL / SPA",
        description:
          "An internal support system built around the kind of workflow structure, auditability, and reporting I care about when software has to help real teams stay organized.",
        longDescription:
          "Ticketing Console is an internal IT ticketing and service request system I built as a practical proof of concept for real support work. The goal was not to make a flashy demo. The goal was to build something structured, traceable, and useful, with role-aware workflows, audit history, reporting, and the kind of backend patterns that make internal software easier to trust and maintain.",
        status: "Live Demo",
        github: "https://github.com/KodyPrograms/IT-Ticketing-System",
        demo: "https://primary-tandy-kody-776e28e5.koyeb.app/",
        stack: ["Java", "Spring Boot", "MySQL", "SPA"],
        role:
          "I designed the architecture and built the application around the parts of support software that matter most to me: clear workflow rules, audit logging, useful reporting, and backend structure that stays maintainable as the system grows.",
        focus:
          "Improving accountability, visibility, and day-to-day workflow for internal support operations.",
        highlights: [
          "Built around Requester, Engineer, and Admin role-aware workflows.",
          "Creates audit entries for important ticket changes such as status, priority, assignee, and comments.",
          "Includes reporting, JWT auth, and demo data support for both hosted and local review.",
        ],
        deploymentNote:
          "A hosted demo is available on Koyeb. Local setup is still supported if you want to inspect the full stack or seed additional test data.",
        localRun: [
          "Requires Java 21, Maven 3.8+, and Docker.",
          "Easy way: run start_local.sh after cloning the repo to start both backend and frontend flows together.",
          "The script starts MySQL in Docker and runs the Spring Boot app on http://localhost:8080.",
          "Manual setup: start MySQL in Docker, then run mvn spring-boot:run and open http://localhost:8080.",
          "If you want realistic profiles, tickets, comments, and audit trails, run scripts/seed_test_data.sql.",
        ],
        demoAccounts: [
          "All local demo users use the same password: admin123.",
          "Admin: admin / admin123",
          "Engineer: engineer / admin123",
          "Requester: requester / admin123",
        ],
        architecture: [
          "Browser SPA -> Spring Boot controller/service/repository layers -> MySQL with Flyway migrations.",
          "Controllers enforce role rules and expose the API.",
          "Services implement workflow rules and audit logging.",
          "Repositories use Spring Data JPA for persistence.",
          "Flyway manages schema migrations in src/main/resources/db/migration.",
        ],
        apiNotes: [
          "JWT auth is available through /api/auth/login and the token is then sent as a Bearer token for protected endpoints.",
          "Tickets API supports pagination, filters, search, status updates, and comments.",
          "Reports default to the last 30 days and include engineer summary, requester summary, backlog aging, SLA buckets, and dashboard endpoints.",
          "Admin user management endpoints support creating and listing users.",
        ],
      },
      {
        title: "RevuMe",
        subtitle: "React / Python / Open Source",
        description:
          "A personal full-stack project built to be simple, useful, and easy to live with, rather than overbuilt for the sake of it.",
        longDescription:
          "RevuMe is a private review application I built for my wife so she could keep track of what she thinks about places, food, movies, books, and just about anything else. It uses a one-to-five star rating system, runs as a full-stack project with React and Python, and stays intentionally straightforward. I like projects like this because they force you to build for actual use instead of just technical novelty.",
        status: "Live Project",
        github: "https://github.com/KodyPrograms/RevuMe",
        demo: "https://revumeapp.netlify.app/",
        stack: ["React", "Python", "Open Source", "Frontend / Backend"],
        role:
          "I built both the frontend and backend, with most of the effort going into usability, a clean personal workflow, and a stack that stays easy to understand and run.",
        focus:
          "Building a clean personal-use product with a simple workflow and a full-stack setup that stays approachable.",
        highlights: [
          "Lets users review places, food, movies, books, and more with one-to-five star ratings.",
          "Built with React on the frontend and Python on the backend, and is fully open source.",
          "Runs live on Netlify, Render, and Neon with a local start script for quick testing.",
        ],
        liveLinks: [
          { label: "Frontend", href: "https://revumeapp.netlify.app" },
          { label: "Backend", href: "https://revume-api.onrender.com" },
        ],
        deploymentNote:
          "The live app uses the free tiers of Netlify, Render, and Neon. The Render backend goes to sleep after about 15 minutes of no traffic, so visiting the backend URL first can help wake it up. In practice it usually takes around two to five minutes to come back online.",
        localRun: [
          "Easy way: run start_local.sh after cloning the repo to launch both frontend and backend together.",
          "Requires Node.js 20.19+ or 22.12+, plus Python 3.12+ with python3-venv available.",
          "The script launches the frontend on http://localhost:8000 and the backend on http://localhost:5173, then opens Chrome if available.",
          "Manual setup is also supported with a Python virtual environment for the backend and Vite for the frontend.",
        ],
      },
      {
        title: "Automotive Website & Marketing Work",
        subtitle: "PHP / JavaScript / SEO / Analytics",
        description:
          "Production work across dealership websites, reporting, internal tooling, and marketing performance where technical decisions had direct business impact.",
        longDescription:
          "This work reflects a large part of how I operate professionally: building and improving production systems where development, analytics, operations, and marketing all overlap. It includes dealership-facing pages, internal tools, reporting, vendor-facing work, performance improvements, and implementation details that affect both user experience and business outcomes.",
        status: "Production Work",
        demo: "#",
        stack: ["PHP", "JavaScript", "SEO", "Analytics", "Marketing Support"],
        role:
          "I handled development, implementation, optimization, reporting support, and problem-solving across dealership websites and related internal systems.",
        focus:
          "Supporting dealership marketing and website operations through production development, reporting, analytics, and performance work.",
        highlights: [
          "Delivered production website improvements with real business exposure.",
          "Worked across customer-facing pages, internal tooling, and analytics support.",
          "Focused on digital performance, usability, and marketing effectiveness.",
        ],
        links: [
          { label: "Service Coupons", href: "https://peddernissan.com/nissan-service-coupons" },
          { label: "Employee Listings", href: "https://temeculanissan.com/meet-the-team" },
          { label: "Intranet Example", href: "#" },
        ],
      },
      {
        title: "Vehicle Demand Forecasting App",
        subtitle: "Flask / Python / Forecasting",
        description:
          "A forecasting project centered on practical reporting output, light data analysis, and decision support rather than academic complexity for its own sake.",
        longDescription:
          "Automotive Inventory Predictor is a lightweight Flask application I built for my WGU Computer Science capstone. It forecasts next-month vehicle stock demand and surfaces buyer insights through a workflow built around CSV uploads, retraining, report generation, and local experimentation. It reflects the side of my work that leans into reporting, analysis, and building tools that help people make better decisions with data.",
        status: "Demo Project",
        github: "https://github.com/KodyPrograms/Automotive-Inventory-Predictor",
        stack: ["Python", "Flask", "Forecasting", "Data Analysis"],
        role:
          "I built the full application end to end, including data cleaning, model training flow, forecasting logic, file handling, and the Flask interface.",
        focus:
          "Turning raw data into a lightweight forecasting workflow that is easy to run and reason about.",
        highlights: [
          "Forecasts next-month sales for each vehicle model.",
          "Surfaces buyer insights such as average income and gender distribution.",
          "Supports CSV upload, retraining, report generation, and forecast download.",
        ],
        deploymentNote: "This is a local-only demo.",
        localRun: [
          "Requires Python 3.x and pip.",
          "Easy way: clone the repo, run python install.py, then start the app with python app.py.",
          "Manual setup: pip install flask pandas scikit-learn joblib, then run python app.py.",
          "Open http://127.0.0.1:5000 after startup.",
          "If you need to retrain from scratch, run python train.py to generate vehicle_stock_forecast_model.pkl.",
          "Use python clean_car_data.py to preprocess raw data into csv/cleaned_car_data.csv.",
        ],
        architecture: [
          "Browser served through Flask and Jinja templates.",
          "Python application flow handles data cleaning, model training, and prediction.",
          "CSV files are used for inputs, cleaned data, and generated forecast output.",
        ],
        apiNotes: [
          "Uploading a CSV from the home page cleans the file, retrains the model, and generates a forecast report.",
          "The trained model is loaded from vehicle_stock_forecast_model.pkl on startup.",
          "Sample files include csv/template.csv for expected columns, csv/car_data.csv as raw sample data, and csv/cleaned_car_data.csv as cleaned training data.",
        ],
      },
    ],
    []
  );

  const skills = [
    "PHP",
    "JavaScript",
    "Python",
    "React",
    "Spring Boot",
    "MySQL",
    "AWS",
    "Docker",
    "GitHub Actions",
    "API Integrations",
    "SEO",
    "Analytics",
    "LLM Automation",
  ];

  const navItems = useMemo(
    () => [
      { label: "About", href: "#about", id: "about" },
      { label: "Projects", href: "#projects", id: "projects" },
      { label: "Contact", href: "#contact", id: "contact" },
    ],
    []
  );

  useEffect(() => {
    const getHeaderOffset = () => (headerRef.current?.getBoundingClientRect().height ?? 0) + 24;

    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);

      const currentLine = window.scrollY + getHeaderOffset();
      let nextActiveSection = navItems[0]?.id ?? "about";

      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (!section) continue;

        if (currentLine >= section.offsetTop) {
          nextActiveSection = item.id;
        }
      }

      setActiveSection(nextActiveSection);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [navItems]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    const headerOffset = (headerRef.current?.getBoundingClientRect().height ?? 0) + 16;
    const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f7f4ee] text-[#111827]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),transparent_36%),radial-gradient(circle_at_top_right,rgba(226,232,240,0.55),transparent_28%)]" />

      <AnimatePresence>{toast ? <Toast message={toast} /> : null}</AnimatePresence>

      <header
        ref={headerRef}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-[#e8dfd5] bg-[#fbf8f3]/88 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.4)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => scrollToSection("#about")}
            className="text-left transition hover:opacity-80"
            aria-label="Jump to About section"
          >
            <span className="block text-lg font-semibold tracking-tight text-[#111827]">Kody Voyles</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activeSection === item.id
                    ? "bg-[#111827] text-white"
                    : "text-[#4b5563] hover:bg-white/80 hover:text-[#111827]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <PortfolioButton href={githubProfile} variant="secondary" external className="px-4 py-2.5">
              <GithubIcon className="h-4 w-4" />
              GitHub
            </PortfolioButton>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="inline-flex rounded-full border border-[#ddd3c8] bg-white/90 p-2 text-[#111827] shadow-sm md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="border-t border-[#e8dfd5] bg-[#fbf8f3]/95 px-5 py-4 backdrop-blur xl:hidden md:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.href)}
                    className="rounded-2xl px-4 py-3 text-left text-sm text-[#111827] transition hover:bg-white"
                  >
                    {item.label}
                  </button>
                ))}
                <PortfolioButton href={githubProfile} variant="secondary" external className="mt-2 w-full">
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </PortfolioButton>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="relative mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pb-24">
        <section className="grid gap-8 pb-18 pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative"
          >
            <SectionEyebrow>Full Stack Developer / IT / Marketing Technology</SectionEyebrow>
            <h1 className="mt-5 max-w-4xl text-[2.9rem] font-semibold tracking-[-0.05em] text-[#111827] sm:text-[4.15rem] sm:leading-[1.02]">
              I build internal tools, reporting systems, and practical software that help teams work smarter.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#4b5563] sm:text-lg">
              I am a full stack developer and IT professional focused on useful systems, automation, and
              data-driven work. Most of what I care about lives where development, reporting, infrastructure,
              and marketing technology overlap, especially when the result reduces friction and keeps teams
              less dependent on third-party tools.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <PortfolioButton type="button" onClick={() => scrollToSection("#projects")}>
                View Projects
                <ButtonArrow />
              </PortfolioButton>
              <PortfolioButton href={`mailto:${emailAddress}`} variant="secondary">
                <MailIcon className="h-4 w-4" />
                Email Me
              </PortfolioButton>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className={`${cardClassName} relative overflow-hidden p-5 sm:p-6`}
          >
            <div className="absolute inset-x-8 top-0 h-28 rounded-b-[2rem] bg-[linear-gradient(180deg,rgba(233,226,216,0.55),transparent)]" />
            <div className="relative rounded-[1.6rem] border border-[#ece2d7] bg-[#f3eee6] p-4">
              <div className="overflow-hidden rounded-[1.35rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),rgba(233,226,216,0.55))]">
                <img
                  src={heroImage}
                  alt="Portrait of Kody Voyles"
                  className="mx-auto aspect-[343/361] w-full max-w-[320px] object-cover"
                />
              </div>
            </div>

            <div className="relative mt-6">
              <h2 className="text-2xl font-semibold tracking-tight text-[#111827]">Kody Voyles</h2>
              <p className="mt-4 text-sm leading-7 text-[#4b5563]">
                I build software that connects technical execution with operational and business goals, from
                internal platforms and automation to reporting, analytics, and web performance work.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <PortfolioButton href={githubProfile} variant="secondary" external className="px-4 py-2.5">
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </PortfolioButton>
                <PortfolioButton href={linkedinProfile} variant="secondary" external className="px-4 py-2.5">
                  <LinkedInIcon className="h-4 w-4" />
                  LinkedIn
                </PortfolioButton>
              </div>
            </div>
          </motion.aside>
        </section>

        <section id="about" className="scroll-mt-28 grid gap-6 pt-4 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.article
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className={`${cardClassName} p-6 sm:p-8`}
          >
            <SectionEyebrow>About</SectionEyebrow>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-[#111827] sm:text-[2.2rem]">
              I like building things that are actually useful once the launch screenshot stops mattering.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#4b5563]">
              My background spans software development, IT operations, analytics, and marketing support. That
              mix changed how I think about software. I usually care less about building something flashy and
              more about building something that saves time, improves visibility, or makes a process easier to
              manage six months from now.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#4b5563]">
              The work I am best suited for sits where internal systems, reporting, automation, cloud
              deployment, and business context all meet. I like translating messy real-world needs into tools
              that are clean, maintainable, and worth keeping in house.
            </p>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className={`${cardClassName} p-6 sm:p-8`}
          >
            <SectionEyebrow>Core Skills</SectionEyebrow>
            <div className="mt-6 flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.28, delay: index * 0.04 }}
                  className="rounded-full border border-[#e4d9cd] bg-[#fbf8f2] px-4 py-2 text-sm font-medium text-[#374151]"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.aside>
        </section>

        <section id="projects" className="scroll-mt-28 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl"
          >
            <SectionEyebrow>Projects</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#111827] sm:text-[2.35rem]">
              Selected Work
            </h2>
            <p className="mt-5 text-base leading-8 text-[#4b5563]">
              These projects reflect the kind of work I want to keep doing: internal platforms, reporting,
              automation, production web work, and software that has to hold up under real operational needs.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => {
              const isAutomotiveProject = project.title === "Automotive Website & Marketing Work";

              return (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.42, delay: index * 0.05 }}
                  className={`${cardClassName} flex h-full flex-col p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_58px_-26px_rgba(15,23,42,0.22)] sm:p-7`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#6b7280]">{project.subtitle}</p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#111827]">
                        {project.title}
                      </h3>
                    </div>
                    <StatusPill>{project.status}</StatusPill>
                  </div>

                  <p className="mt-5 flex-1 text-base leading-8 text-[#4b5563]">{project.description}</p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {!isAutomotiveProject && project.demo ? (
                      <PortfolioButton
                        href={project.demo}
                        variant="compact"
                        external={project.demo !== "#"}
                        onClick={(event) => {
                          if (project.demo === "#" && project.title !== "RevuMe") {
                            event.preventDefault();
                            showToast("Live Demo coming soon");
                          }
                        }}
                      >
                        <ExternalLinkIcon className="h-4 w-4" />
                        Live Demo
                        <ButtonArrow />
                      </PortfolioButton>
                    ) : null}

                    <PortfolioButton type="button" variant="compactSecondary" onClick={() => setSelectedProject(project)}>
                      View Details
                    </PortfolioButton>

                    {!isAutomotiveProject && project.github ? (
                      <PortfolioButton href={project.github} variant="compactSecondary" external>
                        <GithubIcon className="h-4 w-4" />
                        GitHub
                      </PortfolioButton>
                    ) : null}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.42 }}
            className="overflow-hidden rounded-[2rem] bg-[#111827] px-6 py-10 text-white shadow-[0_30px_70px_-36px_rgba(17,24,39,0.65)] sm:px-8 sm:py-12"
          >
            <div className="max-w-3xl">
              <SectionEyebrow>Contact</SectionEyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-[2.35rem]">
                If the work involves useful systems, cleaner workflows, or better reporting, I am interested.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/75">
                I am especially interested in roles and projects where development is tied to operations,
                automation, analytics, internal tooling, or marketing technology. If that overlaps with what
                you are building, reach out.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <PortfolioButton href={`mailto:${emailAddress}`} variant="secondary">
                <MailIcon className="h-4 w-4" />
                {emailAddress}
              </PortfolioButton>
              <PortfolioButton href={linkedinProfile} variant="secondary" external>
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
              </PortfolioButton>
              <PortfolioButton href={githubProfile} variant="secondary" external>
                <GithubIcon className="h-4 w-4" />
                GitHub
              </PortfolioButton>
            </div>
          </motion.div>
        </section>
      </main>

      <DetailModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        onShowToast={showToast}
      />
    </div>
  );
}
