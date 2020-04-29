export const CellClickMixin = {
  created() {
    if (this.toggleEvents) {
      console.log('toggleEvents recognized by CellClickMixin') // eslint-disable-line
    }
  },
  mounted() {
    if (this.toggleEvents) {
      // Write custom toggleEvents method to auto-run
      this.toggleEvents(true)
    }
  },
  beforeDestroy() {
    if (this.toggleEvents) {
      this.toggleEvents(false)
    }
  },
  methods: {
    quickEvents(bool, key, payload={}) {
      /*Use quickEvents if writing custom toggleEvents is overkill.
        Expose "events" object (Must manually remove listeners if it updates).
        Add ref names to target object and ensure ref name === this.events[key]
        events: {
          div1: {'mouseover': this.method1, ...}, // no input
          div2: {'click': ()=>this.method2(this.input), ... }, // simple input
          div3: {'touchstart': (payload)=> this.method3(payload), ...}, // quickEvents payload
        }
        add event in component mounted with bool=true and beforeDestroy with bool=false
        or use in custom toggleEvents() method.
      */
      const ref = this.$refs[key]
      const method = bool?'addEventListener':'removeEventListener'
      if ( typeof ref ===  Array) {
        ref.forEach((el, i) => {
          this.assignEvents(this.events[key], el, method, payload ? {i: i, ...payload} : i)
        })
      } else if ( typeof ref ===  Object ) {
        this.assignEvents(this.events[key], ref, method, payload)
      }
    },
    assignEvents(eventObj, el, method, payload={}) {
      //For each event in eventObj, apply method to given element + payload if needed
      for (let [k, v] of Object.entries(eventObj)) {
        el[method](k, ()=>v(payload))
      }
    }
  }
}
