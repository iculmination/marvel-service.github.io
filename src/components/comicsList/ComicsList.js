import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import "./comicsList.scss";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const ComicsList = (props) => {
  const { loading, error, getAllComics, clearError } = useMarvelService();
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(5000);
  const [newItemLoading, setNewItemLoading] = useState(false);

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line
  }, []);

  const onRequest = (offset, initial) => {
    clearError();
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset).then(onComicsLoaded);
  };

  const onComicsLoaded = (loadedComics) => {
    console.log(loadedComics);
    setComics([...comics, ...loadedComics]);
    setOffset(offset + 8);
    setNewItemLoading(false);
  };

  const content = <View comics={comics} />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      <ul className="comics__grid">{content}</ul>
      <button
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
        disabled={newItemLoading}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

const View = ({ comics }) => {
  return comics.map((item) => {
    return (
      <li className="comics__item" key={item.id}>
        <Link to={`/comics/${item.id}`}>
          <img
            src={item.thumbnail}
            alt={item.title}
            className="comics__item-img"
          />
          <div className="comics__item-name">{item.title}</div>
          <div className="comics__item-price">{item.price}</div>
        </Link>
      </li>
    );
  });
};

export default ComicsList;
