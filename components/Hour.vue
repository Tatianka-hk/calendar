<template>
    <div
        class="text-primary text-2xl border-2 border-secondary h-[62px] flex items-center"
    >
        <span class="ml-4">{{ props.hour }}:00</span>
    </div>
</template>
<script lang="ts" setup>
interface HourProps {
    hour: string;
}
const props = defineProps<HourProps>();
</script>
