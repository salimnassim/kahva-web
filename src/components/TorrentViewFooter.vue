<template>
    <div class="flex justify-between text-sm border-t border-slate-800 align-middle">
        <div class="flex flex-row">
            <div>Throttle [{{ human(store.system?.throttle_global_up_max_rate ?? 0) }} / {{
                human(store.system?.throttle_global_down_max_rate ?? 0) }}]</div>
            <div class="pl-2">Rate [{{ human(store.system?.throttle_global_up_rate ?? 0) }} / {{
                human(store.system?.throttle_global_down_rate ?? 0) }}]</div>
        </div>
        <div class="flex flex-row">
            <div>rtorrent {{ store.system?.client_version }}/{{ store.system?.library_version }}</div>
            <div class="pl-2">{{ store.system?.pid }}@{{ store.system?.hostname }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'
import { human } from '@/types/helpers'
const store = useStore()
</script>