import div from "../utils/div.js";
import rect from "../utils/rect.js";

export default async function auditGraph(auditRatio , done , received) {
   
    let auditRatioCard = div("audiRatioCard").add(
        div("texts").add(
        div("smalltext" , "audit Ratio" ),
        div("Bigtext" , auditRatio)),
        div("graphTexts").add(
            div("texts").add(
                div("xp" , "done" ) ,  div("name" ,  done+" kb")
            ),
            div("texts").add(
                div("xp" , "received" ) ,  div("name" ,  received + " kb")
            )
        )
    )
    document.body.querySelector(".cardsContainer").append(auditRatioCard)
    console.log(document.body.querySelector('.cardsContainer'));
    
    let svg =  document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("height" , "40px")
    let total =  done+received
    let donLen = done/total*200
    let recLen = received/total*200
    let rectan = rect(0 , 0 , donLen , 40 ,10,10 ,"#0066FF")
    let rectan2 = rect(donLen , 0 , recLen , 40 ,10,10 ,"#BDC9DC")
    svg.append(rectan,rectan2)
    auditRatioCard.append(svg)
}