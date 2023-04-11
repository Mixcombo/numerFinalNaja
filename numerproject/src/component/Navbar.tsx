import { Link } from "react-router-dom"
import '../css/Navbar.css'

function Navbar() {
  return (
    <div>
        <nav className="navbar">
            <h2>Numerical Method</h2>
            <div className="dropdown-container">
                <div style={{fontWeight:"bold", marginBottom:"7px"}}><Link to="/">Home</Link></div>
                <div className="dropdown">
                  <button className="dropbtn">RootOfEquation</button>
                  <div className="dropdown-content">
                    <Link to="/bisection">Bisection</Link>
                    <Link to="/falseposition">False Position</Link>
                    <Link to="/onepoint">OnePoint Iteration</Link>
                    <Link to="/newtonraphson">Newton Raphson</Link>
                    <Link to="/secant">Secant Method</Link>
                  </div>
                </div>
                <div className="dropdown">
                  <button className="dropbtn">LinearAlgebra</button>
                  <div className="dropdown-content">
                    <Link to="/gaussseidel">Gauss-Seidel</Link>
                    <Link to="/test2">Test2</Link>
                    <Link to="/test3">Test3</Link>
                    <Link to="/test4">Test4</Link>
                  </div>
                </div>
                <div className="dropdown">
                  <button className="dropbtn">Regression</button>
                  <div className="dropdown-content">
                    <Link to="/multilinear">Multiple Linear</Link>
                    <Link to="/multitest">ใส่</Link>
                    <Link to="/test3">ไว้</Link>
                    <Link to="/test4">เฉยๆ</Link>
                  </div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar