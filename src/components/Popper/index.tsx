import AssignmentIcon from '@mui/icons-material/Assignment';
import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { Badge, IconButton } from '@mui/material';

export default function SimplePopper() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div >
            <IconButton aria-label="cart" onClick={handleClick}>
                <Badge badgeContent={4} color="secondary">
                    <AssignmentIcon color="action" />
                </Badge>
            </IconButton>
            <Popper id={id} open={open} anchorEl={anchorEl} style={{overflow:'hidden'}}>
                <Box sx={{border: 1, p: 1, bgcolor: 'background.paper', width:'200px', height:'200px', overflowY:'scroll'}}>
                    The content of the Popperfxgddddddd dfgggggggggggggggggggggggggggg
                    dsfdsfds fdgdgdgdgdgdgdgdgdgdgdgdgdgdgdgdg
                    DFSSDFSDFDS
                    DSFDSFSDFDSDFS 
                    DSFDS
                </Box>
            </Popper>
        </div>
    );
}