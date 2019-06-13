<template>
    <div>
        <v-toolbar
                color="blue lighten-1"
                dark
                fixed
                app
                clipped-right
        >
            <v-toolbar-title>
                Hydro Control
            </v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-layout row wrap>
                <v-flex xs12 md5 lg4>
                    <v-card class="elevation-7" height="100vh" style="background-color:#BBDEFB">
                        <v-card-text primary-title>
                            <div class="text-xs-center">
                                <span style="cursor: pointer;" @click="prev"><v-icon x-large
                                                                                     left>keyboard_arrow_left</v-icon></span>
                                <span><b style="font-size: 20pt;" v-if="tipo === 1">DIÁRIO</b></span>
                                <span><b style="font-size: 20pt;" v-if="tipo === 2">SEMANAL</b></span>
                                <span><b style="font-size: 20pt;" v-if="tipo === 3">MENSAL</b></span>
                                <span style="cursor: pointer;" @click="next"><v-icon x-large
                                                                                     right>keyboard_arrow_right</v-icon></span>
                            </div>
                        </v-card-text>
                        <v-divider/>
                        <v-card-text primary-title>
                            <span v-if="tipo === 1">
                                <h1 class="text-xs-center" style="font-size: 50pt">{{atual.vazao}} m3</h1>
                            </span>
                            <span v-if="tipo === 2">
                                <h1 class="text-xs-center" style="font-size: 50pt">{{semanal.vazao}} m3</h1>
                            </span>
                            <span v-if="tipo === 3">
                                <h1 class="text-xs-center" style="font-size: 50pt">{{mensal.vazao}} m3</h1>
                            </span>
                        </v-card-text>
                        <v-divider/>
                        <v-card-text primary-title>
                            <span v-if="tipo === 1">
                                <h1 class="text-xs-center" style="font-size: 50pt">R$ {{atual.preco}}</h1>
                            </span>
                            <span v-if="tipo === 2">
                                <h1 class="text-xs-center" style="font-size: 50pt">R$ {{semanal.preco}}</h1>
                            </span>
                            <span v-if="tipo === 3">
                                <h1 class="text-xs-center" style="font-size: 50pt">R$ {{mensal.preco}}</h1>
                            </span>
                        </v-card-text>
                        <v-divider/>
                        <v-card-text>
                            <div class="text-xs-center">
                                <img src="~/assets/logo.gif" alt="" width="250" height="250" style="padding: 1rem">
                            </div>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12 md6 lg6 offset-lg1 offset-md1>
                    <v-card class="elevation-7 mt-2" height="30vh">
                        <v-card-title primary-title>
                            <h1>Avisos</h1>
                        </v-card-title>

                        <v-card-text primary-title>
                            <h3>
                                <v-icon>warning</v-icon>
                                Problemas nos encanamentos, vazamentos pequenos em canos
                                podem desperdiçar mais de 5000 litros de água a longo prazo.
                            </h3>
                        </v-card-text>

                        <v-card-title primary-title>

                        </v-card-title>
                    </v-card>

                    <v-card class="elevation-7 mt-3" height="53vh">
                        <v-card-title primary-title>
                            <div class="text-xs-center">
                                <h1>Gráfico</h1>

                                <LineChart :width="900" :height="400" :data="getChartDiario"
                                           :options="{ maintainAspectRatio: false, responsive: true}"
                                ></LineChart>
                            </div>
                        </v-card-title>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-content>
    </div>
</template>

<script>
    import axios from '~/plugins/axios'
    import socket from '~/plugins/socket.io.js'
    import LineChart from '~/components/LineChart'

    export default {
        components: {
            LineChart
        },
        data() {
            return {
                datacollection: null,
                tipo: 1,
                atual: {
                    preco: 0,
                    vazao: 0,
                },
                semanal: {
                    preco: 0,
                    vazao: 0
                },
                mensal: {
                    preco: 0,
                    vazao: 0
                }
            }
        },
        computed: {
            getChartDiario() {
                return this.datacollection;
            }
        },
        mounted() {
            this.fillData();
        },
        methods: {
            next() {
                if (this.tipo < 3) {
                    this.tipo++;
                }
            },
            prev() {
                if (this.tipo > 1) {
                    this.tipo--;
                }
            },

            fillData(valorPreco, vazao) {
                this.datacollection = {
                    labels: valorPreco,
                    datasets: [
                        {
                            label: 'Atual',
                            backgroundColor: '#75b9f8',
                            data: vazao
                        }
                    ]
                }
            },
            getRandomInt() {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5
            },
            getRandomFloat() {
                return (Math.random() * (50 - 5 + 1) + 5).toFixed(2)
            }
        },
        beforeMount() {
            setInterval(() => {
                let valorPreco = [this.getRandomFloat(), this.getRandomFloat(), this.getRandomFloat(), this.getRandomFloat(), this.getRandomFloat()];
                let valorVazao = [this.getRandomInt(), this.getRandomInt(),this.getRandomInt(), this.getRandomInt(), this.getRandomInt()];

                this.fillData(valorPreco, valorVazao);
            }, 1000);

            socket.on('atual', (data) => {
                this.atual.preco = data.preco;
                this.atual.vazao = data.vazao;

                // this.fillData(data, valorVazao);
            });

            socket.on('semanal', (data) => {
                this.semanal.preco = data.preco;
                this.semanal.vazao = data.vazao;
            })

            socket.on('mensal', (data) => {
                this.mensal.preco = data.preco;
                this.mensal.vazao = data.vazao;
            })
        },
        async asyncData() {
            let {data} = await axios.get('/api/users')
            return {users: data}
        },
        head() {
            return {
                title: 'Hydro Control'
            }
        }
    }
</script>

<style scoped>
    .line-chart {
        position: fixed;
        left: 10%;
        top: 10%;
        width: 100%;
        height: 100%;
    }
</style>
