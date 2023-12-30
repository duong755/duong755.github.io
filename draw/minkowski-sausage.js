function draw () {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("minkowski-wurst");
    const { width } = canvas.parentElement.getBoundingClientRect();
    const w = width,
        h = width;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#FFFFFF";

    for (let step = 0; step <= 5; step++) {
        setTimeout(() => {
            ctx.clearRect(0, 0, w, h);
            drawMinkowskiWurst(ctx, [0, h / 2], [w, h / 2], step);
        }, step * 1000);
    }
}

draw();
document.getElementById("replay").addEventListener("click", draw);
