import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const TEAMS = ['farmen', 'krishishikkha', 'urbor'];
const CONTENT_DIR = './content/teams';
const OUTPUT_FILE = './public/js/build/data.js';

// Ensure output dir exists
fs.mkdirSync('./public/js/build', { recursive: true });

const allData = {};

for (const team of TEAMS) {
  const teamDir = path.join(CONTENT_DIR, team);
  if (!fs.existsSync(teamDir)) {
    allData[team] = [];
    continue;
  }

  const files = fs.readdirSync(teamDir).filter(f => f.endsWith('.md'));
  allData[team] = files.map(file => {
    const fullPath = path.join(teamDir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const { data, content: body } = matter(content);

    return {
      id: file.replace(/\.md$/, ''),
      title: data.title || 'Untitled',
      role: data.role || '',
      status: data.status || 'To Do',
      deadline: data.deadline || null,
      image: data.image || null,
      body: body.trim()
    };
  });
}

const jsContent = `window.TEAM_DATA = ${JSON.stringify(allData, null, 2)};`;
fs.writeFileSync(OUTPUT_FILE, jsContent);
console.log('✅ Markdown compiled to public/js/build/data.js');