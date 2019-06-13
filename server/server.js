const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server)
const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'
const axios = require('axios');

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

io.on('connection',  (socket) => {
  let vazaoAtual = 0;
  let valorConsumoAtual = 0;
  let vazaoSemanal = 0;
  let valorConsumoSemanal = 0;
  let vazaoMensal = 0;
  let valorConsumoMensal = 0;

  setInterval(() => {
    axios.post('http://10.0.0.50/AppHydro/qtdLitros.php').then(data => {
      if (data.data != 0) {
        socket.broadcast.emit('atual', { preco: valorConsumoAtual, vazao: data.data })
        vazaoAtual = data.data;
      }
    });

    axios.post('http://10.0.0.50/AppHydro/valorConsumo.php').then(data => {
      if(data.data != 0){
        socket.broadcast.emit('atual', { preco: data.data, vazao: vazaoAtual })
        valorConsumoAtual = data.data;
      }
    });

    //semanal
    axios.post('http://10.0.0.50/AppHydro/qtdSemanal.php').then(data => {
      if (data.data != 0) {
        socket.broadcast.emit('semanal', { preco: valorConsumoSemanal, vazao: data.data })
        vazaoSemanal = data.data;
      }
    });

    axios.post('http://10.0.0.50/AppHydro/valorSemanal.php').then(data => {
      if (data.data != 0) {
        socket.broadcast.emit('semanal', { preco: data.data, vazao: vazaoSemanal })
        valorConsumo = data.data;
      }
    });

       //mensal

    axios.post('http://10.0.0.50/AppHydro/qtdMensal.php').then(data => {
      if (data.data != 0) {
        socket.broadcast.emit('mensal', { preco: valorConsumoMensal, vazao: data.data })
        vazaoMensal = data.data;
      }
    });

    axios.post('http://10.0.0.50/AppHydro/valorMensal.php').then(data => {
      if (data.data != 0) {
        socket.broadcast.emit('mensal', { preco: data.data, vazao: vazaoMensal })
        valorConsumoMensal = data.data;
      }
    });
    
  }, 2500)
});
