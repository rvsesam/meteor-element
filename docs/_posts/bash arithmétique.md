---
title: bash et arithmétique
tags:
- zsh
- terminal
category: shell
top: 2
date: 2020-05-02
location: Kampot
---

## incrémenter une variable

```bash
a=1
((a++))
a=$(($a + 1))
let "a=$a + 1"
a=$(echo "$a+1" |bc )  # bc -l pour les décimales...
```
