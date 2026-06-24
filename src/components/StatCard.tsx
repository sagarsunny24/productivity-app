import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

interface StatCardProps {
  title?: string;
  value?: number;
  total?: number; // used to drive the progress bar
  subtitle?: string; // e.g. "↑ 4% from last week"
  icon?: SvgIconComponent;
  color?: "success" | "error" | "warning" | "info";
}
const colorMap = {
  success: { bg: "success.light", icon: "success.main", bar: "success.main" },
  error: { bg: "error.light", icon: "error.main", bar: "error.main" },
  warning: { bg: "warning.light", icon: "warning.main", bar: "warning.main" },
  info: { bg: "info.light", icon: "info.main", bar: "info.main" },
};
const StatCard = ({
  title = "Completed",
  value = 72,
  total = 100,
  subtitle = "",
  icon: Icon,
  color = "success",
}: StatCardProps) => {
  const c = colorMap[color];
  const pct = total > 0 ? Math.round((value / total) * 100) : value;
  return (
    <Card
    elevation={0}
      sx={{
        border:'1px solid',
        borderColor:'divider',
        display: "flex",
       borderRadius:3,
       minWidth: 180,
       
      }}
    >

        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
          <Stack direction="row" spacing={2} sx={{alignItems:'center', justifyContent:'space-between',mb:1.5}}>
            <Typography variant="caption"  sx={{
               fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "text.secondary",
            }}>
              {title}
            </Typography>
            {Icon && (
              <Box
              sx={{
                width:32,
                height:32,
                borderRadius:2,
                color:c.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Icon sx={{ fontSize: 18, color: c.icon }} />
              </Box>
            )}
          </Stack>

          <Stack direction='row' sx={{alignItems:'baseline',mb:1.5}} spacing={0.5}>
<Typography variant="h3" sx={{fontWeight:500,lineHeight:1}}>
            {value}
          </Typography>
           <Typography variant="body1" color="text.secondary">
            {value === total?'':'%'}
          </Typography>
          </Stack>
          <Box
          sx={{
            height:4,
            borderRadius:99,
            bgcolor:'action.hover',
            overflow:'hidden',
            mb:1

          }}>
            <Box  sx={{
              width: `${pct}%`,
              height:'100%',
              bgcolor:c.bar,
              borderRadius: 99,
              transition: "width 0.4s ease",
            }}/>
          </Box>
           {subtitle && (
          <Typography variant="caption" sx={{ color: c.icon }}>
            {subtitle}
          </Typography>
        )}
        </CardContent>
    </Card>
  );
};

export default StatCard;
