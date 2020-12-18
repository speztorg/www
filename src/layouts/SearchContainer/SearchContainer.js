import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Card, SearchBar } from "components";
import { CardsContainer } from "layouts";
import styles from "./SearchContainer.module.scss";

const SearchContainer = ({ cardsToDisplay, searchInput, onSearch }) => {
  const [searchValue, setSearchValue] = useState(searchInput);
  const [cards, setCards] = useState(cardsToDisplay);
  const store = useSelector((state) => state);

  useEffect(() => setSearchValue(store.searches.latestInput), [
    store.searches.latestInput
  ]);

  const onSearchChange = (event) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  };

  const cardsPlaceholder = () => {
    return store.searches.isFetching ? (
      <p>LOADING</p>
    ) : (
      <p>Engar niðurstöður</p>
    );
  };
  if (cardsToDisplay !== cards) {
    setCards(cardsToDisplay);
  }
  return (
    <div className={styles.search_container_root}>
      <div className={styles.search_bar}>
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          onClearClicked={() => {
            setSearchValue("");
            onSearch("");
          }}
        />
        {cards ? (
          <SearchBar.Results number={`${Object.values(cards).length}`} />
        ) : null}
      </div>
      <CardsContainer>
        {cards
          ? Object.values(cards).map((card, i) => {
              return (
                <Card
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  title={card.title}
                  description={card.description}
                  years={card.years}
                  months={card.months}
                  linkToProfile={{
                    userName: card.userName,
                    experienceId: card.experienceId
                  }}
                />
              );
            })
          : cardsPlaceholder()}
      </CardsContainer>
    </div>
  );
};

export default SearchContainer;

SearchContainer.propTypes = {
  cardsToDisplay: PropTypes.array,
  onSearch: PropTypes.func.isRequired,
  searchInput: PropTypes.string
};

SearchContainer.defaultProps = {
  cardsToDisplay: [],
  searchInput: null
};
