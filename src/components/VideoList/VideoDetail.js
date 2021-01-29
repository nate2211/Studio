import React, {Component, useEffect, useState} from 'react'
import {withFirebase} from "../Firebase";
import Card from "react-bootstrap/cjs/Card";
import CommentFormBase from "./CommentForm";
import CommentList from "./CommentList";

class VideoDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            toggleCommentForm: false
        }
    }
    componentDidMount() {

        this.props.firebase.video(this.props.match.params.id).on('value', snapshot => {
            const packsObject = snapshot.val();
            this.setState({video: packsObject})
            this.setState({loading: false})
        })

    }



    componentWillUnmount() {
        this.props.firebase.video(this.props.match.params.id).off()



    }

    render() {
        const {loading, video, toggleCommentForm} = this.state
        return(
            <div>
                <h1>Detail</h1>
                {loading?<span>Loading</span>:<VideoCard video={video} />}
                <CommentFormBase id={this.props.match.params.id}/>
                <CommentList id={this.props.match.params.id}/>


            </div>
        )

    }


}
const VideoCard = ({video}) => {

    return(
        <div>
            <Card className='shadow-sm p-3 mb-5 bg-white rounded'>
                <Card.Title variant='top'>{video.title}</Card.Title>
                <video controls src={video.url}/>
            </Card>
        </div>
    )

}

export default withFirebase(VideoDetail)
