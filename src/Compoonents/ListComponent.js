import { MdDelete, MdEdit } from "react-icons/md";

const ListComponent = ({ id, title, removeItem, editItem }) => {

    return (
        <div className="list_item">
            <p className="title">{title}</p>
            <div className="Btn_container">
                <MdEdit onClick={() => editItem(id)} className="btn"/>
                <MdDelete onClick={() => removeItem(id)} className="btn"/>

            </div>
        </div>
    )
}

export default ListComponent