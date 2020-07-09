<template>
  <div>
    <b-carousel
      v-model="slide"
      :interval="0"
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333; padding-top: 15px; "
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd" 
    >
      <transition-group style="display: grid" tag="div" name="fade">
        <img 
          :src="require(`~/static/BrailleImages/${links[i]}`)"
          style="grid-area: 1 / 1; height: 50vh "
          v-for="(k,v,i) in links" :key="'trans-'+i" 
          v-show="i===slide" 
        />
      </transition-group>
      <b-carousel-slide 
        v-for="(v,i) in Object.keys(links)"
        :key="'carousel-'+i"
        style="min-height:50vh; height:auto !important"
      >
        <b-row>
          <div style="width: 90%">
            <h5 class="expHead">{{titles[i]}}</h5>
            <div class="expBody" v-html="text[i]">
            </div>
          </div>
        </b-row>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
import {titles, text, links} from "./Explanations.js"

export default {
  data() {
    return {
      links: links,
      titles: titles,
      text: text,
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart() { //slide
      this.sliding = true
    },
    onSlideEnd() { //slide
      this.sliding = false
    }
  }
}
</script>

<style>
.carousel-caption {
  right: 0px !important;
  bottom: auto !important;
  padding-top: 15px !important;
}

.carousel-inner {
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>