import { SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, Box } from "@chakra-ui/react";

export default function KPISection({ report }) {
  const metrics = report.performanceMetrics;
  const conversion = metrics.conversionAnalysis;
  return (
    <SimpleGrid columns={[2, null, 4]} spacing={6} my={6}>
      <Stat>
        <StatLabel>Conversion Rate</StatLabel>
        <StatNumber>{conversion.conversionRate}%</StatNumber>
        <StatHelpText>Target: 2-3%</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Avg. Session Duration</StatLabel>
        <StatNumber>{metrics.timeEngagement.averageVisitDuration} sec</StatNumber>
        <StatHelpText>Above B2B avg</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Mobile Traffic</StatLabel>
        <StatNumber>{metrics.deviceDistribution.mobile.percentage}%</StatNumber>
        <StatHelpText>Mobile Dominance</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Total Activities</StatLabel>
        <StatNumber>{metrics.overall.totalActivities}</StatNumber>
        <StatHelpText>7 months</StatHelpText>
      </Stat>
    </SimpleGrid>
  );
} 