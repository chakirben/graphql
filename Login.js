import input from "./utils/input.js"
import button from "./utils/button.js"
import div from "./utils/div.js"
import home from "./Home.js"
export default function login() {
    let name = input("name", "name")
    let pass = input("password", "password")
    let errorPlace = div("errorPlace")
    let btn = button("login", async function () {
        if (!name.value.length || !pass.value.length) {
            console.log("skd");
            errorPlace.textContent = "please enter  both name and passwors"
        }
        let info = `${name.value}:${pass.value}`
        let encriptedInfo = btoa(info)
        let resp = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
            method: "POST",
            headers: {
                "Authorization": `Basic ${encriptedInfo}`,
            }
        })
        if (resp.ok) {
            let data = await resp.json()
            localStorage.setItem("jwt", data)
            home()
        } else {
            console.log("not");
        }
    })
    document.body.append(name, pass, errorPlace, btn)
}