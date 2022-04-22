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
import './variantList.css'
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


export default function VariantList() {
    const [rows, setRows] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const [openD, setOpenD] = React.useState(false);
    const [openDR, setOpenDR] = React.useState(false);
    const [idRow, setIdRow] = React.useState(false);
    const [searchVariation, setSearchVariation] = useState([])
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
        Label: "",
        Value: ""
    })
    const [dataE, setDataE] = useState({
        Label: "",
        Value: ""
    })
    const [variation, setVariation] = useState({})

    const handleChangePage = (event, newPage) => { setPage(newPage); };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function getVariantById(id) {
        console.log("idd", id)
        axios.get(`/api/variation/oneVariation/${id}`)
            .then(res => {
                setVariation(res.data.oneVariation)
                console.log("variation id", res.data.oneVariation)
                setDataE({
                    Label: res.data.oneVariation.label,
                    Value: res.data.oneVariation.value
                })
            })
    }

    //get all variations 
    useEffect(async () => {

        //variations
        await axios.get('/api/variation/allVariations').then(res => {
            setRows(res.data.allVariations)
            console.log("variation with list Products ", res)
        })
    },[])

    //add variation function
    function submit(e) {
        axios.post('/api/variation/addVariation', {
            label: data.Label,
            value: data.Value
        })
            .then(res => {
                console.log(res.data)
                setOpenSA(true)
            })
            .catch(err => {
                if (err.response.data.message === "variation already exists") { setOpenWA(true) }
                else { setOpenEA(true) }
            })
    }

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    //edit variation function
    function submitEdit(e) {
        console.log("variationId", variation._id)
        axios.put(`/api/variation/editVariation/${variation._id}`, {
            label: dataE.Label,
            value: dataE.Value
        })
            .then(res => {
                handleClose()
                console.log(res.data)
                setOpenSE(true)
                setTimeout(() => {  window.location.reload(false); }, 1800);
            })
            .catch(err => {
                handleClose()
                if (err.response.data.message === "variation already exists") { setOpenWE(true) }
                else { setOpenEE(true) }
            })
    }

    function handleEdit(e) {
        const editData = { ...dataE }
        editData[e.target.id] = e.target.value
        setDataE(editData)
        console.log(editData)
    }

    //delete variation function
    function submitDelete(id) {
        axios.delete(`/api/variation/removeVariation/${id}`)
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

     //Close variation snackbar
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
        getVariantById(id);
    };

    const handleClose = () => {
        setOpenD(false);
    };

    function handleOpenD (id)  {
        setIdRow(id);
        setOpenDR(true)
    };
    const handleCloseD = () => {
        setIdRow("")
        setOpenDR(false);
    };

    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchVariation(value)
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
                    <TableCell options={{ sorting: true }}>{row.label}</TableCell>
                    <TableCell options={{ sorting: true }}>{row.value}</TableCell>
                    <TableCell >{row.produits.length} </TableCell>
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
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Product List
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Code</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell >Qantity</TableCell>
                                            <TableCell > price ($)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.produits.map(({ _id, code, description, quantite, prix }) => (
                                            <TableRow key={_id}>
                                                <TableCell component="th" scope="row">
                                                    {code}
                                                </TableCell>
                                                <TableCell>{description}</TableCell>
                                                <TableCell >{quantite}</TableCell>
                                                <TableCell >
                                                    {prix}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>

            </React.Fragment>

        );
    }


    return (
        <>
            {/* add variation */}
            <div >
                <h3 className="titre">Variation List</h3>
                <div className='cardA'>
                    <Form onSubmit={(e) => submit(e)} >
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                            </Form.Group>
                            <Form.Group as={Col} >
                            </Form.Group>
                            <Form.Group as={Col} >
                                <h5 className="titreAdd">Add Variation</h5>
                            </Form.Group>

                            <FormGroup as={Col} className="categoryLabel" label="Name" type="text" onChange={(e) => handle(e)} id="Label" value={data.Label} placeholder="Enter Name" />
                            <FormGroup as={Col} className="categoryLabel" label="Value" type="text" onChange={(e) => handle(e)} id="Value" value={data.Value} placeholder="Enter Value" />

                            <Form.Group as={Col} className="mb-3">
                                <button type="submit" className='btnAdd' >
                                    <BsPlusSquareFill align="center" className='iconAdd' size='25px' color='green' />
                                </button>

                            </Form.Group>
                        </Row>
                    </Form>
                </div>

            </div>

            {/* search caracteristic */}
            <ResearchGroup placeholder="Research variation by name ... " onChange={handleSearchTerm} />

            {/* list variation */}
            <div >
                <TableContainer component={Paper}  >
                    <Table aria-label="collapsible table" >
                        <TableHead className='head'>
                            <TableRow className="headItem">
                                <TableCell />
                                <TableCell >Variation ID</TableCell>
                                <TableCell >Variation Name</TableCell>
                                <TableCell >Variation Value</TableCell>
                                <TableCell >Product Number</TableCell>
                                <TableCell >Edit</TableCell>
                                <TableCell >Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .filter((val) => { return val.label.includes(searchVariation) })
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((allVariation) => (<Rows key={allVariation._id} row={allVariation} />
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

            {/* edit Variation dialog*/}
            <div>
                <Dialog open={openD} onClose={handleClose} fullWidth maxWidth="sm" >
                    <DialogTitle>Edit Variation</DialogTitle>
                    <DialogContent>
                        <Form  >
                            <Row className="mb-3">
                                <FormGroup as={Col} label="Name" onChange={(e) => handleEdit(e)} id="Label" value={dataE.Label} type="text" placeholder="Enter Name"/>
                                <FormGroup as={Col} label="Value" onChange={(e) => handleEdit(e)} id="Value" value={dataE.Value} type="text" placeholder="Value" />
                            </Row>
                        </Form>
                    </DialogContent>

                    <DialogActions>
                        <button onClick={(e) => submitEdit(e)} className="btnEdit">Submit  </button>
                        <button onClick={handleClose} className="btnCancel"> Cancel  </button>
                    </DialogActions>
                </Dialog>
            </div>

             {/* delete Variation */}
           <DialogDelete open={openDR} onClose={handleCloseD} title="Variation" object="List" 
                         onClick1={() => submitDelete(idRow)}
                         onClick2={handleCloseD} />

                               {/* success delete snackbar*/}
            <SuccessSnackbare open={openS} onClose={handleCloseS} message="Variation deleted successfuly" />
            {/* success Edit snackbar*/}
            <SuccessSnackbare open={openSE} onClose={handleCloseS} message="Variation edited successfuly" />
            {/* success add snackbar*/}
            <SuccessSnackbare open={openSA} onClose={handleCloseS} message="Variation added successfuly" />

            {/* warning Edit snackbar*/}
            <WarningSnackbar open={openWE} onClose={handleCloseS} message="Variation already exists" />
            {/* warning add snackbar*/}
            <WarningSnackbar open={openWA} onClose={handleCloseS} message="Variation already exists" />


            {/* error delete snackbar*/}
            <ErrorSnackbar open={openE} onClose={handleCloseS} message="Delete: Error" />
            {/* error Edit snackbar*/}
            <ErrorSnackbar open={openEE} onClose={handleCloseS} message="Edit: Error" />
            {/* error add snackbar*/}
            <ErrorSnackbar open={openEA} onClose={handleCloseS} message="Add: Error" />

        </>
    )
}
