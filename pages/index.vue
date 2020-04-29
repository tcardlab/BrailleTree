<template>
  <div  align="center">
    <h1>BrailleTree</h1>
    <hr>
    <b-alert show> 
      This article is for sighted people who wish to learn Grade 1 Braille and spread this method to the blind.
      <br>
      <strong>3D models are available as teaching aid to the blind at 
        <b-badge href="https://3dprint.nih.gov/users/thomas-card/model" variant="info">
          <strong>Thingiverse</strong> 
          <font-awesome-icon icon="external-link-alt"  style="font-size: 0.75rem"/>
        </b-badge>
        and
        <b-badge href="https://3dprint.nih.gov/users/thomas-card/model" variant="info">
          <strong>NIH 3D-PE</strong> 
          <font-awesome-icon icon="external-link-alt"  style="font-size: 0.75rem"/>
        </b-badge>
        .
      </strong>
      <br>
      If you are unfamiliar with Braille please see the <nuxt-link class="badge badge-info" to="/faq"> FAQ Page </nuxt-link>.<!--info vs primary?-->
    </b-alert>

    <br>

    <p> <!-- style="word-wrap: break-word;" -->
      Braille is a different typographic representation of the alphabet for the visually impaired. 
      Unfortunately, it has a tremendously low literacy rate, and few are even aware of that (learn more). 


      To the uninitiated, Braille may seem bewildering and in fact, it is recognized that
      <a href="https://en.wikipedia.org/wiki/Braille#Derivation">
       "[...] the dots are assigned in no obvious order" <font-awesome-icon icon="external-link-alt"  style="font-size: 0.75rem"/>
      </a>.
      <br><br>
      <strong>However, Braille as I see it is beautifully divided and organized by defining features.</strong> 

      The Alphabet is easily distinguishable from punctuation, end marks from internal punctuation, 
      and even small from large punctuation.

      This system will enable you to memorize Grade 1 Braille in minutes and spread awareness in the process.
      
    </p>

    <h3 align="left">Braille In 1 Minute:</h3>
    <br>
    <iframe style="max-width: 100%; max-height: 80vw;" src='https://gfycat.com/ifr/WarlikeGreatAltiplanochinchillamouse?autoplay=0' frameborder='0' scrolling='no' allowfullscreen width='640' height='517'></iframe>
    <!-- <p> <a href="https://gfycat.com/warlikegreataltiplanochinchillamouse-braille-in-one-minute-accessibility">via Gfycat</a></p> -->


    <h3 align="left">BrailleTree Interactive:</h3>

    <!--Display Braille @ proper mm sale -->
    <BrailleTree class="d-none d-sm-table-cell"/>
    <!--Display scaled braille for mobile -->
    <div class="d-sm-none" align="center" style="user-select: none;">
      <svg viewBox="0 0 434.641 462.984">
        <BrailleTree />
      </svg>
    </div>

    <div style="user-select: none;">
      <h5 style="text-align: center">Braille <base-checkbox v-model="_$.vuealph" :disable="_$.display==='5'? true:false"/> Letters</h5>
      <label>display</label>
      <input v-model="_$.display" type="range" min="0" max="5" />
      <span>{{ ["#'s", 'A-J', 'K-T', 'U-Z', 'All', 'All2'][_$.display] }}</span>
    </div>

    <h3>BrailleTree Explained:</h3>

    <p>
      Despite its age, Grade 1 Braille (G1) is still recognized as a random mapping of Alphanumerics to cells. 
      On the contrary, lies an organization that procedurally generates Braille with only a polydactyl handful of rules.
      <!-- While explicit instructions are often intimidating, I guarantee this is intuitive. 
      These rules are an instructional formality, that will likely be forgotten once you understand the inherent organization. --> 
      However, before getting started, it's important to clarify that this is a mnemonic aid; you will be able to encode and decipher G1 Braille, 
      but fluency is a matter of practice & rote memorization. <!-- (not just letters, but words, groupings, contractions and ultimately G2) -->
    </p>
    <div style="width: 90%">
      <h5>Step 1) Generating the Tree:</h5>
      <p>
        This structure is a <i>ternary tree</i>- meaning each node in the structure has 3 branches. 
        It also has a depth of 2, denoting this branching process occurs twice off the root node. 
        The tree will branch to the right as it best relates to Braille. To cover the entirety of Alphanumerics, 
        there will be 4 such structures.
      </p>

      <h5>Step 2) Assigning Columns:</h5>
      <p>Our first step in generating Braille is to assign cell columns by way of depth.</p>
      <ul>
        <li>The root (depth 0) has no columns</li>
        <li>depth 1 adds the first column of dots (1-3)</li>
        <li>depth 2 adds the second column to the prior nodes cell.</li>
      </ul>
      <p>In this way, as you scan Braille cells one column at a time you move forward one branch in the tree.</p>

      <h5>Step 3) Assigning Dots to Columns</h5>
      <p>
        Braille is separated into repeating sets, distinguished by the last dot of each column.
        For this reason, this structure only assigns the top 2 dots in a column. Given our rightward projection,
        a branch upward corresponds to the <strong>top</strong> dot of the given column, horizontal is the first <strong>two</strong> dots, and
        downward is the <strong>bottom</strong> dot of the first two. This lends itself to the saying "Top-2-Bottom".
      </p>

      <h5>Step 4) Reserve Punctuation:</h5>
      <p>
        The lowest global node at each depth is reserved for punctuation. This will leave to nodes left for Alphanumerics.
        This placement makes distinguishing the two very easy - as punctuation never occupy dots 1 or 4 while Alphanumerics must.
        We won't assign punctuation just yet, as they are unsorted and require a little more effort (click more to see).
      </p>

      <h5>Step 5) Assignment Order:</h5>
      <p>
        Alphanumeric sets are assigned globally in depth order- from the top most branch toward the bottom,
        then to the next depth [Top-to-Bottom, Left-to-Right].
      </p>

      <h5>Step 6) Alphanumeric Sets:</h5>
      <p>Sets are identified either through a modifier (numbers) or the presence of dots 3 & 6.</p>
      <ul>
        <li>[A - J] Is filled in the absence of 3&6</li>
        <li>[1 - 9+0] Is identical to [A-J], but the string of #'s will be preceded by a number modifier.</li>
        <li> K-T adds dot 3 to the cells. </li>
        <li> [U, V, X, Y, Z] (u - Z minus w) adds dots 3&6 to each cell. Words [And, For, Of, The, With] fill the remaining spaces. They are in alphabetical order.</li>
      </ul>
      
    </div>
    <h3> Punctuation: </h3>

    <h3> Gotchas and More: </h3>


  </div>
</template>

<script>
import BaseCheckbox from '~/components/BrailleTree/BaseCheckbox.vue'
import BrailleTree from '~/components/BrailleTree/BrailleTree.vue'

export default {
  layout: 'basic',
  components: {
    BrailleTree,
    BaseCheckbox
  },
}
</script>

<style>
#Bottom, .Bottom-1 {
  fill: var(--info);
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
