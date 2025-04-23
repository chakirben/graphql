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
    let activeAudits = CreateActiveAuditsCard(data, Active)
    document.body.append(profileCard)
    let d = data.transaction
    let done = Math.round(data.upTransactions.aggregate.sum.amount / 1000)
    let received = Math.round(data.downTransactions.aggregate.sum.amount / 1000)
    let auditRatio = Math.round(data.user[0].auditRatio * 10) / 10
    let cardsContainer = div("cardsContainer")
    document.body.append(cardsContainer)
    auditGraph(auditRatio, done, received)
    cardsContainer.add(xp,  activeAudits )
    drawProgressGraph(d)
}