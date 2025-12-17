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

window.hs_getvars = function() {
	return [lib,
		game,
		ui,
		get,
		ai,
		_status
	];
};

export class HSstring extends String {
	static nf(f, ins, ...args) { //完整的函数手术刀流程
		const s = new HSstring(f.toString());
		let str = s.#newFedit(ins);
		str = `const [lib,
			game,
			ui,
			get,
			ai,
			_status
		] = window.hs_getvars();` + str;
		args.push(str);
		return new Function(...args);
	}
	static reg(str, g) { //正则兼容
		return new RegExp(str, g)
	}
	static islike(str, regexp) { //返回str是this的子串且长度相差至多为1
		let mtc;
		if (typeof regexp == "string" && ![...".({[-]})"].some(i => regexp.includes(i))) mtc = regexp;
		else {
			const rr = HSstring.reg(regexp);
			const ob = str.match(rr);
			mtc = ob ? ob[0] : false;
		}
		return str.includes(mtc) && str.length - mtc.length < 2;
	}
	static getnear(str, regexp) { //是否和str差不多，如果是，返回str
		const rr = HSstring.reg(regexp);
		if (HSstring.islike(str, rr)) return str.match(rr);
		else return false;
	}
	static matches(str, begin, middle, end) { //匹配内容
		if (middle) {
			if (end) return str.match(HSstring.reg(begin + middle + end))[0].slice(begin.length, -end.length);
			else return str.match(HSstring.reg(begin + middle))[0].slice(begin.length);
		} else return str.match(HSstring.reg(begin));
	}
	like(regexp) {
		return HSstring.islike(this, regexp);
	}
	near(regexp) {
		return HSstring.getnear(this, regexp);
	}
	mth(regexp, str1, str2) {
		return HSstring.matches(this, regexp, str1, str2);
	}
	#newFedit(ins) { //函数手术刀
		let CAFstr = this.slice(this.indexOf("{") + 1).slice(0, -1);
		return ins(CAFstr);
	}
}

export class HSarray extends Array {
	static es(arr, func) {
		return arr.map(i => func(i)).includes(true);
	}
	eachsome(func) {
		return HSarray.es(this, func);
	}
}

