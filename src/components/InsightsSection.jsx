import { Box, Heading, VStack, Text, List, ListItem, Tag } from "@chakra-ui/react";

export default function InsightsSection({ insights }) {
  return (
    <Box boxShadow="md" borderRadius="lg" p={4} bg="white">
      <Heading size="md" mb={2}>Key Insights</Heading>
      <VStack align="start" spacing={3} mb={4}>
        {insights.keyFindings.map((f, idx) => (
          <Box key={idx}>
            <Tag colorScheme="blue" mr={2}>{f.finding}</Tag>
            <Text as="span" fontWeight="bold">{f.data}:</Text> {f.implication}
          </Box>
        ))}
      </VStack>
      <Heading size="sm" mb={2}>Opportunities</Heading>
      <List spacing={2}>
        {insights.opportunities.map((o, idx) => (
          <ListItem key={idx}>
            <Tag colorScheme={o.potential === "High" ? "green" : "yellow"} mr={2}>{o.potential}</Tag>
            <b>{o.opportunity}:</b> {o.rationale}
          </ListItem>
        ))}
      </List>
    </Box>
  );
} 