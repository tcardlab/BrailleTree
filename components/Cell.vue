<!--Renders indevidual Braille Cells-->
<!--Pass empty string to hide cell
probably could put v-for in svg and use v-if in circle, 
oh well-->
<template>
  <svg :x="dx" :y="dy" style="overflow:visible;">
    <circle
      v-for="(dot, i) in binarr"
      :key="(dot, i)"
      :display="dot === '' ? 'none' : 'visible'"
      :fill="dot ? 'black' : 'none'"
      :cx="i > 2 ? '3.25mm' : '0.75mm'"
      :cy="(i % 3) * 2.5 + 0.75 + 'mm'"
      :stroke="vueblank ? 'black' : 'none'"
      r="0.75mm"
    />
    <g v-html="rawhtml"></g>
  </svg>
</template>

<script>
export default {
  props: ['binarr', 'dx', 'dy', 'vueblank', 'rawhtml']
}
</script>
