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
      Unfortunately, it has a tremendously low literacy rate and few are even aware of that (learn more). 


      To the uninitiated, Braille may seem bewildering and in fact, it is recognized that
      <a href="https://en.wikipedia.org/wiki/Braille#Derivation">
       "[...] the dots are assigned in no obvious order" <font-awesome-icon icon="external-link-alt"  style="font-size: 0.75rem"/>
      </a>.
      <br><br>
      <strong>However, Braille as I see it, is beautifully divided and organized by defining features.</strong> 

      The Alphabet is easily distinguishable from punctuation, end marks from internal punctuation, 
      and even small from large punctuation.

      This system will enable you to memorize Grade 1 Braille in minutes and spread awareness in the process.
      
    </p>

    <!--
    learn more at BrailleTree.com
    history of braille
    other braille projects
    <Static-Cell color="#9dd" :binaryarray="[1,0,0,0,0,1]" style="fill: var(--info) !important;" />

    <Static-Cell v-for="(arr,i) in [[0,1,1,0,0,1], [0,0,1,0,1,1], [0,1,0,0,1,1]]" :key="'test-'+i" color="#9dd" :binaryarray="arr" style="fill: var(--info) !important;" />
    -->

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
      Despite its age, G1 Braille is still recognized, as a random mapping of Alphanumerics to cells. 
      [Some believe that its design was intended to reduce confusion by ensuring a mix of sparse and dense cells. 
      A common criticism of its early, American emulation was that pairing the number of dots to frequency made 
      reading more difficult as sparse cells were all too common.] Contrary to such ideas is an organization that 
      procedurally generates Braille with only a polydactyl handful of rules:
    </p>
    
    <ol>
      <li> A ternary tree of depth 2, projected east/right [Easy mental traversal]. </li>
      <li> Depth corresponds to cell columns, depth 1 = Column 1 [Inherent logic]. </li>
      <li> The first 2 dots of a column are filled, "top, both, bottom" relative to branch direction [Inherent logic]. </li>
      <li> The Lowest global branch is reserved for punctuation- with their own rules [Easy distinction]. Leaving 10 spots for alphanumerics.</li>
      <li> Alphanumerics are assigned top-to-bottom, left-to-right [~intuitive reading]. </li>
      <li> Numbers are preceded with a number modifier. The alphabet is broken into sets of 10 [Rules 1-5 apply to all encodings (meta rule)] 
                        where dots 3 and 3+6 cover 11-20 & 21-26 respectively, “W” with holding (learn why). </li> 
    </ol>
    

    <p>
      While explicit instructions are often intimidating, I guarantee it is intuitive. 
      These rules are an instructional formality, that will likely be forget once you understand the inherent organization. 
      Before getting started, it's important to clarify that this is a mnemonic aid; you will be able to encode and decipher braille [G1], 
      but fluency is a matter of practice & rote memorization (not just letters, but words, groupings, contractions and ultimately G2).
    </p>
    <div style="width: 90%">
      <h5>Step 1) Generating The Tree:</h5>
      <p>
        The structure we will be working with is a ternary tree. This means at each node in the structure,
        there are 3 branches. The tree has a depth of 2, meaning this branching process occurs twice off the root node. 
        This tree will branch to the right as it best relates to Braille. To cover the entirety of Alphanumerics, 
        there will be 4 such structures.
      </p>

      <h5>Step 2 ) Assigning cell Columns:</h5>
      <p>Our first step in generating Braille is to assign cell columns by way of depth.</p>
      <ul>
        <li>The root ( depth 0 ) has no columns</li>
        <li>depth 1 adds the first column of dots ( 1-3)</li>
        <li>depth 2 adds the second column to the prior nodes cell.</li>
      </ul>
      <p>In this way, as you scan Braille cells one column at a time you move forward one branch in the tree.</p>

      <h5>Step3 ) Assigning Dots to Columns</h5>
      <p>
        As you may know, Braille is often separated into repeating sets, distinguished by the last dots of each column.
        For this reason, this structure only assigns the top 2 dots in a column. Given our rightward projection,
        a branch upward corresponds to the top dot of the given column, horizontal is both,
        and downward is just the bottom dot of the top 4. This lends itself to the saying "Top-2-Bottom".
      </p>

      <h5>step 4 ) Reserve Punctuation:</h5>
      <p>
        The lowest global node at each depth is reserved for punctuation. This will leave to nodes left for Alphanumerics.
        This placement makes distinguishing the two very easy - as punctuation never occupy dots 1 or 4 while Alphanumerics must.
        We wont assign punctuation just yet, as they are unsorted and require a little more effort ( click more to see ).
      </p>

      <h5>Step 5 ) Assignment Order:</h5>
      <p>
        Alphanumeric sets are assigned in globally, order* from top branch toward the bottom,
        then to the next depth[ Top to bottom, Left to right ].
      </p>

      <h5>Step 6 ) Alphanumeric Sets:</h5>
      <p>Sets are identified either through a modifier ( numbers ) or presence of dots 3 & 6.</p>
      <ul>
        <li>[A - J] Is filled in the absence of 3&6</li>
        <li>[1 - 9+0] Is identical to [A-J], but the string of #'s will be preceded by a number modifier.</li>
        <li> K-T adds dot 3 to the cells. </li>
        <li> [U, V, X, Y, Z ] (u - Z minus w) adds dots 3&6 to each cell. Words [And, For, Of, The, With] fill the remaining spaces. They are in alphabetical order.</li>
      </ul>
      
    </div>
    <h3> Punctuation: </h3>

    <h3> Gotchas and More: </h3>


  </div>
</template>

<script>
import BaseCheckbox from '~/components/BrailleTree/BaseCheckbox.vue'
import BrailleTree from '~/components/BrailleTree/BrailleTree.vue'
// import StaticCell from '~/components/Practice/StaticCell.vue'


export default {
  layout: 'basic',
  components: {
    BrailleTree,
    BaseCheckbox,
    // StaticCell
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
