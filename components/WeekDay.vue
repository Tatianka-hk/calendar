<template>
    <div
        class="border-[2px] border-secondary w-[calc(100%/7)]"
        ref="containerRef"
    >
        <Event
            v-for="element in events"
            :event="element"
            :key="element.id"
            :hour="element.time"
            :header="element.name"
            :description="element.description"
            :date="element.date"
            :id="element._id"
            :style="{
                position: 'absolute',
                top: calcTop(element.time) + 'px',
            }"
        />
    </div>
</template>
<script lang="ts" setup>
import { Event } from "./";
const props = defineProps<{
    events: any[];
}>();

const containerRef = ref<HTMLDivElement>();
console.log("events", props.events);
const calcTop = (hour: string) => {
    const containerHeight = containerRef.value?.offsetHeight ?? 0;
    const containerTop = containerRef.value?.offsetTop ?? 0;
    const [hoursStr, minutesStr] = hour.split(":");
    const hourIndex = Number(hoursStr);
    const minutes = Number(minutesStr);

    const totalHours = hourIndex + minutes / 60;

    // containerHeight / 24 — це висота однієї години
    return totalHours * (containerHeight / 24) + containerTop;
};
</script>
