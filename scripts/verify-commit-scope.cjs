#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Color helpers
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

// Get commit message file path
const commitMsgFile = process.argv[2];
if (!commitMsgFile) {
  console.error(`${RED}Error: Commit message file argument is missing.${RESET}`);
  process.exit(1);
}

// Read commit message
const commitMsg = fs.readFileSync(commitMsgFile, 'utf8').trim();

// Map files to logical scopes
const SCOPE_MAPPINGS = {
  home: ['css/home.css', 'index.html', 'js/home.js'],
  about: ['css/observatory.css', 'about.html', 'js/observatory.js', 'css/about.css'],
  services: ['css/services.css', 'services.html', 'js/services.js'],
  contact: ['css/contact.css', 'contact.html', 'js/contact-form.js', 'api/send-email.js', 'css/contact-form.css'],
  projects: ['css/projects.css', 'projects.html', 'js/projects.js', 'css/traces.css', 'js/traces.js'],
};

// Map files to scope lookup
function getFileScope(filePath) {
  const normalizedPath = filePath.replace(/\\/g, '/');
  if (normalizedPath.startsWith('dist/')) {
    return null;
  }
  for (const [scope, paths] of Object.entries(SCOPE_MAPPINGS)) {
    if (paths.some(p => normalizedPath.includes(p))) {
      return scope;
    }
  }
  return null;
}

// Get staged files from git
let stagedFiles = [];
try {
  const output = execSync('git diff --cached --name-only', { encoding: 'utf8' });
  stagedFiles = output.split('\n').map(f => f.trim()).filter(Boolean);
} catch (err) {
  console.error(`${RED}Error: Failed to fetch staged files from git.${RESET}`);
  process.exit(1);
}

if (stagedFiles.length === 0) {
  process.exit(0);
}

// Parse conventional commit scope
// Matches: type(scope): description or type: description
const commitPattern = /^([a-z-]+)(?:\(([^)]+)\))?\s*:\s*(.+)$/i;
const match = commitMsg.match(commitPattern);

if (!match) {
  // If the message format is invalid, let commitlint handle the error
  process.exit(0);
}

const type = match[1].toLowerCase();
const declaredScopesString = match[2];
const declaredScopes = declaredScopesString 
  ? declaredScopesString.split(',').map(s => s.trim().toLowerCase()) 
  : [];

// We skip checks for releases/chores/merges/reverts which might touch everything
const skipTypes = ['chore', 'ci', 'revert', 'release'];
if (skipTypes.includes(type) || commitMsg.startsWith('Merge branch')) {
  process.exit(0);
}

// Analyze staged files scopes
const fileScopeMap = {};
const affectedScopes = new Set();
let hasUnscopedFiles = false;

for (const file of stagedFiles) {
  const scope = getFileScope(file);
  if (scope) {
    fileScopeMap[file] = scope;
    affectedScopes.add(scope);
  } else {
    hasUnscopedFiles = true;
  }
}

// If no custom page scopes are affected, everything is clean (e.g. modifying global configs)
if (affectedScopes.size === 0) {
  process.exit(0);
}

// CASE 1: Scope is declared in commit message (e.g. "style(about): card size fix")
if (declaredScopes.length > 0) {
  const violations = [];
  
  for (const [file, scope] of Object.entries(fileScopeMap)) {
    if (!declaredScopes.includes(scope)) {
      violations.push({ file, scope });
    }
  }
  
  if (violations.length > 0) {
    console.log(`\n${RED}${BOLD}❌ COMMIT REJECTED: Scope Mismatch Detected!${RESET}`);
    console.log(`You declared scope(s): ${CYAN}${declaredScopes.join(', ')}${RESET} in your commit message.`);
    console.log(`However, you staged changes in files belonging to other scopes:`);
    violations.forEach(v => {
      console.log(`  - ${YELLOW}${v.file}${RESET} (Expected scope: ${RED}${v.scope}${RESET})`);
    });
    console.log(`\n${BOLD}How to fix:${RESET}`);
    console.log(`1. Update your commit message to include the affected scopes, e.g.:`);
    console.log(`   ${GREEN}${type}(${Array.from(new Set([...declaredScopes, ...violations.map(v => v.scope)])).join(',')}): ${match[3]}${RESET}`);
    console.log(`2. Or unstage the files belonging to other scopes before committing.`);
    console.log(`3. Or bypass this check using ${CYAN}git commit --no-verify${RESET} (not recommended).\n`);
    process.exit(1);
  }
}

// CASE 2: No scope is declared, but commit touches multiple distinct scopes
// We want to warn the user so they don't accidentally commit cross-page modifications (like the home page card fixes getting wiped by an about page fix!)
if (declaredScopes.length === 0 && affectedScopes.size > 1) {
  console.log(`\n${YELLOW}${BOLD}⚠️ WARNING: Cross-Scope Changes Detected!${RESET}`);
  console.log(`Your commit changes files in multiple distinct pages/features:`);
  
  const scopesList = {};
  for (const [file, scope] of Object.entries(fileScopeMap)) {
    if (!scopesList[scope]) scopesList[scope] = [];
    scopesList[scope].push(file);
  }
  
  for (const [scope, files] of Object.entries(scopesList)) {
    console.log(`  Scope ${CYAN}${scope}${RESET}:`);
    files.forEach(f => console.log(`    - ${f}`));
  }
  
  console.log(`\n${BOLD}Best Practice:${RESET}`);
  console.log(`- Consider splitting this commit into separate commits per scope so they can be reviewed and rolled back independently.`);
  console.log(`- If this is intentional, please add scopes to your commit message, e.g.:`);
  console.log(`   ${GREEN}${type}(${Array.from(affectedScopes).join(',')}): ${match[3]}${RESET}\n`);
}

process.exit(0);
