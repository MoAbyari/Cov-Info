<template>
    <div class="info-section">
        <div class="logo">
            <img src="../assets/logo.png" alt="logo">
            <p>NSW COVID information website</p>
        </div>
        <h2 class="title" >NSW COVID Info</h2>
        <div class="section">
            <div class="info-wrapper">
                <div class="card green">
                    <p>Today's cases</p>
                    <strong>{{ info.NewCases }}</strong>
                </div>
                <div class="card blue card-margin">
                    <p>Total cases</p>
                    <strong>{{ info.Cases }}</strong>
                </div>
                <div class="card pink">
                    <p>Total deaths</p>
                    <strong>{{ info.Deaths }}</strong>
                </div>
            </div>

            <div class="show-more">
                <button 
                v-on:click="toggleShowMore">
                    <span v-if="showMore" class="show-less-toggle toggle">
                        show less
                        <img src="../assets/down-chevron.png" alt="more">
                    </span>
                    <span v-else class="show-more-toggle toggle">
                        show more
                        <img src="../assets/down-chevron.png" alt="less">
                    </span>
                </button>
            </div>

            <div class="more-info" v-bind:class="{ hideContent: !showMore }">
                <div class="card">
                    <p>
                        <img class="icon" src="../assets/Hospital.png" alt="hospital-icon">
                        Cases in hospital
                    </p>
                    <strong>{{ info.concurrentHospitalisations }}</strong>
                </div>
                <div class="card card-margin">
                    <p>
                        <img class="icon" src="../assets/ICU.png" alt="ICU-icon">
                        Cases in ICU
                    </p>
                    <strong>{{ info.concurrentHospitalisationsIcu }}</strong>
                </div>
                <div class="card">
                    <p>
                        <img class="icon" src="../assets/Tested.png" alt="tested-icon">
                        Today's tested
                    </p>
                    <strong>{{ info.Test_24hrs }}</strong>
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>

import { api } from '../helpers/helpers'

export default {
    name: 'Header',
    data() {
        return {
            info: [],
            showMore: false
        }
    },
    methods: {
        toggleShowMore: function() {
            this.showMore = !this.showMore;
        }
    },
    async mounted() {
        this.info = await api.getInfo();
    }
}
</script>

<style scoped>
.info-section {
    background-color: #0058A9;
    color: white;
    padding-top: 60px;
}

@media screen and (min-width: 800px) {
    .more-info {
        display: flex !important;
    }

    .info-wrapper {
        display: flex;
    }

    .card-margin {
        margin: 0 20px;
    }

    .show-more {
        display: none !important;
    }
}

.hideContent {
   display: none;
}

.logo {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.logo img {
    width: 100px;
    text-align: center;
}

.section {
    padding: 0 29px;
    padding-bottom: 21px;
}

.title {
    font-size: 21px;
    margin-top: 50px;
    margin-bottom: 18px;
    text-align: center;
}

.card {
    background-color: white;
    border-radius: 15px;
    display: flex;
    color: black;
    padding: 0 20px;
    height: 82px;
    margin-bottom: 22px;
    align-items: center;
    flex: 1;
}

.green {
    background-color: #E1FAD8;
}

.blue {
    background-color: #CDFFF9;
}

.pink {
    background-color: #FFEEEE;
}

.card p {
    margin: 0;
    flex: 1;
    font-size: 18px;
    display: flex;
    align-items: center;
}

.icon {
    width: 32px;
    margin-right: 5px;
}

.card strong {
    font-size: 24px;
}

.show-more {
    display: flex;
    justify-content: flex-end;
}

.show-more button {
    background: none;
    border: 0;
    color: white;
}

.more-info {
    margin-top: 20px;
}

.toggle {
    display: flex;
    align-items: center;
}

.show-less-toggle img {
    transform: rotateZ(180deg);
    transition: 300ms linear;
    margin-left: 5px;
}

.show-more-toggle img {
    transform: rotateZ(0deg);
    transition: 300ms linear;
    margin-left: 5px;
}
</style>
