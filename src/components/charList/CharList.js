import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";

const CharList = (props) => {
  const [characters, setCharacters] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(400);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters, clearError } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line
  }, []);

  const onRequest = (offset, initial) => {
    clearError();
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset).then(onCharactersLoaded);
  };

  const onCharactersLoaded = (newCharacters) => {
    if (!newCharacters) return;
    let ended = false;
    if (newCharacters.length < 9) {
      ended = true;
    }
    setCharacters([...characters, ...newCharacters]);
    setNewItemLoading(false);
    setOffset(offset + 9);
    setCharEnded(ended);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  const content = (
    <View
      characters={characters}
      onCharSelected={props.onCharSelected}
      selectedCharID={props.selectedChar}
    />
  );
  return (
    <div className="char__list">
      {spinner}
      {errorMessage}
      <ul className="char__grid">{content}</ul>
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        onClick={() => onRequest(offset)}
        style={{ display: charEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

const View = ({ characters, onCharSelected, selectedCharID }) => {
  return characters.map((char) => (
    <li
      key={char.id}
      className={`char__item ${
        selectedCharID === char.id ? "char__item_selected" : ""
      }`}
      onClick={() => onCharSelected(char.id)}
      tabIndex="0"
    >
      <img src={char.thumbnail} alt={char.name} />
      <div className="char__name">{char.name}</div>
    </li>
  ));
};

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};

export default CharList;
