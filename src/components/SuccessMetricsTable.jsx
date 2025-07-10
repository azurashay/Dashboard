import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Tag } from "@chakra-ui/react";

export default function SuccessMetricsTable({ successMetrics }) {
  return (
    <Box boxShadow="md" borderRadius="lg" p={4} bg="white">
      <Heading size="md" mb={2}>Success Metrics</Heading>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Metric</Th>
            <Th>Current</Th>
            <Th>Target</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {successMetrics.primaryKPIs.map((kpi, idx) => (
            <Tr key={idx}>
              <Td><Tag colorScheme="blue">{kpi.metric}</Tag></Td>
              <Td>{kpi.current || "-"}</Td>
              <Td>{kpi.target || "-"}</Td>
              <Td>{kpi.description || "-"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box mt={4} fontSize="sm" color="gray.600">
        <b>Secondary Metrics:</b> {successMetrics.secondaryMetrics.join(", ")}
      </Box>
    </Box>
  );
} 