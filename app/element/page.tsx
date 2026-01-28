"use client";

import { useState } from "react";
import CheckoutForm from "@/public/components/element/CheckoutForm";
import { stripePromise } from "@/public/lib/stripe";
import { Elements } from "@stripe/react-stripe-js";

export default function CheckoutPage() {
    const [amount, setAmount] = useState(1000); // in smallest unit
    const [currency, setCurrency] = useState("usd");
    const [elementsKey, setElementsKey] = useState(0); // force remount

    const handleUpdate = () => {
        if (amount < 50) {
            alert("Minimum amount is 0.50");
            return;
        }
        setElementsKey((k) => k + 1);
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-purple-100 to-pink-100 font-sans antialiased">
            {/* Header */}
            <header className="w-full bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-indigo-200 shadow-lg">
                            <span className="text-white font-black text-xs">S</span>
                        </div>
                        <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                            Stripe Pay
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">Secure Payment</span>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-4xl mx-auto p-6 md:p-12 flex flex-col items-center gap-10">

                {/* 🔧 Controls Card */}
                <div className="w-full max-w-lg bg-white/60 backdrop-blur-md rounded-3xl shadow-xl shadow-indigo-100/50 border border-white p-8 transition-all hover:shadow-2xl hover:shadow-indigo-200/40">
                    <h2 className="text-sm font-bold text-indigo-900/40 uppercase tracking-widest mb-6">
                        Payment Configuration
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
                        {/* Amount */}
                        <div className="sm:col-span-5 flex flex-col">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                Amount : 1* 1000 = {currency.toUpperCase()} 10.00
                            </label>
                            <input
                                type="number"
                                min={50}
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="h-[52px] w-full border-gray-200 border bg-white/50 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium text-gray-800"
                                placeholder="1000"
                            />
                        </div>

                        {/* Currency */}
                        <div className="sm:col-span-4 flex flex-col">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                Currency
                            </label>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="h-[52px] w-full border-gray-200 border bg-white/50 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-gray-800 appearance-none cursor-pointer"
                            >
                                <option value="usd">USD</option>
                                <option value="eur">EUR</option>
                                <option value="gbp">GBP</option>
                                <option value="aed">AED</option>
                            </select>
                        </div>

                        {/* Update Button */}
                        <div className="sm:col-span-3 flex flex-col">
                            <label className="block text-xs font-bold text-transparent select-none mb-2">
                                Action
                            </label>
                            <button
                                onClick={handleUpdate}
                                className="h-[52px] w-full bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-gray-200"
                            >
                                Update
                            </button>
                        </div>
                    </div>

                </div>

                {/* 💳 Payment Card */}
                <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 overflow-hidden relative">
                    <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full" />

                    <div className="px-10 py-10">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                                Complete Payment
                            </h2>
                            <p className="text-gray-500 mt-2 text-sm font-medium">
                                Enter your card details to proceed
                            </p>
                        </div>

                        <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 ring-1 ring-inset ring-slate-500/5">
                            <Elements
                                key={elementsKey}
                                stripe={stripePromise}
                                options={{
                                    mode: "payment",
                                    amount: amount,
                                    currency: currency,
                                    appearance: {
                                        theme: "stripe",
                                        variables: {
                                            colorPrimary: '#4f46e5',
                                            borderRadius: '12px',
                                        }
                                    },
                                }}
                            >
                                <CheckoutForm amount={amount} currency={currency} />
                            </Elements>
                        </div>

                        <div className="mt-8 flex justify-center items-center gap-4 opacity-40 grayscale">
                            <div className="h-6 w-10 bg-gray-200 rounded" />
                            <div className="h-6 w-10 bg-gray-200 rounded" />
                            <div className="h-6 w-10 bg-gray-200 rounded" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}