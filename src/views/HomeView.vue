<script setup lang="ts">
import { createCollection } from '@/http/request';
import { ref } from 'vue';
import Collection from '@/components/Collection.vue'
import Incantation from '@/components/Incantation.vue';
import AriaList from '@/components/AriaList.vue'
enum ConnlectionType {
  COLLECTION_TYPE_INCANTATION = 1, // 咒术
  COLLECTION_TYPE_CHANT = 2, // 咏唱
  COLLECTION_TYPE_MAGICBOOK = 3, // 魔法书
}
const name = ref();
const content = ref();
const ispublic = ref();
const isAdd = ref(false)
const collection = ref('')
const collectionType = ref(0)
async function handleCreateCollection() {
  const res = await createCollection({
    name: collection.value,
    collection_type: collectionType.value,
  })
}
</script>

<template>
  <main class="main">
    <el-tabs tab-position="left" style="height: 100%; width: 100%;">
      <el-tab-pane label="收藏夹">
        <Collection />
      </el-tab-pane>
      <el-tab-pane label="咒术">
        <AriaList />
      </el-tab-pane>
      <el-tab-pane label="咏唱">
        <AriaList />
      </el-tab-pane>
      <el-tab-pane label="法典">
        <AriaList />
      </el-tab-pane>
    </el-tabs>
  </main>
</template>

<style lang="less">
.el-tabs__content {
  height: 100%;
}
.el-tab-pane {
  height: 100%;
}
</style>
