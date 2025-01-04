import { Box, Checkbox, Grid, IconButton, Modal, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Tabs, Tooltip, Typography } from '@mui/material';
import './styles.scss'
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import PurchaseTraceListSample from './Purchase-TraceListSample';
import MaterialTraceSample from './Material-MaterialTraceSample';

interface SampleSearchERPProps {
    open: any
    onClose: any
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const SampleSearchERP = (props: SampleSearchERPProps) => {
    const nav = useNavigate()
    const { open, onClose } = props

    //#region Style
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        bgcolor: '#1c2538',
        boxShadow: 24,
    };
    //#endregion

    const [value, setValue] = useState(0);
    const [title, setTitle] = useState("Purchase - TraceListSample");

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        if (newValue === 0) {
            setTitle("Purchase - TraceListSample")
        }
        else {
            setTitle("WareHouse - MaterialTraceSample")
        }
    };

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
                style={{ height: "100%" }}


            >
                {value === index && <Stack height={"100%"}>{children}</Stack>}
            </div>
        );
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack height={'100%'} rowGap={1} padding={0}>
                    <Stack direction={'row'} alignItems={'center'} height={"10%"}>
                        <Box sx={{ flex: 1, justifyContent: 'flex-start' }}>
                            <IconButton className={'back-button'} onClick={onClose}>
                                <BiArrowBack className=" icon-wrapper" />
                            </IconButton>
                        </Box>
                        <Typography className="titleNavbarSample" sx={{ flex: 3, whiteSpace: 'pre', textAlign: 'center' }}>{title}</Typography>
                        <Box sx={{ flex: 1, justifyContent: 'flex-end', display: 'flex' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} >
                                    <Tab label="Purchase" sx={{ fontSize: '10px' }} {...a11yProps(0)} />
                                    <Tab label="Material" sx={{ fontSize: '10px' }} {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                        </Box>
                    </Stack>
                    <Stack height={"90%"} overflow={"hidden"}>
                        <CustomTabPanel value={value} index={0} >
                            <PurchaseTraceListSample />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <MaterialTraceSample />
                        </CustomTabPanel>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    )
}


//#region MyTableSampleMergeCell
interface MyTableSampleMergeCellProps {
    columnsMerge: any[],
    columns: any[],
    columnShow: any[],
    data: any[],
    handleRowClick?: any,
    lastRowData?: any[],
    lastRow?: boolean
}

