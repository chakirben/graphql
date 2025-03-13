import login from "./Login.js"
import home from "./Home.js"
let token = localStorage.getItem("jwt")
if (!token) {
    console.log("not loggeds");
    login()
}else {
    console.log("logged");
    home()
}