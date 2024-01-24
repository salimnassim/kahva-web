import { defineStore } from 'pinia'
import { IsViewResponse, type Torrent } from '@/types/torrent'
import { IsSystemResponse, type System } from '@/types/system'
import { IsFileResponse, type File } from '@/types/file'
import { IsTrackerResponse, type Tracker } from '@/types/tracker'
import { IsPeerResponse, type Peer } from '@/types/peer'
import { type ParentContextMenu } from '@/types/contextMenu'
import { IsResponse } from '@/types/response'
import { type TorrentPriorityRequest } from '@/types/request'

export interface Indexable<T = any> {
  [key: string]: T
}

export interface Sorting {
  key: string
  direction: boolean
}

export interface ContextMenu extends ParentContextMenu {
  torrent: Torrent | undefined
}

export interface Expander {
  open: boolean
  tab: ExpanderTab
  torrent: Torrent | undefined
  files: File[] | undefined
  trackers: Tracker[] | undefined
  peers: Peer[] | undefined
}

export enum ExpanderTab {
  Details,
  Files,
  Trackers,
  Peers
}

export interface UserInterface {
  collator: Intl.Collator
  sorting: Sorting
  contextMenu: ContextMenu
  expander: Expander
  search: string
  updateInterval: number
  view: string
}

export interface State {
  userInterface: UserInterface
  torrents: Torrent[] | undefined
  system: System | undefined
}

