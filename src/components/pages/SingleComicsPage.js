import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService";
import "./singleComicsPage.scss";

const SingleComicsPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState({});

  const { error, loading, getComic, clearError } = useMarvelService();

  useEffect(() => {
    onRequest();
    // eslint-disable-next-line
  }, []);

  const onRequest = () => {
    clearError();
    getComic(comicId).then(onComicLoaded);
  };

  const onComicLoaded = (loadedChar) => {
    console.log(loadedChar);
    setComic(loadedChar);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading) ? <View comic={comic} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  return (
    <div className="single-comic" key={comic.id}>
      <img src={comic.thumbnail} alt="x-men" className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{comic.title}</h2>
        <p className="single-comic__descr">{comic.description}</p>
        <p className="single-comic__descr">{comic.pages} pages</p>
        <p className="single-comic__descr">Language: {comic.languages}</p>
        <div className="single-comic__price">{comic.price}</div>
      </div>
      <Link to="../comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicsPage;
