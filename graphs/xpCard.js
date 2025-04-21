import button from "../utils/button.js"
import div from "../utils/div.js"
export default function CreateXpCard(data) {
    let xpAmount = Math.round(data.xpTransactions.aggregate.sum.amount/1000)
        let projectName =  data.transaction[0].path.split("/")
        projectName = projectName[projectName.length-1]
        let projectName2 =  data.transaction[1].path.split("/")
        projectName2 = projectName2[projectName2.length-1]
        let projectAmount = data.transaction[0].amount/1000
        let projectAmount2 = data.transaction[1].amount/1000
        return div("xpCard").add(
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
}