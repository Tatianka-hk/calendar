<template>
    <div
        class="border-[4px] border-secondary p-4 w-fit"
        :onkeydown="(e) => onKeyDown(e)"
        tabindex="0"
    >
        <div
            class="flex items-center h-[76px] justify-between w-full text-center mb-4"
        >
            <!-- START MONTH LABEL -->
            <div
                class="text-primary text-[24px] flex items-center text-center gap-1"
            >
                <button
                    @click="toPrevMonth"
                    class="w-11 h-11 flex justify-end items-center"
                >
                    <ChevronLeftIcon class="w-6 h-6" />
                </button>
                <span>{{ monthName }}, {{ year }}</span>
                <button
                    @click="toNextMonth"
                    class="w-11 h-11 flex justify-start items-center"
                >
                    <ChevronRightIcon class="w-6 h-6" :width="88" />
                </button>
            </div>
            <!-- End Start MONTH LABEL -->
            <Button :width="80" :height="60">Today</Button>
        </div>
        <div class="flex flex-col gap-2">
            <div
                v-for="week in WEEK_AMOUNT"
                :key="week"
                class="grid grid-cols-7 w-[420px] gap-2"
            >
                <Button
                    v-for="day in 7"
                    :key="day"
                    :height="48"
                    :width="48"
                    :onClick="() => selectDay(getDayNumber(week, day))"
                    :backgroundColor="getColor(week, day)"
                >
                    {{ getDayToShow(week, day) }}
                </Button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { months, monthsDays } from "../static/index";
import { ChevronLeftIcon, ChevronRightIcon } from "../assets/icons";
import { ref } from "vue";
import { Button } from "~/ui";
const today: Date = new Date();
const month = ref<number>(Number(today.getMonth()));
const monthName = ref<string>(months[month.value]);
const year = ref<number>(today.getFullYear());
const weekDay = ref<number>(findWeekDay());

const WEEK_AMOUNT = 6;
const selectedDay = ref<Date>(today);

const checkMonth = (m: number, y: number) => {
    if (m > 11) {
        month.value = 0;
        year.value = y + 1;
    } else if (m < 0) {
        month.value = 11;
        year.value = y - 1;
    } else {
        month.value = m;
        year.value = y;
    }
};
const updateMonthData = () => {
    monthName.value = months[month.value];
    weekDay.value = findWeekDay();
};

const toNextMonth = () => {
    month.value = month.value + 1;
    checkMonth(month.value, year.value);
    updateMonthData();
};

const toPrevMonth = () => {
    month.value = month.value - 1;
    checkMonth(month.value, year.value);
    updateMonthData();
};
function findWeekDay() {
    const date = new Date(year.value, month.value, 1);
    return date.getDay();
}
const dayOfPrevMonth = (day: number) => {
    const indexPrevMonth = month.value - 1 < 0 ? 11 : month.value - 1;
    return weekDay.value !== 0
        ? monthsDays[indexPrevMonth] - (weekDay.value - day - 1)
        : monthsDays[indexPrevMonth] - (7 - day - 1);
};

const getDayNumber = (week: number, day: number) => {
    const firstDay = weekDay.value === 0 ? 7 : weekDay.value;
    return (week - 1) * 7 + (day - firstDay) + 1;
};

const selectDay = (
    clickedDay: number,
    clickedMonth?: number,
    clickedYear?: number
) => {
    month.value = clickedMonth ? clickedMonth : month.value;
    year.value = clickedYear ? clickedYear : year.value;
    selectedDay.value = new Date(year.value, month.value, clickedDay);
    updateMonthData();
};

const moveSelectedDay = (offset: number) => {
    const current = selectedDay.value;
    const newDate = new Date(current);
    newDate.setDate(current.getDate() + offset);

    const newDay = newDate.getDate();
    const newMonth = newDate.getMonth();
    const newYear = newDate.getFullYear();

    checkMonth(newMonth, newYear);
    selectDay(newDay, newMonth, newYear);
};
const onKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    switch (e.key) {
        case "ArrowUp":
            moveSelectedDay(-7);
            break;
        case "ArrowDown":
            moveSelectedDay(+7);
            break;
        case "ArrowLeft":
            moveSelectedDay(-1);
            break;
        case "ArrowRight":
            moveSelectedDay(+1);
            break;
    }
};

const getColor = (week: number, day: number) => {
    return selectedDay.value.getDate() === getDayNumber(week, day)
        ? "#34558b"
        : getDayNumber(week, day) > monthsDays[month.value] ||
          (week === 1 && day < weekDay.value) ||
          (week === 1 && weekDay.value === 0 && day != 7)
        ? "#90abe8"
        : "#00a4b8";
};

const getDayToShow = (week: number, day: number) => {
    return (week === 1 && day >= weekDay.value && weekDay.value !== 0) ||
        (week === 1 && weekDay.value === 0 && day === 7) ||
        week != 1
        ? getDayNumber(week, day) > monthsDays[month.value]
            ? getDayNumber(week, day) - monthsDays[month.value]
            : getDayNumber(week, day)
        : dayOfPrevMonth(day);
};
</script>
