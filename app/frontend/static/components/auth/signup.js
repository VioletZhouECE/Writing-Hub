import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";

class Signup extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username : "",
            password : ""
        }

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(e){
        this.setState({username : e.target.value});
    }

    handleChangePassword(e){
        this.setState({password : e.target.value});
    }

    //client side validation
    handleSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        
        // Fetch form to apply custom Bootstrap validation
        var form = $('#form-validation');

        if (form[0].checkValidity() === false) {
            form.addClass('was-validated');
            return;
        }

        this.props.handleSumbitForm(this.state);
    }

    render(){
        return (
        <div className='login-background'>
            <div className='login-container container-border pt-4'>
                <div className='container-center'>
                    <div className='text-center'>
                        <h2>Signup</h2>
                    </div>
                    <form id="form-validation" onSubmit={e=>this.handleSubmit(e)} noValidate>
                        <div className="form-group py-4">
                            <label for="username">Username:</label>
                            <input id="username" className="form-control" value={this.state.username} onChange={e=>this.handleChangeUsername(e)} required minLength="2" maxLength="10"></input>
                            <div class="invalid-feedback">
                                A valid username (2-10 characters long) is required
                            </div>
                        </div>
                        <div class="form-group pb-4">
                            <label for="userpassword">Password:</label>
                            <input type="password" className="form-control" value={this.state.password} onChange={e=>this.handleChangePassword(e)} required minLength="6" maxLength="12"></input>
                            <div class="invalid-feedback">
                                A valid password (6-12 characters long) is required
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary">Sign me up!</button>
                        </div>
                    </form>
                        <div className="d-flex justify-content-center pt-4">
                            <p className="pr-2">Do not have an account?</p>
                            <Link to="/">Login</Link>
                        </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Signup;