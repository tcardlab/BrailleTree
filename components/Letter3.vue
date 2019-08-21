<!--Renders indevidual SVG letter-->
<template>
  <text
    :x="dx"
    :y="dy"
    :dx="2 - _$.size / 3 + 'mm'"
    :dy="3.25 + _$.size / 3 + 'mm'"
    :font-size="_$.size + 'mm'"
  >
    {{ LetterArray(for1, for2) }}
  </text>
</template>

<script>

// retruns SVG-subscript html for numbers
const rawHtml = function(size, number) {
  // <tspan baseline-shift="sub" :font-_$.size="_$.size / 2 + 'mm'" dx="-1em">
  return `<tspan font-size="${size}mm"> ${number} </tspan>`
}

// Defines alph,nums,etc in branch order, indexs list, and returns glyph
const findGlyph = function(num, for1, for2) {
  const alph = 'AB,CDEFGHIJ.KL;MNOPQRST!UV?XYZ'
    .split(/'|/)
    .concat(['and', 'for', 'of', 'the', 'with', '(...)'])
    .concat("12''34567890''".split(/'|/))
  if (typeof for2 === 'undefined') {
    return alph[for1 + num * 12]
  } else {
    return alph[3 + for1 * 3 + for2 + num * 12]
  }
}

export default {
  props: ['for1', 'for2', 'dx', 'dy',],
  methods: {
    // Top-2-Bottom
    LetterArray: function(for1, for2) {
      if (typeof for1 === 'undefined') {
        // Init cell
        const init = [' ', "'", '-', '']
        const disp = +this._$.gap + +this._$.size + 3 // column displacement
        switch (+this._$.display) {
          case 4:
            init[0] +
            `<tspan x="${-disp}mm" > ${init[1]} <tspan>` +
            `<tspan x="${-disp / 2}mm" > ${init[2]} <tspan>`
            break
          case 5:
            init[0] +
            `<tspan x="${-disp}mm" dy='3.5mm' > ${init[1]} </tspan>` +
            `<tspan x="${-disp / 2}mm" > ${init[2]} </tspan>`
            break
          default: return init[this._$.display]
        } 

      } else if (typeof for2 === 'undefined') {
        // 1st branch cells
        if (+this._$.display < 4) {
          return findGlyph(this._$.display, for1)
        }
        const range = [0, 1, 2, 3]
        const [col1, col2, col3, num] = range.map(i => findGlyph(i, for1))
        const x = +this._$.x1 + 2 // 2nd branch location
        const disp = +this._$.gap + +this._$.size - 3 // column displacement
        if (+this._$.display == 4){
          return(
            col1 +
            rawHtml(this._$.size / 2, num) +
            `<tspan x="${x - disp * 2}mm" dy='10mm'> ${col2} <tspan>` +
            `<tspan x="${x - disp}mm"> ${col3} <tspan>`
          ) // dy affexts both <tspan> for some reason...?
        } else if (+this._$.display == 5){
          return(
            `<tspan x="${x - disp * 1.5}mm" dy='12mm'> ${col1 +
              rawHtml(this._$.size / 2, num)} </tspan>` +
            `<tspan x="${x - disp * 2}mm" dy='8mm'> ${col2} </tspan>` +
            `<tspan x="${x - disp}mm"> ${col3} </tspan>`
          ) // dy affexts both <tspan> for some reason...?
        }
      } else {
        // 2nd branch cells
        if (+this._$.display < 4) {return findGlyph(this._$.display, for1, for2)}
        
        const range = [0, 1, 2, 3]
        var [col1, col2, col3, num] = range.map(i => findGlyph(i, for1, for2))
        const x = +this._$.x1 + +this._$.x2 // 2nd branch location
        const disp = +this._$.gap + +this._$.size + 1 // column displacement
        switch (+this._$.display){
          case 4:
            return (
              col1 +
              rawHtml(this._$.size / 2, num) +
              `<tspan x="${x + disp}mm" > ${col2} <tspan>` +
              `<tspan x="${x + disp * 2}mm" > ${col3} <tspan>`
            )
          case 5:
            return (
              `<tspan x="${x + disp}mm" dy='3.5mm' > ${col1 +
                rawHtml(this._$.size / 2, num)} </tspan>` +
              `<tspan x="${x + disp * 2}mm" > ${col2} </tspan>` +
              `<tspan x="${x + disp * 3}mm" > ${col3} </tspan>`
            )
        }
      }
    }
  }
}
</script>
