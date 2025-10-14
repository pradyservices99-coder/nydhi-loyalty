import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const action = async ({ request }) => {
  try {
    const body = await request.text();
    const order = JSON.parse(body);

    console.log("✅ Webhook received (ORDERS_CREATE)");
    console.log("Order ID:", order.id);
    console.log("Customer:", order?.email || order?.customer?.email);
    console.log("Total Price:", order.total_price);

    const customerEmail = order?.email || order?.customer?.email;
    if (!customerEmail) {
      console.warn("⚠️  No customer email found in order.");
      return new Response("OK", { status: 200 });
    }

    // Calculate points (example: 1 point per $1 spent)
    const points = Math.floor(parseFloat(order.total_price || 0));

    await prisma.customerPoints.create({
      data: {
        orderId: order.id.toString(),
        customerEmail,
        points,
      },
    });

    console.log(`⭐ Added ${points} points for ${customerEmail}`);

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const loader = async () =>
  new Response("Method Not Allowed", { status: 405 });
