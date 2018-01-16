<template>
  <div class="container">
    <i class="el-icon-warning" v-if='expired'></i>
    <div class="todo-item" v-if='!active'>
      <Button class="todo-item-status" :icon="icon" :round="true" @click.left.stop="onDone"></Button>
      <div class="todo-item-content">
        <div>
          {{ content }}
        </div>
        <Progress v-if='percentage' :percentage='percentage' class='percentage' :status='status' :stroke-width='1' :show-text='false'></Progress>
      </div>
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
import { Input, Button, Row, Col, Radio, DatePicker, Progress } from 'element-ui'
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
    },
    status: function () {
      return this.percentage > 90 ? 'exception' : ''
    },
    percentage: function () {
      if (!this.expire || this.done) {
        return 0
      }

      const p = (Date.now() - this.createdAt) / (this.expire - this.createdAt) * 100
      return p > 100 ? 100 : p
    },
    expired: function () {
      return this.done ? false : Date.now() > this.expire
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
  components: { Input, Button, Row, Col, Radio, DatePicker, Progress }
}
</script>


<style lang="sass" scoped>

$size: 20px !default

.container
  position: relative

  .el-icon-warning
    color: red
    position: absolute
    top: 16px
    left: -21px


.todo-item
  display: flex;
  position: relative
  align-items: center
  height: 48px

  &-status 
    padding: 0 
    width: $size
    height: $size
  
  &-content
    display: flex
    align-items: center
    height: $size
    position: absolute
    width: 80%
    left: 10%
  
    .percentage
      position: absolute
      width: 100%
      bottom: 0
    
  &-delete 
    padding: 0 !important;
    width: $size
    height: $size
    position: absolute
    right: 0

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

