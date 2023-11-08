import React, { ReactNode } from 'react';

import QRCode from 'qrcode.react';
import { GridRowsProp } from '@mui/x-data-grid';
import { Box, Modal, Stack } from "@mui/material";
import moment from 'moment';

const FormPrintSample = (props: {
    rows: GridRowsProp; open: any; onClose: any
}
) => {
    const { rows, open, onClose } = props;
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
    function cutTextFromEndWithLineBreaks(text: any, maxLength: any) {
        if (text.length <= maxLength) {
          return text;
        }
      
        const lastPart = text.substring(text.length - maxLength);
        const firstLineBreakIndex = lastPart.indexOf('\r\n');
      
        if (firstLineBreakIndex !== -1) {
          return lastPart.substring(firstLineBreakIndex + 2);
        }
      
        return lastPart;
      }
      

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
                                    <table style={{ width: '60%', border: '3px solid black', tableLayout: 'fixed' }} className="table">
                                        <tbody>
                                            <tr>
                                                <td rowSpan={18} className="tdtitle bold text-center" style={{ width: '5%', border: '2px solid black' }}>
                                                    <div className="title bold text-center " style={{ marginTop: 'auto', marginBottom: 'auto' }}> T2 information</div>
                                                </td>
                                                <td style={{ width: '42%' }} className="border-right" colSpan={2}>Supplier Name</td>
                                                <td colSpan={4} style={{ width: '53%' }} className="bold text-center">{item.Supplier}</td>
                                            </tr>
                                            <tr>
                                                <td className="border-right" colSpan={2} >Material Name</td>
                                                <td colSpan={4} rowSpan={2} className="text-center bold ">
                                                    <span style={{ fontSize: '8px' }}>{item.Material_Name}</span>
                                                    <br />
                                                    <span style={{ fontSize: '11px' }}>  {item.Color}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-right text-center bold" colSpan={2}>{item.Supplier_No}</td>
                                            </tr>
                                            <tr>
                                                <td className="border-right" colSpan={2}>Thickness/Width/Weight/Size</td>
                                                <td colSpan={4}></td>
                                            </tr>
                                            <tr>
                                                <td className="border-right" colSpan={2}>Stage/Season/WH</td>
                                                <td colSpan={4} className='text-center bold'>{item.Size}</td>
                                            </tr>
                                            <tr>
                                                <td className="border-right" colSpan={2}>Quantity    <span className='text-center bold'>{item.Print_QTY}</span> </td>
                                                <td colSpan={4} className='text-center bold'>{item.Material_No}</td>
                                            </tr>
                                            <tr>
                                                <td className="border-right" >
                                                    Stock
                                                </td>
                                                <td className="border-right" >
                                                    Actual
                                                </td>
                                                <td className="text-center"></td>
                                                <td className="text-center"></td>
                                                <td className="text-center" colSpan={2} rowSpan={5} style={{fontSize:'8px', fontWeight:'700'}}>{ cutTextFromEndWithLineBreaks(item.Work_Order,95+63)}</td>
                                            </tr>
                                            <tr>
                                                <td className="border-right" style={{ height: '20px' }}></td>
                                                <td className="border-right" ></td>
                                                <td className="text-center"></td>
                                                <td className="text-center"></td>
                                                <td className="text-center" colSpan={2} ></td>
                                            </tr>
                                            <tr>
                                                <td className="border-right" style={{ height: '20px' }}></td>
                                                <td className="border-right" ></td>
                                                <td className="text-center"></td>
                                                <td className="text-center"></td>
                                                <td className="text-center" colSpan={2}></td>
                                            </tr>
                                            <tr>
                                                <td className="border-right" style={{ height: '20px' }}></td>
                                                <td className="border-right" ></td>
                                                <td className="text-center"></td>
                                                <td className="text-center"></td>
                                                <td className="text-center" colSpan={2}></td>
                                            </tr>
                                            <tr>
                                                <td className="border-right" style={{ height: '20px' }}></td>
                                                <td className="border-right" ></td>
                                                <td className="text-center"></td>
                                                <td className="text-center"></td>
                                                <td className="text-center" colSpan={2}></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} className="border-right">PO No.</td>
                                                <td colSpan={4} className='text-center bold'>{item.Order_No}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} className="border-right">Roll No/Lot/Batch</td>
                                                <td colSpan={4} className='text-center bold'>{item.Roll}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} className="border-right">Production Month</td>
                                                <td colSpan={4}></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} className="border-right">Expire Date</td>
                                                <td colSpan={4}></td>

                                            </tr>
                                            <tr>
                                                <td colSpan={2} className="border-right">T2 TLSP pass</td>
                                                <td colSpan={4}></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} className="bold border-right">T2 QC signature</td>
                                                <td colSpan={4}></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} className="border-right" style={{ height: '20px' }}></td>
                                                <td colSpan={4}></td>
                                            </tr>
                                            <tr style={{ borderTop: '2px solid black' }}>
                                                <td rowSpan={9} className="tdtitle bold " style={{ border: '2px solid black' }}><div className="title bold  text-center " style={{ marginTop: 'auto', marginBottom: 'auto' }}>T1 information</div></td>
                                                <td colSpan={2} className="border-right" >Date Received</td>
                                                <td colSpan={4} className='text-center bold'>{item.Print_Date}</td>
                                            </tr>
                                            <tr >
                                                <td colSpan={2} className="border-right"></td>
                                                <td colSpan={1}>PASS</td>
                                                <td colSpan={1}>FAIL</td>
                                                <td className="text-center" colSpan={2} style={{ border: 'none' }}>FIFO</td>
                                            </tr>
                                            <tr >
                                                <td colSpan={2} className="border-right" >Lab Test Result</td>
                                                <td colSpan={1}></td>
                                                <td colSpan={1}></td>
                                                <td rowSpan={4} style={{ border: 'none' }} colSpan={2} className="text-center ">
                                                    <span className='fontchu_temmau'>
                                                        {
                                                            item.Print_Date.split('/')[1].indexOf('0') === 0 ?
                                                            item.Print_Date.split('/')[1].substring(1) :
                                                            item.Print_Date.split('/')[1]
                                                        }
                                                    </span>
                                                </td>

                                            </tr>
                                            <tr >
                                                <td colSpan={2} className="border-right"> Visual Inspection Result</td>
                                                <td colSpan={1}></td>
                                                <td colSpan={1}></td>
                                            </tr>
                                            <tr >
                                                <td colSpan={2} className="border-right" >Dimensional Result</td>
                                                <td colSpan={1}></td>
                                                <td colSpan={1}></td>
                                            </tr>
                                            <tr >
                                                <td colSpan={2} className="border-right">Defect & Grading Check</td>
                                                <td colSpan={1}></td>
                                                <td colSpan={1}></td>
                                            </tr>
                                            <tr >
                                                <td colSpan={2} className="border-right">Parking</td>
                                                <td colSpan={4}></td>
                                            </tr>
                                            <tr >
                                                <td colSpan={2} className="bold border-right">T1 QC signature</td>
                                                <td colSpan={4}></td>
                                            </tr>
                                            <tr >
                                                <td colSpan={2} className="border-right" style={{ height: '20px' }}></td>
                                                <td colSpan={4} style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>Document Number:QIP/APP/01/00/01</td>

                                            </tr>
                                        </tbody>
                                    </table>
                                    <table style={{ width: '50%', tableLayout: 'fixed', marginTop: '0', border: 'none !important' }}>
                                        <tbody>
                                            <tr style={{ border: 'none !important' }}>
                                                <td style={{ width: '5%', border: 'none !important' }}></td>
                                                <td style={{ width: '20%', paddingTop: '10px', border: 'none !important' }}>
                                                    <QRCode value={item.Barcode} size={35} /></td>
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

export default FormPrintSample;