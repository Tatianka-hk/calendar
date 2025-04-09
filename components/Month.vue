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
                    @click="() => toPrevMonth()"
                    class="w-[44px] h-[44px] flex justify-end items-center"
                >
                    <ChevronLeftIcon class="w-[24px] h-[24px]" />
                </button>
                <span>{{ monthName }}, {{ year }}</span>
                <button
                    @click="() => toNextMonth()"
                    class="w-[44px] h-[44px] flex justify-start items-center"
                >
                    <ChevronRightIcon class="w-[24px] h-[24px]" :width="88" />
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
import { ref, computed } from "vue";
import { Button } from "~/ui";
const today: Date = new Date();
const month = ref<number>(Number(today.getMonth()));
const monthName = ref<string>(months[month.value]); //computed
const year = ref<number>(today.getFullYear());
const weekDay = ref<number>(findWeekDay()); //computed

const WEEK_AMOUNT = 6;
const selectedDay = ref<Date>(today);

const toNextMonth = () => {
    if (month.value >= 11) {
        month.value = 0;
        year.value = year.value + 1;
    } else {
        month.value = month.value + 1;
    }
    monthName.value = months[month.value];
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
    console.log(
        clickedDay,
        clickedMonth,
        clickedYear,
        monthsDays[clickedMonth]
    );
    clickedDay =
        clickedDay < 1
            ? monthsDays[clickedMonth ? clickedMonth : month.value]
            : clickedDay > monthsDays[month.value + 1]
            ? 1
            : clickedDay;
    console.log(clickedDay);
    selectedDay.value = new Date(
        clickedYear ? clickedYear : year.value,
        clickedMonth ? clickedMonth : month.value,
        clickedDay
    );

    month.value = clickedMonth ? clickedMonth : month.value;
    console.log("month", month.value);
    monthName.value = months[month.value];
    console.log("monthName", monthName.value);
    year.value = clickedYear ? clickedYear : year.value;
    weekDay.value = findWeekDay();
};

const onKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    switch (e.key) {
        case "ArrowUp":
            let clickedMonth =
                selectedDay.value.getDate() <= 7
                    ? month.value - 1
                    : month.value;
            let clickedYear = year.value;
            if (clickedMonth < 0) {
                clickedMonth = 11;
                clickedYear = year.value - 1;
            }
            selectDay(
                selectedDay.value.getDate() - 7,
                clickedMonth,
                clickedYear
            );
            break;
        case "ArrowDown":
            let clickedMonth1 =
                selectedDay.value.getDate() >= monthsDays[month.value] - 7
                    ? month.value - 1
                    : month.value;
            let clickedYear1 = year.value;
            if (clickedMonth1 < 0) {
                clickedMonth1 = 11;
                clickedYear1 = year.value - 1;
            }
            selectDay(
                selectedDay.value.getDate() + 7,
                clickedMonth1,
                clickedYear1
            );
            break;
        case "ArrowLeft":
            let clickedMonth2 =
                selectedDay.value.getDate() <= 1
                    ? month.value - 1
                    : month.value;
            let clickedYear2 = year.value;
            if (clickedMonth2 < 0) {
                clickedMonth2 = 11;
                clickedYear2 = year.value - 1;
            }
            selectDay(
                selectedDay.value.getDate() - 1,
                clickedMonth2,
                clickedYear2
            );
            break;
        case "ArrowRight":
            let clickedMonth3 =
                selectedDay.value.getDate() >= monthsDays[month.value] - 1
                    ? month.value + 1
                    : month.value;
            let clickedYear3 = year.value;
            if (clickedMonth3 > 11) {
                clickedMonth3 = 0;
                clickedYear3 = year.value + 1;
            }
            selectDay(
                selectedDay.value.getDate() + 1,
                clickedMonth3,
                clickedYear3
            );
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
