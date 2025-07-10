import { Box, Heading } from "@chakra-ui/react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3182ce", "#2ecc40", "#ffbb28", "#e53e3e", "#805ad5"];

export default function VisitorPieChart({ visitorSegmentation }) {
  const data = Object.entries(visitorSegmentation).map(([key, val]) => ({ name: key, value: val.percentage }));
  return (
    <Box boxShadow="md" borderRadius="lg" p={4} bg="white">
      <Heading size="md" mb={2}>Visitor Segmentation</Heading>
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