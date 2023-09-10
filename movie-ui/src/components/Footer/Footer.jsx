import React from 'react';
import './Footer.css'
function Footer() {
    return (
        // <footer style={footerStyle}>
        //   <div className="container text-center">
        //     <p>&copy; {new Date().getFullYear()} BOLETO</p>
        //   </div>
        // </footer>
        <footer>
            <div class="footer">
                {/* <div class="row">
                    <a href="#"><i class="fa fa-facebook"></i></a>
                    <a href="#"><i class="fa fa-instagram"></i></a>
                    <a href="#"><i class="fa fa-youtube"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                </div> */}

                <div class="row">
                    <ul>
                        <li><a href="#">Contact us</a></li>
                        <li><a href="#">Our Services</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Career</a></li>
                    </ul>
                </div>

                <div class="row" style={{justifyContent:'center'}}>
                     Copyright © {new Date().getFullYear()} BOLETO - All rights reserved || Designed By: Anant Sharma
                </div>
            </div>
        </footer>

    );
}



export default Footer;
