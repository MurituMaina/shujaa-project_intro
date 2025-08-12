function getSponsorshipStats(students) {
  let sponsored = 0, notSponsored = 0;
  students.forEach(s => {
    if (s["Sponsored"] && s["Sponsored"].trim() !== "Yes") {
      sponsored++;
    } else {
      notSponsored++;
    }
  });
  const total = sponsored + notSponsored;
  const sponsoredPct = total ? ((sponsored / total) * 100).toFixed(1) : 0;
  const notSponsoredPct = total ? ((notSponsored / total) * 100).toFixed(1) : 0;
  return { sponsored, notSponsored, sponsoredPct, notSponsoredPct };
}

function getChurchStats(students) {
  const churchCounts = {};
  students.forEach(s => {
    if (s["Sponsor"] && s["Sponsor"].trim() !== "") {
      const church = s["Church"] || "Unknown";
      churchCounts[church] = (churchCounts[church] || 0) + 1;
    }
  });
  return churchCounts;
}

function renderCharts(students) {
  // Pie Chart
  const { sponsored, notSponsored, sponsoredPct, notSponsoredPct } = getSponsorshipStats(students);
  const pieCtx = document.getElementById('sponsorshipPieChart').getContext('2d');
  new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels: [
        `Sponsored (${sponsoredPct}%)`,
        `Not Sponsored (${notSponsoredPct}%)`
      ],
      datasets: [{
        data: [sponsored, notSponsored],
        backgroundColor: ['#198754', '#dc3545']
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Sponsorship Status (%)'
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  });

  // Bar Chart (ordered from lowest to highest)
  const churchStats = getChurchStats(students);
  const sortedChurchEntries = Object.entries(churchStats).sort((a, b) => b[1] - a[1]);
  const sortedChurchLabels = sortedChurchEntries.map(entry => entry[0]);
  const sortedChurchData = sortedChurchEntries.map(entry => entry[1]);

  const barCtx = document.getElementById('churchBarChart').getContext('2d');
  new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: sortedChurchLabels,
      datasets: [{
        label: 'Sponsored Students',
        data: sortedChurchData,
        backgroundColor: '#198754'
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Sponsored Students by Church'
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          precision: 0
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadStudentData(students => {
    renderCharts(students);
  });
});
// document.addEventListener("DOMContentLoaded", () =>