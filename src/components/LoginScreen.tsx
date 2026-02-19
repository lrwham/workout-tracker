import { useState } from "react";

type LoginScreenProps = {
  onLogin: (token: string, email: string) => void;
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/token`, {
        method: "POST",
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      if (!res.ok) {
        setError("Invalid email or password.");
        return;
      }

      const data = await res.json();
      onLogin(data.access_token, email);
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 font-sans flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <h1 className="text-2xl font-bold text-neutral-900 mb-6">
          Workout Tracker
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-base text-neutral-500">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              required
              className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-base
                         focus:outline-none focus:ring-2 focus:ring-neutral-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-base text-neutral-500">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              required
              className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-base
                         focus:outline-none focus:ring-2 focus:ring-neutral-400"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-blue-600 text-white py-2 text-lg font-semibold
                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400
                       disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}