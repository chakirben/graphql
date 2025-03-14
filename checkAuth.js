export default async function checkAuth() {
    let token = localStorage.getItem("jwt")
    // check JWT existance
    if (!token) {
        return false
    }
    let resp = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            query: `
                {
                    user {
                        lastName
                    }
                }
            `})
    })
    //  check JWT validity
    let data = await resp.json()
    if (data.errors) {
        return false
    }
    return true
}