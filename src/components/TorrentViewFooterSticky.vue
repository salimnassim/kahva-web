<template>
    <div v-if="props.sticky.open" class="absolute" :style="`left: ${sticky.x}px; top: ${sticky.y}px;`">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { type Sticky } from '@/types/sticky';

const props = defineProps<{
    sticky: Sticky
}>()
</script>