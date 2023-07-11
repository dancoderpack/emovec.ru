<template>
  <div class="home">
    <div class="home__left-side">
      <div class="home__left-side-container">
        <h1>YOUR MUSICAL<br>EXPERIENCE</h1>
        <div class="player">
          <p class="player__title">{{ playerSongTitle }}</p>
          <img class="player__img"
               :class="{'player__img_invisible': playerArtwork === undefined}"
               :src="playerArtwork" alt="Player artwork">
          <div class="player__controls-container">
            <div class="player__buttons">
              <img class="player__back"
                   src="@/assets/icons/rewind.svg"
                   alt="rewind"
                   @click="this.onClickBack">
              <img class="player__play-pause"
                   :src="require('@/assets/icons/' + (this.isPlaying ? 'pause' : 'play') + '.svg')"
                   alt="play/pause"
                   @click="this.togglePlayPause">
              <img class="player__forward"
                   src="@/assets/icons/rewind.svg"
                   alt="rewind"
                   @click="this.onClickForward">
            </div>
            <div class="player__seek-bar">
              <div class="player__seek-bar-progress"
                   :style="{width: this.seekBarPercent + '%'}"></div>
            </div>
            <p class="player__time">{{ playerTime }}</p>
          </div>
        </div>
      </div>
      <div class="tabs">
        <h1 class="tab"
            :class="{'tab_selected': this.currentTab === 'library'}"
            @click="this.onClickLibraryTab">LIBRARY</h1>
        <h1 class="tab"
            :class="{'tab_selected': this.currentTab === 'recommended'}"
            @click="this.onClickRecommendedTab">RECOMMENDED</h1>
      </div>
      <div class="music-list-controls">
        <div class="random-button" @click="this.onClickRandomButton">
          <img src="@/assets/icons/mix.svg" alt="mix">
          <p>Random tracks</p>
        </div>
      </div>
      <div class="music-list-container">
        <div class="music-list">
          <MusicItem v-for="(song, index) in this.displayedSongs"
                     :key="song.id"
                     :song="song"
                     :index="index"
                     v-on:click-play-btn="this.play"/>
        </div>
      </div>
    </div>
    <div class="home__right-side">
      <MusicCard
        v-for="song in this.favourites"
        :key="song.id"
        :song="song"
        :is-playing="this.playingSong !== undefined &&
        this.playingSong.id === song.id && this.isPlaying"
        v-on:on-click-play-btn="this.onClickMusicCardPlayButton"/>
    </div>
  </div>
</template>

<style lang="scss">
.random-button {
  display: flex;
  align-content: center;
  align-items: center;
  gap: 16px;

  &:hover {
    opacity: 80%;
    cursor: pointer;
  }
}

.tab {
  opacity: 50%;

  &_selected {
    opacity: 100%;
  }

  &:hover {
    scale: 98%;
    cursor: pointer;
  }
}

.music-list-controls {
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: right;
}

.tabs {
  display: flex;
  flex-direction: row;
  gap: 64px;
}

@media (max-width: 512px) {
  .music-list-controls {
    justify-content: left;
    margin-left: 4px;
  }
  .tabs {
    flex-direction: column;
    margin-left: 0;
    gap: 16px
  }
  .home {
    display: flex;
    flex-direction: column;

    &__left-side {
      order: 2;
    }

    &__left-side-container {
      margin-left: 0;
    }

    &__right-side {
      order: 1;
    }
  }
  .music-list-container {
    margin-left: 0;
  }
}

.music-list-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  height: 100%;

  .music-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    height: 100%;
  }
}

h1 {
  font-size: 46px;
  font-weight: 700;
  text-align: left;
  grid-area: a;
}

.home {
  display: flex;
  width: 100%;
  justify-content: center;

  &__left-side {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 36px;
    max-width: 1024px;
    padding: 64px;

    &-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
  }

  &__right-side {
    width: 360px;
    display: flex;
    flex-direction: column;
    padding: 64px;
    gap: 64px;
  }
}

