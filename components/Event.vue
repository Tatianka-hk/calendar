<template>
    <div
        @click="openDialog"
        class="text-primary text-xl bg-yellow-300 h-[60px] w-[100px] flex gap-2 items-center p-2"
    >
        {{ header }}, <span class="font-[200]"> {{ hour }}</span>
        <div v-if="opened">
            <EditEvent
                @edit="$emit('edit')"
                :onClose="closeDialog"
                :time="hour"
                :name="header"
                :id="id"
                :date="date"
                :description="description"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useDialog } from "../composables";
import { EditEvent } from "./";
const props = defineProps({
    hour: String,
    header: String,
    id: Number,
    date: String,
    description: String,
});

const { opened, openDialog, closeDialog } = useDialog();
</script>
