import React, { Component } from "react";
import PropTypes from "prop-types";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";

class CharList extends Component {
  state = {
    characters: [],
    loading: true,
    newItemLoading: false,
    error: false,
    offset: 400,
    charEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateCharacters();
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharactersLoaded)
      .catch(this.onError);
  };

  onLoading = () => {
    this.setState({ loading: true, error: false });
  };

  onCharListLoading = () => {
    this.setState({ newItemLoading: true, error: false });
  };

  onCharactersLoaded = (newCharacters) => {
    let ended = false;
    if (newCharacters.length < 9) {
      ended = true;
    }
    this.setState(({ offset, characters }) => ({
      characters: [...characters, ...newCharacters],
      loading: false,
      error: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  updateCharacters = () => {
    this.onLoading();
    this.marvelService
      .getAllCharacters()
      .then(this.onCharactersLoaded)
      .catch(this.onError);
  };

  onError = () => {
    console.log("error");
    this.setState({ error: true, loading: false });
  };

  render() {
    const { characters, loading, error, newItemLoading, offset, charEnded } =
      this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? (
      <View
        characters={characters}
        onCharSelected={this.props.onCharSelected}
        selectedCharID={this.props.selectedChar}
      />
    ) : null;
    return (
      <div className="char__list">
        {spinner}
        {errorMessage}
        <ul className="char__grid">{content}</ul>
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          onClick={() => this.onRequest(offset)}
          style={{ display: charEnded ? "none" : "block" }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

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
