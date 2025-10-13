import React from 'react'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { editpets } from '../Services/AllApi';



function EditpetModal({ data,data2 }) {

    useEffect(() => {
        setgetid(data)
    }, [])

    const [show, setShow] = useState(false);
    const [petdata, setpetdata] = useState({category: "", breed: "", gender: "", age: "", color: "", size: "", price: "", image: "" })
    const [getid, setgetid] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => {
    setpetdata({
        category: data.category ,
        breed: data.breed ,
        gender: data.gender,
        age: data.age ,
        color: data.color ,
        size: data.size ,
        price: data.price ,
        image: data.image 
    });
    setShow(true);
};


    const handleEdit = async (id) => {
        const response = await editpets(id, petdata)
        if(response.status===200){
            data2(response.data)
            toast.success("Updated successfully")
            setpetdata({category: "", breed: "", gender: "", age: "", color: "", size: "", price: "", image: "" })
            handleClose()
        }
        else{
            toast.error("something went wrong !!")
        }

    }

    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                <i className="fa-solid fa-pen-to-square"></i>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label  htmlFor="category">Select Category:</label>
                    <select name="category" id="category" className='form-control' onChange={(e) => { setpetdata({ ...petdata, category: e.target.value }) }} value={petdata.category}>
                        <option value="">-- Select Category --</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bird">Bird</option>
                        <option value="Fish">Fish</option>
                        <option value="Small Mammals">Small Mammals</option>
                    </select>

                    <input type="text" name="" id="" placeholder='Breed' className='form-control my-2' onChange={(e) => { setpetdata({ ...petdata, breed: e.target.value }) }}value={petdata.breed} />
                    <input type="text" name="" id="" placeholder='image url' className='form-control my-2' onChange={(e) => { setpetdata({ ...petdata, image: e.target.value }) }} value={petdata.image}/>

                    <select name="gender" id="gender" className='form-control' onChange={(e) => { setpetdata({ ...petdata, gender: e.target.value }) }}value={petdata.gender}>
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input type="text" name="" id="" placeholder='Age' className='form-control my-2' onChange={(e) => { setpetdata({ ...petdata, age: e.target.value }) }}value={petdata.age} />
                    <input type="text" name="" id="" placeholder='color' className='form-control my-2' onChange={(e) => { setpetdata({ ...petdata, color: e.target.value }) }} value={petdata.color}/>
                    <select name="size" id="size" className='form-control' onChange={(e) => { setpetdata({ ...petdata, size: e.target.value }) }}value={petdata.size}>
                        <option value="">Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                    <input type="text" name="" id="" placeholder='Price' className='form-control my-2' onChange={(e) => { setpetdata({ ...petdata, price: e.target.value }) }} value={petdata.price} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={() => handleEdit(getid._id)} > Edit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditpetModal