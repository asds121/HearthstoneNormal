import {
	lib,
	game,
	ui,
	get,
	ai,
	_status
} from "../noname.js";
import {
	basic
} from "../utility.js";
import {
	HSstring,
	HSarray
} from "./class.js";
import TheLordClass from "./deckbuilder.js";

export default { //常量
	//魔法卡相关
	canchenmo: ["jinu", "chenmo", "chaofeng", "shengdun", "fengnu", "superfengnu", "chongfeng", "mianyi", "dongjie", "dongjied", "qianxing", "jvdu", "xixie", "momian"],
	hz: ["draw1", "frost", "discard1"],
	yineng: {
		冻结: "dongjie",
		魔免: "momian",
		健忘: "jianwang",
		狂斧: "kuangfu",
		潜行: "qianxing",
		免疫: "mianyi",
		冲锋: "chongfeng",
		风怒: "fengnu",
		圣盾: "shengdun",
		嘲讽: "chaofeng",
		剧毒: "jvdu",
		吸血: "xixie",
		突袭: "tuxi",
		超怒: "superfengnu",
		射击: "sheji", //ZZADAN
	},
	//隐藏关键字
	yincang: {
		"冻结任何受到该随从伤害的角色": "冻结",
		"无法成为法术或英雄技能的目标": "魔免",
		"扰魔": "魔免",
		"同时对其攻击目标相邻的随从造成伤害": "狂斧",
		"50%几率攻击错误的敌人": "健忘",
		"超级风怒": "超怒",
		"冲冲冲冲锋": "冲锋",
	},
};

export const mb = { //英雄技能模板
	enable: "phaseUse",
	direct: true,
	nobracket: true,
	content() {
		player.hs_use_heroskill();
	},
	ai: {
		order: 1,
		result: {
			player: 1,
		},
	},
};

export const heroskill = {
	//基础英雄技能//炉石普通
	diej: ["全副武装", "获得2点护甲", "hs_warrior", 2, "player.changeHujia(2);"],
	huoc: ["火焰冲击", "造成1点伤害", "hs_mage", 2, "target.hs_dmgrcv('damage',player,'fire').hs_heroskill=true;", ["F:all", "return get.dmgEffect(target, player, player,1) + 0.1;"], {
		order: 6,
		result: {
			player(player) {
				if (game.hasPlayer(function(target) {
						return get.dmgEffect(target, player, player, 1) + 0.1 > 0;
					})) return 1;
				else return 0;
			},
		},
	}],
	shej: ["稳固射击", "对敌方英雄造成2点伤害", "hs_hunter", 2, "target.hs_dmgrcv('damage',2, player).hs_heroskill=true;", "R:function(player){return player.getOppo();}"],
	zhil: ["次级治疗术", "恢复2点生命值", "hs_priest", 2, "target.hs_dmgrcv('recover',2,player).hs_heroskill=true;", ["F:all", "return get.rcvEffect(target, player, player,1) + 0.1;"], {
		order: 1,
		result: {
			player(player) {
				return Math.max.apply(Math, player.sctp().map(i => get.rcvEffect(i, player, player) + 1));
			},
		},
	}],
	fenl: ["生命分流", "抽一张牌并受到2点伤害", "hs_warlock", 2, ["player.hs_dmgrcv('damage',2, player).hs_heroskill=true;", "player.hs_drawDeck().hs_heroskill=true;"], "", {
		order: 6,
		result: {
			player(player) {
				if (player.hp > 2 && player.cardPile.countCards("h")) return 1;
				else return 0;
			},
		},
	}],
	biax: ["变形", "本回合+1攻击力。+1护甲值。", "hs_druid", 2, "player.hs_atkhj([1,1],1);"],
	yuaj: ["援军", "召唤一个1/1的白银之手新兵。", "hs_paladin", 2, "player.SSfellow('白银之手新兵');"],
	ttzh: ["图腾召唤", "随机召唤一个图腾。", "hs_shaman", 2, "player.SSfellow('cdset:图腾,norepeat');", "f:return player.sctp('mine',fl=>get.HSA('collect')['图腾'].includes(get.translation(fl.name)),true).length<4;"],
	shad: ["匕首精通", "装备一把1/2的匕首", "hs_rogue", 2, "player.hs_weapon('邪恶短刀').hs_heroskill=true;", "", {
		order: 6,
		result: {
			player(player) {
				if (player.data_weapon) return 0;
				else return 1;
			},
		},
	}],
	qins: ["侵蚀", "召唤一只白斑蜘蛛", "hs_corruptor", 1, "player.SSfellow('白斑蜘蛛');"],
};

