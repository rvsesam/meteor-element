---
title: "Terminal: Gestion du curseur et de l'affichage..."
date: 2020-04-30
tags:
- terminal
- zsh
author: PM
category: shell
top: 2
location: Kampot
---

Encadrer les couleurs-attributs de texte par `\033[`et terminer par `m`

```bash
  param     results...
   0         reset all attributes to their defaults
   1         bold
   2         half-bright
   4         underscore
   5         blink
   7         reverse video
   21        underline
   22        normal intensity
   24        underline off
   25        blink off
   27        reverse video off

   30        set black foreground
   31        set red foreground
   32        set green foreground
   33        set brown foreground
   34        set blue foreground
   35        set magenta foreground
   36        set cyan foreground
   37        set white foreground
   39        set default foreground color

   40        set black background
   41        set red background
   42        set green background
   43        set brown background
   44        set blue background
   45        set magenta background
   46        set cyan background
   47        set white background
   49        set default background color
```
