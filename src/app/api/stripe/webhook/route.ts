import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const POST = async (req: Request) => {

  if(!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("Stripe secret key is not set");
  }

  const signature = req.headers.get("stripe-signature");

  if(!signature) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
  });
  
  const event = stripe.webhooks.constructEvent(
    body, 
    signature, 
    process.env.STRIPE_WEBHOOK_SECRET
  );


  switch(event.type) {
    case "invoice.paid": {
      if(!event.data.object.id) {
        throw new Error("Invoice ID is required");
      }    

      const { customer } = event.data.object as unknown as {
        customer: string;
      }

      const { subscription_details } = event.data.object.parent as unknown as {
        subscription: string;
        subscription_details: {
          metadata: {
            userId: string;
          };
          subscription:string
        };
      }

      const subscription = subscription_details.subscription;

      if(!subscription) {
        throw new Error("Subscription not found");
      }

      const userId = subscription_details.metadata.userId;

      if(!userId) {
        throw new Error("User ID is required");
      }

      await db.update(usersTable).set({
        stripeSubscriptionId: subscription,
        stripeCustomerId: customer as string,
        plan: "essential",
      }).where(eq(usersTable.id, userId));

      break;
    }
      case 'customer.subscription.deleted': {
        const subscription = await stripe.subscriptions.retrieve(event.data.object.id);

        if(!subscription) {
          throw new Error("Subscription not found");
        }

        const userId = subscription.metadata.userId;

        if(!userId) {
          throw new Error("User ID is required");
        }

        await db.update(usersTable).set({
          stripeSubscriptionId: null,
          stripeCustomerId: null,
          plan: null,
        }).where(eq(usersTable.id, userId));

        break;
      }
      
    default:
      console.log("Unhandled event type", event.type);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}