<script setup lang="ts">
import { watch } from 'vue';
import { ref } from 'vue'

defineProps<{ msg: string }>()
const showCalendar1 = ref(false)
const showCalendar2 = ref(false)
const selectedDate = ref('')
const targetDate = ref('')
const targetTime = ref(0)
const diffValue = ref(0)
const onConfirm1 = (date:Date) => {
  targetDate.value = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  showCalendar1.value = false;
  targetTime.value = new Date(targetDate.value).setHours(0,0,0)
};
const onConfirm2 = (date:Date) => {
  selectedDate.value = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  showCalendar2.value = false;
  const _date = new Date(selectedDate.value).setHours(0,0,0)
  diffValue.value = (_date - targetTime.value)/1000/60/60/24
};
const currentDesc = ref('')

const checked = ref('1')
const paibanList = [{
  label: '白班',
  value: '0'
},
{
  label: '大夜',
  value: '1'
},
{
  label: '小夜',
  value: '2'
},
{
  label: '休假第一天',
  value: '3'
},
{
  label: '休假第二天',
  value: '4'
}
]

watch(diffValue,(val) => {
  if((val%5 + Number(checked.value)) === 0) {
    currentDesc.value = '所选日期为：白班'
  } else if((val%5 + Number(checked.value)) === 1) {
    currentDesc.value  = '所选日期为：大夜'
  } else if((val%5 + Number(checked.value)) === 2) {
    currentDesc.value  = '所选日期为：小夜'
  } else if((val%5 + Number(checked.value)) === 3) {
    currentDesc.value  = '所选日期为：休假第一天'
  } else if((val%5 + Number(checked.value)) === 4) {
    currentDesc.value  = '所选日期为：休假第二天'
  }
})
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
    <van-form >
      <van-field
        v-model="targetDate"
        is-link
        readonly
        name="calendar"
        label="基准日期"
        placeholder="点击选择日期"
        @click="showCalendar1 = true"
      />
      <van-calendar v-model:show="showCalendar1" @confirm="onConfirm1" />
      <van-field name="radio" label="单选框">
        <template #input>
          <van-radio-group v-model="checked" direction="horizontal">
            <van-radio :name="item.value" v-for="item in paibanList">{{ item.label }}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="selectedDate"
        is-link
        readonly
        name="calendar"
        label="日历"
        placeholder="点击选择日期"
        @click="showCalendar2 = true"
      />
      <van-calendar v-model:show="showCalendar2" @confirm="onConfirm2" />
      <van-field
        v-model="currentDesc"
        label="当前日期排班"
        placeholder="当前日期排班"
      />
  </van-form>
  </div>


  
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
