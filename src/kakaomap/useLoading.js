import { useState, useCallback} from "react";

export const useLoading = () => {

    const [IsLoadingState, setIsLoadingState] = useState(false);
    const IsLoadingShow = useCallback(() => setIsLoadingState(true), [])
    const IsLoadingClose = useCallback(() => setIsLoadingState(false), [])

    return (
        { IsLoadingState, IsLoadingShow, IsLoadingClose }
    )

}
