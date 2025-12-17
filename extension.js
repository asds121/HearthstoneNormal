import {
	lib,
	game,
	ui,
	get,
	ai,
	_status
} from "./explore/noname.js";
import {
	content
} from "./explore/content.js";
import {
	precontent
} from "./explore/building.js";
import {
	setting
} from "./explore/setting.js";
import {
	packages
} from "./explore/component/package/main.js";
import {
	basic
} from "./explore/utility.js";

export const type = "extension";
export default async function Application() {
	const Info = await lib.init.promises.json(`${basic.extensionDirectoryPath}info.json`);
	basic.extensionName = Info.name;
	try {
		const extension = {
			name: basic.extensionName,
			connect: true,
			editable: true,
			onremove() {},
			content,
			precontent,
			config: await basic.resolve(setting),
			help: {},
			package: await basic.resolve(packages),
			files: {
				"character": [],
				"card": [],
				"skill": [],
				"audio": []
			}
		};
		Object.keys(Info).filter(i => i != "name").forEach(i => extension.package[i] = Info[i]);
		extension.package.intro = `${basic.extensionPostcard.warn}`;
		return extension;
	} catch (error) {
		console.error(error.message);
		throw new Error(`Failed to initialize extension: ${error.message}`);
	} finally {}
};