export const ApostropheFilter = {
  methods: {
    apostrophes(val) {
      // normalize weird apostrophes
      if (!val) {return ""}
      if (val.includes("‘") || val.includes("’")) {
        return val.replace(/([‘’])/g, () => "'")
      }
      return val
    },
  }
}
