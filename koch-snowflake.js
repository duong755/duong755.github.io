(function () {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("koch-snowflake");
    const { width } = canvas.parentElement.getBoundingClientRect();
    canvas.width = width;
    canvas.height = 1.5 * width;

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;

    const w = width,
        h = 1.5 * width;

    /**
     * @type
     */
    const triangle = [
        [0, (h * 3) / 4],
        [w / 2, (-w * Math.sqrt(3)) / 2 + (h * 3) / 4],
        [w, (h * 3) / 4],
    ];

    for (let iteration = 0; iteration <= 9; iteration++) {
        setTimeout(() => {
            ctx.clearRect(0, 0, w, h);
            drawKochSnowflake(ctx, triangle, iteration);
        }, iteration * 1000);
    }
})();

