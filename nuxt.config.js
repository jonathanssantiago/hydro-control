module.exports = {
    head: {
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Nuxt.js project'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
    ** Global CSS
    */
    css: [
        {
            src: 'assets/css/main.css',
        }
    ],
    plugins: [
        { src: '~plugins/vue-chartjs.js', ssr: false },
    ],
    modules: ['~/io', '@nuxtjs/vuetify'],
    env: {
        WS_URL: process.env.WS_URL || 'http://127.0.0.1:3000'
    },
    vuetify: {}
}
