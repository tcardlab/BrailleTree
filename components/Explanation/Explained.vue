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
      <b-row style="padding-top:5%; padding-left:5%; background-color: #d1ecf1; color: #0c5460">
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

/* THEME */
.list-group-item.active {
  border: 1px solid rgba(12, 84, 96, .125);
  border-right: 1px solid #fff;
  /*border-left: 1px solid rgba(0,0,0,.125);*/
}
.list-group-item.active {
  z-index: 2;
  color: #000;
  background-color: #fff;
  border-color: auto;
}
.list-group-item:last-child {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.list-group-item:first-child {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.list-group-item.active:last-child {
  border-bottom: 1px solid #fff;
}
.list-group-item.active:first-child {
  border-top: 1px solid #fff;
}

.list-group-item {
  z-index: 2;
  color: #0c5460;
  background-color: #d1ecf1;
  border: 1px solid rgba(12, 84, 96, .125);/*1px solid rgba(0,0,0,.125);*/
}
</style>