"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  ChartNoAxesCombined,
  GraduationCap,
  NotebookTabs,
  Settings,
  Shapes,
  LibraryBig,
  LogOut,
  ChevronRight,
  Menu,
  X,
  MessageSquareWarning,
} from "lucide-react";
import { useState } from "react";
import { authClient } from "@/auth/client";
const nav = [
  { href: "/today", label: "Today", de: "Heute", icon: CalendarDays },
  { href: "/course", label: "My course", de: "Mein Kurs", icon: BookOpen },
  { href: "/practice", label: "Practice", de: "Üben", icon: Shapes },
  { href: "/exam", label: "DTB C1 lab", de: "DTB C1", icon: GraduationCap },
  {
    href: "/progress",
    label: "Progress",
    de: "Fortschritt",
    icon: ChartNoAxesCombined,
  },
];
const resources = [
  { href: "/reference", label: "Grammar & articles", icon: LibraryBig },
  { href: "/vocabulary", label: "Vocabulary", icon: NotebookTabs },
  { href: "/errors", label: "My corrections", icon: MessageSquareWarning },
];
export default function Shell({
  children,
  name,
  language,
}: {
  children: React.ReactNode;
  name: string;
  language: "en" | "de";
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const current = [
    ...nav,
    ...resources,
    { href: "/settings", label: "Settings" },
    { href: "/onboarding", label: "Your learning profile" },
    { href: "/diagnostic", label: "Starting point" },
  ].find((n) => pathname.startsWith(n.href));
  const links = (items: typeof resources) =>
    items.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setMenu(false)}
        className={`nav-link ${pathname.startsWith(item.href) ? "active" : ""}`}
      >
        <item.icon size={19} />
        {language === "de" && "de" in item ? String(item.de) : item.label}
      </Link>
    ));
  return (
    <div className="workspace">
      <a className="skip-link" href="#main-content">
        Skip to learning
      </a>
      <aside className="sidebar">
        <Link href="/today" className="brand">
          <span className="brand-mark">D</span>
          <span>
            Deutsch.<small>YOUR LEARNING COMPANION</small>
          </span>
        </Link>
        <div className="nav-label">Your learning space</div>
        <nav aria-label="Primary">{links(nav)}</nav>
        <div className="nav-label" style={{ marginTop: 30 }}>
          Always within reach
        </div>
        <nav aria-label="Resources">{links(resources)}</nav>
        <div className="sidebar-bottom">
          <Link href="/settings" className="nav-link">
            <Settings size={19} />
            Settings
          </Link>
          <button
            className="nav-link"
            style={{ border: 0, background: "none", width: "100%" }}
            onClick={async () => {
              await authClient.signOut();
              router.push("/login");
              router.refresh();
            }}
          >
            <LogOut size={19} />
            Sign out
          </button>
        </div>
      </aside>
      <div style={{ minWidth: 0 }}>
        <header className="topbar">
          <div className="breadcrumb">
            <span>Learning space</span>
            <ChevronRight size={14} />
            <span style={{ color: "var(--ink)" }}>
              {pathname.startsWith("/learn/")
                ? "Lesson"
                : current?.label || "Learning"}
            </span>
          </div>
          <div className="row">
            <Link className="small muted" href="/reference">
              Quick reference
            </Link>
            <span className="avatar" aria-label={name}>
              {name.slice(0, 2).toUpperCase()}
            </span>
            <button
              className="button ghost mobile-menu"
              aria-label="Open resources"
              onClick={() => setMenu(!menu)}
            >
              <Menu size={19} />
            </button>
          </div>
        </header>
        {menu && (
          <div
            role="dialog"
            aria-label="Resources"
            className="card"
            style={{
              position: "fixed",
              right: 14,
              top: 65,
              zIndex: 50,
              boxShadow: "0 12px 45px #0002",
            }}
          >
            <button
              className="button ghost"
              aria-label="Close menu"
              onClick={() => setMenu(false)}
            >
              <X size={18} />
            </button>
            {links(resources)}
            <Link
              className="nav-link"
              href="/settings"
              onClick={() => setMenu(false)}
            >
              Settings
            </Link>
          </div>
        )}
        <main className="content" id="main-content">
          {children}
        </main>
      </div>
      <nav className="mobile-nav" aria-label="Mobile primary">
        {nav.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={pathname.startsWith(item.href) ? "active" : ""}
          >
            <item.icon size={21} />
            <span>
              {language === "de"
                ? item.de
                : item.label.replace("My ", "").replace("DTB C1 lab", "Exam")}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
