import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ce4257] px-5 py-8 text-center text-white">
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-6">
        <h1 className="text-3xl sm:text-4xl font-semibold">
          What year would you like to go to?
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            to="/2025"
            className="rounded-xl border-2 border-black bg-white/10 px-8 py-4 text-xl font-semibold hover:bg-white/20"
          >
            2025
          </Link>

          <Link
            to="/2026"
            className="rounded-xl border-2 border-black bg-white/10 px-8 py-4 text-xl font-semibold hover:bg-white/20"
          >
            2026
          </Link>
        </div>
      </div>
    </div>
  );
}
