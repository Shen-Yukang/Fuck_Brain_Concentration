import { checkbox } from '@inquirer/prompts';
import fs, { createReadStream, createWriteStream } from 'node:fs';
import { rimraf } from 'rimraf';
import { posix, resolve } from 'node:path';
import { AsyncZipDeflate, Zip } from 'fflate';
import fg from 'fast-glob';

const pagesPath = resolve(import.meta.dirname, '..', '..', '..', 'pages');
const archivePath = resolve(import.meta.dirname, '..', 'archive');

const pageFolders = fs.readdirSync(pagesPath);

const DEFAULT_CHOICES = [
  { name: 'Background Script', value: 'background' }, // 必须的， 如果您的扩展需要在后台持续运行，处理事件或管理状态，则此组件是必需的。
  { name: 'Content Script (Execute JS on Web Page)', value: 'content' }, // 如果您的扩展需要在网页上执行 JavaScript，则需要此功能。
  { name: 'Content Script UI (Render Custom React Component on Web Page)', value: 'content-ui' }, // 如果您的扩展需要在网页上渲染自定义 React 组件，则需要此功能。
  { name: 'Content Script Runtime (Inject JS on Specific Actions like Popup Click)', value: 'content-runtime' }, // 如果您的扩展需要在特定操作（如点击弹出窗口）时注入 JavaScript，则需要此功能。
  { name: 'New Tab Override', value: 'new-tab' }, // 如果您的扩展需要自定义新标签页，则需要此功能。
  { name: 'Popup (On Extension Icon Click)', value: 'popup' }, //如果您的扩展需要在点击扩展图标时显示弹出窗口，则需要此功能。
  { name: 'DevTools (Include DevTools Panel)', value: 'devtools' }, //如果您的扩展需要添加自定义开发者工具面板，则需要此功能。
  { name: 'Side Panel', value: 'side-panel' }, //如果您的扩展需要提供侧边栏功能（Chrome 114+），则需要此功能。
  { name: 'Options Page', value: 'options' }, // 如果您的扩展需要提供设置或配置页面，则需要此功能。
];

export default async function deleteModules(manifestObject: chrome.runtime.ManifestV3) {
  const choices = DEFAULT_CHOICES.filter(choice => {
    if (choice.value === 'background') {
      return !!manifestObject.background;
    }
    return pageFolders.includes(choice.value);
  });

  if (!choices.length) {
    console.log('No features to delete');
    process.exit(0);
  }

  const answers = await checkbox({
    message: 'Choose the features you want to delete',
    loop: false,
    choices,
  });

  if (answers.length === 0) {
    console.log('No features selected');
    process.exit(0);
  }
  if (!fs.existsSync(archivePath)) {
    fs.mkdirSync(archivePath, { recursive: true });
  }
  if (answers.includes('background')) {
    deleteBackgroundScript(manifestObject);
  }
  if (answers.includes('content')) {
    await deleteContentScript(manifestObject);
  }
  if (answers.includes('content-ui')) {
    await deleteContentScriptUI(manifestObject);
  }
  if (answers.includes('content-runtime')) {
    await deleteContentScriptRuntime(manifestObject);
  }
  if (answers.includes('new-tab')) {
    await deleteNewTabOverride(manifestObject);
  }
  if (answers.includes('popup')) {
    await deletePopup(manifestObject);
  }
  if (answers.includes('devtools')) {
    await deleteDevTools(manifestObject);
  }
  if (answers.includes('side-panel')) {
    await deleteSidePanel(manifestObject);
  }
  if (answers.includes('options')) {
    await deleteOptionsPage(manifestObject);
  }
  console.log(`Deleted selected features: ${answers.join(', ')}`);
}

function deleteBackgroundScript(manifestObject: chrome.runtime.ManifestV3) {
  if (manifestObject.background) {
    delete manifestObject.background;
  }
}

async function deleteContentScript(manifestObject: chrome.runtime.ManifestV3) {
  await zipFolder(resolve(pagesPath, 'content'), resolve(archivePath, 'content.zip'));
  void rimraf(resolve(pagesPath, 'content'));
  const jsName = 'content/index.iife.js';
  manifestObject.content_scripts = manifestObject.content_scripts?.filter(script => {
    return !script.js?.includes(jsName);
  });
}

async function deleteContentScriptUI(manifestObject: chrome.runtime.ManifestV3) {
  await zipFolder(resolve(pagesPath, 'content-ui'), resolve(archivePath, 'content-ui.zip'));
  void rimraf(resolve(pagesPath, 'content-ui'));
  const jsName = 'content-ui/index.iife.js';
  manifestObject.content_scripts = manifestObject.content_scripts?.filter(script => {
    return !script.js?.includes(jsName);
  });
}

