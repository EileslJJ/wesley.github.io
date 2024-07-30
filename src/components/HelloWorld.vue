<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()
const showCalendar = ref(false)
const selectedDate = ref('')

const onConfirm = (date:Date) => {
  selectedDate.value = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  showCalendar.value = false;
};
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
    <van-form >
  <van-field
    v-model="selectedDate"
    is-link
    readonly
    name="calendar"
    label="日历"
    placeholder="点击选择日期"
    @click="showCalendar = true"
  />
  <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />
  </van-form>
  </div>


  
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
