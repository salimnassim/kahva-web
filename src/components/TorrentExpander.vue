<template>
    <div class="flex flex-col h-full border-t border-slate-800 p-2">
        <div class="flex justify-between">
            <div>{{ expander.torrent?.name }}</div>
            <XCircleIcon @click="$emit('close')" class="h-6 w-6 hover:cursor-pointer" />
        </div>
        <TorrentExpanderTabGroup />
        <div class="h-full overflow-y-auto"></div>
    </div>
</template>

<script setup lang="ts">
import { type Expander } from '@/stores/store'
import { XCircleIcon } from '@heroicons/vue/24/solid'
import TorrentExpanderTabGroup from '@/components/TorrentExpanderTabGroup.vue'
defineProps<{
    expander: Expander
}>()
defineEmits<{
    close: [void]
}>()
</script>