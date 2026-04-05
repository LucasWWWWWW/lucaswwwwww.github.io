function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderSources(sources) {
  return (sources || [])
    .map(source => {
      const name = escapeHtml(source.name || "来源");
      const url = escapeHtml(source.url || "#");
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a>`;
    })
    .join(" / ");
}

function renderTable(items) {
  return `
    <table class="desktop-table">
      <thead>
        <tr>
          <th>优先级</th>
          <th>所属领域</th>
          <th>事项</th>
          <th>概述</th>
          <th>主要来源</th>
        </tr>
      </thead>
      <tbody>
        ${items.map(item => `
          <tr>
            <td>${escapeHtml(item.priority)}</td>
            <td>${escapeHtml(item.field)}</td>
            <td>${escapeHtml(item.title)}</td>
            <td>${escapeHtml(item.summary)}</td>
            <td>${renderSources(item.sources)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderCards(items) {
  return `
    <div class="card-container">
      ${items.map(item => `
        <div class="card">
          <h2>${escapeHtml(item.title)}</h2>
          <div class="field">领域：${escapeHtml(item.field)}</div>
          <div class="priority">优先级：${escapeHtml(item.priority)}</div>
          <details>
            <summary>点击展开概述</summary>
            <p>${escapeHtml(item.summary)}</p>
          </details>
          <div class="sources">来源：${renderSources(item.sources)}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderReport(items, mountId = "report-root") {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = renderTable(items) + renderCards(items);
}
