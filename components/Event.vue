<template>
    <div class="text-primary text-2xl bg-yellow-300 h-[60px] w-[100px]">
        Event {{ hour }}
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    hour: String,
    header: String,
});
</script>
