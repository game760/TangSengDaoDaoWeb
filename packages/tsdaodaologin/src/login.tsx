import axios from "axios";
import React, { Component } from "react";
import { Button, Spin, Toast } from '@douyinfe/semi-ui';
import './login.css'
import QRCode from 'qrcode.react';
import { WKApp, Provider } from "@tsdaodao/base"
import { LoginStatus, LoginType, LoginVM } from "./login_vm";
import classNames from "classnames";

type LoginState = {
    loginStatus: string
    loginUUID: string
    getLoginUUIDLoading: boolean
    scanner?: string  // 掃描者的uid
    qrcode?: string
}

class Login extends Component<any, LoginState> {
    render() {
        return <Provider create={() => {
            return new LoginVM()
        }} render={(vm: LoginVM) => {
            return <div className="wk-login">
                <div className="wk-login-content">
                    <div className="wk-login-content-phonelogin" style={{ "display": vm.loginType === LoginType.phone ? "block" : "none" }}>
                        {/* <div className="wk-login-content-logo">
                            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" />
                        </div> */}
                        <div className="wk-login-content-slogan">
                            歡迎使用 {WKApp.config.appName} <br/>
							本軟體不對中國大陸地區提供服務，<br/>
							港澳台及海外地區不在此限制範圍。
                        </div>
                        <div className="wk-login-content-form">
                           {/* <input type="text" placeholder="手機號" onChange={(v) => {
                                vm.username = v.target.value
                            }}></input>
                            <input type="password" placeholder="密碼" onChange={(v) => {
                                vm.password = v.target.value
                            }}></input> */}
							{/* <div className="wk-login-content-form-buttons">
                                <Button loading={vm.loginLoading} className="wk-login-content-form-ok" type='primary' theme='solid' onClick={async () => {
                                    if (!vm.username) {
                                        Toast.error("手機號不能為空！")
                                        return
                                    }
                                    if (!vm.password) {
                                        Toast.error("密碼不能為空！")
                                        return
                                    }
                                    let fullPhone = vm.username
                                    if (vm.username.length == 11 && vm.username.substring(0,1) === "1") {
                                        fullPhone = `0086${vm.username}`
                                    }else {
                                        if(vm.username.startsWith("+") ) {
                                            fullPhone = `00${vm.username.substring(1)}`
                                        }else if(!vm.username.startsWith("00")) {
                                            fullPhone = `00${vm.username}`
                                        }
                                    }
                                    vm.requestLoginWithUsernameAndPwd(fullPhone, vm.password).catch((err) => {
                                        Toast.error(err.msg)
                                    })
                                }}>登錄</Button>
                            </div>  */}
                            <div className="wk-login-content-form-others">
                                <div className="wk-login-content-form-scanlogin" onClick={() => {
                                    vm.loginType = LoginType.qrcode
                                }}>
                                    掃描登錄
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classNames("wk-login-content-scanlogin", vm.loginType === LoginType.qrcode ? "wk-login-content-scanlogin-show" : undefined)}>
                        <Spin size="large" spinning={vm.qrcodeLoading}>
                            <div className="wk-login-content-scanlogin-qrcode">
                                {
                                    vm.qrcodeLoading || !vm.qrcode ? undefined : <QRCode value={vm.qrcode} size={150} fgColor={WKApp.config.themeColor}></QRCode>
                                }
                                {
                                    <div className={classNames("wk-login-content-scanlogin-qrcode-avatar", vm.showAvatar() ? "wk-login-content-scanlogin-qrcode-avatar-show" : undefined)}>
                                        {vm.showAvatar() ? <img src={WKApp.shared.avatarUser(vm.uid!)}></img> : undefined}
                                    </div>
                                }
                                {
                                    !vm.autoRefresh ? <div className="wk-login-content-scanlogin-qrcode-expire">
                                        <p>二維碼已失效，點擊刷新</p>
                                        <img onClick={() => {
                                            vm.reStartAdvance()
                                        }} src={require("./assets/refresh.png")}></img>
                                    </div> : undefined
                                }
                            </div>
                        </Spin>
                        <div className="wk-login-content-scanlogin-qrcode-title">
                            <h3>使用手機{WKApp.config.appName}掃描登錄</h3>
                        </div>
                        <div className="wk-login-content-scanlogin-qrcode-desc">
                            <ul>
                                <li>
                                    在手機上打開{WKApp.config.appName}
                                </li>
                                <li>
                                    找到&nbsp;<b>我的</b> &nbsp; &gt; &nbsp; <b>電腦端登錄</b>  &nbsp; &gt; &nbsp;<b>掃描二維碼登錄</b>
                                </li>
                                <li>
                                    將你的手機攝像頭對準上面二維碼進行掃描
                                </li>
                                <li>
                                    在手機上確認登錄
                                </li>
                            </ul>
                        </div>
                        <div className="wk-login-footer-buttons">
                            <button onClick={() => {
                                vm.loginType = LoginType.phone
                            }}>返回</button>
                        </div>

                    </div>

                     <div className="wk-login-footer">
                        <ul>
                           <li style={{ marginTop: '0' }}>
							<a 
							href="https://open.queryip.top/privacy_policy/" 
							target="_blank" 
							rel="noopener noreferrer"
							className="link-item"
							>
							隱私政策
							</a>
							</li>
							<li style={{ marginTop: '0' }}>
							<a 
							href="https://open.queryip.top/user_agreement/" 
							target="_blank" 
							rel="noopener noreferrer"
							className="link-item"
							>
							使用協議
							</a>
							</li>
                        </ul>
                    </div> 
               
			   </div>
            </div>
        }}>
        </Provider>
    }
}

export default Login 