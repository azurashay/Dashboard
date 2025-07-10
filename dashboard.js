fetch('src/landing_page_analysis_json.json')
  .then(res => res.json())
  .then(data => renderDashboard(data.analysisReport));

function renderDashboard(report) {
  // Title & Meta
  document.getElementById('report-title').textContent = report.metadata.reportTitle;
  document.getElementById('report-meta').textContent = `${report.metadata.campaign} | ${report.metadata.reportPeriod}`;

  // KPI
  const kpiGrid = document.getElementById('kpi-section');
  kpiGrid.innerHTML = '';
  const metrics = report.performanceMetrics;
  const kpis = [
    { label: 'Conversion Rate', value: metrics.conversionAnalysis.conversionRate + '%' },
    { label: 'Avg. Session Duration', value: metrics.timeEngagement.averageVisitDuration + ' sec' },
    { label: 'Mobile Traffic', value: metrics.deviceDistribution.mobile.percentage + '%' },
    { label: 'Total Activities', value: metrics.overall.totalActivities }
  ];
  kpis.forEach(kpi => {
    const card = document.createElement('div');
    card.className = 'kpi-card';
    card.innerHTML = `<div class="kpi-label">${kpi.label}</div><div class="kpi-value">${kpi.value}</div>`;
    kpiGrid.appendChild(card);
  });

  // Device Pie
  new Chart(document.getElementById('devicePie').getContext('2d'), {
    type: 'pie',
    data: {
      labels: ['Mobile', 'Desktop', 'Tablet'],
      datasets: [{
        data: [metrics.deviceDistribution.mobile.percentage, metrics.deviceDistribution.desktop.percentage, metrics.deviceDistribution.tablet.percentage],
        backgroundColor: ['#3182ce', '#2ecc40', '#ffbb28']
      }]
    },
    options: { plugins: { legend: { position: 'bottom' } }, responsive: false, maintainAspectRatio: false, }
  });

  // Visitor Pie
  const visitorLabels = Object.keys(metrics.visitorSegmentation);
  const visitorData = visitorLabels.map(k => metrics.visitorSegmentation[k].percentage);
  new Chart(document.getElementById('visitorPie').getContext('2d'), {
    type: 'pie',
    data: {
      labels: visitorLabels,
      datasets: [{
        data: visitorData,
        backgroundColor: ['#3182ce', '#2ecc40', '#ffbb28', '#e53e3e', '#805ad5']
      }]
    },
    options: { plugins: { legend: { position: 'bottom' } }, responsive: false, maintainAspectRatio: false, }
  });

  // Activities Bar
  const actLabels = report.performanceMetrics.topActivities.map(a => a.activity.length > 18 ? a.activity.slice(0, 17) + '…' : a.activity);
  const actData = report.performanceMetrics.topActivities.map(a => a.count);
  new Chart(document.getElementById('activitiesBar').getContext('2d'), {
    type: 'bar',
    data: {
      labels: actLabels,
      datasets: [{
        label: 'Count',
        data: actData,
        backgroundColor: '#3182ce',
        borderRadius: 8,
        barPercentage: 0.7,
        categoryPercentage: 0.7
      }]
    },
    options: {
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        x: { beginAtZero: true },
        y: { ticks: { font: { size: 13 } } }
      }
    }
  });

  // Success Metrics Table
  const sm = report.successMetrics;
  const smDiv = document.getElementById('success-metrics');
  smDiv.innerHTML = `<div class="table-section"><h2>Success Metrics</h2>
    <table><thead><tr><th>Metric</th><th>Current</th><th>Target</th><th>Description</th></tr></thead><tbody>
      ${sm.primaryKPIs.map(kpi => `<tr><td><span class='tag'>${kpi.metric}</span></td><td>${kpi.current || '-'}</td><td>${kpi.target || '-'}</td><td>${kpi.description || '-'}</td></tr>`).join('')}
    </tbody></table>
    <div><b>Secondary Metrics:</b> ${sm.secondaryMetrics.join(', ')}</div>
  </div>`;

  // Recommendations Table
  const rec = report.strategicRecommendations;
  const recDiv = document.getElementById('recommendations');
  recDiv.innerHTML = `<div class="table-section"><h2>Strategic Recommendations</h2>
    <table><thead><tr><th>Category</th><th>Status / Challenge</th><th>Actions</th></tr></thead><tbody>
      ${rec.immediatePriority.map(r => `<tr><td><span class='tag' style='background:${r.priority === 'Critical' ? '#e53e3e' : '#ffbb28'}'>${r.category}</span></td><td>${r.priority || r.currentState || r.currentChallenge || r.currentGap || '-'}</td><td><ul>${r.actions.map(a => `<li>${a}</li>`).join('')}</ul></td></tr>`).join('')}
    </tbody></table>
    <h3>Long Term Initiatives</h3>
    <table><thead><tr><th>Category</th><th>Initiatives</th></tr></thead><tbody>
      ${rec.longTermInitiatives.map(r => `<tr><td><span class='tag' style='background:#3182ce'>${r.category}</span></td><td><ul>${r.initiatives.map(a => `<li>${a}</li>`).join('')}</ul></td></tr>`).join('')}
    </tbody></table>
  </div>`;

  // Insights Section
  const ins = report.insights;
  const insDiv = document.getElementById('insights');
  insDiv.innerHTML = `<div class="table-section"><h2>Key Insights</h2>
    ${ins.keyFindings.map(f => `<div class='insight'><span class='tag'>${f.finding}</span> <b>${f.data}:</b> ${f.implication}</div>`).join('')}
    <h3>Opportunities</h3>
    ${ins.opportunities.map(o => `<div class='opportunity'><span class='tag' style='background:${o.potential === 'High' ? '#2ecc40' : '#ffbb28'}'>${o.potential}</span> <b>${o.opportunity}:</b> ${o.rationale}</div>`).join('')}
  </div>`;
} 