import React , {memo} from "react";
import axios from "axios";

const AllCoordsData = memo(() => {

    const insertAllCoordsData = async(e) => {

        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/data/autoallCoordsdatainsert',{},{
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            console.log(response);
        } catch (error) {
            console.log(error.response);
        }
        
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