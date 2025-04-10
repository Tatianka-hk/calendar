<template>
    <div
        :class="[
            'rounded-[20px] h-[120px] w-[320px] flex justify-center items-center text-2xl text-basic-text',
            props.type === AlertType.Success ? 'bg-success' : 'bg-error',
        ]"
    >
        {{ props.message }}
    </div>
</template>
<script lang="ts" setup>
enum AlertType {
    Success = "success",
    Error = "error",
}

interface AlertProps {
    type: AlertType;
    message: string;
}

const props = defineProps<AlertProps>();
</script>
