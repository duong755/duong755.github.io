(function () {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("minkowski-wurst");
    const { width } = canvas.parentElement.getBoundingClientRect();
    canvas.width = width;
    canvas.height = width;

    const w = width,
        h = width;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;

    for (let step = 0; step <= 5; step++) {
        setTimeout(() => {
            ctx.clearRect(0, 0, w, h);
            drawMinkowskiWurst(ctx, [0, h / 2], [w, h / 2], step);
        }, step * 1000);
    }
})();
