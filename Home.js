import div from "./utils/div.js"
import button from "./utils/button.js"
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
                        email
                    }
                }
            `})
    })
    let data =  await resp.json()
    console.log(data);
    
    const lastName=data.data.user[0].lastName
    const mail=data.data.user[0].email
    let profileCard=  div("profileCard").add(
        div("welcoming").add(
            div("hello","👋 Welcome," + lastName),
            div("mail",mail)
        ),
        button("logout")
    )
    document.body.append(profileCard)

}