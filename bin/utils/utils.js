const execa = require("execa");
const path = require("path");
const fs = require("fs-extra");

const project = path.resolve(__dirname, "../");

const getDevtools = async () => {
  const { stdout } = await execa.command(
    "powershell reg query HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\微信开发者工具 /v UninstallString"
  );
  const temp = stdout.trimLeft().trimRight().split("  ");
  const uninstall = temp[temp.length - 1];
  const devtools = path.dirname(uninstall);
  return Promise.resolve(devtools)
};

const cli = async(command, options)=>{
  const devtools = await getDevtools();
  const cliPath = `${devtools}\\cli`;
  return execa(command, options)
}

const open = async () => {
  // http://127.0.0.1:端口号/v2/open?project=项目全路径
  // cli open 
  return cli('open', project)
};

const getPort = async function () {
  // ~/AppData/Local/微信开发者工具/User Data/Default/.ide
  const configFilePath = `${process.env.USERPROFILE}/AppData/Local/微信开发者工具/User Data`;
  const dirs = await fs.readdir(configFilePath);
  if (dirs.includes("Default")) {
    const result = await fs.readFile(`${configFilePath}/Default/.ide`);
    return Promise.resolve(result.toString());
  } else {
    for (const dir of dirs) {
      if (dir !== "Crashpad") {
        const result = await fs.readFile(
          `${configFilePath}/${dir}/Default/.ide`
        );
        return Promise.resolve(result.toString());
      }
    }
  }
  return Promise.reject({
    code: 404,
    msg: "没找到文件",
  });
};

module.exports = {
  getDevtools,
  open,
  project,
  getPort
}