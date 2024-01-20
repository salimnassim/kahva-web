<template>
    <div class="grid grid-cols-1 gap-2">
        <div class="flex flex-col">
            <div>Name</div>
            <div>{{ torrent?.name }}</div>
        </div>
        <div class="flex flex-col">
            <div>Hash</div>
            <div>{{ torrent?.hash }}</div>
        </div>
        <div class="flex flex-col">
            <div>Message</div>
            <div>{{ (torrent?.message === '') ? "None" : torrent?.message }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type Torrent } from '@/types/torrent'

defineProps<{
    torrent: Torrent | undefined
}>()
</script>