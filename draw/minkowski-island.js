function draw () {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("minkowski-insel");
    const { width } = canvas.parentElement.getBoundingClientRect();

    const w = width,
        h = width;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#FFFFFF";

    for (let iteration = 0; iteration <= 6; iteration++) {
        setTimeout(() => {
            ctx.clearRect(0, 0, w, h);
            const viereck = [
                [w / 4, h / 4],
                [3 * w / 4, h / 4],
                [3 * w / 4, 3 * h / 4],
                [w / 4, 3 * h / 4]
            ];
            drawMinkowskiInsel(ctx, viereck, iteration);
        }, iteration * 1000);
    }
}

draw();
document.getElementById("replay").addEventListener("click", draw);
