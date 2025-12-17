import { lib, game, ui, get, ai, _status } from "./noname.js";
import { openExtensionManagerBoard } from "./plugin/main.js";
import { basic } from "./utility.js";

export async function content(config, pack) {
	lib.configMenu.general.config["manager"] = {
		name: "<span id='hskzgj'>扩展管理☜</span>",
		unfrequent: true,
		clear: true,
		onclick() {
			openExtensionManagerBoard();
		}
	};
};