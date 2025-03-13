export default function button (txt , func){
    let btn = document.createElement("button")
    btn.textContent =txt
    btn.onclick = () => { func(); };
    return btn
}