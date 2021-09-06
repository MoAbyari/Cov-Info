<template lang='html'>
    <div>
        <Header />
        <hr>
        <CasesInfo />
        <hr>
        <VaccinatedChart />

    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import CasesInfo from '@/components/CasesInfo.vue';
import VaccinatedChart from '@/components/VaccinatedChart.vue';

export default {
    name: 'Home',
    components: {
        Header,
        CasesInfo,
        VaccinatedChart,
    }
}
</script>

<style scoped>

</style>
