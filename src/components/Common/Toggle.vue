<template>
    <div class="toggle">
        <div :style="{
            transform: `translateX(${on ? 21 : 4}px)`,
            backgroundColor: `rgba(255, 255, 255, ${on ? 1 : 0})`
        }"></div>
    </div>
</template>


<script>
    import Vue from 'vue';


    export default {
        name: 'Toggle',
        props: ['on']
    }
</script>


<style lang="sass">
    .toggle
        width: 35px
        height: 16px
        border-radius: 15px
        border: 1px solid white
        position: relative
        cursor: pointer
        display: inline-block

        & > div
            width: 8px
            height: 8px
            border: solid 1px white
            margin-top: 3px
            border-radius: 100%
            transition: all ease 300ms

</style>