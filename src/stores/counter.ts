import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref('aa, bb, cc, dd, ee, ff, gg, hh, ii, jj, kk')
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }
  const getStringType = count.value;
  const getTagType = computed(() => {
    return count.value.split(/[/,]/g)
  })
  const modifyTag = (str: string) => {
    count.value = str
  }
  return { count, getStringType, getTagType, modifyTag }
})
export const useCounterStore2 = defineStore('counter2', () => {
  const count2 = ref(1)
  const doubleCount = computed(() => count2.value * 2)
  function increment() {
    count2.value++
  }
  return { count2, doubleCount, increment }
})

