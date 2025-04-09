<template>
    <!-- TODO: left, right, up, down -->
    <div
        :class="[
            ' text-basic-text flex justify-center items-center shrink-0 hover:bg-primary cursor-pointer',
        ]"
        :style="{
            height: `${buttonMeta.height}px`,
            width: `${buttonMeta.width}px`,
            minHeight: `${buttonMeta.height}px`,
            minWidth: `${buttonMeta.width}px`,
            backgroundColor: buttonMeta.backgroundColor,
        }"
    >
        <slot />
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    height: Number,
    width: Number,
    backgroundColor: String,
});

const buttonMeta = computed(() => {
    return {
        height: props.height ? props.height : 66,
        width: props.width ? props.width : 160,
        backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : "#00a4b8",
    };
});
</script>
