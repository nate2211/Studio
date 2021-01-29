import React, {Component} from 'react'
import Container from 'react-bootstrap/cjs/Container'
import Card from 'react-bootstrap/cjs/Card'
import {withFirebase} from "../Firebase"




class CommentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: []
        }
    }
    componentDidMount() {
        this.props.firebase.database.ref(`videos/${this.props.id}/comments`).on('value', (snapshot) => {
            this.setState({comments: snapshot.val()})

        })
    }
    render() {
        return (
            <Container>
                <h1>Comments</h1>
                {this.state.comments? <CommentBox comments={this.state.comments}/>:<span>None</span>}
            </Container>
        )
    }
}

const CommentBox = ({comments}) => {
    const commentsList = Object.keys(comments).map(key => ({
        ...comments[key],
        uid: key,
    }));
    return(
    <Container>
        {commentsList.map(comment => (
            <Card key={comment.uid}>
                <Card.Title>{comment.Name}</Card.Title>
                <Card.Body>
                    {comment.comment}
                </Card.Body>
            </Card>
        ))}
    </Container>
    )
}

export default withFirebase(CommentList)
