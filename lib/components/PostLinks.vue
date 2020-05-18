<template>
  <section class="main-div" v-if="$page.links.length">
    <span class="entete">Liens:</span>
    <ul class="post-links">
      <li v-for="link in links" :key="link.key">
        {{ link.key }} <a :href=link.lien  target="_blank" >{{ link.texte }}</a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'PostLinks',
  computed: {
    links () {
      return this.$frontmatter.links
    },
  }
}
</script>

<style lang="stylus" scoped>
@require '~@theme/styles/variables'

ul
  margin-block-start  .7em
  margin-block-end 0em

.entete
  font-weight bold
  text-decoration: underline

.post-links
  display block
  line-height 2
  color $grayTextColor
  font-weight bold

</style>
