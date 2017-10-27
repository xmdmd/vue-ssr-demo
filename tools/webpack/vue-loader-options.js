import styleLoaderConfig from './style-loader-config'

export default {
  loaders: {
    'scss': styleLoaderConfig.scss,
    'less': styleLoaderConfig.less,
    'css': styleLoaderConfig.css
  },
  extractCSS: true
}
