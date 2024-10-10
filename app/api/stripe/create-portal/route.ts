import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    console.error("No userId found, unauthorized");
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    // Check if user already has a subscription
    const userSubscription = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.userId, userId),
    });

    let customer;
    if (userSubscription) {
      customer = {
        id: userSubscription.stripeCustomerId,
      };
      console.log("Customer found with ID:", customer.id);
    } else {
      // If no subscription, create a new Stripe customer
      console.log("No existing subscription, creating a new Stripe customer");
      const customerData: { metadata: { dbId: string } } = {
        metadata: { dbId: userId },
      };

      const response = await stripe.customers.create(customerData);
      customer = { id: response.id };

      // Store customer ID in the database
      await db.insert(subscriptions).values({
        userId,
        stripeCustomerId: customer.id,
      });
      console.log("New customer created with ID:", customer.id);
    }

    if (!customer?.id) {
      console.error("Customer ID is missing");
      return new Response(
        JSON.stringify({ error: "Failed to get a customer Id" }),
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    console.log("Creating Stripe billing portal session...");
    const url = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${baseUrl}/payments`,
    });

    if (url) {
      console.log("Billing portal session created successfully:", url);
      return new Response(JSON.stringify({ url }), {
        status: 200,
      });
    } else {
      console.error("Failed to create billing portal session");
      return new Response(
        JSON.stringify({ error: "Failed to create billing portal" }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in creating portal session:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create portal session" }),
      { status: 500 }
    );
  }
}
