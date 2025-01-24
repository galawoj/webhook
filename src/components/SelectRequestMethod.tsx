import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCondRequestMethod } from "../store/conditions-slice";
import { setFirstRequestRequestMethod } from "../store/firstRequest-slice";
import { RequestMethod } from "../types/requestMethod";

export default function SelectRequestMethod({
  mode,
}: {
  mode: "firstReq" | "condReq";
}) {
  const dispatch = useAppDispatch();

  const reqMethod = useAppSelector((state) => {
    if (mode === "firstReq") {
      return state.firstRequest.request.method;
    } else if (mode === "condReq") {
      return state.conditions.conditions.find(
        (condItem) => condItem.id === state.conditions.currentCondition
      )!.request.method;
    }
    return "POST";
  });

  const [method, setMethod] = useState<RequestMethod>(reqMethod);

  useEffect(() => {
    setMethod(reqMethod);
  }, [reqMethod]);

  const handleChange = (event: SelectChangeEvent) => {
    if (mode === "firstReq") {
      return dispatch(
        setFirstRequestRequestMethod(event.target.value as RequestMethod)
      );
    } else if (mode === "condReq") {
      return dispatch(
        setCondRequestMethod(event.target.value as RequestMethod)
      );
    }
    setMethod(event.target.value as RequestMethod);
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
