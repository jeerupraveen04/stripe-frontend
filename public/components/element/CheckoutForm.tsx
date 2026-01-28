"use client";

import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm({
    amount,
    currency,
}: {
    amount: number;
    currency: string;
}) {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePay = async () => {
        if (!stripe || !elements) return;

        setLoading(true);
        setError(null);

        try {
            // 1️⃣ Validate Stripe UI
            const { error: submitError } = await elements.submit();
            if (submitError) throw submitError.message;

            // 2️⃣ Create PaymentIntent on backend
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/create`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        type: "payment_intent",
                        amount,
                        currency,
                    }),
                }
            );

            const data = await res.json();

            if (!data.clientSecret) {
                throw "Client secret missing from backend";
            }

            // 3️⃣ Confirm payment
            const { error: paymentError } = await stripe.confirmPayment({
                elements,
                clientSecret: data.clientSecret,
                confirmParams: {
                    return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/status`,
                },
            });

            if (paymentError) {
                throw paymentError.message;
            }

        } catch (err: any) {
            console.error(err);
            setError(String(err));
        }

        setLoading(false);
    };

    return (
        <div className="space-y-6">
            {/* ✅ This renders full Stripe UI: Card, iDEAL, SEPA, etc */}
            <div className="border rounded-xl p-4">
                <PaymentElement />
            </div>

            {error && (
                <p className="text-red-600 text-sm">{error}</p>
            )}

            <button
                disabled={!stripe || loading}
                onClick={handlePay}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition disabled:opacity-50"
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </div>
    );
}
