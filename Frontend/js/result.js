document.addEventListener('DOMContentLoaded', () => {
  loadResults();
});

async function loadResults() {
  try {
    const response = await fetch('http://localhost:3000/api/results');
    const data = await response.json();

    if (response.ok) {
      displayResults(data.results);
    } else {
      console.error('Failed to load results');
    }
  } catch (error) {
    console.error('Error loading results:', error);
    // Display mock data for demo
    displayMockResults();
  }
}

function displayResults(results) {
  const resultsContainer = document.getElementById('results-container');
  
  if (!results || results.length === 0) {
    resultsContainer.innerHTML = '<p>No votes have been cast yet.</p>';
    return;
  }

  const totalVotes = results.reduce((sum, candidate) => sum + candidate.votes, 0);
  
  results.sort((a, b) => b.votes - a.votes);
  
  results.forEach((candidate, index) => {
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    
    const percentage = totalVotes > 0 ? ((candidate.votes / totalVotes) * 100).toFixed(1) : 0;
    
    resultItem.innerHTML = `
      <div>
        <h3>${candidate.name}</h3>
        <p>${candidate.party}</p>
      </div>
      <div style="flex: 1; margin: 0 1rem;">
        <div class="result-bar">
          <div class="result-bar-fill" style="width: ${percentage}%"></div>
        </div>
      </div>
      <div style="text-align: right;">
        <strong>${candidate.votes} votes</strong>
        <p style="margin: 0; color: #666;">${percentage}%</p>
      </div>
    `;
    
    resultsContainer.appendChild(resultItem);
  });
}

function displayMockResults() {
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = `
    <div class="result-item">
      <div>
        <h3>Alice Johnson</h3>
        <p>Democratic Party</p>
      </div>
      <div style="flex: 1; margin: 0 1rem;">
        <div class="result-bar">
          <div class="result-bar-fill" style="width: 45%"></div>
        </div>
      </div>
      <div style="text-align: right;">
        <strong>450 votes</strong>
        <p style="margin: 0; color: #666;">45.0%</p>
      </div>
    </div>
    <div class="result-item">
      <div>
        <h3>Bob Smith</h3>
        <p>Republican Party</p>
      </div>
      <div style="flex: 1; margin: 0 1rem;">
        <div class="result-bar">
          <div class="result-bar-fill" style="width: 35%"></div>
        </div>
      </div>
      <div style="text-align: right;">
        <strong>350 votes</strong>
        <p style="margin: 0; color: #666;">35.0%</p>
      </div>
    </div>
    <div class="result-item">
      <div>
        <h3>Charlie Brown</h3>
        <p>Independent</p>
      </div>
      <div style="flex: 1; margin: 0 1rem;">
        <div class="result-bar">
          <div class="result-bar-fill" style="width: 20%"></div>
        </div>
      </div>
      <div style="text-align: right;">
        <strong>200 votes</strong>
        <p style="margin: 0; color: #666;">20.0%</p>
      </div>
    </div>
  `;
}

