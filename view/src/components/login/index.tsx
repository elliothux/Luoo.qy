import * as React from "react";
import "./index.scss";
import { Icon, IconTypes } from "../icon";
import CONNECT from "../../static/connect.png";
import { preventSyntheticEvent } from "../../utils";
import { SyntheticEvent } from "react";

class Login extends React.Component {
  state = {
    account: "",
    password: ""
  };

  handleChangeAccount = (e: React.FormEvent<HTMLInputElement>) => {
    preventSyntheticEvent(e);
    this.setState({ account: (e.target as HTMLInputElement).value });
  };

  handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    preventSyntheticEvent(e);
    this.setState({ password: (e.target as HTMLInputElement).value });
  };

  render() {
    const { account, password } = this.state;
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
          <p id="login-signup">
              没有账号？点击注册
          </p>
        <Icon type={IconTypes.BACK} />
        <div id="login-desc">
          <img src={CONNECT} alt="connect" />
          <p>使用落网账号登录</p>
        </div>
      </div>
    );
  }
}

export { Login };
