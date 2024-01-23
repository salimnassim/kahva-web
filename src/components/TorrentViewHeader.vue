<template>
    <div class="flex flex-row p-2 border-b border-slate-700">
        <input ref="input" @change="(e) => {
            const files = (((e.currentTarget) as HTMLInputElement).files)
            if (files === null || files.length === 0) {
                console.error('zero files in input element')
                return
            }
            for (let idx = 0; idx < files.length; idx++) {
                store.upload(files[idx])
            }
        }" type="file" accept="application/x-bittorrent,.torrent" multiple class="hidden" />
        <PlusCircleIcon class="h-6 mr-2 hover:cursor-pointer" @click="() => {
            input.click()
        }" />
        <Cog6ToothIcon class="h-6 hover:cursor-pointer" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PlusCircleIcon } from '@heroicons/vue/24/solid'
import { Cog6ToothIcon } from '@heroicons/vue/24/solid'
import { useStore } from '@/stores/store'
const store = useStore()

const input = ref({} as HTMLInputElement)
</script>