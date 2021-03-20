import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import store from "../../store";
import { getCookie, setCookie } from "../../utils/cookie";
import LoadingModal from "../../Components/LoadingModal";

import styles from "./signUp.scss";

class SignUp extends Component {
state = {
  loading: false,
  firstname:"",
  lastname:"",
  email:"",
  password:"",
  phone_code:"",
  phone:"",
  referral_code:"",
  formatted_address:"",
  lat:"",
  lng:"",
  isChecked:true,
  loading:false,
  carrier_route:"",
  addressText:"",
  termsModal:false
};

componentDidMount(){
  window.scrollTo(0, 0);
}
async registerClick(){
  this.setState({
    processing:true
  });
  let res = {};
  let myObject = {
    name: this.state.firstname + " " + this.state.lastname,
		email: this.state.email,
		phone: this.state.phone,
		password: this.state.password,
		referral_code: this.state.referral_code,
		notification_token:"Random",
		addressText:this.state.addressText,
		address: {
					address:this.state.addressText,
					house:this.state.addressText,
					landmark:this.state.addressText,
					lat:"123123",
					lng:"123123123",
					tag:"123123123",
					zipcode:"123123123",
					carrier_route:""
		},
  };
  res = await store.register(myObject);
  if (res) {
    if(res.data.success){
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
    }else{
      if(res.data.email_phone_already_used){
        this.props.createModal({
          header: "Error",
          declaration: "Email or phone already used!",
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
      else if(res.data.referral_code_not_valid){
        this.props.createModal({
          header: "Error",
          declaration: "Referral code is not valid!",
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
      else{
        this.props.createModal({
          header: "Error",
          declaration: "User couldn't registered!",
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
}
render() {
const options = {
items: 4,
nav: false,
dots:false,
autoplayTimeout:2500,
rewind: true,
autoplay: true,
responsive:{
0:{
items:1
},
768 : {
items:4
}
}
};
let { items } = this.state;
return (<>
  {
		this.state.processing === true &&
		<LoadingModal text="Loading" />
	}
	{
<div className={"SignUp"}>
    <div className="container">
              <div className={"SignUp__block"}>
                        <div className="container"> 
                        <div className="SignUp__block__sectionSubTitle">
                        Register
                        </div>
                        <div className="hrLine"></div>
                        <div className="row mt30">
                          <div className="col-6">
                            <div className="SignUp__block__sectionSubTitle">
                              First Name
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="SignUp__block__sectionSubTitle">
                              Last Name
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="SignUp__block__addressInput"> <input type="text" className="SignUp__block__addressInput__input" rows="5" onChange={(e) => this.setState({firstname: e.target.value})} placeholder="Enter First Name"/> </div>
                          </div>
                          <div className="col-6">
                            <div className="SignUp__block__addressInput"> <input type="text" className="SignUp__block__addressInput__input" rows="5" onChange={(e) => this.setState({lastname: e.target.value})} placeholder="Enter Last Name"/> </div>
                          </div>
                        </div>
                        <div className="row mt30">
                          <div className="col-12">
                            <div className="SignUp__block__sectionSubTitle">
                              Email
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="SignUp__block__addressInput"> <input type="text" className="SignUp__block__addressInput__input" rows="5" onChange={(e) => this.setState({email: e.target.value})} placeholder="Enter Email"/> </div>
                          </div>
                        </div>
                        <div className="row mt30">
                          <div className="col-12">
                            <div className="SignUp__block__sectionSubTitle">
                              Password
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="SignUp__block__addressInput"> <input type="password" className="SignUp__block__addressInput__input" rows="5" onChange={(e) => this.setState({password: e.target.value})} placeholder="Enter Password"/> </div>
                          </div>
                        </div>
                        <div className="row mt30">
                          <div className="col-12">
                            <div className="SignUp__block__sectionSubTitle">
                              Phone Number
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="SignUp__block__addressInput"> <input type="text" className="SignUp__block__addressInput__input" onChange={(e) => this.setState({phone: e.target.value})} rows="5" placeholder="Enter Phone Number"/> </div>
                          </div>
                        </div>
                        <div className="row mt30">
                          <div className="col-12">
                            <div className="SignUp__block__sectionSubTitle">
                              Address
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="SignUp__block__addressInput"> 
                              <textarea type="text" className="SignUp__block__addressInput__input" onChange={(e) => this.setState({addressText: e.target.value})} rows="5" placeholder="Enter Address"/>
                            </div>
                          </div>
                        </div>
                        <div className="row mt30">
                          <div className="col-12">
                            <div className="SignUp__block__sectionSubTitle">
                              Referral Code
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="SignUp__block__addressInput"> <input type="text" className="SignUp__block__addressInput__input" rows="5" onChange={(e) => this.setState({referral_code: e.target.value})} placeholder="Enter Referral Code"/> </div>
                          </div>
                        </div>
                        <div className="row mt30">
                          <div className="col-12">
                            <div className="SignUp__block__paragraph mt30"> If you have an account <Link to="/Login"><span className="oranged">login</span></Link></div>
                          </div>
                          </div>
                          <div className="row mt30">
                          <div className="col-12">
                            { this.state.loading == false &&
                              <>
                              <div className="SignUp__block__standartButton " onClick={async () => this.registerClick()}>
                                <span className="SignUp__block__standartButton__text"> Register </span>
                              </div>
                              </>
                            }
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

export default SignUp;