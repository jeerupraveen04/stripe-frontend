"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type CheckoutForm = {
  fullName: string;
  email: string;
  amount: number;
  currency: string;
  description: string;
  country: string;
  type?: string;
  paymentmethodType: string;
};

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const onSubmit = async (data: CheckoutForm) => {
    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(Number(data.amount) * 100),
          currency: data.currency,
          customerEmail: data.email,
          customerCountry: data.country,
          paymentMethod: data.paymentmethodType,
          type:'checkout',
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.checkoutUrl) {
        throw new Error(result.error || "Failed to create checkout");
      }

      // ✅ Redirect to Stripe Checkout
      globalThis.location.href = result.checkoutUrl;
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-300 to-pink-200 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-semibold text-center mb-2 text-gray-800">
          Stripe Checkout
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Enter customer and payment details
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName-input"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Full Name
            </label>
            <input
              id="fullName-input"
              {...register("fullName", { required: true })}
              className="w-full rounded-lg border px-4 py-2 text-black"

            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email-input"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Email
            </label>
            <input
              id="email-input"
              type="email"
              {...register("email", { required: true })}
              className="w-full rounded-lg border px-4 py-2 text-black"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <label
              htmlFor="paymentmethod-select"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Payment Method
            </label>
            <select
              id="paymentmethod-select"
              {...register("paymentmethodType", { required: true })}
              className="w-full rounded-lg border px-4 py-2 text-black"
            >
              <option value="checkout">Checkout</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="amount-input"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Amount
            </label>
            <input
              id="amount-input"
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
            <label
              htmlFor="currency-select"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Currency
            </label>
            <select
              id="currency-select"
              {...register("currency", { required: true })}
              className="w-full rounded-lg border px-4 py-2 text-black"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
              <option value="JPY">JPY</option>
              <option value="MXN">MXN</option>
            </select>
          </div>

          {/* Country Select */}
          <div>
            <label
              htmlFor="country-select"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Country
            </label>
            <select
              id="country-select"
              {...register("country", { required: true })}
              className="w-full rounded-lg border px-4 py-2 text-black"
            >
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>

              <option value="IE">Ireland (EU)</option>
              <option value="DE">Germany (EU)</option>
              <option value="FR">France (EU)</option>
              <option value="NL">Netherlands (EU)</option>
              <option value="SE">Sweden (EU)</option>

              <option value="JP">Japan</option>
              <option value="MX">Mexico</option>
              <option value="IN">India</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description-input"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description-input"
              {...register("description")}
              className="w-full rounded-lg border px-4 py-2 text-black"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-lg bg-purple-600 py-3 text-white font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? "Redirecting..." : "Proceed to Stripe Checkout"}
          </button>
        </form>
      </div>
    </div>
  );
}
