"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type StatusResponse = {
  success: boolean;
  status: string;
  amount: number;
  currency: string;
  customerEmail: string;
  sessionId: string;
};

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<StatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("Missing session_id");
      setLoading(false);
      return;
    }

    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/status/${sessionId}`
        );
        const json = await res.json();

        if (!res.ok) throw new Error(json.error || "Failed to fetch status");

        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [sessionId]);

  if (loading) return <p className="p-10 text-center">Checking payment status...</p>;
  if (error) return <p className="p-10 text-center text-red-600">{error}</p>;

  const isPaid = data?.status === "paid";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-green-200 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">
          {isPaid ? "Payment Successful ✅" : "Payment Not Completed ⚠️"}
        </h1>

        <div className="text-gray-700 space-y-2">
          <p><b>Status:</b> {data?.status}</p>
          <p>
            <b>Amount:</b> {(data!.amount / 100).toFixed(2)}{" "}
            {data?.currency?.toUpperCase()}
          </p>
          <p><b>Email:</b> {data?.customerEmail}</p>
          <p className="text-xs break-all text-gray-400">
            Session ID: {data?.sessionId}
          </p>
        </div>

        <a
          href="/checkout/create"
          className="inline-block mt-6 rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 transition"
        >
          Make Another Payment
        </a>
      </div>
    </div>
  );
}
