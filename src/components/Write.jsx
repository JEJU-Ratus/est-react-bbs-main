import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export default function Write({ isModifyMode, boardId, handleCancel }) {
  let navigate = useNavigate();
  const [content, setContent] = useState({
    name: "",
    title: "",
    content: "",
    image: null,
  });

  const [removeImage, setRemoveImage] = useState(false);
  // 수정모드 진입여부
  useEffect(() => {
    if (isModifyMode && boardId) {
      // boardId로 서버에서 글 조회 결과로 content 업데이트
      axios
        .get(`${API_URL}/view?id=${boardId}`)
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
            image_path: _data.image_path || "", // 기존 이미지
            image: null, // 새 이미지
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
  const createFormData = (_validatedData, _id) => {
    const _formData = new FormData();
    _formData.append("writer", _validatedData.name);
    _formData.append("title", _validatedData.title);
    _formData.append("content", _validatedData.content);
    if (_id) {
      _formData.append("id", _id);
    }
    if (content.image) {
      // 새이미지
      _formData.append("image", content.image);
    }
    if (removeImage) {
      // 기존 이미지를 지운다.(true)
      _formData.append("remove_image", "1");
    }

    return _formData;
  };
  // 쓰기
  const write = e => {
    e.preventDefault();
    const validatedData = validate(e);
    if (!validatedData) return;

    const formData = createFormData(validatedData);

    // 새로운 값 추가.create(POST 이용)
    axios
      .post(`${API_URL}/write`, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
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
    const validatedData = validate(e);
    if (!validatedData) return;

    const formData = createFormData(validatedData, boardId);

    // 새로운 값 추가.create(POST 이용)
    axios
      .post(`${API_URL}/update`, formData, {
        headers: { "Content-type": "multipart/form-data" },
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
  const handleImageChange = e => {
    const file = e.target.files[0];
    setContent(prev => ({
      ...prev,
      image: file,
    }));
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
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>이미지 첨부</Form.Label>
          <Form.Control
            type="file"
            name="attachment"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>
        {content.image_path && (
          <div>
            <img
              src={`${API_URL}/${content.image_path}`}
              alt={content.title}
              style={{ maxWidth: "200px" }}
            />
            <Form.Check
              type="checkbox"
              id={`default-check`}
              label={"기존 이미지 제거"}
              onChange={e => {
                setRemoveImage(e.target.checked);
              }}
            />
          </div>
        )}
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
