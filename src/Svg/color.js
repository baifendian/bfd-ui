/*
 * 默认颜色值
 * create by tenglong.jiang on 2016/4/25
 */
export default class {

  constructor(type) {
    this.index = 0
    this.color = ['#E6EE9C', '#FFAB91', '#EF9A9A', '#9FA8DA', '#80CBC4', '#FFF59D', '#F48FB1', '#90CAF9', '#A5D6A7', '#FCE68D', '#CE93D8', '#81D4FA', '#C5E1A5', '#FFCC80', '#B39DDB', '#80DEEA']
    this.scope = this.getScope(type)

    if (!!this.scope) {
      this.index = this.scope.start
    }
  }

  /*
   * 获取一个颜色值，不在colors范围内。
   * index 索引，可选
   * colors 颜色值数组，返回值color值不能在这个范围值内，可选
   */
  getColor(index, colors) {
    index = index || this.index++
      if (index > this.color.length) {
        const number = index % this.color.length
        return this.color[number]
      }
    const color = this.color[index]
    if (colors) {
      if (this.valid(color, colors)) {
        this.index++
          return this.getColor(this.index, colors)
      } else {
        return color
      }
    } else {
      return color
    }
  }

  /*
   * 验证color是否在colors数组内存在。
   * color 颜色值
   * colors 颜色值数组
   */
  valid(color, colors) {
    if (colors instanceof Array && colors.length > 0) {
      for (let i = 0; i < colors.length; i++) {
        if (color == colors[i]) {
          return true
        }
      }
    }
    return false
  }

  /*
   * 获取色系属性
   * scope 色系值 C1 C2 C3 C4
   */
  getScope(scope) {
    if (!scope) {
      return null
    }
    const colorScope = {
      'C1': {
        default: ['#B39DDB', '#F48FB1'],
        start: 7
      },
      'C2': {
        default: ['#80DEEA', '#90CAF9'],
        start: 8
      },
      'C3': {
        default: ['#A5D6A7', '#E6EE9C'],
        start: 1
      },
      'C4': {
        default: ['#FFAB91', '#FFCC80'],
        start: 14
      }
    }
    scope = scope || 'C2'
    return colorScope[scope] || colorScope['C2']
  }

  getDefault(index) {
    if (typeof index == 'undefiend') {
      return this.scope.default
    } else {
      return this.scope ? this.scope.default[index] : null
    }
  }
}