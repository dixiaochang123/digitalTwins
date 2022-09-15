<template>
    <el-container class="layout">
      <el-aside width="auto" class="asside">
          <MenuBar/>
      </el-aside>
      <el-container>
        <el-header class="header">Header
            <Header/>
            
        </el-header>
        <el-main class="main">
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>
<script setup lang="ts">
import Header from './header/Header.vue'
import MenuBar from './menu/MenuBar.vue'

</script>

<style lang="scss" scoped>
.layout {
    height: 100%;
    .asside {
        background-color: #304156;
    }
    .header {
        height: 50px;
        border-bottom: solid 1px #e5e5e5;
    }
    .main {

    }
}

</style>