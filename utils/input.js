export default function input (tp , pl) {
    let inp =  document.createElement("input")
    inp.type = tp
    inp.placeholder =pl
    return inp
}