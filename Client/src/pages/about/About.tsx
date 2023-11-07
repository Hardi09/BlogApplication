
import "./about.css";
const About = ()=>{
        return (
        <div>
<h2 className="mainHeading">TEAM INTRODUCTION OF BLOG APPLICATION </h2>
<br/>
<div className="row">
  <div className="column">
    <div className="card">
      <img className="imgClass" src="https://cdn2.iconfinder.com/data/icons/flat-style-svg-icons-part-1/512/users_group_people_friends-512.png" alt="Jane"/>
      <div className="container">
        <h2>VASYL</h2>
        <p className="title">DEVELOPER</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>example@example.com</p>
        <p><button className="button">Contact</button></p>
      </div>
    </div>
  </div>
  <div className="column">
    <div className="card">
      <img  src="https://cdn.pixabay.com/photo/2017/03/31/17/44/avatar-2191933_960_720.png" alt="Mike"/>
      <div className="container">
        <h2>HARDI</h2>
        <p className="title">DEVELOPER</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>example@example.com</p>
        <p><button className="button">Contact</button></p>
      </div>
    </div>
  </div>
  
  <div className="column">
    <div className="card">
      <img className="imgClass" src="https://cdn4.iconfinder.com/data/icons/people-std-pack/512/girl-512.png" alt="John"/>
      <div className="container">
        <h2>AYCAN</h2>
        <p className="title">DEVELOPER</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>example@example.com</p>
        <p><button className="button">Contact</button></p>
      </div>
    </div>
  </div>
</div>
				</div>
        )
}
export default About;