export const funcs = {
	//导入压缩
	createrd() { //两个作用，1.当有参数时，将卡名(未处理的)变成处理过的，并返回 2.没有参数时，将所有怪兽添加描述、卡图
		if (arguments && arguments.length == 1) {
			var str = "";
			var arr = arguments[0].split(" ");
			for (let i = 0; i < arr.length; i++) {
				str += arr[i][0].toUpperCase() + arr[i].slice(1);
			}
			return "hs_" + str + "_monster";
		} else if (lib.hearthstone.cardPack.monsterRD) {
			for (let i in lib.hearthstone.cardPack.monsterRD) {
				if (!i) continue;
				var list = lib.hearthstone.cardPack.monsterRD[i];
				if (list && list.length >= 3 && !lib.translate[i + "_info"]) {
					var str = get.HSF("fff", [i]);
					var ori;
					if (i.indexOf("hs_") != 0) {
						ori = i;
						i = get.HSF("createrd", [i]);
					}
					lib.translate[i] = list[0];
					lib.translate[i + "_info"] = str;
					var ks = ["subtype", "cost", "rnature", "rkind", "ATK", "HP", "overload"];
					lib.card[i] = {};
					lib.card[i].fullimage = true;
					lib.card[i].rarity = list[1];
					if (list[1] == "legend") lib.card[i].hs_legend = true;
					if (ori) lib.card[i].oriname = ori;
					lib.card[i].type = "HS_minor";
					for (let j = 0; j < list[3].length; j++) {
						if (["cost", "ATK", "HP", "overload"].includes(ks[j])) lib.card[i][ks[j]] = parseInt(list[3][j]);
						else lib.card[i][ks[j]] = list[3][j];
					}
					var gz = new RegExp("过载：（[1-9]）");
					if (gz.test(str)) {
						var num = parseInt(str.match(new RegExp("(?<=(过载：（)).")));
						lib.card[i].hs_gz = num;
					}
					var tz = list[4];
					if (tz) {
						for (let m of tz) { //标签效果
							if (["legend", "remove", "token", "diy", "tokened", "quetu", "byh"].includes(m)) lib.card[i]["hs_" + m] = true; //ZZADAN "byh" 异画
							else if (["nosearch", "othermode"].includes(m)) lib.card[i][m] = true;
							else if (m.indexOf("changecost:") == 0) {
								var str = m.slice(11);
								lib.card[i].changecost = get.strfunc("p", str);
							} else if (m.indexOf("addhand:") == 0) {
								var str = m.slice(8);
								lib.card[i].addhand = get.strfunc("", str);
							}
						}
					}
					lib.card[i].image = `ext:${basic.extensionName}/resource/asset/card/${i}.jpg`;
				}
			}
		}
	},
	qwe: () => { //创建属性势力
		var ns = get.HSA("ns");
		for (let i = 0; i < ns.length; i++) {
			lib.group.push(ns[i]);
			lib.translate[ns[i]] = `<img src=${basic.extensionDirectoryPath}resource/image/nature/${ns[i]}.png width="40px" height="40px">`;
		}
		lib.translate.hs_leader = "首领";
	},
	Aud(card, type, p) { //播放随从音效
		if (get.HSF("cfg", ["HS_audioeffect"])) {
			var n = get.translation(card.name);
			var ts = false;
			if (type == "play") {
				var info = get.info(card);
				if (info.hs_legend && !(info.hs_token || info.hs_tokened || info.hs_diy)) game.playAudio("..", "extension", `${basic.extensionName}`, "resource", "audio", "full", n, "bgm.ogg");
				if (p) {
					var tsc = get.HSA("specialAudio");
					var oppo = get.translation(p.getOppo().name);
					if (tsc[n] && tsc[n].includes(oppo)) ts = true;
				}
			}
			if (ts) game.playAudio("..", "extension", `${basic.extensionName}`, "resource", "audio", "full", n, oppo + ".ogg");
			else game.playAudio("..", "extension", `${basic.extensionName}`, "resource", "audio", "full", n, type + ".ogg");
		}
	},
	Aud2(n) { //播放特殊音效
		if (get.HSF("cfg", ["HS_audioeffect"])) {
			game.playAudio("..", "extension", `${basic.extensionName}`, "resource", "audio", "effect", n + ".ogg");
		}
	},
	Aud3(p, n) { //播放英雄音效
		var cm = 2;
		if (get.HSF("cfg", ["HS_audioeffect"])) {
			var name2 = get.translation(p.name);
			var name = p.name.replace("hero_", "");
			game.playAudio("..", "extension", `${basic.extensionName}`, "resource", "audio", "duelist", name, n + ".ogg");
			var aa = get.HSA("audioDura");
			if (aa[name2] && aa[name2][n]) cm = aa[name2][n];
		}
		return cm;
	},
	Aud4() { //宣读英雄名字
		if (get.HSF("cfg", ["HS_audioeffect"])) {
			const mename = get.HSA("fullname")[game.me.name.split("_")[1]] || get.translation(game.me.name);
			const enemyname = get.HSA("fullname")[game.enemy.name.split("_")[1]] || get.translation(game.enemy.name);
			const announcer = {
				玛法里奥: true,
				安度因: true,
				吉安娜: true,
				古尔丹: true,
				乌瑟尔: true,
				瓦莉拉: true,
				加尔鲁什: true,
				萨尔: 2,
				雷克萨: 2,
			};
			const keys = Object.keys(announcer);
			const f = name => {
				let res = "";
				for (const key of keys) {
					if (name.indexOf(key) >= 0) {
						res = key;
						if (announcer[key] == 2) res += [1, 2].randomGet();
						break;
					}
				}
				return res;
			};
			let n1 = f(mename);
			let n2 = f(enemyname);
			const vs = "对阵" + [1, 2].randomGet();
			if (n1 && n2) {
				game.playAudio("..", "extension", `${basic.extensionName}`, "resource", "audio", "announcer", n1 + ".mp3");
				setTimeout(function() {
					game.playAudio("..", "extension", `${basic.extensionName}`, "resource", "audio", "announcer", vs + ".mp3");
					setTimeout(function() {
						game.playAudio("..", "extension", `${basic.extensionName}`, "resource", "audio", "announcer", n2 + ".mp3");
					}, 1000);
				}, 1700);
				return 7;
			} else return 5;
		} else return 5;
	},
	extpath: () => basic.extensionDirectoryPath,
	setAi(str) { //给怪兽卡加ai
		lib.card[str].ai = {
			useful: [5.5, 1],
			result: {
				player(player, target, card) {
					if (get.type(card.name) == "HS_minor") return 1;
				},
			},
		};
		lib.card[str].ai.order = get.subtype(str) == "HS_normal" ? 6 : 8.8;
	},
	setResult(str, t) { //给法术牌加ai
		var tos = lib.card[str];
		tos.type = "HS_spell";
		tos.subtype = t ? "HS_secret" : "HS_normalS";
		if (!tos.enable) {
			tos.enable = true;
			if (!tos.filterTarget) tos.notarget = true;
			else {
				if (typeof tos.filterTarget != "boolean") {
					tos.enable = get.strfunc("card,player", "return game.hasPlayer(function(target){return (" + tos.filterTarget.toString().replace(/^filterTarget/, "function") + ")(card,player,target)})");
				}
			}
		}
		tos.image = `ext:${basic.extensionName}/resource/asset/card/${str}.jpg`;
		if (!tos.ai) tos.ai = {};
		if (!tos.ai.order) {
			if (tos.onhsdraw) tos.ai.order = 0;
			else tos.ai.order = 8;
		}
		if (!tos.ai.result) {
			if (tos.notarget) tos.ai.result = {
				player: 1
			};
			else {
				tos.ai.result = {};
				if (tos.spelldamage) {
					/*代码修改：现在单体伤害法术ai考虑了法强影响*/
					if (typeof tos.spelldamage == "number") {
						var num = tos.spelldamage;
						tos.ai.result.target = get.strfunc("player,target", "return get.dmgEffect(target,player,target,player.countFq() + " + num + ");");
					} else tos.ai.result.target = get.strfunc("player,target", "return get.dmgEffect(target,player,target,player.countFq() + 1) + 0.1;");
				} else if (tos.spellrecover) {
					if (typeof tos.spellrecover == "number") {
						var num = tos.spellrecover;
						tos.ai.result.target = get.strfunc("player,target", "return get.rcvEffect(target,player,target," + num + ");");
					} else tos.ai.result.target = function(player, target) {
						return get.rcvEffect(target, player, target) + 0.1;
					};
				} else if (tos.spellbuff) tos.ai.result = {
					target(player, target) {
						return target.ATK + target.hp;
					},
				};
				else if (tos.spellgain) tos.ai.result = {
					player(player, target) {
						return target.ATK + target.hp;
					},
				};
				else if (tos.spelldestroy) tos.ai.result = {
					/*代码修改：现在消灭随从效果考虑随从身材*/
					target(player, target) {
						return -(target.ATK + target.hp);
					},
				};
			}
		}
	},
	//随机filter函数
	randmgfil(p, sctp, fil, hp) { //随机伤害filter
		sctp = sctp || "opposide";
		fil = fil || lib.filter.all;
		return p.sctp(sctp).filter(fl => fl.canhsdmg(hp) && fil(fl)).randomGet();
	},
	ranrcvfil(p, sctp, fil, hp) { //随机治疗filter
		sctp = sctp || "myside";
		fil = fil || lib.filter.all;
		return p.sctp(sctp).filter(fl => !fl.hs_losing && fl.isDamaged() && fil(fl)).randomGet();
	},
	ranxmfil(p, sctp, fil, hp) { //随机消灭filter
		sctp = sctp || "notmine";
		fil = fil || lib.filter.all;
		return p.sctp(sctp).filter(fl => fl.HSF("alive") && fil(fl)).randomGet();
	},
	dmgrcvdh(evts) { //播放伤害动画
		var next = game.createEvent("dmgrcvdh");
		next.evts = evts.slice(0);
		next.setContent(function() {
			"step 0"
			event.i = 0;
			event.evnum = event.evts.length;
			_status.hs_noupdate = false;
			"step 1"
			var cur = event.evts.filter(i => i.expo);
			if (cur.length) {
				event.cur = cur[0];
				event.i = -1;
				event.evts.remove(event.cur);
				event.evnum--;
			} else event.cur = event.evts[event.i];
			"step 2"
			var obj = {
				num: event.cur.num,
				type: event.cur.type,
				player: event.cur.player,
				source: event.nosource ? undefined : event.cur.source,
				nature: event.cur.nature,
			};
			obj.player[obj.type](obj.source, obj.num, obj.nature).hs_dmgrcv = true;
			"step 3"
			//伤害抖动
			event.cur.player.updatehsfl(event.cur.change);
			"step 4"
			"step 5"
			if (event.cur.expo) game.delay(0.5);
			"step 6"
			event.i++;
			if (event.i < event.evnum) event.goto(1);
		});
		return next;
	},
	hs_preboss() { //创建boss人物
		let datas = get.HSA("bossinfo");
		const names = [];
		for (const zwname in datas) {
			const data = datas[zwname];
			const cha = data.base;
			const name = cha[0];
			names.push(name);
			const hp = cha[2];
			const skill = cha[3];
			const info = data[skill];
			const fullskill = "hs_leader_" + skill;
			lib.character[name] = [cha[1], "hs_leader", hp, [fullskill],
				["noDefaultPicture", "des:", "hsboss", `ext:${basic.extensionName}/resource/image/boss/${name}.jpg`]
			];
			lib.translate[name] = zwname;
			lib.hearthstone.eval_heroskill(fullskill, info);
		}
		return names;
	},
	hs_boss(name, obj, obj2) { //进入boss关卡
		const data = get.HSA("bossinfo")[name];
		const cha = data.base;
		const hp = cha[2];
		game.enemy.init(cha[0]);
		game.enemy.baseHP = hp;
		_status.brawlfirst = obj.first;
		_status.brawlcardback = obj.cardback;
		//乱斗设置
		_status.brawlcommd = [];
		get.hs_deck(game.me);
		var func = function(o, p) {
			var bo = p == game.enemy;
			if (o) {
				if (bo) _status.brawlnophasedraw = o.nophasedraw;
				for (const n in o) {
					if (n == "deck") {
						p.deckCards = [];
						o.deck.forEach(c => {
							p.deckCards.add(get.chscard(c));
						});
					} else if (n == "summon") o.summon.forEach(i => get.HSF("作弊2", ["特召", i]));
					else if (n == "equip") _status.brawlcommd.push(function() {
						p.hs_weapon2(o.equip);
					});
					else if (n == "secret") o.secret.forEach(i => get.HSF("作弊2", ["奥秘", i]));
				}
			}
		};
		func(obj, game.enemy);
		func(obj2, game.me);
	},
	info(card, info) { //获取效果
		if (get.hstype(card) == "player") return card.linkCard[0].HSF("info");
		else if (card.swt) return card.linkCard[0].HSF("info");
		if (get.type(card) == "HS_spell") {
			if (info) return get.info(card);
			else return get.info(card).delayeffect;
		} else if (get.type(card) == "HS_minor") return lib.skill[card.name.slice(0, -8)];
		else if (get.type(card) == "HS_weapon") return get.info(card).weaponeffect;
	},
	longP(div, func) { //手机端长按，电脑端右键
		if (lib.device) lib.setLongPress(div, func);
		else div.addEventListener("mouseover", function(e) {
			func.call(this);
		});
	},
	recheck(o) { //判断描述是否有“如果” recheck:"filter",
		var c = o;
		if (get.hstype(o) == "player") c = o.linkCard[0];
		if (get.translation(c.name) == "穿刺者戈莫克") return false;
		var str = get.translation(c.name + "_info");
		return str.includes("如果");
	},
	uptris(p) { //更新扳机
		if (!p.triggers) {
			get.hs_alt("uptris", p.name, "的triggers不存在从！");
			return;
		}
		for (let i in p.triggers) {
			var tri = p.triggers[i];
			if (["battleRoal", "jili", "deathFL", "discarded"].includes(i)) {
				tri.cur = p;
			} else {
				tri.forEach(m => {
					m.cur = p;
				});
			}
		}
	},
	cfg(name) { //获取扩展设置
		if (["HS_customzoom", "hs_big_img", "HS_debug"].includes(name)) return lib.config["extension_炉石普通_" + name];
		else if (name == "HS_duelMode" && _status.fixed_mode) return _status.fixed_mode;
		else return get.config(name);
	},
	clickmana(bo) { //点自己的法力水晶
		if (typeof bo == "boolean" && bo == ui.arena.classList.contains("hs_view")) return
		_status.hdcsST = "click";
		get.HSF("hs_stopview");
		//if (!game.me.HSF("phaseUse")) return;
		var ele = document.querySelector("#handcards1>div");
		var num = game.me.countCards('h');
		if (num == 0) return;
		if (!ele.towork) return;
		if (ui.arena.classList.contains("hs_view")) delete _status.hs_viewing;
		ui.arena.classList.toggle("hs_view");
		get.HSF("checkhand");
	},
	copybuff(i, target) { //复制i到target上
		if (i.charlotte) return false;
		var ob = {};
		for (let k in i) { //k为buff的属性
			if (k == "creator" || k == "fellow") {
				ob[k] = target;
			} else if (k == "stid") ob[k] = get.id();
			else if (k == "value") {
				if (i.type) continue;
				else {
					if (Array.isArray(i.value)) ob.value = i.value.slice(0);
					else ob.value = i.value;
				}
			} else if (k == "type") {
				ob.type = i.type;
				if (i.type == "trigger" && i.value.length) {
					ob.value = [];
					for (let j of i.value) { //j为一个扳机
						var tn = j.triname;
						var noarr = ["battleRoal", "jili", "deathFL", "discarded"];
						var noarred = noarr.includes(tn);
						var oo = {};
						if (!noarred && !target.triggers[tn]) target.triggers[tn] = [];
						if (noarred) target.triggers[tn] = oo;
						else target.triggers[tn].add(oo);
						for (let p in j) { //p为扳机的一个属性
							if (p == "creator" || p == "fellow") {
								oo[p] = target;
							} else if (p == "relabuff") {
								oo[p] = ob;
							} else oo[p] = j[p];
						}
						ob.value.add(oo);
					}
				} else {
					if (Array.isArray(i.value)) ob.value = i.value.slice(0);
					else ob.value = i.value;
				}
			} else ob[k] = i[k];
		}
		if (target.addhsbuff) target.addhsbuff(ob);
		else game.me.addhsbuff.call(target, ob);
		return ob;
	},
	eee(n, m) { //调用事件
		var next = game.createEvent(n, false);
		for (let i in m) {
			next.set(i, m[i]);
		}
		next.setContent(n);
		return next;
	},
	first() { //决定先后手
		var mode = get.HSF("cfg", ["HS_duelMode"]);
		if (mode != "testing") {
			var firstsecond = get.HSF("cfg", ["HS_first"]);
			if (_status.brawlfirst || firstsecond == "second" || firstsecond == "random" && Math.random() > 0.5) {
				game.me.identity = "fan";
				game.enemy.identity = "zhu";
				game.zhu = game.enemy;
			}
		}
		_status.hs_first = game.zhu;
		if (_status.hs_first == game.me) setTimeout(function() {
			ui.arena.classList.add("hs_first");
			get.HSF("checkhand");
		}, 1000);
		return game.zhu;
	},
	newdeckbuilder() { //卡组编辑界面
		//停止游戏
		game.pause();
		const environment = [
			//闭包变量
			lib,
			game,
			ui,
			get,
			ai,
			_status
		];
		//当前游戏模式
		const currentMode = get.HSF("cfg", ["HS_duelMode"]);
		new TheLordClass(environment, currentMode);
	},
	think() { //ai思考
		_status.hdcsST = null;
		if (_status.event.isMine()) return;
		var cfg = get.HSF("cfg", ["HS_think"]);
		var map = {
			"fastest": 0.1,
			"fast": 0.5,
			"medium": 1,
			"long": 2,
			"slow": 3
		};
		game.delay(map[cfg] || 2);
	},
	xvlie(name, map, empty) { //创建序列
		var next = game.createEvent(name, false);
		get.HSF("hs_stopview");
		_status.hs_xvlie = {
			name: name,
			phase: undefined,
			loop: 0,
		};
		if (map) {
			for (let i in map) {
				next[i] = map[i];
				/*代码修改：增加事件的设置*/
				_status.hs_xvlie[i] = map[i];
			}
		}
		get.HSF("checkwin", [next]);
		if (empty) next.setContent("emptyHSevent");
		return next;
	},
	repeat(item, time) { //制造重复数组
		time = time || 1;
		time = Math.max(1, time);
		return new Array(time).fill(item);
	},
	countvelen(p) { //计算维伦（可能会被优化）
		var num = 0;
		num = p.countFellow(fl => fl.hasAuras2("velen"));
		return Math.pow(2, num);
	},
	canhrsk(p) { //现在是否能发动英雄技能
		if (_status.currentPhase != p || !_status.event) return false;
		if (_status.hsbattling) return false;
		var skill = p.heroskill.skill;
		p.presshrskbt = true;
		var info = lib.skill[skill];
		var bo = info && !info.filter(_status.event, p);
		p.presshrskbt = false;
		if (bo) return false;
		return true;
	},
	arrange(just) { //更新随从邻位
		game.me.next = game.enemy;
		game.enemy.next = game.me;
		var mns = get.HSF("minors");
		var dds = Array.from(ui.arena.querySelectorAll(".player.minskin.wywy"));
		var pls = mns.addArray(dds); //场上所有随从和即将亡语随从
		if (pls.length == 0) return;
		var ff = function(mes, ld) {
			if (mes.length) {
				var m = ld.countFellow();
				var bonus = ld == game.me ? 0 : 7;
				var ao = mes.filter(i => i.classList.contains("wywy"));
				var b = ao.length > 0;
				if (b && (just || mes.length != m)) { //如果有死亡的随从
					var apos = function(a, b) { //按position重新排
						var p1, p2;
						p1 = a.dataset.position.indexOf("d") < 0 ? parseInt(a.dataset.position) : parseInt(a.dataset.position.split("_")[1]);
						p2 = b.dataset.position.indexOf("d") < 0 ? parseInt(a.dataset.position) : parseInt(a.dataset.position.split("_")[1]);
						if (p1 > p2) return 1;
						if (p1 < p2) return -1;
					};
					var bpos = function(a, b) { //按truepos排
						if (a.truepos > b.truepos) return 1;
						if (a.truepos < b.truepos) return -1;
					};
					if (mes.length == m) { //如果死亡随从仍算场上的随从
						mes.sort(apos);
						var obj = mes[mes.length - 1];
						var mk = mes.filter(aik => !aik.classList.contains("wywy")).length;
						var cur = mk + 2 + bonus;
						while (obj != null) {
							if (obj.classList.contains("wywy")) cur -= 0.1;
							else cur = Math.ceil(cur - 1);
							obj.truepos = cur;
							obj = obj.leftseat;
						}
					} else { //死亡随从已被自动补位
						ld.countFellow(fl => {
							fl.truepos = parseInt(fl.dataset.position);
						});
						mes.sort(bpos);
						mes.forEach((i, j) => {
							i.leftseat = mes[j - 1] || null;
							i.rightseat = mes[j + 1] || null;
						});
					}
				} else { //没死亡随从就按position计算相邻
					mes.sort(lib.sort.position);
					var bo = _status.hs_fldragging;
					var num = bo ? ui.hs_testfl.num : 16;
					mes.forEach((i, j) => {
						var rp = 2 + j + bonus;
						if (bo && i.getLeader() == game.me && rp >= num) {
							i.dataset.position = rp + 1 + "";
						} else i.dataset.position = rp + "";
						i.leftseat = mes[j - 1] || null;
						i.rightseat = mes[j + 1] || null;
					});
				}
			}
		};
		ff(pls.filter(i => i.dataset.enemy == "0"), game.me);
		ff(pls.filter(i => i.dataset.enemy == "1"), game.enemy);
	},
	//重要函数
	strfil(mm) {
		if (typeof mm == "string") {
			var arr = mm.split(",");
			if (arr.length == 1) {
				var f = get.HSA("funcs")[arr[0]];
				if (f) mm = f;
				else get.hs_alt("addtriggerbuff:", item.filter);
			} else {
				var fs = arr.map(i => get.HSA("funcs")[i]);
				var ff = function(e, p, f) {
					return ff.fs.every(i => i(e, p, f));
				};
				ff.fs = fs;
				mm = ff;
			}
		}
		return mm;
	},
	tl2() { //随从代码2重简化
		var bjreg = get.HSA("fzms");
		const reg = HSstring.reg;
		const like = HSstring.islike;
		const near = HSstring.getnear;
		const mth = HSstring.matches;
		for (let cname in lib.hearthstone.cardPack.monsterRD) {
			var rname = get.HSF("createrd", [cname]); //生成全名
			var name = get.HSF("tr", [rname]); //生成效果名
			var card = lib.hearthstone.cardPack.monsterRD[cname];
			if (!card[3]) alert(cname);
			if (card[3][0] != "HS_effect") continue;
			var ms = card[2]; //卡牌描述
			lib.skill[name] = lib.skill[name] || {};
			var obj = lib.skill[name]; //卡牌效果代码
			var tz = card[4]; //卡牌标签
			var labed = false; //已根据卡牌标签生成代码
			if (tz && HSarray.es(tz, m => {
					if (m == "rareEff") { //稀有效果
						obj.active = function(p, c) {
							var that = this;
							if (that.battleRoal) {
								if (that.battleRoal.filter) {
									var nf = get.HSF("strfil", [that.battleRoal.filter]);
									that.battleRoal.filter = nf;
									if (!nf(p, c)) return false;
								}
								if (that.battleRoal.filterTarget && !p.sctp("all", t => p.HSF("canbetarget", [null, t, "battleroal"]) && that.battleRoal.filterTarget(null, p, t))) return false;
								if (that.battleRoal.randomRT && !that.battleRoal.randomRT(p)) return false;
								return true;
							} else return false;
						};
					} else if (m.includes(":")) { //复杂点的标签
						var ax = m.indexOf(":");
						var key = m.slice(0, ax),
							val = m.slice(ax + 1);
						if (key == "anm") obj.anm = val;
						else if (key == "skillgh") { //光环标签
							if (!obj.skillgh) obj.skillgh = {};
							obj.skillgh[val] = true;
							return true;
						} else if (key == "guimu") { //结束阶段受伤召怪
							obj.ending = {
								self: true,
								recheck: "满场",
							};
							var pre = ["event.fellow.hs_dmgrcv('damage',1,event.fellow);", "event.fellow.SSfellow('" + val + "');"];
							obj.ending.effect = get.hsrfunc(pre);
							return true;
						} else if (key == "lianji") {
							obj.active = function(p, c) {
								return p.hs_state.useCard > 0;
							};
							if (val.indexOf(";") < 0) val = "event.fellow.SSfellow('" + val + "',null," + (obj.anm ? "'" + obj.anm + "'" : undefined) + ");";
							obj.lianji = {
								effect: get.hsrfunc(val),
							};
						} else if (bjreg[key] || get.HSA("triggers").includes(key)) {
							var rkey = key;
							key = bjreg[key] ? bjreg[key][1] : key;
							var bq = rkey == key;
							if (!obj[key]) obj[key] = {};
							if (bjreg[rkey]) {
								for (let xx in bjreg[rkey][2]) {
									obj[key][xx] = bjreg[rkey][2][xx];
								}
							}
							if (mth(val, "^rangain>")) { //随机置入手牌
								var con = val.slice(8);
								var gnum = parseInt(con[0]) || 1;
								if (gnum > 1) con = con.slice(1);
								var sgnum = gnum == 1 ? "()" : "s(" + gnum + ")";
								var pre = "var f=get.hsflt('" + con + "');player.hs_gain(get.hskachi('all',f).randomGet" + sgnum + ");";
								if (con == "法术") pre = "player.hs_gain(get.hskachi('HS_spell').randomGet" + sgnum + ");";
								else if (get.HSA("easy")[con]) pre = "player.hs_gain(get.hskachi('all',(c,info)=>info.rnature=='" + con + "').randomGet" + sgnum + ");";
								else if (get.HSA("collect")[con]) pre = "var f=get.hsflt('" + con + "','all');player.hs_gain(get.hskachi('all',f,true).randomGet" + sgnum + ");";
								obj[key].effect = get.strfunc("", pre);
							} else if (mth(val, "^gain>")) { //置入手牌
								var con = val.slice(5);
								var pre = "player.hs_gain(" + con + ");";
								obj[key].effect = get.strfunc("", pre);
							} else if (mth(val, "weapon>")) { //装备武器
								var con = val.slice(7);
								var pre = "player.hs_weapon(" + con + ");";
								obj[key].effect = get.strfunc("", pre);
							} else if (mth(val, "aoercv>")) { //群体回复
								var con = val.slice(7);
								var pre = "player.hs_dmgrcvaoe('recover',event.fellow," + con + ");";
								obj[key].effect = get.strfunc("", pre);
							} else if (mth(val, "buff>")) { //添加多种buff
								var arr = [],
									rg = "mns";
								if (mth(val, "^selfbuff>")) {
									arr = val.slice(9).split(",");
									obj[key].randomRT = get.strfunc("p,evt,f", "return f");
									arr = get.hsbuff(arr);
									obj[key].aifamily = arr.hsai;
									obj[key].effect = get.hsrfunc(arr);
								} else if (mth(val, "^fltbuff>")) {
									//battleRoal:fltbuff>mine_,wildbeast：22										
									arr = val.slice(8).split("：");
									rg = arr[0].split(",");
									arr = arr[1].split(",");
									arr = get.hsbuff(arr);
									if (key == "battleRoal") obj[key].filterTarget = get.strfunc("c,p,t", "return p.sctp('" + rg[0] + "',t)&&t.rkind=='" + rg[1] + "';");
									else obj[key].randomRT = get.strfunc("p", "return p.sctp('" + rg[0] + "').filter(t=>t.rkind=='" + rg[1] + "').randomGet()");
									obj[key].aifamily = arr.hsai;
									obj[key].effect = get.hsrfunc(arr);
								} else {
									if (mth(val, "^buff>")) {
										arr = val.slice(5).split(",");
									} else if (mth(val, "^.{2}buff>")) {
										rg = mth(val, "^mebuff>") ? "mine" : "notmine";
										arr = val.slice(7).split(",");
									} else {
										rg = val.split("buff>")[0];
										arr = val.slice(rg.length + 5).split(",");
									}
									if (!rg.includes("'")) rg = "'" + rg + "'";
									if (key == "battleRoal") obj[key].filterTarget = get.strfunc("c,p,t", "return p.sctp(" + rg + ", t)");
									else obj[key].randomRT = get.strfunc("p,evt,f", "return f.sctp(" + rg + ").randomGet()");
									arr = get.hsbuff(arr);
									obj[key].aifamily = arr.hsai;
									obj[key].effect = get.hsrfunc(arr);
								}
							} else { //召唤
								if ([..."[]"].every(i => !val.includes(i))) val = "'" + val + "'";
								if (bq) {
									if (["beginning", "ending", "useCard"].includes(key)) obj[key].self = true;
									if (key == "useCard") obj[key].notlink = true;
									if (["hsdmg", "hs_rcv"].includes(key)) obj[key].fl = true;
								}
								var pre = "event.fellow.SSfellow(" + val + ",null," + (obj.anm ? "'" + obj.anm + "'" : undefined) + ");";
								obj[key].effect = get.strfunc("", pre);
								if (!val.includes(",true")) obj[key].recheck = "满场";
							}
							return true;
						}
					}
				})) labed = true;
			if (tz && tz.includes("i")) continue;
			//完整描述(典型效果)
			var mxs = ["战吼：在本回合中，使一个随从获得+2攻击力。", "在你的回合开始时，你有50%的几率额外抽一张牌。"],
				mxs2 = ["战吼：造成.点伤害，随机分配到所有其他角色身上。"];
			if (mxs.some((t, i) => { //固定描述
					var str = ms;
					if (like(str, t)) {
						if (i == 0) {
							obj.prompt = str;
							obj.battleRoal = {
								filterTarget(card, player, target) {
									return target.isMin();
								},
								effect: get.strfunc("", "target.addvaluebuff(2,1);"),
								aifamily: "atk",
							};
						}
						if (i == 1) {
							obj.beginning = {
								self: true,
								half: true,
								async effect(event, trigger, player) {
									player.hs_drawDeck();
								},
							};
						}
						return true;
					}
				})) continue;
			else if (mxs2.some((t, i) => { //可以有参数
					var str = ms;
					if (like(str, t)) {
						if (i == 0) {
							var num = parseInt(mth(str, "造成", ".", "点伤害"));
							obj.battleRoal = get.hsrfunc("event.fellow.hs_Missiles(" + num + ", false, 'all_');");
						};
						return true;
					}
				})) continue;
			else { //多段效果叠加
				var effects = { //固定效果代码
					draw() {
						player.hs_drawDeck()
					},
				};
				var regs = {
					//常见描述（完整）
					jn: "激怒：[\+1-9]{2}攻击力",
					dm: "战吼：造成.点伤害",
					ldm: "连击：造成.点伤害",
					cv: "战吼：恢复.点生命值",
					qp: "战吼：随机弃.张牌",
					sgj: "亡语：随机召唤一个法力值消耗为（.）的随从",
					fq: "法术伤害[\+1-9]{2}",
					//常见战吼或亡语
					gn: "将一张.{1,10}置入你的手牌",
					rcv: "为.{2}英雄恢复.点生命值",
					rcv2: "随机为一个受伤的友方角色恢复.点生命值",
					lava: "对所有.{2,4}造成.点伤害",
					sj: "对.{2}英雄造成.点伤害",
					rsh: "随机对一个敌人造成.点伤害",
					rsh2: "随机对一个敌方随从造成.点伤害",
					buff: "获得\+.*\/\+.*",
					buff1: "获得\\+.攻击力",
					buff2: "获得\\+.生命值",
					askl: "使你的对手获得一个法力水晶",
					emws: "摧毁你的一个法力水晶",
				};
				if (ms.slice(0, 5) == "无法攻击。") { //无法攻击状态
					obj.noattack = true;
					ms = ms.slice(5);
				}
				var arr = ms.split(new RegExp("，|。")); //描述根据逗号分割
				for (let i = 0; i < arr.length; i++) { //提取模糊时机
					var ms1 = arr[i],
						ms2 = arr[i + 1];
					if (ms1 && ms2) {
						for (let r in bjreg) {
							var l3 = ms1 + ms2;
							if (l3.indexOf(bjreg[r][0]) == 0) { //复杂句式
								arr[i + 1] = r + "：" + l3.replace(bjreg[r][0], "");
								arr.splice(i--, 1);
								break;
							}
						}
					}
				}
				var gjz = true;
				for (let i of arr) {
					var yc = get.HSA("yincang")[i];
					if (i.indexOf("过载：") >= 0) continue;
					if (gjz && i.length == 2) { //关键字效果
						var fy = get.HSA("yineng")[i];
						if (fy && !obj[fy]) obj[fy] = true;
					} else if (yc) { //隐藏关键字
						gjz = false;
						yc = get.HSA("yineng")[yc];
						obj[yc] = true;
					} else { //可叠加效果
						gjz = false;
						if (!i) continue;
						if (i.match(regs.jn)) { //激怒
							var jn = parseInt(i.slice(4, 5));
							if (!obj.jinu) obj.jinu = {};
							obj.jinu.value = jn;
						} else if (near(i, regs.fq)) { //法强
							var num = parseInt(i.slice(5));
							obj.hs_fq = num;
						} else if (near(i, regs.dm)) { //伤害
							var num = parseInt(mth(i, "造成", ".", "点伤害"));
							obj.prompt = i;
							obj.battleRoal = {
								aifamily: "damage"
							};
							obj.battleRoal.filterTarget = lib.filter.all;
							obj.battleRoal.effect = get.strfunc("", "target.hs_dmgrcv('damage',event.fellow," + num + ");");
						} else if (near(i, regs.ldm)) { //连击：伤害
							var num = parseInt(mth(i, "造成", ".", "点伤害"));
							obj.prompt = i;
							obj.active = function(p, c) {
								return p.hs_state.useCard > 0;
							};
							obj.lianji = {
								aifamily: "damage"
							};
							obj.lianji.filterTarget = lib.filter.all;
							obj.lianji.effect = get.strfunc("", "target.hs_dmgrcv('damage',event.fellow," + num + ");");
						} else if (near(i, regs.cv)) { //恢复
							var num = parseInt(mth(i, "恢复", ".", "点生命值"));
							obj.prompt = i;
							obj.battleRoal = {
								aifamily: "recover"
							};
							obj.battleRoal.filterTarget = lib.filter.all;
							obj.battleRoal.effect = get.strfunc("", "target.hs_dmgrcv('recover',event.fellow," + num + ");");
						} else if (near(i, regs.qp)) { //弃牌
							var num = mth(i, "随机弃", ".", "张牌");
							if (num == "一") num = 1;
							else if (num == "两") num = 2;
							obj.battleRoal = {};
							obj.battleRoal.effect = get.strfunc("", "player.hs_discard(" + num + ");");
						} else if (near(i, regs.sgj)) { //收割机
							var num = parseInt(mth(i, "消耗为（", ".", "）的随从"));
							obj.deathRattle = {
								recheck: "满场",
							};
							obj.deathRattle.effect = get.hsrfunc("event.fellow.SSfellow('range:" + num + "',false,'降落');");
						}
					}
					var barr = Object.keys(bjreg).map(g => g + "：").concat(["战吼：", "亡语：", "激励："]);
					if (!labed && barr.includes(i.slice(0, 3))) { //常见战吼或亡语或激励
						var eff = i.slice(3);
						var prx = i.slice(0, 2);
						var yn = bjreg[prx] ? bjreg[prx][1] : get.HSA("ywm")[prx];
						if (!obj[yn]) {
							obj[yn] = {};
							if (bjreg[prx]) {
								for (let xx in bjreg[prx][2]) {
									obj[yn][xx] = bjreg[prx][2][xx];
								}
							}
						} else continue;
						if (like(eff, "抽一张牌")) {
							obj[yn].effect = effects.draw;
						} else if (near(eff, regs.gn)) { //获得一张牌
							var n = mth(eff, "将一张", ".{1,10}", "置入你的手牌");
							n = get.HSE(n);
							obj[yn].effect = get.strfunc("", "player.hs_gain('" + n + "',event.fellow)");
						} else if (near(eff, regs.lava)) { //群伤
							var num = parseInt(mth(eff, "造成", ".", "点伤害"));
							var tp = mth(eff, "对所有", ".{2,4}", "造成");
							var range = "damage";
							if (tp == "角色") range = "all";
							else if (tp == "其他角色") range = "all_";
							else if (tp == "其他随从") range = "mns_";
							obj[yn].effect = get.strfunc("", "get.HSF('lavaeffect',['" + range + "'," + num + ",'lava',event.fellow]);");
						} else if (near(eff, regs.rcv)) { //英雄恢复
							var num = parseInt(mth(eff, "恢复", ".", "点生命值"));
							if (i.indexOf("每个") > 0) {
								obj[yn].effect = get.strfunc("", `player.sctp("main", t => {
            						event.fellow.HSline(t, "green");
            						t.hs_dmgrcv('recover', ${num}, event.fellow);
            					});`);
							} else {
								obj[yn].randomRT = function(player) {
									return player;
								};
								if (i.indexOf("敌方") > 0) obj[yn].randomRT = function(player) {
									return player.getOppo();
								};
								obj[yn].effect = get.strfunc("", "target.hs_dmgrcv('recover'," + num + ",event.fellow);");
							}
						} else if (near(eff, regs.rcv2)) { //随机友方恢复
							var num = parseInt(mth(eff, "恢复", ".", "点生命值"));
							obj[yn].randomRT = function(player) {
								return player.getFellowN(fl => fl.isDamaged()).randomGet();
							};
							obj[yn].effect = get.strfunc("", "target.hs_dmgrcv('recover'," + num + ",event.fellow);");
						} else if (near(eff, regs.sj)) { //弑君（不一定是对面的）
							var num = parseInt(mth(eff, "造成", ".", "点伤害"));
							if (i.indexOf("每个") > 0) {
								obj[yn].effect = get.strfunc("", `player.sctp("main", t => {
            						event.fellow.HSline(t, "green");
            						t.hs_dmgrcv(${num}, event.fellow${(obj.anm == "fireatk"?",'fire'" : "")});
            					});`);
							} else {
								obj[yn].randomRT = function(player) {
									return player;
								};
								if (i.indexOf("敌方") > 0) obj[yn].randomRT = function(player) {
									return player.getOppo();
								};
								obj[yn].effect = get.strfunc("", "target.hs_dmgrcv(" + num + ",event.fellow" + (obj.anm == "fireatk" ? ",'fire'" : "") + ");");
							}
						} else if (near(eff, regs.rsh)) { //飞刀
							var num = parseInt(mth(eff, "造成", ".", "点伤害"));
							obj[yn].randomRT = function(player) {
								return player.HSF("randmgfil", ["opposide"]);
							};
							obj[yn].effect = get.strfunc("", "target.hs_dmgrcv('damage'," + num + ",event.fellow" + (obj.anm == "fireatk" ? ",'fire'" : "") + ");");
						} else if (near(eff, regs.rsh2)) { //榴弹投手
							var num = parseInt(mth(eff, "造成", ".", "点伤害"));
							obj[yn].randomRT = function(player) {
								return player.sctp("notmine").filter(fl => fl.canhsdmg()).randomGet();
							};
							obj[yn].effect = get.strfunc("", "target.hs_dmgrcv('damage'," + num + ",event.fellow" + (obj.anm == "fireatk" ? ",'fire'" : "") + ");");
						} else if (near(eff, regs.buff)) { //buff
							var arr = eff.match(reg("\\+.", "g"));
							obj[yn].effect = get.strfunc("", "event.fellow.updateSelfBuff([" + parseInt(arr[0]) + "," + parseInt(arr[1]) + "]);");
						} else if (near(eff, regs.buff1)) { //攻击力buff
							var num = eff.slice(-4, -3);
							obj[yn].effect = get.strfunc("", "event.fellow.updateSelfBuff(" + num + ");");
						} else if (near(eff, regs.buff2)) { //生命值buff
							var num = eff.slice(-4, -3);
							obj[yn].effect = get.strfunc("", "event.fellow.updateSelfBuff([0," + num + "]);");
						} else if (near(eff, regs.askl)) { //奥术傀儡
							obj[yn].effect = get.strfunc("", "player.getOppo().HSF('gainmana');");
						} else if (near(eff, regs.emws)) { //恶魔卫士
							obj[yn].effect = get.strfunc("", "player.HSF('removemana');");
						}
					}
				}
			}
		}
	},
	evts(name, evts) { //多个事件依次触发
		var next = game.createEvent("multievents", false);
		next.evts = evts;
		next.str = name;
		next.evt = _status.event;
		next.setContent(function() {
			"step 0"
			event.i = 0;
			event.num = event.evts.length;
			"step 1"
			event.cur = event.evts[event.i];
			event.cur.evt = event.evt;
			if (event.str == "deathRattle") get.HSF("desevent", [event.cur]);
			else if (event.str == "discard") get.HSF("qpevent", [event.cur]);
			else get.HSF("event", [event.str, event.cur]);
			"step 2"
			event.i++;
			if (event.i < event.num) event.goto(1);
			"step 3"
			if (_status.hs_noising_tris.length && !event.noised) {
				event.noised = true;
				event.i = 0;
				const last = _status.hs_noising_tris.at(-1);
				const arr = _status.hs_noising_tris.filter(i => i == last);
				_status.hs_noising_tris.removeArray(arr);
				arr.forEach(i => {
					i.cur.hs_trisEffect(i, event.cur);
				});
			}
		});
		return next;
	},
	jilievent(m) { //使用英雄技能后时机
		var next = game.createEvent("jilievent", false);
		for (let i in m) {
			next.set(i, m[i]);
		}
		next.cantrifls = game.me.sctp("field");
		next.setContent(function() {
			"step 0"
			var cantrifls = event.cantrifls;
			var n1 = "heroskillAfter";
			var n2 = "jili";
			var evt = event;
			var tris = game.me.sctp("field").filter(i => i.triggers[n1] || i.triggers[n2]).reduce((x, y) => {
				if (y.triggers[n1]) return x.concat(y.triggers[n1]);
				else {
					if (evt.player == y.getLeader()) return x.concat([y.triggers[n2]]);
					else return x;
				}
			}, []).filter(i => {
				var fl = i.cur; //执行效果的为扳机所在随从
				if (!fl) return false;
				if (cantrifls.length > 0 && !cantrifls.includes(fl)) return false;
				var p = fl.getLeader(); //控制者为随从主人
				if (i.self != undefined) {
					if (i.self != (evt.player == p)) return false;
				}
				if (i.filter) {
					if (typeof i.filter == "string") {
						i.filter = get.HSF("strfil", [i.filter]);
					}
					if (!i.filter(evt, p, fl, i)) {
						return false;
					}
				}
				if (i.filter2) {
					if (!i.filter2(evt, p, fl, i)) {
						return false;
					}
				}
				return true;
			}).sort(lib.sort.attendseq);
			event.i = 0;
			event.tris = tris;
			event.trisnum = event.tris.length;
			if (!event.trisnum) event.finish();
			"step 1"
			var obj = event.tris[event.i];
			var fl = obj.cur;
			if (!game.me.sctp("field", fl)) {
				event.i++;
				if (event.i < event.evnum) event.redo();
			} else fl.hs_trisEffect(obj, event);
			"step 2"
			event.i++;
			if (event.i < event.trisnum) {
				game.delay(0.5);
				event.goto(1);
			}
		});
		return next;
	},
	qpevent(m) { //弃牌时机
		var next = game.createEvent("qpevent", false);
		for (let i in m) {
			next.set(i, m[i]);
		}
		next.cantrifls = game.me.sctp("field");
		next.setContent(function() {
			"step 0"
			var cantrifls = event.cantrifls;
			var n1 = "discard";
			var evt = event;
			var tris = game.me.sctp("field").filter(i => i.triggers[n1]).reduce((x, y) => {
				return x.concat(y.triggers[n1]);
			}, []).filter(i => {
				var fl = i.cur; //执行效果的为扳机所在随从
				if (!fl) return false;
				if (cantrifls.length > 0 && !cantrifls.includes(fl)) return false;
				var p = fl.getLeader(); //控制者为随从主人
				if (i.self != undefined) {
					if (i.self != (evt.player == p)) return false;
				}
				if (i.filter) {
					if (typeof i.filter == "string") {
						i.filter = get.HSF("strfil", [i.filter]);
					}
					if (!i.filter(evt, p, fl, i)) {
						return false;
					}
				}
				if (i.filter2) {
					if (!i.filter2(evt, p, fl, i)) {
						return false;
					}
				}
				return true;
			}).sort(lib.sort.attendseq);
			event.i = 0;
			event.tris = tris;
			event.trisnum = event.tris.length;
			if (!event.trisnum) event.goto(3);
			"step 1"
			var obj = event.tris[event.i];
			var fl = obj.cur;
			if (!game.me.sctp("field", fl)) {
				event.i++;
				if (event.i < event.evnum) event.redo();
			} else fl.hs_trisEffect(obj, event);
			"step 2"
			event.i++;
			if (event.i < event.trisnum) {
				game.delay(0.5);
				event.goto(1);
			}
			"step 3"
			var info = get.info(card);
			if (get.type(card) == "HS_spell" && info.sameeffect == "discarded") player.hs_spellEffect(card);
		});
		return next;
	},
	desevent(m) { //随从死亡时机
		var next = game.createEvent("desevent", false);
		for (let i in m) {
			next.set(i, m[i]);
		}
		next.cantrifls = game.me.sctp("field");
		next.setContent(function() {
			"step 0"
			var n1 = "deathRattle";
			var n2 = "deathFL";
			var evt = event;
			var cantrifls = event.cantrifls;
			event.pls = game.me.sctp("field").concat(game.dead).concat(game.dead_wp).filter(i => {
				if (i.triggers[n1] && i.triggers[n1].length > 0 && evt.link == i) return true;
				else if (get.hstype(evt.link) == "player" && i.triggers[n2] && !game.dead.includes(i) && !game.dead_wp.includes(i)) {
					var obj = i.triggers[n2];
					if (cantrifls.length > 0 && !cantrifls.includes(i)) return false;
					if (obj.filter) {
						if (typeof obj.filter == "string") {
							obj.filter = get.HSF("strfil", [obj.filter]);
						}
						if (!obj.filter(evt, i.getLeader(), i, obj)) {
							return false;
						}
					}
					if (obj.filter2) {
						if (!obj.filter2(evt, i.getLeader(), i, obj)) {
							return false;
						}
					}
					return true;
				}
				return false;
			}).sort(lib.sort.attendseq);
			event.i = 0;
			event.plsnum = event.pls.length;
			if (event.plsnum == 0) event.finish();
			"step 1"
			var fl = event.pls[event.i];
			if (event.link == fl) {
				if (get.hstype(fl) == "player") {
					fl.HSF("morefocus");
					var info = fl.triggers.deathRattle;
					fl.hs_deathRattle(info);
				} else {
					var info = fl.HSF("info");
					if (info && info.deathRattle) fl.hs_deathRattle([info.deathRattle]);
				}
			} else fl.hs_trisEffect(fl.triggers.deathFL, event);
			"step 2"
			event.i++;
			if (event.i < event.plsnum) {
				game.delay(0.5);
				event.goto(1);
			}
		});
		return next;
	},
	event(n, m) { //自定义时机
		if (!_status.gameStarted) return;
		var next = game.createEvent(n, false);
		for (let i in m) {
			next.set(i, m[i]);
		}
		next.evt = next.evt || _status.event;
		if (!_status.event.cantrifls) {
			var fls = game.me.sctp("field");
			next.cantrifls = fls;
			next.evt.cantrifls = fls;
		} else next.cantrifls = _status.event.cantrifls;
		next.setContent(function() {
			"step 0"
			if (!_status.hs_trising) _status.hs_trising = [];
			if (!_status.hs_noising_tris) _status.hs_noising_tris = [];
			var n = event.name;
			var evt = event;
			var tris = [];
			var cantrifls = event.cantrifls || [];
			tris = player.sctp("field").filter(i => i.triggers[n]).reduce((x, y) => {
				var xg = y.triggers[n];
				return x.concat(xg);
			}, []).filter(i => {
				if (event.evt.triedeff && event.evt.triedeff.includes(i)) return false;
				var fl = i.cur; //执行效果的为扳机所在随从
				if (!fl) return false;
				if (cantrifls.length > 0 && !cantrifls.includes(fl)) return false;
				var p = fl.getLeader(); //控制者为随从主人
				if (i.sc != undefined) {
					if (i.sc != (evt.source == fl)) return false;
				}
				if (i.self != undefined) {
					if (i.self != (evt.player == p)) return false;
				}
				if (i.tg != undefined) {
					if (i.tg != (evt.target == p)) return false;
				}
				if (i.fl != undefined) {
					if (i.fl != (evt.player == (get.hstype(fl) == "player" ? fl : fl.getLeader()))) return false;
				}
				if (i.notlink) {
					if (n.includes("summon") && evt.link == fl) return false;
					if (n.includes("useCard") && evt.cards == fl.linkCard) return false;
				}
				if (i.filter) {
					if (typeof i.filter == "string") {
						i.filter = get.HSF("strfil", [i.filter]);
					}
					if (!i.filter(evt, p, fl, i)) {
						return false;
					}
				}
				if (i.filter2) {
					if (!i.filter2(evt, p, fl, i)) {
						return false;
					}
				}
				if (_status.hs_trising.includes(fl)) {
					_status.hs_noising_tris.push(i);
					return false;
				}
				return true;
			});
			if (n == "attackEnd" && !player.isMin() && player.data_weapon) {
				var wp = player.data_weapon;
				tris.add({
					charlotte: true,
					cur: wp,
					fellow: wp,
					player: player,
					async effect(event, trigger, player) {
						event.fellow.hs_dmgrcv(1);
					},
					stid: get.hs_id(wp),
				});
			}
			if (tris.length == 0) event.finish();
			else {
				tris.sort(lib.sort.attendseq);
				var main = get.hs_main();
				event.tris1 = tris.filter(i => i.cur.getLeader() == main);
				event.tris2 = tris.filter(i => i.cur.getLeader() != main);
				event.i = 0;
				event.mm = event.tris1;
				if (!event.mm.length) event.goto(3);
			};
			"step 1"
			event.evnum = event.mm.length;
			var obj = event.mm[event.i];
			var fl = obj.cur;
			if (!game.me.sctp("field", fl)) {
				event.i++;
				if (event.i < event.evnum) event.redo();
			} else {
				_status.hs_trising.add(fl);
				fl.hs_trisEffect(obj, event);
			}
			"step 2"
			var obj = event.mm[event.i];
			var fl = obj.cur;
			_status.hs_trising.remove(fl);
			event.i++;
			if (event.i < event.evnum) {
				game.delay(0.5);
				event.goto(1);
			}
			"step 3"
			if (event.mm == event.tris1 && event.tris2.length) {
				event.i = 0;
				event.mm = event.tris2;
				event.goto(1);
			}
		});
		return next;
	},
	//player.HSF专用函数
	standup(f) { //离场（非死亡）
		f.standuped = true;
		var p = f.getLeader();
		f.delete();
		game.players.remove(f);
		p.actcharacterlist.remove(f);
		_status.hsAttendSeq.cl(f);
		get.HSF("arrange");
		get.HSF("checkfellow");
	},
	backtohand(p) { //返回手牌
		if (p.standuped) return;
		var next = game.createEvent("backtohand", false);
		next.player = p.getLeader();
		next.fellow = p;
		next.setContent(function() {
			"step 0"
			event.cpos = get.hs_pos(event.fellow);
			if (event.cpos == "field" && !event.fellow.HSF("alive")) event.cpos = "grave";
			if (event.cpos == "field" && player.countCards('h') >= player.getHandcardLimit()) {
				player.HSFT("手牌十张");
				event.fellow.HSF("cuihui");
				event.finish();
			}
			if (event.cpos != "field" && event.cpos != "grave") event.finish();
			"step 1"
			if (event.cpos == "field") event.fellow.HSF("standup");
			else {
				player.heroskill.pos.directgain(event.fellow.linkCard);
				player.hs_gain(event.fellow.linkCard[0].name);
				event.finish();
			}
			"step 2"
			player.hs_gain(event.fellow.linkCard[0].name);
			"step 3"
			event.result = result;
		});
		return next;
	},
	backtodeck(p, src) { //返回卡组
		if (p.standuped) return;
		var next = game.createEvent("backtodeck", false);
		next.player = p.getLeader();
		next.fellow = p;
		next.source = src;
		next.setContent(function() {
			"step 0"
			event.src = event.source || player;
			event.cpos = get.hs_pos(event.fellow);
			if (event.cpos == "field" && !event.fellow.HSF("alive")) event.cpos = "grave";
			if (event.cpos == "field" && event.src.cardPile.countCards("h") >= 60) {
				event.fellow.HSF("cuihui");
				event.finish();
			}
			if (event.cpos != "field" && event.cpos != "grave") event.finish();
			"step 1"
			if (event.cpos == "field") event.fellow.HSF("standup");
			else {
				player.heroskill.pos.directgain(event.fellow.linkCard);
				player.HSF("addtodeck", [event.fellow.linkCard[0].name]);
				event.finish();
			}
			"step 2"
			event.src.HSF("addtodeck", [event.fellow.linkCard[0].name]);
		});
		return next;
	},
	addtodeck(p, cards, source) { //制造衍生卡洗入牌库
		var next = game.createEvent("addtodeck", false);
		next.player = p;
		if (typeof cards == "string") cards = [cards];
		if (cards.length == 2) {
			if (typeof cards[1] == "number") cards = get.HSF("repeat", [cards[0], cards[1]]);
		}
		if (get.hstype(cards) != "cards") cards = cards.map(i => get.chscard(i));
		next.cards = cards;
		next.source = source;
		next.setContent(function() {
			"step 0"
			var n = player.cardPile.countCards("h");
			player.cardPile.forcecount = n;
			player.cardPile.style.pointEvents = "none";
			event.shaohui = 0;
			if (n + cards.length > 60) {
				event.shaohui = n + cards.length - 60;
				event.shcs = cards.slice(event.shaohui);
				player.heroskill.pos.directgain(event.shcs);
				cards = cards.slice(0, event.shaohui);
			}
			if (cards.length) player.cardPile.directgain(cards);
			else event.finish();
			"step 1"
			player.hs_sort();
			var res = cards;
			var renum = cards.length;
			var p = player;
			var jishu = 0;
			var sc = event.source;
			p.cardPile.parentNode.classList.add("hs_check");
			p.cardPile.querySelector(".count").show();
			get.HSF("checkdeck");
			setTimeout(function() {
				p.cardPile.parentNode.classList.add("hs_check");
				p.cardPile.querySelector(".count").show();
				var id = setInterval(function() {
					var ca = res[jishu];
					game.log(ca, "洗入", p, "的牌库");
					p.discardPile.$gain2([ca], false);
					p.cardPile.forcecount++;
					jishu++;
					get.HSF("checkdeck");
					if (jishu == renum) clearInterval(id);
				}, 300);
				setTimeout(function() {
					setTimeout(function() {
						p.cardPile.parentNode.classList.remove("hs_check");
						p.cardPile.querySelector(".count").hide();
						p.cardPile.style.pointEvents = "";
						delete p.cardPile.forcecount;
						get.HSF("checkdeck");
					}, 2000);
				}, renum * 50);
			}, 800);
			"step 2"
			if (!event.isMine()) game.delay(4);
			else game.delay(2);
		});
		return next;
	},
	convert(p, name, self, copy) { //变形：变形对象，变成的卡名，自变形，复制
		var next = game.createEvent("convert", false);
		next.player = p.getLeader();
		next.target = p;
		if (typeof name == "string") name = get.chscard(name);
		if (get.hstype(name) == "card") next.cards = [name];
		else if (get.hstype(name) == "cards") next.cards = name;
		if (next.cards && !next.card) next.card = next.cards[0];
		next.canrever = true;
		if (self || _status.event.name == "hs_spellEffect") next.canrever = false;
		if (copy) next.copy = copy;
		next.setContent(function() {
			"step 0"
			target.uninit();
			_status.hsAttendSeq.cl([target]);
			target.hide();
			"step 1"
			target.init(card.name.slice(0, -8));
			target.hs_FL(cards, "R");
			if (event.copy) {
				target.hs_dm = event.copy.hs_dm;
				target.hs_copy(event.copy);
			}
			"step 2"
			target.show();
			if (!event.copy) target.hs_yin();
			_status.hsAttendSeq.ad(target);
			if (!event.noaudio) get.HSF("Aud", [card, "play", player]);
			"step 3"
			game.delay();
			"step 4"
			get.HSF("updateauras", [true]);
			if (event.canrever) player.HSF("hs_rever", [target]);
		});
		return next;
	},
	hs_rever(p, pls) { //召唤回溯
		if (get.hstype(pls) == "player") pls = [pls];
		pls.sort(lib.sort.attendseq);
		var evts = [];
		pls.forEach(i => {
			evts.push({
				player: p,
				card: i.linkCard[0],
				link: i
			});
		});
		get.HSF("evts", ["summonSucc", evts]);
	},
	cuihui(pls, now) { //待摧毁或强制死亡
		if (!Array.isArray(pls)) pls = [pls];
		if (pls[0].classList.contains("hs_wp")) {
			pls[0].willdie = true;
			pls[0].swt(false);
			if (_status.event.name == "checkdeath") pls[0].classList.add("wywy");
		}
		if (get.hstype(pls) == "players") pls.forEach(p => {
			p.willdie = true;
			if (_status.event.name == "checkdeath") {
				p.classList.add("wywy");
				setTimeout(function() {
					p.node.avatar.style.filter = "grayscale(1)";
				}, 500);
				p.classList.remove("dongjied");
				p.classList.remove("chenmo");
				p.classList.remove("fengnu");
				p.classList.remove("superfengnu");
				p.classList.remove("chenmo");
			} else {
				p.node.avatar.style.filter = "sepia(0.7)";
			};
		});
		if (now) return get.HSF("checkdeath", [true]);
	},
	alive(p, ignore) { //随从在场上且没有濒死
		if (ignore == "hp") return p.hp > 0;
		if ((p.hp <= 0 || p.willdie) && !ignore) return false;
		if (get.hstype(p) == "weapon") return true;
		else return game.players.some(i => get.hs_id(i, p));
	},
	hasCFeff(p) { //嘲讽效果生效
		return p.hasgjz("chaofeng") && !p.hasgjz("qianxing") && !p.hasgjz("mianyi");
	},
	canbetarget(p, card, t, method) { //能成为目标
		if (method == "card") {
			if (card && get.type(card) == "HS_spell" && t.hasgjz("momian")) return false;
			if (t.hasgjz("qianxing") || t.hasgjz("mianyi")) {
				if (p != t.getLeader()) return false;
			}
			return true;
		}
		if (method == "heroskill") {
			if (t.hasgjz("momian")) return false;
			if (t.hasgjz("qianxing") || t.hasgjz("mianyi")) {
				if (p != t.getLeader()) return false;
			}
			return true;
		}
		if (method == "battleroal") {
			if (t.hasgjz("qianxing") || t.hasgjz("mianyi")) {
				if (p.getLeader() != t.getLeader()) return false;
			}
			return true;
		}
		if (method == "attack") {
			if (t.hasgjz("qianxing") || t.hasgjz("mianyi")) return false;
			if (p.summoned && p.hasgjz("tuxi") && !p.hasgjz("chongfeng")) {
				if (!t.isMin()) return false;
			}
			var tt = t.getLeader();
			if (p.aurasEffed("noattack", [p, t]) > 0) return false;
			if (tt.hasFellow(fl => fl.HSF("hasCFeff")) && !t.HSF("hasCFeff")) return false;
			return true;
		}
	},
	changeHeroskill(p, skill) { //更换英雄技能
		var next = game.createEvent("changeHeroskill", false);
		next.player = p;
		if (skill.indexOf("hs_hero") < 0) {
			var exhrsk = get.HSA("exhrsk");
			var searched = false;
			for (let i in exhrsk) {
				if (exhrsk[i][0] == skill) {
					skill = "hs_hero_" + i;
					searched = true;
					if (!lib.skill[skill]) lib.hearthstone.eval_heroskill(skill, exhrsk[i]);
					break;
				}
			}
			if (!searched) {
				get.hs_alt("changeHeroskill:", skill, "不是一个合法的英雄技能");
				return;
			}
		}
		next.skill = skill;
		next.dom = p.heroskill;
		next.setContent(function() {
			"step 0"
			event.dom.classList.remove("used");
			player.removeSkill(event.dom.skill);
			delete event.dom.skill;
			"step 1"
			game.delay();
			"step 2"
			event.dom.classList.add("used");
			"step 3"
			var s = event.skill;
			var info = get.info(s);
			event.dom.hrskai = info.hrskai;
			event.dom.skill = s;
			player.addSkill(s);
			event.dom.frontface.style.backgroundImage = "url('" + lib.assetURL + "extension/炉石普通/resource/image/heroskill/" + skill.replace("_legend", "") + ".jpg')"; /**见鬼的，这到底是怎么回事？只要把其中的一段换成模板字符串，一定会报错！结果会是技能正常结算，但是无法更换技能的原画*/
			event.dom.divcost.innerHTML = player.HSF("hs_num", [s]) + "";
			event.dom.extrafilter = info.extrafilter;
			event.dom.baseCost = player.HSF("hs_num", [s]);
			event.dom.used = 0;
			event.dom.filterT = info.filterT;
			delete event.dom.filterTarget;
			event.dom.ranHT = info.randomHT;
			delete event.dom.randomHT;
			game.delay();
			"step 4"
			event.dom.classList.remove("used");
			game.delay();
			"step 5"
			get.HSF("checkheroskill");
		});
		return next;
	},
	updateauras(bo) { //更新光环
		game.me.sctp("field", fl => {
			fl.buff.forEach(i => {
				if (i.type == "auras") {
					if (typeof i.sleep == "boolean") delete i.sleep;
				} else if (i.tvalue) {
					i.value = i.tvalue;
					delete i.tvalue;
				}
			});
		});
		if (bo) {
			get.HSF("checkfellow");
			get.HSF("checkhand2");
		}
	},
	hs_num(p, skill) { //获取法力消耗
		skill = skill || lib.character[p.name][3][0];
		skill = skill || p.heroskill.skill;
		var info = lib.skill[skill];
		if (!info) {
			get.hs_alt("hs_num:", skill);
			return;
		}
		if (typeof info.cost == "number") return info.cost;
		else return 0;
	},
	//法力水晶相关
	mana(p) { //获取可用法力水晶
		var total = p.HSF("manamax");
		var used = p.countMark("hs_mana_used");
		return Math.max(0, total - used);
	},
	manamax(p) { //获取上限合计
		var max = p.countMark("hs_mana_max");
		var temp = p.countMark("hs_mana_temp");
		return max + temp;
	},
	updatemana(p) { //更新法力值显示
		var mana = p.mana;
		if (p.HSF("mana") == p.countMark("hs_mana_max")) mana.childNodes[0].replaceData(0, 5, p.HSF("mana"));
		else mana.childNodes[0].replaceData(0, 5, p.HSF("mana") + "/" + p.countMark("hs_mana_max"));
		if (p.HSF("mana") == 0 != mana.classList.contains("hs_d")) mana.classList.toggle("hs_d");
		if (mana.innerHTML.length > 1 != mana.classList.contains("hs_s")) mana.classList.toggle("hs_s");
		var locked = p.countMark("hs_mana_locked");
		var owed = p.countMark("hs_mana_owed");
		var olocked = parseInt(mana.locked.innerHTML) || 0;
		var oowed = parseInt(mana.owed.innerHTML) || 0;
		mana.locked.innerHTML = locked;
		mana.owed.innerHTML = owed;
		if (locked != olocked) mana.locked.addTempClass("hs_start");
		if (owed != oowed) mana.owed.addTempClass("hs_start");
		if (locked > 0) mana.locked.show();
		else mana.locked.hide();
		if (owed > 0) mana.owed.show();
		else mana.owed.hide();
	},
	usemana(p, num, log) { //消耗法力值
		if (num === undefined) num = 1;
		num = Math.max(0, num);
		if (log !== false) game.log(p, "消耗了" + num + "点法力值");
		if (num == 0) return;
		var temp = p.countMark("hs_mana_temp"); //临时水晶数
		var usetemp = Math.min(num, temp); //消耗临时水晶数
		if (usetemp > 0) p.removeMark("hs_mana_temp", usetemp, false);
		var num2 = num - usetemp; //消耗可用法力值数
		if (num2 > 0) p.addMark("hs_mana_used", num2, false);
		p.HSF("updatemana");
		p.HSF("checkheroskill");
	},
	recovermana(p, num, log) { //回复法力值
		var max = p.countMark("hs_mana_max"); //当前水晶上限
		var used = p.countMark("hs_mana_used"); //已用水晶
		var locked = p.countMark("hs_mana_locked"); //本回合已锁定水晶数
		if (num === undefined) num = 1;
		else if (num == "all") num = Math.max(max, used);
		num = Math.min(num, used - locked); //回复不了被锁的水晶
		num = Math.max(0, num);
		if (num == 0) return;
		if (log !== false) game.log(p, "回复了" + num + "点法力值");
		p.removeMark("hs_mana_used", num, false);
		p.HSF("updatemana");
	},
	gainmana(p, num, empty, log) { //获得法力水晶
		var total = p.HSF("manamax"); //总水晶上限
		var limit = p.storage.hs_mana_limit; //最大水晶上限
		var used = p.countMark("hs_mana_used"); //已用水晶
		var temp = p.countMark("hs_mana_temp"); //临时水晶数
		var locked = p.countMark("hs_mana_locked"); //本回合已锁定水晶数
		var available = total - used; //实际可用水晶(可以为负数)
		if (num === undefined) num = 1;
		num = Math.max(0, num); //至少为0
		if (num == 0) return;
		if (empty) {
			num = Math.min(num, limit - total); //在右侧增加水晶数
			if (num > 0) {
				p.addMark("hs_mana_max", num, false);
				p.addMark("hs_mana_used", num, false);
			}
		} else {
			num = Math.min(num, limit - available); //最大限制
			if (num == 0) return;
			var num2 = Math.min(num, limit - total); //在右侧增加水晶数
			if (num2 > 0) p.addMark("hs_mana_max", num2, false);
			var num3 = Math.min(temp, num - num2); //挤掉临时并在左侧生成水晶数
			if (num3 > 0) {
				p.addMark("hs_mana_max", num3, false);
				p.removeMark("hs_mana_temp", num3, false);
				p.removeMark("hs_mana_used", num3, false);
				var num5 = num - num2; //总共在左侧生成水晶数
				if (num5 > used - locked) { //挤掉了过载
					var num6 = num5 - used + locked; //挤掉过载数
					p.removeMark("hs_mana_locked", num6, false);
				}
			}
			var num4 = num - num2 - num3; //继续在左侧生成水晶数
			if (num4 > 0) p.removeMark("hs_mana_used", num4, false);
		}
		if (log !== false) game.log(p, `获得了${num}个${empty ? "(空的)" : ""}法力水晶`);
		p.HSF("updatemana");
	},
	removemana(p, num, log) { //摧毁法力水晶
		var max = p.countMark("hs_mana_max"); //当前水晶上限
		if (max == 0) return;
		if (num === undefined) num = 1;
		num = Math.max(0, num); //至少为0
		num = Math.min(num, max); //最大摧毁数量
		if (num == 0) return;
		p.removeMark("hs_mana_max", num, false);
		p.HSF("recovermana", [num, false]);
		if (log !== false) game.log(p, "摧毁了" + num + "个法力水晶");
		p.HSF("updatemana");
	},
	gaintempmana(p, num, log) { //获得临时法力水晶
		var total = p.HSF("manamax"); //总水晶上限
		var limit = p.storage.hs_mana_limit; //最大水晶上限
		var used = p.countMark("hs_mana_used"); //已用水晶
		var locked = p.countMark("hs_mana_locked"); //本回合已锁定水晶数
		var available = total - used; //实际可用水晶(可以为负数)
		if (num === undefined) num = 1;
		num = Math.max(0, num); //至少为0
		num = Math.min(num, limit - available); //最大限制
		if (num == 0) return;
		var num2 = Math.min(num, limit - total); //在右侧增加水晶数
		if (num2 > 0) p.addMark("hs_mana_temp", num2, false);
		var num3 = num - num2; //在左侧生成的水晶数
		if (num3 > 0) {
			p.removeMark("hs_mana_used", num3, false);
			if (num3 > used - locked) {
				var num4 = num3 - used + locked; //挤掉过载数
				p.removeMark("hs_mana_locked", num4, false);
			}
		}
		if (log !== false) game.log(p, "获得了" + num + "个临时法力水晶");
		p.HSF("updatemana");
	},
	unlockmana(p) { //解锁所有法力水晶
		const locked = p.countMark("hs_mana_locked"); //本回合已锁定水晶数
		p.clearMark("hs_mana_locked");
		p.clearMark("hs_mana_owed");
		if (locked > 0) p.removeMark("hs_mana_used", locked, false);
		p.HSF("updatemana");
	},
	//其他函数
	phaseUse(p) { //在你的出牌阶段
		return _status.currentPhase == p && _status.event && _status.event.name == "chooseToUse" && _status.event.parent.name == "phaseUse";
	},
	dragposition(dx) { //拖拽随从位置
		var p = game.me;
		var n = p.countFellow();
		if (n == 0) return 2;
		var pos = 2;
		var it = 108 * get.HSF("cfg", ["HS_customzoom"]);
		var abs = lib.hearthstone.hs_absl;
		var num = Math.ceil((dx - abs) * 2 / it);
		if (n % 2 == 1) {
			var mid = (n + 3) / 2;
			pos = mid + Math.ceil(num / 2);
		} else {
			var mid = (n + 2) / 2;
			pos = mid + Math.ceil((num + 1) / 2);
		}
		pos = Math.max(2, pos);
		pos = Math.min(n + 2, pos);
		return pos;
	},
	//特定效果
	crossDraw(first, num) { //双方玩家抽牌
		var next = game.createEvent("crossDraw", false);
		if (typeof first == "string") {
			if (first == "main") first = get.hs_main();
			else first = get.player().scpl(first);
		}
		next.player = first;
		next.target = first.getOppo();
		next.num = num;
		next.setContent(function() {
			"step 0"
			event.i = 0;
			"step 1"
			player.hs_drawDeck();
			"step 2"
			target.hs_drawDeck();
			"step 3"
			event.i++;
			if (event.i < event.num) event.goto(1);
		});
		return next;
	},
	lavaeffect(type, num, anm, source) { //全体随从效果
		num = num || 1;
		var next = game.createEvent("lavaeffect", false);
		next.acttype = "damage";
		next.num = num;
		if (type == "cuihui") {
			if (typeof source == "string") source = get.player().scpl(source);
			if (typeof num == "string") next.pls = source.sctp(num);
			else if (get.hstype(num) == "players") next.pls = num;
			next.acttype = "cuihui";
		}
		next.player = get.player();
		next.card = _status.event.card;
		next.anm = anm || "lava";
		if (type && type != "damage" && type != "cuihui" && typeof num == "number") {
			if (typeof source == "string") source = get.player().scpl(source);
			next.pls = source.sctp(type);
		}
		if (!next.pls) next.pls = get.HSF("minors");
		next.source = source;
		next.setContent(function() {
			"step 0"
			if (event.pls.includes(game.me) && event.pls.includes(game.enemy)) event.anm += "_2";
			ui.zonearena.addTempClass(event.anm, 1500);
			"step 1"
			game.delay(0.5);
			"step 2"
			if (event.acttype == "damage") {
				if (event.pls.length) player.hs_dmgrcvaoe(event.num, event.card, event.source, event.pls);
			} else event.pls.forEach(i => i.HSF("cuihui"));
			"step 3"
			game.delay(0.5);
		});
		return next;
	},
	bladeeffect(type, num, source) { //旋风斩效果
		return get.HSF("lavaeffect", [type, num, "blade", source]);
	},
	//其他函数
	minors(func, sort) { //获取场上所有随从
		var pls = game.me.getFellow(func).concat(game.enemy.getFellow(func));
		if (sort) pls.sort(sort);
		return pls;
	},
	css_func(num, init, width) { //生成随从位置css
		num = num || 7; //随从上限
		init = init || 653; //中间随从的左边
		width = width || 108; //随从间距
		var topme = 330; //己方随从的顶边
		var topenemy = 474; //敌方随从的顶边
		var calc = function(c, s, n) {
			var res = "#arena.hscss>.player.minskin[data-enemy='0']{top:calc(100% - " + topme + "px);left:calc(100% - " + init + "px);}" + "#arena.hscss>.player.minskin[data-enemy='1']{top:calc(100% - " + topenemy + "px);left:calc(100% - " + init + "px);}";
			for (let i = 0; i < c; i++) {
				var len = i + 1;
				for (let j = 0; j < len; j++) {
					var pos = 2 + j;
					var pos2 = 2 + c + j;
					var mid = i / 2;
					var pi = parseInt(init + (mid - j) * width);
					res += "#arena.hscss.hs" + len + "me>.player.minskin[data-position='" + pos + "']{top:calc(100% - " + topme + "px);left:calc(100% - " + pi + "px);}" + "#arena.hscss.hs" + len + "enemy>.player.minskin[data-position='" + pos2 + "']{top:calc(100% - " + topenemy + "px);left:calc(100% - " + pi + "px);}" + "#arena.hscss>.player.minskin[data-position='d" + len + "_" + pos + "']{top:calc(100% - " + topme + "px);left:calc(100% - " + pi + "px);}" + "#arena.hscss>.player.minskin[data-position='d" + len + "_" + pos2 + "']{top:calc(100% - " + topenemy + "px);left:calc(100% - " + pi + "px);}";
				}
			}
			var jg = 35; //手牌间距
			for (let i = 1; i <= 10; i++) {
				res += "#arena.hscss.hs_view.hs_" + i + "hand:not(.hs_kaichang):not(.single-handcard):not(.chess)>#me>#handcards1>div{left:calc(100% - " + (700 + jg * i - jg) + "px) !important;}";
			}
			return res;
		}
		return calc(num, init, width);
	},
	hs_testfl() { //隐藏指示随从
		delete _status.hs_fldragging;
	},
	hs_stopview() { //隐藏详情区
		if (ui.morezone.classList.contains("viewhand")) {
			ui.morezone.hide();
			ui.morezone.classList.remove("viewhand");
			game.me.countCards("h", ca => {
				delete ca.islong;
			});
		}
	},
	hsdouble(player) { //更新场地样式
		var mark = player == game.me ? "me" : "enemy";
		var arr = Array.from(ui.arena.classList);
		var n = arr.filter(i => i.length == 3 + mark.length && i.indexOf("hs") == 0 && i.indexOf(mark) > 0)[0];
		ui.arena.classList.remove(n);
		var mark2 = "hs" + (player.countFellow() + (player == game.me && _status.hs_fldragging ? 1 : 0)) + mark;
		ui.arena.classList.add(mark2);
	},
	prompt(card) { //获取卡牌描述
		if (get.type(card) == "HS_weapon") return get.translation(card.name + "_info");
		var info = get.info({
			name: card.name,
		});
		if (!info || !info.oriname) return "";
		return lib.hearthstone.cardPack.monsterRD[info.oriname][2];
	},
	checkdeath(qz) { //检查死亡
		var next = game.createEvent("checkdeath", false);
		next.qz = qz;
		next.setContent(function() {
			"step 0"
			if (!game.me.HSF("alive")) game.me.hs_losing = true;
			if (!game.enemy.HSF("alive")) game.enemy.hs_losing = true;
			event.willdie = game.dead.concat(game.me.sctp("mns").concat(game.me.hs_weapons).concat(game.enemy.hs_weapons).filter(i => i && !i.HSF("alive"))).sort(lib.sort.attendseq);
			if (event.willdie.length == 0) event.goto(9);
			else game.delay(1.7);
			"step 1"
			game.dead_wp = [];
			event.willdie.forEach(i => {
				get.HSF("cuihui", [i]);
				if (get.hstype(i) == "player") {
					if (!i.isMin() || i.dataset.position.indexOf("d") == 0) return;
					var a = i.getLeader().countFellow();
					var b = parseInt(i.dataset.position);
					i.dataset.position = "d" + a + "_" + b;
				} else {
					game.dead_wp.push(i);
				}
			});
			"step 2"
			game.delay();
			"step 3"
			get.HSF("arrange", [true]);
			game.delay(0.3);
			"step 4"
			event.willdiep = event.willdie.filter(t => t.isMin && t.isMin());
			if (event.willdiep.length) {
				_status.hs_state.deadfellow += event.willdiep.length;
				game.dead.addArray(event.willdiep);
				game.log(event.willdiep, "阵亡");
				event.willdiep.forEach(i => i.removehsbuff(i.buff.filter(j => j.type == "auras")));
				game.players.removeArray(event.willdiep);
				var hs_qc = function(p, pls) {
					var pls2 = pls.filter(i => get.hstype(i) == "player");
					var mine = pls2.filter(i => i.getLeader() == p);
					_status.hs_dead[p.playerid].addArray(mine.map(i => ({
						name: i.linkCard[0].name,
						id: get.hs_id(i)
					})));
					_status.hs_dead_All[p.playerid] = _status.hs_dead_All[p.playerid].concat(mine.map(i => i.linkCard[0].name));
					p.actcharacterlist.removeArray(mine);
					var bonus = p == game.me ? 0 : 7;
					mine.forEach(i => {
						get.HSF("Aud", [i, "death"]);
						if (i.hs_remove) p.heroskill.pos.directgain(i.linkCard);
						else p.discardPile.directgain(i.linkCard);
						i.classList.add("removing");
					});
					var f1 = p.getFellow().sort(lib.sort.position);
					f1.forEach((i, j) => {
						i.dataset.position = 2 + j + bonus + "";
					});
					p.actcharacterlist = f1;
				}
				hs_qc(game.me, event.willdie);
				hs_qc(game.enemy, event.willdie);
			}
			var f = function(w) {
				var p = w.getLeader();
				p.discardPile.directgain(w.linkCard);
				if (w == p.data_weapon) delete p.data_weapon;
				w.swt(false);
				w.node.atk.hide();
				w.node.hp.hide();
				setTimeout(function() {
					w.delete();
				}, 450);
				game.log(p, "的", w.linkCard, "被摧毁了");
			};
			game.dead_wp.forEach(f);
			get.HSF("updateauras", [true]);
			"step 5"
			game.delay(0.45);
			"step 6"
			var evts = [];
			event.willdie.forEach(i => {
				evts.push({
					player: i.getLeader(),
					link: i,
				});
			});
			get.HSF("evts", ["deathRattle", evts]);
			"step 7"
			//抹杀存在
			game.dead.forEach(i => {
				_status.hsAttendSeq.cl(i.buff);
				if (get.hstype(i) == "player") ui.arena.removeChild(i);
				i = null;
			});
			game.dead_wp.forEach(w => {
				var p = w.getLeader();
				p.hs_weapons.remove(w);
				_status.hsAttendSeq.cl(w.linkCard);
			});
			game.dead = [];
			game.dead_wp = [];
			"step 8"
			get.HSF("arrange");
			game.countPlayer(fl => delete fl.truepos);
			"step 9"
			get.HSF("updateauras", [true]);
			"step 10"
			var willdie = game.dead.concat(game.me.sctp("mns").concat(game.me.hs_weapons).concat(game.enemy.hs_weapons).filter(i => i && !i.HSF("alive"))).sort(lib.sort.attendseq);
			if (willdie.length > 0) event.goto(0);
		});
		return next;
	},
	canatk(t, p, ignore) { //是否可以攻击
		if (!p) p = t.getLeader();
		if (!t.HSF("alive")) return false;
		if (t.hs_atk_max + t.hs_ex_atk <= t.hs_attacked) return false;
		if (t.summoned && !t.hasgjz("chongfeng")) {
			if (t.hasgjz("tuxi")) return p.getOppo().hasFellow();
			else return false;
		}
		if (_status.currentPhase != p && !ignore) return false;
		if (t.hasgjz("dongjied") && !ignore) return false;
		if (!ignore) {
			if (t.ATK == 0) return false;
			if (t.noattack) {
				return t.aurasEffed("canattack", [p, t]) > 0;
			}
		}
		return true;
	},
	//检查
	checkdeck() { //更新牌库样式
		if (ui.hs_medeck) {
			if (ui.hs_medeck.forcecount === undefined || isNaN(ui.hs_medeck.forcecount)) {
				delete ui.hs_medeck.forcecount;
				ui.hs_medeck.node.count.innerHTML = ui.hs_medeck.countCards("h") + "";
			} else ui.hs_medeck.node.count.innerHTML = ui.hs_medeck.forcecount + "";
		}
		if (ui.hs_enemydeck) {
			if (ui.hs_enemydeck.forcecount === undefined || isNaN(ui.hs_enemydeck.forcecount)) {
				delete ui.hs_enemydeck.forcecount;
				ui.hs_enemydeck.node.count.innerHTML = ui.hs_enemydeck.countCards("h") + "";
			} else ui.hs_enemydeck.node.count.innerHTML = ui.hs_enemydeck.forcecount + "";
		}
		if (!ui.hs_medeck.decklen) ui.hs_medeck.decklen = [];
		if (!ui.hs_enemydeck.decklen) ui.hs_enemydeck.decklen = [];
		var maxlen = 60;
		var mec = parseInt(ui.hs_medeck.node.count.innerHTML);
		if (!ui.hs_medeck.hs_working && typeof mec == "number" && !isNaN(mec) && ui.hs_medeck.decklen.length != mec) {
			ui.hs_medeck.hs_working = true; //正在整理
			var i = 0;
			while (ui.hs_medeck.decklen.length != mec) {
				i++;
				if (ui.hs_medeck.decklen.length > mec) {
					ui.hs_medeck.decklen.pop().delete();
				} else {
					var decklenContainer = ui.hs_medeck.querySelector(".decklencontainer");
					var div = ui.create.div(".decklen", decklenContainer);
					ui.hs_medeck.decklen.push(div);
					div.style.top = maxlen - 2 * ui.hs_medeck.decklen.length + "px";
					div.style.width = 100 - Math.floor(ui.hs_medeck.decklen.length * (0.4)) + "px";
				}
			}
			ui.hs_medeck.hs_working = false; //正在整理
		}
		var mec = parseInt(ui.hs_enemydeck.node.count.innerHTML);
		if (!ui.hs_enemydeck.hs_working && typeof mec == "number" && !isNaN(mec) && ui.hs_enemydeck.decklen.length != mec) {
			ui.hs_enemydeck.hs_working = true;
			var i = 0;
			while (ui.hs_enemydeck.decklen.length != mec) {
				i++;
				if (ui.hs_enemydeck.decklen.length > mec) {
					ui.hs_enemydeck.decklen.pop().delete();
				} else {
					var decklenContainer = ui.hs_enemydeck.querySelector(".decklencontainer");
					var div = ui.create.div(".decklen", decklenContainer);
					ui.hs_enemydeck.decklen.push(div);
					div.style.top = maxlen - 2 * ui.hs_enemydeck.decklen.length + "px";
					div.style.width = 100 + "px";
				}
			}
			ui.hs_enemydeck.hs_working = false;
		}
		if (ui.hs_medeck.countCards("h") == 0) ui.hs_medeckbox.classList.add("hs_nocard");
		else ui.hs_medeckbox.classList.remove("hs_nocard");
		if (ui.hs_enemydeck.countCards("h") == 0) ui.hs_enemydeckbox.classList.add("hs_nocard");
		else ui.hs_enemydeckbox.classList.remove("hs_nocard");
	},
	checkheroskill() { //更新英雄技能样式
		if (game.me.heroskill && _status.gameStarted) {
			[game.me, game.enemy].forEach(i => {
				const that = i.heroskill;
				//技能次数
				var usable = 1;
				var buffs = i.sctp("field").reduce((x, y) => x.concat(y.buff.filter(o => o.ghwork("hrskusable", i, [null, y, i]))), []);
				buffs.sort(lib.sort.attendseq);
				buffs.forEach(o => {
					usable = Math.max(1, usable, o.value);
				});
				that.usable = usable + (that.extrausable ? that.extrausable : 0);
				//技能费用
				const bcost = that.baseCost;
				let cost = bcost;
				var buffs = that.buff.filter(o => o.iswork() && o.name == "hs_cost").concat(i.sctp("field").reduce((x, y) => x.concat(y.buff.filter(o => o.ghwork("hrskcost", i, [null, y, i]))), []));
				buffs.sort(lib.sort.attendseq);
				buffs.forEach(o => {
					let val = o.value;
					if (typeof val == "function") val = val();
					if (o.subtype == "final") cost = val;
					else cost -= val;
				});
				cost = Math.max(0, cost);
				const div = i.heroskill.divcost;
				const pcost = parseInt(div.innerHTML);
				if (cost != pcost) {
					i.heroskill.cost = cost;
					div.innerHTML = cost + "";
					div.addTempClass("hs_start");
					if (cost < bcost) {
						div.classList.remove("hs_smaller");
						div.classList.add("hs_larger");
					} else if (bcost < cost) {
						div.classList.remove("hs_larger");
						div.classList.add("hs_smaller");
					} else {
						div.classList.remove("hs_smaller");
						div.classList.remove("hs_larger");
					}
				}
				if (i.aurasEffed("hrsktarget", [i]) > 0) {
					delete i.heroskill.randomHT;
					i.heroskill.filterTarget = (c, p, t) => t != p;
				} else {
					i.heroskill.randomHT = i.heroskill.ranHT
					i.heroskill.filterTarget = i.heroskill.filterT;
				}
				if (!i.heroskill.available) i.heroskill.available = i.heroskill.usable > i.heroskill.used;
				if (i.heroskill.available) i.heroskill.classList.remove("used");
				if (!game.me.HSF("canhrsk")) game.me.heroskill.classList.remove("selectable");
				else game.me.heroskill.classList.add("selectable");
			});
		}
	},
	checkhand() { //更新手牌样式
		for (let i = 1; i <= 10; i++) {
			ui.arena.classList.remove("hs_" + i + "hand");
		}
		var num = game.me.countCards("h");
		if (num > 0) ui.arena.classList.add("hs_" + num + "hand");
		ui.updatehl();
		if (!ui.arena.classList.contains("hs_exchange2")) get.HSF("checkhand2");
	},
	checkhand2() { //仅手牌费用
		game.me.countCards("h", c => {
			if (["HS_minor", "HS_spell", "HS_weapon"].includes(get.type(c))) {
				var info = get.info(c);
				var co = info.cost;
				var cost = c.cost();
				if (cost < co) {
					c.mana.classList.remove("hs_smaller");
					c.mana.classList.add("hs_larger");
				} else if (cost > co) {
					c.mana.classList.remove("hs_larger");
					c.mana.classList.add("hs_smaller");
				} else {
					c.mana.classList.remove("hs_smaller");
					c.mana.classList.remove("hs_larger");
				}
				var n = parseInt(c.mana.innerHTML);
				c.mana.innerHTML = cost;
				if (n != cost) c.mana.addTempClass("hs_start");
				if (get.type(c) == "HS_minor") info = lib.skill[c.name.split("_monster")[0]];
				if (get.type(c) == "HS_weapon") info = c.HSF("info");
				if (info && info.active && info.active(game.me, c)) c.classList.add("active");
				else c.classList.remove("active");
			}
		});
	},
	checkcanatk(param) { //更新攻击随从
		var fc = t => {
			var p = t.getLeader();
			var res = get.HSF("canatk", [t, p]) && game.hasPlayer(tg => {
				if (!t.HSF("canbetarget", [null, tg, "attack"])) return false;
				return tg.side != p.side;
			});
			if (res && p == game.me) t.classList.add("attackable");
			else t.classList.remove("attackable");
		}
		game.me.getFellowN(fc);
		game.enemy.getFellowN(fc);
		if (ui.hs_enemycount) {
			if (game.enemy.countCards("h") == 0) ui.hs_enemycount.hide();
			else ui.hs_enemycount.show();
		}
	},
	checkfellow() { //更新随从状态
		game.countPlayer(function(i) {
			i.updatehsfl();
		});
		//更新武器
		var upweapon = function(p) {
			var upweapon2 = function(wp, p) {
				if (wp) {
					var o = wp.hs_calcv(false);
					wp.ATK = o[0];
					wp.hp = o[1];
					var fu = function(a, b, wp) {
						var rval = parseInt(a.innerHTML);
						a.innerHTML = b;
						if (a.classList.contains("hs_wp_atk")) {
							if (b > wp.baseATK) a.classList.add("hs_larger");
							else a.classList.remove("hs_larger");
						} else {
							if (wp.hs_dm > 0) {
								a.classList.remove("hs_larger");
								a.classList.add("hs_smaller");
							} else {
								if (wp.hp > wp.baseHp) {
									a.classList.add("hs_larger");
									a.classList.remove("hs_smaller");
								} else {
									a.classList.remove("hs_larger");
									a.classList.remove("hs_smaller");
								}
							}
						}
						if (rval != b) a.addTempClass("hs_start");
					}
					fu(wp.node.atk, wp.ATK, wp);
					fu(wp.node.hp, wp.hp, wp);
					if (wp == p.data_weapon) {
						if (_status.currentPhase == p && !wp.willdie) {
							wp.swt(true);
							wp.node.atk.show();
						} else {
							wp.swt(false);
							wp.node.atk.hide();
						}
					}
					wp.hs_judge();
					wp.HSF("uptris");
					if (wp.classList.contains("wpmianyi") != wp.hasgjz("wpmianyi")) wp.classList.toggle("wpmianyi");
				}
			};
			upweapon2(p.data_weapon, p);
			upweapon2(p.predata_weapon, p);
		};
		upweapon(game.me);
		upweapon(game.enemy);
		//更新奥秘
		get.HSF("checksecret");
		//更新英雄技能
		get.HSF("checkheroskill");
		//更新随从位置
		game.me.HSF("hsdouble");
		game.enemy.HSF("hsdouble");
	},
	/*代码修改：把更新奥秘单独出来*/
	checksecret() { //更新奥秘状态
		var upsecret = function(p) {
			var dq = _status.currentPhase == p;
			if (p.secrets) {
				p.secrets.forEach(div => {
					div.side = p.side;
					div.relabuff.cur = p;
				});
				var set = [];
				if (p.secrets.length == 0) p.secretbd.classList.remove("has");
				else {
					/*代码修改：奥秘变化现在会移动pos，而不是更改rnature*/
					p.secretbd.classList.add("has");
					p.secrets.forEach(function(sc) {
						set.add(get.rnature(sc));
					});
					for (let i = 0; i < 4; i++) {
						const str = set[i] || "none";
						const sec = p.secretbd.list.find(s => s.dataset.rnature == str);
						if (sec) {
							sec.dataset.pos = "" + (i + 1);
							var l = p.secrets.filter(c => get.rnature(c) == str).length;
							if (l == 1) sec.innerHTML = "?";
							else sec.innerHTML = l;
						}
					}
					p.secretbd.list.forEach(se => {
						if (!set.includes(se.dataset.rnature)) {
							se.dataset.pos = "x";
							se.innerHTML = "";
						}
					});
				}
			}
			if (p.secretbd && dq == p.secretbd.classList.contains("active")) p.secretbd.classList.toggle("active");
		};
		upsecret(game.me);
		upsecret(game.enemy);
	},
	checkui() {
		if (game.me && game.me.heroskill && game.me.HSF("phaseUse")) {
			var func = function() {
				if (_status.hs_tempshq && !_status.hs_tempshq.classList.contains("selected")) {
					delete _status.hs_tempshq;
					get.HSF("clickmana", [true]);
				}
				if (game.me.heroskill.classList.contains("selectable")) return false;
				if (game.me.countCards("h", ca => {
						return lib.filter.filterCard(ca);
					})) return false;
				else {
					if (game.me.countCards("h") > 0 && ui.arena.classList.contains("hs_view")) {
						if (!_status.hs_viewing && !_status.hdcsST) get.HSF("clickmana", [false]);
					}
				}
				if (game.me.getFellowN(t => t.HSF("canatk") && game.hasPlayer(tg => {
						if (!t.HSF("canbetarget", [null, tg, "attack"])) return false;
						return tg.side != game.me.side;
					})).length > 0) return false;
				return true;
			}
			if (func()) {
				if (!_status.hs_state.jobdone) {
					ui.hs_endbtn.classList.add("active");
					_status.hs_state.jobdone = true;
					get.HSF("Aud2", ["收工了"]);
				}
			} else ui.hs_endbtn.classList.remove("active");
		}
	},
	checkall(arr) { //更新所有内容
		if (!arr) arr = ["deck", "hand", "heroskill", "canatk", "fellow", "ui"];
		else if (arguments.length > 1) arr = Array.from(arguments);
		arr.forEach(i => {
			get.HSF("check" + i);
		});
	},
	checkwin(e, next) { //胜负判定
		var f = lib.element.content.checkwin;
		if (next) e.insert(f, {});
		else e.insertAfter(f, {});
	},
	//界面生成
	surrender() {
		lib.skill.hs_surrender = {
			enable: "phaseUse",
			filter() {},
			content() {
				if (confirm("是否真的要投降？")) {
					//代码修改：不直接死，等胜负判定
					game.me.istouxiang = true;
					if (event.getParent(2).name == "chooseToUse") {
						get.HSF("checkwin", [event]);
					}
				}
			},
		};
		return lib.skill.hs_surrender.content;
	},
	nextduel() {
		return function() {
			ui.create.control('下一局', function() {
				game.save('directStage', [`${basic.extensionName}`, 0], 'brawl'); /**@${basic.extensionName}的值始终应该是"炉石普通"*/
				localStorage.setItem(lib.configprefix + 'directstart', true);
				game.reload();
			});
		}
	},
	morezone() { //制作详情区
		ui.morezone = ui.create.div(".morezone", ui.arena);
		ui.morezone.hide();
		var hsdetail = ui.create.player(ui.morezone, true);
		hsdetail.hide();
		hsdetail.listen(function() {
			this.HSF("morefocus");
		});
		hsdetail.classList.add("hsdetail");
		hsdetail.node.avatar.style.backgroundSize = "cover";
		hsdetail.node.avatar.show();
		hsdetail.hide();
	},
	morefocus(node, long) { //设置详情区卡牌
		//无变化
		if (!ui.morezone) return;
		if (ui.arena.classList.contains("hs_exchange")) return;
		if (!node) return;
		if (_status.currentPhase == game.me) {
			if (get.hstype(node) == "card") {
				if (game.me.HSF("phaseUse") && get.position(node) == "h" && !long) return;
			} else if (get.hstype(node) == "player") {
				if (!game.me.HSF("phaseUse")) return;
			}
		}
		//默认在左边显示，无过场动画
		ui.morezone.classList.remove("viewhand");
		ui.morezone.style.transition = "all 0s";
		clearTimeout(ui.morezone.hidetmt);
		var g = function() { //清除长按记录
			game.me.countCards("h", ca => {
				delete ca.islong;
			});
		};
		var f = function() { //隐藏详情区
			g();
			clearTimeout(ui.morezone.hidetmt);
			ui.morezone.hide();
			delete ui.morezone.current;
		}
		var div = ui.morezone.querySelector(".hsdetail");
		var name;
		//如果点详情区、点自己，隐藏详情区
		if (node == div) {
			return f();
		}
		/*修改代码：如果是字符串（奥秘），创建空白奥秘用于展示*/
		if (typeof node == "string") {
			name = node;
		} else if (get.hstype(node) == "card") {
			if (get.position(node) == "h" && _status.currentPhase == game.me && game.me.HSF("phaseUse") && long) ui.morezone.classList.add("viewhand");
			else {
				ui.morezone.classList.remove("viewhand");
				delete _status.hs_viewing;
				g();
			}
		} else if (get.hstype(node) == "player") {
			if (!node.name || !node.isMin()) {
				return f();
			}
		} else if (get.hstype(node) == "button") {
			get.HSF("morefocus", [node.link]);
			return;
		} else if (node.classList.contains("hs_hrsk")) {
			name = node.skill.replace("legend_", "");
		} else {
			return f();
		}
		//显示详情区，若不是长按，2秒后隐藏
		ui.morezone.show();
		/*代码修改：注释掉这一句，好像没用*/
		//node.f = f;
		div.show();
		var card = node.linkCard ? node.linkCard[0] : node;
		name = name || card.name;
		if (!node.islong) ui.morezone.hidetmt = setTimeout(f, 2000);
		if (ui.morezone.current && ui.morezone.current == name) {
			return;
		}
		if (get.hstype(card) == "card") {
			if (get.type(card) == "HS_minor") {
				div.classList.remove("hs_view");
				div.init(get.HSF("tr", [name]));
				if (get.info(card).hs_diy || name.indexOf("PT_monster") > 0) div.classList.add("hs_DIYfl");
				else div.classList.remove("hs_DIYfl");
			} else {
				div.classList.remove("hs_DIYfl");
				div.classList.add("hs_view");
				div.node.avatar.setBackgroundImage(`${basic.getExtensionRelativePath("resource")}asset/card/${name}.jpg`);
			}
		} /*代码修改：如果为空白奥秘，直接显示插图*/
		else {
			var dire = "heroskill";
			if (typeof node == "string") dire = "secret";
			else if (name.indexOf("hs_leader") == 0) dire = "boss";
			div.node.avatar.setBackgroundImage(`${basic.getExtensionRelativePath("resource")}image/${dire}/${name}.jpg`);
		}
		ui.morezone.current = name;
	},
	tr(a) {
		var num = a.indexOf("_monster");
		if (num < 0) return a + "_monster";
		else return a.slice(0, num);
	},
	outputRD(num) {
		var deck = get.HSF("readD", [game.me.name]);
		if (!num || num == 1) return deck;
		else if (num == 2) {
			var str = "";
			for (let i = 0; i < deck.length; i++) {
				if (i > 0) str += ", ";
				str += `"${deck[i]}"`;
			}
			return str;
		}
	},
	readD(name) {
		var res = lib.storage.hs_deck[name] || [];
		if (!res.length) {
			get.hs_alt("找不到卡组数据");
			return;
		}
		if (res[0].includes("hs_")) {
			get.HSF("saveDeck", [game.me.name, res]);
			return get.HSF("readD", [name]);
		}
		return get.copy(res);
	},
	jiag(deck) { //旧卡组转新卡组
		var res = [];
		for (let i = 0; i < deck.length; i++) {
			var temp = deck[i];
			var num = get.HSF("count", [deck, temp]);
			res.push(get.translation(temp) + "*" + num);
			for (let j = 0; j < num; j++) {
				deck.remove(temp);
			}
			i = -1;
		}
		return res;
	},
	getEN(arg, multi) { //由卡牌中文名获取卡牌英文名
		if (multi) var res = [];
		for (let i in lib.card) {
			if (["HS_minor", "HS_spell", "HS_weapon"].includes(get.type(i)) && get.translation(i) == arg) {
				if (multi) res.add(i);
				else {
					if (lib.card[i].nosearch) continue;
					return i;
				}
			}
		}
		if (multi && res.length) return res;
		var r2 = get.HS_trans(arg);
		if (r2) return get.HSE(r2, multi);
		else {
			get.hs_alt(`喵喵！ getEN:${arg}可能不是游戏中的牌！改为树人😉`);
			return "hs_Treant1_monster";
		}
	},
	getEN2(arg) {
		var res = get.HSE(arg);
		if (res.includes("_monster")) return res.split("_monster")[0];
		return res;
	},
	作弊(type, arg, p) { //你作弊
		if (!_status.gameStarted) {
			/*代码修改：现在不会阻止，而是游戏开始后执行*/
			if (!_status.hs_zuobi_list) _status.hs_zuobi_list = [];
			_status.hs_zuobi_list.push(arguments);
			return "error:进入游戏前禁止作弊，代码在游戏开始后执行！";
		}
		var name;
		p = p || game.me;
		if (arg) {
			if (type == "水晶") p.HSF("gainmana", [arg]);
			else if (type == "武器") p.hs_weapon(arg);
			else if (type == "奥秘") p.use_secret(arg);
			else {
				if (type == "获得") name = get.HSE(arg);
				if (type == "获得" && name) p.directgain([get.chscard(name)]);
				else if (type == "特召") {
					p.SSfellow(arg).notrigger = true;
				} else if (type == "强化") {
					p.countFellow(fl => {
						fl.addvaluebuff([arg, arg]);
					});
					get.HSF("checkfellow");
				} else if (type == "异能") {
					p.countFellow(fl => {
						fl.addgjzbuff(arg);
					});
					get.HSF("checkfellow");
				} else if (type == "code") {
					arg(p);
				}
			}
		}
		return name;
	},
	作弊2(type, arg) { //电脑作弊
		return get.HSF("作弊", [type, arg, game.enemy]);
	},

	//计算
	attackact(atk, def) { //计算攻击位置
		let a = atk.offsetHeight;
		let b = def.offsetTop;
		let c = atk.offsetTop;
		let d = def.offsetHeight;
		let e = def.offsetLeft;
		let f = atk.offsetLeft;
		let g = atk.offsetWidth;
		let h = def.offsetWidth;
		let x = e - f,
			y = b - c;
		let xx = y + (d - a) / 2,
			yy = x + (h - g) / 2;
		let r = Math.pow(Math.pow(xx, 2) + Math.pow(yy, 2), 0.5);
		let rat = 1 - a / 2 / r;
		return [xx * rat, yy * rat];
	},
	saveDeck(p, d) {
		if (d[0].includes("hs_")) lib.storage.hs_deck[p] = get.HSF("jiag", [d]);
		else lib.storage.hs_deck[p] = d;
		game.save("hs_deck", lib.storage.hs_deck);
	},
	fff(n) { //根据卡名(未处理的)，获取怪兽的描述
		var str = "";
		var list = lib.hearthstone.cardPack.monsterRD[n];
		if (!list) return str;
		var intro = list[2];
		intro = (function(s) {
			var li = get.HSA("jiacu");
			for (let w of li) {
				s = s.replace((new RegExp(w, "g")), "<b>" + w + "</b>");
			}
			var li = get.HSA("rkind");
			for (let w in li) {
				s = s.replace((new RegExp(w, "g")), "<b>" + w + "</b>");
			}
			return s;
		})(intro);
		var info = list[3];
		if (!info || !info.length || info.length < 6) return str;
		var func = function(type) {
			if (["HS_normal", "HS_effect"].includes(type)) {
				return "/" + get.HS_trans(type) + "/" + get.HS_trans(info[2] || "hs_neutral") + "/" + get.HS_trans(list[1]);
			}
		};
		str += "费用 " + info[1] + "<br>" + get.HS_trans(info[3]) + func(info[0]) + "<br>" + intro + "<br>攻击 " + info[4] + " 血量 " + info[5];
		return str;
	},
	arrstr(val) { //数组转字符串
		val = val.map(i => typeof i == "string" ? `"${i}"` : i);
		return `[${val.join(",")}]`;
	},
	HSline(player, target, config) { //画指示线
		player.line(target);
	}
};