export const useStore = defineStore('store', {
  state: (): State => ({
    userInterface: {
      collator: new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }),
      sorting: { key: '', direction: false },
      contextMenu: {
        open: false,
        x: 0,
        y: 0,
        torrent: undefined
      },
      expander: {
        open: false,
        tab: ExpanderTab.Details,
        torrent: undefined,
        files: undefined,
        trackers: undefined,
        peers: undefined
      },
      search: '',
      updateInterval: 24,
      view: 'main'
    },
    torrents: undefined,
    system: undefined
  }),
  getters: {
    ui: (state) => {
      return state.userInterface
    },
    // returns a filtered view of torrents
    filter: (state) => {
      if (state.torrents === undefined) {
        return undefined
      }

      let items = [] as Torrent[]

      // if sorting key is not set, reverse torrents so it will display latest torrents first
      if (state.userInterface.sorting.key === '') {
        items = state.torrents.reverse()
      }
      // if sorting key is set, sort by direction where true is ascending
      if (state.userInterface.sorting.key != '' && state.userInterface.sorting.direction) {
        items = state.torrents.sort((a, b) =>
          state.userInterface.collator.compare(
            a[state.userInterface.sorting.key],
            b[state.userInterface.sorting.key]
          )
        )
      }
      // if sorting key is set, sort by direction where false is descending
      if (state.userInterface.sorting.key != '' && !state.userInterface.sorting.direction) {
        items = state.torrents.sort((a, b) =>
          state.userInterface.collator.compare(
            b[state.userInterface.sorting.key],
            a[state.userInterface.sorting.key]
          )
        )
      }

      if (state.userInterface.search != '') {
        items = items.filter((n) => n.name.toLocaleLowerCase().match(state.userInterface.search))
      }

      return items
    }
  },
  actions: {
    async expander(expander: Partial<Expander>) {
      this.ui.expander = { ...this.ui.expander, ...expander }
    },
    async contextMenu(contextMenu: Partial<ContextMenu>) {
      this.ui.contextMenu = { ...this.ui.contextMenu, ...contextMenu }
    },
    async sort(key: string, direction: boolean) {
      this.ui.sorting.key = key
      this.ui.sorting.direction = direction
    },
    async search(query: string) {
      this.ui.search = query
    },
    // refresh view
    async refreshView() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/view/${this.userInterface.view}`,
          {
            method: 'GET'
          }
        )
        if (!res.ok) {
          console.error(res.status, res.statusText)
          return
        }
        const json = await res.json()
        if (!IsViewResponse(json)) {
          console.error(`malformed view response`)
          return
        }
        this.torrents = json.torrents
      } catch (err: any) {
        console.error(err)
        return
      }
    },
    // refresh system
    async refreshSystem() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/system`, {
          method: 'GET'
        })
        if (!res.ok) {
          console.error(res.status, res.statusText)
          return
        }
        const json = await res.json()
        if (!IsSystemResponse(json)) {
          console.error(`malformed system response`)
          return
        }
        this.system = json.system
      } catch (err: any) {
        console.error(err)
        return
      }
    },
    async files(torrent: Torrent) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/torrent/${torrent.hash}/files`,
          {
            method: 'GET'
          }
        )
        if (!res.ok) {
          console.error(res.status, res.statusText)
          return
        }
        const json = await res.json()
        if (!IsFileResponse(json)) {
          console.error(`malformed files response`)
          return
        }
        this.userInterface.expander.files = json.files
      } catch (err: any) {
        console.error(err)
        return []
      }
    },
    async trackers(torrent: Torrent) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/torrent/${torrent.hash}/trackers`,
          {
            method: 'GET'
          }
        )
        if (!res.ok) {
          console.error(res.status, res.statusText)
          return
        }
        const json = await res.json()
        if (!IsTrackerResponse(json)) {
          console.error(`malformed trackers response`)
          return
        }
        this.userInterface.expander.trackers = json.trackers
      } catch (err: any) {
        console.error(err)
        return []
      }
    },
    async peers(torrent: Torrent) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/torrent/${torrent.hash}/peers`,
          {
            method: 'GET'
          }
        )
        if (!res.ok) {
          console.error(res.status, res.statusText)
          return
        }
        const json = await res.json()
        if (!IsPeerResponse(json)) {
          console.error(`malformed peers response`)
          return
        }
        this.userInterface.expander.peers = json.peers
      } catch (err: any) {
        console.error(err)
        return []
      }
    },
    async upload(file: Blob): Promise<void> {
      const form = new FormData()
      form.append('file', file)

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/load`, {
          method: 'POST',
          body: form
        })
        if (!res.ok) {
          console.error(res.status, res.statusText)
          return
        }
        return
      } catch (err: any) {
        console.error(err)
        return
      }
    },
    async priority(torrent: Torrent, request: TorrentPriorityRequest) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/torrent/${torrent.hash}/priority`,
          {
            method: 'POST',
            body: JSON.stringify(request)
          }
        )
        if (!res.ok) {
          console.error(res.status, res.statusText)
          return
        }
        const json = await res.json()
        if (!IsResponse(json)) {
          console.error(`malformed priority response`)
          return
        }
      } catch (err: any) {
        console.error(err)
        return []
      }
    },
    async start(torrent: Torrent) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/torrent/${torrent.hash}/start`,
          {
            method: 'GET'
          }
        )
        if (!res.ok) {
          console.error(res.status, res.statusText)
          return
        }
        const json = await res.json()
        if (!IsResponse(json)) {
          console.error(`malformed start response`)
          return
        }
      } catch (err: any) {
        console.error(err)
        return []
      }
    },
    async stop(torrent: Torrent) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/torrent/${torrent.hash}/stop`,
          {
            method: 'GET'
          }
        )
        if (!res.ok) {
          console.error(res.status, res.statusText)
          return
        }
        const json = await res.json()
        if (!IsResponse(json)) {
          console.error(`malformed stop response`)
          return
        }
      } catch (err: any) {
        console.error(err)
        return []
      }
    },
    async pause(torrent: Torrent) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/torrent/${torrent.hash}/pause`,
          {
            method: 'GET'
          }
        )
        if (!res.ok) {
          console.error(res.status, res.statusText)
          return
        }
        const json = await res.json()
        if (!IsResponse(json)) {
          console.error(`malformed pause response`)
          return
        }
      } catch (err: any) {
        console.error(err)
        return []
      }
    },
    async resume(torrent: Torrent) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/torrent/${torrent.hash}/resume`,
          {
            method: 'GET'
          }
        )
        if (!res.ok) {
          console.error(res.status, res.statusText)
          return
        }
        const json = await res.json()
        if (!IsResponse(json)) {
          console.error(`malformed resume response`)
          return
        }
      } catch (err: any) {
        console.error(err)
        return []
      }
    },
    async recheck(torrent: Torrent) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/torrent/${torrent.hash}/hash`,
          {
            method: 'GET'
          }
        )
        if (!res.ok) {
          console.error(res.status, res.statusText)
          return
        }
        const json = await res.json()
        if (!IsResponse(json)) {
          console.error(`malformed recheck response`)
          return
        }
      } catch (err: any) {
        console.error(err)
        return []
      }
    }
  }
})
