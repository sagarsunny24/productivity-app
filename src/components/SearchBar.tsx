import { InputBase,Box,IconButton  } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'

export default function SearchBar() {
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
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      </Box>
  );
}
