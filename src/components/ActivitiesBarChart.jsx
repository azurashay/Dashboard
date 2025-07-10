import { Box, Heading } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LabelList } from "recharts";

const truncate = (str, n) => (str.length > n ? str.slice(0, n - 1) + "…" : str);

export default function ActivitiesBarChart({ topActivities }) {
  const data = topActivities.map(a => ({ name: truncate(a.activity, 18), value: a.count }));
  return (
    <Box boxShadow="md" borderRadius="lg" p={4} bg="white">
      <Heading size="md" mb={2}>Top Activities</Heading>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={data} layout="vertical" margin={{ left: 60, right: 20, top: 20, bottom: 20 }} barCategoryGap={18}>
          <XAxis type="number" fontSize={14} />
          <YAxis dataKey="name" type="category" width={140} fontSize={14} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#3182ce" radius={[0, 8, 8, 0]}>
            <LabelList dataKey="value" position="right" style={{ fontSize: 13, fill: '#222' }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
} 