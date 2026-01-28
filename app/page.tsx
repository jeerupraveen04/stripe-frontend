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
        <div className="group relative rounded-2xl bg-white p-6 shadow-lg text-center ">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">UI Elements</h2>
          <p className="text-gray-600 mb-4 tex-gray-600">
            Custom Stripe Payment Element integration
          </p>
          <Link href="/element">
            <button className="rounded-lg bg-purple-600 px-5 py-2 text-white hover:bg-purple-700 transition">
              Open
            </button>
          </Link>
        </div>

        {/* Checkout - Enabled */}
        <div className="rounded-2xl bg-white p-6 shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Checkout</h2>
          <p className="text-gray-600 mb-4">
            Stripe hosted checkout page flow
          </p>
          <Link href="/checkout">
            <button className="rounded-lg bg-purple-600 px-5 py-2 text-white hover:bg-purple-700 transition">
              Open
            </button>
          </Link>
        </div>

        {/* Pay by Link - Disabled */}
        <div className="group relative rounded-2xl bg-white p-6 shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Pay by Link</h2>
          <p className="text-gray-600 mb-4">
            Generate and share Stripe payment links
          </p>
          <Link href="/payment-link">
            <button className="rounded-lg bg-purple-600 px-5 py-2 text-white hover:bg-purple-700 transition">
              Open
            </button>
          </Link>
        </div>
      </div>

      {/* 📧 Contact Section */}
      <div className="w-full max-w-lg mt-12 mb-10 mx-auto rounded-[2rem] bg-white/60 backdrop-blur-md p-8 border border-white shadow-xl shadow-indigo-100/30 text-center transition-all hover:shadow-2xl hover:shadow-indigo-200/40">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 mb-4 text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>

        <h3 className="text-xl font-black mb-3 text-gray-900 tracking-tight leading-tight">
          Want to integrate another <br /> Payment Gateway?
        </h3>

        <p className="text-gray-500 font-medium text-sm mb-8 leading-relaxed px-4">
          Or want to enable more Stripe supported payment methods?
          Get in touch with me directly.
        </p>

        <div className="flex flex-col items-center gap-2">
          {/* Label for the Email */}
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-1">Developer Contact</span>

          <div className="group relative inline-flex items-center gap-3 rounded-2xl bg-gray-900 px-8 py-4 text-white shadow-xl transition-all hover:bg-black hover:-translate-y-1 active:scale-95 duration-300">
            <span className="font-mono text-sm font-medium tracking-tight">
              praveenjeeru68@gmail.com
            </span>

            {/* Subtle Gradient Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
          </div>
        </div>
      </div>

    </div>
  );
}
