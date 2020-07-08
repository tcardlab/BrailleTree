export const strict = false
export const state = () => ({
  active: {},
  init: {
    boarder: 20, // 10, 3
    // tree
    x1: 25, // 25
    x2: 15, // 15
    y1: 36, // 35
    y2: 12, // 10
    vueblank: true,
    vuebraille: true,
    // Branches
    width: 2.5,
    gap: 2,
    vuepath: true,
    // letters
    size: 7,
    vuealph: false,
    vuelabel: true,
    // All
    display: 1 // 0(first 12),1(dot3),2(dot3&6),3(all)
  }
})

//import Vue from "vue"
export const mutations = {
  setActive (state) {
    //state.active = Vue.set(state, "active", state.init)
    state.active = {...state.init}
  }
}

