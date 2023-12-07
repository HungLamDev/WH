import AssignmentIcon from '@mui/icons-material/Assignment';
import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { Badge, Divider, IconButton, Typography } from '@mui/material';

export default function SimplePopper({ data }: { data: any }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    const dataArray = data.RY.split(/\r?\n/);
    return (
        <div >
            <IconButton aria-label="cart" onClick={handleClick}>
                <Badge badgeContent={dataArray.length} color="secondary">
                    <AssignmentIcon color="action" />
                </Badge>
            </IconButton>
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                style={{
                    overflow: 'hidden'
                }}
            >
                <Box sx={{
                    borderRadius:'7px',
                    border: 1,
                    p: 1,
                    bgcolor: '#1c2538',
                    maxWidth: '350px',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    wordWrap: 'break-word',
                    '&.MuiBox-root':{
                        marginTop:'10px !important'
                    },
                    textOverflow:'ellipsis'
                }}
                >
                    {dataArray.map((item: any, index: any) => (
                        <>
                            <Typography className="textsize" whiteSpace={'pre'} >
                                {item}
                            </Typography>
                            <Divider />
                        </>
                    ))}
                </Box>
            </Popper>
        </div>
    );
}