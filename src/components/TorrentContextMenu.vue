<template>
    <TorrentChildContextMenu @mouseleave="() => { priorityContextMenu.open = false; }" :context-menu="priorityContextMenu">
        <div class="flex flex-col bg-slate-700 text-slate-400 border border-slate-600 w-32 rounded-sm text-xs">
            <div @click="() => { $emit('priority', props.contextMenu.torrent, TorrentPriority.Off); priorityContextMenu.open = false; }"
                class="flex flex-row p-1 select-none hover:bg-slate-600 hover:cursor-pointer">Off</div>
            <div @click="() => { $emit('priority', props.contextMenu.torrent, TorrentPriority.Low); priorityContextMenu.open = false; }"
                class="flex flex-row p-1 select-none hover:bg-slate-600 hover:cursor-pointer">Low</div>
            <div @click="() => { $emit('priority', props.contextMenu.torrent, TorrentPriority.Normal); priorityContextMenu.open = false; }"
                class="flex flex-row p-1 select-none hover:bg-slate-600 hover:cursor-pointer">Normal</div>
            <div @click="() => { $emit('priority', props.contextMenu.torrent, TorrentPriority.High); priorityContextMenu.open = false; }"
                class="flex flex-row p-1 select-none hover:bg-slate-600 hover:cursor-pointer">High</div>
        </div>
    </TorrentChildContextMenu>
    <TorrentChildContextMenu @mouseleave="() => { labelContextMenu.open = false; }" :context-menu="labelContextMenu">
        <div class="flex flex-col bg-slate-700 text-slate-400 border border-slate-600 w-32 rounded-sm text-xs">
            <div @click="() => { $emit('label', props.contextMenu.torrent, ({ name: 'Clear' } as TorrentLabel)); priorityContextMenu.open = false; }"
                class="flex flex-row p-1 select-none hover:bg-slate-600 hover:cursor-pointer">Clear</div>
            <!-- <hr class="h-px my-1 border-slate-500"> -->
        </div>
    </TorrentChildContextMenu>
    <div v-if="contextMenu.open" class="absolute" :style="{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }">
        <div class="flex flex-col bg-slate-700 text-slate-400 border border-slate-600 w-32 rounded-sm text-xs">
            <div>
                <div @click="$emit('start', props.contextMenu.torrent)"
                    class="flex flex-row p-1 select-none hover:bg-slate-600 hover:cursor-pointer">
                    Start
                </div>
                <div @click="$emit('resume', props.contextMenu.torrent)"
                    class="p-1 select-none hover:bg-slate-600 hover:cursor-pointer">
                    Resume
                </div>
                <div @click="$emit('pause', props.contextMenu.torrent)"
                    class="p-1 select-none hover:bg-slate-600 hover:cursor-pointer">
                    Pause
                </div>
                <div @click="$emit('stop', props.contextMenu.torrent)"
                    class="p-1 select-none hover:bg-slate-600 hover:cursor-pointer">
                    Stop
                </div>
                <div @click="$emit('recheck', props.contextMenu.torrent)"
                    class="p-1 select-none hover:bg-slate-600 hover:cursor-pointer">
                    Force
                    re-check
                </div>
            </div>
            <hr class="h-px my-1 border-slate-500">
            <div>
                <div class="flex flex-row justify-between p-1 select-none hover:bg-slate-600 hover:cursor-pointer"
                    @mouseover="(e) => {
                        labelContextMenu.open = false;
                        priorityContextMenu.x = (e.currentTarget as HTMLElement).getBoundingClientRect().right ?? 0;
                        priorityContextMenu.y = (e.currentTarget as HTMLElement).getBoundingClientRect().top ?? 0;
                        priorityContextMenu.open = true;
                    }">
                    <div>Priority</div>
                    <ChevronRightIcon class="w-4 h-4" />
                </div>
                <div @mouseover="(e) => {
                    priorityContextMenu.open = false;
                    labelContextMenu.x = (e.currentTarget as HTMLElement).getBoundingClientRect().right ?? 0;
                    labelContextMenu.y = (e.currentTarget as HTMLElement).getBoundingClientRect().top ?? 0;
                    labelContextMenu.open = true;
                }" class="flex flex-row justify-between p-1 select-none hover:bg-slate-600 hover:cursor-pointer">
                    <div>Labels</div>
                    <ChevronRightIcon class="w-4 h-4" />
                </div>
            </div>
            <hr class="h-px my-1 border-slate-500">
            <div>
                <div @click="$emit('details', contextMenu.torrent);"
                    class="p-1 select-none hover:bg-slate-600 hover:cursor-pointer">Details
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
import { type ContextMenu } from '@/stores/store'
import { type Torrent, TorrentPriority, type TorrentLabel } from '@/types/torrent'
import TorrentChildContextMenu from '@/components/TorrentChildContextMenu.vue'
import { type ChildContextMenu } from '@/types/contextMenu'
import { status } from '@/types/helpers'

const priorityContextMenu = ref({} as ChildContextMenu)
const labelContextMenu = ref({} as ChildContextMenu)

const props = defineProps<{
    contextMenu: ContextMenu
}>()

defineEmits<{
    start: [torrent: Torrent | undefined]
    stop: [torrent: Torrent | undefined]
    resume: [torrent: Torrent | undefined]
    pause: [torrent: Torrent | undefined]
    recheck: [torrent: Torrent | undefined]
    priority: [torrent: Torrent | undefined, TorrentPriority]
    label: [torrent: Torrent | undefined, TorrentLabel]
    details: [torrent: Torrent | undefined]
}>()
watch(props.contextMenu,
    (contextMenu) => {
        if (!contextMenu.open) {
            priorityContextMenu.value.open = false
            labelContextMenu.value.open = false
        }
    }
)
</script>