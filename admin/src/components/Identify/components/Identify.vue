<template>
  <div class="s-canvas">
    <canvas id="s-canvas" :width="contentwidth" :height="contentheight" />
  </div>
</template>

<script>
export default {
  name: 'Identify',
  props: {
    identifycode: {
      type: String,
      default: '1234'
    },
    fontSizeMin: {
      type: Number,
      default: 18
    },
    fontSizeMax: {
      type: Number,
      default: 30
    },
    backgroundColorMin: {
      type: Number,
      default: 200
    },
    backgroundColorMax: {
      type: Number,
      default: 240
    },
    colorMin: {
      type: Number,
      default: 30
    },
    colorMax: {
      type: Number,
      default: 120
    },
    lineColorMin: {
      type: Number,
      default: 40
    },
    lineColorMax: {
      type: Number,
      default: 100
    },
    dotColorMin: {
      type: Number,
      default: 0
    },
    dotColorMax: {
      type: Number,
      default: 100
    },
    contentwidth: {
      type: Number,
      default: 120
    },
    contentheight: {
      type: Number,
      default: 44
    }
  },
  watch: {
    identifycode() {
      this.drawPic()
    }
  },
  mounted() {
    this.drawPic()
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    randomColor(min, max) {
      var r = this.randomNum(min, max)
      var g = this.randomNum(min, max)
      var b = this.randomNum(min, max)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    drawPic() {
      var canvas = document.getElementById('s-canvas')
      var ctx = canvas.getContext('2d')
      ctx.textBaseline = 'bottom'
      // 绘制背景
      ctx.fillStyle = this.randomColor(
        this.backgroundColorMin,
        this.backgroundColorMax
      )
      ctx.fillRect(0, 0, this.contentwidth, this.contentheight)
      // 绘制文字
      for (let i = 0; i < this.identifycode.length; i++) {
        this.drawText(ctx, this.identifycode[i], i)
      }
      // this.drawLine(ctx)
      // this.drawDot(ctx)
    },
    drawText(ctx, txt, i) {
      ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
      ctx.font =
        this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
      var x = (i + 1) * (this.contentwidth / (this.identifycode.length + 1))
      var y = this.randomNum(this.fontSizeMax, this.contentheight - 5)
      var deg = this.randomNum(-45, 45)
      // 修改坐标原点和旋转角度
      ctx.translate(x, y)
      ctx.rotate(deg * Math.PI / 180)
      ctx.fillText(txt, 0, 0)
      // 恢复坐标原点和旋转角度
      ctx.rotate(-deg * Math.PI / 180)
      ctx.translate(-x, -y)
    },
    drawLine(ctx) {
      // 绘制干扰线
      for (let i = 0; i < 8; i++) {
        ctx.strokeStyle = this.randomColor(
          this.lineColorMin,
          this.lineColorMax
        )
        ctx.beginPath()
        ctx.moveTo(
          this.randomNum(0, this.contentwidth),
          this.randomNum(0, this.contentheight)
        )
        ctx.lineTo(
          this.randomNum(0, this.contentwidth),
          this.randomNum(0, this.contentheight)
        )
        ctx.stroke()
      }
    },
    drawDot(ctx) {
      // 绘制干扰点
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = this.randomColor(0, 255)
        ctx.beginPath()
        ctx.arc(this.randomNum(0, this.contentwidth), this.randomNum(0, this.contentheight), 1, 0, 2 * Math.PI)
        ctx.fill()
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .s-canvas{
    position: relative;
    border-radius: 5px;
  }
</style>
