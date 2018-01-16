<template>
  <div class='todo-list'>
    <div v-for="item in items" :key="item.id">
      <Item :content='item.content' :expire='item.expire' :id='item.id' :active='active === item.id' :done='item.done' :createdAt='item.created_at' @click.left.native='onItemClick(item.id)'></Item>
    </div>
  </div>
</template>

<script>
import Item from './Item'

export default {
  data: function () {
    return {
      active: null
    }
  },
  props: {
    items: Array
  },
  methods: {
    onItemClick (id) {
      this.active = id
    }
  },
  components: { Item }
}
</script>

<style lang="sass" scoped>

</style>
