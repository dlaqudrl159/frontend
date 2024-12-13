import React, { memo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";


const SearchIcon = memo(() => {

    return (
        <div style={styles.searchIcon}>
            <FontAwesomeIcon icon={faSearch} size="lg" />
        </div>
    )
})

const styles = {
    searchIcon: {
        height: "80%",
        textAlign: "center",
        lineHeight: '35px',
        marginRight: "5px",
    }
}

export default SearchIcon;