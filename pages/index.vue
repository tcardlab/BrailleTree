<template>
  <div  align="center">
    <h1>BrailleTree</h1>
    <hr>
    <b-alert show> 
      This article is for sighted people who wish to learn Grade 1 Braille and spread this method to the blind.
      <br>
      <strong>3D models are available as teaching aid to the blind at 
        <b-badge
          href="https://www.thingiverse.com/thing:4809012"
          target="_blank" rel="noopener noreferrer"
          variant="info"
        >
          <strong>Thingiverse</strong> 
          <font-awesome-icon icon="external-link-alt"  style="font-size: 0.75rem"/>
        </b-badge>
        and
        <b-badge 
          href="https://3dprint.nih.gov/discover/3dpx-015596"
          target="_blank" rel="noopener noreferrer"
          variant="info"
        >
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
      <a href="https://en.wikipedia.org/wiki/Braille#Derivation#:~:text=the%20dots%20are%20assigned%20in%20no%20obvious%20order"> 
      <!-- "https://en.wikipedia.org/wiki/Braille#Derivation"-->
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

    <iframe class="giphy-embed" style="max-width: 100%; max-height: 80vw;" src="https://giphy.com/embed/0YK1GuQPlWr497u2K5" frameBorder="0" scrolling='no' allowFullScreen width='640' height='517'></iframe>

    <!--
      gfycat shut down... only had ~3k views
      <iframe style="max-width: 100%; max-height: 80vw;" src='https://gfycat.com/ifr/WarlikeGreatAltiplanochinchillamouse?autoplay=0' frameborder='0' scrolling='no' allowfullscreen width='640' height='517'></iframe> 
    -->
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

    <h3 id="explained">BrailleTree Explained:</h3>

    <p>
      Despite its age, Grade 1 Braille (G1) is still recognized as a random mapping of Alphanumerics to cells.
      On the contrary, lies an organization that procedurally generates Braille with only a polydactyl handful of rules.
      However, before getting started, it's important to clarify that this is a mnemonic aid; you will be able to encode and decipher G1 Braille,
      but fluency is a matter of practice & rote memorization.
    </p>
    <!-- 
      While explicit instructions are often intimidating, I guarantee this is intuitive. 
      These rules are an instructional formality, that will likely be forgotten once you understand
      the inherent organization. memorization not just letters, but words, groupings, contractions and ultimately G2.
    -->

    <Explained class="d-none d-sm-flex" style="width: 90%; border: 1px solid rgba(12, 84, 96, .125); border-radius: 0.3rem"/>
    <ExplainMobile class="d-sm-none" style=" width: 100vw; margin-left: -15px; background-color: #d1ecf1 "/>

    <h3> Punctuation: </h3>

    <h3> Gotchas and More: </h3>


  </div>
</template>

<script>
import BaseCheckbox from '~/components/BrailleTree/BaseCheckbox.vue'
import BrailleTree from '~/components/BrailleTree/BrailleTree.vue'
import Explained from '~/components/Explanation/Explained.vue'
import ExplainMobile from '~/components/Explanation/ExplainMobile.vue'

export default {
  layout: 'basic',
  components: {
    BrailleTree,
    BaseCheckbox,
    Explained,
    ExplainMobile
  },
}
</script>

<style scoped>
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
