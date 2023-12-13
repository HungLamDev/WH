import React, { ReactNode } from 'react';

import QRCode from 'qrcode.react';
import './style.scss';
import { GridRowsProp } from '@mui/x-data-grid';
import { Box, Modal, Stack } from "@mui/material";
import moment from 'moment';

const Formprint = (props: {
    rows: GridRowsProp ; open: any; onClose: any
}
) => {
    const { rows,open,onClose } = props;
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '90%',
        bgcolor: '#1c2538',
        border: '2px solid white',
        borderRadius: 3,
        boxShadow: 24,  
        overflowY: 'scroll',
        overflowX: "hidden"
    };
    console.log(rows)
    return (
        <>
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            {
                rows.map((item: any, index: number) => {
                    return (
                        <section key={index} className="section">
                            <table style={{ width: '50%', border: '3px solid black', tableLayout: 'fixed' }} className="table">
                                <tbody>
                                    <tr>
                                        <td rowSpan={11} className="tdtitle bold text-center" style={{ width: '5%', border: '2px solid black' }}>
                                            <div className="title bold text-center " style={{ marginTop: 'auto', marginBottom: 'auto' }}> T2 information</div>
                                        </td>
                                        <td style={{ width: '42%' }} className="border-right">Supplier Name</td>
                                        <td colSpan={4} style={{ width: '53%' }} className="bold text-center">{item.Supplier}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-right border-bottom">Material Name<span className="text-right bold "></span></td>
                                        <td colSpan={4} className="text-center bold border-bottom" style={{fontSize:'8px'}}>{item.Material_No}&ensp;{item.Material_Name}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-right">Color</td>
                                        <td colSpan={4} className="text-center bold ">{item.Color}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-right">Thickness/Width/Weight/Size</td>
                                        <td colSpan={4} className="text-center bold">{item.Size}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-right">Quantity</td>
                                        <td colSpan={4} className="text-center bold">{item.Print_QTY}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-right">PO No. <span className="text-right bold "></span></td>
                                        <td colSpan={4} className="text-center bold">{item.Order_No}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-right">Roll No/Lot/Batch</td>
                                        <td colSpan={4} className="text-center bold">{item.Roll}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-right">Production Month</td>
                                        <td colSpan={4}className="text-center bold">{item.Production ? item.Production:''}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-right">Expire Date</td>
                                        <td colSpan={4} className="text-center bold">{item.Expired_Date ?item.Expired_Date:''}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-right">T2 TLSP pass</td>
                                        <td colSpan={4}></td>
                                    </tr>
                                    <tr>
                                        <td className="bold border-right">T2 QC signature</td>
                                        <td colSpan={4}></td>
                                    </tr>
                                    <tr style={{ borderTop: '2px solid black' }}>
                                        <td rowSpan={10} className="tdtitle bold " style={{ border: '2px solid black' }}><div className="title bold  text-center " style={{ marginTop: 'auto', marginBottom: 'auto' }}>T1 information</div></td>
                                        <td className="border-right">Date Received</td>
                                        <td colSpan={4} className="bold text-center">{ item.ngay ? item.ngay : moment(item.Print_Date).format("DD/MM/YYYY")}</td>
                                    </tr>
                                    <tr >
                                        <td className="text-center border-right"></td>
                                        <td className="text-center">PASS</td>
                                        <td className="text-center">FAIL</td>
                                        <td className="text-center" colSpan={2}>FIFO</td>
                                    </tr>
                                    <tr>
                                        <td className="border-right">Lab Test Result</td>
                                        <td ></td>
                                        <td ></td>
                                        <td rowSpan={5} colSpan={2} className="text-center ">
                                            <span className='fontchu'>
                                                {
                                                    item.Print_Date.split('/')[1] ? 
                                                    item.Print_Date.split('/')[1].indexOf('0') === 0 ?
                                                    item.Print_Date.split('/')[1].substring(1) :
                                                    item.Print_Date.split('/')[1] :
                                                    moment(item.Print_Date).format("M")
                                                }
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border-right">Visual inspection Result</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className="border-right">Dimensional Result</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className="border-right">Defect & Grading Check</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className="border-right">Packing</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className="bold border-right">T1 QC signature</td>
                                        <td colSpan={4}></td>
                                    </tr>
                                    <tr>
                                        <td className="border-right"></td>
                                        <td colSpan={4} style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>Document Number:QIP/APP/01/00/01</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style={{ width: '50%', tableLayout: 'fixed', marginTop: '0', border: 'none !important' }}>
                                <tbody>
                                    <tr style={{ border: 'none !important' }}>
                                        <td style={{ width: '5%', border: 'none !important' }}></td>
                                        <td style={{ width: '20%', paddingTop: '10px', border: 'none !important' }}>
                                            <QRCode value={item.Barcode} size={70} />
                                            {/* <img src="./qrcode.jpg" height="70px" width="70px" alt="" /> */}
                                        </td>
                                        <td style={{ border: 'none !important', fontSize: '20px' }} className=" bold ">{item.Barcode}</td>
                                    </tr>

                                </tbody>

                            </table>
                        </section>
                    );
                })}
            </Box>
        </Modal>
        </>

    );
};

export default Formprint;