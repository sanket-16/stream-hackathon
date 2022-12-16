import React, { useState } from 'react';
import axios from 'axios';

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    avatarURL: '',
}
function Auth() {
    const [form, setForm] = useState(initialState);
    const [isSignup, setisSignup] = useState(true);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // console.log(form);

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    }
    const switchMode = () => {
        setisSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div>
            <div>
                <div>
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>

                    <form onSubmit={handleSubmit} action="">
                        {isSignup && (
                            <div>
                                <label htmlFor='fullName'>Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder='Full Name'
                                    onChange={handleChange}
                                    required />
                            </div>
                        )}

                        <div>
                            <label htmlFor='username'>Username</label>
                            <input
                                name="username"
                                type="text"
                                placeholder='Username'
                                onChange={handleChange}
                                required />
                        </div>

                        {isSignup && (
                            <div>
                                <label htmlFor='phoneNumber'>Phone Number </label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder='Phone NUmber'
                                    onChange={handleChange}
                                    required />
                            </div>
                        )}

                        {isSignup && (
                            <div>
                                <label htmlFor='avatarURL'>Avatar URL</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder='Avatar URL'
                                    onChange={handleChange}
                                    required />
                            </div>
                        )}

                        <div>
                            <label htmlFor='password'>Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder='Password'
                                onChange={handleChange}
                                required />
                        </div>

                        {isSignup && (
                            <div>
                                <label htmlFor='confirmPassword'>Confirn Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder='Confirm Password'
                                    onChange={handleChange}
                                    required />
                            </div>
                        )}
                        <div>
                            <button> {isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>

                    <div>
                        <p>
                            {isSignup ? "Already have a account?" : "Don't have an account?"}
                            <span onClick={switchMode}>
                                {isSignup ? "Sign In" : "Sign Up"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Auth
