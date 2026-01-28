"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type PaymentStatus = "loading" | "success" | "failed" | "processing" | "error";

export default function PaymentStatusPage() {
  const searchParams = useSearchParams();

  const paymentIntent = searchParams.get("payment_intent");
  const checkoutSessionId = searchParams.get("checkout_session_id");
  const redirectStatus = searchParams.get("redirect_status");

  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/status`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentIntent,
              checkoutSessionId,
              redirectStatus,
            }),
          }
        );

        const data = await res.json();
        console.log("Payment status response:", data);
        if (!res.ok) {
          throw data.error || "Failed to verify payment";
        }

        setStatus(data.status); // success | failed | processing
        setMessage(data.message || "");
      } catch (err: any) {
        console.error(err);
        setStatus("error");
        setMessage(String(err));
      }
    };

    verifyPayment();
  }, [paymentIntent, checkoutSessionId, redirectStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-300 to-pink-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        {status === "loading" && <h2 className="text-xl font-semibold">Checking payment status...</h2>}

        {status === "success" && (
          <>
            <h2 className="text-2xl font-bold text-green-600">Payment Successful ✅</h2>
            <p className="text-gray-600 mt-3">{message}</p>
          </>
        )}

        {status === "processing" && (
          <>
            <h2 className="text-2xl font-bold text-yellow-600">Payment Processing ⏳</h2>
            <p className="text-gray-600 mt-3">{message}</p>
          </>
        )}

        {status === "failed" && (
          <>
            <h2 className="text-2xl font-bold text-red-600">Payment Failed ❌</h2>
            <p className="text-gray-600 mt-3">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
            <p className="text-gray-600 mt-3">{message}</p>
          </>
        )}
      </div>
    </div>
  );
}
