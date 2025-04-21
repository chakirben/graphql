import getUserLogin from "./getUserlogin.js";

export default async function fetchData() {
    let token = localStorage.getItem("jwt")
    let userLogin = await  getUserLogin(token)

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
                            login
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
                                auditorLogin: { _eq: "${userLogin}" }, 
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
    return data
}