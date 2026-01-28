"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type PaymentLinkForm = {
  title: string;
  description: string;
  amount: number;
  currency: string;
  email?: string;
};

export default function PaymentLinkPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentLinkForm>();

  const onSubmit = async (data: PaymentLinkForm) => {
    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "payment_link",
          customerEmail: data.email,
          title: data.title,
          description: data.description,
          amount: Math.round(Number(data.amount) * 100),
          currency: data.currency,
        }),
      });

      const result = await res.json();
      console.log("Payment Link Result:", result);
      if (!res.ok || !result.paymentLinkUrl) {
        throw new Error(result.error || "Failed to create payment link");
      }

      // ✅ Redirect to Stripe Payment Link
      window.location.href = result.paymentLinkUrl;
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-400 to-pink-300 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-semibold text-center mb-2 text-gray-800">
          Create Payment Link
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Generate a Stripe Payment Link instantly
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Product / Payment Title
            </label>
            <input
              {...register("title", { required: true })}
              className="w-full rounded-lg border px-4 py-2 text-black"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">Title is required</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              className="w-full rounded-lg border px-4 py-2 text-black"
            />
          </div>

          {/* Custom Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Customer Email ()
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full rounded-lg border px-4 py-2 text-black"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Amount
            </label>
            <input
              type="number"
              {...register("amount", { required: true, min: 1 })}
              className="w-full rounded-lg border px-4 py-2 text-black"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">Valid amount required</p>
            )}
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Currency
            </label>
            <select
              {...register("currency", { required: true })}
              className="w-full rounded-lg border px-4 py-2 text-black"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
              <option value="JPY">JPY</option>
            </select>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Creating Link..." : "Create Payment Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
