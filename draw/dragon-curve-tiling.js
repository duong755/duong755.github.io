import { drawDragonCurve } from "../algorithms/dragon.js";

function draw() {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("dragon-tiling");
    const { width } = canvas.parentElement.getBoundingClientRect();
    const w = width,
        h = width;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    const a = w / 4;

    for (let iteration = 0; iteration <= 15; iteration++) {
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                const y = i * a;
                drawDragonCurve(ctx, [[0, "yellowgreen"]], [0, y], [-a, y], iteration);
                drawDragonCurve(ctx, [[0, "olive"]], [a, y], [0, y], iteration);
                drawDragonCurve(ctx, [[0, "yellowgreen"]], [2 * a, y], [a, y], iteration);
                drawDragonCurve(ctx, [[0, "olive"]], [3 * a, y], [2 * a, y], iteration);
                drawDragonCurve(ctx, [[0, "yellowgreen"]], [4 * a, y], [3 * a, y], iteration);
                drawDragonCurve(ctx, [[0, "olive"]], [5 * a, y], [4 * a, y], iteration);
        
                drawDragonCurve(ctx, [[0, "dodgerblue"]], [-a, y], [0, y], iteration);
                drawDragonCurve(ctx, [[0, "navy"]], [0, y], [a, y], iteration);
                drawDragonCurve(ctx, [[0, "dodgerblue"]], [a, y], [2 * a, y], iteration);
                drawDragonCurve(ctx, [[0, "navy"]], [2 * a, y], [3 * a, y], iteration);
                drawDragonCurve(ctx, [[0, "dodgerblue"]], [3 * a, y], [4 * a, y], iteration);
                drawDragonCurve(ctx, [[0, "navy"]], [4 * a, y], [5 * a, y], iteration);
            }
        }, iteration * 1000);
    }
}

draw();
document.getElementById("replay").addEventListener("click", draw);
