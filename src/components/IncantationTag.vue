<template>
  <div class="warp">
    <div>{{ incantation.name || 'No Name' }}</div>
    <div style="display: flex; align-items: center;">
      <div>
        <el-icon>
          <Star />
        </el-icon>
        {{ incantation.likes }}
      </div>
      <el-divider direction="vertical" />
      <div>
        <el-icon>
          <Star />
        </el-icon>
        {{ incantation.likes }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { toRefs } from 'vue';

export default {
  props: ['incantation'],
  setup(props, ctx) {
    return {
      ...toRefs(props.incantation)
    }
  }
}
</script>
<style scoped lang="less">
.warp {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 0px 12px rgba(167, 139, 139, 0.72);
  margin: 2px;
}
</style>