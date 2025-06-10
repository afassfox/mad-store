"use server";

import { CartItem } from "@/store/cart-store";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export const checkoutAction = async (formData: FormData): Promise<void> => {
  const itemsJson = formData.get("items");
  const items = JSON.parse(itemsJson as string);
  const line_items = items.map((item: CartItem) => ({
    price_data: {
      currency: "EGP",
      product_data: {
        name: item.name,
      },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
  });
  redirect(session.url!);
};
