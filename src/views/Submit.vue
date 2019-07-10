<template>
    <div class="wraper regin-bg submit">
        <div class="form-groups">
            <div class="label-groups">
                <label class="icons-1" for="name"></label>
                <input class="second-txt" maxlength="12" type="text" id="name" placeholder="请输入您的姓名" v-model="name">
            </div>
            <div class="label-groups">
                <label class="icons-2" for="sex"></label>
                <input class="second-txt" maxlength="1" type="text" id="sex" placeholder="请输入您的性别" v-model="gender">
            </div>
            <div class="label-groups">
                <label class="icons-3" for="idcard"></label>
                <input class="second-txt" maxlength="18" type="text" id="idcard" placeholder="请输入您的身份证号码" v-model="idcard">
            </div>
            <div class="label-groups">
                <label class="icons-4" for="idcardaddr"></label>
                <input class="second-txt" maxlength="18" type="text" id="idcardaddr" placeholder="请输入您的身份证地址" v-model="idcardaddr">
            </div>
            <div class="label-groups">
                <label class="icons-5" for="phone"></label>
                <input class="second-txt" maxlength="11" type="text" v-model="phone" id="phone" @blur="checkPhone()" placeholder="请输入您的电话号码">
            </div>
        </div>
        <div class="form-groups">
            <div class="label-groups">
                <label class="icons-6" for="compony"></label>
                <input class="second-txt" maxlength="19" type="text" id="compony" placeholder="平台登录账号" v-model="compony">
            </div>
            <div class="label-groups">
                <label class="icons-7" for="time"></label>
                <input class="second-txt" maxlength="12" type="text" id="time" placeholder="首次投资平台时间（xxxx年xx月）" lay-key="1">
            </div>
            <div class="label-groups">
                <label class="icons-8" for="totalmoney"></label>
                <input class="second-txt" maxlength="12" type="text" id="totalmoney" placeholder="总投资金额（元）" v-model="totalmoney">
            </div>
            <div class="label-groups">
                <label class="icons-8" for="returnmoney"></label>
                <input class="second-txt" maxlength="12" type="text" id="returnmoney" placeholder="已收回款（元）" v-model="returnmoney">
            </div>
            <div class="label-groups">
                <label class="icons-8" for="nomoney"></label>
                <input class="second-txt" maxlength="12" type="text" id="nomoney" placeholder="未收回款（元）" v-model="nomoney">
            </div>
            <div class="label-groups">
                <label class="icons-9" for="remitbank"></label>
                <input class="second-txt" maxlength="19" type="text" id="remitbank" placeholder="请输入汇款银行/汇款平台" v-model="remitbank">
            </div>
            <div class="label-groups">
                <label class="icons-10" for="remitaccount"></label>
                <input class="second-txt" maxlength="19" type="text" id="remitaccount" placeholder="请输入汇款账号/平台账号" v-model="remitaccount">
            </div>
            <div class="label-groups">
                <label class="icons-9" for="getaccount"></label>
                <input class="second-txt" maxlength="19" type="text" id="getaccount" placeholder="请输入收款银行/收款平台" v-model="getaccount">
            </div>
            <div class="label-groups">
                <label class="icons-10" for="returaccount"></label>
                <input class="second-txt" maxlength="19" type="text" id="returaccount" placeholder="请输入收款账号/平台账号" v-model="returaccount">
            </div>
        </div>
        <div class="form-groups">
            <div class="others"><img class="others-img" src="../assets/images/icon(7).png">其他情况（选填）</div>
            <textarea maxlength="120" class="txtarea" name="" id="other" placeholder="120字内" v-model="contents"></textarea>
            <div class="word-tips"><span class="span-num">0</span>/120</div>
        </div>
        <a class="btns-submit" href="javascript:;" @click="save()"></a>
        <div class="success-lay hide">
        </div>
    </div>
</template>

