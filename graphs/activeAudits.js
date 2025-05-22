import copyCode from "../utils/copyCode.js"
import div from "../utils/div.js"

export default function CreateActiveAuditsCard(data ,  active) {
    if ( !active) {
        return div("auditCard active" ,  "No active audits currently")
    }
    let userLogin =data.audit[0].group.captainLogin
    let auditProject = data.audit[0].group.path.split("/")
    auditProject = auditProject[auditProject.length - 1]
    let auditCode = data.audit[0].private.code
    let N = data.audit.length
    console.log(userLogin, auditProject, auditCode);
    let activeAudits
    let copy = document.createElement("img")
    copy.src = "/images/copy.svg"
    let bbttn = div("copyButton").add(
        copy, div("copy", "copy")
    )
    bbttn.onclick =  ()=>{copyCode()}
    // if (Active) {
    //     document.querySelector(".copyButton").addEventListener("click", () => { copyCode() })
    // }
    return div("auditCard").add(
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
            bbttn
        )
    );
}