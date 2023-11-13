export async function getAPIToken(
	user: string | undefined,
	password: string | undefined,
) {
	const res = await fetch(process.env.DB_HOST + "/api/user/token/", {
		headers: {
			Authorization:
				"Basic " + Buffer.from(user + ":" + password).toString("base64"),
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch token");
	}

	const data = await res.json();
	return data.token;
}
