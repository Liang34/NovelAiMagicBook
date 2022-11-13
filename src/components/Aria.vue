<template>
  <h2>咏唱</h2>
  <el-input
    v-model="aria"
    @input="inputChange"
    :rows="2"
    type="textarea"
    placeholder="Please input"
  />
</template>

<script lang="ts" setup>
import { useCounterStore } from '@/stores/counter';
import { ref } from 'vue';
const { count, modifyTag } = useCounterStore();
const aria = ref(count);
const inputChange = (input: string) => {
  aria.value = input
  modifyTag(input)
}

</script>
