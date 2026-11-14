
(() => {
  "use strict";
  const walkthrough = document.querySelector("[data-walkthrough]");
  if (walkthrough) {
    const tabs = [...walkthrough.querySelectorAll("[data-stage]")];
    const title = walkthrough.querySelector("[data-stage-title]");
    const description = walkthrough.querySelector("[data-stage-description]");
    const code = walkthrough.querySelector("[data-stage-code]");
    const meta = walkthrough.querySelector("[data-stage-meta]");
    const stages = {
      input: {title:"01 / Input fixture",description:"A committed Terraform example deliberately configures an S3 bucket ACL as public-read. This is test data, not a live cloud resource.",code:'resource "aws_s3_bucket_acl" "assets" {\n  acl = "public-read"\n}',meta:["examples/terraform/storage.vulnerable.tf","Controlled test fixture"]},
      analysis: {title:"02 / Static rule match",description:"CloudSentry parses the configuration and checks the literal ACL value against its documented Terraform rule. It does not deploy or contact AWS.",code:"Rule: CS-TF-001\nCheck: public S3 ACL\nEvidence: acl = \"public-read\"\nMode: local static analysis",meta:["Rule-based detection","No cloud credentials"]},
      finding: {title:"03 / Reviewable finding",description:"The finding carries severity, confidence, evidence, source location, impact and remediation so a developer can inspect and act on it.",code:"CS-TF-001 · CRITICAL\nResource: aws_s3_bucket_acl.assets\nFinding: S3 bucket ACL allows public access\nAction: remove public ACL grants; review bucket policy",meta:["Evidence-linked output","Human review required"]}
    };
    function show(stage) {
      const item = stages[stage];
      if (!item) return;
      title.textContent = item.title;
      description.textContent = item.description;
      code.textContent = item.code;
      meta.replaceChildren(...item.meta.map(value => { const span=document.createElement("span"); span.textContent=value; return span; }));
      tabs.forEach(tab => tab.setAttribute("aria-pressed", String(tab.dataset.stage === stage)));
    }
    tabs.forEach(tab => tab.addEventListener("click", () => show(tab.dataset.stage)));
    show("input");
  }
  document.querySelectorAll("[data-copy-email]").forEach(button => {
    button.addEventListener("click", async () => {
      const email = button.getAttribute("data-copy-email");
      const original = button.textContent;
      try {
        await navigator.clipboard.writeText(email);
        button.textContent = "Copied email";
      } catch (_) {
        window.location.href = "mailto:" + email;
        button.textContent = "Opening email";
      }
      window.setTimeout(() => { button.textContent = original; }, 2200);
    });
  });
})();
