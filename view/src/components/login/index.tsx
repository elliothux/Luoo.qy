import * as React from "react";
import { toast } from "react-toastify";
import { Icon, IconTypes } from "../icon";
import { getIPC, preventSyntheticEvent, promiseWrapper } from "../../utils";
import { UserInfo } from "../../types";
import { userStore } from "../../store";
import CONNECT from "../../static/connect.png";
import "./index.scss";

const ipc = getIPC();

class Login extends React.Component {
  state = {
    account: "",
    password: "",
    isLoading: false
  };

  handleChangeAccount = (e: React.FormEvent<HTMLInputElement>) => {
    preventSyntheticEvent(e);
    this.setState({ account: (e.target as HTMLInputElement).value });
  };

  handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    preventSyntheticEvent(e);
    this.setState({ password: (e.target as HTMLInputElement).value });
  };

  handleLogin = async (e: React.FormEvent<HTMLElement>) => {
    preventSyntheticEvent(e);
    if (!this.checkLoginInputInvalid()) {
      return;
    }

    this.setState({ isLoading: true });
    const { account, password } = this.state;
    const [_, err] = await promiseWrapper<UserInfo>(
      ipc.user.login(account, password)
    );

    this.setState({ isLoading: false });
    if (err) {
      console.error(err);
      return toast.warn(<span>登录失败</span>);
    }
    return userStore.init();
  };

  checkLoginInputInvalid(): boolean {
    const { account, password } = this.state;
    if (!account.trim()) {
      toast.warn(<span>未输入账号!</span>);
      return false;
    }
    if (!password) {
      toast.warn(<span>未输入密码!</span>);
      return false;
    }
    if (password.length < 6) {
      toast.warn(<span>密码太短!</span>);
      return false;
    }
    return true;
  }

  render() {
    const { account, password, isLoading } = this.state;
    return (
      <div id="login">
        <p id="login-title">登录</p>
        <input
          type="text"
          placeholder="账号/邮箱"
          value={account}
          onChange={this.handleChangeAccount}
        />
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={this.handleChangePassword}
        />
        <p id="login-signup">没有账号？点击注册</p>
        {isLoading ? (
          <Icon type={IconTypes.SYNC} animate />
        ) : (
          <Icon type={IconTypes.BACK} onClick={this.handleLogin} />
        )}
        <div id="login-desc">
          <img src={CONNECT} alt="connect" />
          <p>使用落网账号登录</p>
        </div>
      </div>
    );
  }
}

export { Login };
