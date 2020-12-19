const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})
const createApp = require('./component')


const context = {
  title: 'vue ssr',
  meta: `
      <meta name="keyword" content="vue,ssr">
      <meta name="description" content="vue srr demo">
  `,
};

server.get('*', (req, res) => {
  const app = createApp({url: req.url});

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      console.log(err);
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

server.listen(3000)