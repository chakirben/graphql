export default  function createCircle(cx, cy, r, fill, stroke, strokeWidth) {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    circle.setAttribute("fill", fill);
    circle.setAttribute("stroke", stroke);
    circle.setAttribute("stroke-width", strokeWidth);
    return circle
}