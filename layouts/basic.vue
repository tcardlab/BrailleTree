<template>
  <div class="my-layout">
    <b-navbar toggleable="sm" type="dark" variant="info">
      <b-navbar-brand href="/">
        <img src="../assets/BrailleTree.png" style="filter: invert(1);"/>
        BrailleTree
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/practice">Practice</b-nav-item>
          <b-nav-item href="/proficiency">Proficiency</b-nav-item>
          <b-nav-item href="/faq">FAQ</b-nav-item>
           <b-nav-item href="/format">Editor</b-nav-item>
          <b-nav-item href="/gallery">More Braille</b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    
    <div class="container-fluid">
      <!-- larger than md = 2-8-2 // md and below = 12(fullscreen) -->
      <b-row class="justify-content-center" style="background:#eee"> <!-- #f2f5f7  fafafa-->
        <b-col col md="2" class="d-none d-md-table-cell"/>

        <b-col col sm="12" md="8" style="background:white">
          <nuxt style="padding: 15px"/>
          
          <div style="height:100px; width:100%; background:green;">
            footer1
          </div>
        </b-col>

        <b-col col md="2" class="d-none d-md-table-cell"/>
      </b-row>
    </div>

    <div style="height:100px; background:red;">
      github<br>
      other sites<br>
      contact
    </div>

    <b-alert
      v-model="showBottom"
      class="position-fixed fixed-bottom m-0 rounded-0 text-center"
      style="z-index: 2000;"
      variant="warning"
    >
      NOTE: Under active development. Written content is currently being added. 
    </b-alert>

  </div>
</template>

<script>
export default {
  data() {
    return {
      showBottom: true,
    }
  }
}
</script>

<style>
.container {
  height: 100vh;
}
.col {
  padding: 0;
}
.navbar {
  width: 100%;
}

a.nav-link:hover {
  color: white !important;
  /* border-bottom: 2px solid white */
}

a.nav-link {
  color: rgba(255, 255, 255, 0.8) !important;;
  text-decoration: none !important;
  /* border-bottom: 2px solid rgba(255, 255, 255, 0) */
}

</style>
