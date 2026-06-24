import {
  BarChartComponent,
  PieChartComponent,
  BrushChartComponent,
  FullPieComponent,
} from "../components/DashboardCharts";
import { Card, CardContent, Typography,Box } from "@mui/material";
import StatHeader from "../components/StatHeader";

export default function ChartsPage() {
  return (
    <>
      <StatHeader />
      <Box sx={{ display: "flex",
    flexWrap: "wrap",
    gap: 3,
    alignItems: "stretch",}}>
 <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          display: "flex",
          borderRadius: 3,
          minWidth: 180,
          maxWidth: 400,
          minHeight: 200,
          maxHeight:400,
          mb: 10,
        }}
      >
        <CardContent>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "text.secondary",
            }}
          >
            Distribution across categories and priority
          </Typography>
          <BarChartComponent />
        </CardContent>
      </Card>
       <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems:'center',
          justifyContent:'center',
          borderRadius: 3,
          minWidth: 600,
          maxWidth: 900,
          minHeight: 200,
          maxHeight:600,
          mb: 10,
        }}
      >
        <CardContent sx={{alignItems:'center'}}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "text.secondary",
              paddingBottom: 5
            }}
          >
            Category breakdown
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: "text.secondary",
              paddingBottom: 1
            }}
          >
            Category vs priority donut chart
          </Typography>
           <FullPieComponent />
        </CardContent>
      </Card>
      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          display: "flex",
          borderRadius: 3,
          minWidth: 180,
          maxWidth: 400,
          minHeight: 200,
          maxHeight:300,
          mb: 10,
        }}
      >
        <CardContent sx={{width:'100%'}}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "text.secondary",
            }}
          >
            Overall Task Completion
          </Typography>
          <PieChartComponent />
        </CardContent>
      </Card>
      </Box>
     <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          display: "flex",
          borderRadius: 3,
          minWidth: 180,
          maxWidth: 400,
          minHeight: 200,
          maxHeight:400,
          mb: 10,
        }}
      >
        <CardContent sx={{width:'100%'}}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "text.secondary",
            }}
          >
            Distribution over time in months
          </Typography>
         <BrushChartComponent />
        </CardContent>
      </Card>

     
     
    </>
  );
}