class HSaliveobj extends lib.element.Player { //英雄、随从、武器、奥秘
	hs_calcv(pure) { //计算攻守 可以为负数,实操
		var atk = this.baseATK;
		var hp = this.baseHP;
		var maxHp = this.baseHP;
		var dm = this.hs_dm;
		this.buff.filter(i => i.iswork() && i.type == "value").forEach(i => {
			var val = i.value;
			if (typeof val == "function") val = val(this, atk, hp);
			if (i.subtype == "final") {
				if (val[0] != 0) atk = val[0];
				if (i.subtype2 == "reverse" || val[1] != 0) {
					maxHp = val[1];
					hp = val[1];
				}
			} else {
				atk += val[0];
				maxHp += val[1];
				hp += val[1];
			}
		});
		var auras = this.sctp("field").reduce((x, y) => x.concat(y.buff.filter(i => i.ghwork("value", this, [null, y, this]))), []);
		auras.sort(lib.sort.attendseq);
		auras.forEach(i => {
			var val = i.value;
			if (typeof val == "function") val = val(this, atk, hp);
			if (i.subtype == "final") {
				if (val[0] != 0) atk = val[0];
			} else {
				atk += val[0];
				maxHp += val[1];
				hp += val[1];
			}
		});
		hp -= dm;
		if (!pure) atk = Math.max(0, atk);
		return [atk, hp, maxHp];
	}
	hs_calcad() { //计算身材
		if (!this.isMin()) {
			if (this.data_weapon) {
				if (this.data_weapon.kaiqiao) this.baseATK = this.data_weapon.ATK;
				else this.baseATK = 0;
			} else this.baseATK = 0;
		}
		var atk = this.baseATK;
		var hp = this.baseHP;
		var maxHp = this.baseHP;
		hp -= this.hs_dm;
		get.HSA("canchenmo").forEach(i => {
			if (this.classList.contains(i) != this.hasgjz(i)) this.classList.toggle(i);
		});
		if (this.classList.contains("superfengnu")) this.classList.add("fengnu");
		get.HSA("canchenmozt").forEach(i => {
			if (this[i] != this.buff.some(y => y.iswork() && y.type == "status" && y.value.includes(i))) this[i] = !this[i];
		});
		this.HSF("uptris");
		this.hs_atk_max = this.hasgjz("superfengnu") ? 4 : (this.hasgjz("fengnu") ? 2 : 1);
		var o = this.hs_calcv(false);
		this.ATK = o[0];
		this.hp = o[1];
		this.maxHp = o[2];
	}
	updatehsfl(hpcg) { //更新身材
		if (_status.hs_noupdate) {
			this.ATK = parseInt(this.node.atk.innerHTML);
			this.hp = parseInt(this.node.hp.innerHTML);
			return;
		}
		var ratk = this.ATK,
			rhp = this.hp;
		lib.hearthstone.upF.apply(this);
		hpcg = hpcg || 0;
		this.hs_dm -= hpcg;
		this.hs_dm = Math.max(0, this.hs_dm);
		this.hs_calcad();
		var co = this.node.atk;
		var hp = this.node.hp;
		if (this.isMin() || this.ATK > 0) co.innerHTML = this.ATK;
		else this.hideatkdiv = true;
		hp.innerHTML = this.hp;
		this.hs_judge();
		var f = function(t, a, b) {
			var cls = ["hs_smaller", "hs_larger"];
			if (a == b) {
				if (t.classList.contains("hs_atk")) cls.forEach(i => {
					t.classList.remove(i)
				});
				else {
					var base = t.parentNode.baseHP;
					if (b <= base) cls.forEach(i => {
						t.classList.remove(i)
					});
					else {
						t.classList.add("hs_larger");
						t.classList.remove("hs_smaller");
					}
				}
			} else if (a > b) {
				t.classList.add("hs_larger");
				t.classList.remove("hs_smaller");
			} else {
				if (t.classList.contains("hs_atk")) {
					t.classList.remove("hs_larger");
				} else {
					t.classList.add("hs_smaller");
					t.classList.remove("hs_larger");
				}
			}
		}
		if (!this.hideatkdiv) f(co, this.ATK, this.baseATK);
		f(hp, this.hp, this.maxHp);
		if (!this.hideatkdiv && this.ATK != ratk) co.addTempClass("hs_start");
		if (this.hp != rhp) hp.addTempClass("hs_start");
		delete this.hideatkdiv;
		if (this.hujia) {
			var div = this.querySelector(".overflowmark");
			div.innerHTML = this.hujia;
		}
		get.HSF("checkcanatk");
		if (!this.isMin()) {
			if (this.ATK == 0) this.node.atk.hide();
			else this.node.atk.show();
		}
	}
	hs_judge(key) { //判断随从扳机类型
		if (!key)["guanghuan", "legend", "banji", "wangyu", "jili"].forEach(i => this.hs_judge(i));
		else {
			var bo = false;
			if (key == "guanghuan") {
				bo = this.buff.some(i => i.type == "auras");
				if (bo != this.classList.contains("guanghuan")) this.classList.toggle("guanghuan");
			}
			if (key == "legend") {
				var info = get.info({
					name: this.name + "_monster"
				});
				bo = info != undefined && info.hs_legend != undefined;
				if (bo != this.classList.contains("hs_legend")) this.classList.toggle("hs_legend");
			} else if (key == "banji") {
				var tri = this.triggers;
				for (let i in tri) {
					if (["battleRoal", "deathRattle", "jili"].includes(i)) continue;
					if (tri[i]) {
						var col = Array.isArray(tri[i]) ? tri[i] : [tri[i]];
						bo = col.some(y => {
							if (["冻结", "剧毒", "吸血"].includes(y.alias)) return false;
							else if (y.charlotte || y.direct) return false;
							return true;
						});
						if (bo) break;
					}
				}
				if (bo != this.classList.contains("banji")) this.classList.toggle("banji");
			} else if (key == "wangyu") {
				bo = this.triggers.deathRattle != undefined;
				if (bo != this.classList.contains("wangyu")) this.classList.toggle("wangyu");
			} else if (key == "jili") {
				bo = this.triggers.jili != undefined;
				if (bo != this.classList.contains("jili")) this.classList.toggle("jili");
			}
			return bo;
		}
	}
}

