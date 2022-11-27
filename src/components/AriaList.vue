<template>
  <div class="main-aria ">
    <div class="left-aria ">
      <!-- <div>所有咒术</div> -->
      <IncantationTag v-for="item in incantations" :incantation="item" @click="handleClick(item)" />
    </div>
    <el-divider direction="vertical" style="height: 100%;" />
    <div class="right-aria ">
      <div style="margin: 5px;">咒术：</div>
      <div class="aria-list" v-if="getAria.length > 0">
        <IncantationTagInput v-for="item in getAria" :incantation="item" :deleteIncantation=deleteIncantation :addIncantation=addIncantation :subIncantation=subIncantation />
      </div>
      <div style="margin: 5px;">咏唱：</div>
      <el-input v-model="inputAria" :rows="2" type="textarea" placeholder="Please input" />
    </div>
  </div>
</template>

<script lang="ts">
import { getIncantation } from '@/http/request';
import { useAriaStore } from '@/stores/counter';
import { computed, onMounted, reactive, ref, toRaw, toRefs } from 'vue';
import IncantationTag from './IncantationTag.vue';
import IncantationTagInput from './IncantationTagInput.vue'
export default {
  setup() {
    const state = reactive({
      incantations: []
    })
    const fetchIncantation = async () => {
      const res = await getIncantation({
        collection_id: 0,
        sort: 2, // TODO
      })
      state.incantations = res.incantations
    }
    onMounted(fetchIncantation)
    const store = useAriaStore();
    const handleClick = (item: never) => {
      store.modifyAria(item)
    }
    const getAria = computed(() => store.aria)
    const inputAria = computed(() => {
      const names = store.aria.map(item => {
        const content = `${item.count > 1 ? new Array(item.count).fill('{').join(''): ''}${item.content}${item.count > 1 ? new Array(item.count).fill('}').join(''): ''}`
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
    const subIncantation  = (item: any) => {
      store.subAria(toRaw(item))
    }
    return {
      deleteIncantation,
      handleClick,
      addIncantation,
      subIncantation,
      getAria,
      ...toRefs(state),
      inputAria
    }
  },
  components: {
    IncantationTag,
    IncantationTagInput,
  }
}

</script>

<style scope lang="less">
.main-aria {
  display: flex;
  align-items: center;
  height: 100%;
}

.left-aria {
  height: 100%;
  padding: 20px;
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.right-aria {
  flex: 3;
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

