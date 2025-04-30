<template>
    <Month />
</template>
<script lang="ts" setup>
import { Month } from "../components";

const checkToken = async () => {
    const token = localStorage.getItem("token");
};
</script>
