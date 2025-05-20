<template>
    <div class="w-full h-[100vh] bg-background md:pt-[120px] pt-[40px]">
        <div class="flex md:gap-8 gap-2 items-center justify-center">
            <AppIcon class="md:h-[150px] md:w-[150px] h-[50px] w-[50px]" />
            <span class="md:text-[120px] text-[30px] text-primary"
                >Calendar</span
            >
        </div>
        <div
            class="flex flex-col gap-[40px] items-center mt-[20px]"
            @keydown.enter="singUp"
        >
            <Field
                type="email"
                placeholder="Input email"
                label="Email"
                v-model="email"
                :value="email"
            />
            <Field
                type="password"
                placeholder="Input password"
                label="Password"
                v-model="password"
                :value="password"
            />
            <Button @click="singUp" backgroundColor="#34558b" class="mt-[40px]"
                >Sign up</Button
            >
        </div>
    </div>
</template>
<script setup lang="ts">
import { AppIcon } from "~/assets/icons";
import { Field, Button } from "~/ui";
import { checkFields } from "../utils/auth";
import API from "~/utils/api";
import { useSnackbar } from "~/composables";
const email = ref<string>("");
const password = ref<string>("");
const { showSnackbar } = useSnackbar();
const singUp = async () => {
    if (!checkFields(email.value, password.value, "signup")) return;
    const res = await API.AUTH.signUp(email.value, password.value);
    const data = await res.json();
    if (data.statusCode === 400) {
        showSnackbar(data.statusMessage, "error");
    } else {
        window.location.href = "/app";
        localStorage.setItem("token", data.jwtToken);
    }
};
</script>
