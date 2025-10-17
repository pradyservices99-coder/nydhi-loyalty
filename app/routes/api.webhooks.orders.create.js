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
      console.warn("⚠️ No customer email found in order payload.");
      return new Response("OK", { status: 200 });
    }

    // 🧠 Calculate points (example: 1 point per $1 spent)
    const points = Math.floor(parseFloat(order.total_price || 0));

    // 🧱 Prevent duplicate inserts (Shopify may resend webhooks)
    const existing = await prisma.customerPoints.findFirst({
      where: { orderId: order.id.toString() },
    });

    if (existing) {
      console.log(`⚠️ Order ${order.id} already processed. Skipping duplicate.`);
      return new Response("OK", { status: 200 });
    }

    // 💾 Insert new record
    await prisma.customerPoints.create({
      data: {
        orderId: order.id.toString(),
        customerEmail,
        points,
      },
    });

    console.log(`⭐ Added ${points} points for ${customerEmail} (Order ${order.id})`);

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};

// Handle non-POST requests
export const loader = async () =>
  new Response("Method Not Allowed", { status: 405 });
