<template>
  <main class="main">
    <div class="left">
      <div>收藏夹名字</div>
      <el-input v-model="collection" style="margin: 5px 0 8px;"></el-input>
      <div> 收藏夹类型</div>
      <el-radio-group v-model="collectionType" class="ml-4" style="display: block; margin: 5px 0 8px;">
        <el-radio label=1 size="large">咒术</el-radio>
        <el-radio label=2 size="large">咏唱</el-radio>
        <el-radio label=3 size="large">法典</el-radio>
      </el-radio-group>
      <el-button @click="handleCreateCollection" type="primary" style="display: block">
        创建收藏夹
      </el-button>
    </div>
    <el-divider direction="vertical" style="height: 100%;" />
    <div class="right">
      <div style="font-weight: 400px; font-size: 20px">我的收藏夹</div>
      <el-tabs class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane>
          <template #label>
            <span class="custom-tabs-label">
              <el-icon>
                <DocumentAdd />
              </el-icon>
              <span>咒术</span>
            </span>
          </template>
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>咒术收藏夹</span>
              </div>
            </template>
            <div v-for="o in collections" :key="o.id">{{ o.name }}</div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span class="custom-tabs-label">
              <el-icon>
                <Document />
              </el-icon>
              <span>咏唱</span>
            </span>
          </template>
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>咏唱收藏夹</span>
              </div>
            </template>
            <div v-for="o in collections" :key="o.id">{{ o.name }}</div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span class="custom-tabs-label">
              <el-icon>
                <Notebook />
              </el-icon>
              <span>法典</span>
            </span>
          </template>
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>法典收藏夹</span>
              </div>
            </template>
            <div v-for="o in collections" :key="o.id">{{ o.name }}</div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>
  </main>
</template>

<script lang="ts">
import { createCollection, getCollection } from '@/http/request';
import { DocumentAdd, Notebook } from '@element-plus/icons-vue';
import { type TabsPaneContext, ElInput, ElRadioGroup, ElRadio, ElButton, ElDivider, ElTabs, ElTabPane, ElIcon, ElCard } from 'element-plus';
import { onMounted, reactive, ref, toRefs } from 'vue';
export default {
  setup() {
    const collection = ref()
    const collectionType = ref(0)
    async function handleCreateCollection() {
      const res = await createCollection({
        name: collection.value,
        collection_type: Number(collectionType.value),
      })
    }
    const state = reactive({
      collections: []
    });
    const getCollections = async () => {
      const res = await getCollection({ collection_type: 1 });
      state.collections = res.collections
    }
    const currentCollections = ref(1);
    const handleClick = async (tab: TabsPaneContext, event: Event) => {
      currentCollections.value = Number(tab.index || 0) + 1
      const res = await getCollection({ collection_type: currentCollections.value });
      state.collections = res.collections
    }
    onMounted(getCollections);
    return {
      collection,
      collectionType,
      handleCreateCollection,
      handleClick,
      ...toRefs(state)

    }
  }
}
</script>

<style scope lang="less">
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
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.right {
  flex: 3;
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.custom-tabs-label {
  font-size: 20px;
}
</style>
