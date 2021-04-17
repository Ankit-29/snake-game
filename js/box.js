class Box {
    constructor(xPos, yPos, size, color) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.color = color || "#fff";
    }

    draw = (ctx) => {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.size, 0, 2 * Math.PI);
        ctx.fill();

    }
}