<template>
  <scroller ref="scroller" :maxIndex="Object.keys(links).length-1" v-slot="slotProps">
    <!--<img  height="200" :src="require(`~/static/BrailleImages/${links[slotProps.index]}`)"/>-->
    <b-container fluid>
      <b-row align-v="center">
        <b-col cols="4" style="padding: 0">
          <b-list-group>
            <b-list-group-item 
              v-for="(v,i) in Object.keys(links)"
              @click="$refs.scroller.setIndex(i)" 
              :key="'pick-'+i" 
              :active="i===slotProps.index"> 
                Step {{+i+1}}
            </b-list-group-item>
          </b-list-group>
        </b-col>

        <b-col cols="8" style="overflow: hidden">
          <transition-group class="container_row" tag="div" name="fade">
            <img 
              height="250" :src="require(`~/static/BrailleImages/${links[i]}`)"
              style="grid-area: 1 / 1 "
              v-for="(k,v,i) in links" :key="'trans-'+i" 
              v-show="i===slotProps.index" 
            />
          </transition-group>
        </b-col>
      </b-row>
      <b-row style="width: 90%; margin-top: 15px">
        <div style="width: 90%">
          <h5 class="expHead">{{titles[slotProps.index]}}</h5>
          <div class="expBody" v-html="text[slotProps.index]">
          </div>
        </div>
      </b-row>
    </b-container>
  </scroller>
</template>


<script>
import scroller from "./scroller.vue"
import {titles, text, links} from "./Explanations.js"

export default {
  components: {
    scroller,
  },
  data() {
    return {
      links: links,
      titles: titles,
      text: text
    }
  }
}
</script>


<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.container_row{
  display: grid;
}

.expBody > p{
  text-align: left;
  width: 90%
}

.expBody > ol, .expBody > ul {
  width: 90%
}

.expHead {
  text-align: left;
}

.expBody > ul > li {
  text-align: left;
}
</style>