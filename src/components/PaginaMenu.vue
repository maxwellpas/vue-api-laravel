<template>
    <ul class="nav justify-content-center menu">        
        <router-link tag="li" class="nav-item" :to="{ path: '/'}"><a class="nav-link">Home</a></router-link>
        <router-link tag="li" class="nav-item" :to="{ path: '/product/create'}"><a class="nav-link">Product Create</a></router-link>
        <router-link tag="li" class="nav-item" :to="{ path: '/login'}"><a class="nav-link">Login</a></router-link>              
    </ul>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .menu{
        background: #0097ff;
        margin-bottom: 40px;
        padding: 10px;        
    }

    .menu li a{
        color: #FFF;
        text-transform: uppercase;
    }

    .menu li.router-link-exact-active a{
        text-decoration: underline;
        color: #fca700;
        font-weight: bold;
    }
</style>
