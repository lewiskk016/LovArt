import {useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { searchRequest } from "../../store/searches";
import "./SearchBar.css";
import {useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



const SearchBar = () => {
    const [query, setQueryTerm] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const previousQuery = useRef(""); // Track the previous query value

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim === null) {
            history.push("/posts")
        }
        if (query.trim() === "" && previousQuery.current.trim() === "") {
            history.push("/posts")
    } else {
        dispatch(searchRequest(query));
        history.push(`/searches/${query}`);
    }
    };

    return (
        <div className="search-bar-container">
            <form onSubmit={handleSubmit}>
            <input
                className='search-text'
                type="text"
                placeholder="Search LovArt"
                value={query}
                onChange={(e) => setQueryTerm(e.target.value)}
            />
                 <button type="submit">
                    <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                </button>
            </form>
        </div>
    );
    }

export default SearchBar;
