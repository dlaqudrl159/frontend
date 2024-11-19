import React, { memo, useState, useCallback} from "react";

const useLoading = () => {

    const [IsLoadingState, setIsLoadingState] = useState(true);
    const IsLoadingShow = useCallback(() => setIsLoadingState(true), [])
    const IsLoadingClose = useCallback(() => setIsLoadingState(false), [])

    return (
        { IsLoadingState, IsLoadingShow, IsLoadingClose }
    )

}

export default useLoading;