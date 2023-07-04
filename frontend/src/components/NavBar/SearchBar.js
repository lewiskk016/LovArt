import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchRequest } from "../../store/searches";
import "./SearchBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  const [query, setQueryTerm] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      history.push("/posts");
    } else {
      dispatch(searchRequest(query));
      history.push(`/searches/${query}`);
    }
  };

  useEffect(() => {
    if (!location.pathname.startsWith("/searches")) {
      setQueryTerm("");
    }
  }, [location]);

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit}>
        <input
          className='search-text'
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQueryTerm(e.target.value)}
        />
        {/* <button type="submit">
          <FontAwesomeIcon icon={faSearch} className="search-icon"/>
        </button> */}
      </form>
    </div>
  );
};

export default SearchBar;
