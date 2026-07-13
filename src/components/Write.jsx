import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function Write() {
  const onSubmit = e => {
    e.preventDefault();

    // 새로운 값 추가.create(POST 이용)
    axios
      .post("http://localhost:3000/write", {
        name: e.target.name.value,
        title: e.target.title.value,
        content: e.target.content.value,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log("추가완료");
      });
  };
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>글쓴이</Form.Label>
          <Form.Control type="text" name="name" placeholder="이름을 입력하세요." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" name="title" placeholder="제목을 입력하세요." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" name="content" rows={3} />
        </Form.Group>
        <div className="d-flex gap-1 justify-content-end">
          <Button variant="primary" type="submit">
            입력
          </Button>
          <Button variant="danger">취소</Button>
        </div>
      </Form>
    </>
  );
}
