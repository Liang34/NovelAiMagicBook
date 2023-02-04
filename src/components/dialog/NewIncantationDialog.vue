<template>
  <el-dialog v-model="centerDialogVisible" title="新建咒术" width="30%" align-center @close="$emit('close')">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="咒术名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入咒术名称" />
      </el-form-item>
      <el-form-item label="咒术内容" prop="content">
        <el-input v-model="form.content" placeholder="请输入咒术内容" />
      </el-form-item>
      <el-form-item label="咒术收藏夹" prop="collectionIds">
        <el-select v-model="form.collectionIds" placeholder="请选择收藏夹" style="width: 100%;" multiple>
          <el-option v-for="item in collections" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否公开">
        <el-switch v-model="form.is_public" />
      </el-form-item>
      <el-form-item>
        <el-button @click="$emit('close')">取消</el-button>
        <el-button type="primary" @click="handleCreate(ruleFormRef)">新建</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { createIncantation, getCollection, getIncantation } from '@/http/request';
import { computed } from '@vue/reactivity';
import { ElMessage, type FormInstance } from 'element-plus';
import { onMounted, reactive, ref, toRefs } from 'vue';
export default {
  props: ['createSuccess', 'centerDialogVisible', 'onClose'],
  setup(props, { emit }) {
    const ruleFormRef = ref<FormInstance>();
    const state = reactive({
      collections: [],
      rules: {
        name: [{ required: true, message: '请输入咒术名称', trigger: 'blur' }],
        content: [{ required: true, message: '请输入咒术内容' }],
        collectionIds: [{ required: true, message: '请选择收藏夹' }]
      },
      form: {
        name: '',
        content: '',
        is_public: false,
        collectionIds: []
      }
    });
    const handleCreate = async (formEL: FormInstance| undefined) => {
      if (!formEL) return
      await formEL.validate(async (valid, fields) => {
        if (valid) {
          const res = await createIncantation({ ...state.form, is_public: state.form.is_public ? 1 : 2 });
          if (res.status === 1) {
            ElMessage.success('新建咒术成功');
            props.createSuccess && props.createSuccess(state.form.collectionIds)
          }
          formEL.resetFields()
          emit('close')
        } else {
          console.log('error submit!', fields)
        }
      })
      return
    }
    const getCollections = async () => {
      const { collections } = await getCollection({ collection_type: 1 })
      state.collections = collections
    }
    onMounted(getCollections)
    const collectionisplayIds = ref()
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }
    // const collectionChange = async (str: string) => {
    //   const res = await getIncantation({
    //     collection_id: collectionisplayIds.value,
    //     // sort: 2, // TODO
    //   })
    // }
    return {
      ruleFormRef,
      handleCreate,
      collectionisplayIds,
      ...toRefs(state),
      resetForm,
      // collectionChange,
      centerDialogVisible: computed(() => props.centerDialogVisible),
      
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