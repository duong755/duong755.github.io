function draw () {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("heighway-drachen");
    const { width } = canvas.parentElement.getBoundingClientRect();
    canvas.width = width;
    canvas.height = width;

    const w = width,
        h = width;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 4;

    for (let iteration = 0; iteration <= 20; iteration++) {
        setTimeout(() => {
            ctx.clearRect(0, 0, w, h);
            drawHeighwayDrachen(ctx, [w / 5, h / 2], [(4 * w) / 5, h / 2], iteration);
        }, iteration * 1000);
    }
}

draw();
document.getElementById("replay").addEventListener("click", draw);
