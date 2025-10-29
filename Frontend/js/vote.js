let selectedCandidate = null;
let candidates = [];

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  loadCandidates();
});

async function loadCandidates() {
  try {
    const response = await fetch('http://localhost:3000/api/results');
    const data = await response.json();
    candidates = data.results;
    
    const candidatesGrid = document.getElementById('candidates-grid');
    candidatesGrid.innerHTML = ''; // Clear existing content
    
    candidates.forEach(candidate => {
      const card = document.createElement('div');
      card.className = 'candidate-card';
      card.innerHTML = `
        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&background=667eea&color=fff&size=120" alt="${candidate.name}">
        <h3>${candidate.name}</h3>
        <p>${candidate.party}</p>
        <button class="vote-btn" onclick="selectCandidate(${candidate.id})">
          Select
        </button>
      `;
      candidatesGrid.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading candidates:', error);
    // Fallback candidates if API fails
    candidates = [
      { id: 1, name: 'David', party: 'Democratic Party', votes: 0 },
      { id: 2, name: 'Raju', party: 'Republican Party', votes: 0 },
      { id: 3, name: 'Ramu', party: 'Independent', votes: 0 }
    ];
    
    const candidatesGrid = document.getElementById('candidates-grid');
    candidates.forEach(candidate => {
      const card = document.createElement('div');
      card.className = 'candidate-card';
      card.innerHTML = `
        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&background=667eea&color=fff&size=120" alt="${candidate.name}">
        <h3>${candidate.name}</h3>
        <p>${candidate.party}</p>
        <button class="vote-btn" onclick="selectCandidate(${candidate.id})">
          Select
        </button>
      `;
      candidatesGrid.appendChild(card);
    });
  }
}

function selectCandidate(id) {
  selectedCandidate = id;
  
  // Update UI
  const buttons = document.querySelectorAll('.vote-btn');
  buttons.forEach(btn => btn.classList.remove('selected'));
  
  event.target.classList.add('selected');
  
  const submitBtn = document.getElementById('submit-vote');
  submitBtn.disabled = false;
  submitBtn.style.opacity = '1';
}

async function submitVote(event) {
  event.preventDefault();
  
  if (!selectedCandidate) {
    alert('Please select a candidate');
    return;
  }

  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch('http://localhost:3000/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ candidateId: selectedCandidate })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message || 'Vote submitted successfully!');
      window.location.href = 'result.html';
    } else {
      alert(data.message || 'Failed to submit vote');
    }
  } catch (error) {
    console.error('Vote error:', error);
    alert('An error occurred. Please try again.');
  }
}

function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

