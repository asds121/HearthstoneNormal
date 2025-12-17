import {
	lib,
	game,
	ui,
	get,
	ai,
	_status
} from "./noname.js";
import {
	basic
} from "./utility.js";

_status.hsextra = ["经典卡背", "萨尔", "炎魔之王", "万圣节", "炫丽彩虹", "守望先锋", "虚空之遗", "源生法杖", "电竞之星", "冠军试炼", "麦迪文", "麦格尼", "奥蕾莉亚", "风暴英雄", "奈法利安", "黄金挑战", "潘达利亚", "新年吉祥", "舞狮", "染柒推荐", "甜蜜胜利", "神秘图纸", "冬幕花冠", "我是传说", "熔火之心", "雷霆崖", "炉边好友", "爱如空气", "NAXX", "暴雪2014", "暴雪2015"].reduce((x, y) => {
	x[y] = y;
	return x;
}, {});

export const musicItem = {
	"follow": "跟随无名杀",
	"random": "随机",
	"pull up a chair": "欢迎来到酒馆",
	"亡き王女の为のセプテット": "亡き王女の为のセプテット",
	"エミヤ_UBW Extended": "エミヤ_UBW Extended",
	"巫妖王之怒": "巫妖王之怒",
	"letzteMohikaner": "最后的莫西干人",
};

export const setting0 = {
	"HS_bgm": {
		name: "对局音乐",
		intro: "可以更改对局音乐。",
		item: musicItem,
		init: "random",
		onclick(item) {
			game.saveConfig("HS_bgm", item, "hs_hearthstone");
			switch (item) {
				case "follow":
					delete _status.tempMusic;
					game.playBackgroundMusic();
					break;
				case "random":
					_status.tempMusic = Object.keys(musicItem).filter(key => key !== "random" && key !== "follow").map(key => `ext:${basic.extensionName}/resource/audio/bgm/${key}.mp3`);
					game.playBackgroundMusic();
					break;
				default:
					let url = `ext:${basic.extensionName}/resource/audio/bgm/${item}.mp3`;
					_status.tempMusic = url;
					game.playBackgroundMusic();
					break;
			}
		}
	},
	"HS_audioeffect": {
		"name": "音效",
		"init": true,
	},
	"HS_duelMode": {
		"name": "游戏模式",
		"init": "legend",
		"intro": "选择游戏模式",
		"item": {
			"testing": "测试卡效",
			"legend": "炉石传说",
			"single": "左右互搏",
			"brawl": "乱斗模式",
			"challenge": "挑战首领",
			"watching": "鉴赏卡牌",
		},
		onclick(item) {
			game.saveConfig("HS_duelMode", item, "hs_hearthstone");
		}
	},
	"HS_nobuilder": {
		"name": "跳过组卡步骤",
		"init": false,
		"intro": "选英雄后不进入组卡界面，直接进入游戏",
	},
	"hscardback": {
		"name": "卡背",
		"init": "经典卡背",
		"intro": "设置卡背",
		"item": _status.hsextra,
		onclick(item) {
			game.saveConfig("hscardback", item, "hs_hearthstone");
		},
		visualMenu(node, link, name) { //link是冒号前面的，比如default:经典卡背，link就是default
			node.style.height = node.offsetWidth * 1.3 + "px"; //高度设置成宽度的1.3倍
			node.style.backgroundSize = "100% 100%"; //图片拉伸
			if (link == "default") link = "经典卡背"; //如果选的default，那么图片是经典卡背.jpg
			node.className = "button character incardback"; //后面的incardback是我自定义的，不需要
			node.setBackgroundImage(`${basic.getExtensionRelativePath("resource")}asset/cardback/${link}.jpg`); //设置图片
		}
	},
	"HS_enemycardback": {
		"name": "ai卡背",
		"init": "same",
		"item": {
			"same": "和你相同",
			"random": "随机",
		},
		onclick(item) {
			game.saveConfig("HS_enemycardback", item, "hs_hearthstone");
		}
	},
	"HS_aichosen": {
		"name": "ai选人",
		"init": "random",
		"intro": "ai选决斗者的倾向",
		"item": {
			"random": "随机",
			"player": "你来选",
		},
		onclick(item) {
			game.saveConfig("HS_aichosen", item, "hs_hearthstone");
		}
	},
	"HS_aideck": {
		"name": "ai卡组",
		"init": "default",
		"intro": "设置ai卡组内容",
		"item": {
			"default": "默认卡组",
			"yourdeck": "你组的卡组",
		},
		onclick(item) {
			game.saveConfig("HS_aideck", item, "hs_hearthstone");
		}
	},
	"HS_first": {
		"name": "先后攻",
		"init": "random",
		"intro": "决定先后攻的方法",
		"item": {
			"random": "随机",
			"first": "先攻",
			"second": "后攻",
		},
		onclick(item) {
			game.saveConfig("HS_first", item, "hs_hearthstone");
		}
	},
	"HS_think": {
		"name": "思考时间",
		"init": "long",
		"item": {
			"fastest": "0.1秒",
			"fast": "0.5秒",
			"medium": "1秒",
			"long": "2秒",
			"slow": "3秒",
		},
		onclick(item) {
			game.saveConfig("HS_think", item, "hs_hearthstone");
		}
	},
};

export const setting = {
	"hs_big_img": {
		"name": "大图样式",
		"init": true,
		"intro": "还是看不清？试试这个！",
	},
	"HS_debug": {
		"name": "debugger",
		"init": false,
		"intro": "新手勿开。开启后，左上会出现调试按钮，点击会开启/停止css样式的自动更新。减少开局动画的延迟时间，点击卡牌收藏显示卡牌代码。",
	},
	"HS_reset": {
		"name": "重置存档",
		"intro": "清空所有卡组数据",
		"clear": true,
		onclick() {
			if (!lib.storage.hs_deck) {
				alert("重置失败，存档已清理或未进入游戏");
				return;
			}
			if (confirm("此操作不可逆，是否要清空所有卡组数据？")) {
				for (let i in lib.storage.hs_deck) {
					if (i.indexOf("_ai") < 0) delete lib.storage.hs_deck[i];
				}
				delete lib.storage.hs_deckname;
				game.save("hs_deck", lib.storage.hs_deck);
				game.save("hs_deckname", {});
				alert("清理成功！");
			}
		},
	},
	HS_codeConvenientInput: {
		name: "<button>制作卡牌</button>",
		clear: true,
		onclick() {
			let codeConvenientInput = ui.create.div(".codeConvenientInput", '<div><iframe width="' + document.body.offsetWidth + 'px" height="' + document.body.offsetHeight + 'px" src="' + `${basic.extensionDirectoryPath}explore/tool/codeConvenientInput.html" ></iframe></div>`, ui.window);
			let codeConvenientInput_close = ui.create.div('.codeConvenientInput_close', codeConvenientInput, function() {
				codeConvenientInput.delete()
			});
		}
	},
	HS_Tutorial: {
		name: "<button>查看教程</button>",
		clear: true,
		onclick() {
			let door = ui.create.div(".door", '<div><iframe width="' + document.body.offsetWidth + 'px" height="' + document.body.offsetHeight + 'px" src="' + `${basic.extensionDirectoryPath}explore/tool/tutorial.html" ></iframe></div>`, ui.window);
			let door_close = ui.create.div(".door_close", door, function() {
				door.delete()
			});
		}
	}
};