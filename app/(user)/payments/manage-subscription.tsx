"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ManageSubscription = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    setError(null); // Reset error

    try {
      const response = await fetch("/api/stripe/create-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create customer portal");
      }

      const { url } = await response.json();

      if (!url) {
        throw new Error("No URL returned from API");
      }

      router.push(url.url);
    } catch (error) {
      console.error("Error redirecting to customer portal:", error);
      setError("Failed to redirect to the portal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <Button
      onClick={redirectToCustomerPortal}
      className="bg-indigo-700"
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </>
      ) : (
        "Modify Your Subscription"
      )}
    </Button>
  );
};

export default ManageSubscription;
