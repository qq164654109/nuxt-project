<template>
  <div id="login" class="full of-hidden" :class="{'active': form.username || form.password}">
    <div class="login-form-wrap of-hidden cursor-pointer">
      <div class="login-tit txt-center">登录</div>
      <b-form class="login-form" @submit="onSubmit">
        <div class="form-item pos-relative" :class="{'focus': usernameFocus}">
          <div class="placeholder no-select pos-absolute">用户名</div>
          <b-form-input id="username" v-model="form.username" required @focus="onFocus('username')" @blur="onBlur('username')"></b-form-input>
          <div class="line pos-absolute"></div>
        </div>
        <div class="form-item pos-relative" :class="{'focus': passwordFocus}">
          <div class="placeholder no-select pos-absolute">密码</div>
          <b-form-input id="password" v-model="form.password" required @focus="onFocus('password')" @blur="onBlur('password')"></b-form-input>
          <div class="line pos-absolute"></div>
        </div>
        <b-button class="btn full" type="submit" variant="primary">登录</b-button>
      </b-form>
      <div class="login-tip txt-center">
        没有账号？
        <em>注册</em>
      </div>
    </div>
    <div class="bg"></div>
    <div class="bubble"></div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    middleware: 'logged',
    layout: 'blank',
    data() {
      return {
        usernameFocus: false,
        passwordFocus: false,
        form: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapMutations(['setUsername', 'setUsertoken']),
      routeJump() {
        const redirect = this.$route.query.redirect;
        const jumpPath = redirect ? redirect : '/';
        this.$router.push(jumpPath);
      },
      onSubmit(evt) {
        evt.preventDefault();
        this.setUsername(this.form.username);
        this.setUsertoken(this.form.username + this.form.password);
        
        this.routeJump();
      },
      onFocus(inputName) {
        this[inputName + 'Focus'] = true;
      },
      onBlur(inputName) {
        this[inputName + 'Focus'] = !!this.form[inputName];
      }
    }
  }
</script>

<style lang="scss" scoped>
#login {
  position: relative;
  height: 100vh;
  &.active {
    .bg {
      left: 0;
      top: 0;
    }
    .bubble {
      transform: translateY(-52%) translateX(10%);
    }
  }
  .login-form-wrap {
    position: relative;
    width: 380px;
    padding: 0 40px;
    margin: 18vh auto 0;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.1);
    z-index: 1;
    // &:hover {
    //   & + div {
    //     transform: translateY(-40%) translateX(15%);
    //   }
    // }
    .login-tit {
      letter-spacing: 1px;
      font-size: 24px;
      margin-top: 65px;
      margin-bottom: 50px;
    }
    .login-form {
      .form-item {
        &.focus {
          .placeholder {
            transform: translateY(-30px);
          }
          .line {
            width: 100%;
          }
        }
        .placeholder {
          left: 0.75rem;
          top: 0.375rem;
          line-height: 1.5;
          color: #6C757D;
          transition: all .4s $transEffect;
        }
        .line {
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background-image: linear-gradient(160deg, #378DDA 20%,#8B55B3 80%);
          transition: all .4s $transEffect;
          z-index: 2;
        }
      }
      .form-control {
        border-radius: 0;
        border-left: none;
        border-top: none;
        border-right: none;
        border-width: 2px;
        margin-bottom: 40px;
        box-shadow: none;
      }
      .btn {
        margin-bottom: 50px;
        background-image: linear-gradient(160deg, #378DDA 0%,#8B55B3 100%);
        &:focus, &:hover, &:active {
          border-color: none;
        }
      }
    }
    .login-tip {
      font-size: 12px;
      margin-bottom: 100px;
    }
  }
  .bg {
    position: absolute;
    width: 130%;
    height: 130%;
    left: -30%;
    top: -30%;
    z-index: -1;
    background-image: linear-gradient(160deg, #378DDA 20%,#8B55B3 80%);
    transition: all 1s;
  }
  .bubble {
    position: absolute;
    top: 0;
    right: 0;
    width: 70%;
    height: 0;
    transform: translateX(25%) translateY(-63%);
    padding-top: 70%;
    border-radius: 50%;
    box-shadow: -4px 4px 12px rgba(255, 255, 255, 0.2);
    transition: 1s $transEffect;
  }
}
</style>