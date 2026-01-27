import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-500 via-pink-300 to-pink-200 font-sans px-4">

      {/* Title */}
      <h1 className="mb-2 text-4xl font-serif text-black">
        Stripe Payment Gateway
      </h1>

      {/* Subtitle */}
      <p className="mb-10 text-lg text-black/80 text-center">
        Stripe supports the following payment methods
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-12">

        {/* UI Elements - Disabled */}
        <div className="group relative rounded-2xl bg-white p-6 shadow-lg text-center opacity-60 cursor-not-allowed">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">UI Elements</h2>
          <p className="text-gray-600 mb-4">
            Custom Stripe Payment Element integration
          </p>
          <button disabled className="rounded-lg bg-gray-400 px-5 py-2 text-white">
            Coming Soon
          </button>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-black/60 opacity-0 group-hover:opacity-100 transition">
            <span className="text-white font-semibold text-lg">
              Integration in progress
            </span>
          </div>
        </div>

        {/* Checkout - Enabled */}
        <div className="rounded-2xl bg-white p-6 shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Checkout</h2>
          <p className="text-gray-600 mb-4">
            Stripe hosted checkout page flow
          </p>
          <Link href="/checkout/create">
            <button className="rounded-lg bg-purple-600 px-5 py-2 text-white hover:bg-purple-700 transition">
              Open
            </button>
          </Link>
        </div>

        {/* Pay by Link - Disabled */}
        <div className="group relative rounded-2xl bg-white p-6 shadow-lg text-center opacity-60 cursor-not-allowed">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Pay by Link</h2>
          <p className="text-gray-600 mb-4">
            Generate and share Stripe payment links
          </p>
          <button disabled className="rounded-lg bg-gray-400 px-5 py-2 text-white">
            Coming Soon
          </button>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-black/60 opacity-0 group-hover:opacity-100 transition">
            <span className="text-white font-semibold text-lg">
              Integration in progress
            </span>
          </div>
        </div>
      </div>

      {/* 📧 Contact Section */}
      <div className="rounded-2xl bg-white/90 p-6 shadow-lg text-center max-w-xl">
        <h3 className="text-xl font-semibold mb-2 text-black">
          Want to integrate another Payment Gateway?
        </h3>
        <p className="text-gray-700 mb-4">
          Or want to enable more Stripe supported payment methods?
        </p>
        <a
          href="mailto:payments@yourcompany.com?subject=Payment%20Gateway%20Integration%20Request"
          className="inline-block rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800 transition"
        >
          Contact Payments Team
        </a>
      </div>

    </div>
  );
}
