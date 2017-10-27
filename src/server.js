import express from 'express'
import compression from 'compression'
import path from 'path'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import Promise from 'bluebird'
import _ from 'lodash'
import { parse } from './core/query-string'
import Context from './core/context'
import config from '../tools/config'
import assets from './assets-loader'
import createApp from './create-app'
import { createRenderer } from 'vue-server-renderer'
import template from './template'

import http from 'http'
import https from 'https'

http.globalAgent.keepAlive = true
http.globalAgent.keepAliveMsecs = 60 * 1000

https.globalAgent.keepAlive = true
https.globalAgent.keepAliveMsecs = 60 * 1000

let consoleLogger = console

const PORT = process.env.PORT || config.backendPort || 9000
const app = express()

// setup query parser
app.set('query parser', parse)

app.use(helmet())
app.use(compression())

// serve static resources
if (__DEV__) {
  app.use(express.static(path.join(__dirname, 'public')))
}
if (!__DEV__) {
  app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '5d'
  }))
}

// setup body-parser
app.use(bodyParser.json({limit: '5000kb'}))
app.use(bodyParser.raw({limit: '5000kb'}))
app.use(bodyParser.urlencoded({extended: false, limit: '5000kb'}))
app.use(bodyParser.text({type: 'text/xml'}))


app.use((req, res, next) => {
  let context = new Context()
  req.context = context
  next()
})

// attach apis
// require('./router-api')(app)

let renderer

if (!__BUILD__) {
  renderer = createRenderer(template.dev())
}
if (__BUILD__) {
  renderer = createRenderer(template.prod())
}

const preparePromises = (components, funcs) => {
  for (let i = 0; i < components.length; ++i) {
    let component = components[i]
    if (component.hooks && component.hooks.init) {
      funcs.push(component.hooks.init)
    }
    if (component.components) {
      preparePromises(_.values(component.components), funcs)
    }
  }
}

const render = (context, req) => {
  return new Promise((resolve, reject) => {
    const {app, router} = createApp()
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        let error = new Error()
        error.statusCode = 404
        reject(error)
        return
      }

      let asyncFetches = []
      preparePromises(matchedComponents, asyncFetches)

      Promise
        .map(asyncFetches, fetch => fetch({
          // route: router.currentRoute,
          req
        }))
        .then(() => {
          resolve(app)
        })
        .catch(reject)
    }, reject)
  })
}
//
app.get('*', (req, res, next) => {
  const context = {url: req.url}
  render(context, req)
    .then(app => {
      context.assets = assets
      renderer.renderToString(app, context, (err, html) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.send(html)
        }
      })
    })
    .catch(err => {
      if (__DEV__) {
        console.log('myerr', err) // eslint-disable-line
      }
      if (err.statusCode === 404) {
        console.log('404') // eslint-disable-line
        // res.redirect('/404')
      } else if (err.statusCode === 401) {
        console.log('401') // eslint-disable-line
        // res.status(401).send('401 Page')
        // TODO: render 401
      } else if (err.statusCode === 403) {
        console.log('403') // eslint-disable-line
        // res.status(403).send('403 Page')
        // TODO: render 403
      } else {
        console.log('500') // eslint-disable-line
        // res.redirect('/500')
      }
    })
})

app.listen(PORT, function (err) {
  if (err) {
    throw err
  }
  consoleLogger.log(`Listening at http://localhost:${PORT}/`) // eslint-disable-line
})
