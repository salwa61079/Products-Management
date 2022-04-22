import React, { useEffect, useState } from "react";
import FormGroup from '../../components/formGroup/FormGroup';
import { Form, Col, Row } from 'react-bootstrap';
import './addProduct.css'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SuccessSnackbare from '../../components/snackbar/SuccessSnackbare';
import WarningSnackbar from '../../components/snackbar/WarningSnackbar';
import ErrorSnackbar from '../../components/snackbar/ErrorSnackbar';


export default function AddProduct() {


    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [models, setModels] = useState([])
    const [variants, setVariants] = useState([])
    //success snackbar
    const [openSA, setOpenSA] = React.useState(false);
    //warning snackbar
    const [openWA, setOpenWA] = React.useState(false);
    //error snackbar
    const [openEA, setOpenEA] = React.useState(false);

    const [caracteristics, setCaracteristics] = useState([])
    const rowsV = [{
        id: "",
        label: "",
        value: ""
    }]

    const rowsC = [{
        id: "",
        label: "",
        value: ""
    }]

    const [data, setData] = useState({
        Code: "",
        Description: "",
        Quantity: "",
        Price: "",
        Taxe: "",
        Barcode: "",
        Category: null,
        Brand: null,
        Model: null,
        Variant: [],
        Caracteristics: []
    })

    async function  submit(e) {
      await  axios.post('/api/product/addProduct', {
            code: data.Code,
            description: data.Description,
            quantite: parseInt(data.Quantity),
            prix: parseFloat(data.Price),
            taxe: parseFloat(data.Taxe),
            codeABarre: data.Barcode,
            variation: data.Variant,
            marque: data.Brand,
            categorie: data.Category,
            modele: data.Model,
            caracteristique: data.Caracteristics

        })
            .then(res => {
                console.log(res.data)
                setOpenSA(true)
            })
            .catch(err => {
                if (err.response.data.message === "product already exists") { setOpenWA(true) }
                else { setOpenEA(true) }
            })
    }

    //Close product snackbar
    const handleCloseS = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSA(false);
        setOpenWA(false);
        setOpenEA(false);
    };
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    function selectItems(items) {
        data.Variant = items
        console.log(data)
    }

    function selectItemsC(items) {
        data.Caracteristics = items
        console.log(data)
    }

    useEffect(async () => {

        //variants
        await axios.get('/api/variation/allVariations').then(res => {
            setVariants(res.data.allVariations)
            console.log("variants", res)
        })
        //categories
        await axios.get('/api/category/allCategories').then(res => {
            setCategories(res.data.allCategories)
            console.log("category", res)
        })

        //brands
        await axios.get('/api/brand/allBrands').then(res => {
            setBrands(res.data.allMarques)
            console.log("brand", res)
        })

        //models
        await axios.get('/api/model/allModels').then(res => {
            setModels(res.data.allModels)
            console.log("model", res)
        })

        //caracteristics
        await axios.get('/api/caracteristic/allCaracteristics').then(res => {
            setCaracteristics(res.data.allCaracteristics)
            console.log("caracteristic", res)
        })
    }, [])

    const columnsV = [
        { field: 'id', headerName: 'ID', width: 210, },
        { field: 'label', headerName: 'Variation name', width: 160 },
        { field: 'value', headerName: 'Variation value', width: 160 },
    ];

    const columnsC = [
        { field: 'id', headerName: 'ID', width: 210, },
        { field: 'label', headerName: 'Caracteristic name', width: 160 },
        { field: 'value', headerName: 'Caracteristic value', width: 160 },
    ];

    //variation
    function remplirRows(variants) {
        console.log("vvarr", variants)
        rowsV.shift();
        for (let i = 0; i < variants.length; i++) {
            rowsV.push({
                id: variants[i]._id,
                label: variants[i].label,
                value: variants[i].value
            })
        }
        console.log("resslll", rowsV)
    }
    remplirRows(variants)

    // Caracteristic  
    function remplirRowsC(caracteristics) {
        console.log("carac", caracteristics)
        rowsC.shift();
        for (let i = 0; i < caracteristics.length; i++) {
            rowsC.push({
                id: caracteristics[i]._id,
                label: caracteristics[i].label,
                value: caracteristics[i].value
            })
        }
        console.log("resslll", rowsC)
    }
    remplirRowsC(caracteristics)

    return (

        <>

            <h3 className="titre">Add a New Product</h3>
            <div className="carda">
                <Form onSubmit={(e) => submit(e)}>

                    
                    <FormGroup label="Product Code" onChange={(e) => handle(e)} id="Code" value={data.Code} type="text" placeholder="Enter Code"/>
                    <FormGroup label="Product Description" onChange={(e) => handle(e)} id="Description" value={data.Description} type="text" placeholder="Enter Description"/>

                    <Row className="mb-3">

                        <FormGroup as={Col} label="Product Quantity" onChange={(e) => handle(e)} id="Quantity" value={data.Quantity} type="number" placeholder="1234..."/>
                        <FormGroup as={Col} label="Product Price" onChange={(e) => handle(e)} id="Price" value={data.Price} type="number" placeholder="Enter Price"/>
                        <FormGroup as={Col} label="Taxe" onChange={(e) => handle(e)} id="Taxe" value={data.Taxe} type="number" placeholder="Enter taxe "/>
                        <FormGroup as={Col} label="Barcode" onChange={(e) => handle(e)} id="Barcode" value={data.Barcode} type="number" placeholder="Enter Barcode "/>
                        
                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Category</Form.Label>
                            <Form.Select type="text" onChange={(e) => handle(e)} id="Category" value={data.Category} >
                                <option>Choose...</option>
                                {categories.map(({ libelleCategorie, _id }) => (
                                    <option key={_id} value={_id}> {libelleCategorie} </option>
                                ))}
                            </Form.Select>

                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Brand</Form.Label>
                            <Form.Select type="text" onChange={(e) => handle(e)} id="Brand" value={data.Brand} >
                                <option>Choose...</option>
                                {brands.map(({ libelleMarque, _id }) => (
                                    <option key={_id} value={_id}> {libelleMarque} </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Model</Form.Label>
                            <Form.Select type="text" onChange={(e) => handle(e)} id="Model" value={data.Model} >
                                <option>Choose...</option>
                                {models.map(({ libelleModele, _id }) => (
                                    <option key={_id} value={_id}> {libelleModele} </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    {/* <Row className="mb-3">

                        <Form.Group as={Col} controlId="formGridState">
                            <button className="add">Add Category</button>

                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <button className="add">Add Brand</button>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <button className="add">Add Model</button>
                        </Form.Group>
                    </Row> */}
                    <Row className="mb-3"></Row>


                    <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState" >
                        {/* <div className="Acc"> */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content"  id="panel1a-header"   >
                            <Form.Label>Variation List</Form.Label>
                            </AccordionSummary>
                            <AccordionDetails>                            
                            <div style={{ height: 340, width: '100%' }}>
                                <DataGrid
                                    rows={rowsV}
                                    columns={columnsV}
                                    pageSize={4}
                                    rowsPerPageOptions={[4]}
                                    checkboxSelection
                                    onSelectionModelChange={(items) => selectItems(items)}
                                />
                            </div>
                            </AccordionDetails>
                        </Accordion>
                        {/* </div>                        */}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState" >
                        <Accordion >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content"  id="panel1a-header"   >
                            <Form.Label>Caracteristic List</Form.Label>
                            </AccordionSummary>
                            <AccordionDetails>                            
                            <div style={{ height: 340, width: '100%' }}>
                                <DataGrid
                                    rows={rowsC}
                                    columns={columnsC}
                                    pageSize={4}
                                    rowsPerPageOptions={[4]}
                                    checkboxSelection
                                    onSelectionModelChange={(items) => selectItemsC(items)}
                                />
                            </div>
                            </AccordionDetails>
                        </Accordion>
                        </Form.Group>


                    </Row>

                    {/* <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridState">
                            <button className="add">Add Variant</button>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <button className="addC">Add Caracteristique</button>
                        </Form.Group>
                    </Row> */}

                    <Link className="link" to="/">
                        <button className="cancelBtn" >
                            Cancel
                        </button>
                    </Link>
                    
                        <button type="submit" className="submitProduct">
                            Submit
                        </button>

                </Form>
            </div>

             {/* success add snackbar*/}
            <SuccessSnackbare open={openSA} onClose={handleCloseS} message="Product added successfuly" />

            {/* warning add snackbar*/}
            <WarningSnackbar open={openWA} onClose={handleCloseS} message="Product already exists" />

            {/* error add snackbar*/}
            <ErrorSnackbar open={openEA} onClose={handleCloseS} message="Add: Error" />

        </>
    )
}
