import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoreSpaces, fetchSpaces } from "redux/slices/spaceSlice";
import debounce from "lodash.debounce";

export default function useListSpacesHook() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedSpace, setSelectedSpace] = useState(null);
  const { spaces, loading } = useSelector((state) => state.spaces);
  const { userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { data, links, meta } = spaces;

  const debouncedOnChange = useCallback(
    debounce((value) => {
      dispatch(
        fetchSpaces({
          keywords: value,
          paginate: true,
          paginate_per_page: 10,
        })
      );
    }, 300),
    []
  );

  useEffect(() => {
    if (!spaces.data.length) {
      dispatch(fetchSpaces({ paginate: true, paginate_per_page: 10 }));
    }
  }, []);

  const handleFetchMoreSpaces = () => {
    dispatch(
      fetchMoreSpaces({
        page: meta.current_page + 1,
        fetchPayload: {
          keywords: searchValue,
          paginate: true,
          paginate_per_page: 10,
        },
      })
    );
  };

  const spacesWithFormattedCoordinates = data.map((space) => {
    const { coordinates } = space;
    const [lat, lng] = coordinates.split(", ").map((str) => {
      return Number(str);
    });

    return { ...space, coordinates: { lat, lng } };
  });

  return {
    spaces: spacesWithFormattedCoordinates,
    isLoading: loading === "FETCH_SPACES",
    handleFetchMoreSpaces,
    hasMore: links?.next,
    debouncedOnChange,
    searchValue,
    setSearchValue,
    resultCount: meta?.total,
    isAlreadyCheckedIn: userDetails?.check_in_status,
    selectedSpace,
    setSelectedSpace,
  };
}
