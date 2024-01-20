<template>
    <div class="flex flex-row text-sm mt-2 border-b border-slate-600">
        <div @click="tab = ExpanderTab.Details" class="bg-slate-600 mr-2 p-1 hover:cursor-pointer select-none"
            :class="{ '!bg-slate-500': tab === ExpanderTab.Details }">Details</div>
        <div @click="tab = ExpanderTab.Files" :class="{ '!bg-slate-500': tab === ExpanderTab.Files }"
            class="bg-slate-600 mr-2 p-1 hover:cursor-pointer select-none">Files</div>
        <div @click="tab = ExpanderTab.Trackers" :class="{ '!bg-slate-500': tab === ExpanderTab.Trackers }"
            class="bg-slate-600 mr-2 p-1 hover:cursor-pointer select-none">Trackers
        </div>
        <div @click="tab = ExpanderTab.Peers" :class="{ '!bg-slate-500': tab === ExpanderTab.Peers }"
            class="bg-slate-600 mr-2 p-1 hover:cursor-pointer select-none">Peers</div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ExpanderTab } from '@/stores/store';
import { useStore } from '@/stores/store'
const store = useStore()

defineEmits<{
    close: [void]
}>()

const tab = computed({
    get(): ExpanderTab {
        return store.ui.expander.tab
    },
    set(tab: ExpanderTab) {
        store.expander({ ...store.ui.expander, tab: tab })
    }
})

</script>