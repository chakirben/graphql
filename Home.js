import div from "./utils/div.js"
import copyCode from "./utils/copyCode.js"
import drawProgressGraph from "./graphs/progressGraph.js"
import auditGraph from "./graphs/auditGraph.js"
import fetchData from "./utils/fetchData.js"
import CreateProfileCard from "./graphs/profileCard.js"
import CreateXpCard from "./graphs/xpCard.js"
import CreateActiveAuditsCard from "./graphs/activeAudits.js"
export default async function home() {
    document.body.innerHTML = ""
    let data = await fetchData()
    data = data.data
    let profileCard = CreateProfileCard(data)
    let xp = CreateXpCard(data)
    let Active = !!data.audit.length
    console.log(data);
    let activeAudits
    if (Active) {
        
        activeAudits = CreateActiveAuditsCard(data)
    }
    document.body.append(profileCard)
    let d = data.transaction
    if (Active) {
        document.querySelector(".copyButton").addEventListener("click", () => { copyCode() })
    }
    let cardsContainer =  div("cardsContainer").add(xp , Active? activeAudits : "")
    document.body.append(cardsContainer)
    drawProgressGraph(d)
    let done = Math.round(data.upTransactions.aggregate.sum.amount / 1000)
    let received = Math.round(data.downTransactions.aggregate.sum.amount / 1000)
    let auditRatio = Math.round(data.user[0].auditRatio * 10) / 10
    console.log(auditRatio);
    auditGraph(auditRatio, done, received)
}