import React, {memo} from "react";


const TabContainer = memo(({ isActice = {} }) => {

    return (
        <Box sx={{ width: '100%', height: isActice ? '25%' : 'auto', display: 'flex', flexDirection: 'column',  pointerEvents: 'auto'}}>
            {children}
        </Box>
    );

});

export default TabContainer;