<template>
    <div
        class="flex justify-center md:justify-between flex-col md:flex-row h-[100vh]"
    >
        <div><Month /></div>

        <Schedule :class="`w-[calc(100%-500px)]`" />
    </div>
</template>
<script lang="ts" setup>
import { Month, Day } from "../components";
import API from "../utils/api";
const router = useRouter();
</script>
