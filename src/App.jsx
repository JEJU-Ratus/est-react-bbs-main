import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import BoardList from "./components/BoardList";
import Write from "./components/Write";
import View from "./components/View";
import { useState } from "react";

function App() {
  const [boardId, setBoardId] = useState(0);
  const [isModifyMode, setIsModifyMode] = useState(false);
  const navigate = useNavigate();

  // 수정할 게시글 ID 받아오기
  const handleModify = _id => {
    setBoardId(_id); // id
    setIsModifyMode(true); // 수정모드로 변경(true)
    navigate("/write");
  };
  // 모드 및 id 기본값으로
  const handleCancel = () => {
    setBoardId(0);
    setIsModifyMode(false);
  };
  return (
    <div className="container">
      <h1>React BBS</h1>
      <Routes>
        <Route path="/" element={<BoardList handleCancel={handleCancel} />} />
        <Route
          path="/write"
          element={
            <Write isModifyMode={isModifyMode} boardId={boardId} handleCancel={handleCancel} />
          }
        />
        <Route path="/view/:id" element={<View handleModify={handleModify} />} />
      </Routes>
    </div>
  );
}

export default App;
