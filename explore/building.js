import { lib, game, ui, get, ai, _status } from "./noname.js";
import { basic } from "./utility.js";
import { musicItem, setting0 as setting } from "./setting.js";

export async function precontent(config, pack) {
	game.addMode("hs_hearthstone", {
		init() {
			Reflect.defineProperty(HTMLDivElement.prototype, "setBackground", {
				configurable: true,
				enumerable: false,
				writable: true,
				/**
				 * @this HTMLDivElement
				 * @type { typeof HTMLDivElement['prototype']['setBackground'] }
				 */
				value(name, type, ext, subfolder) {
					if (!name) {
						return this;
					}
					let src;
					if (ext === "noskin") {
						ext = ".jpg";
					}
					ext = ext || ".jpg";
					subfolder = subfolder || "default";
					if (type) {
						let dbimage = null,
						extimage = null,
						modeimage = null,
						nameinfo,
						gzbool = false;
						const mode = get.mode();
						if (type === "character") {
							nameinfo = get.character(name);
							if (lib.characterPack[`mode_${mode}`] && lib.characterPack[`mode_${mode}`][name]) {
								if (mode === "guozhan") {
									if (name.startsWith("gz_shibing")) {
										name = name.slice(3, 11);
									} else {
										if (lib.config.mode_config.guozhan.guozhanSkin && nameinfo && nameinfo.hasSkinInGuozhan) {
											gzbool = true;
										}
										name = name.slice(3);
									}
								} else {
									modeimage = mode;
								}
							} else if (name.includes("::")) {
								// @ts-expect-error ignore
								name = name.split("::");
								modeimage = name[0];
								name = name[1];
							}
						}
						let imgPrefixUrl;
						if (!modeimage && nameinfo) {
							if (nameinfo.img) {
								imgPrefixUrl = nameinfo.img;
							} else if (nameinfo.trashBin) {
								for (const value of nameinfo.trashBin) {
									if (value.startsWith("img:")) {
										imgPrefixUrl = value.slice(4);
										break;
									} else if (value.startsWith("ext:")) {
										extimage = value;
										break;
									} else if (value.startsWith("db:")) {
										dbimage = value;
										break;
									} else if (value.startsWith("mode:")) {
										modeimage = value.slice(5);
										break;
									} else if (value.startsWith("character:")) {
										name = value.slice(10);
										break;
									}
								}
							}
						}
						if (imgPrefixUrl) {
							src = imgPrefixUrl;
						} else if (extimage) {
							src = extimage.replace(/^ext:/, "extension/");
						} else if (dbimage) {
							this.setBackgroundDB(dbimage.slice(3)).then(lib.filter.none);
							return this;
						} else if (modeimage) {
							src = `image/mode/${modeimage}/character/${name}${ext}`;
						} else if (type === "character" && lib.config.skin[name] && arguments[2] !== "noskin") {
							src = `image/skin/${name}/${lib.config.skin[name]}${ext}`;
						} else if (type === "character") {
							src = `image/character/${gzbool ? "gz_" : ""}${name}${ext}`;
						} else {
							src = `image/${type}/${subfolder}/${name}${ext}`;
						}
					} else {
						src = `image/${name}${ext}`;
					}
					this.style.backgroundPositionX = "center";
					this.style.backgroundSize = "cover";
					if (type === "character") {
						const nameinfo = get.character(name);
						const hasNoDefaultPicture = nameinfo && nameinfo[4] && nameinfo[4].includes("noDefaultPicture");
						const sex = (nameinfo && ["male", "female", "double"].includes(nameinfo[0])) ? nameinfo[0] : "male";
						const backgrounds = hasNoDefaultPicture ? src : [src, `${lib.characterDefaultPicturePath}${sex}${ext}`];
						this.setBackgroundImage(backgrounds);
					} else {
						this.setBackgroundImage(src);
					}
					return this;
				},
			});
		},
		start() {
			"step 0"
			game.prepareArena(2);
			game.zhu = game.me.next;
			game.countPlayer(current => {
				current.getId();
			});
			"step 1"
			game.me.init("hs_comp");
			game.zhu.init("hs_player");
			"step 2"
			game.gameDraw(game.me);
			"step 3"
			game.phaseLoop(game.zhu);
		},
		game: {
			checkResult() {
				game.over((game.me).isAlive());
			},
		},
		element: {
			player: {
				dieAfter() {
					if (_status.mode != "normal" || _status.characterChoice[this.identity].length <= 3) {
						game.checkResult();
					}
				},
			},
		},
	}, {
		translate: "炉石普通",
		extension: "炉石普通",
		config: setting
	});
	lib.init.css(`${basic.extensionDirectoryPath}explore/style`, 'extension');
};