"use client";
import { UiText, UiLanguage } from "@/components/ui-language";
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
        aria-current={pathname.startsWith(item.href) ? "page" : undefined}
        className={`nav-link ${pathname.startsWith(item.href) ? "active" : ""}`}
      >
        <item.icon size={19} />
        {language === "de" && "de" in item ? (
          String(item.de)
        ) : (
          <UiText>{item.label}</UiText>
        )}
      </Link>
    ));
  return (
    <UiLanguage language={language}>
      <div className="workspace" lang={language}>
        <a className="skip-link" href="#main-content">
          {" "}
          <UiText>{"Skip to learning"}</UiText>{" "}
        </a>
        <aside className="sidebar">
          <Link href="/today" className="brand">
            <span className="brand-mark">D</span>
            <span>
              Deutsch.
              <small>
                <UiText>{"YOUR LEARNING COMPANION"}</UiText>
              </small>
            </span>
          </Link>
          <div className="nav-label">
            <UiText>{"Your learning space"}</UiText>
          </div>
          <nav aria-label={language === "de" ? "Hauptnavigation" : "Primary"}>
            {links(nav)}
          </nav>
          <div className="nav-label" style={{ marginTop: 30 }}>
            {" "}
            <UiText>{"Always within reach"}</UiText>{" "}
          </div>
          <nav aria-label={language === "de" ? "Ressourcen" : "Resources"}>
            {links(resources)}
          </nav>
          <div className="sidebar-bottom">
            <Link href="/settings" className="nav-link">
              <Settings size={19} /> <UiText>{"Settings"}</UiText>{" "}
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
              <LogOut size={19} /> <UiText>{"Sign out"}</UiText>{" "}
            </button>
          </div>
        </aside>
        <div style={{ minWidth: 0 }}>
          <header className="topbar">
            <div className="breadcrumb">
              <span>
                <UiText>{"Learning space"}</UiText>
              </span>
              <ChevronRight size={14} />
              <span style={{ color: "var(--ink)" }}>
                {pathname.startsWith("/learn/") ? (
                  <UiText>{"Lesson"}</UiText>
                ) : (
                  <UiText>{current?.label || "Learning"}</UiText>
                )}
              </span>
            </div>
            <div className="row">
              <Link className="small muted" href="/reference">
                {" "}
                <UiText>{"Quick reference"}</UiText>{" "}
              </Link>
              <span className="avatar" aria-label={name}>
                {name.slice(0, 2).toUpperCase()}
              </span>
              <button
                className="button ghost mobile-menu"
                aria-label={
                  language === "de" ? "Ressourcen öffnen" : "Open resources"
                }
                aria-expanded={menu}
                aria-controls="resource-menu"
                onClick={() => setMenu(!menu)}
              >
                <Menu size={19} />
              </button>
            </div>
          </header>
          {menu && (
            <div
              id="resource-menu"
              role="region"
              aria-label={language === "de" ? "Ressourcen" : "Resources"}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setMenu(false);
                  document
                    .querySelector<HTMLButtonElement>(
                      '[aria-controls="resource-menu"]',
                    )
                    ?.focus();
                }
              }}
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
                aria-label={language === "de" ? "Menü schließen" : "Close menu"}
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
                {" "}
                <UiText>{"Settings"}</UiText>{" "}
              </Link>
            </div>
          )}
          <main className="content" id="main-content">
            {children}
          </main>
        </div>
        <nav
          className="mobile-nav"
          aria-label={
            language === "de" ? "Mobile Hauptnavigation" : "Mobile primary"
          }
        >
          {nav.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
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
    </UiLanguage>
  );
}