<script>
    export default {
        name:'submit',
        data:function(){
            return{
                list_id:'',
                list_name:'',
                contents:'',
                time:'',
                phone:'',
                name:'',
                gender:'',
                idcard:'',
                idcardaddr:'',
                compony:'',
                totalmoney:'',
                returnmoney:'',
                nomoney:'',
                remitbank:'',
                remitaccount:'',
                getaccount:'',
                returaccount:'',
            }
        },
        created(){
            this.getParams()
            document.title = this.list_name
            this.wxConfig();
        },
        mounted:function(){
            laydate.render({
                elem: '#time', //指定元素
                type: 'month'
            })
        },
        methods:{
            getParams() {
                // 取到路由带过来的参数
                var pipedata = JSON.parse(this.$route.query.pipedata)
                this.list_id = pipedata.id
                this.list_name = pipedata.name
            },
            save() {
                var name = $("#name").val().trim();
                var sex = $("#sex").val().trim();
                var idcard = $("#idcard").val().trim();
                var idaddress = $("#idcardaddr").val().trim();
                var phone = $("#phone").val().trim();
                var platloginid = $("#compony").val().trim();
                this.time = $("#time").val().trim();
                var suminvestment = $("#totalmoney").val().trim();
                var getinvestment = $("#returnmoney").val().trim();
                var unInvestment = $("#nomoney").val().trim();
                var setplatform = $("#remitbank").val().trim();
                var setaccount = $("#remitaccount").val().trim();
                var getplatform = $("#getaccount").val().trim();
                var getaccount = $("#returaccount").val().trim();
                var contents = $("#other").val().trim();
                if (name == "") {
                    layer.msg("姓名不能为空");
                    return;
                }
                if (sex == "") {
                    layer.msg("请输入性别");
                    return;
                }
                if (idcard == "") {
                    layer.msg("身份证号码不能为空");
                    return;
                }
                if (idaddress == "") {
                    layer.msg("身份证地址不能为空");
                    return;
                }
                if (phone.length != 11) {
                    layer.msg("请输入11位正确的手机号码");
                    return;
                }
                else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
                    layer.msg("请输入11位正确的手机号码");
                    return;
                }
                if (platloginid == "") {
                    layer.msg("平台登录账号不能为空");
                    return;
                }
                if (this.time == "") {
                    layer.msg("首次投资平台时间不能为空");
                    return;
                }
                if (suminvestment == "") {
                    layer.msg("总投资额不能为空");
                    return;
                }
                if (getinvestment == "") {
                    layer.msg("已收回款不能为空");
                    return;
                }
                if (unInvestment == "") {
                    layer.msg("未收回款不能为空");
                    return;
                }
                if (setplatform == "") {
                    layer.msg("汇款银行/平台不能为空");
                    return;
                }
                if (setaccount == "") {
                    layer.msg("汇款账号不能为空");
                    return;
                }
                if (getplatform == "") {
                    // layer.close(index);
                    layer.msg("收款银行/平台不能为空");
                    return;
                }
                if (getaccount == "") {
                    layer.msg("收款账号不能为空");
                    return;
                }
                var isadd = 0;
                if (isadd == 0) {
                    var index = layer.load(1, {
                        shade: [0.5, '#000'] //0.1透明度的白色背景
                    });
                    isadd = 1;
                    var vm = this
                    $.ajax({
                        url: '/api.php?op=addjzaj',
                        data: vm.$data,
                        type: 'post',
                        success: function (xml) {
                            if (xml.code == "1") {
                                isadd = 0;
                                $(":input").val("");
                                $('.success-lay').removeClass('hide');
                                $('.wraper').css("overflow", "hidden");
                                layer.close(index);
                            } if (xml.code == 0) {
                                isadd = 0;
                                layer.msg("操作失败,请稍后再试");
                                layer.close(index);
                                return;
                            }
                        }
                    })
                } else {
                    layer.msg("请勿重复提交信息");
                }
            },
            checkPhone(){
                if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))) {
                    layer.msg("请输入11位正确的手机号码");
                    return;
                }
            }
        },
        watch:{
            //监视变量内容的值变化了就触发
            contents:function (){
                var l = this.contents.length;
                $('.span-num').text(l);
            },
        }

    }
</script>