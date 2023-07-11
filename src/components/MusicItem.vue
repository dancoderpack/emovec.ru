<template>
  <div class="music-item">
    <p class="music-item__number">{{ index + 1 }}</p>
    <div class="music-item__cover" :style="{backgroundImage: `url(${song.artwork})`}">
      <img class="music-item__cover-button"
           src="@/assets/icons/lite-play.svg"
           alt="Play button"
           @click="this.onClickPlayButton">
    </div>
    <div class="music-item__content">
      <p class="music-item__title">{{ song.title }}</p>
      <p class="music-item__artist">{{ song.artist }}</p>
    </div>
    <p class="music-item__explore" @click="this.onClickExplore">explore</p>
    <img class="music-item__fav-btn"
         :class="{ 'jump-animation': this.isJumping,
         'music-item__fav-btn_selected': this.isFavourite }"
         :src="this.isFavourite ?
         require('@/assets/icons/colored_star.svg') : require('@/assets/icons/star.svg')"
         alt="Favourite button"
         @click="this.onClickStarButton"/>
  </div>
</template>

<style scoped lang="scss">
.music-item {
  display: flex;
  gap: 28px;
  align-items: center;
  border-radius: 24px;
  padding: 8px 16px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);

    .music-item__cover-button {
      display: block;
    }
  }

  &__cover {
    display: flex;
    width: 64px;
    aspect-ratio: 1;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center;

    &:hover {
      cursor: pointer;
    }

    &-button {
      display: none;
      width: 24px;
      height: 24px;
      opacity: 80%;
    }
  }

  &__number {
    text-align: left;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  &__title {
    text-align: left;
    font-size: 16px;
    font-weight: 700;
  }

  &__artist {
    text-align: left;
    font-size: 12px;
  }

  &__explore {
    font-size: 12px;

    &:hover {
      opacity: 80%;
      cursor: pointer;
    }
  }

  &__fav-btn {
    width: 24px;
    height: 24px;
    opacity: 80%;

    &:hover {
      cursor: pointer;
      opacity: 100%;
    }

    &_selected {
      opacity: 100%;

      &:hover {
        opacity: 80%;
      }
    }
  }
}

@media (max-width: 512px) {
  .music-item {
    &__number {
      display: none;
    }
  }
}

.jump-animation {
  animation: jump 0.5s linear;
}

@keyframes jump {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Song } from '@/models/Song';

@Options({
  props: {
    song: {
      type: Object as () => Song,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isJumping: false,
    };
  },
  methods: {
    onClickStarButton() {
      if (this.isFavourite) {
        this.$store.commit('removeFromFavourites', this.song.id);
      } else {
        this.$store.commit('addToFavourites', this.song);
      }
      this.isJumping = true;
      setTimeout(() => {
        this.isJumping = false;
      }, 500);
    },
    onClickPlayButton() {
      this.$emit('click-play-btn', this.song);
    },
    onClickExplore() {
      this.$router.push({
        name: 'music',
        params: { id: this.song.id },
      });
    },
  },
  computed: {
    isFavourite(): boolean {
      const favourites = this.$store.state.favourites as Song[];
      return favourites.some((song) => song.id === this.song.id);
    },
  },
})
export default class MusicCard extends Vue {
}
</script>
