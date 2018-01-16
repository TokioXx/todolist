<template>
  <div>
    <div class="todo-item" v-if='!active'>
      <Button class="todo-item-status" :icon="icon" :round="true" @click.left.stop="onDone"></Button>
      <div class="todo-item-content">{{ content }}</div>
      <Button class="todo-item-delete" @click.left.stop="onDelete">
        <i class="el-icon-delete"></i>
      </Button>
    </div>
    <div class="todo-editor" v-if='active'>
      <Input :value='content' class="todo-editor-content" :ref='id'/>
      <DatePicker type='datetime' v-model="newExpire" class='todo-editor-datepicker' align='right'></DatePicker>
      <div>
        <Button class="todo-editor-save" type='danger' @click.stop='onSave'>保存</Button>
        <Button class="todo-editor-cancel" type='text' plain @click.stop='onCancel'>取消</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Input, Button, Row, Col, Radio, DatePicker } from 'element-ui'
import { ITEM_DELETE, ITEM_UPDATE, ITEM_ACTIVE } from '../store/types'

export default {
  data () {
    return {
      newExpire: this.expire
    }
  },
  props: {
    id: String,
    content: String,
    expire: Date,
    done: Boolean,
    createdAt: Date,
    active: false
  },
  updated () {
    if (!this.active) return
    this.$refs[this.id].focus()
  },
  computed: {
    title: function () {
      return this.active ? '' : this.content
    },
    icon: function () {
      return this.done ? 'el-icon-check' : ''
    }
  },
  methods: {
    onDone (event) {
      this.$store.commit(
        ITEM_UPDATE,
        Object.assign({}, this.$props, { done: !this.done })
      )
    },
    onDelete (event) {
      this.$store.commit(ITEM_DELETE, this.id)
    },
    onClick (event) {
      window.test = this.$refs
      window.id = this.id + ''
      console.log(this.$refs, this.id, window.test[window.id])
    },
    onSave (event) {
      this.$store.commit(ITEM_UPDATE, Object.assign({}, this.$props, { expire: this.newExpire }))
      this.$store.commit(ITEM_ACTIVE, null)
    },
    onCancel () {
      this.$store.commit(ITEM_ACTIVE, null)
    }
  },
  components: { Input, Button, Row, Col, Radio, DatePicker }
}
</script>


<style lang="sass" scoped>

$size: 20px !default

.todo-item
  display: flex;
  align-items: center
  justify-content: space-between
  height: 48px

  &-status 
    padding: 0 
    width: $size
    height: $size
  
  &-content
    display: flex
    align-items: center
    height: $size
    width: 70%

  &-delete 
    padding: 0 !important;
    width: $size
    height: $size
    margin: 0 20px;

.todo-editor
  position: relative

  &-datepicker
    width: 30%
    position: absolute
    top: 0
    right: 0
    
  &-save, &-cancel
    margin-top: 10px
    margin-right: 6px

  &-cancel
    padding: 6px 3px
  
  
</style>

