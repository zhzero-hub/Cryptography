<template>
  <div>
    <img :src="imgUrl">
  </div>
</template>

<script>
import img1 from '../../img/20210107225745.png'

export default {
  name: "analysis",
  data() {
    return {
      imgUrl: img1,
    }
  }
}
</script>

<style scoped>

</style>