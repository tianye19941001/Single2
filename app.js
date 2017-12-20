const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const cors = require('koa2-cors');
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const session = require("koa-session2")
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const api = require('./routes/api')
const res_format = require('./middlewares/res_format')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// Cros
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://172.16.118.200:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// session
app.use(session({
    key: "SESSIONID",   //default "koa:sid"
}));

// routes
app.use(res_format('^/api'))
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
app.use(api.routes(), api.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
