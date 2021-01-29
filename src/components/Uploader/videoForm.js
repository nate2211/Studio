import React, {useRef, useState} from 'react'
import Button from 'react-bootstrap/cjs/Button'
import Form from 'react-bootstrap/cjs/Form'




function VideoFormBase(props) {

    const title = useRef();
    const artist = useRef();
    const [video, setVideo] = useState();
    const [progress, setProgress] = useState(0);
    const [task , setTask] = useState(true);
    const [upload , setUpload] = useState(false);

    const onUpload = (video ,title, event, artist) => {
        event.preventDefault()
        let storageRef = props.firebase.storage.ref('videos/')
        let videoRef = storageRef.child(title.current.value)
        let uploadTask = videoRef.put(video)
        uploadTask.on('state_changed',
            (snapshot) => {
                setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                // eslint-disable-next-line default-case
                switch (snapshot.state) {
                    case 'pause':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;

                }
            },
            (error) => {
                // eslint-disable-next-line default-case
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }

            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    onSet(title.current.value,artist.current.value, downloadURL, props.authUser.uid);
                });

            }
        );
    }
    const onSet = (title,artist,  url, authUser) => {
        props.firebase.database.ref(`videos/${Date.now()}`).set({
            title: title,
            artist: artist,
            url: url,
            uid: authUser,
            views: 0
        })
    }
    return(
        <Form onSubmit={(event)=> onUpload(video, title, event, artist)}>
            <Form.Group controlId="formTitle">
                <Form.Control type="text" placeholder="Title" ref={title} required/>
            </Form.Group>
            <Form.Group controlId="formArtist">
                <Form.Control type="text" placeholder="Artist" ref={artist} required/>
            </Form.Group>
            <Form.Group controlId="formUsename">
                <Form.Label>Posting As: </Form.Label>
                <Form.Control type="text"  disabled={true} value={props.authUser.Username}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.File
                               label={video? video.name: 'Video'}
                               data-browse="Upload"
                               custom
                               accept="video/*"
                               onChange={(event) => setVideo(event.target.files[0])} required/>
            </Form.Group>
            <Button variant="primary" type="submit" >
                Upload
            </Button>
            <progress value={progress} max='100'/>

        </Form>
    )
}



export default VideoFormBase
