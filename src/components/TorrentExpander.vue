<template>
    <div>expander</div>
</template>

<script setup lang="ts">
import { type Expander } from '@/stores/store'
defineProps<{
    expander: Expander
}>()
defineEmits<{
    close: [void]
}>()
</script>