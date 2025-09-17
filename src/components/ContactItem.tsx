import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import type { Contact, Action } from "../reducer/contactReducer";

interface ExtraProps {
    handleEdit: (id: number) => void;
    dispatch: React.Dispatch<Action>;
}

const ContactItem = ({ id, firstName, lastName, phone, handleEdit, dispatch }: Contact & ExtraProps) => {
    return (
        <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{phone}</td>
            <td><AiFillEdit size={20} className='icon' onClick={() => handleEdit(id)} /></td>
            <td><AiFillDelete size={20} className='icon' onClick={() => {
                const confirmDelete = window.confirm(`คุณแน่ใจใช่ไหมที่ต้องการลบข้อมูลการติดต่อของผู้ใช้ ${firstName} ${lastName}?`)
                if (confirmDelete) {
                    // Dispatch Action
                    dispatch({
                        type: "DELETE_CONTACT",
                        payload: { id }
                    })
                }
            }} /></td>
        </tr>
    );
};

export default ContactItem;
