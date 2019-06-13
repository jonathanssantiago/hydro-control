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
                                <span style="cursor: pointer;" @click="prev"><v-icon x-large left>keyboard_arrow_left</v-icon></span>
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
                            <p>
                            <v-icon>warning</v-icon>   Problemas nos encanamentos, vazamentos pequenos em canos
                               podem desperdiçar mais de 5000 litros de água a longo prazo.
                            </p>
                        </v-card-text>

                        <v-card-title primary-title>
                            <div>
                            </div>
                        </v-card-title>
                    </v-card>

                    <!-- <v-card class="elevation-7 mt-3" height="53vh">
                        <v-card-title primary-title>
                            <div class="text-xs-center">
                                <h1>Gráfico</h1>


                                dasdas
                            </div>
                        </v-card-title> 
                    </v-card>-->
                </v-flex>
            </v-layout>
        </v-content>
    </div>
</template>

<script>
    import axios from '~/plugins/axios'
    import socket from '~/plugins/socket.io.js'

    export default {
        data() {
            return {
                tipo: 1,
                atual: {                        
                    preco: 0,
                    vazao: 0
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
        watch: {
            messages(val) {
                console.log(val);                                                                                                                                                                                                                                                                       
            }
        },
        methods:{
            next(){
                if(this.tipo < 3){
                    this.tipo++;
                }
            },
             prev(){
                if(this.tipo > 1){
                    this.tipo--;
                }
            }
        },
        beforeMount() {
            socket.on('atual', (data) => {
                this.atual.preco = data.preco;
                this.atual.vazao = data.vazao;
            })

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

    .title {
        font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
        display: block;
        font-weight: 300;
        font-size: 100px;
        color: #35495e;
        letter-spacing: 1px;
    }

    .subtitle {
        font-weight: 300;
        font-size: 42px;
        color: #526488;
        word-spacing: 5px;
        padding-bottom: 15px;
    }

    .users {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .user {
        margin: 10px 0;
    }

    .button, .button:visited {
        display: inline-block;
        color: black;
        letter-spacing: 1px;
        background-color: #fff;
        border: 2px solid #000;
        text-decoration: none;
        text-transform: uppercase;
        padding: 15px 45px;
    }

    .button:hover, .button:focus {
        color: #fff;
        background-color: #000;
    }
</style>
