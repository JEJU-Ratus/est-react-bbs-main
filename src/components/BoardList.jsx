import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function Board({ data }) {
  return (
    <tr>
      <td>
        <Form.Check />
      </td>
      <td>{data.id}</td>
      <td>
        <Link to={`/view/${data.id}`}>{data.title}</Link>
      </td>
      <td>{data.writer}</td>
      <td>{data.date}</td>
    </tr>
  );
}

export default function BoardList({ handleCancel }) {
  const [list, setList] = useState([]);
  // 가져오기. read에 가까운
  useEffect(() => {
    axios
      .get("http://localhost:3000/list", {})
      .then(response => {
        console.log(response.data);
        setList(response.data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log("전체 게시글 로드");
      });
  }, []);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>선택</th>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan={5}>글이 없습니다.</td>
            </tr>
          ) : (
            list.map((item, idx) => <Board data={item} key={idx} />)
          )}
        </tbody>
      </Table>
      <div className="d-flex gap-1 justify-content-end">
        <Link to="/write" className="btn btn-primary" onClick={handleCancel}>
          입력
        </Link>
        <Button variant="danger">삭제</Button>
      </div>
    </>
  );
}
