<template>
  <div class="music-info">
    <p :class="{'hidden': !this.isLoading}">Загрузка...</p>
    <div class="container" :class="{'hidden': this.isLoading}">
      <div class="top-block">
        <NumericalStat title="STD arousal" :value="this.stats.std_arousal"/>
        <NumericalStat title="STD valence" :value="this.stats.std_valence"/>
        <NumericalStat title="QC arousal" :value="this.stats.qc_arousal"/>
        <NumericalStat title="QC valence" :value="this.stats.qc_valence"/>
      </div>
      <div class="bottom-block">
        <div class="bottom-block__left">
          <div class="pie-chart-container">
            <PieCharts/>
          </div>
          <div class="text-container">
            <GPT/>
          </div>
        </div>
        <div class="bottom-block__right">
          <div class="coordinates-container">
            <CoordinatesSystem/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@media (max-width: 512px) {
}

.hidden {
  display: none;
}

.music-info {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 100%;
  aspect-ratio: 68/37;
  max-width: 1366px;
}

.top-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 15%;
  //background-color: #160A22;
}

.bottom-block {
  display: flex;
  width: 100%;
  height: 85%;
  //background-color: #42b983;
  &__left {
    width: 50%;
    padding: 4% 2%;
    gap: 8%;
    display: flex;
    flex-direction: column;
    //background-color: #311B4E;
  }

  &__right {
    display: flex;
    width: 50%;
    height: 100%;
    padding: 4% 2%;
  }
}

.pie-chart-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60%;
  //background-color: blue;
}

.text-container {
  height: 40%;
  //background-color: brown;
}

.coordinates-container {
  width: 100%;
  height: 83%;
}
</style>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NumericalStat from '@/components/NumericalStat.vue';
import PieCharts from '@/components/PieCharts.vue';
import GPT from '@/components/GPT.vue';
import CoordinatesSystem from '@/components/CoordinatesSystem.vue';
import axios from 'axios';

@Options({
  components: {
    NumericalStat,
    PieCharts,
    GPT,
    CoordinatesSystem,
  },
  data() {
    return {
      isLoading: true,
      stats: {
        mean_arousal: 0,
        mean_valence: 0,
        qc_arousal: 0,
        qc_valence: 0,
        std_arousal: 0,
        std_valence: 0,
      },
      avd_vector: undefined,
    };
  },
  mounted() {
    axios.post('https://api.emovec.ru/predictValuesDemo', { id: this.$route.params.id })
      .then((response) => {
        this.stats = response.data.stats;
        this.isLoading = false;
      });
  },
})
export default class MusicInfo extends Vue {
}
</script>
