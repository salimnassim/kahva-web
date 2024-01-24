<template>
    <div v-if="props.contextMenu.open" class="absolute z-10"
        :style="`left: ${props.contextMenu.x}px; top: ${props.contextMenu.y}px;`">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { type ChildContextMenu } from '@/types/contextMenu'

const props = defineProps<{
    contextMenu: ChildContextMenu
}>()
</script>