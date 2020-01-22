<template>
  <svg id="cell">
    <rect x="0mm" y="0mm"
      width="100%" height="100%" :fill="{true:'green', false:'red', undefined: 'white'}[color]"/>
    <circle
      v-for="(dot, i) in binaryarray" :key="(dot, i)"
      :display="dot === '' ? 'none' : 'visible'"
      :fill="dot ? 'black' : 'none'"
      :cx="i>2 ? '4.25mm' : '1.75mm'"
      :cy="(i % 3) * 2.5 + 0.75 + 1 + 'mm'"
      x="300"
      r="0.75mm"
    />
  </svg>
</template>

<script>
export default {
  name: 'Cell',
  props: ['binaryarray', 'color'],
}
</script>