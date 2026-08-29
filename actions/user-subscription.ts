"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import db from "@/db/drizzle";
import { getUserSubscription } from "@/db/queries";
import { userSubscription } from "@/db/schema";
import { auth, currentUser } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const returnUrl = absoluteUrl("/shop");

export const createStripeUrl = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) throw new Error("Unauthorized.");

  // If Stripe key is dummy/missing, toggle Pro directly for instant local testing
  if (
    !process.env.STRIPE_API_SECRET_KEY ||
    process.env.STRIPE_API_SECRET_KEY.includes("XXXXXXXX")
  ) {
    const existing = await getUserSubscription();

    if (existing?.isActive) {
      return { data: "/shop" };
    }

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);

    if (existing) {
      await db
        .update(userSubscription)
        .set({
          stripePriceId: "price_mock_pro",
          stripeCurrentPeriodEnd: futureDate,
        })
        .where(eq(userSubscription.userId, userId));
    } else {
      await db.insert(userSubscription).values({
        userId,
        stripeCustomerId: `cus_guest_${Date.now()}`,
        stripeSubscriptionId: `sub_guest_${Date.now()}`,
        stripePriceId: "price_mock_pro",
        stripeCurrentPeriodEnd: futureDate,
      });
    }

    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");

    return { data: "/shop" };
  }

  const existingSubscription = await getUserSubscription();

  // redirect user to customer portal who already have a subscription
  if (existingSubscription && existingSubscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: existingSubscription.stripeCustomerId,
      return_url: returnUrl,
    });

    return { data: stripeSession.url };
  }

  // checkout
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: user.emailAddresses[0].emailAddress,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: "Lingo Pro",
            description: "Unlimited hearts.",
          },
          unit_amount: 2000, // $20.00 USD
          recurring: {
            interval: "month",
          },
        },
      },
    ],
    metadata: {
      userId,
    },
    success_url: returnUrl,
    cancel_url: returnUrl,
  });

  return { data: stripeSession.url };
};

