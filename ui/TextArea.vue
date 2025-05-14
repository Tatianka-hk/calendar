<template>
    <input
        type="text"
        class="h-[68px] bg-basic-text text-base text-primary border-4 border-secondary px-1 w-[80vw] sm:w-[60vw]"
        :placeholder="props.placeholder"
        v-model="value"
        @input="$emit('update:value', $event.target.value)"
    />
</template>
<script lang="ts" setup>
const props = defineProps({
    type: String,
    placeholder: String,
    defaultValue: String,
    value: String,
});
const model = defineModel();
</script>
