<script setup lang="ts">
import { User } from '@/interfaces/user/Iuser';
import { defineProps } from 'vue';

const props = defineProps({ user: Object as () => User });
</script>

<template>
  <div v-if="props.user" style="background-color: transparent">
    <div class="modal-overlay" @click="$emit('close-modal')" @keydown="$emit('close-modal')">
      <div class="modal">
        <img v-bind:src="props.user.picture.large" alt="" class="rounded-image" />
        <p class="name-text">Email Address: {{ props.user.email }}</p>
        <p class="name-text">Username: {{ props.user.login.username }}</p>
        <p class="name-text">
          Date of Birth: {{ props.user.dob.date + ' Age: ' + props.user.dob.age }}
        </p>
        <p class="name-text">Phone Number: {{ props.user.phone }}</p>
        <p class="name-text">Cellphone Number: {{ props.user.cell }}</p>
        <p class="name-text">ID Number: {{ props.user.id.name + props.user.id.value }}</p>
      </div>
    </div>
  </div>
</template>
