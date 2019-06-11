const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server)
const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

const api = require('./api');

// Import API Routes
app.use('/api', api);

var config = require('../nuxt.config.js')
config.dev = !isProd

const nuxt = new Nuxt(config)
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(nuxt.render);

server.listen(port, '127.0.0.1')
console.log('Server listening on localhost:' + port);

// Socket.io
const options = {
  host: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST'
};

const req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

io.on('connection', (socket) => {
  setInterval(() => {
    socket.broadcast.emit('teste', Math.random())
  }, 1000)
});
