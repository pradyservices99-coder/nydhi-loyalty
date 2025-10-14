// app/routes/api.points.js
export async function action({ request }) {
  try {
    const body = await request.json();
    const { amount, tag } = body;

    // simple loyalty logic
    const multiplier = tag === "premium" ? 5 : tag === "basic" ? 1 : 3;
    const earned = amount * multiplier;

    return new Response(JSON.stringify({ earned }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API error:", err);
    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}
