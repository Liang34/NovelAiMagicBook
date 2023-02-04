<template>
  <div class="main-aria ">
    <div class="left-aria ">
      <NewIncantationDialog :createSuccess=createSuccess :centerDialogVisible=centerDialogVisible
        @close="centerDialogVisible = false" />
      <el-button text @click="centerDialogVisible = true">
        新建咒术
      </el-button>
      <el-divider />
      咒术收藏夹
      <div style="display: flex;">
        <div v-for="item in collections" :key="item.id" class="collection-box"
          :class="(collectionisplayIds === item.id && 'select-box')" @click="handleChangeIds(item.id)">
          <span>{{ item.name }}</span>
        </div>
        <div key="0" class="collection-box" :class="(collectionisplayIds === 0 && 'select-box')"
          @click="handleChangeIds(0)">
          <span>所有</span>
        </div>
      </div>
      <el-divider />
      <div style="display: flex; flex-wrap: wrap;">
        <IncantationTag v-for="item in incantations" :incantation="item" @click="handleClick(item)" :delIncantation=delIncantation />
      </div>
    </div>
    <el-divider direction="vertical" style="height: 100%;" />
    <div class="right-aria ">
      <div style="margin: 5px;">咒术：</div>
      <div class="aria-list" v-if="getAria.length > 0">
        <IncantationTagInput v-for="item in getAria" :incantation="item" :deleteIncantation=deleteIncantation
          :addIncantation=addIncantation :subIncantation=subIncantation />
      </div>
      <div style="margin: 5px;">咏唱：</div>
      <el-input v-model="inputAria" :rows="2" type="textarea" placeholder="Please input" ref="inputAriaRef" />
      <el-button @click="clickCopy" text style="margin: 5px;">复制咏唱</el-button>
      <el-button @click="clickCopy" text style="margin: 5px;">收藏咏唱</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { delReqIncantation, getCollection, getIncantation } from '@/http/request';
import { useAriaStore } from '@/stores/counter';
import { useDark } from '@vueuse/core';
import { ElMessage } from 'element-plus';
import { computed, onMounted, reactive, ref, toRaw, toRefs } from 'vue';
import IncantationTag from './IncantationTag.vue';
import IncantationTagInput from './IncantationTagInput.vue';
import NewIncantationDialog from './dialog/NewIncantationDialog.vue'
export default {
  setup() {
    const state = reactive({
      incantations: [],
      collections: [],
    })
    const getCollections = async () => {
      const { collections } = await getCollection({ collection_type: 1 })
      state.collections = collections
    }
    const collectionisplayIds = ref(0);
    const centerDialogVisible = ref(false);
    const handleClose = () => {
      centerDialogVisible.value = true
    }
    onMounted(getCollections)
    const fetchIncantation = async (ids: number) => {
      const res = await getIncantation({
        collection_id: ids,
        sort: 2, // TODO
      })
      state.incantations = res.incantations
    }
    onMounted(() => fetchIncantation(0))
    const store = useAriaStore();
    const handleClick = (item: never) => {
      store.modifyAria(item)
    }
    const getAria = computed(() => store.aria)
    const inputAria = computed(() => {
      const names = store.aria.map(item => {
        const content = `${item.count > 1 ? new Array(item.count).fill('{').join('') : ''}${item.content}${item.count > 1 ? new Array(item.count).fill('}').join('') : ''}`
        return content
      })
      return names.join(',');
    })
    const deleteIncantation = (item: any) => {
      store.deleteAria(toRaw(item))
    }
    const addIncantation = (item: any) => {
      store.addAria(toRaw(item))
    }
    const subIncantation = (item: any) => {
      store.subAria(toRaw(item))
    }
    const createSuccess = (params1: any) => {
      const params = toRaw(params1)
      if (Array.isArray(params) && params.length > 1) {
        collectionisplayIds.value = 0
        fetchIncantation(0)
        return
      } else if (Array.isArray(params) && params.length === 1) {
        collectionisplayIds.value = params[0]
        fetchIncantation(Number(params[0]))
      }
    }
    const handleChangeIds = (ids: number) => {
      collectionisplayIds.value = ids;
      fetchIncantation(Number(ids))
    }
    const delIncantation = async (incantation: any) => {
      console.log(toRaw(incantation))
      const res = await delReqIncantation({ids: [incantation.id]});
      if(res.status === 1) {
        ElMessage.success('删除成功')
        fetchIncantation(Number(collectionisplayIds.value))
      }
      return res;
    }
    const inputAriaRef = ref();
    const clickCopy = () => {
      inputAriaRef.value.select();
      document.execCommand("copy");
      ElMessage.success('复制咏唱成功')
    }
    return {
      collectionisplayIds,
      deleteIncantation,
      handleClick,
      addIncantation,
      subIncantation,
      createSuccess,
      getAria,
      ...toRefs(state),
      inputAria,
      centerDialogVisible,
      handleClose,
      handleChangeIds,
      delIncantation,
      inputAriaRef,
      clickCopy
    }
  },
  components: {
    IncantationTag,
    IncantationTagInput,
    NewIncantationDialog,
  }
}

</script>

<style scope lang="less">
.main-aria {
  display: flex;
  height: 100%;
  overflow: overlay;
}

.left-aria {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.select-box {
  background: #409Eff;
}

.collection-box {
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgba(167, 139, 139, 0.72);
  padding: 5px 10px;
  margin: 3px;
  cursor: pointer;
  transition: all 2s;
}

.collection-box:hover {
  background: pink;
}

.right-aria {
  flex: 1;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .aria-list {
    display: flex;
    flex-wrap: wrap;
    border-radius: 6px;
    padding: 5px;
    box-shadow: 0px 0px 12px rgba(167, 139, 139, 0.72);
  }
}
</style>

