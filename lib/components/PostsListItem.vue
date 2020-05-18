<template>
  <div
    class="posts-list-item"
    :class="classe"
    @changelist="this.classe='short'"
  >
    <RouterLink
      :to="post.path"
      class="post-link"
    >
      <div
        class="post-title"
      >
        {{ post.title }}
      </div>
    </RouterLink>
    <span class="post-info-list">
      <span
        v-if="post.createdAt"
        class="post-info-date"
      >
        <IconInfo
          type="date"
          :title="post.createdAt"
        >
          {{ post.createdAt }}
        </IconInfo>
      </span>

      <span
        v-if="post.category"
        class="post-info-item"
      >
        <RouterLink :to="$categories.getItemByName(post.category).path">
          <IconInfo
            type="category"
            :title="post.category"
          >
            {{ post.category }}
          </IconInfo>
        </RouterLink>
      </span>

      <span
        v-if="post.tags.length"
        class="post-info-item"
      >
        <IconInfo type="tags">
          <RouterLink
            v-for="(tag, i) in post.tags"
            :key="tag"
            :to="$tags.getItemByName(tag).path"
            :title="tag"
          >
            {{ `${tag}${i === post.tags.length - 1 ? '' : ', '}` }}
          </RouterLink>
        </IconInfo>
      </span>
    </span>
  </div>
</template>

<script>
import IconInfo from '@theme/components/IconInfo.vue'

export default {
  name: 'PostsListItem',

  components: {
    IconInfo,
  },

  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data: function () {
    return {
      classe: 'long',
    }
  },
}
</script>

<style lang="stylus">
@require '~@theme/styles/variables'

.posts-list-item
  padding 1rem
  &:not(:first-child)
    border-top 1px solid $borderColor
  .post-title
    color $textColor
    transition all 0.2s
    //margin-right 4em
.long
  .post-title
    font-size 1.17em
    line-height 1.25
    font-weight 600
    margin 1em 0em
.short
  .post-title
    width 50%
    float left
  .post-info-date
    display none
.post-info-list
  color $lightTextColor
  .post-info-item
    cursor default
    &:not(:first-child)
      margin-left 0.5em
    a
      color $lightTextColor
      font-weight normal
      &:hover
        color $accentColor
    .icon
      fill $lightTextColor
.post-link
  &:hover
    text-decoration none
    color $accentColor
</style>
