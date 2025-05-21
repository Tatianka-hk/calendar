<template>
    <div class="flex h-full">
        <WeekDay
            :key="day"
            v-for="day in 7"
            :events="events?.[day]?.events || []"
        />
    </div>
</template>
<script setup lang="ts">
import WeekDay from "./WeekDay.vue";
import { useRemember } from "../composables";
const { getRemember } = useRemember();

const getEvents = async (newValue) => {
    const res = await API.EVENTS.getWeek(newValue);
    if (!res) {
        console.warn("No response from API.EVENTS.getEvents()");
        return [];
    }
    const data = await res.json();
    if (data.statusCode === 401) {
        router.push("/signin");
    }
    return data.week;
};
const events = ref(await getEvents(getRemember("selectedDay")));
watch(
    () => getRemember("selectedDay"),
    async (newValue) => {
        console.log("selectedDay changed", newValue);
        events.value = await getEvents(newValue);
    },
    { deep: true }
);
</script>
