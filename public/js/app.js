(function () {
  function getCurrentTeam() {
    const path = window.location.pathname;
    if (path.includes('farmen')) return 'farmen';
    if (path.includes('krishishikkha')) return 'krishishikkha';
    if (path.includes('urbor')) return 'urbor';
    return null;
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  }

  function renderCards(teamName) {
    const container = document.getElementById('team-cards');
    if (!container || !window.TEAM_DATA) return;

    const members = window.TEAM_DATA[teamName] || [];
    if (members.length === 0) {
      container.innerHTML = '<p>No team members found.</p>';
      return;
    }

    const cards = members.map(member => {
      const imgTag = member.image
        ? `<img src="${member.image}" alt="${member.title}">`
        : '';
      const deadline = member.deadline
        ? `<div class="deadline">Deadline: ${formatDate(member.deadline)}</div>`
        : '';

      const bodyText = member.body.replace(/</g, '<').replace(/>/g, '>');

      return `
        <div class="card">
          ${imgTag}
          <h2>${member.title}</h2>
          <span class="role">${member.role}</span>
          <div class="task">${bodyText}</div>
          <span class="status ${member.status.replace(/\s+/g, '_')}">${member.status}</span>
          ${deadline}
        </div>
      `;
    }).join('');

    container.innerHTML = cards;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const team = getCurrentTeam();
      if (team) renderCards(team);
    });
  } else {
    const team = getCurrentTeam();
    if (team) renderCards(team);
  }
})();