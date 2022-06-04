import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const action = async ({request}) => {
	const secret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;
	const sig = request.headers.get("stripe-signature");
	let event;
	const payload = await request.text();

	try {
		event = stripe.webhooks.constructEvent(payload, sig, secret);
	} catch (err) {
		return new Response(err.message, {
			status: 400,
		});
	}

	if (event.type === "payment_intent.succeeded") {
		const paymentIntent = event.data.object;
		console.log("💰 payment success!");
	}

	return {};
};