export const MyTableSampleMergeCell = (props: MyTableSampleMergeCellProps) => {
    const { columnsMerge, columns, columnShow, data, handleRowClick, lastRowData, lastRow = false } = props
    const [selectedID, setSelectedID] = useState("");

    const handleRowClickTable = (item: any) => {
        handleRowClick?.(item);
        setSelectedID(item.id);
    };

    // Tách riêng dòng cuối

    return (
        <Stack
            className='table-sample-container'
            sx={{
                height: "100%",
                position: "relative",

            }}
        >
            <Stack
                sx={{
                    height: "100%",
                    position: "relative",
                    overflowY: 'auto',
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >

                <Table
                    size={"small"}
                    sx={{
                        width: '100%',
                        tableLayout: 'fixed',

                    }}
                    stickyHeader
                    className="table-sample"
                >
                    <colgroup>
                        {columnShow.map((item: any, index: number) => (
                            <col key={index} style={{ width: item.width }} />
                        ))}
                    </colgroup>
                    <TableHead>
                        <TableRow>
                            {columnsMerge.map((item: any, index: number) => {
                                if (item.sticky === true) {
                                    return (
                                        <TableCell
                                            className="td-responesive-sample"
                                            key={index}
                                            colSpan={item.colSpan === true ? item.colSpanNumber : 1}
                                            rowSpan={item.rowSpan === true ? item.rowSpanNumber : 1}
                                            sx={{
                                                color: "orange",
                                                padding: "0px 0px !important",
                                                background: "#1E201E",
                                                lineHeight: 1.5,
                                                border: "1px solid rgba($color: white, $alpha: 0.5) !important",
                                                position: " sticky",
                                                zIndex: 999,
                                                left: item.stickyPosition,
                                                backgroundColor: "#1E201E",
                                                top: 0

                                            }}
                                        >
                                            {item.headerName}
                                        </TableCell>
                                    )
                                }
                                else {
                                    return (
                                        <TableCell
                                            className="td-responesive-sample"
                                            key={index}
                                            colSpan={item.colSpan === true ? item.colSpanNumber : 1}
                                            rowSpan={item.rowSpan === true ? item.rowSpanNumber : 1}
                                            sx={{
                                                color: "orange",
                                                padding: "0px 0px !important",
                                                background: "#1E201E",
                                                lineHeight: 1.5,
                                                border: "1px solid rgba($color: white, $alpha: 0.5) !important"

                                            }}
                                        >
                                            {item.headerName}
                                        </TableCell>
                                    )
                                }
                            }
                            )}
                        </TableRow>
                        <TableRow>
                            {columns.map((item: any, index: number) => {
                                if (item.sticky === true) {
                                    return (
                                        <TableCell
                                            className="td-responesive-sample"
                                            key={index}
                                            colSpan={item.colSpan === true ? item.colSpanNumber : 1}
                                            rowSpan={item.rowSpan === true ? item.rowSpanNumber : 1}
                                            sx={{
                                                color: "orange",
                                                padding: "0px 0px !important",
                                                background: "#1E201E",
                                                lineHeight: 1.5,
                                                border: "1px solid rgba($color: white, $alpha: 0.5) !important",
                                                position: " sticky",
                                                zIndex: 999,
                                                left: item.stickyPosition,
                                                backgroundColor: "#1E201E",
                                                top: 0
                                            }}
                                        >
                                            {item.headerName}
                                        </TableCell>
                                    )
                                }
                                else {
                                    return (
                                        <TableCell
                                            className="td-responesive-sample"
                                            key={index}
                                            colSpan={item.colSpan === true ? item.colSpanNumber : 1}
                                            rowSpan={item.rowSpan === true ? item.rowSpanNumber : 1}
                                            sx={{
                                                color: "orange",
                                                padding: "0px 0px !important",
                                                background: "#1E201E",
                                                lineHeight: 1.5,
                                                border: "1px solid rgba($color: white, $alpha: 0.5) !important"

                                            }}
                                        >
                                            {item.headerName}
                                        </TableCell>
                                    )
                                }
                            }
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody
                        sx={{
                            overflow: "scroll",
                            "& td": {
                                whiteSpace: "pre",
                            },
                        }}
                    >
                        {data.map((item: any, index: number) => (
                            <TableRow
                                key={index}
                                sx={{
                                    backgroundColor:
                                        item.id === selectedID ? "#415a77" : "inherit",
                                    padding: "0px !important",
                                }}
                                onClick={() => handleRowClickTable(item)}
                            >
                                {columnShow.map((column: any, i: number) => {
                                    const key = column.field;
                                    if (column.sticky === true) {
                                        return (
                                            <TableCell
                                                key={i}
                                                className="td-responesive-sample"
                                                sx={{
                                                    padding: "0 0px !important",
                                                    textAlign: 'center',
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    width: column.width, // Thêm width từ column,
                                                    position: "sticky",
                                                    left: column.stickyPosition,
                                                    backgroundColor: item.id === selectedID ? "#415a77" : "#1c2538",

                                                }}
                                                title={item[key]}
                                            >

                                                {column?.checkbox === true ? (
                                                    <Checkbox
                                                        checked={!!item[key]}
                                                        size="small"
                                                        sx={{ padding: 0 }}
                                                    />
                                                ) : (
                                                    <span>{item[key]}</span>
                                                )}
                                            </TableCell>
                                        );
                                    }
                                    else {
                                        return (
                                            <TableCell
                                                key={i}
                                                className="td-responesive-sample"
                                                sx={{
                                                    padding: "0 0px !important",
                                                    textAlign: 'center',
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    width: column.width // Thêm width từ column,

                                                }}
                                                title={item[key]}
                                            >

                                                {column?.checkbox === true ? (
                                                    <Checkbox
                                                        checked={!!item[key]}
                                                        size="small"
                                                        sx={{ padding: 0 }}
                                                    />
                                                ) : (
                                                    <span>{item[key]}</span>
                                                )}
                                            </TableCell>
                                        );
                                    }
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* Hàng cuối luôn được hiển thị ở dưới cùng */}
                {lastRow && (

                    <Table
                        size={"small"}
                        sx={{
                            width: '100%',
                            tableLayout: 'fixed',
                            position: 'sticky', // Sticky position
                            bottom: 0, // Luôn bám ở dưới cùng
                            zIndex: 2, // Đảm bảo không bị header hay body che khuất
                            background: "#1c2538", // Màu nền cố định
                            borderCollapse: "separate"
                        }}
                    >

                        <TableBody>

                            {lastRowData && lastRowData.map((item: any, index: number) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        backgroundColor: "#1c2538",
                                        cursor: "pointer",
                                        padding: "0px !important",
                                    }}
                                >
                                    {columnShow.map((column: any, i: number) => {
                                        const key = column.field;
                                        if (column.sticky === true) {
                                            return (
                                                <TableCell
                                                    key={i}
                                                    className="td-responesive-sample"
                                                    sx={{
                                                        padding: "0 0px !important",
                                                        textAlign: 'center',
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        width: column.width, // Thêm width từ column
                                                        position: "sticky",
                                                        left: column.stickyPosition,
                                                        backgroundColor: "#1c2538",
                                                    }}
                                                >

                                                    <span>{item[key]}</span>

                                                </TableCell>
                                            );
                                        }
                                        else {
                                            return (
                                                <TableCell
                                                    key={i}
                                                    className="td-responesive-sample"
                                                    sx={{
                                                        padding: "0 0px !important",
                                                        textAlign: 'center',
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        width: column.width // Thêm width từ column
                                                    }}
                                                >

                                                    <span>{item[key]}</span>

                                                </TableCell>
                                            );
                                        }

                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Stack>
        </Stack>
    )
}
//#endregion


export default SampleSearchERP