import { useState, 
        //  useContext 
        } from "react";

import { signInWithGooglePopup, 
        //  createUserDocumentFromAuth,
         signInAuthUserWithEmaiAndPassword
        } from '../../services/firebase/firebase.services';
import FormInput from '../form-input/form-input.component';
import Button from "../button/button.component";
import './sign-in-form.styles.scss';
// import { UserContext } from "../../contexts/user.contexts";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    };

    // const { setCurrentUser } = useContext(UserContext);

    const signInWithGoogle = async () => {
        await signInWithGooglePopup()
        // const { user } = await signInWithGooglePopup();
        // // setCurrentUser(user);
        // await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        try{
            // eslint-disable-next-line
            const { user } = await signInAuthUserWithEmaiAndPassword(email, password);
            // setCurrentUser(user);

            resetFormFields();
        } catch(error){
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }}
        };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label="Email"
                    type="email" 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                    required
                />

                <FormInput 
                    label="Password"
                    type="password" 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                    required
                />

                <div className="buttons-container">
                    <Button type="submit">SIGN IN</Button>
                    <Button type='button' buttonType={'google'} onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
};

export default SignInForm;