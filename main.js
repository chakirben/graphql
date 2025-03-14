import login from "./Login.js"
import home from "./Home.js"
let token = localStorage.getItem("jwt")

if (token) {
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
    let data = await resp.json()
    if (data.errors) {
        login()
    }
    console.log(resp.ok);
}

if (!token) {
    console.log("not loggeds");
    login()
}else {
    console.log("logged");
    home()
}
