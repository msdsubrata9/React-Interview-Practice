import "./App.css";
import TrafficLight from "./components/firstDemo/TrafficLight";
const TrafficLights = [
  {
    color: "red",
    time: 4000, // 4 sec
    order: 1,
    displayOrder: 3,
  },
  {
    color: "yellow",
    time: 1000, // 1 sec
    order: 3,
    displayOrder: 1,
  },
  {
    color: "green",
    time: 2000, // 2 sec
    order: 2,
    displayOrder: 2,
  },
];
function App() {
  return (
    <>
      <TrafficLight data={TrafficLights} />
    </>
  );
}

export default App;
