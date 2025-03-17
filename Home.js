import div from "./utils/div.js"
import button from "./utils/button.js"
import logout from "./logout.js"
import copyCode from "./copyCode.js"
import drawProgressGraph from "./progressGraph.js"
import auditGraph from "./auditGraph.js"
export default async function home() {
    let token = localStorage.getItem("jwt")
    document.body.innerHTML = ""
    let resp = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
                {
                    user {
                        lastName 
                        email
                        auditRatio
                    }
                    xpTransactions : transaction_aggregate(where: { type: { _eq: "xp" }, eventId: { _eq: 41 } }) {
                        aggregate {
                            sum {
                                amount
                            }
                        }
                    }
                        upTransactions : transaction_aggregate(where: { type: { _eq: "up" }, eventId: { _eq: 41 } }) {
                        aggregate {
                            sum {
                                amount
                            }
                        }
                    }
                        downTransactions : transaction_aggregate(where: { type: { _eq: "down" }, eventId: { _eq: 41 } }) {
                        aggregate {
                            sum {
                                amount
                            }
                        }
                    }
                    transaction (where : {type : {_eq : "xp"} ,
                        eventId : {_eq  :41}},
                        order_by : {createdAt : asc}
                        ){
                        path
                        amount
                    }
                    audit(
                        where: { 
                            auditorLogin: { _eq: "cbenlafk" }, 
                            endAt: { _gt: "${new Date().toISOString()}" }, 
                            closureType: { _is_null: true } 
                        }
                    ) {
                        private {
                            code
                        }
                        group {
                            captainLogin
                            path
                        }
                    }
                }
            `
        })
    });
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
    let xpAmount = Math.round(data.data.xpTransactions.aggregate.sum.amount/1000)
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
    let Active = !!data.data.audit.length
    if (Active) {
        let userLogin =  data.data.audit[0].group.captainLogin
        let auditProject =  data.data.audit[0].group.path.split("/")
        auditProject = auditProject[auditProject.length-1]
        let auditCode = data.data.audit[0].private.code
        let N = data.data.audit.length
        console.log(userLogin, auditProject , auditCode);
        let activeAudits 
        let copy = document.createElement("img")
        copy.src = "./copy.svg"
        activeAudits = div("auditCard").add(
            div("header").add(
                div("title", "Audits"),
                div("active", `${N} Active`)
            ),
            div("textsContainer").add(
                div("texts left").add(
                    div("xp", "Project"),
                    div("name", auditProject),
                ),
                div("texts left").add(
                    div("xp", "User"),
                    div("name", userLogin)
                )
            ),
            div("codeSection").add(
                div("code", `${auditCode}`),
                div("copyButton").add(
                    copy, div("copy" , "copy")
                )
            )
        );
        
    }
    document.body.append(profileCard , Xp , Active?activeAudits : "")
    let d = data.data.transaction
    if (Active){
        document.querySelector(".copyButton").addEventListener("click" , ()=> {copyCode()})
    }
    drawProgressGraph(d)
    let done = Math.round(data.data.upTransactions.aggregate.sum.amount/1000) 
    let received = Math.round(data.data.downTransactions.aggregate.sum.amount/1000)
    let auditRatio =  Math.round(data.data.user[0].auditRatio*10)/10
    console.log(auditRatio);
    
    auditGraph(auditRatio , done ,  received)
}