export class HSleader extends HSaliveobj {
	static create(current) {
		Object.setPrototypeOf(current, HSleader.prototype);
		ui.create.div(".hs_dj", current);
		ui.create.div(".hs_my", current);
		ui.create.div(".hs_fn", current);
		current.hs_state = { //全局记录
			hrsk: 0, //使用英雄技能次数
			atks: 0, //本回合攻击次数
			useCard: 0, //本回合使用牌数
		};
		current.ATK = 0;
		current.baseATK = 0;
		current.baseHP = current.hp;
		//非牌面属性
		current.dataset.enemy = current == game.me ? "0" : "1";
		current.update = current.updatehsfl;
		current.nodying = true;
		current.hs_weapons = [];
		current.buff = [];
		current.triggers = {};
		current.actcharacterlist = [];
		current.hs_dm = 0; //伤害标记数量
		current.hs_atk_max = 1; //最大攻击次数
		current.hs_attacked = 0; //攻击过次数
		current.hs_ex_atk = 0; //额外攻击次数
		current.storage.hs_mana_limit = 10; //最大法力水晶
		current.storage.hs_mana_used = 0; //已用法力水晶
		current.storage.hs_mana_max = 0; //法力水晶上限
		current.storage.hs_mana_temp = 0; //临时法力水晶
		current.storage.hs_mana_locked = 0; //本回合过载法力水晶
		current.storage.hs_mana_owed = 0; //下回合过载法力水晶
		//非牌面属性结束
		current.listen(get.HSA("clickatk"));
		current.addSkill(["hs_battlephase", "hs_summonlimit"]);
		return current;
	}
	dginit() { //初始化directgain函数
		if (this._hsdirectgain && this._hsdirectgain.toString().length > 20) return;
		const ins = str => str.replace("insertBefore", "appendChild");
		this._hsdirectgain = HSstring.nf(lib.element.player.directgain, ins, "cards", "broadcast", "gaintag");
	}
	directgain(...args) {
		this.dginit();
		this._hsdirectgain(...args);
	}
	popup() {}
	draw(...args) {
		this.hs_drawDeck(...args);
	}
	useCard() {
		var next = get.HSF("xvlie", ["hs_usexl"]);
		next.args = Array.from(arguments);
		next.player = this;
		for (let i = 0; i < arguments.length; i++) {
			if (get.hstype(arguments[i]) == 'cards') next.cards = arguments[i].slice(0);
			else if (get.hstype(arguments[i]) == 'players') next.targets = arguments[i];
			else if (get.hstype(arguments[i]) == 'player') next.targets = [arguments[i]];
			else if (get.hstype(arguments[i]) == 'card') next.card = arguments[i];
			else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].name) next.card = arguments[i];
			else if (typeof arguments[i] == 'boolean') next.addCount = arguments[i];
		}
		if (next.cards == undefined) {
			if (get.hstype(next.card) == 'card') next.cards = [next.card];
			else next.cards = [];
		} else if (next.card == undefined) {
			if (next.cards) next.card = next.cards[0];
		}
		if (next.targets && !next.target) next.target = next.targets[0];
		if (get.type(next.card) == "HS_minor") next.setContent('hs_use_minor');
		else if (get.type(next.card) == "HS_spell") next.setContent('hs_use_spell');
		else if (get.type(next.card) == "HS_weapon") next.setContent('hs_use_weapon');
		return next;
	}
	changeHujia(num) {
		const next = game.createEvent("hs_changeHujia");
		next.player = this;
		next.num = num;
		next.setContent(function() {
			"step 0"
			lib.hearthstone.chhF.call(player, num);
			"step 1"
			get.HSF("event", ["changeHujia", {
				player: player,
				num: num,
			}]);
		});
		return next;
	}
}

