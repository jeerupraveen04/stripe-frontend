"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Page Not Found
      </h1>

      <p className="text-gray-500 mb-6">
        Sorry bro, the page you are looking for does not exist.
      </p>

      <button
        onClick={() => router.push("/")}
        className="rounded-lg bg-purple-600 px-6 py-3 text-white font-semibold hover:bg-purple-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
}
