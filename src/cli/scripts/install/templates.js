import keys from 'lodash/keys';
import { getGlobalConfig, register } from '@politico/interactive-templates';

import { log } from 'CLI/utils/console';

const isTemplateInstalled = async(template) => {
  const conf = await getGlobalConfig();
  const confList = keys(conf.templates).map(t => conf.templates[t].repo);
  return confList.filter(
    t => t === template
  ).length > 0;
};

export default async(destination, step) => {
  log(`[${step[0]}/${step[1]}] Checking for templates...`);
  const isGraphicsEmbedInstalled = await isTemplateInstalled('template_graphic-embed');
  const isGraphicsIlloInstalled = await isTemplateInstalled('template_graphic-embed-illustration');
  if (!isGraphicsEmbedInstalled) {
    log('No embed template found. Installing "The-Politico/template_graphic-embed"...', 'info');
    await register('The-Politico/template_graphic-embed', false);
  }
  if (!isGraphicsIlloInstalled) {
    log('No illustration template found. Installing "The-Politico/template_graphic-embed-illustration"...', 'info');
    await register('The-Politico/template_graphic-embed-illustration', false);
  }
};
