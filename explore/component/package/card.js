import { lib, game, ui, get, ai, _status } from "../../noname.js";
import { basic } from "../../utility.js";
import { cons, hearthstone } from "../../assembly/index.js";
import { DEFAULT } from "../../assembly/expand/default.js";
import { NAXX } from "../../assembly/expand/naxx.js";
import { BRM } from "../../assembly/expand/brm.js";
import { GVG } from "../../assembly/expand/gvg.js";
import { TGT } from "../../assembly/expand/tgt.js";
import { LOE } from "../../assembly/expand/loe.js";
import { DIY } from "../../assembly/expand/diy.js";

export async function card() {
	window.hearthstone = hearthstone;
	window.hearthstone.imported = [DEFAULT, NAXX, BRM, GVG, TGT, LOE, DIY];
	//简化常见分类
	const strfunc = hearthstone.get.strfunc,
		hsrfunc = hearthstone.get.hsrfunc,
		hsbuff = hearthstone.get.hsbuff;
	const simplify = {
		publicKeys: {//公共
			con: {
				//限定条件
				fg(obj) { //对面有随从
					obj.sfilter = function(card, player) {
						return player.sctp("notmine").length
					};
				},
				//固定效果
				bh: "player.sctp('notmine',t=>t.addgjzbuff('dongjied'));",
				draw1: "player.hs_drawDeck();",
				draw3: "player.hs_drawDeck(3);",
				frost: "target.addgjzbuff('dongjied');",
				discard1: "player.hs_discard();",
				shrink2: "target.addvaluebuff(-2);",
				gift2: "player.getOppo().hs_gain(get.hskachi('HS_minor').randomGet());",
				fx: "player.hs_dmgrcvaoe(2,player,card,player.sctp('opposide'));", //奉献
				//可调节条件
				bq(rg) { //标签
					obj[`spell${rg}`] = true;
				},
				only(rg) { //目标限定
					switch (rg) {
						case "fellow":
							obj.filterTarget = function(c, p, t) {
								return p.sctp("mns", t);
							};
							break
						case "fellow,healthy":
							obj.filterTarget = function(c, p, t) {
								return t.isHealthy() && p.sctp("mns", t);
							};
							break
						case "notmine,healthy":
							obj.filterTarget = function(c, p, t) {
								return t.isHealthy() && p.sctp("notmine", t);
							};
							break
						case "enemy":
							delete obj.filterTarget;
							obj.randomRT = function(p) {
								return p.getOppo();
							};
							break
						case "me":
							delete obj.filterTarget;
							obj.randomRT = function(p) {
								return p;
							};
							break
						case "opposide":
							obj.filterTarget = function(c, p, t) {
								return p.sctp("opposide", t);
							};
							break
						case "randmgfl":
							delete obj.filterTarget;
							obj.randomRT = function(p) {
								return p.HSF("randmgfil", ["notmine"]);
							};
							break
						case "randmgfl2":
							delete obj.filterTarget;
							obj.randomRT = function(p) {
								let fls = p.sctp("notmine").filter(t => t.canhsdmg());
								if (fls.length < 2) return false;
								return fls.randomGets(2);
							};
							obj.tgs = true;
							break
						case "ranxmfl":
							delete obj.filterTarget;
							obj.randomRT = function(p) {
								return p.HSF("ranxmfil");
							};
							break
						case "self":
							obj.filterTarget = function(c, p, t) {
								return p.sctp("mine", t);
							};
							break
						case "demon":
							obj.filterTarget = function(c, p, t) {
								return t.rkind === "demon";
							};
							break
						case "undead":
							obj.filterTarget = function(c, p, t) {
								return t.rkind === "undead";
							};
							break
						case "灭":
							obj.filterTarget = function(c, p, t) {
								return t.isMin() && t.ATK >= 5;
							};
							break
						case "痛":
							obj.filterTarget = function(c, p, t) {
								return t.isMin() && t.ATK <= 3;
							};
							break
						case "enm":
							obj.filterTarget = function(c, p, t) {
								return p.sctp("notmine", t);
							};
							break
						case "伤":
							obj.filterTarget = function(c, p, t) {
								return p.sctp("mns", t) && t.isDamaged();
							};
							break
						case "enm,伤":
							obj.filterTarget = function(c, p, t) {
								return p.sctp("notmine", t) && t.isDamaged();
							};
							break
						case "enm,未伤":
							obj.filterTarget = function(c, p, t) {
								return p.sctp("notmine", t) && t.isHealthy();
							};
						default:
							console.error(`Unknown targeting rule:${rg}`);
							break;
					}
				},
				activecon(ac, obj) { //金框条件
					switch (ac) {
						case "ys":
							obj.active = function(player) {
								return player.hasFellow(fl => fl.rkind === "wildbeast");
							};
							break;
						case "dmg":
							obj.active = function(player) {
								return player.hp <= 12;
							};
							break;
						case "yh":
							obj.active = function(player) {
								return player.countCards("h") === 1;
							};
							break;
						case "moreh":
							obj.active = function(player) {
								return player.countCards("h") > player.getOppo().countCards("h");
							};
							break;
						case "lianji":
							obj.active = function(player) {
								return player.hs_state.useCard > 0;
							};
							break;
						default:
							console.error(`Unknown active condition: ${ac}`);
							break;
					}
				},
				activeeff(ac) { //金框效果
					let con = "if(event.active)";
					if (simplify.publicKeys.con[ac]) arr.push(con + simplify.publicKeys.con[ac]);
				},
				//可调节效果
				gain(v1, obj) { //置于手牌
					return `player.hs_gain(${v1});`;
				},
				weapon(v1, obj) { //装备武器
					return `player.hs_weapon(${v1});`;
				},
				gift(v1, obj) { //疲劳
					return `player.getOppo().hs_drawDeck(${v1});`;
				},
				damage(v1, obj) { //伤害
					return `target.hs_dmgrcv('damage',${v1});`;
				},
				recover(v1, obj) { //回复
					return `target.hs_dmgrcv('recover',${v1});`;
				},
				xx(v1, obj) { //吸血
					return `player.hs_dmgrcv('recover',${v1});`;
				},
				summon(v1, obj) { //召怪
					return `player.SSfellow(${v1});`;
				},
				buff(v1, obj) { //buff
					var ar = hsbuff(v1.split(","));
					arr.addArray(ar);
				},
				atkhj(v1, obj) { //攻击力和护甲
					return `player.hs_atkhj(${v1});`;
				},
				other(v1, obj) { //没活了，自己写
					return v1;
				},
				//条件调节效果
				des(v1) { //目标死亡
					let com = "if(!target.HSF('alive'))";
					if (v1.length > 8) return com + v1;
					return com + simplify.publicKeys.con[v1];
				},
				nodes(v1) { //目标存活
					let com = "if(target.HSF('alive'))";
					if (v1.length > 8) return `${com}${v1}`;
					return com + simplify.publicKeys.con[v1];
				},
			},
		},
		飞弹: {
			init() { //获取初始化数据
				let num = parseInt(ms.slice(3));
				obj.spelldamage = num;
				obj.content = strfunc("", `player.hs_Missiles(${num}, true);`);
				return {
					base: num
				};
			},
			dftrans: "造成#点伤害，随机分配到所有敌方角色身上。",
			norecon: true,
		},
		damage: {
			init() { //获取初始化数据
				let num = ms.slice(7);
				let num2 = parseInt(num) || 1;
				obj.spelldamage = num2;
				obj.filterTarget = true;
				return {
					base: num
				};
			},
			dftcode(items, obj) {
				return obj.tgs ? `player.hs_dmgrcvaoe('damage', player, card, targets, ${items.base}${obj.energy ? `, '${obj.energy}'` : ""});` : `target.hs_dmgrcv('damage', ${items.base}${obj.energy ? `, '${obj.energy}'` : ""});`;
			},
			dftrans: "造成#点伤害。",
			solve(s, obj, arr, items, k1, v1) {
				const num = items.base;
				if (s === "doubleD") {
					obj.doubleD = true;
				} else if (s === "lavaeff") {
					arr.new0 = `get.HSF('lavaeffect',['damage',${num},'lava',player]);`;
					delete obj.filterTarget;
				} else if (s === "xxx") {
					arr.add(`player.hs_dmgrcv('recover',${num});`);
				} else if (s === "blade") {
					arr.new0 = `get.HSF('bladeeffect',['damage',${num},player]);`;
					delete obj.filterTarget;
				} else if (k1 === "lava") {
					arr.new0 = `get.HSF('lavaeffect',['${v1}',${num},'lava',player]);`;
					delete obj.filterTarget;
				} else if (k1 === "aoe") {
					arr.new0 = `player.hs_dmgrcvaoe(${num},player,card,player.sctp('${v1}')${obj.energy ? `, '${obj.energy}'` : ""});`;
					delete obj.filterTarget;
				} else if (k1 === "rcvmyside") {
					arr.add(`player.hs_dmgrcvaoe(${v1},'recover',player,card,player.sctp('myside'));`);
				} else if (k1 === "activenum") {
					items.base = `(event.active?${v1}:${num})`;
				}
			}
		},
		recover: {
			init() {
				let num = ms.slice(8);
				let num2 = parseInt(num) || 1;
				obj.filterTarget = true;
				obj.spellrecover = num2;
				return {
					base: num
				};
			},
			dftcode(items, obj) {
				return `target.hs_dmgrcv('recover',${items.base});`;
			},
			dftrans: "恢复#点生命值。",
		},
		summon: {
			init() {
				let tg = ms.slice(7);
				obj.summoneff = true;
				return {
					base: tg
				};
			},
			dftcode(items, obj) {
				return `player.SSfellow(${items.base});`;
			},
			dftrans: "",
		},
		咆哮: {
			init() {
				let num = parseInt(ms.slice(3));
				return {
					rg: "mine",
					base: num
				};
			},
			dftcode(items, obj) {
				if (items.temp) return `player.sctp('${items.rg}',t=>t.addvaluebuff(${items.base},1));`;
				return `player.sctp('${items.rg}',t=>t.addvaluebuff([${items.base},${items.base}]));`;
			},
			dftrans: "使你的所有随从获得+#/+#。",
			solve(s, obj, arr, items, k1, v1) {
				if (s === "temp") items.temp = true;
			},
		},
		bxs: {
			init() {
				let tg = ms.slice(4);
				obj.filterTarget = function(c, p, t) {
					return t.isMin();
				};
				obj.spelldestroy = true;
				return {
					base: tg
				};
			},
			dftcode(items, obj) {
				return `target.HSF('convert',['${items.base}']);`;
			},
			dftrans: "",
		},
		draw: {
			init() {
				let num = ms.slice(5);
				let n = parseInt(num);
				obj.spelldraw = n || true;
				if (num.indexOf("p=>") >= 0) num = `(${num})(player)`;
				return {
					base: n || num,
				};
			},
			dftcode(items, obj) {
				return `player.hs_drawDeck(${items.base});`;
			},
			dftrans: "抽$张牌。",
		},
		kill: {
			init(arr) {
				let num = ms.slice(5);
				if (num != "1") {
					let sj = num === "all" ? "mns" : num;
					arr.new0 = `get.HSF('lavaeffect', ['cuihui',player.sctp('${sj}'), 'lava']);`;
				} else obj.filterTarget = function(c, p, t) {
					return t.isMin();
				};
				obj.spelldestroy = true;
				return {
					base: num
				};
			},
			dftcode(items, obj) {
				return "target.HSF('cuihui');";
			},
			dftrans: "消灭一个随从。",
			solve(s, obj, arr, items, k1, v1) {
				if (k1 === "onlianji") arr.add(`if(event.active){${v1}}`);
			},
		},
		buff: {
			init(arr) {
				var ar = hsbuff(ms.slice(5).split(","));
				if (ar.hsai === "damage") obj.spelldamage = true;
				else if (ar.hsai === "destroy") obj.spelldestroy = true;
				else obj.spellbuff = true;
				obj.filterTarget = strfunc("c,p,t", "return p.sctp('mns',t)");
				return {
					ar,
					rg: "mns",
					random: false
				};
			},
			dftrans: "",
			solve(s, obj, arr, items, k1, v1) {
				if (k1 === "onlianji") {
					let ar = hsbuff(v1.split(","));
					arr.addArray(ar);
					if (arr.length === 2) {
						arr[0] = `if(!event.active)${arr[0]}`;
						arr[1] = `if(event.active)${arr[1]}`;
					}
					return;
				}
				if (s === "random") items.random = true;
				else if (s === "neg") {
					obj.spelldamage = true;
					delete obj.spellbuff;
				} else if (k1 === "sctp") items.rg = v1;
				if (items.random) {
					delete obj.filterTarget;
					obj.randomRT = strfunc("p", `return p.sctp('${items.rg}').randomGet()`);
				} else obj.filterTarget = strfunc("c,p,t", `return p.sctp('${items.rg}',t)`);
			},
		},
	};


	//检查缩写称号重复
	hearthstone.imported.forEach(i => {
		for (let j in i.cdan) {
			if (Object.keys(hearthstone.constants.cdan).includes(j)) alert(`扩展包《${i.name}》的${j}重复了`, );
			else hearthstone.constants.cdan[j] = i.cdan[j]
		}
	});

	var keys = Object.keys(hearthstone.cardPack.monsterRD);
	hearthstone.imported.forEach(i => {
		for (let j in i.minor.info) {
			if (keys.includes(j)) alert(`喵喵！扩展包《${i.name}》的${j}重复了哦！`);
			else hearthstone.cardPack.monsterRD[j] = i.minor.info[j]
		}
	});

	//怪物们的技能
	const effects = {};
	keys = Object.keys(effects);
	hearthstone.imported.forEach(i => {
		for (let j in i.minor.skill) {
			if (keys.includes(j)) alert(`喵喵！扩展包《${i.name}》的${j}重复了哦！`);
			else effects[j] = i.minor.skill[j]
		}
	});
	for (let i in effects) {
		lib.skill[i] = effects[i];
	}
	const minispell = {};
	keys = Object.keys(minispell);
	hearthstone.imported.forEach(i => {
		for (let j in i.spell.info) {
			if (keys.includes(j)) alert(`喵喵！扩展包《${i.name}》的${j}重复了哦！`);
			else minispell[j] = i.spell.info[j]
		}
	});
	for (let i in minispell) {
		lib.translate[i] = minispell[i][0];
		var ms = minispell[i][2];
		var tms = ms;
		if (!lib.translate[`${i}_info`]) {
			if (ms.length == 2) {
				tms = ms[1];
				lib.translate[`${i}_info`] = tms;
				ms = ms[0];
			}
		}
		var coff = ms.indexOf(":") > 0; //常见简化效果
		if (!lib.translate[`${i}_info`] && !coff) lib.translate[`${i}_info`] = ms;
		var obj = {
			rarity: minispell[i][1],
			cost: minispell[i][3],
			rnature: minispell[i][4],
		};
		var gz = new RegExp("过载：（[1-9]）");
		if (gz.test(tms)) {
			var num = parseInt(tms.match(gz)[0].slice(4, -1));
			obj.hs_gz = num;
		}
		if (ms.indexOf("@") == 0) {} else { //还没想好
			var xsf = minispell[i][5] || []; //修饰符
			var tool = null,
				items = null,
				arr = [];
			if (coff) {
				xsf.push("coff");
				if (["ice", "fire", "thunder"].includes(xsf[0])) obj.energy = xsf[0];
				var key = ms.slice(0, ms.indexOf(":"));
				tool = simplify[key];
				if (tool) {
					items = tool.init(arr) || {};
					if (items.ar) arr = items.ar;
				}
			}
			xsf.forEach(s => {
				//publicKeys部分
				let aa = s.split(":");
				let k1 = aa[0],
					v1 = s.slice(k1.length + 1);
				if (s.indexOf("cgct:") === 0) {
					eval(`obj.changecost = function(p) {
						${s.slice(5)}
					}`);
				} else if (s.indexOf("hsdraw:") === 0) {
					eval(`obj.onhsdraw = function() {
						${s.slice(7)}
					}`);
				} else if (s === "token") {
					obj.hs_token = true;
				} else if (s === "legend") {
					obj.hs_legend = true;
				} else if (s === "nosearch") {
					obj.nosearch = true;
				} else if (simplify.publicKeys.con[s]) {
					if (typeof simplify.publicKeys.con[s] === "function") simplify.publicKeys.con[s](obj);
					else arr.push(simplify.publicKeys.con[s]);
				} else if (v1 && simplify.publicKeys.con[k1]) { //如果是带冒号的标签
					let str = simplify.publicKeys.con[k1](v1, obj);
					if (typeof str === "string") arr.push(str);
				} else if (s != "coff" && xsf.includes("coff")) { //特色
					if (tool && tool.solve) {
						let str = tool.solve(s, obj, arr, items, k1, v1);
						if (typeof str === "string") arr.push(str);
					}
				}
			});
			if (tool) {
				if (tool.dftcode) {
					if (arr.new0) arr.unshift(arr.new0);
					else {
						arr.unshift(tool.dftcode(items, obj));
					}
				}
				if (!lib.translate[`${i}_info`]) lib.translate[`${i}_info`] = tool.dftrans.replace("#", items.base).replace("$", get.cnNumber(items.base));
			}
			if (arr.length && !(tool && tool.norecon)) obj.content = hsrfunc(arr);
		}
		minispell[i] = obj;
	}

	const full = {};
	keys = Object.keys(full);
	hearthstone.imported.forEach(i => {
		for (let j in i.spell.skill) {
			if (keys.includes(j)) alert(`喵喵！扩展包《${i.name}》的${j}重复了哦！`);
			else full[j] = i.spell.skill[j]
		}
	});

	for (let i in full) {
		if (minispell[i]) {
			full[i] = Object.assign({}, minispell[i], full[i]);
		}
	}

	const minitrap = {};

	keys = Object.keys(minitrap);
	hearthstone.imported.forEach(i => {
		for (let j in i.trap.info) {
			if (keys.includes(j)) alert(`喵喵！扩展包《${i.name}》的${j}重复了哦！`);
			else minitrap[j] = i.trap.info[j]
		}
	});

	for (let i in minitrap) {
		lib.translate[i] = minitrap[i][0];
		var ms = minitrap[i][2];
		var tms = ms;
		if (!lib.translate[`${i}_info`]) {
			if (ms.length == 2) {
				tms = ms[1];
				lib.translate[`${i}_info`] = tms;
				ms = ms[0];
			}
		}
		var coff = ms.indexOf(":") > 0; //常见简化效果
		if (!lib.translate[`${i}_info`] && !coff) lib.translate[`${i}_info`] = ms;
		var obj = {
			rarity: minitrap[i][1],
			cost: minitrap[i][3],
			rnature: minitrap[i][4],
		};
		minitrap[i] = obj;
	}


	const full2 = {};

	keys = Object.keys(full2);
	hearthstone.imported.forEach(i => {
		for (let j in i.trap.skill) {
			if (keys.includes(j)) alert(`喵喵！扩展包《${i.name}》的${j}重复了哦！`);
			else full2[j] = i.trap.skill[j]
		}
	});

	for (let i in full2) {
		if (minitrap[i]) {
			full2[i] = Object.assign({}, minitrap[i], full2[i]);
		}
	}



	const weaponfull = {};
	keys = Object.keys(weaponfull);
	hearthstone.imported.forEach(i => {
		for (let j in i.weapon.skill) {
			if (keys.includes(j)) alert(`喵喵！扩展包《${i.name}》的${j}重复了哦！`);
			else weaponfull[j] = i.weapon.skill[j]
		}
	});

	const miniweapon = {};
	keys = Object.keys(miniweapon);
	hearthstone.imported.forEach(i => {
		for (let j in i.weapon.info) {
			if (keys.includes(j)) alert(`喵喵！扩展包《${i.name}》的${j}重复了哦！`);
			else miniweapon[j] = i.weapon.info[j]
		}
	});

	for (let i in miniweapon) {
		var wp = miniweapon[i];
		lib.translate[i] = wp[0];
		lib.translate[`${i}_info`] = wp[2];
		var obj = {
			rarity: wp[1],
			enable: true,
			notarget: true,
			fullimage: true,
			type: "HS_weapon",
			ai: {
				order: 9,
				result: {
					player: 1,
				},
			},
		};
		obj.weaponeffect = weaponfull[i] ? weaponfull[i].weaponeffect : {};
		obj.cost = wp[3];
		obj.rnature = wp[4];
		obj.ATK = wp[5];
		obj.HP = wp[6];
		if (wp[2].length > 0) {
			var arr = wp[2].split(new RegExp("，|。")); //描述根据逗号分割
			var gjz = true;
			for (let p of arr) {
				var yc = cons.yincang[p];
				var gz = new RegExp("^过载：（[1-9]）");
				if (gjz && p.length == 2) { //关键字效果
					var fy = cons.yineng[p];
					if (fy && !obj.weaponeffect[fy]) obj.weaponeffect[fy] = true;
				} else if (yc) { //隐藏关键字
					gjz = false;
					yc = cons.yineng[yc];
					obj.weaponeffect[yc] = true;
				} else if (gz.test(p)) {
					var num = parseInt(p.match(new RegExp("(?<=(过载：（)).")));
					obj.hs_gz = num;
				} else if (p.indexOf("：") == 2) {
					var pr = p.split("：");
					var sj = pr[0],
						xg = pr[1];
					var sjs = {
						战吼: "battleRoal",
						亡语: "deathRattle",
					};
					if (sjs[sj] && !obj.weaponeffect[sjs[sj]]) {
						var tri = {};
						var regs = {
							blade: "对所有随从造成[1-9]点伤害",
							gain: "将一张.{1,9}置入你的手牌",
						};
						var reg = function(b) {
							return new RegExp(b);
						};
						var mth = function(a, b) {
							return a.match(reg(b));
						}
						if (mth(xg, regs.blade)) {
							var num = parseInt(mth(xg, regs.blade)[0].slice(7, 8));
							tri.effect = strfunc("", "get.HSF('bladeeffect', ['damage', " + num + ", player]);");
						} else if (mth(xg, regs.gain)) {
							var str = mth(xg, "一张.+置入")[0].slice(2, -2);
							tri.effect = strfunc("", "player.hs_gain('" + str + "');");
						}
						obj.weaponeffect[sjs[sj]] = tri;
					}
				}
			}
		}
		if (wp[7]) wp[7].forEach(s => {
			if (s == "token") obj.hs_token = true;
			else if (s == "legend") obj.hs_legend = true;
			else if (s == "rareEff") {
				obj.weaponeffect.active = function(p, c) {
					var that = this;
					if (that.battleRoal) {
						if (that.battleRoal.filter) {
							var nf = get.HSF("strfil", [that.battleRoal.filter]);
							that.battleRoal.filter = nf;
							if (!nf(p, c)) return false;
						}
						if (that.battleRoal.filterTarget && !p.sctp("all", t => that.battleRoal.filterTarget(null, p, t))) return false;
						if (that.battleRoal.randomRT && !that.battleRoal.randomRT(p)) return false;
						return true;
					} else return false;
				};
			} else if (s.indexOf(":") > 0) {
				var sr = s.split(":");
				var sj = sr[0],
					xg = sr[1];
				var tri = {};
				if (xg.includes("fltbuff>")) {
					var arr = xg.slice(8).split("：");
					var rg = arr[0].split(",");
					arr = arr[1].split(",");
					arr = hsbuff(arr);
					if (sj == "battleRoal") tri.filterTarget = strfunc("c,p,t", "return p.sctp('" + rg[0] + "',t)&&t.rkind=='" + rg[1] + "';");
					else tri.randomRT = strfunc("p", "return p.sctp('" + rg[0] + "').filter(t=>t.rkind=='" + rg[1] + "').randomGet()");
					tri.aifamily = arr.hsai;
					tri.effect = hsrfunc(arr);
				} else if (xg.includes("ranbuff>")) {
					var arr = xg.slice(8).split("：");
					var rg = arr[0];
					arr = arr[1].split(",");
					arr = hsbuff(arr);
					tri.randomRT = strfunc("p", "return p.sctp('" + rg + "').randomGet()");
					tri.effect = hsrfunc(arr);
				} else if (xg.includes("cghrsk>")) {
					var c = xg.slice(7);
					tri.effect = strfunc("", "player.HSF('changeHeroskill',['" + c + "']);");
				}

				obj.weaponeffect[sj] = tri;
			}
		});

		miniweapon[i] = obj;
	}

	for (let i in weaponfull) {
		if (miniweapon[i]) {
			weaponfull[i] = Object.assign({}, weaponfull[i], miniweapon[i]);
		}
	}

	hearthstone.rdrd_card = {
		spell: Object.assign({}, minispell, full),
		trap: Object.assign({}, minitrap, full2),
		weapon: Object.assign({}, miniweapon, weaponfull),
	};


	for (let i in hearthstone.loadTrans) {
		if ((new RegExp("^hs")).test(i)) {
			if (i.indexOf("_info") < 0) {
				if (!hearthstone.rdrd_card.spell[i] && !hearthstone.rdrd_card.trap[i]) {
					hearthstone.rdrd_card.spell[i] = {
						able() {
							return false
						},
					};
				}
			} else hearthstone.loadTrans[i] = hearthstone.loadTrans[i];
		}
	}
	var objt = Object.assign({}, hearthstone.rdrd_card.spell, hearthstone.rdrd_card.trap, hearthstone.rdrd_card.weapon);
	for (let i in objt) {
		if (!objt[i].fullimage) objt[i].fullimage = true;
		if (hearthstone.rdrd_card.spell[i]) {
			var ob = hearthstone.rdrd_card.spell[i];
			if (!ob.cost) ob.cost = 0;
			if (!ob.type) ob.type = "HS_spell";
			if (!ob.subtype) ob.subtype = "HS_normalS";
		} else if (hearthstone.rdrd_card.trap[i]) {
			var ob = hearthstone.rdrd_card.trap[i];
			if (!ob.cost) ob.cost = 0;
			if (!ob.subtype) ob.subtype = "HS_secret";
		}
	};
	return {
		closeable: true,
		connect: true,
		card: objt,
		cardType: {},
		translate: {},
		list: [],
	};
};