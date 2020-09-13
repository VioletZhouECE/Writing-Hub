import React from "react";
import {Route, Switch} from "react-router-dom";
import Login from "./auth/login";
import Signup from "./auth/signup";
import HomePage from "./home/home_page";
import MenuBar from "./reusable/menu_bar";
import WriteEntry from "./write/write_entry";
import PostDetails from "./home/post_details";
import LanguageSelect from "./reusable/language_select";

class MainPage extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            isAuth: false,
            userId: null,
            token: null,
            error: null,
            learnLanguage: null,
            firstLanguage: null
        }

        this.handleSignup = this.handleSignup.bind(this);
        this.verifyUsername = this.verifyUsername.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount(){
      //if the token expires, remove items from local storage
      if (!localStorage.getItem('token')){
        return; 
      }
      
      if (localStorage.getItem('expiryDate') && 
      new Date().getTime() - localStorage.getItem('expiryDate')>0){
       localStorage.removeItem('expiryDate');
       localStorage.removeItem('token');
       localStorage.removeItem('userId');
       localStorage.removeItem('learnLanguage');
       localStorage.removeItem('firstLanguage');
      } else {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const learnLanguage = localStorage.getItem('learnLanguage');
        const firstLanguage = localStorage.getItem('firstLanguage');
        const remainingMilliseconds = new Date(localStorage.getItem('expiryDate')) - new Date().getTime();
        //set autologout
        this.setAutoLogout(remainingMilliseconds);
        //direct user to homepage
        this.setState({
          isAuth : true,
          token: token,
          userId : userId,
          learnLanguage: learnLanguage,
          firstLanguage: firstLanguage
        })
      }
    }
 
    verifyUsername(username){
      //remove error from the previous signup request
      return new Promise((resolve, reject) =>{
        this.setState({error:null});
        fetch(`/auth/signup/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          if (res.status === 400) {
              throw new Error('Please enter a valid username (2-10 characters long) and a valid password (6-12 characters long)');
          }
          if (res.status === 422) {
            throw new Error("A user with this username already exists, please choose another username!");
          }
          if (res.status !== 200) {
            throw new Error ("Create user failed due to an issue on the server, please try again later");
          }

          resolve();
        })
        .catch(err => {
          this.setState({
            isAuth: false,
            error: err.message
          });
          reject();
        })
      })
    }

    handleSignup(data){
      //remove error from the previous signup request
      this.setState({error:null});
      fetch('/auth/signup', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          learnLanguage: data.learnLanguage,
          firstLanguage: data.firstLanguage
        })
      })
      .then(res => {
        if (res.status !== 201) {
          throw new Error ("Create user failed due to an issue on the server, please try again later");
        }
        //direct user to the home page
        this.setState({ isAuth: false,
                        error: null});
        this.props.history.replace('/');
      })
      .catch(err => {
        this.setState({
          isAuth: false,
          error: err.message
        });
      });
  };

  handleLogin(data){
    //remove error from the previous signup request
    this.setState({error:null});
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password
      })
    })
    .then(res => {
      if (res.status === 401) {
          throw new Error('Wrong username or password');
      }
      if (res.status !== 200 && res.status !== 201) {
          throw new Error ("Login user failed due to an issue on the server, please try again later");
      }
      return res.json();
    })
    .then(resData => {
      this.setLocalStorage(resData.userId, resData.token, resData.learnLanguage, resData.firstLanguage);
      //direct user to the home page
      this.setState({isAuth: true,
                     userId: resData.userId,
                     token : resData.token,
                     learnLanguage: resData.learnLanguage,
                     firstLanguage: resData.firstLanguage,
                     error: null});
    })
    .catch(err => {
      this.setState({
        isAuth: false,
        error: err.message
      });
    });   
  }

  setLocalStorage(userId, token, learnLanguage, firstLanguage){
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('token', token.toString());
    localStorage.setItem('learnLanguage', learnLanguage);
    localStorage.setItem('firstLanguage', firstLanguage);
    
    //auto-logout: 3h
    const remainingMilliseconds = 3 * 60 * 60 * 1000;
    const expiryDate = new Date(
      new Date().getTime() + remainingMilliseconds
    );
    //store expiryDate as a UTC timestamp
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    this.setAutoLogout(remainingMilliseconds);
  }

  setAutoLogout(remainingMilliseconds){
    setTimeout(()=>{this.handleLogout()}, remainingMilliseconds);
  }

  handleLogout(){
    //log the user out
    this.setState({
      isAuth : false,
      token: null
    })
    //remove items from the local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('learnLanguage');
    localStorage.removeItem('firstLanguage');
  }

    render(){
        return !this.state.isAuth?(
          <div id="auth-parent-component">
            <div className = "float-right alert alert-danger toast-message" style={{display: this.state.error? "inline" : "none"}}>
                {this.state.error}
            </div>
            <Switch>
                <Route path = "/signup" render = {(props) => <Signup handleSubmitForm = {this.handleSignup} verifyUsername = {this.verifyUsername}></Signup>}></Route>
                <Route path = "/" render = {(props) => <Login handleSubmitForm = {this.handleLogin}></Login>}></Route>
            </Switch>
          </div>
        ) : (
            <div>
              <MenuBar handleLogout = {this.handleLogout}></MenuBar>
              <div id = "success_message" className = "alert alert-success toast-message"></div>
              <div id = "error_message" className = "alert alert-danger toast-message"></div>
              <Switch>
                <Route path = "/write" render = {(props)=><WriteEntry token = {this.state.token}></WriteEntry>}></Route>
                <Route path = "/journal" render = {(props)=><PostDetails token = {this.state.token}></PostDetails>}></Route>
                <Route path ="/" render = {(props)=><HomePage token = {this.state.token} learnLanguage = {this.state.learnLanguage} firstLanguage={this.state.firstLanguage}></HomePage>}></Route>
              </Switch>
            </div>
        )
    }
}

export default MainPage;