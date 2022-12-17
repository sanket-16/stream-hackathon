import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

const initialState = {
	fullName: '',
	username: '',
	password: '',
	confirmPassword: '',
	avatarURL: '',
};
function Auth() {
	const [form, setForm] = useState(initialState);
	const [isSignup, setisSignup] = useState(true);
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		// console.log(form);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(form);
		const {  username, password, phoneNumber, avatarURL } = form;

		// const URL = `${import.meta.env.VITE_PROXY}/auth`
		const URL = 'http://localhost:8080/auth';
		const {
			data: { token, userId, hashedPassword , fullName },
		} = await axios.post(`${URL}/${isSignup ? 'signup' : 'signin'}`, {
			fullName: form.fullName,
			username,
			password,
			phoneNumber,
			avatarURL,
		});
		cookies.set('token', token);
		cookies.set('username', username);
		cookies.set('fullName', fullName);
		cookies.set('userId', userId);

		if (isSignup) {
			cookies.set('phoneNumber', phoneNumber);
			cookies.set('avatarURL', avatarURL);
			cookies.set('hashedPassword', hashedPassword);
		}

		window.location.reload();
	};
	const switchMode = () => {
		setisSignup((prevIsSignup) => !prevIsSignup);
	};

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h1>{isSignup ? 'Sign Up' : 'Sign In'}</h1>

			<form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
				{isSignup && (
					<div className='flex flex-col'>
						<label htmlFor='fullName'>Full Name</label>
						<input
							name='fullName'
							type='text'
							placeholder='Full Name'
							onChange={handleChange}
							required
						/>
					</div>
				)}

				<div  className='flex flex-col'>
					<label htmlFor='username'>Username</label>
					<input
						name='username'
						type='text'
						placeholder='Username'
						onChange={handleChange}
						required
					/>
				</div>

				{isSignup && (
					<div  className='flex flex-col'>
						<label htmlFor='phoneNumber'>Phone Number </label>
						<input
							name='phoneNumber'
							type='text'
							placeholder='Phone Number'
							onChange={handleChange}
							required
						/>
					</div>
				)}

				{isSignup && (
					<div  className='flex flex-col'>
						<label htmlFor='avatarURL'>Avatar URL</label>
						<input
							name='avatarURL'
							type='text'
							placeholder='Avatar URL'
							onChange={handleChange}
							required
						/>
					</div>
				)}

				<div  className='flex flex-col'>
					<label htmlFor='password'>Password</label>
					<input
						name='password'
						type='password'
						placeholder='Password'
						onChange={handleChange}
						required
					/>
				</div>

				{isSignup && (
					<div  className='flex flex-col'>
						<label htmlFor='confirmPassword'>
							Confirn Password
						</label>
						<input
							name='confirmPassword'
							type='password'
							placeholder='Confirm Password'
							onChange={handleChange}
							required
						/>
					</div>
				)}
				<div>
					<button> {isSignup ? 'Sign Up' : 'Sign In'}</button>
				</div>
			</form>

			<div>
				<p>
					{isSignup
						? 'Already have a account?'
						: "Don't have an account?"}
					<span onClick={switchMode}>
						{isSignup ? 'Sign In' : 'Sign Up'}
					</span>
				</p>
			</div>
		</div>
	);
}

export default Auth;
