<template>
  <div>
    <v-search/>
    <word-cloud/>
  </div>
</template>
<script>
import Search from './search'
import WordCloud from './wordCloud'
export default {
  components: {
    'v-search': Search,
    'word-cloud' : WordCloud
  }
}
</script>

<style>

</style>
