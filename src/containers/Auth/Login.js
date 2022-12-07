import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import * as userService from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isShowPass: false,
            errMessage: ''
        }
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        const { email, password } = this.state
        try {
            let data = await userService.handleLogin(email, password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.errMessage
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.errMessage
                    })
                }
            }
            console.log("error ", error.response)
        }
    }

    handleOnkeyDownLogin = (e) => {
        if(e.keyCode === 13) {
            this.handleLogin()
        }
    }

    handleShowPassword = () => {
        this.setState(prevState => ({
            isShowPass: !prevState.isShowPass
        }));
    }

    render() {
        let { email, password, isShowPass } = this.state;
        return (
            <div className='login_background'>
                <div className='login_container'>
                    <div className='login_content row'>
                        <h1 className='col-12'>Login</h1>
                        <div className='col-12 form-login'>

                            <div className='form-group'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='email'
                                    value={email}
                                    onChange={this.onEmailChange}
                                    onKeyDown={this.handleOnkeyDownLogin}
                                    id='email'
                                    className='form-control'
                                    name='email'
                                    placeholder='Enter your email' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>Password</label>
                                <div className='password-wrap'>
                                    <input
                                        type={isShowPass ? 'text' : 'password'}
                                        value={password}
                                        onChange={this.onPasswordChange}
                                        onKeyDown={this.handleOnkeyDownLogin}
                                        id='password'
                                        className='form-control'
                                        name='password'
                                        placeholder='Enter your password' />
                                    <span
                                        onClick={this.handleShowPassword}
                                        className='icon-show'>
                                        {
                                            isShowPass ? <i className='bx bx-leaf'></i> : <i className='bx bxs-leaf'></i>
                                        }

                                    </span>
                                </div>
                            </div>
                            <div className='err-message'>
                                {this.state.errMessage}
                            </div>
                            <div className='btn-login'>
                                <button
                                    onClick={this.handleLogin}
                                    type='submit'>
                                    Log in
                                </button>
                            </div>

                        </div>
                        <div className='col-12 form-forgot-password'>
                            <a href=''>Forgot your password?</a>
                        </div>
                        <div className='col-12 form-sign-width'>
                            <p>Or side in with: </p>
                            <div className='social-media'>
                                <a href='' className='facebook'>
                                    <i className='bx bxl-facebook'></i>
                                </a>
                                <a href='' className='twitter'>
                                    <i className='bx bxl-twitter' ></i>
                                </a>
                                <a href='' className='google'>
                                    <i className='bx bxl-google'></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
