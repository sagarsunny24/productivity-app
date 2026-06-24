import { BarChart } from "@mui/x-charts/BarChart";
import useTasks from "../hooks/useTasks";
import { Box } from "@mui/material";
import { PieChart, pieClasses } from "@mui/x-charts/PieChart";
import { ChartsBrushOverlay } from "@mui/x-charts/ChartsBrushOverlay";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";

import { useState } from "react";
export function BarChartComponent() {
  const { counts } = useTasks();
  return (
    <Box>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: [
              "Personal",
              "Social",
              "Health",
              "Finance",
              "Learning",
              "Work",
              "Other",
            ],
          },
        ]}
        series={[
          {
            label: "Urgent",
            color: "#DC2626",
            data: [
              counts.personal.urgent,
              counts.social.urgent,
              counts.health.urgent,
              counts.finance.urgent,
              counts.learning.urgent,
              counts.work.urgent,
              counts.other.urgent,
            ],
          },
          {
            label: "High",
            color: "#F97316",
            data: [
              counts.personal.high,
              counts.social.high,
              counts.health.high,
              counts.finance.high,
              counts.learning.high,
              counts.work.high,
              counts.other.high,
            ],
          },
          {
            label: "Medium",
            color: "#FACC15",
            data: [
              counts.personal.medium,
              counts.social.medium,
              counts.health.medium,
              counts.finance.medium,
              counts.learning.medium,
              counts.work.medium,
              counts.other.medium,
            ],
          },
          {
            label: "Low",
            color: "#22C55E",
            data: [
              counts.personal.low,
              counts.social.low,
              counts.health.low,
              counts.finance.low,
              counts.learning.low,
              counts.work.low,
              counts.other.low,
            ],
          },
        ]}
        height={300}
      />
    </Box>
  );
}

export function PieChartComponent() {
  const { counts } = useTasks();
  const data = [
    {
      id: 0,
      value: Math.round((counts.completedCount * 100) / counts.allCount),
      label: "Completed",
    },
    {
      id: 1,
      value: Math.round(
        ((counts.allCount - counts.completedCount) * 100) / counts.allCount,
      ),
      label: "Pending",
    },
  ];
  return (
    <Box>
      <PieChart
        series={[
          {
            data,
            arcLabel: (item) => `${item.value}%`,
            arcLabelMinAngle: 35,
            arcLabelRadius: "60%",
          },
        ]}
        width={200}
        height={200}
        sx={{
          [`& .${pieClasses.arcLabel}`]: {
            fontWeight: "bold",
          },
        }}
      />
    </Box>
  );
}

export function BrushChartComponent() {
  const { counts } = useTasks();
  return (
    <Box sx={{ width: "100%" }}>
      <BarChart
        height={300}
        series={[
          {
            data: counts.months || [],
            label: "Tasks",
          },
        ]}
        brushConfig={{ enabled: true }}
        xAxis={[{ data: xAxisData }]}
      >
        <ChartsBrushOverlay />
      </BarChart>
    </Box>
  );
}

const xAxisData = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface TitanicDatum {
  Category:
    | "Personal"
    | "Social"
    | "Health"
    | "Finance"
    | "Learning"
    | "Work"
    | "Other";
  Priority: "Urgent" | "High" | "Medium" | "Low";
  Count: number;
}

interface ChartDatum {
  id: string;
  label: string;
  value: number;
  percentage: number;
  color: string;
}

type ClassType =
  | "Personal"
  | "Social"
  | "Health"
  | "Finance"
  | "Learning"
  | "Work"
  | "Other";

// Convert hex color to rgba with opacity

