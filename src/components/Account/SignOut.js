import React from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
export default function SignOutButton({ firebase }){
    const history = useHistory();
    const onClick = () => {
        firebase.doSignOut()
        history.push('/signin')
    }
    return(
    <Button variant="link" type="button"  className='btn btn-outline-dark'
            onClick={() => onClick()}>
        Sign Out
    </Button>
    )
};
