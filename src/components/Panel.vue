<template>
  <div class="todo-panel">
      <div class="todo-panel-header">
        <div class="header-title">
          <strong>今天</strong> {{ now }}
        </div>
        <Input @keyup.enter.native="onSubmit" :autofocus='true'/>
      </div>

      <Tabs value="todayItems" type='card' @tab-click="onTabChange" class='todo-tabs' >
        <TabPane label="今天" name="todayItems"></TabPane>
        <TabPane label="未完成" name="uncompletedItems"></TabPane>
        <TabPane label="已完成" name="completedItems"></TabPane>
      </Tabs>

      <List :items='items'></List>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import List from './List'
import { Input, Collapse, Tabs, TabPane } from 'element-ui'
import { ITEM_CREATE, ACTION_ITEM_INIT } from '../store/types'

export default {
  name: 'app',
  mounted () {
    this.$store.dispatch(ACTION_ITEM_INIT)
  },
  data () {
    return {
      filter: 'todayItems',
      active: null
    }
  },
  computed: {
    ...mapGetters(['todayItems', 'completedItems', 'uncompletedItems']),
    now: () => moment().format('dddd MMM Do'),
    items: function () {
      return this[this.filter]
    }
  },
  methods: {
    onSubmit (event, msg) {
      this.$store.commit(ITEM_CREATE, { content: event.target.value })
      event.target.value = ''
    },
    onCollapseChange (id) {
      this.active = id
    },
    onTabChange (tab, event) {
      this.filter = tab.name
    }
  },
  components: { List, Input, Collapse, Tabs, TabPane }
}
</script>

<style lang='sass' scoped>

.todo-collapse
  border: none

.todo-tabs
  margin-top: 20px

.todo-panel
  margin: 0 20px;

  &-header
    
    .header-title
      font-size: 12px;
      color: grey
      padding-bottom: 6px
      margin-bottom: 4px

      strong
        font-weight: bold
        color: black
        margin-right: 8px

</style>
