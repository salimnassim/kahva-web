<template>
    <div v-if="tooltip.open" class="absolute" :style="{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }">
        <div class="flex flex-col bg-slate-700 text-slate-400 border border-slate-600 w-32 rounded-sm text-xs">
            <div>
                <div v-if="tooltip.torrent?.is_active" class="p-1 select-none hover:bg-slate-600 hover:cursor-pointer">Start
                </div>
                <div v-if="tooltip.torrent?.is_active" class="p-1 select-none hover:bg-slate-600 hover:cursor-pointer">Pause
                </div>
                <div v-if="tooltip.torrent?.is_open" class="p-1 select-none hover:bg-slate-600 hover:cursor-pointer">Stop
                </div>
                <div v-if="tooltip.torrent?.is_open" class="p-1 select-none hover:bg-slate-600 hover:cursor-pointer">Force
                    re-check
                </div>
            </div>
            <hr class="h-px my-1 border-slate-500">
            <div>
                <div class="flex flex-row justify-between p-1 select-none hover:bg-slate-600 hover:cursor-pointer">
                    <div>Priority</div>
                    <ChevronRightIcon class="w-4 h-4" />
                </div>
                <div class="flex flex-row justify-between p-1 select-none hover:bg-slate-600 hover:cursor-pointer">
                    <div>Labels</div>
                    <ChevronRightIcon class="w-4 h-4" />
                </div>
            </div>
            <hr class="h-px my-1 border-slate-500">
            <div>
                <div @click="$emit('details', tooltip.torrent)"
                    class="p-1 select-none hover:bg-slate-600 hover:cursor-pointer">Details
                </div>
                <div class="p-1 select-none hover:bg-slate-600 hover:cursor-pointer">Properties</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
import { type Tooltip } from '@/stores/store'
import { type Torrent } from '@/types/torrent'

defineProps<{
    tooltip: Tooltip
}>()
defineEmits<{
    start: [torrent: Torrent | undefined]
    stop: [torrent: Torrent | undefined]
    details: [torrent: Torrent | undefined]
}>()
</script>