<template>
    <Teleport to="#dialog">
        <div
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <slot></slot>
        </div>
    </Teleport>
</template>
<script setup lang="ts"></script>
