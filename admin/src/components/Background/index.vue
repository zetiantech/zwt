
<template>
  <canvas id="J_dotLine"/>
</template>

<script>

import Dotline from '@/utils/dotline'

export default {
  name: 'Background',
  mounted() {
    new Dotline({
      dom: 'J_dotLine', // 画布id
      cw: 1000, // 画布宽
      ch: 500, // 画布高
      ds: 100, // 点的个数
      r: 0.3, // 圆点半径
      cl: '#cccccc', // 粒子线颜色
      dis: 100// 触发连线的距离
    }).start()
  }
}
</script>

<style lang="scss" scoped>

	#J_dotLine{
		position: absolute;
		z-index: -1;
		display: block;
		margin: 0 auto;
		width: 100%;
		height: 100%;
		background-color: #2d3a4b;
	}

</style>