const StyledText = styled("text")(({ theme }: { theme: Theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

interface PieCenterLabelProps {
  children: React.ReactNode;
}

function PieCenterLabel({ children }: PieCenterLabelProps): React.ReactElement {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

type ViewType = "class" | "survival";

export function FullPieComponent(): React.ReactElement {
  const { counts } = useTasks();
  const titanicData: TitanicDatum[] = [
    { Category: "Personal", Priority: "Urgent", Count: counts.personal.urgent },
    { Category: "Personal", Priority: "High", Count: counts.personal.high },
    { Category: "Personal", Priority: "Medium", Count: counts.personal.medium },
    { Category: "Personal", Priority: "Low", Count: counts.personal.low },
    { Category: "Social", Priority: "Urgent", Count: counts.social.urgent },
    { Category: "Social", Priority: "High", Count: counts.social.high },
    { Category: "Social", Priority: "Medium", Count: counts.social.medium },
    { Category: "Social", Priority: "Low", Count: counts.social.low },
    { Category: "Health", Priority: "Urgent", Count: counts.health.urgent },
    { Category: "Health", Priority: "High", Count: counts.health.high },
    { Category: "Health", Priority: "Medium", Count: counts.health.medium },
    { Category: "Health", Priority: "Low", Count: counts.health.low },
    { Category: "Finance", Priority: "Urgent", Count: counts.finance.urgent },
    { Category: "Finance", Priority: "High", Count: counts.finance.high },
    { Category: "Finance", Priority: "Medium", Count: counts.finance.medium },
    { Category: "Finance", Priority: "Low", Count: counts.finance.low },
    { Category: "Learning", Priority: "Urgent", Count: counts.learning.urgent },
    { Category: "Learning", Priority: "High", Count: counts.learning.high },
    { Category: "Learning", Priority: "Medium", Count: counts.learning.medium },
    { Category: "Learning", Priority: "Low", Count: counts.learning.low },
    { Category: "Work", Priority: "Urgent", Count: counts.work.urgent },
    { Category: "Work", Priority: "High", Count: counts.work.high },
    { Category: "Work", Priority: "Medium", Count: counts.work.medium },
    { Category: "Work", Priority: "Low", Count: counts.work.low },
    { Category: "Other", Priority: "Urgent", Count: counts.other.urgent },
    { Category: "Other", Priority: "High", Count: counts.other.high },
    { Category: "Other", Priority: "Medium", Count: counts.other.medium },
    { Category: "Other", Priority: "Low", Count: counts.other.low },
  ];

  const classes: ClassType[] = [
    "Personal",
    "Social",
    "Health",
    "Finance",
    "Learning",
    "Work",
    "Other",
  ];

  const totalCount = titanicData.reduce(
    (acc: number, item: TitanicDatum) => acc + item.Count,
    0,
  );

  // Define colors for each class
  const classColors: Record<ClassType, string> = {
    Personal: "#fa938e",
    Social: "#98bf45",
    Health: "#51cbcf",
    Finance: "#d397ff",
    Learning: "#4f8cff",
    Work: "#ff9f43",
    Other: "#7f8c8d",
  };
  const priorityColors = {
    Urgent: "#DC2626",
    High: "#F97316",
    Medium: "#FACC15",
    Low: "#22C55E",
  };

  // Different opacity based on class

  const classData: ChartDatum[] = classes.map((pClass: ClassType) => {
    const classTotal = titanicData
      .filter((item: TitanicDatum) => item.Category === pClass)
      .reduce((acc: number, item: TitanicDatum) => acc + item.Count, 0);
    return {
      id: pClass,
      label: `${pClass} Class:`,
      value: classTotal,
      percentage: (classTotal / totalCount) * 100,
      color: classColors[pClass],
    };
  });
  const priorityRank: Record<TitanicDatum["Priority"], number> = {
    Urgent: 0,
    High: 1,
    Medium: 2,
    Low: 3,
  };
  const classSurvivalData: ChartDatum[] = classes.flatMap(
    (pClass: ClassType) => {
      const classTotal =
        classData.find((d: ChartDatum) => d.id === pClass)!.value ?? 0;
      return titanicData
        .filter((item: TitanicDatum) => item.Category === pClass)
        .sort((a, b) => priorityRank[a.Priority] - priorityRank[b.Priority])
        .map((item: TitanicDatum) => ({
          id: `${pClass}-${item.Priority}`,
          label: item.Priority,
          value: item.Count,
          percentage: (item.Count / classTotal) * 100,
          color: priorityColors[item.Priority], // 80 is 50% opacity for 'No'
        }));
    },
  );

  // Create a simplified dataset that groups all classes together for Yes/No
  const priorityData: ChartDatum[] = [
    {
      id: "Urgent",
      label: "Urgent",
      value: titanicData
        .filter((i) => i.Priority === "Urgent")
        .reduce((sum, i) => sum + i.Count, 0),
      percentage: 0,
      color: priorityColors.Urgent,
    },
    {
      id: "High",
      label: "High",
      value: titanicData
        .filter((i) => i.Priority === "High")
        .reduce((sum, i) => sum + i.Count, 0),
      percentage: 0,
      color: priorityColors.High,
    },
    {
      id: "Medium",
      label: "Medium",
      value: titanicData
        .filter((i) => i.Priority === "Medium")
        .reduce((sum, i) => sum + i.Count, 0),
      percentage: 0,
      color: priorityColors.Medium,
    },
    {
      id: "Low",
      label: "Low",
      value: titanicData
        .filter((i) => i.Priority === "Low")
        .reduce((sum, i) => sum + i.Count, 0),
      percentage: 0,
      color: priorityColors.Low,
    },
  ];
  priorityData.forEach((item) => {
    item.percentage = totalCount === 0 ? 0 : (item.value / totalCount) * 100;
  });
  // Create dataset for class distribution by survival status (Yes first, then No)
  const priorityCategoryData: ChartDatum[] = titanicData
    .slice()
    .sort((a, b) => priorityRank[a.Priority] - priorityRank[b.Priority])
    .map((item) => {
      const priorityTotal =
        priorityData.find((d) => d.id === item.Priority)?.value ?? 0;

      return {
        id: `${item.Category}-${item.Priority}`,
        label: item.Category,
        value: item.Count,
        percentage:
          priorityTotal === 0 ? 0 : (item.Count / priorityTotal) * 100,
        color: classColors[item.Category],
      };
    });
  const [view, setView] = useState<ViewType>("class");
  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: ViewType | null,
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const innerRadius = 50;
  const middleRadius = 120;

  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <ToggleButtonGroup
        color="primary"
        size="small"
        value={view}
        exclusive
        onChange={handleViewChange}
      >
        <ToggleButton value="class">View by Category</ToggleButton>
        <ToggleButton value="survival">View by Priority</ToggleButton>
      </ToggleButtonGroup>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: 400,
          width: 400,
        }}
      >
        {view === "class" ? (
          <PieChart
            series={[
              {
                innerRadius,
                outerRadius: middleRadius,
                data: classData,
                arcLabel: (item) => String(item.id ?? ""),
                highlightScope: { fade: "global", highlight: "item" },
                highlighted: { additionalRadius: 2 },
                cornerRadius: 3,
              },
              {
                innerRadius: middleRadius,
                outerRadius: middleRadius + 20,
                data: classSurvivalData,
                arcLabel: (item) => {
                  const datum = item as unknown as ChartDatum;
                  return datum.value > totalCount * 0.05
                    ? `${datum.label} (${datum.percentage.toFixed(0)}%)`
                    : "";
                },
                arcLabelRadius: 160,
                highlightScope: { fade: "global", highlight: "item" },
                highlighted: { additionalRadius: 2 },
                cornerRadius: 3,
              },
            ]}
            sx={{
              [`& .${pieClasses.arcLabel}`]: {
                fontSize: "12px",
              },
            }}
            hideLegend
          >
            <PieCenterLabel>Category</PieCenterLabel>
          </PieChart>
        ) : (
          <PieChart
            series={[
              {
                innerRadius,
                outerRadius: middleRadius,
                data: priorityData,
                arcLabel: (item) => String(item.id ?? ""),
                highlightScope: { fade: "global", highlight: "item" },
                highlighted: { additionalRadius: 2 },
                cornerRadius: 3,
              },
              {
                innerRadius: middleRadius,
                outerRadius: middleRadius + 20,
                data: priorityCategoryData,
                arcLabel: (item) => {
                  const datum = item as unknown as ChartDatum;
                  return datum.value > totalCount * 0.05
                    ? `${datum.label} (${datum.percentage.toFixed(0)}%)`
                    : "";
                },
                arcLabelRadius: 160,
                valueFormatter: ({ value }) =>
                  `${value} out of ${totalCount} (${((value / totalCount) * 100).toFixed(0)}%)`,
                highlightScope: { fade: "global", highlight: "item" },
                highlighted: { additionalRadius: 2 },
                cornerRadius: 3,
              },
            ]}
            sx={{
              [`& .${pieClasses.arcLabel}`]: {
                fontSize: "12px",
              },
            }}
            hideLegend
          >
            <PieCenterLabel>Priority</PieCenterLabel>
          </PieChart>
        )}
      </Box>
    </Box>
  );
}
