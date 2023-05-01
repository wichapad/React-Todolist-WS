import { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid' //genarate id 
import ListComponent from './Compoonents/ListComponent';
import Alert from './Compoonents/Alert';


function App() {
  const [name, setName] = useState("") //เก็บค่าที่พิมพ์ใน Input ลงใน State Name เมื่อพิมพ์ข้อความลงในช่อง Input
  const [list, setList] = useState([])  //state เก็บกลุ่มข้อมูลที่เป็นรูปแบบ array และนำไปแสดงใน Listcomponent โดยการ map
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' }) //state เก็บค่า alert รูปแบบ object สถานะเริ่มต้นเป็น false และค่าว่าง
  const [checkEdit, setCheckEdit] = useState(false) // state เก็บสถานะการแก้ไข ค่าเริ่มต้นเป็น false
  const [editId, setEditId] = useState(null) //state จดจำ id ที่มีการแก้ไข

  const submitData = (e) => { //Function ที่เก็บข้อมูลรายการเอาไว้และนำมาแสดง
    e.preventDefault();
    if (!name) { // ถ้า state name เป็นค่าว่าง จะให้แสดง alert
      setAlert({ show: true, msg: 'Please Write Message', type: "error" })
    } else if (checkEdit && name) { //การอัพเดตข้อมูลรายการที่ต้องการแก้ไข
      const result = list.map((item) => {
        if (item.id === editId) { //ถ้า id item ตรงกับ id edit ที่เรียก จะให้อัพเดตข้อมูล
          return { ...item, title: name }
        }
        return item
      })
      setList(result) //แก้ไขข้อมูลเสร็จ
      setName('') // Clear แบบฟอร์ม
      setCheckEdit(false) // ปุ่ม edit กลายเป็น false
      setEditId(null) // edit id เป็น null
      setAlert({ show: true, msg: 'Edit Success', type: "success" })
    } else { // แต่ถ้า state name ไม่เป็นค่าว่าง จะแสดง Item และแสดงใน block List
      const newItem = {
        id: uuidv4(),
        title: name,
      } //เพิ่มข้อมูล
      setList([...list, newItem]) //นำข้อมูลมาเก็บลงใน state List
      setName('') // Clear แบบฟอร์ม
      setAlert({ show: true, msg: 'Successfully', type: "success" })
    }
  }

  const removeItem = (id) => { // ลบข้อมูลใน List
    const result = list.filter((item) => item.id !== id)  //สร้างตัวแปร ทำการกรองข้อมูลที่อยู่ใน list state ถ้ามี id ตัวไหนที่ ไม่ตรงกับ id ที่ส่งไปทำงานให้ คงไว้
    setList(result); //นำตัวแปร result มากำหนดค่าใน list state
    setAlert({ show: true, msg: "Delete Success!", type: "error" })
  }

  const editItem = (id) => { //แก้ไขข้อมูล
    setCheckEdit(true) //กดปุ่ม edit จะเปลี่ยน สถานะเป็น true
    setEditId(id) //เก็บ id ที่มีการกดแก้ไข
    const searchItem = list.find((item) => item.id === id) //ค้นหาข้อมูล ที่อยู่ใน list state ที่เป็น Array เมื่อ id ตรงกันกับเลข id ที่ส่งมา จะได้ข้อมูลที่ต้องการแก้ไขมาใช้งาน
    setName(searchItem.title)
  }

  return (
    <section className="container">
      <h1>ToDo List</h1>
      {alert.show && <Alert {...alert} setAlert={setAlert} list={list} />}
      <form className="form_group" onSubmit={submitData}>
        <div className="form_control">
          <input type="text" className="text_input"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button type="submit" className="submit_btn">
            {checkEdit ? "Edit" : "Add"}
          </button>
        </div>
      </form>
      <section className='list_container' >
        {list.map((data, index) => {
          return <ListComponent key={index} {...data} removeItem={removeItem} editItem={editItem} /> //ส่ง propertie ข้อมูล ไปทำงานที่ listComponent

        })}
      </section>
    </section>
  );
}

export default App;
