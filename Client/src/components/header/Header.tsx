import "./header.css";
const Header =() =>{
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React Application</span>
        <span className="headerTitleLg">FOOD BLOG</span>
      </div>
      <img
        className="headerImg"
        src="https://img.jakpost.net/c/2016/09/29/2016_09_29_12990_1475116504._large.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt=""
      />
    </div>
  );
}
export default Header;