---
title: VuePress
date: 2020-04-30
updatedAt: 2020-05-13
author: PM
tags:
- Vuepress
category: VuePress
top: 2
location: Kampot
links:
- key: "VuePress basic and configuration:" 
  texte: "vuepress-in-all-its-glory"
  lien: "https://blog.logrocket.com/vuepress-in-all-its-glory-2f682e4f70c0/"
- key: color-wheel
  texte: Choix de couleurs CSS Adobe
  lien: "https://color.adobe.com/fr/create/color-wheel"
---

### Installation

- Vuepress a été installé globalement par `yarn global add vuepress`

- Installation dans un nouveau projet: 

utiliser le script `/Users/PM/Dev/! *aGarder*/Shell/VuepressNew.sh`.

``` js
name=vp1  
# name à modifier!
folder=/Users/PM/Dev/$name
mkdir $folder && cd $folder
echo '# Hello VuePress!' > README.md
vuepress dev
```

- Installation dans un projet existant:

utiliser le script `/Users/PM/Dev/! *aGarder*/Shell/VuepressAdd.sh`.

Avoid using npm when installing VuePress within an existing project if your project alfeady has Webpack 3.x dependencies.

``` js
name=vp1  // nom à modifier!
folder=/Users/PM/Dev/$name
cd $folder
mkdir docs && cd docs
folder=/Users/PM/Dev/$name/docs
echo '# Hello VuePress' > README.md
yarn add -D vuepress
vuepress dev
```

- Création pages bar et foo, config.js avec navbar et sidebar...

```
cd $folder && mkdir foo && mkdir bar
echo '---
title: Vuepress Foo
tags: 
  - configuration
  - sidebar
sidebarDepth: 0
---

# Hello Foo VuePress!

tags pour search:
  - configuration
  - sidebar' > foo/README.md
echo '---
title: Vuepress Bar
tags: 
  - configuration
  - javascript
sidebarDepth: 0
---

# Hello Bar VuePress!

tags pour search:
  - configuration
  - javascript' > bar/README.md
config="module.exports = {
  title: 'My Vuepress!',
  description: 'A demo documentation using VuePress',
  version: '1.0.0',
  author: 'PM',
  license: 'MIT',
  themeConfig:{
    nav: [
      { text: 'nav FOO', link: '/foo/' },
      { text: 'nav BAR', link: '/bar/' },
    ],
    sidebar: [
      {
        title: 'Foo',
        collapsable: true,
        children: [
          '/foo/',
        ]
      },
      {
        title: 'Bar',
        collapsable: true,
        children: [
          '/bar/'
        ]
      }
    ],
    sidebarDepth: 2,
  }
};"
mkdir .vuepress && echo $config > .vuepress/config.js
```

- build: `vuepress build` crèe le dossier .vuepress si nécessaire, et crèe la version de production dans .vuepress/dist.

```
vuepress build && serve .vuepress/dist
```

### Configuration

VuePress requires `README.md` as default file in a navbar link. Forgetting `README.md` would skip the creation of that navbar item.  
To activate the header and search feature we just need to add the title and description into the exported object.

H<sub>2</sub>O 29 <sup>th</sup> <u>underline</u>  <p class="style-me">H2O</p> 

To enable some features (homepage, sidebar, navigation, etc.), we need to create a config file: `.vuepress/config.js`, copy to it: 

```
"module.exports = {
  title: 'My Vuepress!',
  description: 'A demo documentation using VuePress',
  version: '1.0.0',
  author: 'PM',
  license: 'MIT',
  evergreen: true,
  plugins:  [
    ['element-ui'],
    ['vuepress-plugin-global-toc'],
    [
      'vuepress-plugin-container',
      {
        type: 'right',
        defaultTitle: '',
      },
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'theorem',
        before: info => `<div class='theorem'><p class='title'>${info}</p>`,
        after: '</div>',
      },
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'foo',
        defaultTitle: 'titre par défaut...',
        before: info => `<div class='foo'><p class='title'>${info}</p>`,
        after: '</div>',
      },
    ],
  ],
  thirdPartyComponents: {
    fontAwesomeIcons:{
        regular:['address-card','address-book','arrow-alt-circle-down','user-circle'],
        solid:['address-card','address-book','arrow-alt-circle-down','user-circle']
        }
    },
  themeConfig:{
      nav: [
          { text: 'nav FOO', link: '/foo/' },
          { text: 'nav BAR', link: '/bar/' },
      ],
      sidebar: [
          {
              title: 'Foo',
              collapsable: true,
              children: [
                '/foo/',
                '/foo/font-awesome',
                '/foo/a-foo/',
                '/foo/a-foo/plugins'
              ]
          },
          {
              title: 'Bar',
              collapsable: true,
              children: [
                  '/bar/',
                  '/bar/contact'
              ]
          }
          ],
      sidebarDepth: 2,
  }
  }
```

**Basic config includes:**    
  * base: set the base directory of the site  
  * title: set the title of the site  
  * description: set the content of the meta tag named description ` <meta name="description" content=""> `  
  * head: add other tags you would like to add in the head section of the HTML page.  
  * dest: set which folder the compiled files will be outputted when you run vuepress build   
  * port: specify the port to run the dev server on...
  * evergreen: is set to false by default. When set to true, it will disable support for older versions of Internet Explorer. The build time is significantly reduced, it will work faster, and the final build size of your site will be much smaller.

To enable the sidebar, use `themeConfig.sidebar`. The sidebar automatically displays links for headers in the current active page, using `themeConfig.sidebarDepth`. The default depth is 1, which extracts the h2 headers. Setting it to 0 disables the header links, and the max value is 2 which extracts both h2 and h3 headers. A page can also override this value via `YAML front matter`.

**See all the config options (theme, plugins, markdown...):** [configuration](https://vuepress.vuejs.org/config)  

### Ajout de librairie Vuejs: 

You can apply app-level enhancements by creating a file .vuepress/enhanceApp.js, which will be imported into the app if it’s present. The file should export default a hook function which will  install extra Vue plugins, register global components, or add extra router hooks:
[Samantha Ming](https://github.com/vuejs/vuepress/issues/2072)

### Index and search:

Built-in Search only builds index from the title, h2 and h3 headers and tags in Frontmatter.   
Normal text isn't indexed by VuePress's internal search.

### Creating a new theme

   If you want to get started with your own theme, the easiest way is to eject the default theme using `$ vuepress eject`. All this does is copy the default theme files to .vuepress/theme.
