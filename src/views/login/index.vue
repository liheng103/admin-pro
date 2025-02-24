<template>
    login
    {{ userStore }}
</template>
<script setup lang="ts">
import {useUserStore} from "@/store/user/index.ts";
const userStore = useUserStore()
console.log(userStore)
</script>
<style lang="less" scoped></style>