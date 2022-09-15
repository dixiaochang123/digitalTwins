<template>
    <template v-for="item in menuList" :key="item.path">
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
            <template #title>
                 <!-- 动态组件的使用方式 -->
                <component class="icons" :is="item.meta.icon" />
                <!-- 方式二 -->
                <!-- <Icon class="icons" :icon="item.meta.icon"></Icon> -->
                <span>{{item.meta.title}}</span>
            </template>
            <MenuItem :menuList="item.children"></MenuItem>
        </el-sub-menu>
        <el-menu-item style="color:#f4f4f5" v-else :index="item.path">
            <component class="icons" :is="item.meta.icon" />
            <template #title>{{ item.meta.title }}</template>
        </el-menu-item>
    </template>
</template>

<script setup lang="ts">
defineProps([
    'menuList'
])

</script>

<style lang="scss" scoped>
.icons{
  width: 24px;
  height: 18px;
}
</style>