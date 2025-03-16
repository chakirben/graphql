export default function copyCode() {    
    let code = document.querySelector(".code").textContent
    navigator.clipboard.writeText(code)
        .then(() => alert("Copied!"))
        .catch(err => console.error("Failed to copy:", err));
}