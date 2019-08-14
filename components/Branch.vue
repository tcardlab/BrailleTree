<!--Renders indevidual branch path with text-->
<template>
  <svg
    :x="dx"
    :y="dy"
    style="overflow:visible;"
    width="1mm"
    height="1mm"
    viewBox="0 0 1 1"
  >
    <path :id="id" :d="dstr"></path>

    <text
      v-if="id != ''"
      :dy="id == 'Bottom' ? '.9em' : '-.35em'"
      :font-size="+size / 4 + 'mm'"
    >
      <textPath :href="'#' + id" startOffset="25%" text-anchor="middle">
        {{ id }}
      </textPath>
    </text>
  </svg>
</template>

<script>
export default {
  props: ['dstr', 'dx', 'dy', 'id', 'size']
}
</script>
