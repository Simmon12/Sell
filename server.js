var express = require('express')
var config = require('./config/index')


var port = process.env.PORT || config.build.port
var app = express()

var router = express.Router()
router.get('/',  (req, res, next) => {
  req.url = '/index.html'
  next()
})
app.use(router)

var appData = require('./data.json')
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;
var apiRoutes = express.Router()
app.use('/api', apiRoutes)

app.get('/api/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  })  // 接口返回json数据，上面配置的数据appData就赋值给data请求后调用
}),
app.get('/api/goods', (req, res) => {
  res.json({
    errno: 0,
    data: goods
  })
}),
app.get('/api/ratings', (req, res) => {
  res.json({
    errno: 0,
    data: ratings
  })
})

app.use(express.static('./dist'))

module.exports = app.listen(port,(err) => {
  if(err) {
    console.log(err)
    return
  }
  console.log("listen at 9000")
} )
