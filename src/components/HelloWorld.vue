<script setup lang="ts">
import { onMounted } from 'vue';
import { watch } from 'vue';
import { ref } from 'vue'

defineProps<{ msg: string }>()
const basicDate = new Date('2024/07/31')
const showCalendar1 = ref(false)
const showCalendar2 = ref(false)
const selectedDate = ref('')
const targetDate = ref(`${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`)
// const targetTime = ref(0)
const diffValue = ref(-1)
// const onConfirm1 = (date:Date) => {
//   targetDate.value = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
//   showCalendar1.value = false;
//   targetTime.value = new Date(targetDate.value).setHours(0,0,0)
// };
const onConfirm2 = (date:Date) => {
  selectedDate.value = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  showCalendar2.value = false;
  const _date = new Date(selectedDate.value).setHours(0,0,0)
  diffValue.value = (_date - basicDate.getTime())/1000/60/60/24
};
const currentDesc = ref('')
const currentDaySche = ref('')
const imagSrc = ref('')
const paibanList = [{
  label: '白班第一天',
  value: '0',
  label1: '白一'
},
{
  label: '白班第二天',
  value: '1',
  label1: '白二'
},
{
  label: '白班第三天',
  value: '2',
  label1: '白三'
},
{
  label: '夜班',
  value: '3',
  label1: '夜班'
},
{
  label: '下夜',
  value: '4',
  label1: '下夜'
},
{
  label: '休假',
  value: '5',
  label1: '休假'
}
]

const descText = ref('')

const mapDesc = (val: number) => {
  if(val%6 === 0) {
    currentDesc.value = selectedDate.value && paibanList[0].label
    descText.value = '加油，元气满满的一天！'
    imagSrc.value = 'jiayou.jfif'
  } else if( val%6 === 1) {
    currentDesc.value  = selectedDate.value && paibanList[1].label
    descText.value = '加油，元气满满的一天！'
    imagSrc.value = 'jiayou.jfif'
  } else if(val%6 === 2) {
    descText.value = selectedDate.value && '加油，元气满满的一天！'

    currentDesc.value  = paibanList[2].label
    imagSrc.value = 'jiayou.jfif'
    
  } else if(val%6 === 3) {
    currentDesc.value  = selectedDate.value && paibanList[3].label
    descText.value = '熬最晚的夜，看最早的太阳!'
    imagSrc.value = 'yeban.gif'
  } else if(val%6 === 4) {
    currentDesc.value  = selectedDate.value &&  paibanList[4].label
    descText.value = '天亮了，下班了，该休息了'
    imagSrc.value = 'xiayeban.gif'
  }else if(val%6 === 5) {
    currentDesc.value  =  selectedDate.value && paibanList[5].label
    descText.value = '我的快乐回来了。。'
    imagSrc.value = 'xiujia.jpeg'
  }
}

watch(diffValue,(val) => {
  mapDesc(val)
})

const formatter = (day: any) => {
  const time1 = day.date.getTime()
  const diff = (time1 - basicDate.getTime())/1000/60/60/24
  
  day.topInfo = paibanList[diff%6].label1

  return day;
};
onMounted(() => {
  const _currentDate =  new Date(targetDate.value).setHours(0,0,0)
  diffValue.value =( _currentDate - basicDate.getTime())/1000/60/60/24
  currentDaySche.value = paibanList[diffValue.value].label

})
</script>

<template>
  <div>
    <h2>{{ msg }}</h2>
    <van-form >
      <van-field
        v-model="targetDate"
        is-link
        readonly
        name="calendar"
        label="当前日期"
        placeholder="点击选择日期"
        @click="showCalendar1 = false"
      />
      <van-calendar disabled v-model:show="showCalendar1" />
      <van-field
        v-model="currentDaySche"
        label="当前排班"
      />
      <!-- <van-field name="radio" label="单选框">
        <template #input>
          <van-radio-group v-model="checked" direction="horizontal">
            <van-radio :name="item.value" v-for="item in paibanList">{{ item.label }}</van-radio>
          </van-radio-group>
        </template>
      </van-field> -->
      <van-field
        v-model="selectedDate"
        is-link
        readonly
        name="calendar"
        label="选择要查看的日期"
        placeholder="点击选择日期"
        @click="showCalendar2 = true"
      />
      <van-calendar v-model:show="showCalendar2" @confirm="onConfirm2" :formatter="formatter" title="排班日期"/>
      <van-field
        v-model="currentDesc"
        label="所选日期排班"
        placeholder="排班"
      />
  </van-form>
  <h4>
    {{ descText }}
  </h4>
  <van-image
    width="10rem"
    height="10rem"
    fit="contain"
    :src="imagSrc"
  />
  </div>


  
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