export class HSfellow extends HSaliveobj {
	static fellowname = cardname => cardname.slice(0, cardname.indexOf('_monster'));
	static cardname = fellowname => fellowname + "_monster";
	static create(leader, pos, cards, type) {
		leader.hs_place(pos);
		const name = HSfellow.fellowname(cards[0].name);
		const fellow = game.addFellow(pos, name);
		Object.setPrototypeOf(fellow, HSfellow.prototype);
		fellow.side = leader.side;
		fellow.hs_FL(cards, type);
		return fellow;
	}
	hs_FL(cards, type) { //随从召唤出来进行初始化
		get.HSA("canchenmo").concat(get.HSA("bjcls")).forEach(i => this.classList.remove(i));
		get.HSA("canchenmozt").forEach(i => (delete this[i]));
		this.classList.remove("hs_DIYfl");
		this.linkCard = cards;
		cards[0].buff = [];
		const info = get.info({
			name: HSfellow.cardname(this.name)
		});
		this.smtp = type;
		this.ATK = info.ATK;
		this.baseATK = info.ATK;
		this.baseHP = info.HP;
		this.rkind = info.rkind;
		this.subtype = info.subtype;
		this.hs_remove = info.hs_remove;
		this.hs_token = info.hs_token;
		if (info.hs_tokened) {
			this.hs_token = true;
			this.hs_tokened = true;
		}
		if (info.hs_quetu || info.hs_tokened || info.hs_diy || this.name.indexOf("PT") > 0) this.classList.add("hs_DIYfl");
		if (info.hs_byh > 0) this.classList.add("hs_ZBYH"); //ZZADAN 异画

		if (type != "R") {
			this.listen(get.HSA("clickatk"));
			this.node.atk = ui.create.div(".hs_atk", this);
			ui.create.div(".hs_zhezhao", this); //遮罩
			ui.create.div(".hs_dragon", this); //金龙
			ui.create.div(".hs_jinu", this.node.avatar); //激怒
			ui.create.div(".hs_gh", this); //光环
			ui.create.div(".hs_bj", this); //扳机
			ui.create.div(".hs_wy", this); //亡语
			ui.create.div(".hs_jl", this); //激励
			ui.create.div(".hs_jd", this); //剧毒
			ui.create.div(".hs_xx", this); //吸血

			ui.create.div(".hs_cof", this); //冲锋
			ui.create.div(".hs_zh", this); //战吼
			ui.create.div(".hs_qx", this); //潜行
			ui.create.div(".hs_cm1", this); //沉默环(横)
			ui.create.div(".hs_cm2", this); //沉默环(纵)
			ui.create.div(".hs_dj", this); //冻结
			ui.create.div(".hs_my", this); //免疫
			ui.create.div(".hs_cf", this); //嘲讽
			ui.create.div(".hs_sd", this); //圣盾
			ui.create.div(".hs_fn", this); //风怒
			ui.create.div(".hs_mm", this); //魔免
		}

		this.update = this.updatehsfl;
		//非牌面属性
		this.summoned = true; //召唤失调
		this.nodying = true;
		this.buff = [];
		this.triggers = {};
		this.hs_dm = 0; //伤害标记数量
		this.hs_atk_max = 1; //最大攻击次数
		this.hs_attacked = 0; //攻击过次数
		this.hs_ex_atk = 0; //额外攻击次数
		this.updatehsfl();
		//非牌面属性结束
		this.node.identity.hide();
		if (this.getLeader() == game.me) this.dataset.enemy = "0";
		else this.dataset.enemy = "1";
		this.getLeader().update();
	}
}

