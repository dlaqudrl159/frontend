import React, { memo } from "react";
import axios from "axios";


const AllAptData = memo(() => {

    const insertAllAptData = async (e) => {

        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/data/allautoaptdatainsert', {}, {
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

            <button style={styles.button} onClick={insertAllAptData}>시작</button>

        </>
    );

});

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

export default AllAptData;