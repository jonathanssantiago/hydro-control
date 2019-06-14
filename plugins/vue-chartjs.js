import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    props: ['data', 'options'],
    mounted () {
        this.renderChart(this.data, this.options)
    },
    watch: {
        data(val){
            console.log(val)
            this.$data._chart.update();
        }
    }
}
