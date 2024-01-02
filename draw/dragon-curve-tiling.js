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

    for (let iteration = 0; iteration <= 16; iteration++) {
        setTimeout(() => {
            for (let i = 0; i < 6; i++) {
                const y = i * a;
                for (let j = 0; j < 6; j++) {
                    const forwardColor = j % 2 === 0 ?
                        [[0, "gold"], [1 / 3, "goldenrod"], [2 / 3, "orange"], [1, "red"]] :
                        [[0, "lightgreen"], [1 / 3, "lightseagreen"], [2 / 3, "mediumseagreen"], [1, "green"]];
                    const reverseColor = j % 2 === 0 ?
                        [[0, "white"], [1 / 3, "lightskyblue"], [2 / 3, "dodgerblue"], [1, "deepskyblue"]] :
                        [[0, "blue"], [1 / 3, "mediumblue"], [2 / 3, "darkblue"], [1, "navy"]];
                    drawDragonCurve(ctx, forwardColor, [j * a, y], [(j - 1) * a, y], iteration);
                    drawDragonCurve(ctx, reverseColor, [(j - 1) * a, y], [j * a, y], iteration);
                }
            }
        }, iteration * 1000);
    }
}

draw();
document.getElementById("replay").addEventListener("click", draw);
