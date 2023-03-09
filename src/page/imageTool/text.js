const injectFunctionToGrayCanvasInstance = () => {
    grayCanvasDom.drawing = function (x1, y1, x2, y2, e) {

        let self = this
        if (!grayCanvasContext) {
            return
        } else {
            // 设置画笔的颜色和大小
            grayCanvasContext.fillStyle = grayCanvasContextStyle.fillStyle // 填充颜色为红色
            grayCanvasContext.strokeStyle = grayCanvasContextStyle.strokeStyle // 画笔的颜色
            grayCanvasContext.lineWidth = grayCanvasContextStyle.lineWidth // 指定描边线的宽度

            grayCanvasContext.save()
            grayCanvasContext.beginPath()

            self.initCanvas() // 每次需要调用初始化函数，以清空canvas
            // 绘制空心矩形
            grayCanvasContext.fillRect(x1, y1, x2 - x1, y2 - y1)

            // 添加对应的flag，以适应不同形状的绘制

            // if (self.rectFlag) {
            //     // console.log('画矩形');
            //     self.initCanvas();
            //     if (e.shiftKey === true) {
            //         // 正方形
            //         let d = ((x2 - x1) < (y2 -y1)) ? (x2 - x1) : (y2 - y1);
            //         grayCanvasContext.fillRect(x1, y1, d, d);
            //     } else {
            //         // 普通方形
            //         grayCanvasContext.fillRect(x1, y1, x2 - x1, y2 - y1);
            //     }
            // } else if (self.strokeRectFlag) {
            //     // console.log('画空心矩形')
            //     self.initCanvas();
            //     if (e.shiftKey === true) {
            //         // 正方形
            //         let d = ((x2 - x1) < (y2 -y1)) ? (x2 - x1) : (y2 - y1);
            //         grayCanvasContext.strokeRect(x1, y1, d, d);
            //     } else {
            //         // 普通方形
            //         grayCanvasContext.strokeRect(x1, y1, x2 - x1, y2 - y1);
            //     }
            // } else if (self.circleFlag) {
            //     // console.log('画圆形')
            //     self.initCanvas();
            //     let k = ((x2 - x1) / 0.55);
            //     let w = (x2 - x1) / 2;
            //     let h = (y2 - y1) / 2;

            //     if (e.shiftKey === true) {
            //         // circle
            //         let r = Math.sqrt(w * w + h * h);
            //         grayCanvasContext.arc(w + x1, h + y1, r, 0, Math.PI * 2);
            //     } else {
            //         // ellipse
            //         // bezier double ellipse algorithm
            //         grayCanvasContext.moveTo(x1, y1 + h);
            //         grayCanvasContext.bezierCurveTo(x1, y1 + h * 3, x1 + w * 11 / 5, y1 + h * 3, x1 + w * 11 / 5, y1 + h);
            //         grayCanvasContext.bezierCurveTo(x1 + w * 11 / 5, y1 - h, x1, y1 - h, x1, y1 + h);
            //     }
            //     grayCanvasContext.fill();
            // } else if (self.strokeCircelFlag) {
            //     // console.log('画空心圆形')
            //     self.initCanvas();
            //     let k = ((x2 - x1) / 0.55);
            //     let w = (x2 - x1) / 2;
            //     let h = (y2 - y1) / 2;

            //     if (e.shiftKey === true) {
            //         // circle
            //         let r = Math.sqrt(w * w + h * h);
            //         grayCanvasContext.arc(w + x1, h + y1, r, 0, Math.PI * 2);
            //     } else {
            //         // ellipse
            //         // bezier double ellipse algorithm
            //         grayCanvasContext.moveTo(x1, y1 + h);
            //         grayCanvasContext.bezierCurveTo(x1, y1 + h * 3, x1 + w * 11 / 5, y1 + h * 3, x1 + w * 11 / 5, y1 + h);
            //         grayCanvasContext.bezierCurveTo(x1 + w * 11 / 5, y1 - h, x1, y1 - h, x1, y1 + h);
            //     }
            //     grayCanvasContext.stroke();
            // } else if (self.lineFlag) {
            //     // console.log('画直线')
            //     self.initCanvas();
            //     grayCanvasContext.moveTo(x1, y1);
            //     grayCanvasContext.lineTo(x2, y2);
            //     grayCanvasContext.stroke();
            // } else if (self.arrowFlag) {
            //     // console.log('画箭头')
            //     self.initCanvas();
            //     grayCanvasContext.moveTo(x1, y1);
            //     grayCanvasContext.lineTo(x2, y2);
            //     grayCanvasContext.stroke();
            //     let endRadians = Math.atan((y2 - y1) / (x2 - x1));
            //     endRadians += ((x2 >= x1) ? 90 : -90) * Math.PI / 180;
            //     grayCanvasContext.translate(x2, y2);
            //     grayCanvasContext.rotate(endRadians);
            //     grayCanvasContext.moveTo(0,  -2 * grayCanvasContext.lineWidth);
            //     grayCanvasContext.lineTo(2 * grayCanvasContext.lineWidth, 3 * grayCanvasContext.lineWidth);
            //     grayCanvasContext.lineTo(-2 * grayCanvasContext.lineWidth, 3 * grayCanvasContext.lineWidth);
            //     grayCanvasContext.fillStyle = grayCanvasContext.strokeStyle;
            //     grayCanvasContext.fill();

            // } else if (self.textFlag) {
            //     // console.log('画文字')
            // } else {
            //     // 画笔需要保留之前的移动轨迹，所以不需要初始化清除。
            //     grayCanvasContext.moveTo(x1, y1);
            //     grayCanvasContext.lineTo(x2, y2);
            //     grayCanvasContext.stroke();

            //     // 画笔功能，需要动态实时将当前位置赋给初始位置，以实现连续笔记，否则就是直线。
            //     self.X1 = self.X2;
            //     self.Y1 = self.Y2;
            // }

            grayCanvasContext.restore()
            grayCanvasContext.closePath()
        }
    }

    grayCanvasDom.mousedown = function mouseDownAction(e) {
        let self = this
        if (userDrawSteps.length == 0) {
            self.lastImage = grayCanvasDom.toDataURL('image/png', 1)
            userDrawSteps.push(self.lastImage)
        }

        self.X1 = e.offsetX // 鼠标按下时保存当前位置，为起始位置
        self.Y1 = e.offsetY
        self.isMouseDown = true // 将按下的flag表示为true，拖动鼠标时使用
        self.loadImage()
    }

    grayCanvasDom.mousemove = function mouseMoveAction(e) {
        let self = this
        if (self.isMouseDown) {
            self.X2 = e.offsetX
            self.Y2 = e.offsetY
            self.drawing(self.X1, self.Y1, self.X2, self.Y2, e)
        }
    }

    grayCanvasDom.mouseup = function mouseUpAction(e) {
        let self = this
        self.lastImage = grayCanvasDom.toDataURL('image/png', 1)
        userDrawSteps.push(self.lastImage)
        self.isMouseDown = false
    }

    grayCanvasDom.loadImage = function () {
        let self = this
        let img = new Image()
        img.src = self.lastImage // 将最后保存的图片赋值给img
        grayCanvasContext.drawImage(img, 0, 0, grayCanvasDom.width, grayCanvasDom.height) // 将img展示在canvas中
    }

    grayCanvasDom.initCanvas = function () {
        grayCanvasContext.save()
        grayCanvasContext.fillStyle = "#000"
        grayCanvasContext.fillRect(0, 0, grayCanvasDom.width, grayCanvasDom.height)
        grayCanvasContext.restore()
        grayCanvasDom.loadImage() // 将最近的图片展示到canvas中
    }
}