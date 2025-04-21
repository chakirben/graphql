export default async function getUserLogin(token) {
    let daa = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
                    {
                        user {
                            login
                        }
                    }
                `
        })
    });
    let dataName = await daa.json()
    return dataName.data.user[0].login
}