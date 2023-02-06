import fetch from "node-fetch";
import express from "express";
const app = express();

export const getBlogs = async () => {
	const query = `
	query GetUserArticles {
		user(username: "nodeG") {
			publication {
				posts {
					title
					brief
					slug
					coverImage
				}
			}
		}
	}
`;
	try {
		const data = await fetch("https://api.hashnode.com", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: query,
				variables: {
					now: new Date().toISOString(),
				},
			}),
		})
			.then((res) => res.json())
			.then((result) => {
				return result.data.user.publication;
			});
		// console.log(data);
		return data;
	} catch (error) {
		console.log(`Error Querying BlogPosts!`, error);
	}
};

app.get("/", (req, res) => {
	const posts = getBlogs();
	console.log(posts);
	res.send({
		status: 200,
		data: posts,
	});
});

// PORT Connection
const PORT = 5000;
app.listen(PORT, () => {
	console.log(
		`\n🤝 🤝 [SERVER:]  Listening on port: http://127.0.0.1:${PORT}/ 🤝 🤝 `,
	);
});
