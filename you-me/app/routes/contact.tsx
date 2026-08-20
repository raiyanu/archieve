import { Outlet } from "@remix-run/react";

export default function contactRoute() {
	return (
		<div>
			<h1>Contact</h1>
			<Outlet />
		</div>
	);
}
