import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'; import TablePagination from '@mui/material/TablePagination';
import { BsPlusSquareFill, BsFillCaretDownFill, BsFillCaretUpFill, BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { Form, Col, Row } from 'react-bootstrap';
import './modelList.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ResearchGroup from '../../components/researchGroup/ResearchGroup';
import FormGroup from '../../components/formGroup/FormGroup';
import DialogDelete from '../../components/dialogDetete/DialogDelete';
import SuccessSnackbare from '../../components/snackbar/SuccessSnackbare';
import WarningSnackbar from '../../components/snackbar/WarningSnackbar';
import ErrorSnackbar from '../../components/snackbar/ErrorSnackbar';


export default function ModelList() {
    const [rows, setRows] = useState([])
    const [marque, setMarque] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const [openD, setOpenD] = React.useState(false);
    const [openDR, setOpenDR] = React.useState(false);
    const [idRow, setIdRow] = React.useState(false);
    //success snackbar
    const [openS, setOpenS] = React.useState(false);
    const [openSA, setOpenSA] = React.useState(false);
    const [openSE, setOpenSE] = React.useState(false);
    //warning snackbar
    const [openWA, setOpenWA] = React.useState(false);
    const [openWE, setOpenWE] = React.useState(false);
    //error snackbar
    const [openE, setOpenE] = React.useState(false);
    const [openEA, setOpenEA] = React.useState(false);
    const [openEE, setOpenEE] = React.useState(false);
    const [data, setData] = useState({
        LibelleModele: "",
        Marque: null
    })
    const [dataE, setDataE] = useState({
        LibelleModele: "",
        Marque: null
    })
    const [model, setModel] = useState({})
    const [searchModel, setSearchModel] = useState([])

    const handleChangePage = (event, newPage) => { setPage(newPage); };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function getModelById(id) {
        console.log("idd", id)
        axios.get(`/api/model/oneModel/${id}`)
            .then(res => {
                setModel(res.data.oneModel)
                console.log("model id", res.data.oneModel)
                setDataE({
                    LibelleModele: res.data.oneModel.libelleModele,
                    Marque: res.data.oneModel.marque
                })
            })
    }

    //get all models 
    useEffect(async () => {

        //models
        await axios.get('/api/model/allModels').then(res => {
            setRows(res.data.allModels)
            console.log(" models", res)
        })
        //brands
        await axios.get('/api/brand/allBrands').then(res => {
            setMarque(res.data.allMarques)
            console.log("brands ", res)
        })
    },[])

    //add model function
    function submit(e) {
        axios.post('/api/model/addModel', {
            libelleModele: data.LibelleModele,
            marque: data.Marque
        })
            .then(res => {
                console.log(res.data)
                setOpenSA(true)
            })
            .catch(err => {
                if (err.response.data.message === "Model already exists") { setOpenWA(true) }
                else { setOpenEA(true) }
            })
    }

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    //edit model function
    function submitEdit(e) {
        console.log("modelId", model._id)
        console.log("marque id", dataE.Marque)
        axios.put(`/api/model/editModel/${model._id}`, {
            libelleModele: dataE.LibelleModele,
            marque: dataE.Marque
        })
            .then(res => {
                handleClose()
                console.log(res.data)
                setOpenSE(true)
                setTimeout(() => {  window.location.reload(false); }, 1800);
            })
            .catch(err => {
                handleClose()
                if (err.response.data.message === "model already exists") { setOpenWE(true) }
                else { setOpenEE(true) }
            })
    }

    function handleEdit(e) {
        const editData = { ...dataE }
        editData[e.target.id] = e.target.value
        setDataE(editData)
        console.log(editData)
    }

    //delete model function
    function submitDelete(id) {
        axios.delete(`/api/model/removeModel/${id}`)
            .then(res => {
                handleCloseD()
                console.log(res.data)
                setOpenS(true)
                setTimeout(() => {  window.location.reload(false); }, 1800);
            })
            .catch(err => {
                handleCloseD()
                setOpenE(true)
            })

    }
    //Close model snackbar
    const handleCloseS = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenS(false);
        setOpenSA(false);
        setOpenSE(false);
        setOpenWA(false);
        setOpenWE(false);
        setOpenE(false);
        setOpenEA(false);
        setOpenEE(false);
    };

    //functions of dialog
    function handleClickOpen(id) {
        setOpenD(true);
        getModelById(id);
    };

    const handleClose = () => {
        setOpenD(false);
    };

    function handleOpenD(id) {
        setIdRow(id);
        setOpenDR(true)
    };
    const handleCloseD = () => {
        setIdRow("")
        setOpenDR(false);
    };

    function changeValueBrand() {
        console.log("resss111", rows)
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < marque.length; j++) {
                console.log("resss2", rows[i].marque, marque[j]._id)
                if (rows[i].marque == marque[j]._id) {
                    rows[i].marque = marque[j].libelleMarque
                }
            }
        }
        console.log("row", rows)
    }
    changeValueBrand()

    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchModel(value)
    };

    function Rows(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        return (
            <React.Fragment  >
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row"> {row._id} </TableCell>
                    <TableCell options={{ sorting: true }}>{row.libelleModele}</TableCell>
                    <TableCell >{row.marque} </TableCell>
                    <TableCell align="center">
                        {/* edit button */}
                        <IconButton aria-label="expand row" size="small" onClick={() => handleClickOpen(row._id)}>
                            <BsFillPencilFill size='23px' color='#9797e8' />
                        </IconButton>

                    </TableCell>
                    <TableCell align="center">
                        <IconButton aria-label="expand row" size="small" onClick={() => handleOpenD(row._id)}>
                            <BsFillTrashFill size='23px' color='#ed3838' />
                        </IconButton>
                    </TableCell>

                </TableRow>
            </React.Fragment>

        );
    }

    return (
        <>
            {/* add Model */}
            <div >
                <h3 className="titre">Model List</h3>
                <div className='cardA'>
                    <Form onSubmit={(e) => submit(e)} >
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                            </Form.Group>
                            <Form.Group as={Col} >
                            </Form.Group>
                            <Form.Group as={Col} >
                                <h5 className="titreAdd">Add Model</h5>
                            </Form.Group>

                            <FormGroup as={Col} className="categoryLabel" label="Model name" type="text" onChange={(e) => handle(e)} id="LibelleModele" value={data.LibelleModele} placeholder="Enter Name" />

                            <Form.Group as={Col} className="mb-3">
                                <Form.Label className="categoryLabel">Marque name</Form.Label>
                                <Form.Select type="text" onChange={(e) => handle(e)} id="Marque" value={data.Marque} defaultValue="Choose...">
                                    <option>Choose...</option>
                                    {marque.map(({ libelleMarque, _id }) => (
                                        <option value={_id}> {libelleMarque} </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3">
                                <button type="submit" className='btnAdd' >
                                    <BsPlusSquareFill align="center" className='iconAdd' size='25px' color='green' />
                                </button>

                            </Form.Group>
                        </Row>
                    </Form>
                </div>

            </div>

            {/* search Model */}
            <ResearchGroup placeholder="Research model by name" onChange={handleSearchTerm} />

            {/* list Model */}
            <div >
                <TableContainer component={Paper}  >
                    <Table aria-label="collapsible table" >
                        <TableHead className='head'>
                            <TableRow className="headItem">
                                <TableCell />
                                <TableCell >Model ID</TableCell>
                                <TableCell >Model Name</TableCell>
                                <TableCell >Marque</TableCell>
                                <TableCell >Edit</TableCell>
                                <TableCell >Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .filter((val) => { return val.libelleModele.includes(searchModel) })
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((allModels) => (
                                    <Rows key={allModels._id} row={allModels} />
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>

            {/* edit Model dialog*/}
            <div>
                <Dialog open={openD} onClose={handleClose} fullWidth maxWidth="sm" >
                    <DialogTitle>Edit Model</DialogTitle>
                    <DialogContent>
                        <Form  >
                            <Row className="mb-3">
                                <FormGroup as={Col} label="Model name" onChange={(e) => handleEdit(e)} id="LibelleModele" value={dataE.LibelleModele} type="text" placeholder="Enter Name" />

                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label >Marque </Form.Label>
                                    <Form.Select type="text" onChange={(e) => handleEdit(e)} id="Marque" value={dataE.Marque} defaultValue="Choose...">
                                        <option>Choose...</option>
                                        {marque.map(({ libelleMarque, _id }) => (
                                            <option value={_id}> {libelleMarque} </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                        </Form>
                    </DialogContent>

                    <DialogActions>
                        <button onClick={(e) => submitEdit(e)} className="btnEdit">Submit  </button>
                        <button onClick={handleClose} className="btnCancel"> Cancel  </button>
                    </DialogActions>
                </Dialog>
            </div>

            {/* delete Model */}
            <DialogDelete open={openDR} onClose={handleCloseD} title="Model" object="List"
                onClick1={() => submitDelete(idRow)}
                onClick2={handleCloseD} />

            {/* success delete snackbar*/}
            <SuccessSnackbare open={openS} onClose={handleCloseS} message="Model deleted successfuly" />
            {/* success Edit snackbar*/}
            <SuccessSnackbare open={openSE} onClose={handleCloseS} message="Model edited successfuly" />
            {/* success add snackbar*/}
            <SuccessSnackbare open={openSA} onClose={handleCloseS} message="Model added successfuly" />

            {/* warning Edit snackbar*/}
            <WarningSnackbar open={openWE} onClose={handleCloseS} message="Model already exists" />
            {/* warning add snackbar*/}
            <WarningSnackbar open={openWA} onClose={handleCloseS} message="Model already exists" />


            {/* error delete snackbar*/}
            <ErrorSnackbar open={openE} onClose={handleCloseS} message="Delete: Error" />
            {/* error Edit snackbar*/}
            <ErrorSnackbar open={openEE} onClose={handleCloseS} message="Edit: Error" />
            {/* error add snackbar*/}
            <ErrorSnackbar open={openEA} onClose={handleCloseS} message="Add: Error" />

        </>
    )
}
