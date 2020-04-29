export const ScreenSizeMixin = {
  /* Exposes Reactive Page Sizing */
  data() {
    return {
      windowWidth: 0,
      windowHeight: 0
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    }
  },
  computed: {
    // Stylings for GuessBraille & GuessLetter
    mobileStyle() {
      const cell = 22.677 // 6mm * 3.779px/mm
      const scale = (0.5 * this.windowWidth) / (2 * cell) // both cells should fill half the screen
      return {
        transform: `scale(${scale})`,
        'margin-top': `${(scale * 4) - 10}mm`,
        'margin-bottom': `${(scale * 5.5) - 5}mm`
      }
    },
    desktopStyle() {
      const scale = 2 // both cells should fill half the screen
      return {
        transform: `scale(${scale})`,
        'margin-top': `${(scale * 4) - 10}mm`,
        'margin-bottom': `${(scale * 5.5) - 5}mm`
      }
    }
  },
}