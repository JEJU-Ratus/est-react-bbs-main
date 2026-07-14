import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function Write({ isModifyMode, boardId, handleCancel }) {
  let navigate = useNavigate();
  const [content, setContent] = useState({
    name: "",
    title: "",
    content: "",
  });
  useEffect(() => {
    if (isModifyMode && boardId) {
      // boardId로 서버에서 글 조회 결과로 content 업데이트
      axios
        .get(`http://localhost:3000/view?id=${boardId}`)
        .then(response => {
          // console.log(response.data);
          // response.data가 없거나, 배열의 개수가 0과 같다면
          if (!response.data || response.data.length === 0) {
            return;
          }
          const _data = response.data[0];
          setContent({
            name: _data.writer,
            title: _data.title,
            content: _data.content,
            date: _data.date,
          });
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          console.log("수정페이지 로드");
        });
    }
  }, []);

  const validate = e => {
    const name = e.target.name.value.trim();
    const title = e.target.title.value.trim();
    const content = e.target.content.value.trim();
    if (!name || !title || !content) {
      alert("모든 내용을 작성해주세요.");
      return null;
    }
    return { name, title, content };
  };
  // 쓰기
  const write = e => {
    e.preventDefault();
    const formData = validate(e);
    if (!formData) return;

    // 새로운 값 추가.create(POST 이용)
    axios
      .post("http://localhost:3000/write", formData)
      .then(() => {
        handleCancel();
        navigate("/");
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log("추가완료");
      });
  };
  // 수정
  const update = e => {
    e.preventDefault();
    const formData = validate(e);
    if (!formData) return;
    // 새로운 값 추가.create(POST 이용)
    axios
      .post("http://localhost:3000/update", {
        ...formData,
        id: boardId,
      })
      .then(() => {
        handleCancel();
        navigate("/");
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log("수정 완료");
      });
  };

  const handleClick = () => {
    handleCancel();
    navigate(`/view/${boardId}`);
  };
  return (
    <>
      <h2 className="mb-3">{isModifyMode ? "글 수정" : "글 쓰기"}</h2>
      <Form onSubmit={isModifyMode ? update : write}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>글쓴이</Form.Label>
          <Form.Control
            type="text"
            name="name"
            defaultValue={content.name}
            placeholder="이름을 입력하세요."
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            name="title"
            defaultValue={content.title}
            placeholder="제목을 입력하세요."
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            defaultValue={content.content}
            rows={3}
            required
          />
        </Form.Group>
        <div className="d-flex gap-1 justify-content-end">
          <Button variant="primary" type="submit">
            입력
          </Button>
          <Button variant="danger" onClick={handleClick}>
            취소
          </Button>
        </div>
      </Form>
    </>
  );
}