.player {
  display: grid;
  grid-template-areas:
    "a a"
    "b c";
  grid-template-columns: 64px 1fr;
  grid-template-rows: 32px 64px;
  align-items: center;
  column-gap: 32px;
  row-gap: 12px;
  grid-area: b;

  &__controls-container {
    display: flex;
    gap: 16px;
    grid-area: c;
    align-items: center;
  }

  &__buttons {
    display: flex;
    gap: 8px;
  }

  &__img {
    display: block;
    width: 64px;
    height: 64px;
    object-fit: cover;
    grid-area: b;
    border-radius: 12px;

    &_invisible {
      display: none;
    }
  }

  &__title {
    grid-area: a;
    text-align: left;
    font-size: 16px;
  }

  &__forward {
    rotate: 180deg;

    &:hover {
      opacity: 80%;
      cursor: pointer;
    }
  }

  &__back {
    &:hover {
      opacity: 80%;
      cursor: pointer;
    }
  }

  &__play-pause {
    width: 40px;
    height: 40px;

    &:hover {
      opacity: 80%;
      cursor: pointer;
    }
  }

  &__seek-bar {
    display: flex;
    width: 70%;
    height: 8px;
    border-radius: 4px;
    background-color: rgba(217, 217, 217, 0.1);
    align-items: center;
    padding: 0 2px;

    &-progress {
      height: 4px;
      border-radius: 2px;
      background-color: rgba(217, 217, 217, 1);
      transition: width 0.5s ease-out;
    }
  }
}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import MusicCard from '@/components/MusicCard.vue';
import MusicItem from '@/components/MusicItem.vue';
import { Song } from '@/models/Song';

@Options({
  components: {
    MusicCard,
    MusicItem,
  },
  data() {
    return {
      allSongs: [] as Song[],
      recommendedSongs: [] as Song[],
      displayedSongs: [] as Song[],
      currentTab: 'library',
      playingSong: undefined,
      audio: new Audio(),
      isPlaying: false,
      currentTime: 0,
    };
  },
  methods: {
    onClickRandomButton() {
      this.$store.commit('clearFavourites');
      this.recommendedSongs = [];
      this.getRandomTracks();
    },
    getRandomTracks() {
      axios.get('https://api.emovec.ru/library')
        .then((response) => {
          this.allSongs = response.data;
          this.onClickLibraryTab();
        });
    },
    startSeekBarUpdates() {
      setInterval(() => {
        this.currentTime = this.audio.currentTime;
      }, 500);
    },
    play(song: Song) {
      if (this.isPlaying) {
        this.audio.pause();
      }
      console.log(song);
      this.playingSong = song;
      this.audio = new Audio(song.file);
      this.audio.play();
      this.isPlaying = true;
    },
    onClickForward() {
      if (this.playingSong !== undefined) {
        this.audio.fastSeek(this.audio.currentTime + 10);
        this.currentTime = this.audio.currentTime;
      }
    },
    onClickBack() {
      if (this.playingSong !== undefined) {
        this.audio.fastSeek(this.audio.currentTime - 10);
        this.currentTime = this.audio.currentTime;
      }
    },
    onClickMusicCardPlayButton(song: Song) {
      if (this.playingSong.id === song.id) {
        this.togglePlayPause();
      } else {
        this.play(song);
      }
    },
    togglePlayPause() {
      if (this.playingSong === undefined) {
        return;
      }
      if (this.audio.paused) {
        this.audio.play();
        this.isPlaying = true;
      } else {
        this.audio.pause();
        this.isPlaying = false;
      }
    },
    onClickRecommendedTab() {
      this.currentTab = 'recommended';
      this.displayedSongs = this.recommendedSongs;
    },
    onClickLibraryTab() {
      this.currentTab = 'library';
      this.displayedSongs = this.allSongs;
    },
    updateRecommendation() {
      const ids: string[] = this.favourites.map((song: Song) => song.id);
      if (ids.length > 0) {
        axios.post('https://api.emovec.ru/recommendation', { ids })
          .then((response) => {
            this.recommendedSongs = response.data.songs;
          });
      }
    },
  },
  mounted() {
    this.getRandomTracks();
    this.startSeekBarUpdates();
  },
  computed: {
    favourites() {
      return this.$store.getters.favouriteSongs;
    },
    playerSongTitle() {
      if (this.playingSong === undefined) {
        return 'Select music from list below';
      }
      const delimeter = ' - ';
      return this.playingSong.artist + delimeter + this.playingSong.title;
    },
    playerTime() {
      const minutes = Math.floor(this.currentTime.toFixed() / 60)
        .toString();
      let seconds = (this.currentTime.toFixed() % 60).toString();
      if (seconds.length === 1) {
        seconds = 0 + seconds;
      }
      const delimeter = ':';
      return minutes + delimeter + seconds;
    },
    playerArtwork() {
      if (this.playingSong === undefined) {
        return undefined;
      }
      return this.playingSong.artwork;
    },
    seekBarPercent() {
      if (this.playingSong === undefined) {
        return 0;
      }
      return (this.currentTime / this.audio.duration) * 100;
    },
  },
  watch: {
    favourites(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.updateRecommendation();
      }
    },
  },
})
export default class HomeView extends Vue {
}
</script>
