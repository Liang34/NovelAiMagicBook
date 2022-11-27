<template>
  <main class="main">
    <div class="left">
      <div>咒术名称</div>
      <el-input v-model="name" placeholder="请输入tagneme" style="margin: 5px 0 8px;"></el-input>
      <div>咒术内容</div>
      <el-input v-model="content" placeholder="请输入content" style="margin: 5px 0 8px;"></el-input>
      <div>咒术收藏夹</div>
      <el-radio-group v-model="collectionIds" class="ml-4">
        <el-radio v-for="item in collections" :label="item.id" size="large">{{ item.name }}</el-radio>
      </el-radio-group>
      <div>是否公开</div>
      <el-switch v-model="ispublic" class="ml-2" style="margin: 5px 0 8px;" />
      <el-button @click="handleCreate" type="primary">新建咒术</el-button>
    </div>
    <el-divider direction="vertical" style="height: 100%;" />
    <div class="right">
      <div class="right_left">
        点击收藏夹查看咒术
        <el-radio-group v-model="collectionisplayIds" class="ml-4" @change="collectionChange">
          <el-radio v-for="item in collections" :label="item.id" size="large">{{ item.name }}</el-radio>
        </el-radio-group>
      </div>
      <el-divider direction="vertical" style="height: 100%;" />
      <div class="right_right">咒术</div>
    </div>
  </main>
</template>

<script lang="ts">
import { createIncantation, getCollection, getIncantation } from '@/http/request';
import { onMounted, reactive, ref, toRefs } from 'vue';
export default {
  setup() {
    const name = ref();
    const content = ref();
    const ispublic = ref();
    const collectionIds = ref()
    const state = reactive({
      collections: []
    });
    const handleCreate = async () => {
      const res = await createIncantation({
        name: name.value,
        content: content.value,
        is_public: ispublic.value ? 1 : 2,
        collection_ids: [collectionIds.value]
      });
      await getIncantation({ collection_id: collectionIds.value, sort: 1 })
    }
    const getCollections = async () => {
      const { collections } = await getCollection({ collection_type: 1 })
      state.collections = collections
    }
    onMounted(getCollections)
    const collectionisplayIds = ref()
    const collectionChange = async (str: string) => {
      const res = await getIncantation({
        collection_id: collectionisplayIds.value,
        sort: 2, // TODO
      })
    }
    return {
      name,
      content,
      ispublic,
      collectionIds,
      handleCreate,
      collectionisplayIds,
      ...toRefs(state),
      collectionChange
    }
  }
}

</script>

<style scoped lang="less">
.main {
  display: flex;
  align-items: center;
  height: 100%;
}

.left {
  height: 100%;
  padding: 20px;
  flex: 1;
  display: flex;
  // flex-direction: column;
  // justify-content: center;
}

.right {
  flex: 3;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
}

.right_left {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.right_right {
  flex: 3;
}

.custom-tabs-label {
  font-size: 20px;
}
</style>