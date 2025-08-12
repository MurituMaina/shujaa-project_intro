document.addEventListener('DOMContentLoaded', function () {
    const sponsored = students.filter(s => s.sponsored).length;
    const notSponsored = students.length - sponsored;
  
    const pieCtx = document.getElementById('sponsorshipPieChart').getContext('2d');
    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Sponsored', 'Not Sponsored'],
        datasets: [{
          data: [sponsored, notSponsored],
          backgroundColor: ['#28a745', '#dc3545']
        }]
      },
      options: {
        responsive: true
      }
    });
  
    // Church Bar Chart
    const churchCounts = {};
    students.forEach(s => {
      if (s.sponsored && s.church) {
        churchCounts[s.church] = (churchCounts[s.church] || 0) + 1;
      }
    });
  
    const barCtx = document.getElementById('churchBarChart').getContext('2d');
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(churchCounts),
        datasets: [{
          label: 'Students Sponsored',
          data: Object.values(churchCounts),
          backgroundColor: '#007bff'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  });
  