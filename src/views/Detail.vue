<template>
    <div class="wraper detail">
        <!-- 规则 -->
        <img class="notice-img" v-bind:src="item.img_url" alt="">
        <div class="second-btn-submit" @click="pipeData()"></div>
    </div>
</template>
<script>

    export default {
        data(){
          return{
              item:'',
          }
        },
        created() {
            this.getParams()
            document.title = this.item.title
            this.wxConfig();
        },
        methods:{
            getParams() {
                // 取到路由带过来的参数
                this.item = JSON.parse(this.$route.query.pipedata)
            },
            pipeData() {
                this.$router.push({
                    path: '/submit',
                    name: 'submit',
                    query: {
                        pipedata: JSON.stringify(this.item)
                    }
                })
            },
        },
    }
</script>