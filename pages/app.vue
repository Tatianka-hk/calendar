<template>
    <div class="flex justify-between">
        <Month />
        <Schedule :class="`w-[calc(100%-500px)]`" />
    </div>
</template>
<script lang="ts" setup>
import { Month, Day } from "../components";
</script>
