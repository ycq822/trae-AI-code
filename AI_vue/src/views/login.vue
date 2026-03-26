<template>
    <div class="container">
        <div class="title">
            <div class="back-home">
                <el-icon><Back /></el-icon>
                <span>返回首页</span>
            </div>
            <div class="title-text">
                <h2>登录您的账户</h2>
                <p>请输入您的登录信息</p>
            </div>
        </div>
        <div class="form-container">
            <el-form 
                ref="loginFormRef"
                :model="formData"
                :rules="rules"
                label-position="top"
            >
                <el-form-item label="用户名或邮箱" prop="username">
                    <el-input v-model="formData.username" size="large" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" size="large" placeholder="请输入密码" type="password" show-password></el-input>
                </el-form-item>
                <el-button class="btn" size="large" type="primary" @click="submitForm(loginFormRef)">登录</el-button>
            </el-form>
            <div class="footer">
                <p>还没有账号？<router-link to="/auth/register" @click="handleRegister">去注册</router-link></p>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { ref, reactive } from 'vue'
//引入登录接口，拿到异步结果
import { login } from '@/api/admin'
import { useRouter } from 'vue-router'



const loginFormRef = ref()
const formData = reactive({
    username: '',
    password: ''
})
const rules = reactive({
    username: [
        { required: true, message: '请输入用户名或邮箱', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
})

//登录提交
const router = useRouter()
const submitForm = async (formEl) => {
    if(!formEl) return
    await formEl.validate((valid,fields)=>{
        if(valid){
            //登录提交; .then拿到异步结果
            login(formData).then(data=>{
                //判断token是否存在
                if(!data.token){
                    return console.error('登录失败')
                }
                //登录成功，保存token和用户信息
                localStorage.setItem('token',data.token)
                localStorage.setItem('userInfo',JSON.stringify(data.userInfo))
                // 根据用户角色决定
                if(data.userInfo.userType === 2){
                    router.push('/back/dashboard')
                }else{
                    
                }
            })
        }
    })
}
</script>

<style lang="scss" scoped>
.container{
    width: 384px;
    .title{
        .back-home{
            margin-bottom: 60px;
        }
        .title-text{
            text-align: center;
            h2{
                font-size:36px;
                margin-bottom: 10px;
            }
            p{
                font-size: 18px;
                color: #606266;
            }
        }
    }
    .form-container{
        margin-top: 30px;
        .btn{
            width: 100%;
            margin-bottom: 60px;
        }
        .footer{
            text-align: center;
            padding: 30px;
        }
    }
}
</style>