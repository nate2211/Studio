import React, {useRef, useState} from 'react'
export const useSortVideos = (firebase, uid) => {
    const [userVideos, setUserVideos] = useState(null)
    if(uid === undefined) {
        return firebase.sortVideos()
    }
    else{
        return firebase.sortUserVideos(uid)

    }

}
