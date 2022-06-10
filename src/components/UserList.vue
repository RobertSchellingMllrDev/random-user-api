<script setup lang="ts">
import {
  onBeforeMount, ref, computed, Ref,
} from 'vue';
import UserItem from '@/components/UserItem.vue';
import { User } from '../interfaces/user/Iuser';
import useApi from '../composables/use-api';
import UserDetails from './UserDetails.vue';
import PageNav from './PageNav.vue';

const userList: Ref<User[]> = ref([]);

const selectedCategory = ref('none');

const showModal = ref(false);

const isBuffering = ref(false);

const selectedUser = ref();

const selectedPage = ref(1);

function checkGender(user: User) {
  return user.gender === selectedCategory.value || selectedCategory.value === 'none';
}

function getCurrentPageList(list: User[]) {
  return list.slice((selectedPage.value - 1) * 20, selectedPage.value * 20);
}
function updateNoOfPages(list: User[]) {
  let x = Math.ceil(list.length / 20);
  if (x >= 10) {
    x = 10;
  }
  return x;
}
const filteredUserList = computed(() => userList.value.filter((user) => checkGender(user)));
const currentPageUserList = computed(() => getCurrentPageList(filteredUserList.value));
const noOfPages = computed(() => updateNoOfPages(filteredUserList.value));
const userRequest = computed(() => new Request(`https://randomuser.me/api/?gender=${selectedCategory.value}&results=20`));
function fetchData() {
  const { get } = useApi();
  isBuffering.value = true;
  get(userRequest.value).then(
    (response) => {
      isBuffering.value = false;
      const temp = response as any;
      if (userList.value.length > 0) {
        userList.value = userList.value.concat(temp.results);
      } else {
        userList.value = temp.results;
      }
    },
  );
}
function updateSelectedPage(increment: number) {
  selectedPage.value += increment;
  if (selectedPage.value < 1) {
    selectedPage.value = 1;
  }
  if (selectedPage.value > 10) {
    selectedPage.value = 10;
  }
  if (selectedPage.value > noOfPages.value) {
    fetchData();
  }
}
function refresh() {
  userList.value = [];
  selectedPage.value = 1;
  fetchData();
}
onBeforeMount(() => {
  fetchData();
});
</script>

<template>
  <div class="top-bar">
    <div class="refresh-button" @click="refresh()" @keydown="refresh()">
      <img src="@/assets/refresh-icon.png" alt="" style="background-color: transparent" />
    </div>
    <div class="gender-select" @change="selectedPage = 1">
      <select v-model="selectedCategory" class="gender-select-selector">
        <option value="none">----</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    <PageNav
      :no-of-pages="noOfPages"
      :selected-page="selectedPage"
      @previous-page="updateSelectedPage(-1)"
      @next-page="updateSelectedPage(1)"
      @page-select="selectedPage = $event"
    ></PageNav>
  </div>
  <div class="grid-container">
    <div class="card" v-for="user in currentPageUserList" :key="user.id.value">
      <UserItem
        :user="user"
        @click="
          showModal = true;
          selectedUser = user;
        "
      ></UserItem>
    </div>
  </div>
  <div class="buffer-gif" v-show="isBuffering">
    <img src="@/assets/buffering.gif" alt="" style="background-color: transparent"/>
  </div>
  <UserDetails
    v-show="showModal"
    @close-modal="showModal = false"
    :user="selectedUser"
  ></UserDetails>
</template>
