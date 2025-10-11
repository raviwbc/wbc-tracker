// useResponsiveSize.js
import { useTheme, useMediaQuery } from "@mui/material";

export const useResponsiveSize = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return isSmall ? "small" : "medium";
};
