// You can run this in node and it will log in the terminal
// Step 1: Create a Vue instance
const Vue = require('vue')
const app = new Vue({
  template: `<div>Hello World</div>`
})

// Step 2: Create a renderer
const renderer = require('vue-server-renderer').createRenderer()

// Step 3: Render the Vue instance to HTML
renderer.renderToString(app, (err, html) => {
  if (err) throw err
  console.log(html)
  // => <div data-server-rendered="true">Hello World</div>
})

// in 2.5.0+, returns a Promise if no callback is passed:
renderer.renderToString(app).then(html => {
  console.log(html)
}).catch(err => {
  console.error(err)
})

const rendererWithTemplate = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})


rendererWithTemplate.renderToString(app, (err, html) => {
  console.log(html) // will be the full page with app content injected.
})

const rendererWithInlineTemplate = require('vue-server-renderer').createRenderer({
  template: `inline template here --> <!--vue-ssr-outlet-->`
})

rendererWithInlineTemplate.renderToString(app, (err, html) => {
  console.log(html) // will be the full page with app content injected.
})