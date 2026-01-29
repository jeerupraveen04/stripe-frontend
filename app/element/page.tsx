"use client";

import { useState } from "react";
import CheckoutForm from "@/public/components/element/CheckoutForm";
import { stripePromise } from "@/public/lib/stripe";
import { Elements } from "@stripe/react-stripe-js";
import PaymentHeader from "@/public/components/common/PaymentHeader";

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
        <div className="min-h-screen font-sans antialiased">
            <PaymentHeader name="Stripe Element" />

            {/* Main */}
            <main className="max-w-4xl mx-auto p-6 md:p-12 flex flex-col items-center gap-10">
                {/* 🔧 Controls Card */}
                <div className="w-full max-w-lg bg-white/60 backdrop-blur-md rounded-3xl shadow-xl shadow-indigo-100/50 border border-white p-8 transition-all hover:shadow-2xl hover:shadow-indigo-200/40">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">
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
                    </div>
                </div>
            </main>
        </div>
    );
}