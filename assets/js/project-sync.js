(() => {
  "use strict";

  const panel = document.querySelector("[data-project-sync]");
  if (!panel) return;

  const slug = panel.getAttribute("data-project-sync");
  const statusUrl = new URL("./project-status.json", window.location.href);

  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function addList(parent, heading, items) {
    parent.append(node("h3", heading));
    const list = node("ul");
    for (const item of items) list.append(node("li", item));
    parent.append(list);
  }

  function render(project) {
    panel.replaceChildren();
    panel.append(node("p", "PROJECT SNAPSHOT", "eyebrow"));
    panel.append(node("h2", "Current project record"));
    panel.append(node("p", project.summary));
    addList(panel, "Current capabilities", project.capabilities);
    addList(panel, "Evidence and checks", project.evidence);
    addList(panel, "Known limitations", project.limitations);

    const commit = project.latest_commit;
    const meta = node("p", undefined, "project-sync-meta");
    meta.append(document.createTextNode("Source repository updated: "));
    meta.append(node("time", new Date(commit.date).toLocaleDateString(undefined, {
      year: "numeric", month: "short", day: "numeric", timeZone: "UTC"
    })));
    meta.append(document.createTextNode(" · "));
    const link = node("a", commit.short_sha);
    link.href = commit.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "Open latest source commit " + commit.short_sha);
    meta.append(link);
    meta.append(document.createTextNode(" · "));
    const source = node("a", "metadata source");
    source.href = project.source_url;
    source.target = "_blank";
    source.rel = "noopener noreferrer";
    meta.append(source);
    panel.append(meta);
  }

  fetch(statusUrl.toString(), { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Project snapshot is not available yet.");
      return response.json();
    })
    .then((data) => {
      const project = data && data.schema_version === 1 && data.projects && data.projects[slug];
      if (!project || !Array.isArray(project.capabilities) || !Array.isArray(project.evidence) || !Array.isArray(project.limitations) || !project.latest_commit) {
        throw new Error("Project snapshot failed validation.");
      }
      render(project);
    })
    .catch(() => {
      panel.replaceChildren(
        node("p", "PROJECT SNAPSHOT"),
        node("p", "The latest project snapshot could not be loaded. The project breakdown below remains available.")
      );
    });
})();
