import React from "react";
import { Box, Container, Heading, VStack, Divider, SimpleGrid } from "@chakra-ui/react";
import analysisData from "./landing_page_analysis_json.json";
import KPISection from "./components/KPISection";
import DevicePieChart from "./components/DevicePieChart";
import ActivitiesBarChart from "./components/ActivitiesBarChart";
import VisitorPieChart from "./components/VisitorPieChart";
import RecommendationsTable from "./components/RecommendationsTable";
import SuccessMetricsTable from "./components/SuccessMetricsTable";
import InsightsSection from "./components/InsightsSection";

export default function App() {
  const report = analysisData.analysisReport;
  return (
    <Container maxW="7xl" py={8}>
      <Heading mb={2}>{report.metadata.reportTitle}</Heading>
      <Box color="gray.500" mb={6}>
        {report.metadata.campaign} | {report.metadata.reportPeriod}
      </Box>
      <KPISection report={report} />
      <Divider my={6} />
      <SimpleGrid columns={[1, null, 2]} spacing={6} mb={6}>
        <DevicePieChart deviceDistribution={report.performanceMetrics.deviceDistribution} />
        <VisitorPieChart visitorSegmentation={report.performanceMetrics.visitorSegmentation} />
      </SimpleGrid>
      <Box mb={6}>
        <ActivitiesBarChart topActivities={report.performanceMetrics.topActivities} />
      </Box>
      <Box mb={6}>
        <SuccessMetricsTable successMetrics={report.successMetrics} />
      </Box>
      <Box mb={6}>
        <RecommendationsTable recommendations={report.strategicRecommendations} />
      </Box>
      <Box mb={6}>
        <InsightsSection insights={report.insights} />
      </Box>
    </Container>
  );
} 