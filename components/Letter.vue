<!--Renders indevidual SVG letter-->
<template>
  <text
    :x="dx"
    :y="dy"
    :dx="2 - size / 3 + 'mm'"
    :dy="3.25 + size / 3 + 'mm'"
    :font-size="size + 'mm'"
  >
    {{ glyph }}
  </text>
</template>

<script>
export default {
  props: ['dx', 'dy', 'size', 'glyph']
}
</script>
