import { InputBase,Box,IconButton  } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'

import { useContext, } from "react";
import { AuthContext } from "../context/AuthContext";

export default function SearchBar() {
  const auth = useContext(AuthContext)
  const searchQuery = auth?.searchQuery
  const setSearchQuery = auth?.setSearchQuery
 console.log("searching for",searchQuery)
  return (
  <Box sx={(theme) => ({
        m: 2,
        display: "flex",
        alignItems: "center",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "6px",
        padding: "4px 8px",
        backgroundColor: theme.palette.background.paper,

        "&:hover": {
          borderColor: theme.palette.primary.main,
        },
      })}>
    <InputBase
        sx={{ ml: 1, flex: 1}}
        placeholder="Search tasks"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={searchQuery}
        onChange={(e)=>setSearchQuery?.(e.target.value)}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      </Box>
  );
}
