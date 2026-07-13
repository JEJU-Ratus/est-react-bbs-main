import Button from "react-bootstrap/Button";
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function View() {
  const [content, setContent] = useState({
    writer: "",
    title: "",
    content: "",
    date: "",
  });
  const { id } = useParams();
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/view?id=${id}`)
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
        });
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        console.log("요청완료");
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
  return (
    <>
      <h2>{content.title}</h2>
      <div className="d-flex justify-content-between">
        <p>글쓴이 : {content.writer}</p>
        <p>{content.date}</p>
      </div>
      <hr />
      {content.content}
      <hr />
      <div className="d-flex gap-1 justify-content-end">
        <Link to="/" className="btn btn-primary">
          홈
        </Link>
        <Button variant="secondary">수정</Button>
        <Button variant="danger">삭제</Button>
      </div>
    </>
  );
}
