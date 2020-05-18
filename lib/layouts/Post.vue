<template>
  <div class="post">
    <article class="main-div">
      <Content
        :key="$page.path"
        class="post-content content"
      />
    </article>

    <PostLinks v-if="meta" />

    <PostMeta v-if="meta" />

  </div>
</template>

<script>
import PostMeta from '@theme/components/PostMeta.vue'
import PostLinks from '@theme/components/PostLinks.vue'

export default {
  name: 'Post',

  components: {
    PostMeta,
    PostLinks,
  },

  computed: {
    meta () {
      return this.$frontmatter.meta !== false
    },

  },
}
</script>
