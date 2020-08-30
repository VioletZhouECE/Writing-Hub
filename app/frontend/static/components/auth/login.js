import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";

class Login extends React.Component{
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

    //client side validation using bootstrap form validation
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
                        <h2>Login</h2>
                    </div>
                    <form id="form-validation" onSubmit={e=>this.handleSubmit(e)} noValidate>
                        <div className="form-group py-4">
                            <label for="username">Username:</label>
                            <input id="username" className="form-control" value={this.state.username} onChange={e=>this.handleChangeUsername(e)} required></input>
                            <div class="invalid-feedback">
                                A username is required
                            </div>
                        </div>
                        <div class="form-group pb-4">
                            <label for="userpassword">Password:</label>
                            <input type="password" className="form-control" value={this.state.password} onChange={e=>this.handleChangePassword(e)} required></input>
                            <div class="invalid-feedback">
                                A password is required
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary">Log me in!</button>
                        </div>
                    </form>
                        <div className="d-flex justify-content-center pt-4">
                            <p className="pr-2">Do not have an account?</p>
                            <Link to="/signup">Sign up</Link>
                        </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Login;