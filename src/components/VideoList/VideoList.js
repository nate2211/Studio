import React, {Component, useEffect, useState, useMemo, useCallback} from 'react'
import {withFirebase} from "../Firebase";
import Card from "react-bootstrap/cjs/Card";
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Container from "react-bootstrap/cjs/Container";
import {compose} from "recompose"
import {withAuthentication} from "../Session"
import {useCountRenders} from "../../hooks/useCountRenders";
import {useSortVideos} from "../../hooks/useSortVideos";

function VideoList(props) {
    const [loading, setLoading] = useState(true)
    const [videoList, setVideoList] = useState(null)
    useCountRenders('VideoList')
    const videos = useSortVideos(props.firebase, undefined)



    if(loading === true){
        try {
            props.videos.then((data) => {
                setVideoList(data)
            }).then(() => setLoading(false))
        }catch(error){
            videos.then((data) => {
                setVideoList(data)
            }).then(()=> setLoading(false))
        }


        return(<span>Loading</span>)
    }
    else {
        return (
            <Container>
                <h1>Videos</h1>
                {Object.keys(videoList).map(Key=> (
                    <VideoCard key={Key} route={Key} video={videoList[Key]} style={{width: '80%', height: props.height}}/>
                ))}
            </Container>
        )
    }



}

const VideoCard = ({route, video}) => {
    return(
    <Container>
        <Card className='shadow-sm p-3 mb-5 bg-white rounded'>
            <Card.Title variant='top'>{video.title}</Card.Title>
            <Link to={`${ROUTES.VIDEOS}/${route}`}><video width='80%' height='100%' src={video.url} disablePictureInPicture /></Link>

        </Card>
    </Container>
    )

}

export default compose(
    withAuthentication,
    withFirebase)(VideoList)
