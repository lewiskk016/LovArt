
export const GET_SEARCH_RESULTS = 'search/GET_SEARCH_RESULTS';

export const getSearchResults = (results) => ({
    type: GET_SEARCH_RESULTS,
    results
});

export const searchRequest = (query) => async (dispatch) => {
    try {
      const res = await fetch(`/api/searches/search?q=${query}`);

      if (!res.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await res.json();

      dispatch(getSearchResults(data));
    } catch (error) {
      console.error(error);
    }
  };

const initialState = {};
const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SEARCH_RESULTS:
            return { ...state, ...action.results };
        default:
            return state;
    }
}

export default searchReducer;
