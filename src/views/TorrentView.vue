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

  <TorrentContextMenu :context-menu="contextMenu" v-on:details="(t) => {
    contextMenu.open = false;
    expander.torrent = t;
    expander.open = true;
  }" />
  <div class="h-full w-full flex flex-col bg-slate-900 text-slate-400" v-if="store.filter !== undefined">
    <div class="grow overflow-x-auto overflow-y-auto w-full" :class="{ 'h-[48%]': expander.open }">
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
    <TorrentExpander v-if="expander.open" v-on:close="expander.open = false;" class="h-[48%]" :expander="expander" />
    <TorrentViewFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore, type ContextMenu, type Expander } from '@/stores/store'
import TorrentContextMenu from '@/components/TorrentContextMenu.vue'
import TorrentExpander from '@/components/TorrentExpander.vue'
import TorrentTable from '@/components/TorrentTable.vue'
import TorrentViewFooter from '@/components/TorrentViewFooter.vue'

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
  set(expander: Expander): void {
    store.expander(expander)
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