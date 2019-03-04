import * as React from 'react';
import './index.scss';
import {Icon, IconTypes} from "../icon";
import CONNECT from "../../static/connect.png";



function Login() {
    return(
        <div id="login">
            <p id="login-title">登录</p>
            <input type="text" placeholder="账号/邮箱" />
            <input type="password" placeholder="密码" />
            <Icon type={IconTypes.BACK} />
            <div id="login-desc">
                <img src={CONNECT} alt="connect" />
                <p>使用落网账号登录</p>
            </div>
        </div>
    )
}

export {
    Login
}
