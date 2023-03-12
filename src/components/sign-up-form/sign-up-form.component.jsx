import { useState, 
        //  useContext 
        } from 'react';

import { createAuthUserWithEmaiAndPassword, createUserDocumentFromAuth } from '../../services/firebase/firebase.services';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
// import { UserContext } from '../../contexts/user.contexts';

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    // const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        if (!(confirmPassword.length > 6) || password !== confirmPassword)  {
            alert('Password do not match');
            return;
        };

        try{
            const { user } = await createAuthUserWithEmaiAndPassword(email, password);
            
            await createUserDocumentFromAuth(user, { displayName });
            // setCurrentUser(user);

            resetFormFields();
        } catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user and email already in use');
            } else{
                console.log(`User creation encoutered an error ${error}`);
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label='Display Name'
                    type='text' 
                    onChange={handleChange} 
                    name='displayName' 
                    value={displayName} 
                    required
                />

                <FormInput 
                    label='Email'
                    type='email' 
                    onChange={handleChange} 
                    name='email' 
                    value={email} 
                    required
                />

                <FormInput 
                    label='Password'
                    type='password' 
                    onChange={handleChange} 
                    name='password' 
                    value={password} 
                    required
                />

                <FormInput 
                    label='Confirm Password'  
                    type='password' 
                    onChange={handleChange} 
                    name='confirmPassword' 
                    value={confirmPassword} 
                    required
                />

                <Button type='submit'>SIGN UP</Button>
            </form>
        </div>
    )
};

export default SignUpForm;