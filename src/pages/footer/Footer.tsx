import React from 'react';
import "./footer.css";
 const Footer =() =>{
  return (
    <footer className="footer">
    <div className="container">
     <div className="row">
       <div className="footer-col">
         <h4>BLOG APPLICATION</h4>
         <ul>
           <li><a href="#">about us</a></li>
           <li><a href="#">our services</a></li>
           <li><a href="#">privacy policy</a></li>
         </ul>
       </div>
       <div className="footer-col">
         <h4>Contact Us</h4>
         <ul>
           <li><a href="#"><p className='fa fa-home'> 59, Hayden Street,ON,Canada</p></a></li>
           <li><a href="#"><p className='fa fa-envelope'> mail@info.com</p></a></li>
           <li><a href="#"><p className='fa fa-phone'> +1(204)-321-1234</p></a></li>
         </ul>
       </div>
       <div className="footer-col">
         <h4>follow us</h4>
         <div className="social-links">
           <a href="#"><i className="fab fa-facebook-f"></i></a>
           <a href="#"><i className="fab fa-twitter"></i></a>
           <a href="#"><i className="fab fa-instagram"></i></a>
           <a href="#"><i className="fab fa-linkedin-in"></i></a>
         </div>
       </div>
       <div className="footer-col">
         <h4>Subscrib</h4>
         <p className='describ'>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
         <form action="#">
            <input className='form-input' type="text" placeholder="Email Address"/>
            <button><i className="fab fa-telegram-plane"></i></button>
         </form>
       </div>
     </div>
    </div>
 </footer>
  );
}

export default Footer;