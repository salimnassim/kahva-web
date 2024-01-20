<template>
  <div v-if="store.filter === undefined || store.system === undefined"
    class="w-1/2 pt-6 m-auto text-center bg-slate-900 text-slate-400">
    <div class="text-lg">
      Waiting for server...
    </div>
    <div>
      If this message does not disappear, check the browser console tab for errors.
    </div>
  </div>

  <TorrentContextMenu :context-menu="contextMenu" />
  <div class="h-full w-full flex flex-col bg-slate-900 text-slate-400" v-if="store.filter !== undefined">
    <div class="flex flex-col">
      <div class="h-4/6 grow overflow-x-auto overflow-y-auto w-full">
        <TorrentTable @click.prevent="() => {
          contextMenu.open = false;
          contextMenu.torrent = undefined;
        }" v-on:row-clicked="(t, e) => {
  contextMenu.torrent = t;
  contextMenu.x = e.clientX,
    contextMenu.y = e.clientY;
  contextMenu.open = true;
}" />
      </div>
      <TorrentExpander class="h-2/6" :expander="expander" />
    </div>
    <div>xd</div>
  </div>

  <!-- <div class="flex flex-row justify-between bg-black text-white text-xs">
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
  </div> -->
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore, type ContextMenu, type Expander } from '@/stores/store'
import TorrentContextMenu from '@/components/TorrentContextMenu.vue'
import TorrentExpander from '@/components/TorrentExpander.vue'
import TorrentTable from '@/components/TorrentTable.vue'

const store = useStore()

const contextMenu = computed({
  get(): ContextMenu {
    return store.ui.contextMenu
  },
  set(contextMenu: ContextMenu): void {
    store.contextMenu(contextMenu)
  }
})

const expander = computed({
  get(): Expander {
    return store.ui.expander
  },
  set(modal: Expander): void {
    store.expander(modal)
  }
})



// Refresh view every n seconds
store.refreshView()
store.refreshSystem()
window.setInterval(function () {
  store.refreshView()
  store.refreshSystem()
}, 1000 * store.ui.updateInterval)
</script>