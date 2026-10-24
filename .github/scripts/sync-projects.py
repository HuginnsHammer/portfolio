#!/usr/bin/env python3
"""Sync approved project metadata and latest public commit details into the portfolio."""
from __future__ import annotations

import json
import re
import sys
from datetime import datetime
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "projects" / "project-status.json"
PROJECTS = {
    "llmshield": "HuginnsHammer/LLMShield",
    "cloudsentry": "HuginnsHammer/CloudSentry",
}
REQUIRED_LISTS = ("capabilities", "evidence", "limitations")
MAX_ITEMS = 12
MAX_TEXT = 500


def get_json(url: str):
    request = Request(url, headers={"User-Agent": "HuginnsHammer-portfolio-sync/1.0", "Accept": "application/vnd.github+json"})
    with urlopen(request, timeout=20) as response:
        return json.load(response)


def validate_metadata(slug: str, repo: str, data: object) -> dict:
    if not isinstance(data, dict):
        raise ValueError(f"{repo}: PORTFOLIO.json must contain a JSON object")
    if data.get("schema_version") != 1:
        raise ValueError(f"{repo}: unsupported schema_version")
    if data.get("slug") != slug or data.get("repository") != repo:
        raise ValueError(f"{repo}: slug/repository does not match the configured source")
    for field in ("title", "summary"):
        value = data.get(field)
        if not isinstance(value, str) or not value.strip() or len(value) > MAX_TEXT:
            raise ValueError(f"{repo}: invalid {field}")
    clean = {
        "schema_version": 1,
        "slug": slug,
        "title": data["title"].strip(),
        "repository": repo,
        "summary": data["summary"].strip(),
    }
    for field in REQUIRED_LISTS:
        values = data.get(field)
        if not isinstance(values, list) or not values or len(values) > MAX_ITEMS:
            raise ValueError(f"{repo}: {field} must be a non-empty list of at most {MAX_ITEMS} items")
        if any(not isinstance(v, str) or not v.strip() or len(v) > MAX_TEXT for v in values):
            raise ValueError(f"{repo}: invalid item in {field}")
        clean[field] = [v.strip() for v in values]
    return clean


def main() -> int:
    output = {"schema_version": 1, "projects": {}}
    for slug, repo in PROJECTS.items():
        try:
            raw = get_json(f"https://raw.githubusercontent.com/{repo}/main/PORTFOLIO.json")
            metadata = validate_metadata(slug, repo, raw)
            commits = get_json(f"https://api.github.com/repos/{repo}/commits?per_page=1")
            if not isinstance(commits, list) or not commits:
                raise ValueError(f"{repo}: latest commit response was empty")
            commit = commits[0]
            sha = commit.get("sha")
            date = (commit.get("commit") or {}).get("committer", {}).get("date")
            if not isinstance(sha, str) or not re.fullmatch(r"[0-9a-f]{40}", sha):
                raise ValueError(f"{repo}: invalid latest commit SHA")
            if not isinstance(date, str):
                raise ValueError(f"{repo}: missing latest commit date")
            # Parse the timestamp before writing it to the generated file.
            datetime.fromisoformat(date.replace("Z", "+00:00"))
            metadata["latest_commit"] = {
                "sha": sha,
                "short_sha": sha[:7],
                "date": date,
                "url": f"https://github.com/{repo}/commit/{sha}",
            }
            metadata["source_url"] = f"https://github.com/{repo}/blob/main/PORTFOLIO.json"
            output["projects"][slug] = metadata
        except (HTTPError, URLError, TimeoutError, ValueError, KeyError, TypeError, json.JSONDecodeError) as exc:
            print(f"Sync failed for {repo}: {exc}", file=sys.stderr)
            return 1

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    rendered = json.dumps(output, indent=2, ensure_ascii=False) + "\n"
    current = OUTPUT.read_text(encoding="utf-8") if OUTPUT.exists() else None
    if current == rendered:
        print("Project metadata is already current.")
        return 0
    OUTPUT.write_text(rendered, encoding="utf-8")
    print(f"Updated {OUTPUT.relative_to(ROOT)} from the two approved project sources.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
