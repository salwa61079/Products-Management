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
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { BsPlusSquareFill, BsFillCaretDownFill, BsFillCaretUpFill, BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { Form, Col, Row } from 'react-bootstrap';
import './brandList.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ResearchGroup from '../../components/researchGroup/ResearchGroup';
import FormGroup from '../../components/formGroup/FormGroup';
import DialogDelete from '../../components/dialogDetete/DialogDelete';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress'
import SuccessSnackbare from '../../components/snackbar/SuccessSnackbare';
import WarningSnackbar from '../../components/snackbar/WarningSnackbar';
import ErrorSnackbar from '../../components/snackbar/ErrorSnackbar';

export default function BrandList() {
    const [rows, setRows] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const [openD, setOpenD] = React.useState(false);
    const [openDR, setOpenDR] = React.useState(false);
    const [idRow, setIdRow] = React.useState(false);
    const [data, setData] = useState({ LibelleMarque: "" })
    const [dataE, setDataE] = useState({ LibelleMarque: "" })
    const [brand, setBrand] = useState({})
    const [searchBrand, setSearchBrand] = useState([])
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

    const handleChangePage = (event, newPage) => { setPage(newPage); };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function getBrandById(id) {
        console.log("idd", id)
        axios.get(`/api/brand/oneBrand/${id}`)
            .then(res => {
                setBrand(res.data.oneMarque)
                console.log("brand id", res.data.oneMarque)
                setDataE({ LibelleMarque: res.data.oneMarque.libelleMarque })
            })
    }

    //get all brands 
    useEffect(async () => {

        //brands
        await axios.get('/api/brand/allBrandsProductsModels').then(res => {
            setRows(res.data.MarquesModelesProduit)
            console.log("brands with list Products and models", res)
        })
    },[])

    //add brand function
    function submit(e) {
        axios.post('/api/brand/addbrand', {
            libelleMarque: data.LibelleMarque
        })
            .then(res => {                
                console.log(res.data)
                setOpenSA(true)
            })
            .catch(err => {
                if(err.response.data.message === "brand already exists"){setOpenWA(true)}
                else {setOpenEA(true)}
           })
    }

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    //edit brand function
    function submitEdit(e)  {
        console.log("brandId", brand._id)
        axios.put(`/api/brand/editBrand/${brand._id}`, {
            libelleMarque: dataE.LibelleMarque
        })  
            .then(res => {
                handleClose()
                console.log(res.data)
                setOpenSE(true)    
                setTimeout(() => {  window.location.reload(false); }, 1800);       
                 })
            .catch(err => {
                 handleClose()
                 if(err.response.data.message === "brand already exists"){setOpenWE(true)}
                 else {setOpenEE(true)}                 
            })
                        
    }

    function handleEdit(e) {
        const editData = { ...dataE }
        editData[e.target.id] = e.target.value
        setDataE(editData)
        console.log(editData)
    }

    function handleOpenD(id) {
        setIdRow(id);
        setOpenDR(true)
    };
    const handleCloseD = () => {
        setIdRow("")
        setOpenDR(false);
    };

    //delete brand function
    function submitDelete(id) {
        axios.delete(`/api/brand/removeBrand/${id}`)
            .then(res => {
                handleCloseD()
                console.log(res.data)
                 setOpenS(true)      
                 setTimeout(() => {  window.location.reload(false); }, 1800);
                  })
            .catch(err => {
                setOpenE(true)
            })
            }

    //functions of dialog
    function handleClickOpen(id) {
        setOpenD(true);
        getBrandById(id);
    };

    const handleClose = () => {
        setOpenD(false);
    };

    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchBrand(value)
    };

    //Close brand snackbar
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
                    <TableCell options={{ sorting: true }}>{row.libelleMarque}</TableCell>
                    <TableCell >{row.produits.length} </TableCell>
                    <TableCell >{row.modeles.length} </TableCell>
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
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
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
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Model List
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Libelle</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.modeles.map(({ _id, libelleModele }) => (
                                            <TableRow key={_id}>
                                                <TableCell component="th" scope="row">
                                                    {libelleModele}
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
            {/* add brand */}
            <div >
                <h3 className="titre">Brand List</h3>
                <div className='cardA'>
                    <Form onSubmit={(e) => submit(e)} >
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                            </Form.Group>
                            <Form.Group as={Col} >
                            </Form.Group>
                            <Form.Group as={Col} >
                                <h5 className="titreAdd">Add Brand</h5>
                            </Form.Group>

                            <FormGroup as={Col} className="categoryLabel" label="Brand name" type="text" onChange={(e) => handle(e)} id="LibelleMarque" value={data.LibelleMarque} placeholder="Enter Name" />

                            <Form.Group as={Col} className="mb-3">
                                <button type="submit" className='btnAdd' >
                                    <BsPlusSquareFill align="center" className='iconAdd' size='25px' color='green' />
                                </button>
                            </Form.Group>
                        </Row>
                    </Form>
                </div>

            </div>

            {/* search brand */}
            <ResearchGroup placeholder="Research brand by name" onChange={handleSearchTerm} />

            {/* list brand */}
            <div >
                <TableContainer component={Paper}  >
                    <Table aria-label="collapsible table" >
                        <TableHead className='head'>
                            <TableRow className="headItem">
                                <TableCell />
                                <TableCell >Brand ID</TableCell>
                                <TableCell >Brand Name</TableCell>
                                <TableCell >Product Number</TableCell>
                                <TableCell >Model Number</TableCell>
                                <TableCell >Edit</TableCell>
                                <TableCell >Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .filter((val) => { return val.libelleMarque.includes(searchBrand) })
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((MarquesModelesProduit) => (<Rows key={MarquesModelesProduit._id} row={MarquesModelesProduit} />
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


            {/* edit brand dialog*/}
            <div>
                <Dialog open={openD} onClose={handleClose} fullWidth maxWidth="sm" >
                    <DialogTitle>Edit Brand</DialogTitle>
                    <DialogContent>
                        <Form  >
                            <Row className="mb-3">
                                <FormGroup as={Col} label="Brand name" onChange={(e) => handleEdit(e)} id="LibelleMarque" value={dataE.LibelleMarque} type="text" placeholder="Enter Name" />
                            </Row>
                        </Form>
                    </DialogContent>

                    <DialogActions>
                        <button onClick={(e) => submitEdit(e)} className="btnEdit">Submit  </button>
                        <button onClick={handleClose} className="btnCancel"> Cancel  </button>
                    </DialogActions>
                </Dialog>
            </div>

            {/* delete brand */}
            <DialogDelete open={openDR} onClose={handleCloseD} title="Brand" object="List"
                onClick1={() => submitDelete(idRow)}
                onClick2={handleCloseD} />

            {/* success delete snackbar*/}
            <SuccessSnackbare open={openS} onClose={handleCloseS} message="Brand deleted successfuly" />
            {/* success Edit snackbar*/}
            <SuccessSnackbare open={openSE} onClose={handleCloseS} message="Brand edited successfuly" />
            {/* success add snackbar*/}
            <SuccessSnackbare open={openSA} onClose={handleCloseS} message="Brand added successfuly" />

            {/* warning Edit snackbar*/}
            <WarningSnackbar open={openWE} onClose={handleCloseS} message="Brand already exists" />
            {/* warning add snackbar*/}
            <WarningSnackbar open={openWA} onClose={handleCloseS} message="Brand already exists" />


            {/* error delete snackbar*/}
            <ErrorSnackbar open={openE} onClose={handleCloseS} message="Delete: Error" />
            {/* error Edit snackbar*/}
            <ErrorSnackbar open={openEE} onClose={handleCloseS} message="Edit: Error" />
            {/* error add snackbar*/}
            <ErrorSnackbar open={openEA} onClose={handleCloseS} message="Add: Error" />


        </>


    )
}



