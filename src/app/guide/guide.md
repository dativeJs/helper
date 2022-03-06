# DativeJs Helpers
## Introduction
### What's @dativejs/helpers used for ??

`@dativejs/helpers` added some functions to the instance which can be helpful to you in your code

## Installation
```bash
npm i @dativejs/helpers
```

#### Usage

```js
import Dative from 'dativejs'
import helpers from '@dativejs/helpers'


var app = new Dative({
    el: "#app",
    use: [helpers],
    template: `
        <div>
            {\{#each $range(6) as n}}
                <h{\{n}}>h{\{n}}</h{\{n}}>
            {\{/each}}
        </div>
    `
})
```

#### @dativejs/helpers uses the ``defineProperty`` to make it property

@dativejs/helpers adds 


| Helpers   |     Descriptions      |
|----------|-------------|
| ``$truncate`` |  Limit a text string to a specific number of characters or words. |
| ``$range`` |    Iterate over a range of values.  |
| ``$interval`` | Run a function every n milliseconds. |
| ``$timeout`` | Run a function a milliseconds. |
| ``$screen`` | Detect if the current browser width is equal or greater than a given breakpoint. |

 




## ``$truncate`` 
Example:

```js
data: { 
    characters: 50, 
    string: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}
```

```html
<div on:click="characters = undefined">
    {\{$truncate(string, characters)}}
    <!-- Text will show 'Lorem ipsum dolor sit amet, consectetur adipiscing…' and will reveal all when clicked-->
</div>
````
 You may also pass a third argument to change the string that will be appended to the end:

```html
<div>
    {\{$truncate(string, characters, ' (...)')}}
    <!-- Text will show 'Lorem ipsum dolor sit amet, consectetur adipiscing (...)' -->
</div>
```

## ``$range``
---
The ``$range`` helper mostly mimics implementations found in other languages ``$range(start, stop, step = 1)``

```html
<div>
    {\{#each $range(1, 5) as item}}
        ...
    {\{/each}}    
</div>
<!--This will output 5 iterations [1, 2, 3, 4, 5],-->
```

## ``$screen``

Example:

The ``$screen`` helper detects if the current browser width is equal or greater than a given breakpoint and returns true or false based on the result.

```html
<div>
    {\{#if $screen('lg')}}
        <span>This will be visible if the window width is equal or greater than 1024px.</span>
    {\{/if}}
</div>
```

By _**default**_ the ``$screen`` helper uses the following endpoint borrowed by Tailwind CSS:

- ``xs``: 0px
- ``sm``: 640px
- ``md``: 768px
- ``lg``: 1024px
- ``xl``: 1280px
- ``2xl``: 1536px




> ⚠️ NOTE: A single breakpoint is only going to tell you if the browser width is equal or greater than the given breakpoint. If you want to restrict the check to a specific range, you will need to negate the next endpoint as:

```html
<div>
    {\{#if $screen('md') && !$screen('lg')}}
        <span>This will be visible if screen width is equal or greater than 768px but smaller then 1024px.</span>
    {\{/if}}
</div>
```

### Custom breakpoints

You can pass a numeric value to use an ad-hoc breakpoint.

```html
<div>
    {\{#if $screen(999)}}
        <span>This will be visible if screen width is equal or greater than 999px.</span>
    {\{/if}}
</div>
```

## `$timeout`

This works exactly like the `setTimout` function in javascript

## `$interval`

This works exactly like the `setInterval` function in javascript