async function deleteContentScriptRuntime(manifestObject: chrome.runtime.ManifestV3) {
  await zipFolder(resolve(pagesPath, 'content-runtime'), resolve(archivePath, 'content-runtime.zip'));
  void rimraf(resolve(pagesPath, 'content-runtime'));
  const jsName = 'content-runtime/index.iife.js';
  manifestObject.content_scripts = manifestObject.content_scripts?.filter(script => {
    return !script.js?.includes(jsName);
  });
}

async function deleteNewTabOverride(manifestObject: chrome.runtime.ManifestV3) {
  await zipFolder(resolve(pagesPath, 'new-tab'), resolve(archivePath, 'new-tab.zip'));
  void rimraf(resolve(pagesPath, 'new-tab'));
  if (manifestObject.chrome_url_overrides) {
    delete manifestObject.chrome_url_overrides.newtab;
  }
}

async function deletePopup(manifestObject: chrome.runtime.ManifestV3) {
  await zipFolder(resolve(pagesPath, 'popup'), resolve(archivePath, 'popup.zip'));
  void rimraf(resolve(pagesPath, 'popup'));
  if (manifestObject.action) {
    delete manifestObject.action.default_popup;
  }
}

async function deleteDevTools(manifestObject: chrome.runtime.ManifestV3) {
  await zipFolder(resolve(pagesPath, 'devtools'), resolve(archivePath, 'devtools.zip'));
  await zipFolder(resolve(pagesPath, 'devtools-panel'), resolve(archivePath, 'devtools-panel.zip'));
  void rimraf(resolve(pagesPath, 'devtools'));
  void rimraf(resolve(pagesPath, 'devtools-panel'));
  if (manifestObject.devtools_page) {
    delete manifestObject.devtools_page;
  }
}

async function deleteSidePanel(manifestObject: chrome.runtime.ManifestV3) {
  await zipFolder(resolve(pagesPath, 'side-panel'), resolve(archivePath, 'side-panel.zip'));
  void rimraf(resolve(pagesPath, 'side-panel'));
  if (manifestObject.side_panel) {
    delete manifestObject.side_panel;
  }
  if (manifestObject.permissions?.includes('sidePanel')) {
    manifestObject.permissions = manifestObject.permissions.filter(permission => permission !== 'sidePanel');
  }
}

async function deleteOptionsPage(manifestObject: chrome.runtime.ManifestV3) {
  await zipFolder(resolve(pagesPath, 'options'), resolve(archivePath, 'options.zip'));
  void rimraf(resolve(pagesPath, 'options'));
  if (manifestObject.options_page) {
    delete manifestObject.options_page;
  }
}

async function zipFolder(path: string, out: string) {
  const fileList = await fg(['**/*', '!node_modules', '!dist'], {
    cwd: path,
    onlyFiles: true,
  });
  const output = createWriteStream(out);
  return new Promise<void>((promiseResolve, promiseReject) => {
    let aborted = false;

    const zip = new Zip((err, data, final) => {
      if (err) {
        promiseReject(err);
      } else {
        output.write(data);
        if (final) {
          output.end();
          promiseResolve();
          console.log(`Archive created at: ${out} for recovery`);
        }
      }
    });

    for (const file of fileList) {
      if (aborted) return;

      const absPath = resolve(path, file);
      const absPosixPath = posix.resolve(path, file);
      const relPosixPath = posix.relative(path, absPosixPath);

      console.log(`Achieving file: ${relPosixPath}`);
      streamFileToZip(
        absPath,
        relPosixPath,
        zip,
        () => {
          aborted = true;
          output.end();
          promiseReject(new Error('Aborted'));
        },
        error => {
          aborted = true;
          output.end();
          promiseReject(error);
        },
      );
    }

    zip.end();
  });
}

function streamFileToZip(
  absPath: string,
  relPath: string,
  zip: Zip,
  onAbort: () => void,
  onError: (error: Error) => void,
): void {
  const data = new AsyncZipDeflate(relPath, { level: 1 });
  void zip.add(data);

  createReadStream(absPath)
    .on('data', (chunk: string | Buffer) =>
      typeof chunk === 'string' ? data.push(Buffer.from(chunk), false) : data.push(chunk, false),
    )
    .on('end', () => data.push(new Uint8Array(0), true))
    .on('error', error => {
      onAbort();
      onError(error);
    });
}
