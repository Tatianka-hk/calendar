<template>
    <div class="flex flex-col relative">
        <Hour v-for="hour in hours" :hour="hour" :key="hour" />
        <draggable
            v-model="events"
            group="events"
            @end="onDragEnd"
            class="h-[100vh] w-[100vw] absolute top-0 left-0"
        >
            <template #item="{ element }">
                <Event
                    :event="element"
                    :key="element.id"
                    :hour="element.hour"
                    :header="element.header"
                    :style="{
                        position: 'absolute',
                        top: calcTop(element.hour) + 'px',
                    }"
                />
            </template>
        </draggable>
    </div>
</template>
і
<script lang="ts" setup>
import { hours } from "~/static";
import { Hour, Event } from "./";
import draggable from "vuedraggable";

const events = ref([
    {
        id: 0,
        hour: "08:00",
        header: "piscina",
    },
    {
        id: 1,
        hour: "08:30",
        header: "gimnasios",
    },
    {
        id: 2,
        hour: "09:00",
        header: "comer",
    },
]);
const getHourFromTop = (top: number) => {
    const totalHours = top / 62;
    const hour = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hour) * 60);

    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(hour)}:${pad(minutes)}`;
};
const onDragEnd = (e: any) => {
    const top = e.originalEvent.clientY - e.to.getBoundingClientRect().top;
    const newHour = getHourFromTop(top);
    const movedIndex = e.newIndex;
    events.value[movedIndex].hour = newHour;
};

const calcTop = (hour: string) => {
    const hourIndex = Number(hour.split(":")[0]);
    const minutes = Number(hour.split(":")[1]);
    return hourIndex * 62 + (minutes / 60) * 62;
};
</script>
