<script setup lang="ts">
import { User } from '@/interfaces/user/Iuser';
import { defineProps } from 'vue';

const props = defineProps({
  user: Object as () => User,
});

</script>

<template>
  <div v-if="props.user" style="background-color: transparent">
    <div class="flex-column">
      <div v-if="props.user.gender == 'male'" style="background-color: transparent">
        <img
          src="@/assets/male-icon.png"
          alt=""
          class="gender-icon"
          style="background-color: transparent"
        />
      </div>
      <div v-if="props.user.gender == 'female'" style="background-color: transparent">
        <img
          src="@/assets/female-icon.png"
          alt=""
          class="gender-icon"
          style="background-color: transparent"
        />
      </div>
      <div class="profile-picture-div">
        <img v-bind:src="props.user.picture.large" alt="" class="profile-picture-image" />
      </div>
    </div>
    <p class="name-text">
      {{ props.user.name.first + ' ' + props.user.name.last }}
    </p>
    <p class="name-text">
      {{
        props.user.location.city +
        ', ' +
        props.user.location.state +
        ', ' +
        props.user.location.postcode
      }}
    </p>
    <p class="name-text">
      {{ props.user.phone }}
    </p>
    <p class="name-text">
      {{ props.user.email }}
    </p>
  </div>
</template>
