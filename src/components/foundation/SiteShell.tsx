'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { ArrowUpRight, ChevronDown, Languages, Menu, Moon, Sun, X } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n';
import { appUrl, getAppLink } from '@/lib/config';
import styles from './SiteShell.module.css';

type GlassProps = { children: ReactNode; className?: string };
type ButtonProps = GlassProps & {
  href?: string;
  variant?: 'primary' | 'secondary' | 'quiet';
  onClick?: () => void;
  type?: 'button' | 'submit';
};

export function GlassCard({ children, className = '' }: GlassProps) {
  return <div className={`glass-card ${className}`}>{children}</div>;
}

export function GlassButton({
  children,
  href,
  variant = 'secondary',
  onClick,
  type = 'button',
}: ButtonProps) {
  const className = `button button-${variant}`;
  if (href)
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export function GlassFeatureCard({ children, className = '' }: GlassProps) {
  return <GlassCard className={`feature-card ${className}`}>{children}</GlassCard>;
}

export function GlassPricingCard({ children, className = '' }: GlassProps) {
  return <GlassCard className={`pricing-card ${className}`}>{children}</GlassCard>;
}

export function GlassTooltip({ children, label, className = '' }: GlassProps & { label: string }) {
  return (
    <span className={`tooltip-wrap ${className}`}>
      <span className="tooltip-label">{label}</span>
      {children}
    </span>
  );
}

export function GlassMenu({ children, className = '' }: GlassProps) {
  return <div className={`glass-menu ${className}`}>{children}</div>;
}

export function GlassModal({
  children,
  open,
  onClose,
  label,
  closeLabel,
}: GlassProps & { open: boolean; onClose: () => void; label: string; closeLabel?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  return (
    <dialog ref={dialogRef} className="glass-modal" aria-label={label} onClose={onClose}>
      <button
        className="modal-close"
        type="button"
        aria-label={closeLabel ?? 'Close dialog'}
        onClick={onClose}
      >
        <X size={18} />
      </button>
      {children}
    </dialog>
  );
}

const themeEvent = 'smartbau-theme-change';
let memoryTheme: 'dark' | 'light' = 'dark';

function getStoredTheme(): 'dark' | 'light' {
  try {
    const stored = window.localStorage.getItem('smartbau-theme');
    if (stored === 'light' || stored === 'dark') memoryTheme = stored;
    else memoryTheme = 'dark';
  } catch {
    // Keep the current tab's choice when storage is blocked.
  }
  return memoryTheme;
}

function subscribeTheme(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(themeEvent, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(themeEvent, onChange);
  };
}

function saveTheme(theme: 'dark' | 'light') {
  memoryTheme = theme;
  try {
    window.localStorage.setItem('smartbau-theme', theme);
  } catch {
    /* Keep the in-memory selection when browser storage is unavailable. */
  }
  window.dispatchEvent(new Event(themeEvent));
}

export function ThemeToggle({ label }: { label: string }) {
  const theme = useSyncExternalStore(subscribeTheme, getStoredTheme, () => 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return (
    <button
      className="icon-button"
      type="button"
      aria-label={label}
      title={label}
      onClick={() => saveTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <Sun size={17} aria-hidden="true" />
      ) : (
        <Moon size={17} aria-hidden="true" />
      )}
    </button>
  );
}

export function LanguageToggle({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const nextLocale = locale === 'en' ? 'de' : 'en';
  const destination = pathname?.replace(/^\/(en|de)(?=\/|$)/, `/${nextLocale}`) || `/${nextLocale}`;
  return (
    <Link
      className="icon-button language-button"
      href={destination}
      aria-label={`${label}: ${locale === 'en' ? 'Deutsch' : 'English'}`}
      title={label}
    >
      <Languages size={17} aria-hidden="true" />
      <span>{locale.toUpperCase()}</span>
    </Link>
  );
}

export function MobileMenu({
  children,
  label,
  closeLabel,
}: GlassProps & { label: string; closeLabel: string }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    panel.current?.querySelector<HTMLElement>('a')?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  return (
    <>
      <button
        ref={trigger}
        className="icon-button mobile-menu-trigger"
        type="button"
        aria-label={open ? closeLabel : label}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <div
        ref={panel}
        id="mobile-navigation"
        className={`mobile-menu ${open ? 'is-open' : ''}`}
        hidden={!open}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest('a')) setOpen(false);
        }}
      >
        {children}
      </div>
    </>
  );
}

