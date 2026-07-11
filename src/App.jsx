import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BoardList from "../components/BoardList";

function App() {
  return (
    <div className="container">
      <h1>React BBS</h1>
      <BoardList />
    </div>
  );
}

export default App;
