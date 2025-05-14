<template>
    <Dialog>
        <div class="bg-white p-4">
            <slot></slot>
            <div class="flex gap-4 mt-6">
                <Button @сlick="props.onSave"> Зберегти</Button>
                <Button @сlick="props.onCancel"> Скасувати</Button>
            </div>
        </div>
    </Dialog>
</template>
<script setup lang="ts">
import { Dialog, Button } from "./";
interface Props {
    onSave: () => void;
    onCancel: () => void;
}
const props = defineProps<Props>();
</script>
