
const MODULE_NAME = 'lazy-resources'

import Vue from 'vue'
import Collector from '../plugins/Collector'
import FontList from '../classes/FontList'

Vue.use(Collector)

export default (context, inject) => {
  inject('fonts', new FontList(<%= options.fonts %>))
}