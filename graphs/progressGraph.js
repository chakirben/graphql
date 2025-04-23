import createCircle from "../utils/circle.js";
import div from "../utils/div.js";

export default function drawProgressGraph(data) {
    let progressCard = div("progressCard").add(
        div("Progresstexts").add(
            div("Bigtext" , "Progress") , div("smalltext","Xp Made by each  Project")
        ) , 
        div("chart")
    )
    document.body.append(progressCard)
    let total = data.reduce((acc, val) => { acc += val.amount; return acc }, 0)
    console.log(total);
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.display = "block";
    svg.style.margin = "auto";
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", "white");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-width", "1");

    // Append the path to the SVG
    svg.appendChild(path);
    document.querySelector(".chart").appendChild(svg);
    let width = document.querySelector("svg").getBoundingClientRect().width
    let height = document.querySelector("svg").getBoundingClientRect().height
    svg.setAttribute("viewBox", `0 0 ${width + 10} ${height + 4}`);
    let coordinates = `M0 ${height}`
    let xStep = width / data.length
    let Xposition = xStep
    let progress = 0
    let ypos
    let tooltip = div("tooltip");
    tooltip.style.position = "absolute";
    tooltip.style.display = "none";
    document.body.appendChild(tooltip);
    data.forEach((value) => {
        progress += value.amount
        ypos = height - (progress / total) * height
        coordinates += ` L${Xposition} ${ypos}`
        let circle = createCircle(Xposition, ypos, 2, "#767778", "none", 1)
        circle.addEventListener("mouseenter", (e) => {
            console.log(e.pageX);
            let path = value.path.split("/")
            path = path[path.length - 1]
            tooltip.innerHTML = `${path}&nbsp${value.amount/1000}kb`;
            tooltip.style.left = `${e.pageX -20}px`;
            tooltip.style.top = `${e.pageY - 40}px`;
            tooltip.style.display = "block";
        });

        circle.addEventListener("mouseleave", () => {
            tooltip.style.display = "none";  // Hide the tooltip
        });
        svg.append(circle)
        Xposition += xStep
    })
    coordinates+= `L${width+12} 0 L${width+12} ${height+6} L0 ${height+6}`
    path.setAttribute("d", coordinates);
}