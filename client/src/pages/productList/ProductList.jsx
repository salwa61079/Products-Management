import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
import { BsPlusSquareFill, BsSearch, BsWindowSidebar } from "react-icons/bs";
import IconButton from '@mui/material/IconButton';
import { Form, Col, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import image from '../../images/product.png';
import SuccessSnackbare from '../../components/snackbar/SuccessSnackbare';
import WarningSnackbar from '../../components/snackbar/WarningSnackbar';
import ErrorSnackbar from '../../components/snackbar/ErrorSnackbar';


import './productList.css'
import DialogDelete from "../../components/dialogDetete/DialogDelete";

export default function ProductList(props) {
  const [searchProduct, setSearchProduct] = useState([])
  //get all products  
  const [products, setProducts] = useState([])
  const [openDR, setOpenDR] = React.useState(false);
  const [idRow, setIdRow] = React.useState(false);
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(3)
  const [pages, setPages] = useState(0)
  //success snackbar
  const [openS, setOpenS] = React.useState(false);
  //error snackbar
  const [openE, setOpenE] = React.useState(false);

  useEffect(async () => {
    await axios.get('/api/product/allProducts')
      .then(res => {
        setProducts(res.data.allProducts)
        console.log(res)
        setPages(Math.round((res.data.allProducts.length / perPage) + 0.4))
      })
  }, [])



  const handlePageClick = async (data) => {
    // console.log(data.target.textContent)
    // let currentPage =data.target.textContent 
    let currentPage = data.selected
    setPage(currentPage)

  }

  function handleOpenD(id) {
    setIdRow(id);
    setOpenDR(true)
  };
  const handleCloseD = () => {
    setIdRow("")
    setOpenDR(false);
  };

  //delete product function
  function submitDelete(id) {
    axios.delete(`/api/product/removeProduct/${id}`)
      .then(res => {
        handleCloseD()
        console.log(res.data)
        setOpenS(true)
      })
      .catch(err => {
        handleCloseD()
        setOpenE(true)
      })
  }

  //Close product snackbar
  const handleCloseS = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenS(false);
    setOpenE(false);
  };

  const handleSearchTerm = (e) => {
    let value = e.target.value;
    setSearchProduct(value)
  };


  return (
    <>

      <div className="addP">
        <h5 className="titreAddP">Add Product</h5>
        <Link to="/addProduct" className="link">
          <button type="submit" className='addProduct' >
            <BsPlusSquareFill align="center" className='iconAdd' size='30px' color='green' />
          </button>
        </Link>
      </div>

      <div className="searchDiv">
        <Form >
          <Row>
            <Form.Group as={Col} className="mb-3" >
              <Form.Control style={{ width: "350px", height: "45px", marginLeft: "20px" }}
                placeholder="Research Product by code..."
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



      <div className="ProductList">
        <div className="featured ">
          {products
            .filter((val) => { return val.code.includes(searchProduct) })
            .slice(page * perPage, (page + 1) * perPage)
            .map(({ _id, code, description, prix, quantite }) => (

              <div className="featuredItem">
                <span className="featuredTitle">Product description: <br /> {description}</span>
                <div className="featuredContainer">
                  <span className="featuredImage">
                    <img className="photo" src={image} />
                  </span>
                </div>
                <span className="featuredSub">Code: {code}</span><br />
                <span className="featuredSub">Prix: {prix}</span><br />
                <span className="featuredSub">Quantity: {quantite}</span>

                <div className="featureButton">
                  <Link className="link"
                    to="/updateProduct"
                    state={{ idVal: { _id } }}>
                    <button className="productEdit">Edit</button>
                  </Link>

                  <button className="productDelete" onClick={() => handleOpenD(_id)}>Delete</button>
                </div>
              </div>

            ))
          }
        </div>

      </div>

      <div className="cardP">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pages}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={'pagination  justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link '}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link '}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link '}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link '}
          activeClassName={' '}
          size={'large'}

        />
      </div>

      {/* delete product */}
      <DialogDelete open={openDR} onClose={handleCloseD} title="Product" object="List"
        onClick1={() => submitDelete(idRow)}
        onClick2={handleCloseD} />

      {/* success delete snackbar*/}
      <SuccessSnackbare open={openS} onClose={handleCloseS} message="Product deleted successfuly" />

      {/* error delete snackbar*/}
      <ErrorSnackbar open={openE} onClose={handleCloseS} message="Delete: Error" />

    </>
  )
}
