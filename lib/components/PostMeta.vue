<template>
  <section class="post-meta main-div">
    <section class="post-date clearfix">
      <span
        v-if="$page.createdAt"
        class="create-date"
      >
        {{ `${$themeConfig.lang.createdAt} : ${$page.createdAt}` }}&nbsp;
      </span>
      <span
        v-if="$page.location"
        class="create-date"
      >
        {{ `${$themeConfig.lang.createdIn} ${$page.location}` }}
      </span>

      <span
        v-if="$page.updatedAt"
        class="update-date"
      >
        {{ `${$themeConfig.lang.updatedAt} : ${$page.updatedAt}` }}
      </span>
    </section>
  </section>
</template>

<script>
export default {
  name: 'PostMeta'
}
</script>

<style lang="stylus" scoped>
@require '~@theme/styles/variables'

.post-meta
  .post-date
    color lighten($grayTextColor, 50%)
    .create-date
      float left
    .update-date
      float right
  .post-links
    .post-link
      display block
      line-height 1.7
      color lighten($grayTextColor, 20%)
      font-weight normal
      transition all 0.2s
      &:hover
        color $accentColor
</style>
