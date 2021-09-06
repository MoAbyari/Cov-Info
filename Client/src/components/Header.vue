<template lang='html'>
    <div class="info-row">
        <sui-statistics-group>
            <sui-statistic in-group color="yellow">
                <sui-statistic-value style="font-size:2rem !important">
                    {{ info.Cases }}
                </sui-statistic-value>
                <sui-statistic-label>
                    total cases
                </sui-statistic-label>
            </sui-statistic>
            <sui-statistic in-group color="blue">
                <sui-statistic-value style="font-size:2rem !important">
                    {{ info.NewCases }}
                </sui-statistic-value>
                <sui-statistic-label>
                    new cases
                </sui-statistic-label>
            </sui-statistic>
            <sui-statistic in-group color="orange">
                <sui-statistic-value style="font-size:2rem !important">
                    {{ info.Deaths }}
                </sui-statistic-value>
                <sui-statistic-label>
                    total deaths
                </sui-statistic-label>
            </sui-statistic>
        </sui-statistics-group>
    </div>
</template>

<script>

import { api } from '../helpers/helpers'
// import { INFO } from '../helpers/constants';

export default {
    name: 'Header',
    data() {
        return {
            info: []
        }
    },
    async mounted() {
        this.info = await api.getInfo();
    }
}
</script>

<style scoped>
.info-row {
    display: flex;
    justify-content: center;
}

</style>
