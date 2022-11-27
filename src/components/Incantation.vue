<template>
  <main class="main-incantation">
    <!-- <div style="font-size: 25px; font-weight: 400">新建咒术</div> -->
    <div>咒术名称</div>
    <el-input v-model="name" placeholder="请输入咒术名称" style="margin: 5px 0 8px;"></el-input>
    <div>咒术内容</div>
    <el-input v-model="content" placeholder="请输入内容" style="margin: 5px 0 8px;"></el-input>
    <div>咒术收藏夹</div>
    <el-radio-group v-model="collectionIds" class="ml-4">
      <el-radio v-for="item in collections" :label="item.id" size="large">{{ item.name }}</el-radio>
    </el-radio-group>
    <div>是否公开</div>
    <el-switch v-model="ispublic" class="ml-2" style="margin: 5px 0 8px;" />
    <el-button @click="handleCreate" type="primary">新建咒术</el-button>
  </main>
</template>

<script lang="ts">
import { createIncantation, getCollection, getIncantation } from '@/http/request';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref, toRefs } from 'vue';
export default {
  props: ['createSuccess'],
  setup(props) {
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
      if(res.status === 1) {
        ElMessage.success('新建咒术成功');
        props.createSuccess && props.createSuccess(collectionIds.value)
      }
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
        // sort: 2, // TODO
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
.main-incantation {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>