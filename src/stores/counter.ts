import { ref, computed, reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'

export const useAriaStore = defineStore('aria', () => {
  const state = reactive({
    aria: []
  })
  const modifyAria = (params: {}) => {
    if(state.aria.find(item => item.id === params.id)) {
      return
    }
    state.aria.push({...params, count: 1})
  }
  const deleteAria = (params: any) => {
    state.aria = state.aria.filter(item => item.id !== params.id)
  }
  const addAria = (params: {}) => {
    state.aria.forEach(item => {
      if(item.id === params.id) {
        item.count++
      }
    })
  }
  const subAria = (params: any) => {
    state.aria.forEach(item => {
      if(item.id === params.id && item.count > 1) {
        item.count--
      }
    })
  }
  return { ...toRefs(state), modifyAria, deleteAria, addAria, subAria}
})

