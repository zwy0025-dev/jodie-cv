import { Client } from '@notionhq/client';

export default async function handler(req, res) {
  // 如果环境变量没读到，直接返回空，保证前端不崩溃
  if (!process.env.NOTION_TOKEN) {
    return res.status(200).json({ success: false, message: 'No Token' });
  }

  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  // 超强容错的解析器：不管你 Notion 里的列叫什么，都不会报错
  const getStr = (propObj) => {
    if (!propObj) return '';
    if (propObj.title && propObj.title.length > 0) return propObj.title[0].plain_text;
    if (propObj.rich_text && propObj.rich_text.length > 0) return propObj.rich_text[0].plain_text;
    if (propObj.url) return propObj.url;
    if (propObj.select) return propObj.select.name;
    return '';
  };

  try {
    // 1. 抓取 AI 实验室
    let aiLab = [];
    if (process.env.NOTION_AI_LAB_DB_ID) {
      const aiRes = await notion.databases.query({ database_id: process.env.NOTION_AI_LAB_DB_ID });
      aiLab = aiRes.results.map(page => ({
        title: getStr(page.properties.Name) || getStr(page.properties['名称']) || '',
        tag: getStr(page.properties.Tag) || getStr(page.properties['标签']) || 'AI',
        desc: getStr(page.properties.Desc) || getStr(page.properties['描述']) || '',
        bgColor: getStr(page.properties.BgColor) || getStr(page.properties['背景色']) || 'bg-[#F3F4F6]',
        media: getStr(page.properties.Media) || getStr(page.properties.URL) || ''
      })).filter(i => i.title !== '');
    }

    // 2. 抓取项目经历
    let projects = [];
    if (process.env.NOTION_PROJECT_DB_ID) {
      const projRes = await notion.databases.query({ database_id: process.env.NOTION_PROJECT_DB_ID });
      projects = projRes.results.map(page => ({
        title: getStr(page.properties.Name) || getStr(page.properties['名称']) || '',
        tag: getStr(page.properties.Tag) || getStr(page.properties['标签']) || '项目',
        desc: getStr(page.properties.Desc) || getStr(page.properties['描述']) || '',
        detail: getStr(page.properties.Detail) || getStr(page.properties['详情']) || '',
        bgImage: getStr(page.properties.BgImage) || getStr(page.properties.URL) || '/yitiao.JPG'
      })).filter(i => i.title !== '');
    }

    // 3. 抓取工作与教育经历
    let timeline = [];
    if (process.env.NOTION_WORK_DB_ID) {
      const workRes = await notion.databases.query({ database_id: process.env.NOTION_WORK_DB_ID });
      timeline = workRes.results.map(page => {
        const dContent = getStr(page.properties.DetailsContent) || getStr(page.properties['工作内容']);
        const dProjects = getStr(page.properties.DetailsProjects) || getStr(page.properties['核心项目']);
        const dResults = getStr(page.properties.DetailsResults) || getStr(page.properties['突出成果']);
        
        return {
          title: getStr(page.properties.Name) || getStr(page.properties['名称']),
          company: getStr(page.properties.Company) || getStr(page.properties['公司']),
          date: getStr(page.properties.Date) || getStr(page.properties['时间']),
          type: getStr(page.properties.Type) || getStr(page.properties['类型']) || 'Work',
          desc: getStr(page.properties.Desc) || getStr(page.properties['描述']),
          details: (dContent || dProjects || dResults) ? {
            content: dContent ? dContent.split(/[|\n]+/) : [],
            projects: dProjects ? dProjects.split(/[|\n]+/) : [],
            results: dResults ? dResults.split(/[|\n]+/) : []
          } : null
        };
      }).filter(i => i.title);
    }

    // 4. 抓取核心技能
    let skills = [];
    if (process.env.NOTION_SKILLS_DB_ID) {
      const skillRes = await notion.databases.query({ database_id: process.env.NOTION_SKILLS_DB_ID });
      skills = skillRes.results.map(page => ({
        title: getStr(page.properties.Name) || getStr(page.properties['名称']) || '',
        desc: getStr(page.properties.Desc) || getStr(page.properties['描述']) || ''
      })).filter(i => i.title !== '');
    }

    res.status(200).json({ success: true, data: { aiLab, projects, timeline, skills } });
  } catch (error) {
    // 遇到任何错误都温和处理，绝不抛出 500 导致白屏
    res.status(200).json({ success: false, error: error.message });
  }
}
