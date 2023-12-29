(function () {
    function draw() {
        /**
         * @type {HTMLCanvasElement}
         */
        const canvas = document.getElementById("sierpinski-curve");
        const { width } = canvas.parentElement.getBoundingClientRect();
        canvas.width = width;
        canvas.height = width;

        const w = width,
            h = width;
        const ctx = canvas.getContext("2d");
        ctx.lineWidth = 1;

        for (let step = 0; step <= 12; step++) {
            setTimeout(() => {
                ctx.clearRect(0, 0, w, h);
                drawSierpinskiCurve(
                    ctx,
                    [
                        [0, "red"],
                        [1, "blue"],
                    ],
                    [0, h],
                    [w, h],
                    step
                );
            }, step * 1000);
        }
    }

    draw();
    document.getElementById("replay").addEventListener("click", draw);
})();