<template>
  <div class="warp">
    <div>{{ incantation.name || 'No Name' }}</div>
    <div style="display: flex; align-items: center;">
      <div style="display: flex; align-items: center;">
        <el-icon style="margin-right: 3px;">
          <Star />
        </el-icon>
        {{ incantation.likes }}
      </div>
      <el-divider direction="vertical" />
      <div style="display: flex; align-items: center;">
        <el-icon style="margin-right: 3px;">
          <Star />
        </el-icon>
        {{ incantation.likes }}
      </div>
      <el-divider direction="vertical" />
      <div style="display: flex; align-items: center;" @click="delDialog = true">
        <el-icon>
          <Delete />
        </el-icon>
      </div>
    </div>
  </div>
  <el-dialog v-model="delDialog" title="注意" width="30%" align-center>
    <span>确定删除改咒术吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="delDialog = false">取消</el-button>
        <el-button type="primary" @click="deleteInca">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { ref, toRefs } from 'vue';

export default {
  props: ['incantation', 'delIncantation'],
  setup(props, ctx) {
    const deleteInca = async (e: MouseEvent) => {
      const res = await props.delIncantation(props.incantation)
      if(res.status === 1) {
        delDialog.value = false;
      }
      e.stopPropagation()
      return
    }
    const delDialog = ref(false);
    return {
      ...toRefs(props.incantation),
      delDialog,
      deleteInca
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