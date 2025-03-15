import login from "./Login.js"

export default function logout() {
    localStorage.removeItem("jwt")
    window.location.hash = "#login"
    login()
}