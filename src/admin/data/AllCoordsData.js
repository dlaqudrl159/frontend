import React , {memo} from "react";
import axios from "axios";

const AllCoordsData = memo(() => {

    const insertAllCoordsData = () => {
        console.log('insertAllCoordsData 실행')
    }

    return (
        <>
        
        <button style={styles.button} onClick={insertAllCoordsData}>시작</button>

        </>
    )

})

const styles = {
    button: {
        padding: '12px',
        backgroundColor: '#ccc',
        color: 'black',
        border: '1px solid #ccc',
        width: "30%",
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
}

export default AllCoordsData;