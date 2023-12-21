class Canvas {
  #canvas;

  constructor(canvasId) {
    this.#canvas = document.getElementById(canvasId);
  }

  getCanvas() {
    return this.#canvas;
  }

  drawMap(mapData, mapSize, color = "black", width = 1) {
    const ctx = this.#canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineWidth = width;

    ctx.font = "30px Arial";
    ctx.beginPath();
    ctx.fillText("start", mapData[0][0], mapData[0][1]);

    for (let i = 0; i < mapSize; i++) {
      const next = (i + 1) % 5;
      ctx.moveTo(mapData[i][0], mapData[i][1]);
      ctx.lineTo(mapData[next][0], mapData[next][1]);
    }
    ctx.stroke();

    console.log("drawMap", mapData);
  }
}
