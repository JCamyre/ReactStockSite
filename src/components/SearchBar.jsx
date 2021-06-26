import React from 'react';
import styled from 'styled-components';
import { IoClose, IoSearch } from "react-icons/io5";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "react-click-outside-hook";
import { useEffect } from "react";
import { useRef } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { useDebounce } from "../hooks/debounceHook";
import StockElement from './StockElement';
import axios from 'axios';

// Credit: https://www.youtube.com/watch?v=IlnmWntmUns

const SearchBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 34em;
    height: 3.8em;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
    overflow: hidden;
`;

const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 4em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 21px;
  color: #12112e;
  font-weight: 500;
  border-radius: 6px;
  background-color: transparent;

  &:focus {
      outline: none;
      &::placeholder {
        opacity: 0;
      }
  }

  &::placeholder{
      color: #bebebe;
      transition: all 250ms ease-in-out;
  }
`;

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 27px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
`;

const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 23px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  &:hover {
    color: #dfdfdf;
  }
`;

const LineSeperator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d878;
`;

const SearchContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WarningMessage = styled.span`
  color: #a1a1a1;
  font-size: 14px;
  display: flex;
  align-self: center;
  justify-self: center;
`;

const containerVariants = {
  expanded: {
    height: "30em",
  },
  collapsed: {
    height: "3.8em",
  },
};

const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

export default function SearchBar() {
  // Setting state
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [tickers, setTickers] = useState([]);
  const [noTickers, setNoTickers] = useState(false);

  const isEmpty = !tickers || tickers.length === 0;

  // Assuming this deals with user inputting value to SearchInput, updating SearchQuery whenever user inputs value
  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.trim() === "") setNoTickers(false);

    setSearchQuery(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearchQuery('');
    setLoading(false);
    setNoTickers(false);
    setTickers([]);
    if (inputRef.current) inputRef.current.value = '';
  };

  // Don't know what useEffect() is doing here
  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  const prepareSearchQuery = (query) => {
    const url = `http://localhost:8000/stocks/get-searched-stock?queried_ticker=${query}`;

    return encodeURI(url); // string -> URI
  };

  const searchTicker = async () => {
    if (!searchQuery || searchQuery.trim() === "") return;

    setLoading(true);
    console.log('Start loading tickers');
    setNoTickers(false);

    const URL = prepareSearchQuery(searchQuery);

    const response = await axios.get(URL).catch((err) => {
      console.log("Error: ", err);
    });

    if (response) {
      console.log("Response: ", response.data);
      if (response.data && response.data.length === 0) setNoTickers(true);

      console.log(response.data.queried_ticker);
      response.data.queried_ticker.map((stock) => {
      console.log(stock.ticker);
      });
      console.log(response.data);
      setTickers(response.data);
    }

    setLoading(false);
    console.log('Finished loading');

  };

  useDebounce(searchQuery, 500, searchTicker);

  return (
    <SearchBarContainer
      animate={isExpanded ? 'expanded' : 'collapsed'}
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}
    >
      <SearchInputContainer>
        <SearchIcon>
          <IoSearch />
        </SearchIcon>
        <SearchInput 
          placeholder='Search for a stock'
          onFocus={expandContainer}
          ref={inputRef}
          value={searchQuery}
          onChange={changeHandler}
        />
        <AnimatePresence>
          {isExpanded && (
            <CloseIcon
              key='close-icon'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{opacity: 0 }}
              onClick={collapseContainer}
              transition={{ duration: 0.2 }}
            >
              <IoClose />
            </CloseIcon>
          )}
        </AnimatePresence>
      </SearchInputContainer>
      {isExpanded && <LineSeperator />}
      {isExpanded && (
        <SearchContent>
          {isLoading && (
            <LoadingWrapper>
              <MoonLoader loading color='#000' size={20} />
            </LoadingWrapper>
          )}
          {!isLoading && isEmpty && !noTickers && (
            <LoadingWrapper>
              <WarningMessage>Start typing to Search</WarningMessage>
            </LoadingWrapper>
          )}
          {!isLoading && !noTickers && (
            <>
              {tickers.queried_ticker.map((stock) => (
                <StockElement
                  ticker={stock.ticker}
                  name='company'
                />
              ))}
            </>
          )}
        </SearchContent>
      )}
    </SearchBarContainer>
  )
}