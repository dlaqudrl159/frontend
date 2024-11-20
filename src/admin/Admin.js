import React, { useState, memo } from "react";
import Login from "./Login";
import DashBoard from "./DashBoard";

const Admin = memo(() => {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') === null ? false : true);

    return (
        <div style={styles.adminContainer}>
            {isLoggedIn ?
                (
                    <DashBoard setIsLoggedIn={setIsLoggedIn} />
                 )
                :
                (
                    <Login setIsLoggedIn={setIsLoggedIn} />
                )
            }
        </div>
    );

})

const styles = {
    adminContainer: {
        height: '100%'
    }
}

export default Admin;