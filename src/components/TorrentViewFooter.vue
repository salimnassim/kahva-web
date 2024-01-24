<template>
    <div class="flex justify-between text-sm border-t border-slate-800 align-middle">
        <div class="flex flex-row px-2">
            <div class="flex flex-row justify-between border-r border-slate-400 pr-2 leading-6">
                <div class="flex flex-row mr-2">
                    <ArrowUpIcon class="h-6 pr-2" />
                    <div class="border-b border-slate-400 border-dashed text-slate-400 select-none">Up: {{
                        human(store.system?.throttle_global_up_max_rate ?? 0) }}</div>
                </div>
                <div class="flex flex-row">
                    <ArrowDownIcon class="h-6 pr-2" />
                    <div class="border-b border-slate-400 border-dashed text-slate-400 select-none">Down: {{
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
import { CloudArrowUpIcon, CloudArrowDownIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/24/solid'
import { useStore } from '@/stores/store'
import { human } from '@/types/helpers'
const store = useStore()
</script>