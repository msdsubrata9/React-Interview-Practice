import Carousel from "./components/firstDemo/Carousel";
import One from "./assets/One.png";
import Two from "./assets/Two.png";
import Three from "./assets/Three.png";
import Four from "./assets/Four.jpg";
import Five from "./assets/Five.png";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Carousel>
        <img id="slideImg0" src={One} />
        <img id="slideImg1" src={Two} />
        <img id="slideImg2" src={Three} />
        <img id="slideImg3" src={Four} />
        <img id="slideImg4" src={Five} />
      </Carousel>
    </div>
  );
}

export default App;
