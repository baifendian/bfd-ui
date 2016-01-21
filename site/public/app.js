import 'bfd-bootstrap'
import './styles/app.css'
import page from 'page'
import model from './model'

/**
 * Bind router events
 */
const originLength = location.origin.length
document.getElementById('nav').onclick = e => {
  if (e.target.tagName === 'A') {
    page(e.target.href.slice(originLength))
    e.preventDefault()
  }
}

/**
 * Render content
 */
const content = document.getElementById('content')
const renderContent = (path, callback) => {
  model.fetch(`/getTemplate?path=${path}`).then((res) => {
    content.innerHTML = res
  }).then(callback)
}

/**
 * Router config
 */
page('/', function(context) {
  renderContent(context.path)
})
page('/bootstrap', function(context) {
  renderContent(context.path)
})
page('/components/:component', function(context) {
  renderContent(context.path, function() {
    require.ensure([], function (require) {
      require(`./components/${context.params.component}.jsx`).default()
    })
  })
})

window.onpopstate = e => {
  page(e.state.path)
}

page(location.pathname)