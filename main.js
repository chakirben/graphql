import login from "./Login.js"
import home from "./Home.js"
import checkAuth from "./utils/checkAuth.js"
document.addEventListener("popstate" , await routIt())
export async function routIt() {
    if ( !await checkAuth()) {
        window.location.hash = "#login";
        login();
    } else {
        window.location.hash = "#home";
        home();
    }
}