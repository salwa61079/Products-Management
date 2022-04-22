import React, { useEffect, useState } from "react";
import { Form, Col, Row } from 'react-bootstrap';
import './updateProduct.css'
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from "../../components/formGroup/FormGroup";
import DialogDelete from "../../components/dialogDetete/DialogDelete";
import SuccessSnackbare from '../../components/snackbar/SuccessSnackbare';
import WarningSnackbar from '../../components/snackbar/WarningSnackbar';
import ErrorSnackbar from '../../components/snackbar/ErrorSnackbar';

export default function UpdateProduct(props) {

    const location = useLocation();
    const [openD, setOpenD] = React.useState(false);
    const [openA, setOpenA] = React.useState(false);
    const [varDelete, setVarDelete] = useState()
    const [carDelete, setCarDelete] = useState()
    const [varAdd, setVarAdd] = useState()
    const [carAdd, setCarAdd] = useState()
    const [itemD, setItemD] = useState()
    const [itemA, setItemA] = useState()
    //success snackbar
    const [openSE, setOpenSE] = React.useState(false);
    //warning snackbar
    const [openWE, setOpenWE] = React.useState(false);
    //error snackbar
    const [openEE, setOpenEE] = React.useState(false);
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
        Caracteristics: [],
        CategoryVal: "",
        BrandVal: "",
        ModelVal: "",
        VariantVal: [],
        CaracteristicsVal: [],
    })

    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [models, setModels] = useState([])
    const [variants, setVariants] = useState([])

    const [caracteristics, setCaracteristics] = useState([])
    const rowsV = [{ id: "", label: "", value: "" }]
    const rowsC = [{ id: "", label: "", value: "" }]
    const rowsVA = [{ id: "", label: "", value: "" }]
    const rowsCA = [{ id: "", label: "", value: "" }]

    function getProductById(id) {
        console.log("idd", id)
        axios.get(`/api/product/oneProduct/${id}`)
            .then(res => {
                console.log("product id", res.data.oneProduct)
                setData({
                    id: res.data.oneProduct._id,
                    Code: res.data.oneProduct.code,
                    Description: res.data.oneProduct.description,
                    Quantity: res.data.oneProduct.quantite,
                    Price: res.data.oneProduct.prix,
                    Taxe: res.data.oneProduct.taxe,
                    Barcode: res.data.oneProduct.codeABarre,
                    Category: res.data.oneProduct.categorie,
                    Brand: res.data.oneProduct.marque,
                    Model: res.data.oneProduct.modele,
                    Variant: res.data.oneProduct.variation,
                    Caracteristics: res.data.oneProduct.caracteristique,
                    CategoryVal: "",
                    BrandVal: "",
                    ModelVal: "",
                    VariantVal: [],
                    CaracteristicsVal: [],
                })
            })
    }

    function submitEdit(e) {
        axios.put(`/api/product/editProduct/${data.id}`, {
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
                setOpenSE(true)
                //setTimeout(() => {  window.location.reload(false); }, 2100);
            })
            .catch(err => {
                if (err.response.data.message === "product already exists") { setOpenWE(true) }
                else { setOpenEE(true) }
            })
    }

    //Close product snackbar
    const handleCloseS = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }        
        setOpenSE(false);
        setOpenWE(false);
        setOpenEE(false);
    };

    function handle(e) {
        const editData = { ...data }
        editData[e.target.id] = e.target.value
        setData(editData)
        console.log(editData)
    }

    //select item (variation to delete)
    function selectItems(items) {
        setVarDelete(items)
        setItemD("Variation")
        setOpenD(true);
    }
    //select item (caracteristic to delete)
    function selectItemsC(items) {
        setCarDelete(items)
        setItemD("Caracteristic")
        setOpenD(true);
    }

    //select item (variation to add)
    function selectItemsA(items) {
        setVarAdd(items);
        setItemA("Variation");
        setOpenA(true);
    }
    //select item (caracteristic to add)
    function selectItemsCA(items) {
        setCarAdd(items);
        setItemA("Caracteristic");
        setOpenA(true);
    }

    //delete variation or caracteristic function
    function submitDeleteV(varDelete, carDelete) {
        if (itemD === "Variation") {
            for (let i = 0; i < data.Variant.length; i++) {
                console.log("va", data.Variant[i], varDelete.id)
                if (data.Variant[i] === varDelete.id) {
                    console.log("vi", data.Variant[i])
                    if (i === 0) { data.Variant.shift() }
                    else { data.Variant.splice(i, 1) }
                }
            }
            console.log("apre dell", data)
            data.VariantVal = []
            changeValueVariation()
            handleClose()
        }

        else if (itemD === "Caracteristic") {
            for (let i = 0; i < data.Caracteristics.length; i++) {
                console.log("ca", data.Caracteristics[i], carDelete.id)
                if (data.Caracteristics[i] === carDelete.id) {
                    console.log("ci", data.Caracteristics[i])
                    if (i === 0) { data.Caracteristics.shift() }
                    else { data.Caracteristics.splice(i, 1) }
                }
            }
            console.log("apre dell ccii", data)
            data.CaracteristicsVal = []
            changeValueCaracteristic()
            handleClose()
        }
    }

    //add variation or caracteristic function
    function submitAdd(varA, carA) {
        console.log("houni", varA)
        if (itemA === "Variation") {
            for (let i = 0; i < data.Variant.length; i++) {
                if (data.Variant[i] === varA.id) {
                    data.Variant.splice(i, 1)
                }
            }
            data.Variant.push(varA.id)
            data.VariantVal = []
            changeValueVariation()
            handleCloseA()
        }

        else if (itemA === "Caracteristic") {
            for (let i = 0; i < data.Caracteristics.length; i++) {
                if (data.Caracteristics[i] === carA.id) {
                    data.Caracteristics.splice(i, 1)
                }
            }
            data.Caracteristics.push(carA.id)
            data.CaracteristicsVal = []
            changeValueCaracteristic()
            handleCloseA()
        }
    }

    const handleClose = () => {
        setCarDelete("")
        setVarDelete("")
        setOpenD(false);
    };
    const handleCloseA = () => {
        setCarAdd("")
        setVarAdd("")
        setOpenA(false);
    };

    useEffect(async () => {

        const { idVal } = location.state;
        getProductById(idVal._id)
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

    function changeValueBrand() {
        for (let j = 0; j < brands.length; j++) {
            if (data.Brand === brands[j]._id) {
                data.BrandVal = brands[j].libelleMarque
            }
        }
        console.log("data brand", data)
    }

    function changeValueModel() {
        for (let j = 0; j < models.length; j++) {
            if (data.Model === models[j]._id) {
                data.ModelVal = models[j].libelleModele
            }
        }
        console.log("data model", data)
    }

    function changeValueCategory() {
        for (let j = 0; j < categories.length; j++) {
            if (data.Category === categories[j]._id) {
                data.CategoryVal = categories[j].libelleCategorie
            }
        }
        console.log("data category", data)
    }

    function changeValueVariation() {
        for (let k = 0; k < data.Variant.length; k++) {
            for (let j = 0; j < variants.length; j++) {
                if (data.Variant[k] === variants[j]._id) {
                    data.VariantVal[k] = ({ ...data.VariantVal }, variants[j])
                }
            }
        }
        console.log("data variation", data)
    }

    function changeValueCaracteristic() {
        for (let k = 0; k < data.Caracteristics.length; k++) {
            for (let j = 0; j < caracteristics.length; j++) {
                if (data.Caracteristics[k] === caracteristics[j]._id) {
                    data.CaracteristicsVal[k] = ({ ...data.CaracteristicsVal }, caracteristics[j])
                }
            }
        }
        console.log("data caract", data)
    }

    changeValueBrand()
    changeValueModel()
    changeValueCategory()
    changeValueVariation()
    changeValueCaracteristic()

    console.log("final", data)

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
    function remplirRows(rowsV, variants) {
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
    remplirRows(rowsV, data.VariantVal)
    remplirRows(rowsVA, variants)

    // Caracteristic  
    function remplirRowsC(rowsC, caracteristics) {
        console.log("carac", caracteristics)
        console.log("carac 0", caracteristics[0])
        // if(caracteristics[0] ===undefined)
        // {caracteristics.shift()
        //     console.log("carac 2", caracteristics,caracteristics.length)}
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
    remplirRowsC(rowsC, data.CaracteristicsVal)
    remplirRowsC(rowsCA, caracteristics)



    return (
        <>
            <h3 className="titre">Edit Product</h3>
            <div className="carda">
                <Form >
                    <FormGroup label="Product Code" onChange={(e) => handle(e)} id="Code" value={data.Code} type="text" placeholder="Enter Code" />
                    <FormGroup label="Product Description" onChange={(e) => handle(e)} id="Description" value={data.Description} type="text" placeholder="Enter Description" />


                    <Row className="mb-3">
                        <FormGroup as={Col} label="Product Quantity" onChange={(e) => handle(e)} id="Quantity" value={data.Quantity} type="number" placeholder="1 2 3 4..." />
                        <FormGroup as={Col} label="Product Price" onChange={(e) => handle(e)} id="Price" value={data.Price} type="number" placeholder="Enter Price" />
                        <FormGroup as={Col} label="Taxe" onChange={(e) => handle(e)} id="Taxe" value={data.Taxe} type="number" placeholder="Enter taxe " />
                        <FormGroup as={Col} label="Barcode" onChange={(e) => handle(e)} id="Barcode" value={data.Barcode} type="number" placeholder="Enter Barcode " />

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

                    <Row className="mb-3"></Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridState" >
                            <Accordion >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header"   >
                                    <Form.Label className="lab">Variations  </Form.Label>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div style={{ height: 290, width: '100%' }}>
                                        <DataGrid
                                            rows={rowsV}
                                            columns={columnsV}
                                            pageSize={3}
                                            rowsPerPageOptions={[3]}
                                            checkboxSelection={false}
                                            onRowClick={(items) => selectItems(items)}
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </Form.Group>


                        <Form.Group as={Col} controlId="formGridState"  >
                            <Accordion >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header"   >
                                    <Form.Label className="lab">Caracteristics  </Form.Label>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div style={{ height: 290, width: '100%' }}>
                                        <DataGrid
                                            rows={rowsC}
                                            columns={columnsC}
                                            pageSize={3}
                                            rowsPerPageOptions={[3]}
                                            checkboxSelection={false}
                                            onRowClick={(items) => selectItemsC(items)}
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridState" >
                            <Accordion >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header"   >
                                    <Form.Label className="lab">Add Variation  </Form.Label>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div style={{ position: "inherit", display: "flex", height: 290, width: '100%' }}>
                                        <DataGrid
                                            rows={rowsVA}
                                            columns={columnsV}
                                            pageSize={3}
                                            rowsPerPageOptions={[3]}
                                            checkboxSelection={false}
                                            onRowClick={(items) => selectItemsA(items)}
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </Form.Group>


                        <Form.Group as={Col} controlId="formGridState"  >
                            <Accordion >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header"   >
                                    <Form.Label className="lab">Add Caracteristics </Form.Label>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div style={{ height: 290, width: '100%' }}>
                                        <DataGrid
                                            rows={rowsCA}
                                            columns={columnsC}
                                            pageSize={3}
                                            rowsPerPageOptions={[3]}
                                            checkboxSelection={false}
                                            onRowClick={(items) => selectItemsCA(items)}
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </Form.Group>

                    </Row>


                    <Row className="mb-3">
                    </Row>

                    <Link className="link" to="/">
                        <button className="cancelBtn" >
                            Cancel
                        </button>
                    </Link>
                    <Link className="link" to="/">
                        <button onClick={(e) => submitEdit(e)} className="submitProduct">
                            Edit
                        </button>
                    </Link>
                </Form>
            </div>

            {/* delete variation or caracteristic dialog*/}
            <DialogDelete open={openD} onClose={handleClose} title={itemD} object="product"
                onClick1={() => submitDeleteV(varDelete, carDelete)}
                onClick2={handleClose} />


            {/* add variation or caracteristec dialog*/}
            <div>
                <Dialog open={openA} onClose={handleCloseA} fullWidth maxWidth="sm" >
                    <DialogTitle>Add {itemA}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to add this {itemA} to this product?
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <button onClick={() => submitAdd(varAdd, carAdd)} className="btnEdit">Yes  </button>
                        <button onClick={handleCloseA} className="btnCancel"> Cancel  </button>
                    </DialogActions>
                </Dialog>
            </div>

                          
            {/* success Edit snackbar*/}
            <SuccessSnackbare open={openSE} onClose={handleCloseS} message="Product edited successfuly" />

            {/* warning Edit snackbar*/}
            <WarningSnackbar open={openWE} onClose={handleCloseS} message="Product already exists" />

            {/* error Edit snackbar*/}
            <ErrorSnackbar open={openEE} onClose={handleCloseS} message="Edit: Error" />
        </>
    )
}
