const path = require('path')
const format = require('date-fns/format')

module.exports = ({
  postsDir = '_posts',
  postsLayout = 'Post',
  permalink = '/posts/:year/:month/:day/:slug.html',
  lang,
}) => {
  const ensureBothSlash = str => str.replace(/^\/?(.*)\/?$/, '/$1/')

  return {
    name: '@theme-meteorlxy/vuepress-plugin-blog',

    plugins: [
      [require('../blog-vuepress'), {
        categoryIndexPageUrl: '/posts/categories/',
        tagIndexPageUrl: '/posts/tags/',
        postsDir,
        lang,
      }],
    ],

    extendPageData ($page) {
      // Test the page if is a post according to the postsDir
      if ($page.path.startsWith(ensureBothSlash(postsDir))) {
        // Set the meta data of the page
        $page.frontmatter.layout = $page.frontmatter.layout || postsLayout
        $page.frontmatter.permalink = $page.frontmatter.permalink || permalink
        $page.frontmatter.draft = $page.frontmatter.draft || false
        $page.type = 'post'
        $page.top = $page.frontmatter.top || false
        $page.tags = $page.frontmatter.tags || []
        $page.category = $page.frontmatter.category
        $page.links = $page.frontmatter.links || []
        $page.location = $page.frontmatter.location
        $page.createdAt = $page.frontmatter.date ? format($page.frontmatter.date, 'DD/MM/YYYY') : null
        $page.updatedAt = $page.lastUpdated ? $page.lastUpdated : format($page.frontmatter.date, 'DD/MM/YYYY')
      }
    },

    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceApp.js'),
    ],
  }
}