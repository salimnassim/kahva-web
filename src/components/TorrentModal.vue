<template>
    <div
        class="absolute p-2 top-0 bottom-0 m-auto left-0 right-0 h-2/3 w-2/3 bg-slate-800 border border-slate-700 text-slate-400 rounded-sm">
        <div class="flex flex-row justify-between">
            <div class="text-sm">{{ modal.torrent?.name }}</div>
            <XCircle class="w-6 h-6 hover:cursor-pointer" @click.prevent="$emit('close')" />
        </div>
        <hr class="h-px my-1 border-slate-500">
        <div class="flex flex-row text-sm">
        </div>
    </div>
</template>

<script setup lang="ts">
import XCircle from '@/icons/XCircle.vue'
import { type Modal } from '@/stores/store'
defineProps<{
    modal: Modal
}>()
defineEmits<{
    close: [void]
}>()
</script>