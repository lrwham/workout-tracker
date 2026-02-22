import { Link } from "react-router-dom";
import type { Theme } from "../types";
import ThemeToggle from "./ThemeToggle";
import type { ReactNode } from "react";

type TopBarProps = {
  pageTitle: string;
  email: string;
  theme: Theme;
  onToggleTheme: () => void;
  onLogout: () => void;
  actionButton?: ReactNode;
};

export default function TopBar({
  pageTitle,
  email,
  theme,
  onToggleTheme,
  onLogout,
  actionButton,
}: TopBarProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          {pageTitle}
        </h1>
        <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-0.5">
          Welcome, {email}
        </p>
      </div>

      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-3">
          <Link
            to="/account"
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            Manage Account
          </Link>
          {actionButton}
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            onClick={onLogout}
            className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}