export class Config {
  constructor(options) {
    this.options = options
  }

  mergeOptions(newOptions) {
    this.options = Object.assign({}, this.options, newOptions)
  }
}
