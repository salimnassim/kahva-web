<template>
    <table class="w-full table-auto">
        <thead class="sticky top-0 bg-slate-900 text-xs">
            <tr class="text-left leading-6 border-b border-slate-400">
                <th><input class="w-full bg-slate-900 text-white outline-none" v-model="search" type="text"
                        placeholder="Search" /></th>
                <th class="hover:cursor-pointer" @click="sort('priority')">
                    <div class="flex flex-row justify-between">
                        <div>Priority</div>
                        <div>
                            <div v-if="store.ui.sorting.key == 'priority' && !store.ui.sorting.direction">
                                <ArrowLongUpIcon class="h-6" />
                            </div>
                            <div v-if="store.ui.sorting.key == 'priority' && store.ui.sorting.direction">
                                <ArrowLongDownIcon class="h-6" />
                            </div>
                        </div>
                    </div>
                </th>
                <th class="hover:cursor-pointer" @click="sort('size_bytes')">
                    <div class="flex flex-row justify-between">
                        <div>Size</div>
                        <div>
                            <div v-if="store.ui.sorting.key == 'size_bytes' && !store.ui.sorting.direction">
                                <ArrowLongUpIcon class="h-6" />
                            </div>
                            <div v-if="store.ui.sorting.key == 'size_bytes' && store.ui.sorting.direction">
                                <ArrowLongDownIcon class="h-6" />
                            </div>
                        </div>
                    </div>
                </th>
                <th class="hover:cursor-pointer" @click="sort('completed_bytes')">
                    <div class="flex flex-row justify-between">
                        <div>Completed</div>
                        <div>
                            <div v-if="store.ui.sorting.key == 'completed_bytes' && !store.ui.sorting.direction">
                                <ArrowLongUpIcon class="h-6" />
                            </div>
                            <div v-if="store.ui.sorting.key == 'completed_bytes' && store.ui.sorting.direction">
                                <ArrowLongDownIcon class="h-6" />
                            </div>
                        </div>
                    </div>
                </th>
                <th>%</th>
                <th class="hover:cursor-pointer" @click="sort('upload_rate')">
                    <div class="flex flex-row justify-between">
                        <div>Up rate</div>
                        <div>
                            <div v-if="store.ui.sorting.key == 'upload_rate' && !store.ui.sorting.direction">
                                <ArrowLongUpIcon class="h-6" />
                            </div>
                            <div v-if="store.ui.sorting.key == 'upload_rate' && store.ui.sorting.direction">
                                <ArrowLongDownIcon class="h-6" />
                            </div>
                        </div>
                    </div>
                </th>
                <th class="hover:cursor-pointer" @click="sort('download_rate')">
                    <div class="flex flex-row justify-between">
                        <div>Down rate</div>
                        <div>
                            <div v-if="store.ui.sorting.key == 'download_rate' && !store.ui.sorting.direction">
                                <ArrowLongUpIcon class="h-6" />
                            </div>
                            <div v-if="store.ui.sorting.key == 'download_rate' && store.ui.sorting.direction">
                                <ArrowLongDownIcon class="h-6" />
                            </div>
                        </div>
                    </div>
                </th>
                <th class="hover:cursor-pointer" @click="sort('upload_total')">
                    <div class="flex flex-row justify-between">
                        <div>Up total</div>
                        <div>
                            <div v-if="store.ui.sorting.key == 'upload_total' && !store.ui.sorting.direction">
                                <ArrowLongUpIcon class="h-6" />
                            </div>
                            <div v-if="store.ui.sorting.key == 'upload_total' && store.ui.sorting.direction">
                                <ArrowLongDownIcon class="h-6" />
                            </div>
                        </div>
                    </div>
                </th>
                <th class="hover:cursor-pointer" @click="sort('download_total')">
                    <div class="flex flex-row justify-between">
                        <div>Down total</div>
                        <div>
                            <div v-if="store.ui.sorting.key == 'download_total' && !store.ui.sorting.direction">
                                <ArrowLongUpIcon class="h-6" />
                            </div>
                            <div v-if="store.ui.sorting.key == 'download_total' && store.ui.sorting.direction">
                                <ArrowLongDownIcon class="h-6" />
                            </div>
                        </div>
                    </div>
                </th>
                <th class="hover:cursor-pointer" @click="sort('leechers')">
                    <div class="flex flex-row justify-between">
                        <div>Leechers</div>
                        <div>
                            <div v-if="store.ui.sorting.key == 'leechers' && !store.ui.sorting.direction">
                                <ArrowLongUpIcon class="h-6" />
                            </div>
                            <div v-if="store.ui.sorting.key == 'leechers' && store.ui.sorting.direction">
                                <ArrowLongDownIcon class="h-6" />
                            </div>
                        </div>
                    </div>
                </th>
                <th class="hover:cursor-pointer" @click="sort('seeders')">
                    <div class="flex flex-row justify-between">
                        <div>Seeders</div>
                        <div>
                            <div v-if="store.ui.sorting.key == 'seeders' && !store.ui.sorting.direction">
                                <ArrowLongUpIcon class="h-6" />
                            </div>
                            <div v-if="store.ui.sorting.key == 'seeders' && store.ui.sorting.direction">
                                <ArrowLongDownIcon class="h-6" />
                            </div>
                        </div>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="text-xs leading-6 odd:bg-slate-800 hover:bg-slate-600 hover:text-white"
                v-for="torrent in store.filter" :key="torrent.hash" :data-hash="torrent.hash"
                @click.right.prevent="$emit('rowClicked', torrent, $event)">
                <td class="flex flex-row justify-between">
                    <div>{{ torrent.name }}</div>
                    <div class="flex flex-row">
                        <div class="text-sm pr-1" v-if="torrent.message" :title="torrent.message">
                            <ChatBubbleOvalLeftEllipsisIcon class="w-6 h-6 hover:cursor-help" />
                        </div>
                    </div>
                </td>
                <td>{{ priority(torrent.priority) }}</td>
                <td>{{ human(torrent.size_bytes) }}</td>
                <td>{{ human(torrent.completed_bytes) }}</td>
                <td>{{ percent(torrent.size_bytes, torrent.completed_bytes) }}</td>
                <td>{{ human(torrent.upload_rate) }}</td>
                <td>{{ human(torrent.download_rate) }}</td>
                <td>{{ human(torrent.upload_total) }}</td>
                <td>{{ human(torrent.download_total) }}</td>
                <td>{{ torrent.leechers }}</td>
                <td>{{ torrent.seeders }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { ChatBubbleOvalLeftEllipsisIcon, ArrowLongUpIcon, ArrowLongDownIcon } from '@heroicons/vue/24/solid'
import { human, percent, priority } from '@/types/helpers'
import { useStore } from '@/stores/store'
import { computed } from 'vue';
import type { Torrent } from '@/types/torrent';
const store = useStore()

defineEmits<{
    rowClicked: [Torrent, MouseEvent]
}>()

const search = computed({
    get(): string {
        return store.ui.search
    },
    set(query: string): void {
        store.search(query)
    }
})

function sort(key: string) {
    if (store.ui.sorting.key === key) {
        store.sort(key, !store.ui.sorting.direction)
        return
    }
    store.sort(key, false)
}
</script>