import Dative from 'dativejs'
import helper from '@dativejs/helpers'
import prism from "prismjs";
import template from './app.dative.html'

export let App = Dative.extend({
    template,
    use: [helper],
    onmounted() {
        prism.highlightAll()
    }
})