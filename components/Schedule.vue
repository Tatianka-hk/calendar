<template>
    <div class="flex flex-col">
        <Header @changedMode="mode = $event" />
        <Day v-if="mode === 'day'" />
        <Week v-else />
    </div>
</template>
<script setup lang="ts">
import { Header, Day, Week } from ".";
import { ref } from "vue";
const mode = ref<string>("day");
</script>
