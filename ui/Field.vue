<template>
    <div class="flex flex-col gap-2 justify-start">
        <span class="text-primary text-2xl">{{ props.label }}</span>
        <input
            :type="props.type"
            class="h-[68px] bg-basic-text text-base text-primary border-4 border-secondary px-1 w-[80vw] sm:w-[60vw]"
            :placeholder="props.placeholder"
            @input="$emit('update:modelValue', $event.target.value)"
            v-model="props.value"
        />
    </div>
</template>
<script lang="ts" setup>
interface FieldProps {
    placeholder: string;
    label: string;
    type: string;
    name: string;
    value: string;
}
const props = defineProps<FieldProps>();
</script>
