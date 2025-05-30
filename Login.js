import input from "./utils/input.js"
import button from "./utils/button.js"
import div from "./utils/div.js"
import { routIt } from "./main.js"
export default function login() {
    document.body.innerHTML=""
    let logo = document.createElement("img")
    logo.src = "./images/logo.png"
    let name = input("name", "name")
    let pass = input("password", "password")
    let errorPlace = div("errorPlace")
    let btn = button("login", async function () {
        if (!name.value.length || !pass.value.length) {
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
            routIt()
        } else {
            errorPlace.textContent = "Invalid Credentials"
            console.log("didn't login");
        }
    })
    let login  =  div("login").add(
        div("tocenter").add(
            div("texts" ,).add(
                div("Bigtext" , "Login") , div("smalltext", "and let's see if you're a real talent")
            ),
            div("form").add(
                name, pass , errorPlace , btn
            ) , 
            logo
        )
    )
    document.body.append(login)
}