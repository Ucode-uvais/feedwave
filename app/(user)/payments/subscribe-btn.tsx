"use client";
import { Button } from "@/components/ui/button";
import { getStripe } from "@/lib/stripe-client";
import { Loader2 } from "lucide-react";
import { useState } from "react";

type Props = {
  price: string;
};

const SubscribeBtn = ({ price }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Keep this if you plan to use it

  const handleCheckout = async (price: string) => {
    setLoading(true);
    try {
      const { sessionId } = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      }).then((res) => res.json());

      const stripe = await getStripe();
      if (stripe) {
        stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while processing the payment"); // Using setError here
    }
    setLoading(false);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Button
      onClick={() => handleCheckout(price)}
      disabled={loading}
      className="bg-indigo-800"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </>
      ) : (
        "Subscribe"
      )}
    </Button>
  );
};

export default SubscribeBtn;
