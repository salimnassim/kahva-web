<template>
    <table class="table-auto w-full">
        <thead class="text-left">
            <tr>
                <th>Path</th>
                <th>Size</th>
                <th>Completed</th>
                <th>%</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="file in files" :key="file.path">
                <td>
                    {{ file.path }}
                </td>
                <td>
                    {{ human(file.size) }}
                </td>
                <td>
                    {{ human(file.completed_chunks / file.size_chunks * file.size) }}
                </td>
                <td>
                    {{ percent(file.size_chunks, file.completed_chunks) }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/stores/store'
import { type Torrent } from '@/types/torrent'
import { human, percent } from '@/types/helpers'
const store = useStore()

const props = defineProps<{
    torrent: Torrent | undefined
}>()

const files = computed({
    get() {
        return store.ui.expander.files
    },
    set() {
        return
    }
})

if (props.torrent !== undefined) {
    await store.files(props.torrent)
}
</script>