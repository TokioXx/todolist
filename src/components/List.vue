<template>
  <div class='todo-list'>
    <div v-for="item in items" :key="item.id">
      <Item :content='item.content' :expire='item.expire' :id='item.id' :active='active === item.id' :done='item.done' :createdAt='item.createdAt' @click.left.native='onItemClick(item.id)'></Item>
    </div>
  </div>
</template>

<script>
import Item from './Item'
import { ITEM_ACTIVE } from '../store/types'

export default {
  props: {
    items: Array
  },
  computed: {
    active: function () { return this.$store.state.item.active }
  },
  methods: {
    onItemClick (id) {
      this.$store.commit(ITEM_ACTIVE, id)
    }
  },
  components: { Item }
}
</script>

<style lang="sass" scoped>

</style>
