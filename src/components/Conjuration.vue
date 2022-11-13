<template>
  <h2>咒术</h2>
  <div class="warp">
    <el-tag
    v-for="tag in getTagType"
    :key="tag"
    class="mx-1 tag"
    closable
    :disable-transitions="false"
  >
    {{ tag }}
  </el-tag>
  </div>
</template>

<script lang="ts" setup>
import { useCounterStore, useCounterStore2 } from '@/stores/counter';
import { computed } from '@vue/reactivity';
const store = useCounterStore();
const getTagType = computed(() => store.getTagType)
</script>

<style scoped>
.warp {
  border: solid 1px black;
  padding: 10px;
}
.tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
