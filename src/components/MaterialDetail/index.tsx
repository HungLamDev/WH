import './stylematerial.scss'
const MaterialDetail = ({item}:{item?: any}) =>{
    function isDarkColor(color: any) {
        if (!color) {
            return false;
        }

        if (color.startsWith("rgb")) {
            const values = color.match(/\d+/g);
            if (values) {
                const r = parseInt(values[0]);
                const g = parseInt(values[1]);
                const b = parseInt(values[2]);
                const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
                return brightness < 128;
            }
        } 
        return false;
    }
    return(
        <div className="material-detail-container"  style={{
            marginBottom:'3px',
            background: item.rgb !== "" ? item.rgb : '#696868',
            color: isDarkColor( item.rgb !== "" ? item.rgb : item.Color) ? "white" : "black"
        }}>
            <span className='material-detail-color'>{item.Color}</span>
            <span className='material-detail-qty'>{item.Total_Qty}</span>
            <span className='material-detail-no'>{item.Material_No}</span>
            <span className='material-detail-name'>{item.Material_Name}</span>
        </div>
    )
}
export default MaterialDetail