<template>
  <div class="w-[420px]">
        <button @click="toPrevMonth"><</button>
        <span>{{ monthName }}, {{ year }}</span>
        <button @click="toNextMonth">></button>
    <div>
        <div v-for="week in weekAmountOfMonth()" :key="week" class="grid grid-cols-7 w-[280px]">
            <div v-for="day in 7" :key="day"  class="w-[40px] h-[40px] text-black border-1 border-black flex justify-center">
                <span>
                {{ (week === 1 && day   >= weekDay) || week!= 1 ? getDayNumber(week, day) > monthsDays[month] ? (getDayNumber(week, day)  - monthsDays[month]) : getDayNumber(week, day)   : dayOfPrevMonth(day)}}
            </span>
            </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { months, monthsDays} from "../static/index";
import { ref } from "vue";
const today: Date = new Date();
const month: number = ref(Number(today.getMonth()));
const monthName = ref<string>(months[month.value]);
const year: number = ref(today.getFullYear());
const weekDay: number = ref(findWeekDay());

const toNextMonth = () => {
  month.value = month.value + 1;
  if (month.value > 11) {
    month.value = 0;
    year.value = year.value + 1;
  }
  monthName.value = months[month.value-1];
  weekDay.value = findWeekDay();
};

const toPrevMonth = () => {
  month.value = month.value - 1;
  if (month.value < 0) {
    month.value = 11;
    year.value = year.value - 1;
  }
  monthName.value = months[month.value];
  weekDay.value = findWeekDay();
};
function findWeekDay() {
  const date = new Date(year.value, month.value, 1);
  return date.getDay();
}
const dayOfPrevMonth = (day:number)=>{
  const indexPrevMonth = month.value - 1 < 0 ? 11 : month.value - 1
  return ( monthsDays[indexPrevMonth] -  (weekDay.value - day - 1))
}

const weekAmountOfMonth = () => {
  return Math.ceil(monthsDays[month.value] / 7);
};

const getDayNumber = (week: number, day: number) => {
  return ((week - 1) * 7 + (day - weekDay.value) + 1)
};
</script>
