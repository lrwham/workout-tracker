import { useState } from "react";
import type { Theme } from "../types";
import TopBar from "./TopBar";

type AccountScreenProps = {
  token: string;
  email: string;
  onLogout: () => void;
  theme: Theme;
  onToggleTheme: () => void;
};

export default function AccountScreen({
  token,
  email,
  onLogout,
  theme,
  onToggleTheme,
}: AccountScreenProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (!oldPassword || !newPassword) {
      setError("All fields are required.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/account/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || "Failed to change password.");
        return;
      }

      setSuccess("Password updated successfully.");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 font-sans">
      <div className="max-w-md mx-auto px-4 py-6">
        <TopBar
          pageTitle="Manage Account"
          email={email}
          theme={theme}
          onToggleTheme={onToggleTheme}
          onLogout={onLogout}
          actionButton={
            <button
              onClick={() => window.history.back()}
              className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
              Back
            </button>
          }
        />

        <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Change Password
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="old-password"
                className="text-sm text-neutral-500 dark:text-neutral-400"
              >
                Current Password
              </label>
              <input
                id="old-password"
                type="password"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                  setError(null);
                  setSuccess(null);
                }}
                required
                className="rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700
                           text-neutral-900 dark:text-neutral-100 px-2 py-1 text-base
                           focus:outline-none focus:ring-2 focus:ring-neutral-400"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="new-password"
                className="text-sm text-neutral-500 dark:text-neutral-400"
              >
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError(null);
                  setSuccess(null);
                }}
                required
                className="rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700
                           text-neutral-900 dark:text-neutral-100 px-2 py-1 text-base
                           focus:outline-none focus:ring-2 focus:ring-neutral-400"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="confirm-password"
                className="text-sm text-neutral-500 dark:text-neutral-400"
              >
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError(null);
                  setSuccess(null);
                }}
                required
                className="rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700
                           text-neutral-900 dark:text-neutral-100 px-2 py-1 text-base
                           focus:outline-none focus:ring-2 focus:ring-neutral-400"
              />
            </div>

            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            {success && <p className="text-sm text-green-600 dark:text-green-400">{success}</p>}

            <button
              type="submit"
              disabled={isSaving}
              className="rounded-md bg-blue-600 text-white dark:text-neutral-100 py-2 text-base font-semibold
                         hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400
                         disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isSaving ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}