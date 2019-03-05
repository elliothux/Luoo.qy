import * as React from "react";
import {toast, ToastOptions} from "react-toastify";
import { Icon, IconTypes } from "../icon";
import { preventSyntheticEvent } from "../../utils";
import CONNECT from "../../static/connect.png";
import "./index.scss";


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

  handleLogin = (e: React.FormEvent<HTMLElement>) => {
    preventSyntheticEvent(e);
    const {account, password} = this.state;
    if (!account.trim()) {
        return toast.warn(<span>未输入账号!</span>);
    }
    if (!password) {
        return toast.warn(<span>未输入密码!</span>);
    } else if (password.length < 6) {
        return toast.warn(<span>密码太短!</span>);
    }

    this.setState({ isLoading: true });
  };

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
