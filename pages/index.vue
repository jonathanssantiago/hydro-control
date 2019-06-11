<template>
    <div>
        <v-toolbar
                color="indigo darken-4"
                dark
                fixed
                app
                clipped-right
        >
            <v-toolbar-title>HYDRO CONTROL</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-layout row wrap>
                <v-flex xs12 md4 lg3>
                    <v-card class="elevation-7" height="90vh">
                        <v-card-text primary-title>
                            <div class="text-xs-center">
                                <span style="cursor: pointer;"><v-icon x-large left>keyboard_arrow_left</v-icon></span>
                                <span><b style="font-size: 20pt;">DIÁRIO</b></span>
                                <span style="cursor: pointer;"><v-icon x-large
                                                                       right>keyboard_arrow_right</v-icon></span>
                            </div>
                        </v-card-text>
                        <v-divider/>
                        <v-card-text primary-title>
                            <h1 class="text-xs-center" style="font-size: 50pt">{{vazao}} m3</h1>
                        </v-card-text>
                        <v-divider/>
                        <v-card-text primary-title>
                            <h1 class="text-xs-center" style="font-size: 50pt">R$ {{preco}}</h1>
                        </v-card-text>
                        <v-divider/>
                    </v-card>
                </v-flex>
                <v-flex xs12 md7 lg7 offset-lg1 offset-md1>
                    <v-card class="elevation-7 mt-2" height="30vh">
                        <v-card-title primary-title>
                            <h1>Avisos</h1>
                        </v-card-title>

                        <v-card-text primary-title>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard
                                dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was popularised
                                in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </v-card-text>

                        <v-card-title primary-title>
                            <div>
                            </div>
                        </v-card-title>
                    </v-card>

                    <v-card class="elevation-7 mt-3" height="56vh">
                        <v-card-title primary-title>
                            <div class="text-xs-center">
                                <h1>Gráfico</h1>
                            </div>
                        </v-card-title>

                    </v-card>
                </v-flex>
            </v-layout>
        </v-content>
        <v-footer color="indigo darken-4" class="white--text" app>
            <span class="pl-4">INOVATECH</span>
            <v-spacer></v-spacer>
            <span class="pr-4">&copy; Hydro Control 2019</span>
        </v-footer>
    </div>
</template>

<script>
    import axios from '~/plugins/axios'
    import socket from '~/plugins/socket.io.js'

    export default {
        data() {
            return {
                preco: 0,
                vazao: 0
            }
        },
        watch: {
            messages(val) {
                console.log(val);
            }
        },
        beforeMount() {
            socket.on('teste', (data) => {
                this.preco = data.preco;
                this.vazao = data.vazao;
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
