import { Box, Stack } from '@mui/material'
import './stylechart.scss'
import { useNavigate } from 'react-router-dom'
const Chart = ({ listRack, wareHouse }: { listRack: any, wareHouse:any }) => {
    const nag = useNavigate()
    return (
        <div className="chart-container" style={{ width: listRack.width, height: listRack.height }} >
            <div className='bar-container' onClick={() => nag('/material-detail', { state: { Rack_Total: listRack.Rack_Total, wareHouse:wareHouse  }})} >
                <div
                    className="bar"
                    style={{ height: listRack.Sum_Total + '%' }}
                >
                    <div className="bar-label">{listRack.Sum_Total}</div>

                </div>
            </div>

            <div className="bar-title">{listRack.Rack_Total}</div>

        </div>
    )
}

export default Chart