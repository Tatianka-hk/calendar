<template>
    <div
        @click="openDialog"
        class="text-primary text-xl bg-yellow-300 h-[60px] w-[100px] flex gap-2 items-center p-2"
    >
        {{ header }}, <span class="font-[200]"> {{ hour }}</span>
        <div v-if="opened && isEditing">
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
interface EventProps {
    hour: string;
    header: string;
    description: string;
    date: string;
    id: number;
    isEditing: boolean;
}
const props = withDefaults(defineProps<EventProps>(), {
    isEditing: false,
});

const { opened, openDialog, closeDialog } = useDialog();
</script>
