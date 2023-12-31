import { drawSierpinskiTriangle } from "../algorithms/sierpinski.js";

function draw() {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("sierpinski-triangle");
    const { width } = canvas.parentElement.getBoundingClientRect();
    const w = width,
        h = width;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#FFFFFF";

    for (let step = 0; step <= 8; step++) {
        setTimeout(() => {
            ctx.clearRect(0, 0, w, h);
            drawSierpinskiTriangle(ctx, [[0, h], [w, h], [w / 2, h * (1 - Math.sqrt(3) / 2)]], step);
        }, step * 1000);
    }
}

draw();
document.getElementById("replay").addEventListener("click", draw);
