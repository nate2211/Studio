import React, {useRef} from 'react'
export const useCountRenders = (c) => {
    const renders = useRef(0)
    console.log("renders:", renders.current++, "from: ", c)
}