export function GlassNavbar({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  const launchUrl = appUrl;
  const launchHref = getAppLink(locale);
  const navLinks = t.navigation.map(([title, slug]) => ({
    title,
    href: `/${locale}/${slug}`,
    active: pathname === `/${locale}/${slug}`,
  }));
  const links = (
    <>
      {navLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`nav-link ${item.active ? 'is-active' : ''}`}
          aria-current={item.active ? 'page' : undefined}
        >
          {item.title}
        </Link>
      ))}
      <Link href={`/${locale}/updates`} className="nav-link">
        {locale === 'de' ? 'Neuigkeiten' : 'Updates'}
      </Link>
    </>
  );
  return (
    <header className="site-header">
      <div className="navbar glass-surface">
        <Link
          href={`/${locale}`}
          className="brand"
          aria-label={locale === 'de' ? 'SmartBau Startseite' : 'SmartBau home'}
        >
          <span className="brand-mark">
            S<span>.</span>
          </span>
          <span className="brand-name">SmartBau</span>
        </Link>
        <nav
          className="desktop-navigation"
          aria-label={locale === 'de' ? 'Hauptnavigation' : 'Main navigation'}
        >
          {links}
        </nav>
        <div className="nav-actions">
          <LanguageToggle locale={locale} label={t.language} />
          <ThemeToggle label={t.theme} />
          <Link className="nav-signin" href={`/${locale}/account`}>
            {t.signIn}
          </Link>
          <Link
            className="button button-primary nav-cta"
            href={launchHref}
            target={launchUrl ? '_blank' : undefined}
            rel={launchUrl ? 'noreferrer' : undefined}
          >
            {t.launch}
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <MobileMenu label={t.menu} closeLabel={t.close}>
            {links}
            <Link className="nav-link mobile-sign-in" href={`/${locale}/account`}>
              {t.signIn}
              <ChevronDown size={14} />
            </Link>
            <Link
              className="button button-primary"
              href={launchHref}
              target={launchUrl ? '_blank' : undefined}
              rel={launchUrl ? 'noreferrer' : undefined}
            >
              {t.launch}
              <ArrowUpRight size={15} />
            </Link>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}

type FooterLink = { label: string; path: string };

function FooterGroup({
  title,
  links,
  locale,
}: {
  title: string;
  links: FooterLink[];
  locale: Locale;
}) {
  return (
    <nav className={styles.footerGroup} aria-label={title}>
      <h2 className={styles.footerGroupTitle}>{title}</h2>
      <ul className={styles.footerLinkList}>
        {links.map(({ label, path }) => (
          <li key={path}>
            <Link href={`/${locale}/${path}`}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function GlassFooter({ locale }: { locale: Locale }) {
  const isGerman = locale === 'de';
  const explore: FooterLink[] = [
    { label: isGerman ? 'Funktionen' : 'Features', path: 'features' },
    { label: isGerman ? 'Preise' : 'Pricing', path: 'pricing' },
    { label: 'Showcase', path: 'showcase' },
    { label: isGerman ? 'Neuigkeiten' : 'Updates', path: 'updates' },
    { label: isGerman ? 'Roadmap' : 'Roadmap', path: 'roadmap' },
  ];
  const resources: FooterLink[] = [
    { label: isGerman ? 'Hilfe' : 'Help center', path: 'help' },
    { label: isGerman ? 'Newsletter' : 'Newsletter', path: 'newsletter' },
    { label: isGerman ? 'Partner' : 'Partners', path: 'partners' },
    { label: 'Plugins', path: 'plugins' },
    { label: isGerman ? 'Konto' : 'Account', path: 'account' },
  ];
  const legal: FooterLink[] = [
    { label: isGerman ? 'Datenschutz' : 'Privacy', path: 'legal/privacy' },
    { label: isGerman ? 'Nutzungsbedingungen' : 'Terms', path: 'legal/terms' },
    { label: isGerman ? 'Impressum' : 'Imprint', path: 'legal/imprint' },
  ];
  return (
    <footer className="site-footer">
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <Link
            href={`/${locale}`}
            className="brand"
            aria-label={isGerman ? 'SmartBau Startseite' : 'SmartBau home'}
          >
            <span className="brand-mark">
              S<span>.</span>
            </span>
            <span className="brand-name">SmartBau</span>
          </Link>
          <p>{getDictionary(locale).footer}</p>
        </div>
        <FooterGroup title={isGerman ? 'Entdecken' : 'Explore'} links={explore} locale={locale} />
        <FooterGroup
          title={isGerman ? 'Ressourcen' : 'Resources'}
          links={resources}
          locale={locale}
        />
        <FooterGroup title={isGerman ? 'Rechtliches' : 'Legal'} links={legal} locale={locale} />
        <div className={styles.footerBottom}>
          <span className={styles.footerCopy}>© {new Date().getFullYear()} SmartBau</span>
          <LanguageToggle locale={locale} label={getDictionary(locale).language} />
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ children, locale }: { children: ReactNode; locale: Locale }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        {locale === 'de' ? 'Zum Inhalt springen' : 'Skip to content'}
      </a>
      <GlassNavbar locale={locale} />
      <main id="main-content">{children}</main>
      <GlassFooter locale={locale} />
    </>
  );
}
