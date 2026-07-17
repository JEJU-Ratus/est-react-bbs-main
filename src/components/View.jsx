import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export default function View({ handleModify }) {
  const [content, setContent] = useState({
    writer: "",
    title: "",
    content: "",
    date: "",
    image: null,
  });
  const { id } = useParams();
  const [isError, setIsError] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${API_URL}/view?id=${id}`)
      .then(response => {
        // console.log(response.data);
        // response.data가 없거나, 배열의 개수가 0과 같다면
        if (!response.data || response.data.length === 0) {
          setIsError(true);
          return;
        }
        const _data = response.data[0];
        setContent({
          writer: _data.writer,
          title: _data.title,
          content: _data.content,
          date: _data.date,
          image: _data.image_path,
        });
      })
      .catch(error => {
        console.error(error);
        setIsError(true);
      })
      .finally(() => {
        console.log("상세페이지 로드");
      });
  }, []);
  if (isError) {
    return (
      <div>
        <p>잘못된 접근입니다.</p>
        <p>다시 확인해주세요.</p>
        <Link to="/" className="btn btn-primary ">
          홈으로 이동
        </Link>
      </div>
    );
  }
  const handleClick = () => {
    handleModify(id);
  };
  const handleDelete = () => {
    if (window.confirm("정말 삭제할까요?")) {
      axios
        .post(`${API_URL}/delete`, {
          id: id,
        })
        .then(() => {
          navigate("/");
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          console.log("수정 완료");
        });
    }
  };
  return (
    <>
      <h2>{content.title}</h2>
      <div className="d-flex justify-content-between">
        <p>글쓴이 : {content.writer}</p>
        <p>{content.date}</p>
      </div>
      <hr />
      {content.content}
      {content.image && (
        <div>
          <img
            src={`${API_URL}/${content.image}`}
            alt={content.title}
            style={{ maxWidth: "80%" }}
          />
        </div>
      )}
      <hr />
      <div className="d-flex gap-1 justify-content-end">
        <Link to="/" className="btn btn-primary">
          홈
        </Link>
        <Button variant="secondary" onClick={handleClick}>
          수정
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          삭제
        </Button>
      </div>
    </>
  );
}
