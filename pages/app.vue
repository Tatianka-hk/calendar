<template>
    <div class="flex justify-center md:justify-between flex-col md:flex-row">
        <div><Month /></div>

        <Schedule :class="`w-[calc(100%-500px)]`" />
    </div>
</template>
<script lang="ts" setup>
import { Month, Day } from "../components";
import API from "../utils/api";
const router = useRouter();
const getEvents = async () => {
    const res = await API.EVENTS.getEvents();
    const data = await res.json();
    if (data.statusCode === 401) {
        router.push("/signin");
    }
};
getEvents();
</script>
