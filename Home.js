import div from "./utils/div.js"
import button from "./utils/button.js"
import logout from "./logout.js"
export default async function home() {
    let token = localStorage.getItem("jwt")
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
                     transaction_aggregate(where: { type: { _eq: "xp" }, eventId: { _eq: 41 } }) {
                        aggregate {
                            sum {
                                amount
                            }
                        }
                    }
                    transaction(where : {type : {_eq : "xp"} , eventId : {_eq  :41}}, order_by : {createdAt : desc , } , limit:2) {
                            path
                            amount
                    }
                    audit (where : {auditorLogin :{_eq:"cbenlafk"} ,endAt : {_gt : ${Date.now().toString()}} , closureType : {_is_null :true}}){
                            private {
                            code
                            }
                            group {
                            captainLogin
                            }
                        }
                }
            `})
    })
    let data = await resp.json()
    console.log(data);
    const lastName = data.data.user[0].lastName
    const mail = data.data.user[0].email
    let profileCard = div("profileCard").add(
        div("welcoming").add(
            div("hello", "👋 Welcome," + lastName),
            div("mail", mail)
        ),
        button("logout", logout)
    )
    let xpAmount = Math.round(data.data.transaction_aggregate.aggregate.sum.amount/1000)
    let projectName =  data.data.transaction[0].path.split("/")
    projectName = projectName[projectName.length-1]
    let projectName2 =  data.data.transaction[1].path.split("/")
    projectName2 = projectName2[projectName2.length-1]
    let projectAmount = data.data.transaction[0].amount/1000
    let projectAmount2 = data.data.transaction[1].amount/1000
    let Xp =  div("xpCard").add(
        div("texts").add(
            div("smalltext" , "xp amount") ,  div("Bigtext", xpAmount+"kb")
        ) , 
        div("ProjectWithxp").add(
            div("Name" , projectName) ,  div("xp" , "+"+ projectAmount)
        ),
        div("ProjectWithxp").add(
            div("Name" , projectName2) ,  div("xp" ,  "+"+ projectAmount2)
        )
    )

    document.body.append(profileCard , Xp)

}