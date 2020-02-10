<template>
  <div  align="center" >
    <h1> Gallery </h1>
    <hr>

  <b-container class="gallery-page">
    <b-row>
      <b-card
        title="Cool Braille Article"
        img-src="https://netadis.files.wordpress.com/2012/11/braille_book.jpg"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 25rem; margin: auto;"
        class="mb-2"
        v-for="i in 7"
        :key="i"
      >
        <b-card-text>
          Example text to summarize article/link content or significance.
        </b-card-text>

        <b-button href="#" variant="primary">External Link</b-button>
      </b-card>
    </b-row>
  </b-container>

    

  </div>
</template>

<script>
export default {
  layout: 'basic',
}
</script>

<style scoped>
.gallery-page {
  /* padding-top: 0px !important;
  padding-bottom: 0px !important; */
  min-height: calc(100vh - 159px);
  height: auto;
}
</style>