export class HSweapon extends HSaliveobj {
	static create(player, card) {
		card.buff = [];
		card.triggers = {};
		card.equiping = player;
		const mark = player == game.me ? "me" : "enemy";
		const div = ui.create.div(".hs_wp" + "." + mark + "wp", ui.arena);
		Object.setPrototypeOf(div, HSweapon.prototype);
		div.side = player.side;
		div.kaiqiao = false;
		card.divweapon = div
		div.equiping = player;
		div.name = card.name;
		div.buff = [];
		div.triggers = {};
		div.linkCard = [card];
		div.wpid = card.cardid;
		div.baseATK = get.rATK(card);
		div.baseHP = get.rHP(card);
		div.maxHp = div.baseHP;
		div.hs_dm = 0;
		ui.create.div(".hs_zh", div); //战吼
		ui.create.div(".hs_bj", div); //扳机
		ui.create.div(".hs_wy", div); //亡语
		ui.create.div(".hs_gh", div); //光环
		ui.create.div(".hs_my", div); //免疫
		div.zhezhao = ui.create.div(".hs_wp_zz", div);
		div.img = ui.create.div(".hs_wp_img", div);
		div.img.qiao1 = ui.create.div(".hs_wp_img_qiao1", div.img);
		div.img.qiao2 = ui.create.div(".hs_wp_img_qiao2", div.img);
		div.img.style.backgroundImage = `url("${basic.extensionDirectoryPath}resource/asset/card/${card.name}.jpg")`;
		div.node = {};
		div.node.atk = ui.create.div(".hs_wp_atk", div);
		div.node.atk.innerHTML = div.baseATK;
		div.node.hp = ui.create.div(".hs_wp_dr", div);
		div.node.hp.innerHTML = div.baseHP;
		div.listen(function() {
			var tht = this;
			if (!tht.kaiqiao && !tht.classList.contains("kaiqiao")) {
				tht.swt(true, true);
				tht.node.atk.show();
				setTimeout(function() {
					if (tht.HSF("alive") && !tht.kaiqiao) {
						tht.swt(false, true);
						tht.node.atk.hide();
					}
				}, 500);
			}
			get.HSF("morefocus", div.linkCard);
		});
		player.hs_weapons.add(div);
		return div;
	}
	hs_dmgrcv(num, type) {
		num = num || 1;
		type = type || "damage";
		if (type == "damage" && this.hasgjz("wpmianyi")) return;
		if (type == "recover") num = -num;
		this.hs_dm += num;
		this.hs_dm = Math.max(0, this.hs_dm);
		get.HSF("checkfellow");
	}
	swt(bo, virtual) { //切换武器开合
		if (this.classList.contains("kaiqiao") != bo) {
			this.addTempClass("doudong", 200);
			if (bo) this.classList.add("kaiqiao");
			else this.classList.remove("kaiqiao");
		}
		if (!virtual) this.kaiqiao = bo;
	}
}

export class HSsecret extends HSaliveobj {
	static create(player, card) {
		const job = get.rnature(card);
		const div = ui.create.div(".hs_secret");
		Object.setPrototypeOf(div, HSsecret.prototype);
		player.secrets.add(div);
		div.side = player.side;
		div.name = card.name;
		div.rnature = job;
		div.buff = [];
		div.triggers = {};
		div.linkCard = [card];
		div.id = card.cardid;
		div.relabuff = new HSsecreteffect(player, div);
		get.HSF("checksecret");
		return div;
	}
}

class HSsecreteffect {
	constructor(player, div) {
		const card = div.linkCard[0];
		this._args = [div, card];
		const info = get.info(card);
		for (let i in info.secret) {
			if (!div.triggers[i]) {
				if (!["deathFL"].includes(i)) div.triggers[i] = [];
			}
			for (const j in info.secret[i]) {
				this[j] = info.secret[i][j];
			}
			this.stid = div.id;
			this.secret = true;
			this.cur = player;
			this.name = card.name;
			if (!["deathFL"].includes(i)) div.triggers[i].add(this);
			else div.triggers[i] = this;
		}
	}
	blink() { //详情区闪烁
		const [div, card] = this._args;
		const player = this.cur;
		get.HSF("morefocus", [card]);
		get.HSF("event", ["secretBegin", {
			player: player,
		}]);
	}
	tuichang() { //奥秘退场
		const [div, card] = this._args;
		const player = this.cur;
		player.secrets.remove(div);
		_status.hsAttendSeq.cl([div]);
		delete div.triggers;
		get.HSF("checksecret");
	}
}