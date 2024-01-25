<template>
    <TorrentViewFooterSticky :sticky="sticky">
        <div class="flex flex-col w-24 h-44 bg-slate-800 border border-slate-600 rounded-sm text-sm py-2">
            <div class="w-full">
                <input v-on:keyup.enter="(e) => {
                    $emit('throttle', sticky.type, +(e.target as HTMLInputElement).value * 1024);
                    sticky.open = false;
                }" type="text" placeholder="MB (enter)"
                    class="w-full px-2 bg-slate-700 border border-slate-400 rounded-sm outline-none" />
                <div @click="$emit('throttle', sticky.type, 100 * 1024); sticky.open = false;"
                    class="px-2 hover:bg-slate-600 hover:cursor-pointer">100 MB
                </div>
                <div @click="$emit('throttle', sticky.type, 75 * 1024); sticky.open = false;"
                    class="px-2 hover:bg-slate-600 hover:cursor-pointer">75 MB
                </div>
                <div @click="$emit('throttle', sticky.type, 50 * 1024); sticky.open = false;"
                    class="px-2 hover:bg-slate-600 hover:cursor-pointer">50 MB
                </div>
                <div @click="$emit('throttle', sticky.type, 20 * 1024); sticky.open = false;"
                    class="px-2 hover:bg-slate-600 hover:cursor-pointer">25 MB
                </div>
                <div @click="$emit('throttle', sticky.type, 10 * 1024); sticky.open = false;"
                    class="px-2 hover:bg-slate-600 hover:cursor-pointer">10 MB
                </div>
                <div @click="$emit('throttle', sticky.type, 5 * 1024); sticky.open = false;"
                    class="px-2 hover:bg-slate-600 hover:cursor-pointer">5 MB
                </div>
                <div @click="$emit('throttle', sticky.type, 1 * 1024); sticky.open = false;"
                    class="px-2 hover:bg-slate-600 hover:cursor-pointer">1 MB
                </div>
            </div>
        </div>
    </TorrentViewFooterSticky>
    <div class="flex justify-between text-sm border-t border-slate-800 align-middle">
        <div class="flex flex-row px-2">
            <div class="flex flex-row justify-between border-r border-slate-400 pr-2 leading-6">
                <div class="flex flex-row mr-2">
                    <ArrowUpIcon class="h-6 pr-2" />
                    <div @click="(e) => {
                        if (sticky.open === true) { sticky.open = false; return; }
                        sticky.x = (e.currentTarget as HTMLElement).getBoundingClientRect().left;
                        // todo: calculate sticky height instead of using a fixed value
                        sticky.y = (e.currentTarget as HTMLElement).getBoundingClientRect().top - 176;
                        sticky.open = true
                        sticky.type = 'up'
                    }" class="border-b border-slate-400 border-dashed text-slate-400 hover:cursor-pointer select-none">
                        Up:
                        {{
                            human(store.system?.throttle_global_up_max_rate ?? 0) }}</div>
                </div>
                <div class="flex flex-row">
                    <ArrowDownIcon class="h-6 pr-2" />
                    <div @click="(e) => {
                        if (sticky.open === true) { sticky.open = false; return; }
                        sticky.x = (e.currentTarget as HTMLElement).getBoundingClientRect().left;
                        // todo: calculate sticky height instead of using a fixed value
                        sticky.y = (e.currentTarget as HTMLElement).getBoundingClientRect().top - 176;
                        sticky.open = true
                        sticky.type = 'down'
                    }" class="border-b border-slate-400 border-dashed text-slate-400 hover:cursor-pointer select-none">
                        Down: {{
                            human(store.system?.throttle_global_down_max_rate ?? 0) }}</div>
                </div>
            </div>
            <div class="flex flex-row justify-between pl-2 leading-6">
                <div class="flex flex-row mr-2">
                    <CloudArrowUpIcon class="h-6 pr-2" />
                    <div class=" text-slate-400 select-none">Up: {{
                        human(store.system?.throttle_global_up_rate ?? 0) }}</div>
                </div>
                <div class="flex flex-row">
                    <CloudArrowDownIcon class="h-6 pr-2" />
                    <div class=" text-slate-400 select-none">Down: {{
                        human(store.system?.throttle_global_down_rate ?? 0) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CloudArrowUpIcon, CloudArrowDownIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/24/solid'
import TorrentViewFooterSticky from '@/components/TorrentViewFooterSticky.vue'
import { useStore } from '@/stores/store'
import { human } from '@/types/helpers'
import { type Sticky } from '@/types/sticky'
const store = useStore()

const sticky = computed({
    get(): Sticky {
        return store.ui.sticky
    },
    set(sticky: Sticky) {
        store.sticky(sticky)
    }
})

defineEmits<{
    throttle: [type: 'up' | 'down', kilobytes: number]
}>()

</script>