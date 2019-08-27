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
    
    <div class="container-fluid">
      <!-- larger than md = 2-8-2 // md and below = 12(fullscreen) -->
      <b-row class="justify-content-center" style="background:#eee"> <!-- #f2f5f7  fafafa-->
        <b-col col md="2" class="d-none d-md-table-cell">1 of 3</b-col>
        <b-col col sm="12" md="8" style="background:white">
          <nuxt/>
          <div style="height:100px; width:100%; background:green;">
            footer2
          </div>
        </b-col>
        <b-col col md="2" class="d-none d-md-table-cell">3 of 3</b-col>
      </b-row>
    </div>

    <div style="height:100px; background:red;">
      footer2
    </div>

  </div>
</template>

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
</style>
