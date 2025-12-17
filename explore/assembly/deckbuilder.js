//和创建元素相关的函数库
class Utils {
	static createElement(ui, div, css, inner) {
		const ele = ui.create.div(css, div, inner);
		Utils.mix(ele);
		return ele;
	}
	static createInputElement(div, obj) {
		const ele = document.createElement("input");
		Utils.mix(ele, obj);
		div.appendChild(ele);
		Utils.mix(ele);
		return ele;
	}
	static mix(ele, mixin) {
		mixin = mixin || {
			storage: {},
			triggerEvent(build, key, ...args) {
				return this.parentNode.triggerEvent.call(this, build, key, ...args);
			},
			set(target) {
				const builds = target.builds;
				this.get = key => builds.deckEditor[key];
				this.getBuild = function(build) {
					return builds[build];
				};
				this.triggerEvent = function(build, key, ...args) {
					if (builds[build][key]) {
						builds[build][key](...args);
					}
				};
			},
		};
		for (const key in mixin) {
			ele[key] = mixin[key];
		}
	}
	static upperCase(key) {
		return key.charAt(0).toUpperCase() + key.slice(1);
	}
}
// 作为所有卡组构建相关界面组件类的基类
class DeckBuilderDiv {
	static createElement() {
		throw new Error('Abstract method createElement must be implemented in subclasses');
	}
}
// 主页面类，负责创建卡组编辑的主界面及相关基础功能设置
class DeckBuilderMainPage extends DeckBuilderDiv {
	static createElement(ui, div) {
		return Utils.createElement(ui, div, ".hs_duel");
	}
}
// 头像类，负责创建头像相关的界面元素
class DeckBuilderHeadImage extends DeckBuilderDiv {
	static createElement(ui, div) {
		const tx = Utils.createElement(ui, div, ".hs_bd_tx");
		tx.kzname = Utils.createInputElement(tx, {
			type: "text",
			placeholder: "默认卡组",
		});
		return tx;
	}
}
// 卡组小工具类，负责创建卡组相关操作工具（如生成代码、导入代码按钮等）的界面元素及事件绑定
class DeckBuilderDeckTools extends DeckBuilderDiv {
	static createElement(ui, div) {
		const tx_xgj = Utils.createElement(ui, div, ".hs_bd_xgj");
		tx_xgj.btn1 = Utils.createInputElement(tx_xgj, {
			type: "button",
			value: "生成代码",
		});
		tx_xgj.btn2 = Utils.createInputElement(tx_xgj, {
			type: "button",
			value: "导入代码",
		});
		return tx_xgj;
	}
}
// 卡组区域类，负责创建展示卡组内卡片的界面区域
class DeckBuilderDeckArea extends DeckBuilderDiv {
	static createElement(ui, div) {
		return Utils.createElement(ui, div, ".hs_bd_dk");
	}
}
// 完成区域类，负责创建完成按钮的区域
class DeckBuilderConfirmArea extends DeckBuilderDiv {
	static createElement(ui, div) {
		const confirm = Utils.createElement(ui, div, ".hs_bd_cf");
		confirm.ok = Utils.createElement(ui, confirm, ".hs_bd_ok", "完成");
		confirm.ct = Utils.createElement(ui, confirm, ".hs_bd_ct");
		return confirm;
	}
	static createWatchingElement(ui, div) {
		const confirm = DeckBuilderConfirmArea.createElement(ui, div);
		confirm.ok.textContent = "切换";
		return confirm;
	}
}
// 职业卡牌按钮类
class DeckBuilderJobButton extends DeckBuilderDiv {
	static createElement(ui, div) {
		const btn = Utils.createElement(ui, div, ".hs_bd_jobtn");
		btn.id_count = 0;
		return btn;
	}
}
// 中立卡牌按钮类
class DeckBuilderNeutralButton extends DeckBuilderDiv {
	static createElement(ui, div) {
		const btn = Utils.createElement(ui, div, ".hs_bd_neubtn");
		btn.id_count = 1;
		return btn;
	}
}
// 衍生卡牌按钮类
class DeckBuilderTokenButton extends DeckBuilderDiv {
	static createElement(ui, div) {
		const btn = Utils.createElement(ui, div, ".hs_bd_tokbtn");
		btn.id_count = 2;
		return btn;
	}
}
// 卡片收藏区域类
class DeckBuilderCardBoard extends DeckBuilderDiv {
	static createElement(ui, div) {
		const cardboard = Utils.createElement(ui, div, ".hs_bd_bd");
		for (let i = 0; i < 8; i++) {
			const bg = Utils.createElement(ui, cardboard, ".bg");
			cardboard["bg" + i] = bg;
		}
		const btnfront = Utils.createElement(ui, cardboard, ".btnfront.hidden", "加入");
		cardboard.enter = btnfront;
		return cardboard;
	}
}
// 收藏标题类
class DeckBuilderPageHead extends DeckBuilderDiv {
	static createElement(ui, div) {
		return Utils.createElement(ui, div, ".hs_bd_tt");
	}
}
// 收藏页码类
class DeckBuilderPageIndex extends DeckBuilderDiv {
	static createElement(ui, div) {
		return Utils.createElement(ui, div, ".hs_bd_idx");
	}
}
// 左翻页类
class DeckBuilderLeftButton extends DeckBuilderDiv {
	static createElement(ui, div) {
		return Utils.createElement(ui, div, ".leftfy");
	}
} // 右翻页类
class DeckBuilderRightButton extends DeckBuilderDiv {
	static createElement(ui, div) {
		return Utils.createElement(ui, div, ".rightfy");
	}
}
// 水晶检索条类
class DeckBuilderManaBar extends DeckBuilderDiv {
	static createElement(ui, div) {
		const manabar = Utils.createElement(ui, div, ".manabar");
		for (let i = 0; i < 8; i++) {
			const mana = Utils.createElement(ui, manabar, ".mana");
			mana.textContent = "" + i;
			manabar["mana" + i] = mana;
		}
		return manabar;
	}
}
// 抽象工厂类的基类
class DeckBuilderFactory {
	evm = null;
	mode = "";
	UI = null;
	constructor(target) {
		this.evm = target.evm;
		this.mode = target.mode;
		this.UI = target.UI;
		this.getSuffix = target.getSuffix;
	}
	mainWork(factory, args) {
		const methods = this.getMethods();
		return (factory[methods[1]] || factory[methods[0]]).apply(factory, args);
	}
	getMethods() {
		const upperCase = Utils.upperCase(this.mode);
		const suffix = this.getSuffix();
		return [`create${suffix}`, `create${upperCase}${suffix}`];
	}
}
class DeckBuilderComponentFactory extends DeckBuilderFactory {
	createMainPageElement(ui, div) {
		return this.mainWork(DeckBuilderMainPage, [ui, div]);
	}
	createHeadImageElement(ui, div) {
		return this.mainWork(DeckBuilderHeadImage, [ui, div]);
	}
	createDeckToolsElement(ui, div) {
		return this.mainWork(DeckBuilderDeckTools, [ui, div]);
	}
	createDeckAreaElement(ui, div) {
		return this.mainWork(DeckBuilderDeckArea, [ui, div]);
	}
	createConfirmAreaElement(ui, div) {
		return this.mainWork(DeckBuilderConfirmArea, [ui, div]);
	}
	createJobButtonElement(ui, div) {
		return this.mainWork(DeckBuilderJobButton, [ui, div]);
	}
	createNeutralButtonElement(ui, div) {
		return this.mainWork(DeckBuilderNeutralButton, [ui, div]);
	}
	createTokenButtonElement(ui, div) {
		return this.mainWork(DeckBuilderTokenButton, [ui, div]);
	}
	createCardBoardElement(ui, div) {
		return this.mainWork(DeckBuilderCardBoard, [ui, div]);
	}
	createPageHeadElement(ui, div) {
		return this.mainWork(DeckBuilderPageHead, [ui, div]);
	}
	createPageIndexElement(ui, div) {
		return this.mainWork(DeckBuilderPageIndex, [ui, div]);
	}
	createLeftButtonElement(ui, div) {
		return this.mainWork(DeckBuilderLeftButton, [ui, div]);
	}
	createRightButtonElement(ui, div) {
		return this.mainWork(DeckBuilderRightButton, [ui, div]);
	}
	createManaBarElement(ui, div) {
		return this.mainWork(DeckBuilderManaBar, [ui, div]);
	}
}
// 作为所有卡组构建相关逻辑的基类
class DeckBuilderLogic {
	mixin = null;
	createLogic(div) {
		if (null === this.mixin) throw new Error("必须继承本类并初始化mixin");
		if (null === div) throw new Error("div不能为NULL");
		if (this.mixinEditor) this.mixinEditor(this.mixin);
		if (this.mixin.main) {
			for (const i in this.mixin) {
				if (i == "main") Utils.mix(div, this.mixin.main);
				else if (div[i]) Utils.mix(div[i], this.mixin[i]);
			}
		} else Utils.mix(div, this.mixin);
	}
}
// 主页面逻辑
class MainPageLogic extends DeckBuilderLogic {
	mixin = {
		showmsg(str, tm, tm2) {
			let error = true;
			if (tm == "noerror") {
				error = false;
				tm = tm2;
			}
			tm = tm || 2000;
			const that = this;
			const msg = Utils.createElement(that.get("ui"), that, ".hs_bd_msg");
			if (!error) msg.classList.add("noerror");
			msg.innerHTML = str;
			setTimeout(function() {
				msg.classList.add("active");
				setTimeout(function() {
					msg.classList.remove("active");
					msg.delete();
				}, tm);
			}, 200);
			return msg;
		},
		//展示卡片代码
		showcode(obj) {
			const that = this;
			let str = "{<br>";
			for (let i in obj) {
				str += i + ":" + that.get("get").stringify(obj[i]) + "<br>";
			}
			str += "}"
			const msg = that.showmsg(str, "noerror", 4000);
			msg.classList.add("code");
		},
	};
}
// 头像逻辑
class HeadImageLogic extends DeckBuilderLogic {
	mixin = {
		main: {
			changeImage(path) {
				this.style.backgroundImage = path + ".jpg)";
			},
		},
		kzname: {
			changeName(name) {
				this.value = name;
			}
		},
	};
}
// 卡组区域逻辑
class DeckAreaLogic extends DeckBuilderLogic {
	mixin = {
		addCardbar() {
			const that = this;
			const ui = that.get("ui");
			const mixin = {
				changeInfo({
					lib,
					get,
					name,
					path,
					position,
					count,
				} = {}) {
					const requiredParams = [lib, get, name, path, position, count];
					const firstUndefinedParam = requiredParams.find(param => param === undefined);
					if (firstUndefinedParam) {
						const paramNames = ['lib', 'get', 'name', 'path', 'position', 'count'];
						const index = requiredParams.indexOf(firstUndefinedParam);
						throw new Error(`参数 ${paramNames[index]} 不能为undefined，请正确传入参数`);
					}
					const bo = lib.card[name].hs_legend;
					const cost = lib.card[name].cost;
					this.name = name;
					this.childNodes[0].replaceData(0, 10, get.translation(name));
					this.style.backgroundImage = path + name + ".jpg)";
					this.classList[bo ? 'add' : 'remove']("hs_legend");
					this.position = position;
					this.style.top = position * this.baseHeight + "px";
					this.changeCount(bo, count);
					this.costDiv.textContent = cost;
				},
				changeCount(bo, count) {
					this.count = count;
					this.countDiv.innerHTML = (bo && count == 1) ? "★" : count;
				},
				highlight() {
					const that = this;
					setTimeout(function() {
						that.addTempClass("active", 1500);
					}, 500);
				},
			};
			const cardbar = Utils.createElement(ui, that, ".barcard", " ");
			cardbar.baseHeight = 36;
			cardbar.style.width = "100%";
			cardbar.style.height = cardbar.baseHeight + "px";
			cardbar.countDiv = Utils.createElement(ui, cardbar, ".count");
			cardbar.costDiv = Utils.createElement(ui, cardbar, ".cost");
			Utils.mix(cardbar, mixin);
			cardbar.listen(function() {
				that.removeCardbar(this);
			});
			return cardbar;
		},
		removeCardbar(div) {
			if (div.count == 1) this.removeChild(div);
			this.triggerEvent("deckEditor", "removeCard", div.name);
		},
		complete() {
			const shows = function(div) {
				div.highlight();
				setTimeout(function() {
					if (div.nextSibling) shows(div.nextSibling);
				}, 50);
			};
			shows(this.firstChild);
		},
	};
	createWatchingLogic(div) {
		this.createLogic(div);
		div.removeCardbar = () => 1;
	}
}
// 确认区域逻辑
class ConfirmAreaLogic extends DeckBuilderLogic {
	mixin = {
		main: {},
		ct: {
			changeJob(job) {
				this.innerHTML = "&emsp;" + job;
			},
			updateTittle(sum, limit) {
				this.textContent = sum + "/" + limit;
			},
		},
	};
}
// 卡牌按钮逻辑的基类
class ButtonLogic extends DeckBuilderLogic {
	mixin = {
		changeImage(path) {
			this.style.backgroundImage = path + ".png)";
		},
		active(bo) {
			if (bo != this.classList.contains("active")) this.classList.toggle("active");
		},
	};
}
// 职业卡牌按钮逻辑
class JobButtonLogic extends ButtonLogic {}
// 中立卡牌按钮逻辑
class NeutralButtonLogic extends ButtonLogic {}
// 衍生卡牌按钮逻辑
class TokenButtonLogic extends ButtonLogic {}
// 卡片收藏区域逻辑
class CardBoardLogic extends DeckBuilderLogic {
	mixin = {
		main: {},
	};
	mixinEditor(mixin) {
		for (let i = 0; i < 8; i++) {
			mixin["bg" + i] = {
				changeName(name) {
					this.name = name;
					this.style.display = "";
				},
				changeImage(path) {
					this.style.backgroundImage = path + ".jpg)";
				},
			};
		}
	}
}
// 收藏标题逻辑
class PageHeadLogic extends DeckBuilderLogic {
	mixin = {
		changeName(job) {
			this.textContent = job;
		},
	};
}
// 收藏页码逻辑
class PageIndexLogic extends DeckBuilderLogic {
	mixin = {
		changeIndex(index) {
			this.textContent = "第" + (index + 1) + "页";
		},
	};
}
// 逻辑工厂类
class DeckBuilderLogicFactory extends DeckBuilderFactory {
	createMainPageLogic(div) {
		return this.mainWork(new MainPageLogic(), [div]);
	}
	createHeadImageLogic(div) {
		return this.mainWork(new HeadImageLogic(), [div]);
	}
	createDeckAreaLogic(div) {
		return this.mainWork(new DeckAreaLogic(), [div]);
	}
	createConfirmAreaLogic(div) {
		return this.mainWork(new ConfirmAreaLogic(), [div]);
	}
	createJobButtonLogic(div) {
		return this.mainWork(new JobButtonLogic(), [div]);
	}
	createNeutralButtonLogic(div) {
		return this.mainWork(new NeutralButtonLogic(), [div]);
	}
	createTokenButtonLogic(div) {
		return this.mainWork(new TokenButtonLogic(), [div]);
	}
	createCardBoardLogic(div) {
		return this.mainWork(new CardBoardLogic(), [div]);
	}
	createPageHeadLogic(div) {
		return this.mainWork(new PageHeadLogic(), [div]);
	}
	createPageIndexLogic(div) {
		return this.mainWork(new PageIndexLogic(), [div]);
	}
}
// 作为所有卡组构建相关事件委托的基类
class DeckBuilderController {
	mixin = null;
	createController(div) {
		if (null === this.mixin) throw new Error("必须继承本类并初始化mixin");
		if (null === div) throw new Error("div不能为NULL");
		if (this.mixinEditor) this.mixinEditor(this.mixin);
		if (this.mixin.main) {
			for (const i in this.mixin) {
				if (i == "main") this.setController(div, this.mixin.main);
				else if (div[i]) this.setController(div[i], this.mixin[i]);
			}
		} else this.setController(div, this.mixin);
	}
	setController(div, obj) {
		for (const key in obj) {
			if (key == "click" && div.listen) div.listen(obj[key]);
			else div["on" + key] = obj[key];
		}
	}
}
// 头像事件委托
class HeadImageController extends DeckBuilderController {
	mixin = {};
	createWatchingController(div) {
		this.setController(div, {
			click() {
				this.triggerEvent("deckEditor", "nextHero");
			},
		});
		this.setController(div.kzname, {
			focus() {
				this.blur();
			},
		});
	}
}
// 卡组小工具事件委托
class DeckToolsController extends DeckBuilderController {
	mixin = {
		main: {
			click() {
				const that = this;
				if (that.classList.contains("active")) return;
				that.classList.add("active");
				if (that.tmot) {
					clearTimeout(that.tmot);
				}
				that.tmot = setTimeout(function() {
					that.classList.remove("active");
					delete that.tmot;
				}, 2000);
			},
		},
		btn1: {
			click() {
				this.triggerEvent("deckEditor", "generateCode");
			},
		},
		btn2: {
			click() {
				this.triggerEvent("deckEditor", "readCode");
			},
		},
	};
}
// 确认区域事件委托
class ConfirmAreaController extends DeckBuilderController {
	mixin = {
		main: {},
		ok: {
			click() {
				this.triggerEvent("deckEditor", "completeBuild");
			},
		},
	};
	createWatchingController(div) {
		this.setController(div.ok, {
			click() {
				this.triggerEvent("cardViewer", "nextJob");
			},
		});
	}
}
// 职业卡牌按钮事件委托
class JobButtonController extends DeckBuilderController {
	mixin = {
		click() {
			this.triggerEvent("cardViewer", "switchLabel", this);
		}
	};
}
// 中立卡牌按钮事件委托
class NeutralButtonController extends DeckBuilderController {
	mixin = {
		click() {
			this.triggerEvent("cardViewer", "switchLabel", this);
		}
	};
}
// 衍生卡牌按钮事件委托
class TokenButtonController extends DeckBuilderController {
	mixin = {
		click() {
			this.triggerEvent("cardViewer", "switchLabel", this);
		}
	};
}
// 卡片收藏区事件委托
class CardBoardController extends DeckBuilderController {
	mixin = {
		main: {},
		enter: {
			click() {
				this.triggerEvent("deckEditor", "addViewingCard");
			},
		},
	};
	mixinEditor(mixin) {
		for (let i = 0; i < 8; i++) {
			mixin["bg" + i] = {
				click() {
					this.triggerEvent("cardViewer", "switchViewing", this);
				},
			};
		}
	}
}
// 左翻页按钮事件委托
class LeftButtonController extends DeckBuilderController {
	mixin = {
		click() {
			this.triggerEvent("cardViewer", "previousPage");
		},
	};
}
// 右翻页按钮事件委托
class RightButtonController extends DeckBuilderController {
	mixin = {
		click() {
			this.triggerEvent("cardViewer", "nextPage");
		},
	};
}
// 水晶检索条事件委托
class ManaBarController extends DeckBuilderController {
	mixin = {
		main: {},
	};
	mixinEditor(mixin) {
		for (let i = 0; i < 8; i++) {
			mixin["mana" + i] = {
				click() {
					this.triggerEvent("cardViewer", "searchToView", parseInt(this.textContent));
				},
			};
		}
	}
}
// 事件委托工厂类
class DeckBuilderControllerFactory extends DeckBuilderFactory {
	createHeadImageController(div) {
		return this.mainWork(new HeadImageController(), [div]);
	}
	createDeckToolsController(div) {
		return this.mainWork(new DeckToolsController(), [div]);
	}
	createConfirmAreaController(div) {
		return this.mainWork(new ConfirmAreaController(), [div]);
	}
	createJobButtonController(div) {
		return this.mainWork(new JobButtonController(), [div]);
	}
	createNeutralButtonController(div) {
		return this.mainWork(new NeutralButtonController(), [div]);
	}
	createTokenButtonController(div) {
		return this.mainWork(new TokenButtonController(), [div]);
	}
	createCardBoardController(div) {
		return this.mainWork(new CardBoardController(), [div]);
	}
	createLeftButtonController(div) {
		return this.mainWork(new LeftButtonController(), [div]);
	}
	createRightButtonController(div) {
		return this.mainWork(new RightButtonController(), [div]);
	}
	createManaBarController(div) {
		return this.mainWork(new ManaBarController(), [div]);
	}
}
// 公共的函数库
class Utils2 {
	static extpath(build) {
		return build.get.HSF("extpath");
	}
}
// 和组卡相关的函数库
class Editor {
	// 单方函数
	static readHeroDeck(build, name) {
		const get = build.get;
		const lib = build.lib;
		const vdeck = lib.storage.hs_deck[name] || lib.storage.hs_deck[name + "_ai"];
		return vdeck.map(i => {
			const plit = i.split("*");
			return {
				name: get.HSF("getEN", [plit[0]]),
				num: parseInt(plit[1]),
			};
		});
	}
	static deckname(build, name) {
		const dname = build.lib.storage.hs_deckname;
		if (dname && dname[name]) return dname[name];
		else return "";
	}
	static saveNewDeck(build, hero, deckname) {
		const newdeck = Editor.build(build);
		build.get.HSF("saveDeck", [hero, newdeck]);
		const lib = build.lib;
		const game = build.game;
		if (deckname) {
			if (!lib.storage.hs_deckname) lib.storage.hs_deckname = {};
			lib.storage.hs_deckname[hero] = deckname;
			game.save("hs_deckname", lib.storage.hs_deckname);
		}
	}
	static canAddCard(build, name) {
		const get = build.get;
		const lib = build.lib;
		const confirm = build.UI.confirmArea;
		if (!confirm.ok.classList.contains("disabled")) return false;
		const count = build.currentDeck.countCard(name);
		const bo = lib.card[name].hs_legend;
		const bo2 = lib.card[name].hs_tokened || lib.card[name].hs_token;
		return !bo2 && (count == 0 || !bo && count == 1);
	}
	static build(build) { //根据div生成vdeck
		const get = build.get;
		const deckarea = build.UI.deckArea;
		return build.currentDeck.map(i => (`${get.translation(i.name)}*${i.num}`));
	}
	static deckLimit(build) { //套牌的卡片数量限制
		//if(某些未知条件)return 40;
		return 30;
	}
	static emptyDeck(build) {
		const deckarea = build.UI.deckArea;
		deckarea.innerHTML = "";
	}
	static calcTittle(build) {
		const confirm = build.UI.confirmArea;
		const sum = build.currentDeck.sum();
		const limit = Editor.deckLimit(build);
		confirm.ct.updateTittle(sum, limit);
		if (sum == limit) confirm.ok.classList.remove("disabled");
		else confirm.ok.classList.add("disabled");
	}
	static addCardbar(build, deckarea, card) {
		const cardbar = deckarea.addCardbar();
		const position = build.currentCount;
		Editor.setCardbar(build, cardbar, card, position);
		build.currentCount++;
		return cardbar;
	}
	static addCardbars(build, rawDeck) {
		const deckarea = build.UI.deckArea;
		for (const card of rawDeck) {
			Editor.addCardbar(build, deckarea, card);
		}
		deckarea.scrollTo({
			top: 0,
			behavior: 'auto'
		});
	}
	// 双方函数
	static setCardbar(build, div, card, position) {
		const lib = build.lib;
		const get = build.get;
		const name = card.name;
		const path = build.cardbarPath;
		const count = card.num
		div.changeInfo({
			lib,
			get,
			name,
			path,
			position,
			count
		});
	}
	// 多方函数
	static checkFinish(ok, win, errormsg) {
		if (ok.classList.contains("disabled")) {
			win.showmsg(errormsg);
			return false;
		} else return true;
	}
}
// 组卡数据类
class EditorData extends Array {
	constructor(target) {
		super();
		this.lib = target.lib;
	}
	sortByGame() {
		this.sort(this.lib.sort.hs_duel);
	}
	sum() {
		return this.reduce((x, y) => x + y.num, 0);
	}
	empty() {
		this.length = 0;
	}
	hasCard(name) {
		return this.some(i => i.name == name);
	}
	countCard(name) {
		if (this.hasCard(name)) {
			const item = this.find(i => i.name == name);
			return item.num;
		} else return 0;
	}
	addCard(name, num = 1, sort = true) {
		if (this.hasCard(name)) {
			const item = this.find(i => i.name == name);
			item.num += num;
		} else {
			this.push({
				name,
				num
			});
			if (sort) this.sortByGame();
		}
	}
	removeCard(name, num = 1) {
		if (this.hasCard(name)) {
			const item = this.find(i => i.name == name);
			item.num -= num;
			if (item.num <= 0) this.remove(item);
		} else return;
	}
	from(rawDeck) {
		this.empty();
		for (const card of rawDeck) {
			this.addCard(card.name, card.num, false);
		}
		this.sortByGame();
	}
	static code(build) { //生成神秘代码
		const ok = build.UI.confirmArea.ok;
		const win = build.UI.mainPage;
		const deckarea = build.UI.deckArea;
		if (!Editor.checkFinish(ok, win, "该卡组不足30张，无法生成代码")) return;
		const get = build.get;
		const viewer = win.getBuild("cardViewer");
		const jobsarr = viewer.jobsarr;
		const job = viewer.currentJob;
		let ori = jobsarr.indexOf(job).toString(16);
		const deck = [];
		const rawDeck = build.currentDeck;
		rawDeck.forEach(i => {
			const rna = get.rnature(i.name);
			let jjob = jobsarr.indexOf(rna);
			jjob = jjob < 0 ? jobsarr.indexOf("hs_neutral") : jjob;
			const item = {
				job: jjob.toString(16),
				pos: (rna == job ? viewer.cardssets[0] : viewer.cardssets[1]).indexOf(i.name).toString(16),
				num: i.num,
			};
			deck.push(item);
		});
		let str = "Z" + ori + deck.reduce((x, y) => x + "g" + (y.job == ori ? "y" : y.job) + "" + y.pos + "" + y.num, "");
		str = str.replaceAll("1g", "h");
		str = str.replaceAll("2g", "i");
		str = str.replaceAll("hy", "j");
		str = str.replaceAll("iy", "k");
		str = str.replaceAll("ha", "l");
		str = str.replaceAll("ia", "m");
		const element = document.createElement("textarea");
		element.value = str;
		document.body.appendChild(element);
		element.select();
		element.setSelectionRange(0, element.value.length);
		document.execCommand('copy');
		element.remove();
		win.showmsg("已复制到剪切板，快去分享吧！", "noerror");
	}
	static decode(build) { //解析神秘代码
		const game = build.game;
		const get = build.get;
		const win = build.UI.mainPage;
		game.prompt("请粘贴神秘代码", function(str) {
			if (typeof str != "string") return;
			str = str.replaceAll("m", "ia");
			str = str.replaceAll("l", "ha");
			str = str.replaceAll("k", "iy");
			str = str.replaceAll("j", "hy");
			str = str.replaceAll("i", "2g");
			str = str.replaceAll("h", "1g");
			str = str.replaceAll("g", ",");
			if (str.indexOf("Z") < 0 || str.indexOf("-") >= 0) {
				win.showmsg("代码格式不正确！导入终止");
				return;
			}
			const arr = str.split(",");
			const to10 = function(ss) {
				return parseInt(eval("0x" + ss).toString(10));
			};
			const ori = to10(arr[0].slice(1));
			const odeck = arr.slice(1);
			if (!odeck.length) {
				win.showmsg("卡组结构不正确！导入终止");
				return;
			}
			const viewer = win.getBuild("cardViewer");
			const jobsarr = viewer.jobsarr;
			const job = viewer.currentJob;
			const cjob = jobsarr.indexOf(job);
			if (odeck.some(i => ori != cjob || i[0] != "a" && i[0] != "y")) {
				win.showmsg("卡组职业不匹配！导入终止");
				return;
			}
			const rawDeck = [];
			const tonjob = function(x) {
				if (x == "y") return ori;
				else return to10(x);
			};
			while (odeck.length) {
				const ocode = odeck.shift();
				const njob = tonjob(ocode.slice(0, 1));
				const nind = to10(ocode.slice(1, -1));
				const ncards = jobsarr[njob] == "hs_neutral" ? viewer.cardssets[1] : viewer.cardssets[0];
				const name = ncards[nind];
				const num = parseInt(ocode.slice(-1));
				rawDeck.push({
					name,
					num,
				});
			}
			build.readDeck("", rawDeck, true);
			win.showmsg("导入成功！", "noerror");
		});
	}
}
// 和卡片收藏有关的函数库
class Viewer {
	// 单方函数
	static currentIndex(build) { //获取当前收藏页码
		return build.currentIndexs[build.currentSetIndex];
	}
	static checkPageButtons(build) { //更新翻页箭头的显示
		const set = build.currentSet;
		const ind = Viewer.currentIndex(build);
		const total = Math.ceil(set.length / 8);
		const leftfy = build.UI.leftButton;
		const rightfy = build.UI.rightButton;
		if (ind == 0) leftfy.hide();
		else leftfy.show();
		if (ind + 1 == total) rightfy.hide();
		else rightfy.show();
	}
	static noView(build) {
		const t = build.currentView;
		if (t) {
			delete build.currentView;
			t.classList.remove("view");
			setTimeout(function() {
				t.classList.remove("active");
			}, 500);
		}
		return t;
	}
	static clearInterval(build) {
		clearInterval(build.currentInter);
	}
	// 双方函数
	static checkKbtt(div, build) { //更新卡本标题
		const kbtt = build.UI.pageHead;
		if (div.id_count == 0) {
			const job = build.currentJob;
			let na = build.get.HS_trans(job);
			na = na.length > 3 ? na.slice(0, 2) : na;
			kbtt.changeName(na);
		} else if (div.id_count == 1) kbtt.changeName("中立");
		else if (div.id_count == 2) kbtt.changeName("衍生卡");
	}
	static view(div, build) { //卡牌放大后执行的内容：1.播放随从配音，2.开发模式下显示代码
		build.currentView = div;
		div.classList.add("view");
		div.classList.add("active");
		const get = build.get;
		const lib = build.lib;
		const win = build.UI.mainPage;
		if (get.type(div) == "HS_minor") get.HSF("Aud", [div, "play"]);
		if (get.subtype(div) != "HS_normal" && get.HSF("cfg", ["HS_debug"])) {
			if (get.subtype(div) == "HS_effect") {
				const skillname = get.HSF("tr", [div.name]);
				win.showcode(lib.skill[skillname]);
			} else win.showcode(lib.card[div.name]);
		}
	}
}
// 作为所有为我组卡类的基类
class DeckBuilderBuild {
	UI = null;
	mixin = null;
	constructor(target) {
		Object.assign(this, target.evm);
		this.UI = target.UI;
	}
	createBuild() {
		Utils.mix(this, this.mixin);
		return this;
	}
}
// 编辑卡组功能类
class DeckEditorBuild extends DeckBuilderBuild {
	constructor(target) {
		super(target);
		const extpath = Utils2.extpath(this);
		this.txImagePath = `url(${extpath}resource/asset/duelist/`;
		this.cardbarPath = `url(${extpath}resource/image/decoration/barcard_con.png),url(${extpath}resource/asset/card/`;
		const list = this.get.HSA("duelist").concat(this.get.HSA("skin"));
		this.heroarr = list.concat(list);
		this.currentCount = 0;
		this.currentDeck = new EditorData(this);
	}
	mixin = {
		changeHero(name) {
			const path = this.txImagePath + name;
			const dname = Editor.deckname(this, name);
			const tx = this.UI.headImage;
			this.currentHero = name;
			tx.changeImage(path);
			const rawDeck = Editor.readHeroDeck(this, name);
			this.readDeck(dname, rawDeck);
		},
		nextHero() {
			const hero = this.heroarr[this.heroarr.indexOf(this.currentHero) + 1];
			this.changeHero(hero);
		},
		generateCode() {
			EditorData.code(this);
		},
		readCode() {
			EditorData.decode(this);
		},
		readDeck(name, rawDeck, shows) {
			const tx = this.UI.headImage;
			tx.kzname.changeName(name);
			this.resetDeck(rawDeck);
			if (shows) {
				const deckarea = this.UI.deckArea;
				deckarea.complete();
			}
		},
		addCard(name) {
			this.currentDeck.addCard(name);
			this.updateDeck(name);
		},
		removeCard(name) {
			this.currentDeck.removeCard(name);
			this.updateDeck();
		},
		resetDeck(rawDeck) {
			Editor.emptyDeck(this);
			this.currentDeck.from(rawDeck);
			this.currentCount = 0;
			Editor.addCardbars(this, this.currentDeck);
			Editor.calcTittle(this);
		},
		updateDeck(highlightName) {
			const rawDeck = this.currentDeck;
			const deckarea = this.UI.deckArea;
			const deckunits = Array.from(deckarea.querySelectorAll(".barcard"));
			for (let i = 0, j = 0; i < rawDeck.length; i++, j++) {
				const card = rawDeck[i],
					item = deckunits[j];
				const name = card.name,
					num = card.num;
				if (!item || name != item.name) {
					this.currentCount = j;
					const cardbar = Editor.addCardbar(this, deckarea, {
						name,
						num: 1
					});
					deckarea.insertBefore(cardbar, deckarea.children[j]);
					cardbar.highlight();
					j--;
				} else if (name == item.name && num == item.num && i == item.position) continue;
				else {
					if (name == highlightName) item.highlight();
					Editor.setCardbar(this, item, card, i);
				}
			}
			Editor.calcTittle(this);
			this.currentCount = rawDeck.length;
		},
		addViewingCard() {
			const win = this.UI.mainPage;
			const viewer = win.getBuild("cardViewer");
			if (!viewer.currentView) return;
			this.addCard(viewer.currentView.name);
		},
		completeBuild() {
			const ok = this.UI.confirmArea.ok;
			const win = this.UI.mainPage;
			const tx = this.UI.headImage;
			const game = this.game;
			const ui = this.ui;
			//保存并使用新卡组
			if (!Editor.checkFinish(ok, win, "一副卡组需要30张牌，请再补充些卡！")) return;
			Editor.saveNewDeck(this, game.me.name, tx.kzname.value);
			this.get.hs_deck(game.me);
			const viewer = win.getBuild("cardViewer");
			Viewer.clearInterval(viewer);
			//消失动画
			win.style.opacity = "0";
			setTimeout(function() {
				if (win.parentNode == ui.window) ui.window.removeChild(win);
			}, 500);
			game.resume();
		},
	};
}
// 鉴赏卡牌功能类
class CardViewerBuild extends DeckBuilderBuild {
	constructor(target) {
		super(target);
		const extpath = Utils2.extpath(this);
		this.buttonpath = `url(${extpath}resource/image/nature/`;
		this.cardpath = `url(${extpath}resource/asset/card/`;
		const arr = Object.keys(this.get.HSA("easy"));
		this.jobsarr = arr;
		const list = arr.slice(0, -3);
		this.jobarr = list.concat(list);
		const that = this;
		this.currentInter = setInterval(function() {
			const cardboard = that.UI.cardBoard;
			if (that.currentView) {
				const name = that.currentView.name;
				const editor = cardboard.getBuild("deckEditor")
				const bo = Editor.canAddCard(editor, name);
				if (bo) cardboard.enter.show();
				else cardboard.enter.hide();
			} else cardboard.enter.hide();
		}, 500);
	}
	mixin = {
		changeJob(job) {
			this.currentJob = job;
			const path = this.buttonpath + job
			const confirm = this.UI.confirmArea;
			const jobtn = this.UI.jobButton;
			const tokbtn = this.UI.tokenButton;
			//更换确认区域图标
			if (confirm.ok.textContent == "切换") confirm.ct.changeJob(this.get.translation(job));
			//左上角按钮更换职业
			jobtn.changeImage(path);
			tokbtn.changeImage(path);
			this.cardssets = [
				this.get.hskachi("all", (ca, info) => info.rnature == job),
				this.get.hskachi("all", (ca, info) => !info.rnature || info.rnature == "hs_neutral"),
				this.get.hskachi("all", (ca, info) => (!info.rnature || info.rnature == "hs_neutral" || info.rnature == job || info.rnature == "hs_dream") && (info.hs_tokened || info.hs_token), true)
			];
			this.currentIndexs = [0, 0, 0];
			this.switchLabel(jobtn, true);
		},
		nextJob() {
			const job = this.jobarr[this.jobarr.indexOf(this.currentJob) + 1];
			this.changeJob(job);
		},
		switchLabel(div, forced) {
			if (div.classList.contains("active") && !forced) return;
			const arr = [this.UI.jobButton, this.UI.neutralButton, this.UI.tokenButton];
			arr.forEach(i => i.active(i == div));
			//更改卡牌集
			this.currentSetIndex = div.id_count;
			this.currentSet = this.cardssets[this.currentSetIndex];
			//更改收藏标题
			Viewer.checkKbtt(div, this);
			//跳转卡牌集当前页码
			this.changePage(Viewer.currentIndex(this));
		},
		switchViewing(div) {
			const t = Viewer.noView(this);
			if (t != div) Viewer.view(div, this);
		},
		changePage(idx) {
			this.currentIndexs[this.currentSetIndex] = idx;
			const cardBoard = this.UI.cardBoard;
			const pageIndex = this.UI.pageIndex;
			Viewer.noView(this);
			for (let i = 0; i < 8; i++) {
				const bg = cardBoard["bg" + i];
				if (this.currentSet[idx * 8 + i]) {
					const c = this.currentSet[idx * 8 + i];
					bg.changeName(c);
					bg.changeImage(this.cardpath + c);
				} else bg.style.display = "none";
			}
			pageIndex.changeIndex(idx);
			Viewer.checkPageButtons(this);
		},
		previousPage() {
			this.changePage(Viewer.currentIndex(this) - 1);
		},
		nextPage() {
			this.changePage(Viewer.currentIndex(this) + 1);
		},
		searchToView(num) {
			const win = this.UI.mainPage;
			const manas = this.UI.manaBar;
			const cardboard = this.UI.cardBoard;
			const lib = this.lib;
			if (manas.searching) return;
			manas.searching = true;
			const set = this.currentSet;
			const ind = set.findIndex(n => {
				const c = lib.card[n].cost;
				if (num == 7) return c >= 7;
				else return c == num
			});
			if (ind == -1) {
				if (num != 7) win.showmsg("抱歉，找不到费用为" + num + "的卡牌");
				else win.showmsg("抱歉，找不到费用为7以上的卡牌");
				delete manas.searching;
				return;
			} else {
				const total = Math.ceil((ind + 1) / 8);
				this.changePage(total - 1);
				setTimeout(function() {
					delete manas.searching;
					manas.triggerEvent("cardViewer", "switchViewing", cardboard["bg" + (ind % 8)]);
				}, 500);
			}
		},
	};
}
// 为我组卡工厂类
class DeckBuilderBuildFactory extends DeckBuilderFactory {
	createDeckEditorBuild() {
		return this.mainWork(new DeckEditorBuild(this));
	}
	createCardViewerBuild() {
		return this.mainWork(new CardViewerBuild(this));
	}
}
// 执行中心类的基类
class ExecuteCenter {
	evm = null; //环境变量
	mode = "";
	UI = null; //界面元素
	constructor(target) {
		this.evm = target.evm;
		this.mode = "legend";
		if (target.currentMode == "watching") this.mode = target.currentMode;
		this.UI = target.UI;
	}
	work() {
		return this.mainWork();
	}
	mainWork() {
		const factory = this.getFactory();
		for (const key in this.UI) {
			const fun = this.getCreateFunction(key, factory);
			fun.call(factory, this.UI[key]);
		}
	}
	getFactory() {
		throw new Error('Abstract method getFactory must be implemented in subclasses');
	}
	getSuffix() {
		throw new Error('Abstract method getSuffix must be implemented in subclasses');
	}
	getCreateFunction(key, factory) {
		const upperCase = Utils.upperCase(key);
		const suffix = this.getSuffix();
		const concrete = `create${upperCase}${suffix}`;
		const fun = factory[concrete];
		if (typeof fun != "function") return a => 1;
		else return fun;
	}
}
// 执行UI创建类
class ExecuteUICenter extends ExecuteCenter {
	mainWork() {
		const ui = this.evm.ui;
		const design = this.getDesign(this.mode);
		const res = {};
		const factory = this.getFactory();
		for (const key in design) {
			const fun = this.getCreateFunction(key, factory);
			if (key == "mainPage") res[key] = fun.call(factory, ui, ui.window);
			else res[key] = fun.call(factory, ui, res[design[key]]);
		}
		return res;
	}
	getDesign(mode) {
		const upperCase = Utils.upperCase(mode);
		const concrete = `create${upperCase}ModeDesign`;
		const fun = new DeckBuilderDesignFactory(this)[concrete];
		if (typeof fun != "function") return;
		else return fun();
	}
	getFactory() {
		return new DeckBuilderComponentFactory(this);
	}
	getSuffix() {
		return "Element";
	}
}
// 界面设计类的基类
class DeckBuilderDesign {
	createDesign() {
		throw new Error('Abstract method createDesign must be implemented in subclasses');
	}
}
// 通用模式界面设计类
class GeneralModeDesign extends DeckBuilderDesign {
	createDesign() {
		return {
			mainPage: "ui.window",
			headImage: "mainPage",
			deckTools: "headImage",
			deckArea: "mainPage",
			confirmArea: "mainPage",
			jobButton: "mainPage",
			neutralButton: "mainPage",
			tokenButton: "mainPage",
			cardBoard: "mainPage",
			pageHead: "mainPage",
			pageIndex: "mainPage",
			leftButton: "mainPage",
			rightButton: "mainPage",
			manaBar: "mainPage",
		};
	}
}
// 观看模式界面设计类
class WatchingModeDesign extends DeckBuilderDesign {
	createDesign() {
		return {
			mainPage: "ui.window",
			headImage: "mainPage",
			deckArea: "mainPage",
			confirmArea: "mainPage",
			jobButton: "mainPage",
			neutralButton: "mainPage",
			tokenButton: "mainPage",
			cardBoard: "mainPage",
			pageHead: "mainPage",
			pageIndex: "mainPage",
			leftButton: "mainPage",
			rightButton: "mainPage",
			manaBar: "mainPage",
		};
	}
}
// 界面设计工厂类
class DeckBuilderDesignFactory extends DeckBuilderFactory {
	createLegendModeDesign() {
		return new GeneralModeDesign().createDesign();
	}
	createWatchingModeDesign() {
		return new WatchingModeDesign().createDesign();
	}
}
// 执行逻辑创建类
class ExecuteLogicCenter extends ExecuteCenter {
	getFactory() {
		return new DeckBuilderLogicFactory(this);
	}
	getSuffix() {
		return "Logic";
	}
}
// 执行事件委托创建类
class ExecuteControllerCenter extends ExecuteCenter {
	getFactory() {
		return new DeckBuilderControllerFactory(this);
	}
	getSuffix() {
		return "Controller";
	}
}
// 为我组卡创建类
class ExecuteBuildCenter extends ExecuteCenter {
	mainWork() {
		const factory = this.getFactory();
		const obj = {
			deckEditor: "",
			cardViewer: "",
		};
		const res = {};
		for (const key in obj) {
			const fun = this.getCreateFunction(key, factory);
			res[key] = fun.call(factory);
		}
		return res;
	}
	getFactory() {
		return new DeckBuilderBuildFactory(this);
	}
	getSuffix() {
		return "Build";
	}
}
// 整个类用于管理卡组编辑相关的功能，整合界面创建、逻辑处理以及交互控制等方面
export default class TheLordClass {
	evm = null; //环境变量
	currentMode = ""; //当前模式
	UI = null; //界面元素
	builds = null; //功能逻辑
	constructor(environment, currentMode) {
		this.initEnvironment(environment, currentMode);
		this.initDeckBuilderUI();
		this.initDeckBuilderLogic();
		this.initDeckBuilderController();
	}
	initEnvironment(environment, currentMode) {
		this.evm = {
			lib: environment[0],
			game: environment[1],
			ui: environment[2],
			get: environment[3],
			ai: environment[4],
			_status: environment[5],
		};
		this.currentMode = currentMode;
	}
	initDeckBuilderUI() {
		this.UI = new ExecuteUICenter(this).work();
	}
	initDeckBuilderLogic() {
		new ExecuteLogicCenter(this).work();
		this.builds = new ExecuteBuildCenter(this).work();
		for (const i in this.UI) {
			this.UI[i].set(this);
		}
		this.builds.deckEditor.changeHero(this.evm.game.me.name);
		this.builds.cardViewer.changeJob(this.evm.game.me.group);
	}
	initDeckBuilderController() {
		new ExecuteControllerCenter(this).work();
	}
}