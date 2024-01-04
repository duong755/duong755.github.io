import { drawTree } from "../algorithms/tree.js";

function draw() {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("tree");
    const { width } = canvas.parentElement.getBoundingClientRect();
    const w = width,
        h = width;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;

    for (let iteration = 0; iteration <= 4; iteration++) {
        setTimeout(() => {
            ctx.clearRect(0, 0, w, h);
            drawTree(ctx, [[w / 2, (w + h) / 2], [w / 2, 2 * h / 3]], [Math.PI * 0.75, Math.PI * 0.86, Math.PI * 0.9], 2/3, iteration);
        }, iteration * 1000);
    }
}

draw();
document.getElementById("replay").addEventListener("click", draw);
