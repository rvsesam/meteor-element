---
title: Geopattern
date: 2020-05-14
updatedAt: 2020-05-14
author: PM
tags:
- Meteorlxy
category: Vuepress
location: Kampot
links:
- key: "Create beautiful generative geometric background images from a string: " 
  texte: "geo_pattern"
  lien: "https://github.com/jasonlong/geo_pattern"
- key: "Javascript port by Brandon Mills:"
  texte: geopattern
  lien: "https://github.com/btmills/geopattern"
---

# GeoPattern

Generate beautiful tiling SVG patterns from a string. The string is converted
into a SHA and a color and pattern are determined based on the values in the
hash. The color is determined by shifting the hue and saturation from a default
(or passed in) base color. One of 16 patterns is used (or you can specify one)
and the sizing of the pattern elements is also determined by the hash values.

You can use the generated pattern as the `background-image` for a container.
Using the `base64` representation of the pattern still results in SVG
rendering, so it looks great on retina displays.

See the [GitHub Guides](https://guides.github.com/) site and the [Explore section
of GitHub](https://github.com/explore) are examples of this library in action.
Brandon Mills has put together an awesome [live preview
page](http://btmills.github.io/geopattern/geopattern.html) that's built on his
Javascript port.

## Installation on Node.js:

```javascript
npm install geopattern

var GeoPattern = require('geopattern');
var pattern = GeoPattern.generate('GitHub');
pattern.toDataUrl(); // url("data:image/svg+xml;...
```

## Usage

Make a new pattern:

```javascript
pattern = GeoPattern.generate('Mastering Markdown')
```

To specify a base background color (with a hue and saturation that adjusts depending on the string):

```javascript
pattern = GeoPattern.generate('Mastering Markdown', base_color: '#fc0')
```

To use a specific background color (w/o any hue or saturation adjustments):

```javascript
pattern = GeoPattern.generate('Mastering Markdown', color: '#fc0')
```

To use a specific [pattern generator](#available-patterns):

```javascript
pattern = GeoPattern.generate('Mastering Markdown', patterns: :sine_waves)
```

To use a subset of the [available patterns](#available-patterns):

```javascript
pattern = GeoPattern.generate('Mastering Markdown', patterns: [:sine_waves, :xes])
```

Get the SVG string:

```ruby
puts pattern.to_svg
# => <svg xmlns="http://www.w3.org/2000/svg" ...
```

Get the Base64 encoded string:

```ruby
puts pattern.to_base64
# => PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC...
```

You can then use this string to set the background:

```html
<div style="background-image: <%= pattern.to_data_uri %>"></div>
```

## API

`GeoPattern.generate(string, options)` 

Returns a newly-generated, tiling SVG Pattern. String Will be hashed using the SHA1 algorithm, and the resulting hash will be used as the seed for generation.

`options.color` 

Specify an exact background color. This is a CSS hexadecimal color value.

`options.baseColor` 

Controls the relative background color of the generated image. The color is not identical to that used in the pattern because the hue is rotated by the generator. This is a CSS hexadecimal color value, which defaults to #933c3c.

`options.generator` 

Determines the pattern. All of the original patterns are available in this port, and their names are camelCased.

`Pattern.color`

Gets the pattern's background color as a hexadecimal string.

```javascript
GeoPattern.generate('GitHub').color // => "#455e8a"
```

`Pattern.toString() and Pattern.toSvg()`

Gets the SVG string representing the pattern.

`Pattern.toBase64()`

Gets the SVG as a Base64-encoded string.

`Pattern.toDataUri()`

Gets the pattern as a data URI, i.e. data:image/svg+xml;base64,PHN2ZyB....

`Pattern.toDataUrl()`

Gets the pattern as a data URL suitable for use as a CSS background-image, i.e. url("data:image/svg+xml;base64,PHN2ZyB...").

## Available patterns

*Note: As of version `1.3.0`, string references (e.g. `overlapping_circles`)
are deprecated in favor of symbol references (e.g. `:overlapping_circles`).*

### :chevrons

![](https://jasonlong.github.io/geo_pattern/examples/chevrons.png)


### :octagons

![](https://jasonlong.github.io/geo_pattern/examples/octogons.png)

### :overlapping_circles

![](https://jasonlong.github.io/geo_pattern/examples/overlapping_circles.png)

### :plus_signs

![](https://jasonlong.github.io/geo_pattern/examples/plus_signs.png)

### :xes

![](https://jasonlong.github.io/geo_pattern/examples/xes.png)

### :sine_waves

![](https://jasonlong.github.io/geo_pattern/examples/sine_waves.png)

### :hexagons

![](https://jasonlong.github.io/geo_pattern/examples/hexagons.png)

### :overlapping_rings

![](https://jasonlong.github.io/geo_pattern/examples/overlapping_rings.png)

### :plaid

![](https://jasonlong.github.io/geo_pattern/examples/plaid.png)

### :triangles

![](https://jasonlong.github.io/geo_pattern/examples/triangles.png)

### :squares

![](https://jasonlong.github.io/geo_pattern/examples/squares.png)

### :nested_squares

![](https://jasonlong.github.io/geo_pattern/examples/nested_squares.png)

### :mosaic_squares

![](https://jasonlong.github.io/geo_pattern/examples/mosaic_squares.png)

### :concentric_circles

![](https://jasonlong.github.io/geo_pattern/examples/concentric_circles.png)

### :diamonds

![](https://jasonlong.github.io/geo_pattern/examples/diamonds.png)

### :tessellation

![](https://jasonlong.github.io/geo_pattern/examples/tessellation.png)
