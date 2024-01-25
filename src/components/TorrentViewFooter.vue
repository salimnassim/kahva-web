<template>
    <TorrentViewFooterSticky ref="inner" :sticky="sticky">
        <div class="flex flex-col w-24 h-40 bg-slate-800 border border-slate-600 rounded-sm py-2 px-4 text-sm">
            <div class="w-full">
                <!-- <input type="text" placeholder="MB" class="w-full bg-slate-700 border border-slate-400 rounded-sm outline-none" /> -->
                <div>50 MB</div>
                <div>40 MB</div>
                <div>30 MB</div>
                <div>20 MB</div>
                <div>10 MB</div>
                <div>5 MB</div>
                <div>1 MB</div>
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
                        sticky.y = (e.currentTarget as HTMLElement).getBoundingClientRect().top - 160;
                        console.log(windowHeight)
                        sticky.open = true
                    }" class="border-b border-slate-400 border-dashed text-slate-400 hover:cursor-pointer select-none">
                        Up:
                        {{
                            human(store.system?.throttle_global_up_max_rate ?? 0) }}</div>
                </div>
                <div class="flex flex-row">
                    <ArrowDownIcon class="h-6 pr-2" />
                    <div class="border-b border-slate-400 border-dashed text-slate-400 hover:cursor-pointer select-none">
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
import { ref, computed } from 'vue'
import { CloudArrowUpIcon, CloudArrowDownIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/24/solid'
import TorrentViewFooterSticky from '@/components/TorrentViewFooterSticky.vue'
import { useStore } from '@/stores/store'
import { human } from '@/types/helpers'
import { type Sticky } from '@/types/sticky'
const store = useStore()

const windowHeight = ref(window.innerHeight)

const sticky = computed({
    get(): Sticky {
        return store.ui.sticky
    },
    set(sticky: Sticky) {
        store.sticky(sticky)
    }
})
</script>