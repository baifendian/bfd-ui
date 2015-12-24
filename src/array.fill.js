Array.prototype.fill || (Array.prototype.fill = function(value) {
  for (let i = this.length; i--; ) {
    this[i] = value
  }
})