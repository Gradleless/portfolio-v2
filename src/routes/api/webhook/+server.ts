import { json } from '@sveltejs/kit';
import { DISCORD_WEBHOOK_URL } from '$env/static/private';
import { requestIp } from '../../../hooks.server.js';
const rateLimit = new Map();

export async function POST({ request }) {
	const { name, email, message } = await request.json();

	const now = Date.now();
	const limit = 60000;
	const requests = rateLimit.get(requestIp) || [];

	const recentRequests = requests.filter((timestamp: number) => now - timestamp < limit);
	rateLimit.set(requestIp, recentRequests);

	if (recentRequests.length >= 2) {
		return json({ success: false, message: 'Rate limit exceeded' }, { status: 429 });
	}

	recentRequests.push(now);
	const payload = {
		embeds: [
			{
				title: 'Nouveau message depuis le portfolio',
				color: 0x8aa3ff,
				fields: [
					{ name: 'Nom', value: name },
					{ name: 'Email', value: email },
					{ name: 'Message', value: message }
				]
			}
		]
	};

	const res = await fetch(DISCORD_WEBHOOK_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});

	if (res.ok) {
		return json({ success: true }, { status: 200 });
	} else {
		return json({ success: false }, { status: 500 });
	}
}
