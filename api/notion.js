import { Client } from '@notionhq/client';

export default async function handler(req, res) {
  if (!process.env.NOTION_TOKEN) {
    return res.status(200).json({ success: false, message: 'No Token' });
  }

  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  const getStr = (propObj) => {
    if (!propObj) return '';
    if (propObj.title && propObj.title.length > 0) return propObj.title[0].plain_text;
    if (propObj.rich_text && propObj.rich_text.length > 0) return propObj.rich_text[0].plain_text;
    if (propObj.url) return propObj.url;
    if (propObj.select) return propObj.select.name;
    return '';
  };

  try {
    // 1. AI 实验室 (对应图 image_950463.png)
    let aiLab = [];
    if (process.env.NOTION_AI_LAB_DB_ID) {
      const aiRes = await notion.databases.query({ database_id: process.env.NOTION_AI_LAB_DB_ID });
      aiLab = aiRes.results.map(page => ({
        title: getStr(page.properties['项目名称']), // 对应截图
        tag: getStr(page.properties['标题']),    // 对应 Aa 标题列
        desc: getStr(page.properties['项目描述']), // 对应截图
        media: getStr(page.properties['url']) || getStr(page.properties['媒体 github URL']) // 对应截图
      })).filter(i => i.title !== '');
    }

    // 2. 项目经历 (对应图 image_950404.png)
    let projects = [];
    if (process.env.NOTION_PROJECT_DB_ID) {
      const projRes = await notion.databases.query({ database_id: process.env.NOTION_PROJECT_DB_ID });
      projects = projRes.results.map(page => ({
        title: getStr(page.properties['项目名称']), // 对应截图
        tag: getStr(page.properties['标签']),     // 对应 Aa 标签列
        desc: getStr(page.properties['项目描述']), // 对应截图
        bgImage: getStr(page.properties['项目链接']) || '/yitiao.JPG' // 优先拿链接
      })).filter(i => i.title !== '');
    }

    // 3. 工作经历 (对应图 image_950445.png)
    let timeline = [];
    if (process.env.NOTION_WORK_DB_ID) {
      const workRes = await notion.databases.query({ database_id: process.env.NOTION_WORK_DB_ID });
      timeline = workRes.results.map(page => ({
        title: getStr(page.properties['职位']),      // 对应截图
        company: getStr(page.properties['公司']),    // 对应截图
        date: getStr(page.properties['时间段']),      // 对应 Aa 时间段列
        desc: getStr(page.properties['工作内容描述']), // 对应截图
        type: 'Work' // 默认为工作经历
      })).filter(i => i.title);
    }

    // 4. 核心技能 (对应图 image_950424.png)
    let skills = [];
    if (process.env.NOTION_SKILLS_DB_ID) {
      const skillRes = await notion.databases.query({ database_id: process.env.NOTION_SKILLS_DB_ID });
      skills = skillRes.results.map(page => ({
        title: getStr(page.properties['技能名称']), // 对应 Aa 技能名称列
        desc: getStr(page.properties['技能描述'])   // 对应截图
      })).filter(i => i.title !== '');
    }

    res.status(200).json({ success: true, data: { aiLab, projects, timeline, skills } });
  } catch (error) {
    res.status(200).json({ success: false, error: error.message });
  }
}
