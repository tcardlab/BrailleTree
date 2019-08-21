<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <!-- larger than md = 2-8-2 // md and below = 12(fullscreen) -->
    <b-row class="justify-content-center">
      <b-col col md="2" class="d-none d-md-table-cell">1 of 3</b-col>
      <b-col sm="12" md="8">
        <nuxt/> 
      </b-col>
      <b-col col md="2" class="d-none d-md-table-cell">3 of 3</b-col>
    </b-row>

      
  </div>
</template>

<style>
.container {
  height: 100vh;
}
</style>
