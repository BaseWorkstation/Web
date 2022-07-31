import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpaceDetails, fetchSpaceServices } from "redux/slices/spaceSlice";

export default function useViewSpaceHook() {
  const { currentCheckIn, currentSpace, spaceServices, loading } = useSelector(
    (state) => state.spaces
  );
  const dispatch = useDispatch();
  const { query } = useRouter();

  useEffect(() => {
    if (query.id) {
      dispatch(fetchSpaceDetails({ id: query.id }));
      dispatch(fetchSpaceServices({ workstation_id: query.id }));
    }
  }, [query]);

  return {
    currentCheckIn,
    currentSpace,
    isLoading: loading === "VIEW_SPACE",
    spaceServices,
  };
}