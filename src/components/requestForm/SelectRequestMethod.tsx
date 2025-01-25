import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCondRequestMethod } from "../../store/conditions-slice";
import { setFirstRequestRequestMethod } from "../../store/firstRequest-slice";
import { RequestMethod } from "../../types/requestMethod";

export default function SelectRequestMethod() {
  const dispatch = useAppDispatch();
  const isFirstReqActive = useAppSelector(
    (state) => state.firstRequest.isActive
  );

  const reqMethod = useAppSelector((state) => {
    if (isFirstReqActive) {
      return state.firstRequest.request.method;
    } else {
      return state.conditions.conditions.find(
        (condItem) => condItem.id === state.conditions.currentCondition
      )!.request.method;
    }
  });

  const [method, setMethod] = useState<RequestMethod>(reqMethod);

  useEffect(() => {
    setMethod(reqMethod);
  }, [reqMethod]);

  const handleChange = (event: SelectChangeEvent) => {
    if (isFirstReqActive) {
      return dispatch(
        setFirstRequestRequestMethod(event.target.value as RequestMethod)
      );
    } else {
      return dispatch(
        setCondRequestMethod(event.target.value as RequestMethod)
      );
    }
  };

  return (
    <Box sx={{ margin: "10px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Method</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={method}
          label="method"
          onChange={handleChange}
        >
          <MenuItem value={"POST"}>POST</MenuItem>
          <MenuItem value={"GET"}>GET</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
