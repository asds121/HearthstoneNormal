import { lib, game, ui, get, ai, _status } from "./noname.js";

class Basic {
	constructor() {
		this.basicPath = lib.init.getCurrentFileLocation(import.meta.url);
		this.extensionName = null;
		this.extensionDirectoryPath = this.basicPath.slice(0, this.basicPath.lastIndexOf("explore/utility.js"));
		this.extensionPostcard = {
			warn: "炉石普通，简化炉石规则的<br><span class=firetext>模式扩展</span>。",
			img: "<br>有事请加Q群"
		};
	};


	// 获取扩展名
	getExtensionName() {
		if (this.extensionName) return this.extensionName;
		let str1 = this.basicPath.slice(0, this.basicPath.lastIndexOf("/explore/utility.js"));
		this.extensionName = str1.slice(str1.lastIndexOf("/") + 1);
		return this.extensionName;
	};

	// 获取相对于扩展文件的位置路径
	getExtensionRelativePath(path = "none") {
		switch (path) {
			case "code":
				return `extension/${this.getExtensionName()}/explore/`;
			case "resource":
				return `extension/${this.getExtensionName()}/resource/`;
				//细分标准
			case "subcode":
				return `extension/${this.getExtensionName()}/explore/assembly/`;
			case "theme":
				return `extension/${this.getExtensionName()}/theme/`;
			case "resImg":
				return `extension/${this.getExtensionName()}/resource/image/`;
			default:
				return `extension/${this.getExtensionName()}/`;
		};
	};

	/**
	 * 如果参数是function，返回其结果的promise。如果参数是普通对象，返回Promise.resolve(obj);
	 * @param {*} obj
	 * @returns
	 */
	resolve(obj) {
		if (typeof obj === "function") {
			return Promise.resolve(obj());
		} else {
			return Promise.resolve(obj);
		}
	};
};

export const basic = new Basic();