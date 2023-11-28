import { Box, Stack } from '@mui/material'
import './chartlvl.scss'
import { useNavigate } from 'react-router-dom'
const ChartLVL = ({ listRack, wareHouse }: { listRack: any, wareHouse: any }) => {
    const nag = useNavigate()
    //ok
    if (listRack.Rack_Total === 'bank') {
        return (
            <div style={{ height: '100px' }}></div>
        )
          }else  if (listRack.Rack_Total === 'Pallet') {
            return (
                <div className="chartlvl-container" style={{
                    width: listRack.width,
                    height: listRack.height,
                }} >
                    <div className="barlvl-title">P</div>
                    <div className='barlvl-container'  >
    
                        <div
                            className="pallet"
                            style={{ width: '100%' }}
                        >
                            {/* <div className="barlvl-label">{listRack.Sum_Total}</div> */}
    
                        </div>
                    </div>
    
    
    
                </div>
            )
    } else {
        return (
            <div className="chartlvl-container" style={{
                width: listRack.width,
                height: listRack.height,
            }} >
                <div className="barlvl-title">{listRack.Rack_Total}</div>
                <div className='barlvl-container' onClick={() => nag('/material-detail', { state: { Rack_Total: listRack.Rack_Total, wareHouse: wareHouse } })} >

                    <div
                        className="barlvl"
                        style={{ width: listRack.Sum_Total + '%' }}
                    >
                        <div className="barlvl-label">{listRack.Sum_Total}</div>

                    </div>
                </div>



            </div>

        )
    }
}

export default ChartLVL