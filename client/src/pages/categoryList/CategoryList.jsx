
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
import { BsPlusSquareFill, BsSearch, BsFillCaretDownFill, BsFillCaretUpFill, BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { Form, Col, Row } from 'react-bootstrap';
import './categoryList.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '../../components/formGroup/FormGroup';
import DialogDelete from '../../components/dialogDetete/DialogDelete';
import SuccessSnackbare from '../../components/snackbar/SuccessSnackbare';
import WarningSnackbar from '../../components/snackbar/WarningSnackbar';
import ErrorSnackbar from '../../components/snackbar/ErrorSnackbar';

export default function CategoryList() {
    const [rows, setRows] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const [openD, setOpenD] = React.useState(false);
    const [openDR, setOpenDR] = React.useState(false);
    const [idRow, setIdRow] = React.useState(false);
    const [data, setData] = useState({ LibelleCategorie: "" })
    const [dataE, setDataE] = useState({ LibelleCategorie: "" })
    const [category, setCategory] = useState({})
    const [searchCategory, setSearchCategory] = useState([])
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

    function getCategoryById(id) {
        console.log("idd", id)
        axios.get(`/api/category/oneCategory/${id}`)
            .then(res => {
                setCategory(res.data.oneCategory)
                console.log("categories id", res.data.oneCategory)
                setDataE({ LibelleCategorie: res.data.oneCategory.libelleCategorie })
            })


    }

    //get all categories 
    useEffect(async () => {

        //categories
        await axios.get('/api/category/allCategoriesProducts').then(res => {
            setRows(res.data.allCategoriesP)
            console.log("categories with list Products", res)
        })
    },[])

    //add category functions
    function submit(e) {
        axios.post('/api/category/add', {
            libelleCategorie: data.LibelleCategorie
        })
            .then(res => {
                console.log(res.data)
                setOpenSA(true)
            })
            .catch(err => {
                if (err.response.data.message === "category already exists") { setOpenWA(true) }
                else { setOpenEA(true) }
            })
    }

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    //edit category function
    function submitEdit(e) {
        console.log("catId", category._id)
        axios.put(`/api/category/editCategory/${category._id}`, {
            libelleCategorie: dataE.LibelleCategorie

        })
            .then(res => {
                handleClose()
                console.log(res.data)
                setOpenSE(true)
                setTimeout(() => {  window.location.reload(false); }, 1800);
            })
            .catch(err => {
                handleClose()
                if (err.response.data.message === "category already exists") { setOpenWE(true) }
                else { setOpenEE(true) }
            })
    }

    function handleEdit(e) {
        const editData = { ...dataE }
        editData[e.target.id] = e.target.value
        setDataE(editData)
        console.log(editData)
    }

    //delete category function
    function submitDelete(id) {
        axios.delete(`/api/category/removeCategory/${id}`)
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
    //Close category snackbar
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
        getCategoryById(id);
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
                    <TableCell options={{ sorting: true }}>{row.libelleCategorie}</TableCell>
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
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Products
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

    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchCategory(value)
    };

    return (
        <>
            {/* add category */}
            <div >
                <h3 className="titre">Category List</h3>
                <div className='cardA'>
                    <Form onSubmit={(e) => submit(e)} >
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                            </Form.Group>
                            <Form.Group as={Col} >
                            </Form.Group>
                            <Form.Group as={Col} >
                                <h5 className="titreAdd">Add Category</h5>
                            </Form.Group>

                            <FormGroup as={Col} className="categoryLabel" label="Category name" type="text" onChange={(e) => handle(e)} id="LibelleCategorie" value={data.LibelleCategorie} placeholder="Enter Name" />

                            <Form.Group as={Col} className="mb-3">
                                <button type="submit" className='btnAdd' >
                                    <BsPlusSquareFill align="center" className='iconAdd' size='25px' color='green' />
                                </button>

                            </Form.Group>
                        </Row>
                    </Form>
                </div>

            </div>

            {/* search category */}
            <div className="searchDiv">
                <Form >
                    <Row>
                        <Form.Group as={Col} className="mb-3" >
                            <Form.Control style={{ width: "350px", height: "45px", marginLeft: "20px" }}
                                placeholder="Research Category by name..."
                                onChange={handleSearchTerm} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <button className='iconSearch'  >
                                <BsSearch align="center" size='25px' />
                            </button>
                        </Form.Group>
                    </Row>
                </Form>
            </div>


            {/* list category */}
            <div >
                <TableContainer component={Paper}  >
                    <Table aria-label="collapsible table" >
                        <TableHead className='head'>
                            <TableRow className="headItem">
                                <TableCell />
                                <TableCell >Category ID</TableCell>
                                <TableCell >Category Name</TableCell>
                                <TableCell >Product Number</TableCell>
                                <TableCell >Edit</TableCell>
                                <TableCell >Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .filter((val) => { return val.libelleCategorie.includes(searchCategory) })
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((allCategoriesP) => (<Rows key={allCategoriesP._id} row={allCategoriesP} />
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

            {/* edit category dialog*/}
            <div>
                <Dialog open={openD} onClose={handleClose} fullWidth maxWidth="sm" >
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogContent>
                        <Form  >
                            <Row className="mb-3">
                                <FormGroup as={Col} label="Category name" onChange={(e) => handleEdit(e)} id="LibelleCategorie" value={dataE.LibelleCategorie} type="text" placeholder="Enter Name" />
                            </Row>
                        </Form>
                    </DialogContent>

                    <DialogActions>
                        <button onClick={(e) => submitEdit(e)} className="btnEdit">Submit  </button>
                        <button onClick={handleClose} className="btnCancel"> Cancel  </button>
                    </DialogActions>
                </Dialog>
            </div>

            {/* delete Category */}
            <DialogDelete open={openDR} onClose={handleCloseD} title="Category" object="List"
                onClick1={() => submitDelete(idRow)}
                onClick2={handleCloseD} />

            {/* success delete snackbar*/}
            <SuccessSnackbare open={openS} onClose={handleCloseS} message="Category deleted successfuly" />
            {/* success Edit snackbar*/}
            <SuccessSnackbare open={openSE} onClose={handleCloseS} message="Category edited successfuly" />
            {/* success add snackbar*/}
            <SuccessSnackbare open={openSA} onClose={handleCloseS} message="Category added successfuly" />

            {/* warning Edit snackbar*/}
            <WarningSnackbar open={openWE} onClose={handleCloseS} message="Category already exists" />
            {/* warning add snackbar*/}
            <WarningSnackbar open={openWA} onClose={handleCloseS} message="Category already exists" />


            {/* error delete snackbar*/}
            <ErrorSnackbar open={openE} onClose={handleCloseS} message="Delete: Error" />
            {/* error Edit snackbar*/}
            <ErrorSnackbar open={openEE} onClose={handleCloseS} message="Edit: Error" />
            {/* error add snackbar*/}
            <ErrorSnackbar open={openEA} onClose={handleCloseS} message="Add: Error" />

        </>
    )
}


