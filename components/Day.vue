<template>
    <div class="flex flex-col relative">
        <Hour v-for="hour in hours" :hour="hour" :key="hour" />
        <draggable
            v-model="events"
            group="events"
            @end="onDragEnd"
            class="absolute top-0 left-0"
        >
            <template #item="{ element }">
                <Event
                    @edit="refreshEvents"
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
                    :isEditing="true"
                />
            </template>
        </draggable>
    </div>
</template>
<script lang="ts" setup>
import { hours } from "~/static";
import { Hour, Event } from "./";
import draggable from "vuedraggable";
import { useRemember } from "~/composables";
const { getRemember } = useRemember();
const selectedDay = getRemember("selectedDay");
const getEvents = async (newValue: string) => {
    const res = await API.EVENTS.getEvents(newValue);
    if (!res) {
        console.warn("No response from API.EVENTS.getEvents()");
        return [];
    }
    const data = await res.json();
    if (data.statusCode === 401) {
        router.push("/signin");
    }
    return data.events;
};
watch(
    () => getRemember("selectedDay"),
    async (newValue) => {
        events.value = await getEvents(newValue);
    },
    { deep: true }
);
const editAllEvents = async () => {
    const res = await API.EVENTS.editALL(events.value);
    if (!res) {
        console.warn("No response from API.EVENTS.editAllEvents()");
        return [];
    }
    const data = await res.json();
    if (data.statusCode === 401) {
        router.push("/signin");
    }
};

onMounted(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
});

onUnmounted(() => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
});

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    editAllEvents();
    event.preventDefault();
    event.returnValue = "";
};
const events = ref(await getEvents(selectedDay));

const refreshEvents = async () => {
    events.value = await getEvents(selectedDay);
};
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
    events.value[movedIndex].time = newHour;
};

const calcTop = (hour: string) => {
    const hourIndex = Number(hour.split(":")[0]);
    const minutes = Number(hour.split(":")[1]);
    return hourIndex * 62 + (minutes / 60) * 62;
};
</script>
