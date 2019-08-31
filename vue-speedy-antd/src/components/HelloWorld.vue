<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <a-button type="primary">这是按钮，可以点一下</a-button>
        <a-icon type="double-left" />
    </div>
</template>

<script>
    import {Button} from 'ant-design-vue'

    export default {
        name: 'HelloWorld',
        components: {Button},
        props: {
            msg: String
        }
    }
</script>

<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
