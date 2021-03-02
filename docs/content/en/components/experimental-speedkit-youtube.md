---
title: SpeedkitYoutube (Experimental)
description: ''
position: 34
category: Components

features:
  - Lazy Load Integration
  - Automatically generated poster
---

[view source](https://github.com/GrabarzUndPartner/nuxt-speedkit/blob/main/lib/components/experimental/SpeedkitYoutube.vue)

<alert type="warning">Experimental Komponente. `nuxt-speedkit-components/experimental/SpeedkitYoutube`</alert>


```html
<speedkit-youtube id="…" />
```

`SpeedkitYoutube` wird verwendet für das einfache einbinden eines Youtube Videos.

## Features

<list :items="features"></list>

## Properties


```js
{
  id: 'XXXXXXX',
  autoplay: false
}
```

### `id`
- Type: `String`
  - <badge>required</badge>

Legt die Youtube-ID fest.

### `autoplay`
- Type: `Boolean`
  - Default: `false`

Wenn gesetzt, wird wenn die mitte des Viewports erreicht ist, der Player automatisch gestartet.

## Events

```html
<speedkit-picture 
  @ready="console.log('Ready!')" 
  @loading="console.log('Video Loading!')" 
  @playing="console.log('Video Playing!')" 
  @enter="console.log('Viewport!')" 
/>
```

### `ready`

Tritt ein wenn Youtube-Api komplett geladen ist.

### `loading`

Tritt ein wenn Video angefangen wird zu laden.

### `playing`

Tritt ein wenn Video fertiggeladen ist und abspielt.

### `enter`

Tritt ein wenn Komponente den Viewport erreicht hat.


