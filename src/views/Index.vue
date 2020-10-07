<template>
  <div>
    <my-header></my-header>
    <router-view></router-view>
  </div>
</template>

<script>
import MyHeader from '@/components/Header';

export default {
  name: "index",
  components: {
    MyHeader
  }
};
</script>

<style>
</style>
