<template>
  <div class="warp">
    <el-space wrap>
      <el-icon @click="subIncantation(incantation)">
        <Minus />
      </el-icon>
      {{ incantation.name }}
      ({{ incantation.content }})
      <el-icon @click="addIncantation(incantation)" >
        <Plus />
      </el-icon>
      <el-icon @click="deleteIncantation(incantation)">
        <Close />
      </el-icon>
    </el-space>
  </div>
</template>
<script lang="ts">
import { computed } from '@vue/reactivity';


export default {
  props: ['incantation', 'deleteIncantation', 'addIncantation', 'subIncantation'],
  setup(props, ctx) {
    return {
      deleteIncantation: props.deleteIncantation,
      incantation: computed(() => props.incantation),
      addIncantation: props.addIncantation,
      subIncantation: props.subIncantation
    }
  }
}
</script>
<style scoped lang="less">
.warp {
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 0px 12px rgba(167, 139, 139, 0.72);
  margin: 2px;
  flex-wrap: nowrap;
}
</style>