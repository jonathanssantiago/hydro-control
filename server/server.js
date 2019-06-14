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

const host = "http://localhost/AppHydro";

io.on('connection',  (socket) => {
  let vazaoAtual = 0;
  let valorConsumoAtual = 0;
  let graficoAtual = [];
  let vazaoSemanal = 0;
  let valorConsumoSemanal = 0;
  let graficoSemanal = [];
  let vazaoMensal = 0;
  let valorConsumoMensal = 0;
  let graficoMensal = [];

  setInterval(() => {
    axios.post(`${host}/qtdLitros.php`).then(data => {
      if (data.data != 0) {
        socket.broadcast.emit('atual', { preco: valorConsumoAtual, vazao: data.data, grafico: graficoAtual});
        vazaoAtual = data.data;
      }
    });

    axios.post(`${host}/valorConsumo.php`).then(data => {
      if(data.data != 0){
        socket.broadcast.emit('atual', { preco: data.data, vazao: vazaoAtual, grafico: graficoAtual});
        valorConsumoAtual = data.data;
      }
    });

    axios.post(`${host}/consumo.php`).then(data => {

      if(data.data.length > 0){
        let v = data.data.map(v => Number(v.vazao * 1000).toFixed(1));
        socket.broadcast.emit('atual', { preco: valorConsumoAtual, vazao: vazaoAtual, grafico: v });
        graficoAtual = v;
      }
    });

    //semanal
    axios.post(`${host}/qtdSemanal.php`).then(data => {
      if (data.data != 0) {
        socket.broadcast.emit('semanal', { preco: valorConsumoSemanal, vazao: data.data, grafico: graficoSemanal })
        vazaoSemanal = data.data;
      }
    });

    axios.post(`${host}/valorSemanal.php`).then(data => {
      if (data.data != 0) {
        socket.broadcast.emit('semanal', { preco: data.data, vazao: vazaoSemanal, grafico: graficoSemanal})
        valorConsumoSemanal = data.data;
      }
    });

    axios.post(`${host}/semanalConsumo.php`).then(data => {
      if(data.data.length > 0){
        let v = data.data.map(v => Number(v.vazao * 1000).toFixed(1));
        socket.broadcast.emit('atual', { preco: valorConsumoSemanal, vazao: vazaoSemanal, grafico: v });
        graficoSemanal = v;
      }
    });

       //mensal
    axios.post(`${host}/qtdMensal.php`).then(data => {
      if (data.data != 0) {
        socket.broadcast.emit('mensal', { preco: valorConsumoMensal, vazao: data.data, grafico: graficoMensal })
        vazaoMensal = data.data;
      }
    });

    axios.post(`${host}/valorMensal.php`).then(data => {
      if (data.data != 0) {
        socket.broadcast.emit('mensal', { preco: data.data, vazao: vazaoMensal, grafico: graficoMensal });
        valorConsumoMensal = data.data;
      }
    });

    axios.post(`${host}/mensalConsumo.php`).then(data => {
      if(data.data.length > 0){
        let v = data.data.map(v => Number(v.vazao * 1000).toFixed(1));
        socket.broadcast.emit('atual', { preco: valorConsumoMensal, vazao: vazaoMensal, grafico: v });
        graficoMensal = v;
      }
    });

  }, 2000)
});
