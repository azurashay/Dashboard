import { Box, Heading } from "@chakra-ui/react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3182ce", "#2ecc40", "#ffbb28"];

export default function DevicePieChart({ deviceDistribution }) {
  const data = [
    { name: "Mobile", value: deviceDistribution.mobile.percentage },
    { name: "Desktop", value: deviceDistribution.desktop.percentage },
    { name: "Tablet", value: deviceDistribution.tablet.percentage }
  ];
  return (
    <Box boxShadow="md" borderRadius="lg" p={4} bg="white">
      <Heading size="md" mb={2}>Device Distribution</Heading>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
} 