import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addpets } from '../Services/AllApi';
import { toast } from 'react-toastify';

function Addpetmodal({data}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [petdata, setpetdata] = useState({ category: "", breed: "", gender: "", age: "", color: "", size: "", price: "", image: "" })


    const handleAddpets = async () => {
        const { category, breed, gender, age, color, size, price, image } = petdata
        if (!category || !breed || !gender || !age || !color || !size || !price || !image) {
            toast.warning("enter valid inputs")

        }
        else {
            const response = await addpets(petdata)
            if (response.status === 200) {
                toast.success("pet added successfully")
                data(response.data);
                setpetdata({ category: "", breed: "", gender: "", age: "", color: "", size: "", price: "", image: "" })
                handleClose()
                
            }
        }
    }

    return (
        <>

            <Button variant="primary" onClick={handleShow}>
                Add Pets
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add pets</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label for="category">Select Category:</label>
                    <select name="category" id="category" className='form-control' onChange={(e) => { setpetdata({ ...petdata, category: e.target.value }) }}>
                        <option value="">-- Select Category --</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bird">Bird</option>
                        <option value="Fish">Fish</option>
                        <option value="Small Mammals">Small Mammals</option>
                    </select>

                    <input type="text" name="" id="" placeholder='Breed' className='form-control my-2' onChange={(e) => { setpetdata({ ...petdata, breed: e.target.value }) }} />
                    <input type="text" name="" id="" placeholder='image url' className='form-control my-2' onChange={(e) => { setpetdata({ ...petdata, image: e.target.value }) }} />

                    <select name="gender" id="gender" className='form-control' onChange={(e) => { setpetdata({ ...petdata, gender: e.target.value }) }}>
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input type="text" name="" id="" placeholder='Age' className='form-control my-2' onChange={(e) => { setpetdata({ ...petdata, age: e.target.value }) }} />
                    <input type="text" name="" id="" placeholder='color' className='form-control my-2' onChange={(e) => { setpetdata({ ...petdata, color: e.target.value }) }} />
                    <select name="size" id="size" className='form-control' onChange={(e) => { setpetdata({ ...petdata,size: e.target.value }) }}>
                        <option value="">Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                    <input type="text" name="" id="" placeholder='Price' className='form-control my-2' onChange={(e) => { setpetdata({ ...petdata, price: e.target.value }) }} defaultValue={"₹"} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddpets}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Addpetmodal