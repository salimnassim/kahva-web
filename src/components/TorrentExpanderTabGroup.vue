<template>
    <div class="flex flex-row text-sm mt-2 border-b border-slate-600">
        <div class="bg-slate-600 mr-2 p-1 hover:cursor-pointer select-none">Details</div>
        <div class="bg-slate-600 mr-2 p-1 hover:cursor-pointer select-none">Files</div>
        <div class="bg-slate-600 mr-2 p-1 hover:cursor-pointer select-none">Trackers</div>
        <div class="bg-slate-600 mr-2 p-1 hover:cursor-pointer select-none">Peers</div>
    </div>
</template>

<script setup lang="ts">
defineEmits<{
    close: [void]
}>()
</script>