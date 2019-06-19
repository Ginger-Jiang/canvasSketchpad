//
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

autoSetCanvasSize(canvas)
listenToUser(canvas)


// 画线
function drawLine (oldX, oldY, newX, newY) {
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.moveTo(oldX, oldY)
  ctx.lineTo(newX, newY)
  ctx.closePath()
  ctx.stroke()
  ctx.closePath()
}


// 颜色选择器
var red = findElement('red')
var green = findElement('green')
var blue = findElement('blue')
red.onclick = function () {
  ctx.strokeStyle = 'red'
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
green.onclick = function () {
  ctx.strokeStyle = 'green'
  red.classList.remove('active')
  green.classList.add('active')
  blue.classList.remove('active')
}
blue.onclick = function () {
  ctx.strokeStyle = 'blue'
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.add('active')
}

// 保存图片
var download = findElement('download')
download.onclick = function () {
  var downloadUrl = canvas.toDataURL("image/png")
  var downloadA = document.createElement('a')
  document.body.appendChild(downloadA)
  downloadA.href = downloadUrl
  downloadA.download = 'Drawing'
  downloadA.target = '_blank'
  downloadA.click()
}

// 一键重置画板
var reset = findElement('reset')
reset.onclick = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}


// 元素选择器
function findElement (eleId) {
  return document.getElementById(eleId)
}

// 橡皮擦
var eraserEnable = false
var eraser = findElement('eraser')
var brush = findElement('brush')
eraser.onclick = function () {
  eraserEnable = true
  eraser.classList.add('active')
  brush.classList.remove('active')
}
brush.onclick = function () {
  eraserEnable = false
  brush.classList.add('active')
  eraser.classList.remove('active')
}



// 自动设置canvas大小
function autoSetCanvasSize (canvas) {
  setCanvasSize()

  function setCanvasSize () {
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
  }

  window.onresize = function () {
    setCanvasSize()
  }
}

// 监听鼠标动作
function listenToUser (canvas) {
  var flag = false
  var lastPoint
  if (document.body.ontouchstart === undefined) {
    // PC
    canvas.onmousedown = function (e) {
      var x = e.clientX
      var y = e.clientY
      flag = true
      if (eraserEnable) {
        ctx.clearRect(x - 10, y - 10, 20, 20)
      } else {
        lastPoint = {
          x,
          y
        }
      }
    }

    canvas.onmousemove = function (e) {
      var x = e.clientX
      var y = e.clientY
      if (!flag) return
      if (eraserEnable) {
        ctx.clearRect(x - 10, y - 10, 20, 20)
      } else {
        var newCoordinate = {
          x,
          y
        }
        drawLine(
          lastPoint.x,
          lastPoint.y,
          newCoordinate.x,
          newCoordinate.y
        )
        lastPoint = newCoordinate
      }
    }

    canvas.onmouseup = function (e) {
      flag = false
    }
  } else if (document.body.ontouchstart === null) {
    // mobile
    canvas.ontouchstart = function (e) {
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      flag = true
      if (eraserEnable) {
        ctx.clearRect(x - 10, y - 10, 20, 20)
      } else {
        lastPoint = {
          x,
          y
        }
      }
    }

    canvas.ontouchmove = function (e) {
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      if (!flag) return
      if (eraserEnable) {
        ctx.clearRect(x - 10, y - 10, 20, 20)
      } else {
        var newCoordinate = {
          x,
          y
        }
        drawLine(
          lastPoint.x,
          lastPoint.y,
          newCoordinate.x,
          newCoordinate.y
        )
        lastPoint = newCoordinate
      }
    }

    canvas.ontouchend = function (e) {
      flag = false
    }
  }
}