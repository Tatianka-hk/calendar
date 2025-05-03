<template>
    <div class="flex justify-between">
        <Month />
        <Schedule :class="`w-[calc(100%-500px)]`" />
    </div>
</template>
<script lang="ts" setup>
import { Month, Day } from "../components";

const checkToken = async () => {
    const token = localStorage.getItem("token");
};
</script>
