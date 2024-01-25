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
  <TorrentContextMenu :context-menu="contextMenu"
    v-on:start="(t) => { if (t === undefined) { return }; store.start(t); contextMenu.open = false; }"
    v-on:resume="(t) => { if (t === undefined) { return }; store.resume(t); contextMenu.open = false; }"
    v-on:pause="(t) => { if (t === undefined) { return }; store.pause(t); contextMenu.open = false; }"
    v-on:recheck="(t) => { if (t === undefined) { return }; store.recheck(t); contextMenu.open = false; }"
    v-on:stop="(t) => { if (t === undefined) { return }; store.stop(t); contextMenu.open = false; }" v-on:details="(t) => {
      contextMenu.open = false;
      expander.torrent = t;
      expander.tab = ExpanderTab.Details;
      expander.open = true;
    }"
    v-on:priority="(t, p) => { if (t === undefined) { return }; store.priority(t, { priority: p }); contextMenu.open = false; }" />
  <div class="h-full w-full flex flex-col bg-slate-900 text-slate-400" v-if="store.filter !== undefined">
    <TorrentViewHeader />
    <div class="grow overflow-x-auto overflow-y-auto w-full" :class="{ 'h-[60%]': expander.open }">
      <TorrentTable @click.prevent="() => {
        contextMenu.open = false;
        contextMenu.torrent = undefined;
        sticky.open = false;
      }" v-on:row-clicked="(t, e) => {
  contextMenu.open = false;
  contextMenu.torrent = t;
  contextMenu.x = e.clientX,
    contextMenu.y = e.clientY;
  contextMenu.open = true;
}" />
    </div>
    <TorrentExpander v-if="expander.open"
      v-on:close="() => { expander.open = false; expander.torrent = undefined; expander.tab = ExpanderTab.Details; }"
      class="max-h-[40%] h-[40%]" :expander="expander" />
    <TorrentViewFooter />
  </div>
</template>

<script async setup lang="ts">
import { computed } from 'vue';
import { useStore, type ContextMenu, type Expander, ExpanderTab } from '@/stores/store'
import TorrentContextMenu from '@/components/TorrentContextMenu.vue'
import TorrentExpander from '@/components/TorrentExpander.vue'
import TorrentTable from '@/components/TorrentTable.vue'
import TorrentViewHeader from '@/components/TorrentViewHeader.vue'
import TorrentViewFooter from '@/components/TorrentViewFooter.vue'
import type { Sticky } from '@/types/sticky';
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

const sticky = computed({
    get(): Sticky {
        return store.ui.sticky
    },
    set(sticky: Sticky) {
        store.sticky(sticky)
    }
})

// refresh on load so we dont have to wait for next interval
store.refreshView()
store.refreshSystem()

// refresh view every n seconds
window.setInterval(function () {
  store.refreshView()
  store.refreshSystem()
}, 1000 * store.ui.updateInterval)
</script>