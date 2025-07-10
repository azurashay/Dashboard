import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Tag, VStack, List, ListItem } from "@chakra-ui/react";

function PriorityRow({ rec }) {
  return (
    <Tr>
      <Td><Tag colorScheme={rec.priority === "Critical" ? "red" : "yellow"}>{rec.category}</Tag></Td>
      <Td>{rec.priority || rec.currentState || rec.currentChallenge || rec.currentGap || "-"}</Td>
      <Td>
        <List spacing={1}>
          {rec.actions.map((a, i) => <ListItem key={i}>• {a}</ListItem>)}
        </List>
      </Td>
    </Tr>
  );
}

function InitiativeRow({ rec }) {
  return (
    <Tr>
      <Td><Tag colorScheme="blue">{rec.category}</Tag></Td>
      <Td colSpan={2}>
        <List spacing={1}>
          {rec.initiatives.map((a, i) => <ListItem key={i}>• {a}</ListItem>)}
        </List>
      </Td>
    </Tr>
  );
}

export default function RecommendationsTable({ recommendations }) {
  return (
    <Box boxShadow="md" borderRadius="lg" p={4} bg="white">
      <Heading size="md" mb={2}>Strategic Recommendations</Heading>
      <Table variant="simple" size="sm" mb={4}>
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th>Status / Challenge</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {recommendations.immediatePriority.map((rec, idx) => (
            <PriorityRow rec={rec} key={idx} />
          ))}
        </Tbody>
      </Table>
      <Heading size="sm" mt={6} mb={2}>Long Term Initiatives</Heading>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th colSpan={2}>Initiatives</Th>
          </Tr>
        </Thead>
        <Tbody>
          {recommendations.longTermInitiatives.map((rec, idx) => (
            <InitiativeRow rec={rec} key={idx} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
} 