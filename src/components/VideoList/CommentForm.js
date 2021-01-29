import React, {useState} from 'react'
import Button from 'react-bootstrap/cjs/Button'
import Form from 'react-bootstrap/cjs/Form'
import {withFirebase} from "../Firebase"



function CommentFormBase(props) {
    const [Name, setName] = useState('')
    const [comment, setComment] = useState('')
    const onUpload = (comment, Name) => {
        props.firebase.video(`${props.id}/comments/${Date.now()}`).set({
            Name: Name,
            comment: comment
        })

    }

    return(
        <Form onSubmit={(event)=> onUpload(comment, Name, event)}>
            <Form.Group controlId="formTitle">
                <Form.Control type="text" placeholder="Name" onChange={(event) => setName(event.target.value)} />
            </Form.Group>

            <Form.Group controlId="formComment">
                <Form.Control type="text" placeholder="Comment" onChange={(event) => setComment(event.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" >
                Post
            </Button>

        </Form>
    )
}



export default withFirebase(CommentFormBase)
