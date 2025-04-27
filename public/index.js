const API_BASE = 'http://localhost:3000'; // Backend server address

// Chart.js initialization
const ctx = document.getElementById('engagementChart').getContext('2d');
const engagementChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Engagement',
      data: [65, 59, 80, 81, 56, 55], // Initial dummy data
      borderColor: '#2563eb',
      tension: 0.4,
      fill: true,
      backgroundColor: 'rgba(37,99,235,0.10)'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }
});

// Navigation and Section Switching
function setActiveNav(btn) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function showSection(section, btn) {
  setActiveNav(btn);
  ['dashboard', 'users', 'posts', 'create'].forEach(id => {
    document.getElementById(id).style.display = (id === section) ? 'block' : 'none';
  });
  loadSectionData(section);
}

// Load section-specific data
async function loadSectionData(section) {
  try {
    switch (section) {
      case 'dashboard':
        const analytics = await fetch(`${API_BASE}/analytics`).then(res => res.json());
        document.getElementById('totalUsers').textContent = analytics.totalUsers;
        document.getElementById('totalPosts').textContent = analytics.totalPosts;
        document.getElementById('engagementRate').textContent = `${analytics.engagementRate}%`;
        engagementChart.data.datasets[0].data = analytics.engagementData;
        engagementChart.update();
        break;

      case 'users':
        const users = await fetch(`${API_BASE}/user`).then(res => res.json());
        document.getElementById('usersList').innerHTML = users.map(user => `
          <div class="user-card">
            <h3>${user.Name || 'No Name'}</h3>
            <p>${user.Email ? '📧 ' + user.Email : ''}</p>
            <small>ID: ${user.ID || user.id || ''}</small>
          </div>
        `).join('');
        break;

      case 'posts':
        const posts = await fetch(`${API_BASE}/post`).then(res => res.json());
        document.getElementById('postsList').innerHTML = posts.map(post => `
          <div class="post-card">
            <h3>${post.Content ? post.Content.substring(0, 30) + '...' : 'Untitled Post'}</h3>
            <p>${post.Content || ''}</p>
            <small>By User ID: ${post.UserID || 'Unknown'}</small>
            <img class="icon" src="https://img.icons8.com/color/48/news.png" alt="">
          </div>
        `).join('');
        break;
    }
  } catch (error) {
    console.error('Error loading section:', error);
  }
}

// Handle Create Post Form Submission
document.getElementById('postForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = {
    UserID: e.target.author.value,      // Corrected to match backend
    Content: e.target.content.value,
    Visibility: 'public'                // Default visibility
  };
  const msg = document.getElementById('formMessage');
  msg.innerHTML = '<span style="color:#2563eb;">⏳ Publishing...</span>';
  try {
    const response = await fetch(`${API_BASE}/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      msg.innerHTML = '<div class="success">✅ Post created successfully!</div>';
      e.target.reset();
      showSection('posts', document.querySelector('button[onclick*="posts"]')); // reload posts after creating
    } else {
      throw new Error('Failed to create post');
    }
  } catch (error) {
    msg.innerHTML = `<div class="error">❌ Error creating post: ${error.message}</div>`;
  }
});

// Initial Load
showSection('dashboard', document.querySelector('.nav-btn.active'));

