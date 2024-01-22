<template>
    <table class="table-auto w-full">
        <thead class="text-left">
            <tr>
                <th>URL</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="tracker in trackers" :key="tracker.url" class="odd:bg-slate-800 leading-6">
                <td>
                    {{ tracker.url }}
                </td>
                <td>
                    {{ type(tracker.type) }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/stores/store'
import { type Torrent } from '@/types/torrent'
const store = useStore()

const props = defineProps<{
    torrent: Torrent | undefined
}>()

function type(trackerType: number): 'HTTP' | 'UDP' | 'DHT' | '?' {
    switch (trackerType) {
        case 1: return 'HTTP'
        case 2: return 'UDP'
        case 3: return 'DHT'
        default: return '?'
    }
}

const trackers = computed({
    get() {
        return store.ui.expander.trackers
    },
    set() {
        return
    }
})

if (props.torrent !== undefined) {
    await store.trackers(props.torrent)
}
</script>