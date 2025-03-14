export default async function home () {
    let token =  localStorage.getItem("jwt")
    document.body.innerHTML = ""
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
    let data =  await resp.json()
    document.body.textContent =data.data.user[0].lastName
    console.log( );
    
}