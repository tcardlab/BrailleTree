<template>
  <scroller ref="scroller" :maxIndex="Object.keys(steps).length-1" v-slot="slotProps">
    <!--<img  height="200" :src="require(`~/static/BrailleImages/${steps[slotProps.index]}`)"/>-->
    <b-container fluid>
      <b-row align-v="center">
        <b-col cols="4" style="padding: 0">
          <b-list-group>
            <b-list-group-item 
              v-for="(v,i) in Object.keys(steps)"
              @click="$refs.scroller.setIndex(i)" 
              :key="'pick-'+i" 
              :active="i===slotProps.index"> 
                Step {{+i+1}}
            </b-list-group-item>
          </b-list-group>
        </b-col>

        <b-col cols="8">
          <transition-group class="container_row" tag="div" name="fade">
            <img 
              height="250" :src="require(`~/static/BrailleImages/${steps[i]}`)"
              style="grid-area: 1 / 1 "
              v-for="(k,v,i) in steps" :key="'trans-'+i" 
              v-show="i===slotProps.index" 
            />
          </transition-group>
        </b-col>
      </b-row>
      <!--{{slotProps.index}}-->
      <b-row style="width: 90%; margin-top: 15px">
        <div style="width: 90%">
          <h5>{{titles[slotProps.index]}}</h5>
          <div v-html="text[slotProps.index]">
          </div>
        </div>
      </b-row>
    </b-container>
  </scroller>
</template>


<script>
import scroller from "./scroller.vue"

const titles = {
  0: "Step 1) Generating the Tree:",
  1: "Step 2) Assigning Columns:",
  2: "Step 3) Assigning Dots to Columns",
  3: "Step 4) Reserve Punctuation:",
  4: "Step 5) Assignment Order:",
  5: "Step 6) Alphanumeric Sets:"
}

const text = {
  0:`<p>
        This structure is a <i>ternary tree</i>- meaning each node in the structure has 3 branches. 
        It also has a depth of 2, denoting this branching process occurs twice off the root node. 
        The tree will branch to the right as it best relates to Braille. To cover the entirety of Alphanumerics, 
        there will be 4 such structures.
      </p>
    `,
  1:`<p>Our first step in generating Braille is to assign cell columns by way of depth.</p>
      <ul>
        <li>The root (depth 0) has no columns</li>
        <li>depth 1 adds the first column of dots (1-3)</li>
        <li>depth 2 adds the second column to the prior nodes cell.</li>
      </ul>
      <p>In this way, as you scan Braille cells one column at a time you move forward one branch in the tree.</p>
    `,
  2:`<p>
        Braille is separated into repeating sets, distinguished by the last dot of each column.
        For this reason, this structure only assigns the top 2 dots in a column. Given our rightward projection,
        a branch upward corresponds to the <strong>top</strong> dot of the given column, horizontal is the first <strong>two</strong> dots, and
        downward is the <strong>bottom</strong> dot of the first two. This lends itself to the saying "Top-2-Bottom".
      </p>
    `,
  3:`<p>
        The lowest global node at each depth is reserved for punctuation. This will leave to nodes left for Alphanumerics.
        This placement makes distinguishing the two very easy - as punctuation never occupy dots 1 or 4 while Alphanumerics must.
        We won't assign punctuation just yet, as they are unsorted and require a little more effort (click more to see).
      </p>
    `,
  4:`<p>
        Alphanumeric sets are assigned globally, in depth order- from the top most branch toward the bottom,
        then to the next depth [Top-to-Bottom, Left-to-Right].
      </p>
    `,
  5:`<p>Sets are identified either through a modifier (numbers) or the presence of dots 3 & 6.</p>
      <ul>
        <li>[A - J] Is filled in the absence of 3&6</li>
        <li>[1 - 9+0] Is identical to [A-J], but the string of #'s will be preceded by a number modifier.</li>
        <li> K-T adds dot 3 to the cells. </li>
        <li> [U, V, X, Y, Z] (u - Z minus w) adds dots 3&6 to each cell. Words [And, For, Of, The, With] fill the remaining spaces. They are in alphabetical order.</li>
      </ul>
    `
}

export default {
  components: {
    scroller,
  },
  data() {
    return {
      steps: {
        0: "ternaryTree(Columns).svg",
        1: "ternaryTree(Columns2).svg",
        2: "assignDots.svg",
        3: "Punctuation4.svg",
        4: "Nums.svg",
        5: "AJ.svg",
      },
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
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.container_row{
  display: grid;
}


p {
  text-align: left;
  width: 90%
}

ol, ul {
  width: 90%
}

h5 {
  text-align: left;
}

li {
  text-align: left;
}

h3 {
  text-align: left;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>