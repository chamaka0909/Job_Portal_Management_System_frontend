import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from "react-router-dom";

import styles from "./styles.module.css";
import NavBar from './NavBar';


export default class UserLogin extends Component {
    componentDidMount() {
        localStorage.removeItem('userToken');
        document.title = "User Login"
    }

    constructor() {
        super();

        this.state = {
            name: '',
            password: ''
        }

        //to handle the state changes
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            name: this.state.name,
            password: this.state.password
        }

        // validations----------------------------------------------------
        let validated = true;
        if (user.name === '') {
            validated = false;
            swal({
                title: "",
                text: "Please enter your user name",
                icon: "warning",
            });
        }
        else if (user.password === '') {
            validated = false;
            swal({
                title: "",
                text: "Please enter your password",
                icon: "warning",
            });
        }

        if (validated) {
            axios.post('http://localhost:5000/user/login', {
                name: user.name,
                password: user.password
            }).then(res => {
                swal("Login successful!", "", "success")
                    .then((value) => {
                        if (value) {
                            localStorage.setItem('userToken', res.data)
                           
                            window.location = '/'
                        }

                    });
            }).catch(err => {
                console.log(err);
                swal({
                    title: "",
                    text: "Please check your username and password",
                    icon: "warning",
                });
            })
        }
    }


    render() {
        return (
          
<div>
    <NavBar/>



            <div className={styles.login_container}>
                <div className='mt-4'>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} >
						<h3><strong>Sign-In</strong></h3>
						

                          <div
                            className="form-group"
                            style={{ marginBottom: "15px",marginTop: "15px" }}
                          >
                        
                        <input
							type="name"
							placeholder="Username"
							name="name"
							onChange={this.onChange}
							value={this.state.name}
							required
                            className="form-control"
						/>
                          </div>

                          <div
                            className="form-group"
                            style={{ marginBottom: "15px" }}
                          >

						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={this.onChange}
							value={this.state.password}
							required
                            className="form-control"
						/>

                        </div>
						
						<button type="submit" onClick={this.onSubmit} className={styles.green_btn}>
							Submit
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h5>Are you new here ?</h5>
                    <Link to="/user/registration">
						<button type="button" className={styles.white_btn}>
							 Sign Up
						</button>
					</Link>
				</div>
			</div>
            </div>
		</div>
        </div>
        
        )
    }
}
