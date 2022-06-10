<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';
import { User } from '@/interfaces/user/Iuser';

const props = defineProps({
  noOfPages: Number,
  selectedPage: Number,
});

function isSelected(index: number) {
  return index === props.selectedPage;
}
</script>

<template>
  <div v-if="props.noOfPages" class="page-nav">
    <div class="page-nav-button" @click="$emit('previous-page')" @keydown="$emit('previous-page')">
      <img src="@/assets/arrow-left.png" alt="" class="rounded-image" />
    </div>
    <div
      v-for="index in props.noOfPages"
      :key="index"
      class="page-nav-button"
      :class="{ selected: isSelected(index) }"
      @click="$emit('page-select', index)"
      @keydown="$emit('page-select', index)"
    >
      <p>{{ index }}</p>
    </div>
    <div class="page-nav-button" @click="$emit('next-page')" @keydown="$emit('next-page')">
      <img src="@/assets/arrow-right.png" alt="" class="rounded-image" />
    </div>
  </div>
</template>
