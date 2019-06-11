<template>
    <div>
        <v-toolbar
                color="blue darken-2"
                dark
                fixed
                app
                clipped-right
        >
            <v-toolbar-title>HYDRO CONTROL</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-layout>
                <v-flex xs6 lg3>
                    <v-card class="elevation-7" height="90vh">
                        <v-card-title primary-title>
                            <div class="headline">
                                <!--                                <div class="headline">VAZÃO</div>-->
                                <span>150 M/S</span> / <span>R$ 150.00</span>

                            </div>
                        </v-card-title>

                        <v-card-title primary-title>
                            <div>
                            </div>
                        </v-card-title>
                    </v-card>
                </v-flex>
                <v-flex xs6 lg9>

                </v-flex>
            </v-layout>
        </v-content>
        <v-footer color="blue darken-2" class="white--text" app>
            <span>INOVATECH</span>
            <v-spacer></v-spacer>
            <span>&copy; 2019</span>
        </v-footer>
    </div>
</template>

<script>
    import axios from '~/plugins/axios'
    import socket from '~/plugins/socket.io.js'

    export default {
        data() {
            return {
                messages: []
            }
        },
        watch: {
            messages(val) {
                console.log(val);
            }
        },
        beforeMount() {
            socket.on('teste', (message) => {
                console.log(message);
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
