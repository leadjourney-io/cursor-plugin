#!/usr/bin/env node
// Checks the plugin has the shape Cursor's marketplace expects. No dependencies.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const errors = [];

function readJson(path) {
  try {
    return JSON.parse(readFileSync(join(root, path), "utf8"));
  } catch (error) {
    errors.push(`${path}: ${error.message}`);
    return null;
  }
}

const manifest = readJson(".cursor-plugin/plugin.json");

if (manifest) {
  for (const field of ["name", "displayName", "version", "description", "author", "license", "logo"]) {
    if (!manifest[field]) errors.push(`plugin.json: "${field}" is required`);
  }
  if (manifest.name && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(manifest.name)) {
    errors.push(`plugin.json: "name" must be lowercase kebab-case`);
  }
  if (manifest.version && !/^\d+\.\d+\.\d+$/.test(manifest.version)) {
    errors.push(`plugin.json: "version" must be semver (x.y.z)`);
  }
  if (manifest.logo && !existsSync(join(root, manifest.logo))) {
    errors.push(`plugin.json: logo "${manifest.logo}" does not exist`);
  }
  if (manifest.mcpServers && !existsSync(join(root, manifest.mcpServers))) {
    errors.push(`plugin.json: mcpServers "${manifest.mcpServers}" does not exist`);
  }
}

const mcp = readJson("mcp.json");

if (mcp) {
  const servers = Object.entries(mcp.mcpServers ?? {});
  if (servers.length === 0) errors.push(`mcp.json: no servers under "mcpServers"`);
  for (const [name, server] of servers) {
    if (!server.url?.startsWith("https://")) errors.push(`mcp.json: "${name}" must use an https url`);
    if (server.headers) errors.push(`mcp.json: "${name}" must not carry headers; auth is OAuth`);
  }
}

const skillsDir = join(root, "skills");

if (existsSync(skillsDir)) {
  for (const skill of readdirSync(skillsDir)) {
    const path = join("skills", skill, "SKILL.md");
    if (!existsSync(join(root, path))) {
      errors.push(`${path} is missing`);
      continue;
    }
    const frontmatter = readFileSync(join(root, path), "utf8").match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
    for (const field of ["name", "description"]) {
      if (!new RegExp(`^${field}:\\s*\\S`, "m").test(frontmatter)) errors.push(`${path}: frontmatter "${field}" is required`);
    }
    if (!new RegExp(`^name:\\s*${skill}\\s*$`, "m").test(frontmatter)) errors.push(`${path}: "name" must match the folder name`);
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `✗ ${error}`).join("\n"));
  process.exit(1);
}

console.log("✓ Plugin is valid");
