
import './Topbar.css'
import Logo from './logo-Mobile-Snap.png';
import { Link } from 'react-router-dom'

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
          <div className="topLeft">
              <span >
              <img className='logo' src={Logo}/></span>

          </div>

     
          <div className="topRight">
              <div className="topbarIconContainer">
                  <Link to="/" className="link">
                  <span className="topbarListItem ">
                  {/* <LineStyle className="sidebarIcon"/> */}
                   Product List
                  </span>
                  </Link>
              </div>

              <div className="topbarIconContainer">
              <Link to="/categoryList" className="link">
                  <span className="topbarListItem">
                  {/* <Timeline className="sidebarIcon"/> */}
                   Category List
                  </span>
                  </Link>
              </div>

              <div className="topbarIconContainer">
                 <Link to="/caractList" className="link">
                  <span className="topbarListItem ">
                  {/* <LineStyle className="sidebarIcon"/> */}
                   Caracteristic List
                  </span>
                  </Link>
              </div>

              <div className="topbarIconContainer">
              <Link to="/variantList" className="link">
                  <span className="topbarListItem">
                  {/* <Timeline className="sidebarIcon"/> */}
                   Variation List
                  </span>
                  </Link>
              </div>

              <div className="topbarIconContainer">
                 <Link to="/brandList" className="link">
                  <span className="topbarListItem">
                  {/* <Timeline className="sidebarIcon"/> */}
                   Brand List
                  </span>
                  </Link>
              </div>

              <div className="topbarIconContainer">
                 <Link to="/modelList" className="link">
                  <span className="topbarListItem">
                  {/* <Timeline className="sidebarIcon"/> */}
                   Model List
                  </span>
                  </Link>
              </div>

             
          </div> 



      </div>
    </div>
  )
}
