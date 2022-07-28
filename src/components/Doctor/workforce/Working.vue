<template>
  <el-calendar>
    <template #dateCell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }}
        <!-- {{ data.isSelected ? '✔️' : '' }} -->
      </p>
    </template>
  </el-calendar>
</template>>

<script>
export default {
  name: 'IndexApp',
  data() {
    return {
      isSelected :'2022-07-17',
    }  },
  components: {}
}
</script>

<style></style>
