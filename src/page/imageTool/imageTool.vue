<!--
 * @Author: lxf
 * @Date: 2023-03-08 17:39:30
 * @LastEditors: lxf
 * @LastEditTime: 2023-03-09 17:13:30
 * @FilePath: \my-test-vue-app\src\page\imageTool\imageTool.vue
-->
<template>
  <button @click="openDraw"></button>
  <div class="canvasContainer">
    <canvas id="uerCanvas" ref="canvasRef"></canvas>
  </div>
  <div>
    <img :src="showergray" alt="" :style="{width:'100px',height:'100px'}">
  </div>
</template>
<script setup>
import { ref, onMounted, nextTick,computed ,watch} from 'vue'

const canvasRef = ref()
const IMGURL = './public/photo.png'

let contianerWidth = '800'
let contianerHeight = ''
const showergray= ref("") 

const userContextStyle = {
  fillStyle: 'rgba(255,0,0,0.5)', // 填充颜色为红色
  strokeStyle: 'blue', // 画笔的颜色
  lineWidth: 100, // 指定描边线的宽度
}


const grayContextStyle = {
  fillStyle: '#fff', // 填充颜色为红色
  strokeStyle: 'blue', // 画笔的颜色
  lineWidth: 100, // 指定描边线的宽度
}
let canvas //uerCanvas
let userContext
let image

let userDrawSteps = []
let grayDrawSteps = ref([])
watch(grayDrawSteps, function(e) {
    showergray.value = e[e.length-1]
},{deep:true})
//需要返回后端的canvas图形
const grayCanvasDom = document.createElement('canvas')
const grayCanvasContext = grayCanvasDom.getContext('2d')


const initGrayCanvasStyle = () => {
    grayCanvasDom.width=canvas.width
    grayCanvasDom.height=canvas.height
    grayCanvasContext.fillStyle="#000"
    grayCanvasContext.fillRect(0,0,grayCanvasDom.width,grayCanvasDom.height)

    grayCanvasContext.fillStyle = userContextStyle.fillStyle // 填充颜色
    grayCanvasDom.lastImage = grayCanvasDom.toDataURL('image/png', 1)
    grayDrawSteps.value[grayCanvasDom.lastImage]
    // grayCanvasContext.strokeStyle = userContextStyle.strokeStyle // 画笔的颜色
    // grayCanvasContext.lineWidth = userContextStyle.lineWidth // 指定描边线的宽度
}
const openDraw = async () => {
  userDrawSteps = [userDrawSteps[0]]
  canvas.lastImage = userDrawSteps[0]
  
  grayDrawSteps.value = [grayDrawSteps.value[0]]
  grayCanvasDom.lastImage = grayDrawSteps.value[0]

  grayCanvasDom.initCanvas()
  canvas.initCanvas()
  await nextTick()
  canvas.loadImage() // 使用异步再次loadImage   同步方式initCanvas中的loadImgage不会触发
  grayCanvasDom.loadImage() // 使用异步再次loadImage   同步方式initCanvas中的loadImgage不会触发

}

