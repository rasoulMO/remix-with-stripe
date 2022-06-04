import {Outlet, useLoaderData} from "@remix-run/react";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {createPaymentIntent} from "~/payments";

const stripePromise = loadStripe(
	"pk_test_51KN01CAwnfLNLyoUOZPKv0T71VZlbGkYG0bEhtqi6R1aQ16ghz0Y6HgTr6IhYykC3ONcwGCB1oPs45qD2foVNYKO00nvyKlIrK"
);

export const loader = async () => {
	return await createPaymentIntent();
};

export default function Payments() {
	const paymentIntent = useLoaderData();
	const options = {
		// passing the client secret obtained from the server
		clientSecret: paymentIntent.client_secret,
	};

	return (
		<div style={{padding: "20px"}}>
			<Elements stripe={stripePromise} options={options}>
				<Outlet />
			</Elements>
		</div>
	);
}
