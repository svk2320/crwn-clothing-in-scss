// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';

// import { signInWithGooglePopup, 
//          createUserDocumentFromAuth,
        //  signInWithGoogleRedirect,
        //  auth
        //  } from '../../../services/firebase/firebase.services';

import SignUpForm from '../../sign-up-form/sign-up-form.component';
import SignInForm from '../../sign-in-form/sign-in-form.component';
import './authentication.styles.scss';

const Authentication = () => {
    // useEffect(() => {
    //     (async () => {
    //         const response = await getRedirectResult(auth);

    //         if (response) {
    //             const UserDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //         console.log(response);
    //     })();
    // }, []);

    // eslint-disable-next-line
    // const logGoogleUser = async () => {
    //     const { user } = await signInWithGooglePopup();
    //     const userDocRef =  await createUserDocumentFromAuth(user);
    // }

    return(
        <div className='authentication-container'>
            {/* <button onClick={ logGoogleUser }> */}
                {/* Sign in with GooglePopup */}
            {/* </button> */}
            {/* <button onClick={ signInWithGoogleRedirect }>
                Sign in with Google Redirect
            </button> */}
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;