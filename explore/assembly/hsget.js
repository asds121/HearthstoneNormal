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
import cons from "./cons.js";

export default {
	hstype(obj) { //获取itemtype（武器不是player）
		const type = get.itemtype(obj);
		if (undefined == type) return;
		if (!obj) alert(type);
		if (type == "players") {
			if (obj.every(i => get.hstype(i) == "weapon")) return "weapons";
			else if (!obj.every(i => get.hstype(i) == "player")) return "aliveobjs";
		} else if (type == "player") {
			if (obj instanceof lib.element.HSweapon) return "weapon";
		} else if (obj instanceof lib.element.HSsecret) return "secret";
		else if (obj.stid && obj.secret) return "secreteffect";
		return type;
	},
	rGJZ(obj, key) { //获取牌的关键字
		if (!obj) return null;
		var str;
		if (obj.name) str = obj.name;
		else str = obj;
		if (get.type(str) == "HS_spell") return null;
		var sk;
		if (get.type(str) == "HS_minor") sk = lib.skill[str.slice(0, -8)];
		else if (get.type(str) == "HS_weapon") sk = get.info({
			name: str
		}).weaponeffect;
		if (sk) return sk[key];
		return null;
	},
	rHP(obj) { //获取随从牌生命值
		if (!obj) return null;
		var str;
		if (get.hstype(obj) == "card") str = obj.name;
		else str = obj;
		var info = get.info({
			name: str
		});
		if (!info) return null;
		return info.HP;
	},
	rATK(obj) { //获取随从牌攻击力
		if (!obj) return null;
		var str;
		if (get.hstype(obj) == "card") str = obj.name;
		else str = obj;
		var info = get.info({
			name: str
		});
		if (!info) return null;
		return info.ATK;
	},
	rkind(obj) { //获取随从牌种族
		var str;
		if (get.hstype(obj) == "card") str = obj.name;
		else if (obj.name) str = obj.name;
		else str = obj;
		var info = get.info({
			name: str
		});
		return info.rkind;
	},
	rnature(obj) { //获取牌的职业
		var str;
		if (obj.rnature) return obj.rnature;
		if (get.hstype(obj) == "card") str = obj.name;
		else str = obj;
		var info = get.info({
			name: str
		});
		return info.rnature;
	},
	strfunc: (args, str) => {
		let fstr = "var ff=function(" + args + "){" + str + "};ff;";
		_status.strbug = fstr;
		return eval(fstr);
	},
	hsrfunc(str) { //生成步骤content
		var that = window.hearthstone ? hearthstone.get : get;
		var strfunc = that.strfunc;
		var arr = Array.from(arguments);
		var res = "";
		if (arguments.length == 1) {
			if (typeof str == "string") return strfunc("", str);
			else return that.hsrfunc.apply(get, str);
		} else {
			arr.forEach((i, j) => {
				res += "'step " + j + "'\n";
				res += i + "\n";
			});
		}
		return strfunc("", res);
	},
	arraycount() { //数组各成员数组的长度之和
		var count = 0;
		for (let i = 0; i < arguments.length; i++) {
			if (Array.isArray(arguments[i])) count += arguments[i].length;
		}
		return count;
	},
	chscard(name, cn, multi) { //制作一张卡(和createCard类似)
		var cname;
		var isCN = function(temp) {
			var re = /[\u4e00-\u9fa5]/;
			return re.test(temp);
		}
		if (cn || isCN(name)) cname = get.HSE(name, multi);
		if (multi) {
			if (!cname.length) {
				get.hs_alt(name + "→在卡池里不存在");
				return [];
			}
		} else {
			if (cname) name = cname;
			if (!get.info({
					name: name
				})) {
				get.hs_alt(name + "→在卡池里不存在");
				return null;
			}
		}
		var card = get.chscard2(name);
		return card;
	},
	HS_trans(str) { //翻译
		var obj = Object.assign({},
			get.HSA("easy"),
			get.HSA("cdan"),
			get.HSA("rkind"),
			get.HSA("rarity"));
		if (obj[str]) return obj[str];
		if (lib.translate[str]) return lib.translate[str];
		return "";
	},
	HSF: (n, a) => lib.hearthstone.funcs[n] ? lib.hearthstone.funcs[n].apply(get, a) : get.hs_alt(n + "不是一个funcs方法"), //调用自定义函数(自定义函数在funcs里面找)
	HSA: n => get.copy(lib.hearthstone.constants[n]), //访问自定义常量(在const里面找)
	HSAT: n => { //反向
		var obj = get.HSA(n);
		if (!obj) {
			get.hs_alt("HSAT:" + n + "不是一个常量列表");
			return;
		}
		var res = {};
		for (let i in obj) {
			res[obj[i]] = i;
		}
		return res;
	},
	HSE: n => get.HSF("getEN", [n]),
	hslegend(card) { //是否传说
		if (get.hstype(card) == "card") return get.rall(obj, 'rarity') == 'legend';
		else if (get.hstype(card) == "player") return get.rall(card.name + "_monster", 'rarity') == 'legend';
		else if (["weapon", "secret"].includes(get.hstype(card))) return get.rall(card.name, 'rarity') == 'legend';
	},
	rall(obj, key) { //获取卡牌信息
		if (!obj) return null;
		var str;
		if (get.hstype(obj) == "card") str = obj.name;
		else str = obj;
		var info = get.info({
			name: str
		});
		if (!info) return null;
		if (!key) return info;
		return info[key];
	},
	hs_main() { //获取主玩家
		return _status.hsbo ? game.me : game.enemy;
	},
	chsinit(card) { //卡牌初始化
		card.cost = lib.element.card.cost;
		var cf = ["HSF", "addhsbuff", "addvaluebuff", "addtriggerbuff", "addgjzbuff", "hasgjz"];
		cf.forEach(i => {
			card[i] = game.me[i];
		});
		if (["HS_minor", "HS_spell", "HS_weapon"].includes(get.type(card))) card._destroy = "true"; //不进入弃牌堆
		card.buff = [];
		card.triggers = {};
		card.classList.add("rdcreated");
		var name = card.name;
		card.mana = ui.create.div(".hs_mana", card);
		card.mana.innerHTML = get.info(card).cost;
		card.setBackgroundImage(`${basic.getExtensionRelativePath("resource")}asset/card/${name}.jpg`);
		var evt = function(long) {
			var that = this;
			if (long === true) {
				get.HSF("morefocus", [that, true]);
			} else ui.morezone.hide();
			if (get.position(that) == "h" && long !== true && game.me.HSF("phaseUse")) {
				delete _status.hs_viewing;
				if (!lib.filter.filterCard(that)) {
					if (that.cost() > game.me.HSF("mana")) game.me.HSFT("法力值不够");
					else if (get.type(that) == "HS_minor" && game.me.hs_full()) game.me.HSFT("满场七随从");
					else game.me.HSFT("不能使用");
				}
			}
		};
		card.listen(evt);
		if (lib.device) card.HSF("longP", [function() {
			this.islong = true;
			if (_status.currentPhase == game.me) {
				_status.hs_viewing = true;
				get.HSF("clickmana", [true]);
			}
			evt.call(this, true);
		}]);
		var df = function(e) {
			var that = _status.hs_mousecard || this;
			if (!that.classList) {
				//console.log(that);
				return;
			}
			if (!lib.config.enable_drag) return;
			if (!that.classList.contains("selectable")) return;
			if (_status.hs_mousedown === false) return;
			get.HSF("hs_stopview");
			if (get.type(that) == "HS_minor") {
				if (_status.currentPhase != game.me || !game.me.HSF("phaseUse")) return;
				_status.hs_fldragging = ui.selected.cards.length == 1;
				if (_status.hs_fldragging) {
					game.me.HSF("hsdouble");
					var dx = (e.touches ? e.touches[0] : e).clientX;
					var num = get.HSF("dragposition", [dx]);
					ui.hs_testfl.num = num;
					ui.hs_testfl.dataset.position = num + "";
					get.HSF("arrange");
				} else {
					game.me.HSF("hsdouble");
					ui.hs_testfl.dataset.position = "d0";
					get.HSF("arrange");
				}
			} else if (get.type(that) == "HS_spell") {
				if (ui.arena.classList.contains("hs_view")) {
					get.HSF("clickmana", [false]);
					_status.hs_tempshq = that;
					that.classList.add("selected");
				}
			}
		};
		if (lib.device) card.addEventListener("touchmove", df);
		else {
			_status.hs_mousedown = false;
			card.addEventListener("mousedown", function() {
				_status.hs_mousedown = true;
				_status.hs_mousecard = this;
			});
			document.addEventListener("mousemove", df);
			document.addEventListener("mouseup", function() {
				_status.hs_mousedown = false;
				delete _status.hs_mousecard;
			});
		}
	},
	chscard2(name) { //制作一张卡(已知英文名)
		if (!name) {
			get.hs_alt("chscard2:必须传入卡牌名称");
			return;
		}
		if (typeof name != "string") {
			if (Array.isArray(name) && typeof name[0] == "string") {
				var res = [];
				for (let i = 0; i < name.length; i++) {
					var c = get.chscard2(name[i]);
					if (c) res.add(c);
				}
				return res;
			} else {
				get.hs_alt("chscard2:输入的内容不合法");
				return;
			}
		}
		var isCN = function(temp) {
			var re = /[\u4e00-\u9fa5]/;
			return re.test(temp);
		}
		if (isCN(name)) {
			get.hs_alt("chscard2:必须传入卡牌的英文名称");
			return;
		}
		var card = game.createCard(name, "spade", 1);
		get.chsinit(card);
		return card;
	},
	hs_pos(obj) { //获取所在区域
		if (!obj) get.hs_alt("hs_pos:", obj);
		if (game.me.sctp("field", obj)) return "field";
		else if (get.hstype(obj) == "player") {
			return get.hs_pos(obj.linkCard[0]);
		} else if (get.hstype(obj) == "card") {
			if (game.me.getCards("h").concat(game.enemy.getCards("h")).includes(obj)) return "hand";
			else if (game.me.cardPile.getCards("h").concat(game.enemy.cardPile.getCards("h")).includes(obj)) return "deck";
			else if (game.me.discardPile.getCards("h").concat(game.enemy.discardPile.getCards("h")).includes(obj)) return "grave";
			else if (game.me.heroskill.pos.getCards("h").concat(game.enemy.heroskill.pos.getCards("h")).includes(obj)) return "release";
			else get.hs_alt("hs_pos:", obj);
		}
	},
	hs_owner(obj) { //获取手牌的拥有者
		if (game.me.getCards("h").includes(obj)) return game.me;
		if (game.enemy.getCards("h").includes(obj)) return game.enemy;
	},
	hs_alt() { //内部调试弹窗
		alert.apply(window, [
			[""].concat(Array.from(arguments)).join("")
		]);
	},
	hs_id(obj, obj2) { //卡牌编号(作用：连系随从和卡牌，减少内存)
		if (obj2) return get.hs_id(obj) == get.hs_id(obj2);
		if (obj.length === 0) return;
		var str = get.hstype(obj);
		if (str == "card") return obj.cardid;
		else if (str == "player") {
			if (!obj.linkCard) return obj.playerid;
			else return obj.linkCard[0].cardid;
		} else if (obj.stid) return obj.stid;
		else if (obj.relabuff) return obj.relabuff.stid;
		else if (obj.wpid) return obj.wpid;
		else if (obj.id) return obj.id;
		else {
			console.log("hs_id:类型不为card或player，也不为实体");
			console.log(obj);
		}
	},
	dmgEffect(t, p, v, num) { //获取伤害效果
		num = num || 1;
		if (v == t) {
			if (t.hasgjz("mianyi")) return 0;
			if (!t.isMin()) {
				if (num > t.hp) return -10000;
				else return -num;
			}
			if (t.hasgjz("shengdun")) return -1;
			var base = t.ATK + t.hp;
			if (t.triggers.deathRattle && t.hp <= num) base = 1;
			if (t.triggers.hsdmg && t.triggers.hsdmg.fl) base = Math.max(1, t.hp - num);
			if (num < t.hp) base -= t.ATK + t.hp - num;
			return -base;
		} else if (v == p) {
			var n = get.dmgEffect(t, p, t, num);
			if (t.getLeader() == v) return n;
			else return -n;
		}
	},
	rcvEffect(t, p, v, num) { //获取治疗效果
		num = num || 1;
		if (p.hasAuras("auchenai")) return get.dmgEffect(t, p, v, num) + 0.1;
		else {
			if (v == t) {
				if (!t.isDamaged()) return 0;
				return Math.min(num, t.getDamagedHp()) + 0.1;
			} else if (v == p) {
				var n = get.rcvEffect(t, p, t, num);
				if (t.getLeader() == v) return n + 0.1;
				else return -n;
			}
		}
	},
	hsflt(filter, only) { //对卡牌的极速筛选，返回筛选函数
		if (undefined === filter) return lib.filter.all;
		if (typeof filter == "function") return filter;
		var str = "if(" + (only != "all") + "&&" + "get.type(obj)!='HS_minor')return false;";
		if (typeof filter == "string") {
			if (filter == "传说") str += "if(get.rall(obj,'rarity')!='legend')return false;";
			else if (get.HSA("collect")[filter]) {
				var cdset = get.HSA("collect")[filter];
				str += "if(!" + get.HSF("arrstr", [cdset]) + ".includes(get.translation(obj)))return false;";
			} else if (get.HSAT("easy")[filter]) {
				var job = get.HSAT("easy")[filter];
				str += "if(get.rall(obj,'rnature')!='" + job + "')return false;";
			} else if (get.HSAT("rkind")[filter]) {
				var rkind = get.HSAT("rkind")[filter];
				str += "if(get.rall(obj,'rkind')!='" + rkind + "')return false;";
			} else if (get.HSA("yineng")[filter]) {
				var yn = get.HSA("yineng")[filter];
				str += "if(!get.rGJZ(obj,'" + yn + "'))return false;";
			}
		} else if (typeof filter.length == "number") {
			for (let i = 0; i < filter.length; i++) {
				var val = filter[i];
				if (typeof val == "number") str += get.hsflt_level(val);
				else if (parseInt(val) >= 0) str += get.hsflt_level(parseInt(val));
				else str += get.hsflt(val, true);
			}
		} else if (typeof filter == "object") {
			for (let i in filter) {
				var val = filter[i];
				if (["cost", "ATK", "HP"].includes(i)) str += get.hsflt_level(val, i);
				else {
					if (Array.isArray(val)) str += "if(!" + get.HSF("arrstr", [val]) + ".includes(get.rall(obj,'" + i + "')))return false;";
					else str += "if(get.rall(obj,'" + i + "')!='" + val + "')return false;";
				}
			}
		}
		if (only && only != "all") return str;
		str += "return true;";
		return get.strfunc("obj", str);
	},
	hsflt_level(val, key) { //数字范围的筛选函数
		key = key || "cost";
		if (val % 1 == 0) return "if(get.rall(obj,'" + key + "')!=" + val + ")return false;";
		var lim = Math.round(val);
		var bo = lim > val ? "<" : ">";
		var bo2 = Math.abs(val - lim) < 0.3 ? "=" : "";
		return "if(!get.rall(obj,'" + key + "')" + bo + bo2 + lim + "))return false;";
	},
	hs_deck(player) { //给角色配卡组
		var str = player.name + "_ai";
		var deck = lib.storage.hs_deck[str].slice(0);
		var cfg = get.HSF("cfg", ["HS_aideck"]);
		if ((player == game.me || cfg == "yourdeck") && lib.storage.hs_deck[player.name]) deck = lib.storage.hs_deck[player.name].slice(0);
		player.deckCards = [];
		player.extraCards = [];
		deck.forEach(i => {
			var cs = get.hs_deck2(i);
			player.deckCards.addArray(cs);
		});
		return [player.deckCards, player.extraCards];
	},
	hs_deck2(old) { //兼容新旧卡组格式
		var put = [];
		if (old.includes("*")) {
			var yh = 0;
			var arr = old.split("*");
			var num = parseInt(arr[1]);
			for (let i = 0; i < num; i++) {
				var card = get.chscard(arr[0], true, yh);
				if (card) put.push(card);
				else get.hs_alt('卡牌"' + arr[0] + '"不存在！');
			}
		} else put.push(get.chscard(old));
		return put;
	},
	HSV(name, def) { //获取炉石变量存储
		if (!name) return lib.hearthstone.custom;
		if (def != undefined && lib.hearthstone.custom[name] == undefined) lib.hearthstone.custom[name] = def;
		return lib.hearthstone.custom[name];
	},
	HSVV(name, def) { //获取炉石变量存储
		if (!name) return lib.hearthstone.ranvv;
		if (def != undefined && lib.hearthstone.ranvv[name] == undefined) lib.hearthstone.ranvv[name] = def;
		return lib.hearthstone.ranvv[name];
	},
	hskachi(tp, func, token) { //获取当前模式卡池
		if (!func) func = () => true;
		if (!tp) tp = "all";
		var kachi = get.hscardpool();
		if (tp != "all") kachi = kachi.filter(i => get.type(i) == tp || get.subtype(i) == tp);
		kachi = kachi.filter(i => {
			var info = get.info({
				name: i
			});
			if (!token && (info.hs_tokened || info.hs_token)) return false;
			return func(i, info);
		});
		return kachi;
	},
	hscardpool(func) { //获取卡池
		if (!func) func = () => true;
		var kachi = lib.hearthstone.cardPack.mode_RD.concat(lib.hearthstone.cardPack.spel_RD).concat(lib.hearthstone.cardPack.trap_RD).concat(lib.hearthstone.cardPack.weap_RD);
		kachi = kachi.filter(i => {
			const info = lib.card[i];
			return !lib.card[i].othermode;
		});
		return kachi.filter(func).sort(lib.sort.hs_duel);
	},
	hscardback(player) { //获取卡背路径
		var str = `${basic.extensionName}/resource/asset/cardback/`;
		if ([player.name, player.next.name].includes(_status.brawlboss) && _status.brawlcardback) return str + _status.brawlcardback + ".jpg";
		if (player == game.enemy && get.HSF("cfg", ["HS_enemycardback"]) == "random") {
			if (!_status.enemycb) _status.enemycb = Object.keys(_status.hsextra).randomGet();
			return str + _status.enemycb + ".jpg";
		}
		let cb = get.HSF("cfg", ["hscardback"]);
		let cr = (!cb || cb == "default") ? "经典卡背" : cb;
		return str + cr + ".jpg";
	},
	hsbuff(arr, type) { //添加多种buff
		if (Array.isArray(arr) && !type) { //默认用法，生成效果代码
			var res = [];
			var reg = new RegExp("^[A-Za-z][1-9]$");
			var reg2 = new RegExp("^[0-9]{2}$");
			res.hsai = "recover";
			var hsa = this && this.HSA || (k => cons[k]);
			arr.forEach(i => {
				var nl = false;
				var str = "";
				if (reg.test(i)) {
					var key = i[0],
						val = parseInt(i[1]);
					if (key == "A") i = val + "0";
					else if (key == "H") i = "0" + val;
					else if (key == "q") {
						str = "target.addFqbuff('hs_power'," + val + ");";
					} else if (key == "d") {
						nl = true;
						str = "target.hs_dmgrcv('damage'," + val + ",event.fellow);";
						res.hsai = "damage";
					} else if ("ah".includes(key)) {
						if (key == "a") str = "target.addvaluefinal(" + val + ");";
						else if (key == "h") str = "target.addvaluefinal([0," + val + "]);";
						if (val == 1) res.hsai = "destroy";
						else res.hsai = "damage";
					}
				} else if (i == "cm") {
					nl = true;
					str = "target.hs_silence();";
					res.hsai = "damage";
				} else if (hsa("canchenmo").includes(i)) {
					str = "target.addgjzbuff('" + i + "');";
					if (i == "dongjied" && arr.length == 1) res.hsai = "damage";
				} else if (hsa("canchenmo").includes(i.slice(0, -2))) {
					str = "target.addgjzbuff('" + i.slice(0, -2) + "'," + i.slice(-1) + ");";
				}
				if (reg2.test(i)) {
					str = "target.addvaluebuff([" + i[0] + "," + i[1] + "]);";
				}
				if (!res.length) res.push(str);
				else {
					if (nl) res.push(str);
					else res[res.length - 1] = res[res.length - 1] + str;
				}
			});
			return res;
		}
	}
}