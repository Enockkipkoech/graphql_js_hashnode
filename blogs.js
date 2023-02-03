import fetch from "node-fetch";

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

export const getBlogs = async (query) => {
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
		console.log(data);
		return data;
	} catch (error) {
		console.log(`Error Querying BlogPosts!`, error);
	}
};

getBlogs(query);
