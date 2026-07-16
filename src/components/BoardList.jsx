import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;

function Board({ data, onCheckBoxChange }) {
  return (
    <tr>
      <td>
        <Form.Check
          onChange={e => {
            onCheckBoxChange(e.target.checked, data.id);
          }}
        />
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
  console.log("로딩");
  const [list, setList] = useState([]);
  const [checkList, setCheckList] = useState([]);

  const getList = useCallback(() => {
    axios
      .get(`${API_URL}/list`, {})
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
  // 가져오기. read에 가까운
  useEffect(() => {
    getList();
  }, [getList]);
  // check 해서 삭제하기(체크된 id 배열에 담기)
  const onCheckBoxChange = (checked, id) => {
    setCheckList(prev => {
      if (checked) {
        return [...prev, id];
      } else {
        return prev.filter(item => item !== id);
      }
    });
  };
  const handleDelete = () => {
    if (checkList.length === 0) {
      alert("삭제 할 글을 선택해주세요.");
      return;
    } else {
      const boardIdList = checkList.join();
      axios
        .post(`${API_URL}/deleteselect`, { boardIdList })
        .then(() => {
          getList();
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          console.log("삭제 완료");
        });
    }
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
          {list.length === 0 ? (
            <tr>
              <td colSpan={5}>글이 없습니다.</td>
            </tr>
          ) : (
            list.map((item, idx) => (
              <Board data={item} key={idx} onCheckBoxChange={onCheckBoxChange} />
            ))
          )}
        </tbody>
      </Table>
      <div className="d-flex gap-1 justify-content-end">
        <Link to="/write" className="btn btn-primary" onClick={handleCancel}>
          입력
        </Link>
        <Button variant="danger" onClick={handleDelete}>
          삭제
        </Button>
      </div>
    </>
  );
}
