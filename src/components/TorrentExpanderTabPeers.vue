<template>
    <table class="table-auto w-full">
        <thead class="text-left">
            <tr>
                <th>Peer ID</th>
                <th>Address</th>
                <th>Up Rate</th>
                <th>Up Total</th>
                <th>Down Rate</th>
                <th>Down Total</th>
                <th>Client</th>
                <th>Encrypted</th>
                <th>Obfuscated</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="peer in peers" :key="peer.peer_id" class="odd:bg-slate-800 leading-6">
                <td>
                    {{ peer.id }}
                </td>
                <td>
                    {{ peer.address }}:{{ peer.port }}
                </td>
                <td>
                    {{ human(peer.up_rate) }}
                </td>
                <td>
                    {{ human(peer.up_total) }}
                </td>
                <td>
                    {{ human(peer.down_rate) }}
                </td>
                <td>
                    {{ human(peer.down_total) }}
                </td>
                <td>
                    {{ peer.client_version }}
                </td>
                <td>
                    {{ peer.is_encrypted ? 'Yes' : 'No' }}
                </td>
                <td>
                    {{ peer.is_obfuscated ? 'Yes' : 'No' }}
                </td>

            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/stores/store'
import { type Torrent } from '@/types/torrent'
import { human } from '@/types/helpers'
const store = useStore()

const props = defineProps<{
    torrent: Torrent | undefined
}>()

const peers = computed({
    get() {
        return store.ui.expander.peers
    },
    set() {
        return
    }
})

if (props.torrent !== undefined) {
    await store.peers(props.torrent)
}
</script>