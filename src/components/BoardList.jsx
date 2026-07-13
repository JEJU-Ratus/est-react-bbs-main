import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function BoardList() {
  const SimpleTest = () => {
    axios
      .get("http://localhost:3000/", {})
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log("Request completed");
      });
  };

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
          <tr>
            <td>
              <Form.Check disabled />
            </td>
            <td>1</td>
            <td>안녕</td>
            <td>홍길동</td>
            <td>2026.07.02</td>
          </tr>
          <tr>
            <td>
              <Form.Check disabled />
            </td>
            <td>1</td>
            <td>안녕</td>
            <td>홍길동</td>
            <td>2026.07.02</td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex gap-1 justify-content-end">
        <Button variant="primary" onClick={SimpleTest}>
          입력
        </Button>
        <Button variant="secondary">수정</Button>
        <Button variant="danger">삭제</Button>
      </div>
    </>
  );
}
