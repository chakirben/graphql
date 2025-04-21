import logout from "../logout.js"
import button from "../utils/button.js"
import div from "../utils/div.js"
export default function CreateProfileCard(data) {
    const lastName = data.user[0].lastName
    const mail = data.user[0].email
    return div("profileCard").add(
        div("welcoming").add(
            div("hello", "👋 Welcome," + lastName),
            div("mail", mail)
        ),
        button("logout", logout)
    )
}