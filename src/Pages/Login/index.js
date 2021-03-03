import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import store from "../../store";
import { getCookie, setCookie } from "../../utils/cookie";
import LoadingModal from "../../Components/LoadingModal";

import styles from "./login.scss";

class Login extends Component {
state = {
  token: null,
  user: null,
  email: null,
  password: null,
  processing:true,
  user_id: null
};

async onLogin(){
  this.setState({
    processing:true
  });
  let res = {};
  let myObject = {
    email: this.state.email,
    password: this.state.password,
    address: {
      lat:"123123123",
    }
  };
  res = await store.login(myObject);
  if (res && res.data.data.auth_token) {
    if (res.status) {
      this.setState({
        token: res.data.data.auth_token,
        user: res.data.data.name,
        user_id: res.data.data.id,
      });
      setCookie("token", res.data.data.auth_token, {});
      setCookie("address", res.data.data.default_address_id, {});
      setCookie("user", res.data.data.name, {});
      setCookie("user_id", res.data.data.id, {});
      this.setState({
        processing:false
      });
      window.location.pathname = `/`;
    }
    else{
      this.props.createModal({
        header: "Error",
        declaration: "Email or password is wrong! Please try again!",
        buttons: [
          {
            type: "primary",
            text: "OK",
            sizeName: "default",
            onButtonClick: () => {
              this.props.closeModal();
            },
          },
        ],
      });
    }
  }
  else{
    this.props.createModal({
      header: "Error",
      declaration: "Email or password is wrong! Please try again!",
      buttons: [
        {
          type: "primary",
          text: "OK",
          sizeName: "default",
          onButtonClick: () => {
            this.props.closeModal();
          },
        },
      ],
    });
  }
  this.setState({
    processing:false
  });
};
emailInput(event){
  this.setState({email : event.target.value})
}
passwordInput(event){
  this.setState({password : event.target.value})
}
async loginClick(){
  await this.onLogin();
}
componentDidMount(){
  this.emailInput = this.emailInput.bind(this);
  this.passwordInput = this.passwordInput.bind(this);
  window.scrollTo(0, 0);
  this.setState({ 
    processing:false 
  });
}
render() {
return (
  <>
  {
		this.state.processing === true &&
		<LoadingModal text="Loading" />
	}
	{
    <div className={"Login"}>
    <div className="container">
              <div className={"Login__block"}>
                        <div className="container"> 
                        <div className="Login__block__sectionSubTitle">
                        Login
                        </div>
                        <div className="hrLine"></div>
                        <div className="row mt30">
                          <div className="col-12">
                            <div className="Login__block__sectionSubTitle">
                              Username or E-Mail
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="Login__block__addressInput"> <input type="text" name="email" onChange={this.emailInput} className="Login__block__addressInput__input" placeholder="Enter Username or E-Mail"/> </div>
                          </div>
                        </div>
                        <div className="row mt30">
                          <div className="col-12">
                            <div className="Login__block__sectionSubTitle">
                              Password
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="Login__block__addressInput"> <input type="password" name="password" onChange={this.passwordInput} className="Login__block__addressInput__input" placeholder="Enter Password"/> </div>
                          </div>
                          <div className="col-12">
                            <div className="Login__block__paragraph mt30"> If you don't have an account <Link to="/SignUp"><span className="oranged">register</span></Link></div>
                          </div>
                          </div>
                          <div className="row mt30">
                          <div className="col-12">
                              <div className="Login__block__standartButton " onClick={async () => this.loginClick()}>
                                <span className="Login__block__standartButton__text"> Login </span>
                              </div>
                          </div>
                        </div>
                        </div>     
                </div>

    </div>
    <Footer />
</div>
  }
  </>
);
}
}

export default Login;