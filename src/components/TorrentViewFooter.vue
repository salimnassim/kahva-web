<template>
    <div class="flex justify-between text-sm border-t border-slate-800 align-middle">
        <div class="flex flex-row px-2">
            <div class="border-r border-slate-400 pr-2">Throttle [{{ human(store.system?.throttle_global_up_max_rate ?? 0) }} / {{
                human(store.system?.throttle_global_down_max_rate ?? 0) }}]</div>
            <div class="pl-2">Rate [{{ human(store.system?.throttle_global_up_rate ?? 0) }} / {{
                human(store.system?.throttle_global_down_rate ?? 0) }}]</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'
import { human } from '@/types/helpers'
const store = useStore()
</script>