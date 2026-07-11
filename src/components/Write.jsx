import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Write() {
  return (
    <>
      <Form>
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
      </Form>
      <div className="d-flex gap-1 justify-content-end">
        <Button variant="primary">입력</Button>
        <Button variant="danger">취소</Button>
      </div>
    </>
  );
}
