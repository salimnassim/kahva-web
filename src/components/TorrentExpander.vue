<template>
    <div class="flex flex-col h-full border-t border-slate-800 p-2">
        <div class="flex justify-between">
            <div>{{ expander.torrent?.name }}</div>
            <XCircleIcon @click="$emit('close')" class="h-6 w-6 hover:cursor-pointer" />
        </div>
        <TorrentExpanderTabGroup />
        <div class="h-full overflow-y-auto p-2 text-sm">
            <TorrentExpanderTabDetails v-if="expander.tab === ExpanderTab.Details" :torrent="expander.torrent" />
            <Suspense>
                <template #default>
                    <TorrentExpanderTabFiles v-if="expander.tab === ExpanderTab.Files" :torrent="expander.torrent" />
                </template>
                <template #fallback>
                    Loading...
                </template>
            </Suspense>
            <Suspense>
                <template #default>
                    <TorrentExpanderTabTrackers v-if="expander.tab === ExpanderTab.Trackers" :torrent="expander.torrent" />
                </template>
                <template #fallback>
                    Loading...
                </template>
            </Suspense>
            <Suspense>
                <template #default>
                    <TorrentExpanderTabPeers v-if="expander.tab === ExpanderTab.Peers" :torrent="expander.torrent" />
                </template>
                <template #fallback>
                    Loading...
                </template>
            </Suspense>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type Expander, ExpanderTab } from '@/stores/store'
import { XCircleIcon } from '@heroicons/vue/24/solid'
import TorrentExpanderTabGroup from '@/components/TorrentExpanderTabGroup.vue'
import TorrentExpanderTabDetails from '@/components/TorrentExpanderTabDetails.vue';
import TorrentExpanderTabFiles from '@/components/TorrentExpanderTabFiles.vue'
import TorrentExpanderTabTrackers  from '@/components/TorrentExpanderTabTrackers.vue'
import TorrentExpanderTabPeers  from '@/components/TorrentExpanderTabPeers.vue'

defineProps<{
    expander: Expander
}>()
defineEmits<{
    close: [void]
}>()
</script>