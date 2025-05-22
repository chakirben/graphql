import div from "../utils/div.js"
export default function CreateXpCard(data) {
    let xpAmount = Math.round(data.xpTransactions.aggregate.sum.amount/1000)
        let projectName =  data.transaction[data.transaction.length-1].path.split("/")
        projectName = projectName[projectName.length-1]
        let projectName2 =  data.transaction[data.transaction.length-2].path.split("/")
        projectName2 = projectName2[projectName2.length-1]
        let projectAmount = data.transaction[data.transaction.length-1].amount/1000
        let projectAmount2 = data.transaction[data.transaction.length-2].amount/1000
        return div("xpCard").add(
            div("texts").add(
                div("smalltext" , "xp amount") ,  div("Bigtext", xpAmount+"kb")
            ) , 
            div("ProjectWithxp").add(
                div("Name" , projectName) ,  div("xp" , "+"+ Math.round(projectAmount) +" kb")
            ),
            div("ProjectWithxp").add(
                div("Name" , projectName2) ,  div("xp" ,  "+"+ Math.round(projectAmount2) + " kb")
            )
        )
}