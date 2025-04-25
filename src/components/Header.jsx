import image from "../assets/logo.jpg"

export default function Header(){
  return(
    <>
    <header className="header-container">
      <img src={image}/>
      <h1>Chef Claude</h1>
    </header>
    </>
  )
}