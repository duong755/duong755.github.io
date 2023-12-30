function draw () {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("heighway-drachen");
    const { width } = canvas.parentElement.getBoundingClientRect();
    const w = width,
        h = width * 3/4;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");

    for (let iteration = 0; iteration <= 20; iteration++) {
        setTimeout(() => {
            ctx.clearRect(0, 0, w, h);
            const t = 1/5;
            drawHeighwayDrachen(ctx, [w * t, h / 3], [w * (1 - t), h / 3], iteration);
        }, iteration * 1000);
    }
}

draw();
document.getElementById("replay").addEventListener("click", draw);
