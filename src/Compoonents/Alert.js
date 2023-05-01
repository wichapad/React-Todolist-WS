import { useEffect } from 'react'

const Alert = ({ msg, type, setAlert, list }) => {

    useEffect(() => { //เมื่อมีการเปลี่ยนแปลงค่าใน props List จะมีการหน่งเวลา 1.5 วิ Alert จะหายไป แล้ว state Alert จะกลายเป็นค่าว่าง
        const timeOut = setTimeout(() => {
            setAlert({ show: false, msg: '', type: '' });
        }, 1500)
        return()=> clearTimeout(timeOut); //Clear timeOut
        // eslint-disable-next-line
    }, [list])
    return (
        <p className={`alert ${type}`}>{msg}</p>
    )
}

export default Alert