<template>
    <div class="wraper">
        <img class="s-banner" src="../assets/images/server.png">
        <div class="second-item-group">
            <div v-for="(item,index) in items" @click="pipeData(index)">
                <div class="second-item">
                    <div class="second-title">{{item.name}}</div>
                    <div class="second-time">{{item.time}}</div>
                </div>
            </div>
        </div>
        <img src="../assets/images/bottom.png"
             style="width:100%;padding:0px;margin:0px; position: fixed; bottom: 0;z-index:10000">
    </div>
</template>

<script>
    // @ is an alias to /src
    /*import HelloWorld from '@/components/HelloWorld.vue'*/
    export default {
        name: 'home',
        data() {
            return {
                items: '',
            }
        },
        created() {
            var vm = this
            this.$axios.get('/api.php?op=getjzlist')
                .then(function (response) {
                    if (response.data.code == 1) {
                        vm.items = response.data.data
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
            this.wxConfig();
        },
        methods: {
            pipeData(index) {
                if (!this.items[index].img_url) {
                    this.$router.push({
                        path: '/submit',
                        name: 'submit',
                        query: {
                            pipedata: JSON.stringify(this.items[index])
                        }
                    })
                }else {
                    this.$router.push({
                        path: '/detail',
                        name: 'detail',
                        query: {
                            pipedata: JSON.stringify(this.items[index])
                        }
                    })
                }

            },
        },
    }
</script>