const initState = () => {
  canvas = canvasRef.value
  userContext = canvas.getContext('2d')
}
function drawImageActualSize() {
  // Use the intrinsic size of image in CSS pixels for the canvas element
  canvas.width = this.naturalWidth
  canvas.height = this.naturalHeight

  // Will draw the image as 300x227, ignoring the custom size of 60x45
  // given in the constructor
  //   userContext.drawImage(this, 0, 0);

  // To use the custom size we'll have to specify the scale parameters
  // using the element's width and height properties - lets draw one
  // on top in the corner:
  userContext.drawImage(this, 0, 0, this.width, this.height)
}
function drawImageContainerRateSize() {
  canvas.width = contianerWidth
  canvas.height =  (canvas.width / this.naturalWidth) * this.naturalHeight

  userContext.drawImage(
    this,
    0,
    0,
    canvas.width,
    canvas.height 
    ,
  )
  canvas.lastImage = this.url
  initGrayCanvasStyle()
}
const initPhoto = () => {
  image = new Image() // Using optional size for image

  image.onload = drawImageContainerRateSize // Draw when image has loaded

  // Load an image of intrinsic size 300x227 in CSS pixels
  image.src = IMGURL
}
const injectFunctionToCanvasInstance = () => {
  canvas.drawing = function (x1, y1, x2, y2, e) {
    
    let self = this
    if (!userContext) {
      return
    } else {
      // 设置画笔的颜色和大小
      userContext.fillStyle = userContextStyle.fillStyle // 填充颜色为红色
      userContext.strokeStyle = userContextStyle.strokeStyle // 画笔的颜色
      userContext.lineWidth = userContextStyle.lineWidth // 指定描边线的宽度

      userContext.save()
      userContext.beginPath()

      self.initCanvas() // 每次需要调用初始化函数，以清空canvas
      // 绘制空心矩形
      userContext.fillRect(x1, y1, x2 - x1, y2 - y1)

      // 添加对应的flag，以适应不同形状的绘制

      // if (self.rectFlag) {
      //     // console.log('画矩形');
      //     self.initCanvas();
      //     if (e.shiftKey === true) {
      //         // 正方形
      //         let d = ((x2 - x1) < (y2 -y1)) ? (x2 - x1) : (y2 - y1);
      //         userContext.fillRect(x1, y1, d, d);
      //     } else {
      //         // 普通方形
      //         userContext.fillRect(x1, y1, x2 - x1, y2 - y1);
      //     }
      // } else if (self.strokeRectFlag) {
      //     // console.log('画空心矩形')
      //     self.initCanvas();
      //     if (e.shiftKey === true) {
      //         // 正方形
      //         let d = ((x2 - x1) < (y2 -y1)) ? (x2 - x1) : (y2 - y1);
      //         userContext.strokeRect(x1, y1, d, d);
      //     } else {
      //         // 普通方形
      //         userContext.strokeRect(x1, y1, x2 - x1, y2 - y1);
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
      //         userContext.arc(w + x1, h + y1, r, 0, Math.PI * 2);
      //     } else {
      //         // ellipse
      //         // bezier double ellipse algorithm
      //         userContext.moveTo(x1, y1 + h);
      //         userContext.bezierCurveTo(x1, y1 + h * 3, x1 + w * 11 / 5, y1 + h * 3, x1 + w * 11 / 5, y1 + h);
      //         userContext.bezierCurveTo(x1 + w * 11 / 5, y1 - h, x1, y1 - h, x1, y1 + h);
      //     }
      //     userContext.fill();
      // } else if (self.strokeCircelFlag) {
      //     // console.log('画空心圆形')
      //     self.initCanvas();
      //     let k = ((x2 - x1) / 0.55);
      //     let w = (x2 - x1) / 2;
      //     let h = (y2 - y1) / 2;

      //     if (e.shiftKey === true) {
      //         // circle
      //         let r = Math.sqrt(w * w + h * h);
      //         userContext.arc(w + x1, h + y1, r, 0, Math.PI * 2);
      //     } else {
      //         // ellipse
      //         // bezier double ellipse algorithm
      //         userContext.moveTo(x1, y1 + h);
      //         userContext.bezierCurveTo(x1, y1 + h * 3, x1 + w * 11 / 5, y1 + h * 3, x1 + w * 11 / 5, y1 + h);
      //         userContext.bezierCurveTo(x1 + w * 11 / 5, y1 - h, x1, y1 - h, x1, y1 + h);
      //     }
      //     userContext.stroke();
      // } else if (self.lineFlag) {
      //     // console.log('画直线')
      //     self.initCanvas();
      //     userContext.moveTo(x1, y1);
      //     userContext.lineTo(x2, y2);
      //     userContext.stroke();
      // } else if (self.arrowFlag) {
      //     // console.log('画箭头')
      //     self.initCanvas();
      //     userContext.moveTo(x1, y1);
      //     userContext.lineTo(x2, y2);
      //     userContext.stroke();
      //     let endRadians = Math.atan((y2 - y1) / (x2 - x1));
      //     endRadians += ((x2 >= x1) ? 90 : -90) * Math.PI / 180;
      //     userContext.translate(x2, y2);
      //     userContext.rotate(endRadians);
      //     userContext.moveTo(0,  -2 * userContext.lineWidth);
      //     userContext.lineTo(2 * userContext.lineWidth, 3 * userContext.lineWidth);
      //     userContext.lineTo(-2 * userContext.lineWidth, 3 * userContext.lineWidth);
      //     userContext.fillStyle = userContext.strokeStyle;
      //     userContext.fill();

      // } else if (self.textFlag) {
      //     // console.log('画文字')
      // } else {
      //     // 画笔需要保留之前的移动轨迹，所以不需要初始化清除。
      //     userContext.moveTo(x1, y1);
      //     userContext.lineTo(x2, y2);
      //     userContext.stroke();

      //     // 画笔功能，需要动态实时将当前位置赋给初始位置，以实现连续笔记，否则就是直线。
      //     self.X1 = self.X2;
      //     self.Y1 = self.Y2;
      // }

      userContext.restore()
      userContext.closePath()
    }
  }

  canvas.onmousedown = function mouseDownAction(e) {
    grayCanvasDom.mousedown(e)
    let self = this
    if (userDrawSteps.length == 0) {
      self.lastImage = canvas.toDataURL('image/png', 1)
      userDrawSteps.push(self.lastImage)
    }

    self.X1 = e.offsetX // 鼠标按下时保存当前位置，为起始位置
    self.Y1 = e.offsetY
    self.isMouseDown = true // 将按下的flag表示为true，拖动鼠标时使用
    self.loadImage()
  }

  canvas.onmousemove = function mouseMoveAction(e) {
    grayCanvasDom.mousemove(e)
    let self = this
    if (self.isMouseDown) {
      self.X2 = e.offsetX
      self.Y2 = e.offsetY
      self.drawing(self.X1, self.Y1, self.X2, self.Y2, e)
    }
  }

  canvas.onmouseup = function mouseUpAction(e) {
    grayCanvasDom.mouseup(e)
    let self = this
    self.lastImage = canvas.toDataURL('image/png', 1)
    userDrawSteps.push(self.lastImage)
    self.isMouseDown = false
  }

  canvas.loadImage = function () {
    let self = this
    let img = new Image()
    img.src = self.lastImage // 将最后保存的图片赋值给img
    userContext.drawImage(img, 0, 0, canvas.width, canvas.height) // 将img展示在canvas中
  }

  canvas.initCanvas = function () {
    userContext.clearRect(0, 0, canvas.width, canvas.height) // 清空canvas
    canvas.loadImage() // 将最近的图片展示到canvas中
  }
}
const injectFunctionToGrayCanvasInstance = () => {
    grayCanvasDom.drawing = function (x1, y1, x2, y2, e) {
        
        let self = this
        if (!grayCanvasContext) {
            return
        } else {
            // 设置画笔的颜色和大小
            grayCanvasContext.fillStyle = grayContextStyle.fillStyle // 填充颜色为红色
            grayCanvasContext.strokeStyle = grayContextStyle.strokeStyle // 画笔的颜色
            grayCanvasContext.lineWidth = grayContextStyle.lineWidth // 指定描边线的宽度

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

    grayCanvasDom.mousedown = function (e) {
        let self = this
        if (grayDrawSteps.value.length == 0) {
            self.lastImage = grayCanvasDom.toDataURL('image/png', 1)
            grayDrawSteps.value.push(self.lastImage)
        }

        self.X1 = e.offsetX // 鼠标按下时保存当前位置，为起始位置
        self.Y1 = e.offsetY
        self.isMouseDown = true // 将按下的flag表示为true，拖动鼠标时使用
        self.loadImage()
    }

    grayCanvasDom.mousemove = function (e) {
        let self = this
        if (self.isMouseDown) {
            self.X2 = e.offsetX
            self.Y2 = e.offsetY
            self.drawing(self.X1, self.Y1, self.X2, self.Y2, e)
        }
    }

    grayCanvasDom.mouseup = function (e) {
        let self = this
        self.lastImage = grayCanvasDom.toDataURL('image/png', 1)
        grayDrawSteps.value.push(self.lastImage)
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
        grayCanvasContext.fillStyle="#000"
        grayCanvasContext.fillRect(0,0,grayCanvasDom.width,grayCanvasDom.height)
        grayCanvasContext.restore()
        grayCanvasDom.loadImage() // 将最近的图片展示到canvas中
    }
}

onMounted(() => {
  initState()
  initPhoto()
  injectFunctionToGrayCanvasInstance()
  injectFunctionToCanvasInstance()
  
  window.handle = grayCanvasDom
})
</script>
<style>
.canvasContainer {
  width: 500px;
  height: 500px;
}
</style>
