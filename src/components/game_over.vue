<script setup lang="ts">

</script>

<template>
    <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-2 bg-black bg-opacity-50">
        <div class="text-white text-7xl font-bold">Game over</div>
        <div class="flex flex-col justify-center">
            <div class="button">Play again</div>
            <div class="button">Return to menu</div>
        </div>
    </div>
</template>

<style scoped lang="postcss">
    .button {
        @apply text-center text-white text-3xl py-2 px-8 rounded-full transition-all hover:bg-red-500 select-none cursor-pointer;
    }
</style>