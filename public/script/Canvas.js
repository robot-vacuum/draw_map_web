class Canvas {
  #canvas;
  #padding = 100;

  constructor(canvasId) {
    this.#canvas = document.getElementById(canvasId);
  }

  getCanvas() {
    return this.#canvas;
  }

  resetCanvas() {
    const ctx = this.#canvas.getContext("2d");
    ctx.clearRect(0,0,1200,1200);
    ctx.beginPath();
  }

  drawText(text, x, y, color = "black", font = "30px Arial") {
    const ctx = this.#canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x+10 + this.#padding, y-10 + this.#padding);
  }

  drawMap(mapSize, mapData, color = "black", width = 3) {
    const ctx = this.#canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.moveTo(mapData[0][0] + this.#padding, mapData[0][1] + this.#padding);
    //const circles = [];
    for (let i = 0; i < mapSize - 1; i++) {
      const next = (i + 1) % mapSize;
      ctx.lineTo(mapData[next][0] + this.#padding, mapData[next][1] + this.#padding);
      /*const circle = new Path2D();
      circle.arc(mapData[next][0]+1.25 + this.#padding, mapData[next][1] + this.#padding, 5, 0, 2 * Math.PI);
      circles.push(circle);*/
    }
    ctx.stroke();

    /*for (const circle of circles) {
      ctx.fillStyle = "black";
      ctx.fill(circle);
    }*/
  }
}
