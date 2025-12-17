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
	musicItem
} from "../setting.js";
import consmd from "./cons.js";
import {
	mb,
	heroskill,
	funcs
} from "./cons.js";
import {
	constant
} from "./constant.js";
import hsget from "./hsget.js";
import {
	HSstring,
	HSarray,
	HSleader,
	HSfellow,
	HSweapon,
	HSsecret
} from "./class.js";

lib.element.HSstring = HSstring;
lib.element.HSarray = HSarray;
lib.element.HSleader = HSleader;
lib.element.HSfellow = HSfellow;
lib.element.HSweapon = HSweapon;
lib.element.HSsecret = HSsecret;

export const cons = consmd;

function hs_Music() {
	let bgm = get.config('HS_bgm');
	if (bgm == 'follow') return;
	bgm != 'random' ? _status.tempMusic = `ext:${basic.getExtensionName()}/resource/audio/bgm/${bgm}.mp3` : _status.tempMusic = Object.keys(musicItem).filter(item => item != 'random' && item != 'follow').map(item => `ext:${basic.getExtensionName()}/resource/audio/bgm/${item}.mp3`);
	game.playBackgroundMusic();
};

//将所有新东西，定义在一个JSON对象中
export const hearthstone = {
	monster: { //召唤怪兽的模板
		enable: true,
		notarget: true,
		lose: false,
	},
	//卡牌相关函数
	card: {
		cost() { //获取牌的费用
			const that = this;
			var info = get.info({
				name: that.name
			});
			if (!info) get.hs_alt(that.name + "找不到cost");
			var cost = info.cost;
			if (cost === undefined) return 0;
			var player = get.hs_owner(that);
			if (!player) return cost;
			var buffs = that.buff.filter(i => i.iswork() && i.name == "hs_cost").concat(player.sctp("field").reduce((x, y) => x.concat(y.buff.filter(i => i.ghwork("hs_cost", null, [that, y, player]))), []));
			buffs.sort(lib.sort.attendseq);
			buffs.forEach(i => {
				if (i.subtype == "final") cost = i.value;
				else {
					var vl = i.value;
					if (typeof vl == "function") vl = vl(that, cost);
					cost -= vl;
				}
			});
			if (info.changecost) cost -= info.changecost(player);
			cost = Math.max(0, cost);
			return cost;
		},
	},
	cardPack: {
		monsterRD: {},
		mode_RD: [],
		spel_RD: [],
		trap_RD: [],
		weap_RD: [],
		hero_RD: [],
		loca_RD: []
	},
	loadTrans: {
		"HS_minor": "随从",
		"HS_normal": "白板",
		"HS_effect": "效果",
		"HS_special": "特殊随从",
		"HS_spell": "法术",
		"HS_normalS": "普通法术",
		"HS_secret": "奥秘",
		"HS_auras": "光环法术",
		"HS_weapon": "武器",
		"HS_hero": "英雄",
		"HS_location": "地标"
	},
	player: { //随从相关函数
		filterFellow(func, bool) { //筛选符合条件的怪兽
			const list = [];
			if (!func) func = () => true;
			var fs = this.getFellow(bool);
			for (let i = 0; i < fs.length; i++) {
				if (func(fs[i])) list.push(fs[i]);
			}
			return list;
		},
		hasFellow(fellow, bool) { //是否有符合条件的怪兽
			if (!this.actcharacterlist) return false;
			if (get.hstype(fellow) == 'player') return this.countFellow(function(fl) {
				return fl == fellow;
			}, bool) > 0;
			if (!fellow) fellow = () => true;
			return this.countFellow(fellow, bool) > 0;
		},
		countFellow(func, bool) { //数符合条件的怪兽
			if (!func) func = () => true;
			var fs = this.getFellow(bool);
			var count = 0;
			for (let i = 0; i < fs.length; i++) {
				if (func(fs[i])) count++;
			}
			return count;
		},
		getFellow() { //获取怪兽(没有筛选条件)
			const fs = [];
			if (!this.actcharacterlist) return fs;
			for (let i = 0; i < this.actcharacterlist.length; i++) {
				if (this.actcharacterlist[i]) {
					var fl = this.actcharacterlist[i];
					fs.push(fl);
				}
			}
			return fs;
		},
		getFellowN(func) { //获取怪兽(包括自己)
			if (!func) func = () => true;
			var p = this.getLeader()
			return p.getFellow().add(p).filter(func);
		},
		getLeader() { //怪兽的控制者
			return this.side == game.me.side ? game.me : game.enemy;
		},
		getOppo() { //获取敌人
			return this == game.me ? game.enemy : game.me;
		},
		getOppo2() { //获取敌人，随从也行
			return this.getLeader().getOppo();
		},
		//死亡
		HS_die() {},
		//新增
		countHShistory(key, filter, all) { //获取计数
			filter = filter || lib.filter.all;
			const func = all ? "All" : "";
			return this["get" + func + "History"]("custom", evt => {
				return evt.name == key && filter(evt);
			}).length;
		},
		hs_copy(tocopy) { //获得一个随从的所有buff
			const target = this;
			const c = tocopy;
			for (let i of c.buff) { //i为buff
				get.HSF("copybuff", [i, target]);
			}
			const o = c.hs_calcv(true);
			if (o[0] < 0) target.baseATK = 0;
		},
		canaddsecret(card) { //可以加奥秘
			var player = this;
			if (typeof card == "string") card = {
				name: card
			};
			if (!player.secrets) return false;
			if (player.secrets.length == 5) return false;
			return !player.secrets.filter(c => c.name == card.name).length
		},
		toNTRed(pre, tmp) { //控制权转移
			if (!this.isMin()) return;
			if (!this.HSF("alive")) return;
			this.summoned = true;
			var player = this.getLeader();
			if (player == pre) return;
			var next = game.createEvent("toNTRed");
			next.fellow = this;
			next.player = player;
			next.tmp = tmp;
			next.setContent(function() {
				"step 0"
				game.delay(0.5);
				"step 1"
				var pre = player.getOppo();
				if (pre.hs_full()) {
					event.fellow.HSF("cuihui");
					event.fellow.hide();
					game.players.remove(event.fellow);
					game.dead.add(event.fellow);
					player.actcharacterlist.remove(event.fellow);
					get.HSF("arrange");
					get.HSF("updateauras", [true]);
					return;
				}
				var m = pre.countFellow();
				var n = pre == game.me ? 0 : 7;
				var pos = m + n + 2;
				pre.hs_place(pos);
				event.fellow.dataset.position = pos + "";
				event.fellow.dataset.enemy = pre.dataset.enemy;
				event.fellow.side = pre.side;

				player.actcharacterlist.remove(event.fellow);
				pre.actcharacterlist.add(event.fellow);

				get.HSF("arrange");
				if (event.tmp) {
					var obj = event.fellow.addgjzbuff("chongfeng", 1);
					obj.name = "aykl";
					obj.onremove = function(p) {
						p.toNTRed();
					};
					event.fellow.addtriggerbuff({
						info: {
							ending: {
								async effect(event, trigger, player) {
									event.fellow.removehsbuff(event.fellow.findhsbuff("aykl"));
									event.fellow.removehsbuff(event.obj.relabuff);
								},
							},
						}
					});
				}
			});
			return next;
		},
		hs_discover(func, card, nogain) { //发现
			var next = game.createEvent("hs_discover", false);
			next.fellow = this;
			next.player = this.getLeader();
			next.func = func || lib.filter.all;
			next.card = card;
			next.nogain = nogain;
			next.setContent(function() {
				"step 0"
				var cds = event.fixedres;
				if (!event.fixedres) {
					var job1 = player.group;
					var job2 = card ? get.rnature(card) : job1;
					var job;
					if (job1 != "hs_neutural") job = job1;
					else if (job2 != "hs_neutural") job = job2;
					else job = Object.keys(get.HSA("easy")).slice(0, -3).randomGet();
					var jobcards = get.hskachi("all", (ca, info) => info.rnature == job && event.func(ca, info));
					var neutral = get.hskachi("all", (ca, info) => ((!info.rnature || info.rnature == "hs_neutral") && event.func(ca, info)));
					if (card) {
						jobcards.remove(card.name);
						neutral.remove(card.name);
					}
					var len1 = jobcards.length;
					var len2 = neutral.length;
					var patio = len1 * 4 / (len1 * 4 + len2);
					var arr = [Math.random(), Math.random(), Math.random()];
					var an = arr.filter(i => i < patio).length;
					var cd1 = jobcards.randomGets(an);
					var cd2 = neutral.randomGets(3 - cd1.length);
					cds = cd1.concat(cd2);
				}
				if (get.hstype(cds) != "cards") cds = cds.map(c => get.chscard(c));
				event.cds = cds;
				var dialog = ui.create.dialog("发现：请选择一张牌获得", 'hidden');
				dialog.classList.add("faxian");
				dialog.addAuto(cds);
				player.chooseButton(dialog, true);
				"step 1"
				player.heroskill.pos.directgain(event.cds);
				if (event.nogain) event.result = result;
				else player.hs_gain(result.links);
			});
			return next;
		},
		hs_juezetrans(card) { //抉择变形
			var next = game.createEvent("hs_juezetrans", false);
			next.fellow = this;
			next.player = this.getLeader();
			next.card = card;
			next.setContent(function() {
				"step 0"
				var info = lib.skill[card.name.slice(0, -8)];
				if (!info || !info.juezetrans) event.finish();
				"step 1"
				var name1 = card.name.replace("_monster", "1jz");
				var name2 = card.name.replace("_monster", "2jz");
				var cds = [name1, name2].map(c => get.chscard(c));
				event.cds = cds;
				var dialog = ui.create.dialog("抉择：请选择一项变形", 'hidden');
				dialog.classList.add("faxian");
				dialog.addAuto(cds);
				player.chooseButton(dialog, true);
				"step 2"
				player.heroskill.pos.directgain(event.cds);
				event.fellow.HSF("convert", [result.links[0].name.slice(0, -2) + "_monster"]).noaudio = true;
			});
			return next;
		},
		hs_jueze(list, card) { //抉择机制
			var next = game.createEvent("hs_jueze", false);
			next.fellow = this;
			next.player = this.getLeader();
			next.list = list;
			next.card = card;
			next.setContent(function() {
				"step 0"
				var cds = event.list.map(c => get.chscard(c));
				event.cds = cds;
				var dialog = ui.create.dialog("抉择：请选择一项发动", 'hidden');
				dialog.classList.add("faxian");
				dialog.addAuto(cds);
				player.chooseButton(dialog, true);
				"step 1"
				player.heroskill.pos.directgain(event.cds);
				event.cd = result.links[0];
				var name = result.links[0].name;
				event.cho = name;
				event.info = lib.card[name];
				"step 2"
				if (event.info.filterTarget) {
					var fil = lib.filter.all;
					if (typeof event.info.filterTarget == "function") fil = event.info.filterTarget;
					player.chooseTarget(lib.translate[event.cho + "_info"], fil, true);
				} else event.goto(4);
				"step 3"
				event.target = result.targets[0];
				event.fellow.HSline(event.target, "green");
				"step 4"
				/*代码修改：不显示选了哪一项*/
				//get.HSF("morefocus", [event.cd]);
				event.insert(event.info.content, {
					card: card,
					fellow: event.fellow,
					player: player,
					target: event.target
				});
			});
			return next;
		},
		hs_join2(func) { //牌库置入战场
			var next = game.createEvent("hs_join2", false);
			next.player = this;
			next.func = func || lib.filter.all;
			next.setContent(function() {
				"step 0"
				if (player.hs_full()) event.finish();
				"step 1"
				if (get.hstype(event.func) == "cards") event.cd = event.func;
				else {
					var cs = player.cardPile.getCards("h", c => get.type(c) == "HS_minor" && event.func(c, get.info(c)));
					if (cs.length) {
						event.cd = [cs.randomGet()];
					} else event.finish();
				}
				"step 2"
				player.cardPile.lose(event.cd, ui.special);
				player.SSfellow(event.cd[0].name, undefined, "落地", ["复活"]);
				"step 3"
				result.target.linkCard = event.cd;
			});
			return next;
		},
		hs_join3(func) { //手牌置入战场
			var next = game.createEvent("hs_join3", false);
			next.player = this;
			next.func = func || lib.filter.all;
			next.setContent(function() {
				"step 0"
				if (player.hs_full()) event.finish();
				"step 1"
				var cs = player.getCards("h", c => get.type(c) == "HS_minor" && event.func(c, get.info(c)));
				if (cs.length) {
					event.cd = [cs.randomGet()];
				} else event.finish();
				"step 2"
				player.lose(event.cd, ui.special);
				player.SSfellow(event.cd[0].name, undefined, "落地", ["复活"]);
				"step 3"
				result.target.linkCard = event.cd;
			});
			return next;
		},
		hs_revive(cards, rvhp) { //复活随从
			var next = game.createEvent("hs_revive", false);
			next.fellow = this;
			next.player = this.getLeader();
			next.cards = cards;
			/*代码修改：可指定复活血量*/
			if (typeof rvhp == "number") next.rvhp = rvhp;
			next.setContent(function() {
				if (!cards) cards = function(p, a) {
					return a[p.playerid].randomGet();
				}
				if (typeof cards == "function") {
					cards = cards(player, _status.hs_dead_All, _status.hs_dead[player.playerid]);
				}
				if (!cards || !cards.length) {
					event.finish();
					return;
				}
				const rvhp = event.rvhp || "";
				event.fellow.SSfellow(cards, undefined, "落地", ["复活" + rvhp]);
			});
			return next;
		},
		hs_compare(callback) { //拼点
			var next = game.createEvent("hs_compare", false);
			next.player = this;
			next.target = this.getOppo();
			next.callback = callback;
			next.setContent(function() {
				"step 0"
				event.cs1 = player.cardPile.getCards("h", {
					type: "HS_minor"
				});
				event.cs2 = target.cardPile.getCards("h", {
					type: "HS_minor"
				});
				event.result = {
					bool: false
				};
				if (!event.cs1.length) event.goto(3);
				else if (!event.cs2.length) event.goto(2);
				else {
					event.c1 = event.cs1.randomGet();
					event.n1 = event.c1.cost();
					event.c2 = event.cs2.randomGet();
					event.n2 = event.c2.cost();
					player.$compare(event.c1, target, event.c2);
					setTimeout(function() {
						ui.clear();
					}, 3000);
					game.delay(2);
				}
				"step 1"
				if (event.n1 <= event.n2) event.goto(3);
				"step 2"
				event.result.bool = true;
				if (event.cs1.length) {
					get.HSF("morefocus", [event.c1]);
					if (event.callback) event.callback(player, event);
				}
				"step 3"
				player.hs_sort();
				target.hs_sort();
			});
			return next;
		},
		hs_cuihuisecret(secrets) { //摧毁奥秘
			if (!this.secrets.length) return;
			var next = game.createEvent("hs_cuihuisecret", false);
			next.player = this;
			next.secrets = secrets || this.secrets;
			next.setContent(function() {
				"step 0"
				event.inum = event.secrets.length;
				event.i = 0;
				"step 1"
				event.div = event.secrets.shift();
				event.div.relabuff.tuichang();
				event.cards = event.div.linkCard;
				player.$throw(event.cards);
				"step 2"
				game.log(player, "的", event.cards, "被摧毁了！");
				player.heroskill.pos.directgain(event.cards);
				game.delay();
				"step 3"
				event.i++;
				if (event.i < event.inum && event.secrets.length) event.goto(1);
				"step 4"
				ui.clear();
			});
			return next;
		},
		hs_ntrsecret(secrets) { //夺取奥秘
			var next = game.createEvent("hs_ntrsecret", false);
			next.player = this;
			next.secrets = secrets || this.getOppo().secrets;
			next.setContent(function() {
				"step 0"
				event.inum = event.secrets.length;
				event.i = 0;
				"step 1"
				event.div = event.secrets.shift();
				if (!player.secrets.includes(event.div)) {
					if (player.getOppo().secrets.includes(event.div)) {
						if (player.canaddsecret(event.div)) {
							player.getOppo().secrets.remove(event.div);
							player.secrets.add(event.div);
							get.HSF("checksecret");
						} else {
							player.getOppo().hs_cuihuisecret([event.div]);
							event.goto(3);
						}
					} else event.goto(3);
				} else event.goto(3);
				"step 2"
				if (!player.secretbd.classList.contains("active")) {
					player.secretbd.addTempClass("active", 3000);
				}
				game.delay();
				"step 3"
				event.i++;
				if (event.i < event.inum && event.secrets.length) event.goto(1);
				"step 4"
				ui.clear();
			});
			return next;
		},
		hs_shaohui(num) { //烧毁牌库
			if (num === undefined) num = 1;
			num = Math.max(0, num);
			if (num == 0) return;
			const that = this;
			var deck = that.cardPile;
			if (deck.countCards("h")) {
				var next = game.createEvent("hs_shaohui", false);
				next.player = that;
				next.deck = deck;
				next.deck2 = that.discardPile;
				next.num = num;
				next.setContent(function() {
					"step 0"
					event.i = 0;
					"step 1"
					event.cards = event.deck.getCards("h").slice(0, 1);
					event.deck2.$throw(event.cards);
					"step 2"
					game.log(player, "的", event.cards, "被摧毁了！");
					player.heroskill.pos.directgain(event.cards);
					game.delay(0.5);
					"step 3"
					event.i++;
					if (event.i < event.num && event.deck.countCards("h")) event.goto(1);
					"step 4"
					ui.clear();
				});
				return next;
			}
		},
		hs_rcdh(pos, left, dh, anm2, dft) { //入场动画
			var fellow = this;
			var p = fellow.getLeader();
			var anm = dh;
			fellow.hide();
			var dcfs = { //
				飞入: (function() {
					var init = 653; //中间随从的左边
					var width = 108; //随从间距
					var m = p.countFellow();
					var n = p == game.me ? 0 : 7;
					return "translateY(-450px) translateX(" + (800 + (m - (pos - n - 1)) * width) + "px)";
				})(),
				降落: "translateY(-450px)",
				报告: "translateX(700px)",
				火车王: "translateX(700px)",
				冒出: ["perspective(10px) translateZ(-100px)", "perspective(100px) translateZ(10px)"],
				呼出: (function() {
					return "translateX(" + (left ? "" : "-") + "100px) scale(0.4)";
				})(),
				落地: "perspective(100px) translateY(-20px) translateZ(50px)",
				旋落: "perspective(100px) translateZ(40px) rotate(270deg)",
			};
			if (!dh) {
				if (anm2) anm = anm2;
				else {
					var ca = null;
					var al = get.HSA("anms");
					for (let i in al) {
						if (al[i].includes(get.translation(fellow.name))) {
							ca = i;
							break;
						}
					}
					if (ca) anm = ca;
					else anm = dft;
				}
			}
			var tm = get.HSA("anmstm")[anm] || 700;
			var str = dcfs[anm];
			if (typeof str == "string") str = [str, ""];
			fellow.style.transform = str[0];
			setTimeout(function() {
				fellow.show();
				fellow.style.transform = str[1];
				setTimeout(function() {
					fellow.style.transform = "";
				}, 300)
			}, get.hslegend(fellow) ? 1200 : tm);
			return [anm, tm];
		},
		hs_sort() { //牌堆洗牌
			const mode = get.HSF("cfg", ["HS_duelMode"]);
			if (mode == "testing") return;
			let that = this;
			if (that.parentNode == ui.arena) {
				that = that.getLeader();
				that.cardPile.hs_sort();
			} else {
				const ms = that.getCards("h");
				if (ms.length) {
					ms.randomSort();
					ms.forEach(i => {
						that.node.handcards1.insertBefore(i, that.node.handcards1.firstChild);
					});
				}
			}
		},
		//随机条件
		canhsdmg(ignore) { //能成为随机伤害目标
			const pre = this.HSF("alive", [ignore]);
			return pre && !(this.hp == 1 && this.aurasEffed("hs_mlnh"));
		},
		addweapon(card) { //武器显示
			return lib.element.HSweapon.create(this, card);
		},
		hs_weapon2(card) { //直接装武器
			const player = this;
			if (typeof card == "string") card = get.chscard(card);
			const div = player.addweapon(card);
			_status.hsAttendSeq.ad(card);
			div.hs_yin();
			player.data_weapon = div;
			div.classList.add("bright");
			get.HSF("checkfellow");
			div.swt(true);
			div.node.atk.show();
			player.updatehsfl();
		},
		hs_weapon(card) { //装武器
			var next = game.createEvent("hs_weapon", false);
			next.player = this;
			if (typeof card == "string") card = get.chscard(card);
			next.card = card;
			next.setContent(function() {
				"step 0"
				//摧毁旧武器
				if (player.data_weapon) get.HSF("event", ["equipBefore", {
					heroskill: event.hs_heroskill,
					player: player,
					div: player.data_weapon,
					card: player.data_weapon.linkCard[0],
				}]);
				"step 1"
				game.log(player, "装备了", card);
				if (player.data_weapon) player.data_weapon.HSF("cuihui");
				"step 2"
				event.div = player.addweapon(card);
				_status.hsAttendSeq.ad(card);
				event.div.hs_yin();
				//武器进场
				"step 3"
				game.delay();
				"step 4"
				get.HSF("event", ["equipAfter", {
					player: player,
					div: event.div,
					card: card,
				}]);
				"step 5"
				player.data_weapon = event.div;
			});
			return next;
		},
		hs_atkhj(val) { //攻击和护甲不分家
			var next = game.createEvent("hs_atkhj", false);
			next.player = this;
			if (!val) {
				get.hs_alt("hs_atkhj:参数val不能为空");
				return;
			}
			if (typeof val == "number") val = [val, 0];
			if (val.length == 1) val.push(0);
			next.val = val;
			next.setContent(function() {
				if (event.val[0] > 0) {
					var num = event.val[0];
					player.addvaluebuff(num, 1);
				}
				var num = event.val[1];
				if (num > 0) player.changeHujia(num);
			});
			return next;
		},
		hs_full() { //自己的随从满了
			return this.countFellow() >= 7;
		},
		hs_exchange2() {
			var next = game.createEvent("hs_exchange2", false);
			next.player = this;
			next.setContent(function() {
				"step 0"
				event.band2 = ui.create.div(".bright.hs_band2", ui.arena);
				event.daith2 = player.getCards("h");
				player.countCards("h", function(c) {
					ui.create.div(".hs_tih", c);
					ui.create.div(".hs_tihwz", c, "替换");
				});
				player.chooseCard("h", true, [0, Infinity], " ");
				var enemy = player.next;
				setTimeout(function() {
					var cs = enemy.getCards("h", c => c.cost() > 2);
					if (cs.length) {
						var cg = enemy.cardPile.getCards("h").randomGets(cs.length);
						enemy.cardPile.directgain(cs);
						enemy.update();
						setTimeout(function() {
							enemy.hs_sort();
							enemy.$give(get.HSF("repeat", [lib.hearthstone.enemycard, cs.length]), enemy.discardPile, false);
							setTimeout(function() {
								enemy.update();
								enemy.directgain(cg);
								enemy.discardPile.$give(get.HSF("repeat", [lib.hearthstone.enemycard, cs.length]), enemy, false);
								setTimeout(function() {
									enemy.update();
								}, 1000);
							}, 2000);
						}, 1000);
					}
				}, 2000);
				"step 1"
				if (result.bool && result.cards.length) {
					event.cs = result.cards;
					event.num = result.cards.length;
					event.i = 0;
					if (player.cardPile.getCards("h").length < event.num) {
						event.willcg = event.cs.concat(player.cardPile.getCards("h")).randomGets(event.num);
					} else event.willcg = player.cardPile.getCards("h").randomGets(event.num);
					event.daith = event.cs.map(i => event.daith2.indexOf(i)).sort();
				} else event.goto(6);
				event.band2.delete();
				"step 2"
				player.cardPile.directgain([event.cs[event.i]]);
				player.$give(event.cs[event.i], player.discardPile, false);
				event.i++;
				game.delay();
				if (event.i < event.num) event.redo();
				"step 3"
				player.hs_sort();
				event.i = 0;
				event.hs_res = event.daith2.slice(0);
				for (let i = 0; i < event.num; i++) {
					var c = game.createCard();
					c.style.display = "none";
					event.hs_res[event.daith[i]] = c;
				}
				player.node.handcards1.innerHTML = "";
				event.hs_res.forEach((i, j) => {
					player.node.handcards1.appendChild(i);
					if (event.daith.includes(j)) event.hs_res[j] = event.willcg.pop();
				});
				game.delay(2);
				"step 4"
				var pos = event.daith[event.i];
				var cs = event.hs_res[pos];
				player.cardPile.node.handcards1.removeChild(cs);
				player.node.handcards1.removeChild(player.node.handcards1.childNodes[pos]);
				player.node.handcards1.appendChild(cs);
				player.node.handcards1.insertBefore(cs, player.node.handcards1.childNodes[pos]);
				ui.updatehl();
				if (pos == 0) cs.addTempClass("start");
				player.discardPile.$give([cs], player, false);
				event.i++;
				game.delay();
				if (event.i < event.num) event.redo();
				"step 5"
				game.delay(1.5);
				"step 6"
				game.delay(1.5);
			});
			return next;
		},
		hs_place(num) { //其他随从给新增随从腾出位置
			var m = this.countFellow();
			var n = 7;
			if (m == 0 || m == n) return;
			var fls = this.getFellow().sort(lib.sort.position);
			if (!this.hasFellow(fl => parseInt(fl.dataset.position) == num)) fls.forEach((i, j) => i.dataset.position = 2 + j + (this == game.me ? 0 : n) + "");
			this.countFellow(fl => {
				var i = parseInt(fl.dataset.position);
				if (i >= num) {
					fl.dataset.position = i + 1 + "";
					if (fl.truepos) fl.truepos++;
				}
			});
		},
		//from extension.js
		hs_drawDeck2(cards, num, dft) { //定向检索
			num = num || 1;
			var cs;
			const that = this;
			if (typeof cards == "function") {
				var f = cards;
				cards = that.cardPile.getCards("h", f);
				if (cards.length < num && dft) {
					var cha = num - cards.length;
					for (let i = 0; i < cha; i++) {
						cards.add(get.chscard(dft));
					}
				} else cards = cards.randomGets(num);
			}
			if (!cards.length) return;
			cs = cards.map(i => [i]);
			cs.forEach(i => {
				that.hs_drawDeck(i);
			});
		},
		hs_drawDeck() { //抽牌
			if (this.isMin()) return;
			var next = game.createEvent('hs_drawDeck', false);
			next.player = this;
			for (let i = 0; i < arguments.length; i++) {
				var g = arguments[i];
				if (typeof g == "number") {
					if (g > 0) next.num = g;
					else {
						_status.event.next.remove(next);
						return;
					}
				} else if (typeof g == "boolean") next.log = g;
				else if (get.hstype(arguments[i]) == "cards") next.cards = arguments[i];
				else if (typeof g == "string") {
					if (g == "notrigger") next.notrigger = true;
				}
			}
			if (next.num === undefined) next.num = 1;
			if (next.log === undefined) next.log = true;
			next._args = Array.from(arguments);
			next.setContent(function() { //抽卡
				"step 0"
				event.i = 0;
				event.a = 0;
				event.remv = [];
				"step 1"
				if (event.炸服(evt => evt.i >= 40)) return;
				var deck = player.cardPile;
				var deck2 = player.discardPile;
				if (!event.cards) {
					event.cards = [];
					if (deck.countCards("h")) event.cards = deck.getCards("h").slice(0, 1);
				}
				event.i++;
				event.deck = deck;
				event.deck2 = deck2;
				if (event.cards.length && !event.notrigger) {
					var card = event.cards[0];
					var info = get.info(card);
					if (info.onhsdraw) {
						if (event.log) game.log(player, "从", event.deck, "获得了", card);
						event.remv.add(card);
						card.HSF("morefocus");
						event.insert(info.onhsdraw, {
							player: player,
							card: card,
						});
						game.delay();
						player.heroskill.pos.directgain(event.cards);
						player.hs_drawDeck();
					}
				}
				"step 2"
				get.HSF("checkdeck");
				if (!player.HSF("alive") && event.i >= event.num) event.finish();
				else {
					event.pre = event.a;
					if (event.cards.length) {
						if (!event.remv.includes(event.cards[0])) {
							if (player.countCards('h') < player.getHandcardLimit()) {
								if (event.log) game.log(player, "从", event.deck, "获得了一张牌");
								event.a++;
								player.directgain(event.cards);
								event.deck2.$give(player == game.me ? lib.hearthstone.mecard : lib.hearthstone.enemycard, player, false);
							} else {
								event.deck2.$throw(event.cards);
								setTimeout(function() {
									ui.clear()
								}, 500);
							}
							get.HSF("checkhand");
						} else event.a++;
					} else {
						game.log(player, "#g疲劳", "！");
						player.addMark("hs_pilao", 1, false);
						player.hs_dmgrcv("damage", player.countMark("hs_pilao"), "nosource", "nocard");
						event.goto(6);
					}
				}
				"step 3"
				if (event.pre == event.a && player.countCards('h') >= player.getHandcardLimit()) {
					game.log(player, "的", event.cards, "被摧毁了！");
					player.heroskill.pos.directgain(event.cards);
					player.HSFT("手牌十张");
					game.delay(0.5);
					event.goto(6);
				}
				if (event.deck.countCards("h") <= 1) {
					if (event.deck.countCards("h") == 1) player.HSFT("牌库快空");
					else {
						player.HSFT("牌库空");
						event.deck.classList.add("hs_nocard");
					}
				}
				"step 4"
				if (event.cards.length) {
					if (player.getStat().gain == undefined) player.getStat().gain = 1;
					else player.getStat().gain++;
					event.result = {
						cards: event.cards
					};
					if (!event.notrigger) {
						var card = event.cards[0];
						var info = get.info(card);
						if (info.addhand) {
							if (event.log) game.log(player, "从", event.deck, "获得了", card);
							card.HSF("morefocus");
							get.HSF("Aud", [card, "trigger"]);
							event.insert(info.addhand, {
								player: player,
								card: card
							});
						}
						get.HSF("event", ["drawAfter", {
							player: player,
							card: card,
							hs_heroskill: event.hs_heroskill,
						}]);
					}
				}
				"step 5"
				game.delay();
				"step 6"
				if (event.onbuff && event.cards?.length > 0) event.onbuff(event.cards);
				event.result = {
					cards
				};
				if (event.i < event.num) {
					delete event.cards;
					event.goto(1);
				} else event.finish();
			});
			return next;
		},
		settlehsFL() { //给即将上场的随从安排位置
			var m = this.countFellow();
			var pos;
			if (this == game.me) {
				if (ui.hs_testfl.num <= m + 2 && !game.me.hasFellow(fl => parseInt(fl.dataset.position) == ui.hs_testfl.num)) {
					pos = ui.hs_testfl.num;
					ui.hs_testfl.num = 2;
				} else pos = get.rand(2, m + 2);
			} else {
				var n = 7;
				pos = get.rand(2, m + 2) + n;
			}
			return pos;
		},
		//攻击
		hs_attack(target) {
			var next = get.HSF("xvlie", ["hs_attackxl", {
				attacker: this,
				victim: target,
			}]);
			next.setContent(function() {
				"step 0"
				game.log(event.attacker, "对", event.victim, "发动了攻击");
				event.victim;
				event.triedeff = [];
				"step 1"
				event.curvictim = event.victim;
				"step 2"
				//攻击前事件
				get.HSF("event", ["attackBefore", {
					player: event.attacker,
					target: event.victim,
				}]);
				"step 3"
				if (event.curvictim != event.victim) {
					game.log("攻击目标改为了", event.victim);
					event.goto(1);
				} else {
					delete event.triedeff;
					game.delay(0.5);
				}
				"step 4"
				//攻击时事件
				get.HSF("event", ["attackBegin", {
					player: event.attacker,
					target: event.victim,
				}]);
				"step 5"
				/*代码修改：插入死亡阶段*/
				//get.HSF("checkdeath");
				"step 6"
				/*代码修改：插入胜负裁定*/
				get.HSF("checkwin", [event, true]);
				"step 7"
				if (!event.attacker.HSF("alive") || !event.victim.HSF("alive")) {
					event.attackCancelled = true;
					event.attacker.classList.remove("hs_atkprepare");
					if (!event.attacker.HSF("alive")) event.goto(13);
					else event.goto(11);
				}
				"step 8"
				if (!event.quick) game.delay(0.5);
				"step 9"
				//进攻动画
				var atk = event.attacker;
				var def = event.victim;
				var res = get.HSF("attackact", [event.attacker, event.victim]);
				var a = atk.style.transform;
				var z = atk.style.zIndex;
				atk.hs_attackAct = true;
				if (atk.isMin()) atk.style.transition = "all 0.08s";
				else atk.style.transition = "all 0.14s";
				atk.style.zIndex = 99;
				atk.classList.remove("hs_atkprepare");
				var begin = 'translateY(' + res[0] + 'px) translateX(' + res[1] + 'px)';
				var end = (function(o) {
					if (o.isMin()) {
						if (game.me.hasFellow(o)) return "perspective(100px) translateY(8px) translateZ(10px) scale(0.9)";
						else return "perspective(100px) translateY(-8px) translateZ(10px) scale(0.9)";
					} else {
						if (o == game.me) return "perspective(100px) rotateX(2deg) translateY(17px) translateZ(10px)";
						else return "perspective(100px) translateY(-18px) translateZ(10px)";
					}
				})(atk);

				if (event.attacker.hasgjz("sheji")) { //射击关键词ZZADAN
					event.attacker.HSline(event.victim, "green");
					event.victim.hs_dmgrcv(event.attacker, "damage", event.attacker.ATK);
					setTimeout(function() {
						delete atk.hs_attackAct;
						atk.style.zIndex = z;
					});
					event.goto(11);
					return;
				} //射击关键词结束
				atk.style.transform = begin;
				setTimeout(function() {
					atk.style.transition = "all 0.5s";
					atk.style.transform = end;
					setTimeout(function() {
						atk.style.transform = a;
					}, 500);
				}, (atk.isMin() ? 80 : 140));
				setTimeout(function() {
					delete atk.hs_attackAct;
					atk.style.zIndex = z;
				}, 1550);
				"step 10"
				//伤害步骤
				event.attacker.hs_dmgrcvbt(event.victim);
				"step 11"
				event.attacker.hs_attacked++;
				if (!event.attacker.isMin()) event.attacker.hs_state.atks++;
				get.HSF("checkcanatk");
				"step 12"
				//攻击后事件
				if (!event.attackCancelled) get.HSF("event", ["attackEnd", {
					player: event.attacker,
					target: event.victim,
				}]);
				"step 13"
				if (!event.attacker.isMin() && event.attacker.data_weapon) {
					event.attacker.data_weapon.buff.forEach(i => {
						if (i.temptri == "attack") event.attacker.data_weapon.removehsbuff(i);
					});
					event.attacker.buff.forEach(i => {
						if (i.temptri == "attack") event.attacker.removehsbuff(i);
					});
				}
				"step 14"
				get.HSF("checkdeath");
				"step 15"
				if (event.attacker == game.me) game.delay(0.5);
			});
			return next;
		},
		//使用英雄技能
		hs_use_heroskill() { //使用英雄技能
			var h = this.heroskill;
			var next = get.HSF("xvlie", ["hs_use_heroskillxl", {
				player: this,
				skill: h.skill,
				needTarget: true,
				filterTarget: h.filterTarget,
				randomHT: h.randomHT,
				ai: h.hrskai,
				cost: h.cost,
			}]);
			if (!next.filterTarget && !next.randomHT) next.needTarget = false;
			next.setContent("hs_use_heroskill");
			return next;
		},
		hs_heroskillEffect(t, con) { //结算英雄技能
			var next = game.createEvent("hs_heroskillEffect", false);
			next.player = this;
			next.target = t;
			next.setContent(con);
			return next;
		},
		hs_yin(tm, nobuff) { //入场
			const that = this;
			var info = that.HSF("info");
			if (info && !nobuff) {
				var f = function() {
					that.subtype = "HS_effect";
					if (get.hstype(that) == "player") that.addtriggerbuff(that, undefined, that.HSF("recheck"));
					else that.addtriggerbuff(that.linkCard[0], undefined, that.HSF("recheck"));
					if (info.hs_fq) that.addFqbuff("hs_power", info.hs_fq);
					if (info.skillgh) {
						for (let i in info.skillgh) {
							that.addaurasbuff(i).subtype = "skillgh";
						}
					}
					if (info.numgh) {
						if (info.numgh.auras) {
							info.numgh.auras.forEach(i => {
								that.addaurasbuff(i);
							});
						} else that.addaurasbuff(info.numgh);
					}
					if (info.onadd) info.onadd(that);
					if (info.noattack) that.addztbuff("noattack");
					if (info.jinu) {
						that.addjinubuff(info.jinu);
					}
					var yin = get.HSAT("yineng");
					for (let i in yin) {
						if (info[i]) that.addgjzbuff(i);
					}
				};
				f();
				if (info.chongfeng) setTimeout(function() {
					if (that.HSF("alive")) that.addTempClass("chongfeng2");
				}, (tm || 0) + 600) + (get.hslegend(that) ? 500 : 0);
			}
			if (that.buff.length > 0) that.hs_judge();
			get.HSF("updateauras", [that.swt]);
		},
		hasAuras(name) { //己方单位有光环
			const that = this;
			if (that.isMin()) return that.hasAuras2(name);
			return that.sctp("myside", i => i.hasAuras2(name));
		},
		hasAuras2(name) { //计算一个单位是否有光环
			const that = this;
			return that.buff.some(m => {
				if (m.iswork() && m.name == name && m.type == "auras") {
					if (that.HSF("alive")) return true;
					else return m.subtype != "skillgh";
				}
			});
		},
		aurasEffed(name, args) { //受到光环影响
			const that = this;
			var auras = [];
			if (!args) {
				auras = that.sctp("field").reduce((x, y) => x.concat(y.buff.filter(i => i.ghwork(name, that, [null, y, that]))), []);
			} else auras = that.sctp("field").reduce((x, y) => x.concat(y.buff.filter(i => i.ghwork(name, that, args))), []);
			return auras.length;
		},
		countFq() { //获取法强
			const that = this;
			var cost = 0;
			var buffs = that.sctp("myside").reduce((x, y) => x.concat(y.buff.filter(i => i.iswork() && i.type == "hs_power")), []).concat(that.sctp("field").reduce((x, y) => x.concat(y.buff.filter(i => i.ghwork("hs_power", null, [null, y, that]))), []));
			buffs.sort(lib.sort.attendseq);
			buffs.forEach(i => {
				cost += i.value;
			});
			return cost;
		},
		hs_silence() { //沉默
			const that = this;
			that.buff.forEach(i => {
				if (i.onremove) i.onremove(that);
			});
			that.buff = [];
			var num = that.maxHp - that.baseHP;
			that.maxHp = that.baseHP;
			that.hs_dm -= num;
			that.hs_dm = Math.max(0, that.hs_dm);
			that.triggers = {};
			that.addgjzbuff("chenmo");
		},
		hs_reverse() { //交换攻击力和血量
			var arr = [this.hp, this.ATK];
			this.addvaluefinal(arr, true);
		},
		//buff相关
		addhsbuff(obj) { //加buff
			if (!obj) return null;
			const that = this;
			if (Array.isArray(obj)) this.buff.addArray(obj);
			else {
				if (obj.uniquebuff && this.buff.some(b => b.uniquename == obj.uniquename)) return;
				obj.creator = obj.creator || that;
				obj.fellow = obj.fellow || that;
				obj.iswork = function() {
					if (this.countphase) {
						if (this.temp % 1 == 0) {
							if (this.countphase != _status.currentPhase) return false;
						}
					}
					if (this.type == "trigger") return true;
					var f = this.fellow;
					return !this.sleep && (!this.filter || this.filter(f.getLeader(), f));
				};
				obj.inrange = function(tg) {
					var f = this.fellow;
					if (tg && tg.swt) {
						if (!this.wpal) return false;
					}
					return !this.range || this.range(f, tg);
				};
				obj.ghwork = function(name, target, args) {
					return this.type == "auras" && this.name == name && this.iswork() && this.inrange(target) && (!this.ghfilter || this.ghfilter.apply(this, args));
				};
				obj.stid = get.id();
				_status.hsAttendSeq.ad(obj);
				this.buff.add(obj);
			}
		},
		addturnbuff(name, value, fil, num, limit) { //你的下一张xx法力值消耗减少（y）点
			const that = this;
			if (name == "hs_cost") return that.addcostbuff(value, fil, num);
			if (value !== 0) value = value || 1;
			fil = fil || lib.filter.all;
			num = num || 1;
			limit = limit || 1;
			var obj = {
				name: name,
				type: "auras",
				type2: "cost",
				value: value,
				fil: fil,
				used: false,
				limit: limit,
				temp: num,
				countphase: that,
				ghfilter(card, fellow, target) {
					return this.used === false && target == fellow.getLeader() && this.fil(card, target);
				},
			};
			that.addhsbuff(obj);
			return obj;
		},
		addcostbuff(value, fil, num, limit) { //添加次数减费光环
			const that = this;
			if (value !== 0) value = value || 1;
			fil = fil || lib.filter.all;
			num = num || 1;
			limit = limit || 1;
			var obj = {
				name: "hs_cost",
				type: "auras",
				type2: "cost",
				value: value,
				fil: fil,
				used: false,
				limit: limit,
				temp: num,
				countphase: that,
				ghfilter(card, fellow, target) {
					return this.used === false && target == fellow.getLeader() && this.fil(card, target);
				},
			};
			that.addhsbuff(obj);
			return obj;
		},
		addautovaluebuff(value, tg) { //加自动取名的身材buff
			const that = this;
			if (typeof value == "number") value = [value, 0];
			var obj = {
				type: "value",
				value: value,
			};
			if (typeof tg == "string") obj.uniquename = tg;
			else obj.uniquename = tg.name;
			that.addhsbuff(obj);
			setTimeout(function() {
				if (obj.iswork() && value[0] > 0 && value[1] == 0 && !that.classList.contains("jinu")) that.addTempClass("kuangbao", 700);
			}, 100);
			return obj;
		},
		addvaluefinal(value, bo) { //身材变成固定值
			const that = this;
			if (typeof value == "number") value = [value, 0];
			var obj = {
				type: "value",
				subtype: "final",
				subtype2: bo ? "reverse" : "",
				value: value,
			};
			that.addhsbuff(obj);
			if (bo || value[1] != 0) that.hs_dm = 0;
			that.updatehsfl();
			return obj;
		},
		addvaluebuff(value, num, name, uniquename) { //加身材buff
			const that = this;
			if (typeof value == "number") value = [value, 0];
			var obj = {
				type: "value",
				value: value,
				temp: num,
			};
			obj.name = name;
			if (uniquename) obj.uniquename = uniquename;
			else if (obj.name) obj.uniquename = obj.name;
			that.addhsbuff(obj);
			setTimeout(function() {
				if (obj.iswork() && value[0] > 0 && value[1] == 0 && !that.classList.contains("jinu")) that.addTempClass("kuangbao", 700);
			}, 100);
			return obj;
		},
		addgjzbuff(word, num) { //加关键字buff
			const that = this;
			let obj = {};
			if (typeof word == "string") {
				if (["dongjie", "jvdu", "xixie"].includes(word)) {
					obj = ({
						sc: true,
					});
					if (word != "xixie") obj.alias = get.HSAT("yineng")[word];
					if (word == "jvdu") {
						obj.filter = function(evt) {
							return evt.player.isMin();
						};
						obj.effect = function() {
							get.HSF("cuihui", [event.evt.player]);
						};
					} else if (word == "xixie") {
						obj.later = 1;
						obj.filter = function(evt) {
							return !evt.card;
						};
						obj.effect = function() {
							player.hs_dmgrcv("recover", event.evt.num, event.fellow);
						};
					} else {
						obj.effect = function() {
							event.evt.player.addgjzbuff("dongjied");
						};
					}
					that.addtriggerbuff({
						info: {
							hsdmg: obj
						}
					});
				} else if (word == "kuangfu") {
					obj = ({
						fl: true,
						filter(evt, p, f) {
							return evt.target.isMin();
						},
						async effect(event, trigger, player) {
							var tgs = event.evt.target.sctp("neighbor_");
							if (tgs.length) player.hs_dmgrcvaoe("damage", event.fellow, tgs, event.fellow.ATK);
						},
					});
					that.addtriggerbuff({
						info: {
							attackEnd: obj
						}
					});
				} else if (word == "jianwang") {
					obj = ({
						half: true,
						fl: true,
						filter(evt, p, f) {
							return evt.player.sctp("opposide").length >= 2;
						},
						async effect(event, trigger, player) {
							const ntg = event.evt.player.sctp("opposide").filter(i => i != event.evt.target).randomGet();
							event.orievt.victim = ntg;
							event.orievt.triedeff.add(event.obj);
						},
					});
					that.addtriggerbuff({
						info: {
							attackBefore: obj
						}
					});
				}
				word = [word];
			}
			const bo = that.smtp == "S";
			const obj2 = {
				type: "ability",
				value: word,
				temp: num,
			};
			that.addhsbuff(obj2);
			setTimeout(function() {
				if (that.smtp == "S" && that.HSF("alive")) {
					that.updatehsfl();
					delete that.smtp;
				}
			}, bo ? 1800 : 1000);
			return obj2;
		},
		addztbuff(zt, num) { //加状态buff
			const that = this;
			if (typeof zt == "string") zt = [zt];
			const obj = {
				type: "status",
				value: zt,
				temp: num,
			};
			that.addhsbuff(obj);
			return obj;
		},
		addtriggerbuff(card, num, recheck) { //加扳机buff
			const that = this;
			var info = null;
			if (card && card.info) {
				info = card.info;
				card = card.creator || that;
			}
			var obj = {
				type: "trigger",
				value: [],
				player: get.player(),
				creator: card,
				fellow: that,
				temp: num,
			};
			let origin = false;
			if (!info) {
				if (get.hstype(card) == "card") info = card.HSF("info");
				else if (get.hstype(card) == "player") {
					info = lib.skill[card.name];
					origin = true;
				} else get.hs_alt("addtriggerbuff:info不存在");
			}
			get.HSA("triggers").forEach(i => {
				if (info[i]) {
					var item = typeof info[i] == "function" ? {
						effect: info[i]
					} : get.copy(info[i]);
					item.triname = i;
					if (origin && i == "deathRattle") item.origin = true;
					item.anm = info.anm;
					item.creator = card;
					item.fellow = that;
					item.relabuff = obj;
					if (!["battleRoal", "jili", "deathFL", "discarded"].includes(i)) {
						if (!that.triggers[i]) that.triggers[i] = [];
						that.triggers[i].add(item);
					} else that.triggers[i] = item;
					obj.value.add(item);
					if (item.recheck === undefined && recheck) item.recheck = "filter";
				}
			});
			if (obj.value.length) that.addhsbuff(obj);
			return obj;
		},
		addaurasbuff(name, f, num) { //加光环buff
			const that = this;
			var obj = {};
			if (typeof name == "string") obj.name = name;
			else obj = get.copy(name);
			if (f) obj.value = f;
			if (num) obj.temp = num;
			obj.type = "auras";
			obj.sleep = true;
			obj.creator = that;
			obj.fellow = that;
			obj.leader = that.getLeader();
			if (!obj.range) obj.range = "mine_";
			if (typeof obj.range == "string") obj.range = get.HSA("funcs")[obj.range];
			that.addhsbuff(obj);
			return obj;
		},
		addFqbuff(name, f, num) { //加法强buff(其他buff)
			const that = this;
			var obj = {
				name: name,
				type: name,
				value: f,
				temp: num,
				creator: that,
				fellow: that,
				leader: that.getLeader(),
			};
			that.addhsbuff(obj);
			return obj;
		},
		addjinubuff(obj) { //加激怒buff
			const that = this;
			var f = function(p, f) {
				return f.isDamaged();
			};
			var o = this.addgjzbuff("jinu");
			o.filter = f;
			if (obj.value) {
				var a = that.addvaluebuff(obj.value);
				a.filter = f;
			}
			if (obj.ability) {
				var b = that.addgjzbuff(obj.ability);
				b.filter = f;
			}
		},
		addwpbuff() { //添加武器buff
			const that = this;
			var wp = that.data_weapon,
				vbuff, gbuff;
			for (let i = 0; i < arguments.length; i++) {
				if (typeof arguments[i] == "number") vbuff = arguments[i];
				else if (typeof arguments[i] == "string") gbuff = arguments[i];
				else if (Array.isArray(arguments[i])) vbuff = arguments[i];
				else if (arguments[i] && arguments[i].classList) {
					if (arguments[i].classList.contains("hs_wp")) wp = arguments[i];
				}
			}
			if (vbuff) wp.addvaluebuff(vbuff);
			if (gbuff) wp.addgjzbuff(gbuff);
		},
		findhsbuff(name) { //根据名字寻找buff
			if (!name) return null;
			for (let i = 0; i < this.buff.length; i++) {
				var j = this.buff[i];
				if (j.name == name) return j;
			}
			return null;
		},
		removehsbuff(obj) { //移除buff
			const that = this;
			if (Array.isArray(obj)) {
				obj.forEach(i => that.removehsbuff(i));
				return;
			}
			if (obj.type == "value" && obj.value) {
				if (obj.subtype != "final" && (typeof obj.value != "function") && obj.value[1] > 0) {
					var v = obj.value[1];
					that.hs_dm = Math.max(0, that.hs_dm - v);
				}
			}
			if (obj.name == "value" && obj.type == "auras" && obj.value) {
				if (obj.subtype != "final" && (typeof obj.value != "function") && obj.value[1] > 0) {
					var v = obj.value[1];
					game.filterPlayer(p => obj.range(that, p)).forEach(p => {
						p.hs_dm = Math.max(0, p.hs_dm - v);
					});
				}
			}
			if (obj.type == "trigger") {
				var tris = get.HSA("triggers");
				tris.forEach(i => {
					var tr = that.triggers[i];
					if (tr && tr.length) {
						tr.removeArray(obj.value);
					}
				});
			}
			if (obj.onremove) obj.onremove(that);
			that.buff.remove(obj);
		},
		updateSelfBuff(value, temp) { //更新随从牌面的buff
			if (typeof value == "number") value = [value, 0];
			var p = this;
			var id = p.playerid;
			var name = p.name + "_" + id;
			var obj = p.buff.findLast(i => i.name == name);
			if (!obj || p.buff.slice(p.buff.indexOf(obj) + 1).filter(i => i.type == "value").length) {
				p.addvaluebuff(value, temp, name);
				get.HSF("checkfellow");
			} else {
				if (obj.tvalue == undefined) obj.tvalue = get.copy(obj.value);
				obj.tvalue[0] += value[0];
				obj.tvalue[1] += value[1];
				setTimeout(function() {
					if (obj.iswork() && value[0] > 0 && value[1] == 0 && !p.classList.contains("jinu")) p.addTempClass("kuangbao", 700);
				}, 100);
			}
		},
		hasgjz(word) { //有关键字
			const that = this;
			if (Array.isArray(word)) return word.some(w => that.hasgjz(w));
			if (that.buff.some(i => i.iswork() && i.type == "ability" && i.value.includes(word))) return true;
			else {
				if (get.hstype(that) != "player") return false;
				else {
					var bo1 = that.predata_weapon && that.predata_weapon.hasgjz(word);
					var bo2 = that.data_weapon && that.data_weapon.hasgjz(word);
					return bo1 || bo2 || that.sctp("all", y => y.buff.some(i => i.name == "ability" && i.type == "auras" && i.value.includes(word) && i.ghwork("ability", that, [null, y, that])));
				}
			}
		},
		removegjz(word) { //失去关键字buff
			const that = this;
			if (Array.isArray(word)) {
				word.forEach(i => {
					that.removegjz(i);
				});
				return;
			}
			if (that.buff) {
				var bin = [];
				for (let i of that.buff) {
					if (i.type == "ability" && i.value.includes(word)) {
						i.value.remove(word);
						if (i.value.length == 0) bin.add(i);
					}
				}
				that.removehsbuff(bin);
			}
			if (get.hstype(that) == "player" && !that.isMin() && that.data_weapon) that.data_weapon.removegjz(word);
		},
		scpl(str) { //根据字符串获取角色
			if (get.hstype(str) == "player") return str;
			var full = ["self", "me", "enemy", "leader", "oppo", "fellow"];
			if (full.includes(str)) str = "SMELOF" [full.indexOf(str)];
			var obj = {
				S: this,
				M: game.me,
				E: game.enemy,
				L: this.getLeader(),
				O: this.getOppo2(),
				F: _status.event.fellow,
			};
			return obj[str] || get.player();
		},
		sctp(str, mr, filter) { //根据字符串获取角色们
			if (get.hstype(str) == "players") return str;
			var notthis;
			if (!str) str = "mr";
			if (typeof str == "string" && str.slice(-1) == "_") {
				str = str.slice(0, -1);
				notthis = true;
			}
			var full = ["minors"];
			if (full.includes(str)) str = ["mns"][full.indexOf(str)];
			var obj = {
				mns: get.HSF("minors"),
				heros: [this.getLeader(), this.getOppo2()],
				main: [get.hs_main(), get.hs_main().getOppo()],
				me: game.me.getFellowN(),
				enemy: game.enemy.getFellowN(),
				myside: this.getLeader().getFellowN(),
				opposide: this.getOppo2().getFellowN(),
				mine: this.getLeader().getFellow(),
				notmine: this.getOppo2().getFellow(),
				neighbor: this.HSF("alive", [true]) ? [this.leftseat, this.rightseat].filter(i => i) : [],
				all: game.filterPlayer(),
				field: (function() {
					var res = [];
					var ar = ["me", "enemy"];
					ar.forEach(i => {
						res.add(game[i].data_weapon);
						res.add(game[i].predata_weapon);
						if (game[i].secrets) res.addArray(game[i].secrets);
					});
					return res.filter(i => i);
				})().concat(game.filterPlayer()),
				mr: (typeof mr == "string" ? this.sctp(mr) : game.filterPlayer())
			};
			var res = obj[str] || [];
			if (notthis) res.remove(this);
			if (typeof mr == "function") {
				if (filter) return res.filter(mr);
				else return HSarray.es(res, mr);
			}
			if (get.hstype(mr) == "player") return res.includes(mr);
			return res;
		},
		//新事件函数
		hs_Missiles(num, bo, range) { //导弹效果
			var next = game.createEvent("hs_Missiles", false);
			next.player = this;
			next.num = num || 3;
			if (bo) {
				next.num += next.player.countFq();
				next.num *= next.player.HSF("countvelen");
			}
			next.ng = range;
			next.setContent(function() {
				"step 0"
				event.i = 0;
				"step 1"
				event.pls = player.sctp(event.ng, "opposide").filter(t => t.canhsdmg());
				if (event.pls.length) {
					var t = event.pls.randomGet();
					player.HSline(t, "green");
					t.hs_dmgrcv("damage", player);
					event.i++;
				} else event.goto(3);
				"step 2"
				game.delay();
				if (event.i < event.num) event.goto(1);
				"step 3"
			});
			return next;
		},
		hs_spellEffect(c, t, eff) { //魔法效果
			var next = game.createEvent("hs_spellEffect", false);
			next.card = c;
			next.cards = [c];
			next.player = this;
			next.target = t;
			next.active = eff;
			var f = get.info(c);
			if (!next.target && f.randomRT) {
				next.target = f.randomRT(this);
				if (Array.isArray(next.target)) {
					next.targets = next.target;
					next.target = next.targets[0];
				}
				next.filterStop = function() {
					if (!this.target) {
						delete this.filterStop;
						this.finish();
						this._triggered = null;
						return true;
					}
				};
			}
			if (next.target && !next.targets) next.targets = [next.target];
			if (next.target) {
				if (typeof next.target !== "boolean") {
					this.HSline(next.targets, "green");
					if (next.targets.length == 1) game.log(this, "对", (next.target == this ? "#b自己" : next.target), "使用了", c);
					else game.log(this, "对", next.targets, "使用了", c);
				}
			} else game.log(this, "使用了", c);
			next.effect = f.content || f.onhsdraw || lib.filter.all;
			next.setContent(function() {
				"step 0"
				game.delay();
				"step 1"
				event.insert(event.effect, {
					player: player,
					target: target,
					targets: targets,
					card: card,
					cards: cards,
					active: event.active,
				});
			});
			return next;
		},
		use_effect(obj) { //施放效果
			var next = game.createEvent("use_effect", false);
			for (var i in obj) {
				next[i] = obj[i];
			}
			next.setContent(function() {
				"step 0"
				event.info = get.info(card);
				if (event.info.hs_gz) {
					const num = event.info.hs_gz;
					player.addMark("hs_mana_owed", num, false);
					game.log(player, "过载了", num, "个法力水晶");
					player.HSF("updatemana");
					get.HSF("event", ["overload", {
						player: player,
						card: card,
						cards: cards,
						num: num,
					}]);
				}
				"step 1"
				event.insert(event.info.content, {
					player: player,
					target: target,
					targets: targets,
					card: card,
					cards: cards,
					active: event.active,
				});
			});
			return next;
		},
		use_secret(card) { //挂奥秘
			var next = game.createEvent("use_secret", false);
			next.player = this;
			if (typeof card == "string") card = get.chscard(card);
			next.card = card;
			next.setContent(function() {
				"step 0"
				const div = lib.element.HSsecret.create(player, card);
				_status.hsAttendSeq.ad(div);
				"step 1"
				if (!player.secretbd.classList.contains("active")) {
					player.secretbd.addTempClass("active", 3000);
				}
				game.delay();
				"step 2"
			});
			return next;
		},
		hs_battleRoal(t, f, eff) { //战吼
			/*代码修改：没写就什么都不发生*/
			if (!f.effect) return;
			let that = this;
			if (get.hstype(that) != "player") that = that.equiping;
			var next = game.createEvent("hs_battleRoal", false);
			next.fellow = this;
			next.player = that.getLeader();
			next.target = t;
			next.active = eff;
			if (!next.target && f.randomRT) {
				if (!next.target && f.randomRT) {
					next.target = f.randomRT(next.player, next);
					if (!next.target) {
						next.setContent(function() {});
						return;
					}
				}
			}
			next.effect = f.effect;
			next.setContent(function() {
				"step 0"
				game.delay(0.5);
				"step 1"
				var ch = function(p) {
					if (get.hstype(p) == "player") return p;
					return p.linkCard[0];
				};
				if (target) {
					event.fellow.HSline(target, "green");
					game.log(ch(event.fellow), "对", (target == event.fellow ? "#b自己" : ch(target)), "发动了战吼效果");
				} else game.log(ch(event.fellow), "发动了战吼效果");
				event.insert(event.effect, {
					player: player,
					fellow: event.fellow,
					target: target,
					active: event.active,
				});
			});
			return next;
		},
		hs_trisEffect(obj, evt) { //扳机效果
			/*代码修改：如果没写就什么都不发生*/
			if (!obj.effect) return;
			if (this.swt && !this.HSF("alive")) return;
			var next = game.createEvent("hs_trisEffect", false);
			next.fellow = this;
			next.player = this.getLeader();
			var cancel = false;
			if (obj.secret && (typeof obj.filter2 == "function")) {
				if (!obj.filter2(evt, next.player)) cancel = true;
			}
			if (obj.half) {
				if (Math.random() < 0.5) {
					if (evt.evt.triedeff) evt.evt.triedeff.add(obj);
					cancel = true;
				}
			}
			if (obj.randomRT) {
				next.target = obj.randomRT(next.player, evt, next.fellow);
				if (!next.target) cancel = true;
			}
			if (obj.recheck) {
				if (obj.recheck == "filter") obj.recheck = obj.filter || lib.filter.all;
				if (typeof obj.recheck == "string") {
					var arr = obj.recheck.split(",");
					if (arr.length == 1) {
						var f = get.HSA("funcs")[arr[0]];
						if (f) obj.recheck = f;
						else get.hs_alt("hs_trisEffect:", obj.recheck);
					} else {
						var fs = arr.map(i => get.HSA("funcs")[i]);
						var ff = function(e, p, f) {
							return ff.fs.every(i => i(e, p, f));
						};
						ff.fs = fs;
						obj.recheck = ff;
					}
				}
				if (!obj.recheck(evt, next.player, this, obj)) cancel = true;
			}
			if (cancel || !game.me.sctp("field", this)) {
				next.setContent(function() {});
				return next;
			}
			next.effect = obj.effect;
			next.evt = evt;
			next.anm = obj.anm;
			next.obj = obj;
			if (obj.secret) {
				next.tp = "none";
				next.issecret = true;
			} else if (obj.triname == "jili") next.tp = "hs_jl";
			else if (next.evt.name == "hsdmg") {
				if (obj.alias == "剧毒") next.tp = "hs_jd";
				else if (obj.alias == "冻结") next.tp = "none";
				else next.tp = "hs_bj";
			} else next.tp = "hs_bj";
			next.setContent(function() {
				"step 0"
				if (event.obj.charlotte || event.obj.direct) event.goto(4);
				else {
					if (event.evt.name == "summonSucc") game.delay(1.1);
					else game.delay(0.5);
				}
				"step 1"
				if ([game.me, game.me.data_weapon, game.me.predata_weapon].includes(event.fellow)) get.HSF("clickmana", [false]);
				if (target && [game.me, game.me.data_weapon, game.me.predata_weapon, game.me.heroskill].includes(target)) get.HSF("clickmana", [false]);
				if (event.tp != "none" && (event.fellow.isMin() || get.hstype(event.fellow) == "weapon")) {
					var dom = event.fellow.querySelector('.' + event.tp);
					if (!dom) get.hs_alt("no dom:", event.tp);
					dom.addTempClass('active');
				}
				get.HSF("Aud", [event.fellow, "trigger"]);
				game.delay();
				"step 2"
				var ch = function(p) {
					if (get.hstype(p) == "player") return p;
					return p.linkCard[0];
				};
				if (target) {
					if (event.issecret) {
						player.HSline(target, "green");
						game.log(player, "的奥秘", event.obj._args[1], "对", (target == player ? "#b自己" : ch(target)), "触发了");
					} else {
						event.fellow.HSline(target, "green");
						game.log(player, "的", ch(event.fellow), "对", (target == event.fellow ? "#b自己" : ch(target)), "触发了扳机");
					}
				} else {
					if (event.issecret) game.log(player, "的奥秘", event.obj._args[1], "触发了");
					else {
						if (event.fellow == player) game.log(player, "#b自己", "触发了扳机");
						else game.log(player, "的", ch(event.fellow), "触发了扳机");
					}
				}
				"step 3"
				if (event.evt.name == "summonSucc") game.delay(0.3);
				"step 4"
				const eff = {
					player: player,
					target: target,
					fellow: event.fellow,
					obj: event.obj,
					evt: event.evt,
					orievt: event.evt.evt,
					anm: event.anm,
				};
				if (event.issecret && event.obj._args && event.obj._args[1]) {
					eff.card = event.obj._args[1];
					eff.cards = [eff.card];
				}
				event.insert(event.effect, eff);
				"step 5"
				if (!event.isMine()) game.delay(0.5);
			});
			return next;
		},
		hs_deathRattle(f) { //亡语
			var next = game.createEvent("hs_deathRattle", false);
			next.fellow = this;
			next.player = this.getLeader();
			next.effects = f;
			if (!next.effects) next.effects = next.fellow.triggers.deathRattle;
			if (!next.effects) next.effects = [{
				async effect(event, trigger, player) {}
			}];
			if (next.effects.some(eff => !eff.effect)) {
				next.setContent(lib.filter.all);
				return;
			}
			next.setContent(function() {
				"step 0"
				event.effects = event.effects.filter(obj => {
					if (obj.filter) {
						if (typeof obj.filter == "string") {
							const arr = obj.filter.split(",");
							if (arr.length == 1) {
								var f = get.HSA("funcs")[arr[0]];
								if (f) obj.filter = f;
								else {
									get.hs_alt("hs_deathRattle:", obj.filter);
									return false;
								}
							} else {
								var fs = arr.map(i => get.HSA("funcs")[i]);
								var ff = function(e, p, f) {
									return ff.fs.every(i => i(e, p, f));
								};
								ff.fs = fs;
								obj.filter = ff;
							}
						}
						return obj.filter(event, player, event.fellow, obj);
					} else return true;
				});
				if (!event.effects.length) event.finish();
				"step 1"
				event.wyed = 0; //结算过亡语（全部）次数
				event.i = 0; //从第一个亡语开始结算
				event.num = (get.hstype(event.fellow) == "player" && player.hasAuras("doubledeathrattle")) ? 2 : 1;
				"step 2"
				const obj = event.effects[event.i];
				let cancel = false,
					target = null;
				if (obj.randomRT) {
					target = obj.randomRT(player, event, event.fellow);
					if (!target) cancel = true;
				}
				if (cancel) event.goto(4);
				else {
					event.eff = obj;
					event.target = target;
				}
				"step 3"
				var ch = function(p) {
					if (get.hstype(p) == "player") return p;
					return p.linkCard[0];
				};
				if (event.target) {
					if ([game.me, game.me.data_weapon, game.me.predata_weapon, game.me.heroskill].includes(event.target)) get.HSF("clickmana", [false]);
					if (event.fellow.isMin()) {
						event.fellow.HSline(event.target, "green");
						game.log(ch(event.fellow), "对", ch(event.target), "发动了亡语效果");
					} else {
						event.fellow.HSline(event.target, "green");
						game.log(ch(player), "的", ch(event.fellow), "对", ch(event.target), "发动了亡语效果");
					}
				} else {
					if (event.fellow.isMin()) game.log(ch(event.fellow), "发动了亡语效果");
					else game.log(ch(player), "的", ch(event.fellow), "发动了亡语效果");
				}
				if (event.eff.origin) get.HSF("Aud", [event.fellow, "trigger"]);
				event.insert(event.eff.effect, {
					player: player,
					fellow: event.fellow,
					target: event.target,
					efftype: "亡语",
				});
				"step 4"
				event.i++;
				get.HSF("updateauras", [true]);
				if (event.i < event.effects.length) {
					game.delay();
					event.goto(2);
				}
				"step 5"
				event.wyed++;
				if (event.wyed < event.num) {
					event.i = 0;
					game.delay();
					event.goto(2);
				}
			});
			return next;
		},
		hs_discard(num) { //弃牌
			var next = game.createEvent("hs_discard", false);
			next.player = this;
			if (num == "all") num = this.countCards("h");
			next.num = num || 1;
			next.setContent(function() {
				"step 0"
				var cs = player.getCards("h");
				if (cs.length) {
					var cards = cs.randomGets(num);
					event.cards = cards;
					game.log(player, "弃置了", cards);
					player.lose(cards, ui.special);
					player.$throw(cards);
					setTimeout(function() {
						ui.clear();
						player.discardPile.directgain(cards);
						get.HSF("checkhand");
					}, 500);
				} else event.finish();
				"step 1"
				game.delay(0.5);
				"step 2"
				var evts = [];
				event.cards.forEach(i => {
					evts.push({
						player: player,
						card: i,
					});
				});
				get.HSF("evts", ["discard", evts]);
				"step 3"
				get.HSF("updateauras", [true]);
			});
			return next;
		},
		hs_gain(cards, source, visible) { //获得牌
			if (!cards.length) return;
			var next = game.createEvent("hs_gain", false);
			next.player = this;
			next.cards = cards;
			if (typeof cards == "string" || cards.length === undefined) next.cards = [cards];
			if (cards.length == 2 && typeof cards[1] == "number") next.cards = get.HSF("repeat", [cards[0], cards[1]]);
			next.source = source;
			next.visible = visible;
			next.setContent(function() {
				"step 0"
				if (!event.result) event.result = {
					cards: []
				};
				if (player.countCards("h") < player.getHandcardLimit()) {
					var c = cards.shift();
					if (get.hstype(c) != "card") {
						c = get.chscard(c);
						c.hs_temp = true;
					}
					event.result.cards.add(c);
					player.directgain([c]);
					c.hs_creator = _status.event.fellow || player;
					if (event.visible !== false) player.$gain2(player == game.me ? c : lib.hearthstone.enemycard, event.source);
					get.HSF("checkhand");
					if (cards.length) {
						game.delay(0.1);
						event.redo();
					}
				}
			});
			return next;
		},
		hs_dmgrcv() { //伤害&&治疗
			var next = game.createEvent("hs_dmgrcv", false);
			next.player = this;
			for (let i = 0; i < arguments.length; i++) {
				if (typeof arguments[i] == "number") next.num = arguments[i];
				else if (typeof arguments[i] == "string") {
					if (arguments[i] == "sgs") next.sgs = true;
					else if (arguments[i] == "recover") next.type = "recover";
					else if (arguments[i] == "damage") next.type = "damage";
					else if (arguments[i] == "nocard") next.nocard = true;
					else if (arguments[i] == "nosource") next.nosource = true;
					else if (["ice", "fire", "thunder"].includes(arguments[i])) next.nature = arguments[i];
					else next.sctp = arguments[i];
				} else if (get.hstype(arguments[i]) == "player") next.source = arguments[i];
				else if (get.hstype(arguments[i]) == "card") next.card = arguments[i];
				else if (get.hstype(arguments[i]) == "cards") next.cards = arguments[i];
			}
			if (!next.card) {
				if (next.cards) next.card = next.cards[0];
				else next.card = _status.event.card;
			}
			if (!next.cards && next.card) next.cards = [next.card];
			if (next.nocard) {
				delete next.card;
				delete next.cards;
			}
			if (!next.source) next.source = this.scpl(next.sctp);
			if (!next.source) next.nosource = true;
			if (next.nosource) delete next.source;
			if (!next.type) next.type = "damage";
			if (next.num === undefined) next.num = 1;
			next.num = Math.max(0, next.num);
			if (next.sgs) next.num *= 10;
			next.setContent("hs_dmgrcv");
			return next;
		},
		hs_dmgrcvbt(tg) { //战斗伤害
			var p = this;
			var evts = [];
			if (p.ATK) evts.add({
				source: p,
				player: tg,
				num: p.ATK
			});
			if (tg.ATK) evts.add({
				source: tg,
				player: p,
				num: tg.ATK
			});
			if (evts.length) {
				var next = game.createEvent("hs_dmgrcv", false);
				next.evts = evts;
				next.setContent("hs_dmgrcvbt");
				return next;
			} else return;
		},
		hs_dmgrcvaoe() { //aoe伤害&&治疗
			var next = game.createEvent("hs_dmgrcv", false);
			next.player = this;
			for (let i = 0; i < arguments.length; i++) {
				if (typeof arguments[i] == "number") next.num = arguments[i];
				else if (typeof arguments[i] == "string") {
					if (arguments[i] == "recover") next.type = "recover";
					else if (arguments[i] == "damage") next.type = "damage";
					else if (arguments[i] == "nocard") next.nocard = true;
					else if (arguments[i] == "nosource") next.nosource = true;
					else if (arguments[i] == "nodelay") next.nodelay = true;
					else if (["ice", "fire", "thunder"].includes(arguments[i])) next.nature = arguments[i];
					else next.sctp = arguments[i];
				} else if (get.hstype(arguments[i]) == "player") next.source = arguments[i];
				else if (get.hstype(arguments[i]) == "players") next.targets = arguments[i];
				else if (get.hstype(arguments[i]) == "card") next.card = arguments[i];
				else if (get.hstype(arguments[i]) == "cards") next.cards = arguments[i];
				else if (Array.isArray(arguments[i]) && arguments[i].length == 2) next.expo = arguments[i];
			}
			if (!next.source && next.sctp) next.source = this.scpl(next.sctp);
			if (!next.source) next.nosource = true;
			if (next.nosource) delete next.source;
			if (!next.type) next.type = "damage";
			if (next.num === undefined) next.num = 1;
			next.num = Math.max(0, next.num);
			if (next.targets && next.targets.length > 0) next.setContent("hs_dmgrcvaoe");
			else next.setContent("emptyHSwait");
			return next;
		},
		/*代码修改：多次伤害或回复*/
		hs_dmgrcvNotaoe() { //不按aoe结算的群体伤害或回复
			//player.hs_dmgrcvNotaoe("damage", card, player, 2, "notmine", (p,f)=>!f.isDamaged());
			var next = game.createEvent("hs_dmgrcvNotaoe", false);
			for (let i = 0; i < arguments.length; i++) {
				if (typeof arguments[i] == "number") next.num = arguments[i];
				else if (typeof arguments[i] == "function") next.tgfilter = arguments[i];
				else if (typeof arguments[i] == "string") {
					if (arguments[i] == "recover") next.type = "recover";
					else if (arguments[i] == "damage") next.type = "damage";
					else if (arguments[i] == "nocard") next.nocard = true;
					else if (arguments[i] == "nosource") next.nosource = true;
					else if (arguments[i] == "nodelay") next.nodelay = true;
					else if (["ice", "fire", "thunder"].includes(arguments[i])) next.nature = arguments[i];
					else next.sctp = arguments[i];
				} else if (get.hstype(arguments[i]) == "player") next.source = arguments[i];
				else if (get.hstype(arguments[i]) == "players") next.targets = arguments[i];
				else if (get.hstype(arguments[i]) == "card") next.card = arguments[i];
				else if (get.hstype(arguments[i]) == "cards") next.cards = arguments[i];
			}
			if (!next.tgfilter) next.tgfilter = () => true;
			if (!next.source && next.sctp) next.source = this.scpl(next.sctp);
			if (!next.source) next.nosource = true;
			if (next.nosource) delete next.source;
			next.player = next.source || this;
			if (!next.type) next.type = "damage";
			if (next.num === undefined) next.num = 1;
			if (next.targets && next.targets.length > 0) next.setContent("hs_dmgrcvNotaoe");
			else next.setContent("emptyHSwait");
			return next;
		},
		SSfellow(fls, oppo, anm, extra) { //召随从
			var l = this.getLeader();
			if (oppo) l = l.getOppo();
			if (l.hs_full()) return;
			var next = game.createEvent("SSfellow", false);
			next.player = l;
			if (this.isMin()) next.fellow = this;
			next.leader = this.getLeader();
			if (typeof fls == "string") {
				next.fls = [fls];
			} else next.fls = fls;
			if (next.fls.length == 1 && next.fls[0].includes(":")) {
				if (next.fls[0].indexOf("cdset:") == 0) {
					const stori = next.fls[0].slice(6).split(",");
					const st = stori[0];
					const list = get.HSA("collect")[st];
					if (list) {
						if (stori[1]) {
							if (stori[1] == "norepeat") next.player.sctp("mine", fl => {
								list.remove(get.translation(fl.name));
							});
						}
						if (list.length) next.fls = [list.randomGet()];
						else get.hs_alt("SSfellow异常：", st, "为空");
					} else get.hs_alt("SSfellow异常：", st, "不存在");
				} else if (next.fls[0].indexOf("range:") == 0) {
					var st = next.fls[0].slice(6);
					var arr = st.split(",");
					var fil = get.hsflt(arr);
					var kc = get.hskachi("HS_minor", fil);
					if (kc.length > 0) next.fls = [kc.randomGet()];
					else {
						_status.event.next.remove(next);
						return;
					}
				}
			}
			if (next.fls.length == 2) {
				if (typeof next.fls[1] == "number") {
					next.fls = get.HSF("repeat", [next.fls[0], next.fls[1]]);
				}
			}
			if (next.fls[1] != undefined && typeof next.fls[1] != "string") {
				get.hs_alt("SSfellow异常：", next.fls);
			}
			if (next.fls.some(i => !i.includes("_monster") && get.type(get.HSF("getEN", [i])) != "HS_minor")) {
				get.hs_alt(next.fls.join(","), ":包含非随从牌");
			}
			next.oppo = oppo;
			next.anm = anm || _status.event.anm;
			if (extra) next.extra = extra;
			else if (_status.event.efftype) {
				if (_status.event.efftype == "亡语") next.extra = ["亡语"];
			}
			next.setContent(function() {
				"step 0"
				event.num = event.fls.length;
				event.i = 0;
				event.toadd = [];
				"step 1"
				if (player.hs_full()) event.goto(10);
				"step 2"
				var p = player;
				var nam = event.fls[event.i];
				var cards = [get.chscard(nam)];
				var pos = (function(evt) {
					var m = p.countFellow();
					var n = p == game.me ? 0 : 7;
					var fh = evt.extra && evt.extra.some(i => i.indexOf("复活") == 0);
					var wy = evt.extra && evt.extra.includes("亡语");
					if (fh) evt.notrigger = true;
					if (fh || evt.oppo || !evt.fellow) return m + n + 2;
					else if (game.dead.includes(evt.fellow)) { //亡语召怪
						var o = Math.ceil(evt.fellow.truepos || evt.fellow.dataset.position);
						return o;
					} else { //战吼召怪
						var o = parseInt(evt.fellow.dataset.position);
						var i = evt.i;
						var dr = Math.pow(-1, i);
						if (wy) dr = 1;
						var j = 1;
						var res = o + dr * j;
						if (dr < 0) res++;
						res = Math.max(n + 2, res);
						return res;
					}
				})(event);
				if (game.dead.filter(fl => fl.getLeader() == p).length && !event.oppo) {
					var dds = game.dead.filter(fl => fl.getLeader() == p);
					var src = event.fellow || p;
					var srcp = game.dead.includes(src) ? src.truepos : parseInt(src.dataset.position);
					dds.forEach(fl => {
						if (srcp < fl.truepos && pos <= Math.ceil(fl.truepos)) fl.truepos++;
					});
				}
				var left = !event.oppo && event.fellow && !game.dead.includes(event.fellow) && parseInt(event.fellow.dataset.position) >= pos;
				const fellow = lib.element.HSfellow.create(p, pos, cards, "S");
				event.cs = cards;
				/*代码修改：现在可以用救赎来1血复活*/
				if (event.extra) {
					for (const ex of event.extra) {
						if (ex.length == 2) {
							if (ex == "复制") fellow.addvaluefinal([1, 1]);
							else if (ex == "分裂") {
								fellow.hs_dm = event.fellow.hs_dm;
								fellow.hs_copy(event.fellow);
							}
						} else if (ex.length > 2) {
							const num = parseInt(ex.slice(2));
							if (!num) continue;
							if (ex.indexOf("复制") == 0) fellow.addvaluefinal([num, num]);
							if (ex.indexOf("复活") == 0) fellow.hs_dm = fellow.hp - num;
						}
					}
				}
				var dft = !event.oppo && event.fellow && !game.dead.includes(event.fellow) && event.num > 1 ? "呼出" : "冒出";
				var rcdhs = fellow.hs_rcdh(pos, left, event.anms, event.anm, dft);
				event.rcdh = rcdhs[0];
				event.rctm = rcdhs[1];
				p.actcharacterlist.add(fellow).sort(lib.sort.position);
				event.link = fellow;
				if (event.oppo) game.log((event.fellow || event.leader), "召唤了", fellow, "到", p, "场上");
				else game.log((event.fellow || event.leader), "召唤了", fellow);
				"step 3"
				var plp = function() {
					get.HSF("Aud", [event.cs[0], "play", player]);
				};
				setTimeout(plp, event.rctm);
				player.HSF("hsdouble");
				event.link.hs_yin(event.rctm, event.extra?.includes("分裂"));
				_status.hsAttendSeq.ad(event.link);
				event.toadd.add(event.link);
				get.HSF("arrange");
				"step 4"
				if (event.notrigger) event.goto(7);
				"step 5"
				//增加"预召唤"的时机
				get.HSF("event", ["summonBefore", {
					player: player,
					card: event.cs[0],
					link: event.link
				}]);
				"step 6"
				//增加"召唤后"的时机
				if (event.link.HSF("alive")) get.HSF("event", ["summonAfter", {
					player: player,
					card: event.cs[0],
					link: event.link
				}]);
				"step 7"
				event.i++;
				if (event.i < event.num && !player.hs_full()) {
					event.goto(1);
				}
				"step 8"
				game.delay(get.hslegend(event.link) ? 1 : 0.5);
				if (event.notrigger) event.goto(10);
				event.toadd = event.toadd.filter(i => i.HSF("alive"));
				event.result = {
					bool: event.toadd.length > 0,
					target: event.toadd[0],
					targets: event.toadd.slice(0),
				};
				"step 9"
				event.toadd.forEach(t => {
					if (t.name == "hs_Hound") {
						setTimeout(function() {
							t.addTempClass("kuangbao", 700);
						}, 1000);
					}
				});
				if (event.toadd.length) player.HSF("hs_rever", [event.toadd])
				"step 10"
				if (!event.isMine()) game.delay(0.5);
			});
			return next;
		},
		//简化命令
		HSF(name, args) { //调用get.HSF，第一个参数传入this
			return get.HSF(name, [this].concat(args));
		},
		HSFT(tc, order) { //说台词
			var p = this;
			var key = ["牌库快空", "牌库空"].includes(tc) ? "common" : lib.translate[this.name];
			var words = get.HSA("台词")[key];
			if (!words) {
				p.say("[ERROR]找不到台词！！");
				return;
			}
			if (tc == "开局") {
				if (order && game.me.name == game.enemy.name) tc = "镜像开局";
				else {
					var oppo = get.translation(p.next.name);
					if (words[oppo]) tc = oppo;
				}
			}
			if (!words[tc]) return;
			var tsay = words[tc];
			if (Array.isArray(tsay)) tsay = tsay.randomGet();
			this.say(tsay);
			if (!this.isMin()) {
				var tm = this.HSF("Aud3", [tc]);
				return tm;
			}
		},
		HSline(target, config) {
			get.HSF("HSline", [this, target, config]);
		}
	},
	//以下是自定义的事件内容
	content: {
		hs_exchange() { //开局调度
			"step 0"
			game.zhu.next.hs_drawDeck("notrigger");
			"step 1"
			if (!get.HSF("cfg", ["HS_debug"])) game.delay(1.5);
			"step 2"
			var coin = ui.arena.querySelector(".hs_coin:not(.second)")
			if (coin) coin.delete();
			var mode = get.HSF("cfg", ["HS_duelMode"]);
			if (mode != "testing") game.me.hs_exchange2();
		},
		greeting() { //开局
			"step 0"
			ui.arena.querySelector(".hs_vs").delete();
			ui.arena.querySelector(".hs_mefull").delete();
			ui.arena.querySelector(".hs_enemyfull").delete();
			ui.arena.querySelector(".hs_mejob").delete();
			ui.arena.querySelector(".hs_enemyjob").delete();
			game.me.style.transition = "all 0.5s";
			game.enemy.style.transition = "all 0.5s";
			ui.arena.classList.remove("hs_kaichang2");
			var zhu = game.zhu;
			var oppo = zhu.getOppo();
			var mode = get.HSF("cfg", ["HS_duelMode"]);
			if (mode == "testing") {
				event.hs_testing = true;
			}
			setTimeout(function() {
				ui.arena.classList.remove("hs_kaichang");
				/*代码修改：新增*/
				if (event.hs_testing) {
					get.HSF("first");
					get.HSF("eee", ["hs_exchange"]);
				} else {
					var ty = function(p, b) {
						var tm = p.HSFT("开局", b);
						setTimeout(function() {
							p.classList.remove("bright");
						}, 1600);
						return tm;
					};
					var ddsj = ty(oppo);
					setTimeout(function() {
						setTimeout(function() {
							var coin = ui.create.div(".bright.hs_coin", ui.arena);
							ui.create.div(".img", coin)
							ui.create.div(".comet1", coin);
							ui.create.div(".comet2", coin);
							event.coin = coin;
							setTimeout(function() {
								get.HSF("first");
								var coin = event.coin;
								coin.classList.add("result");
								var bang = ui.create.div(".bright.arrowbang", ui.arena);
								bang.addTempClass("start");
								var bo = game.zhu == game.me;
								bang.innerHTML = bo ? "你抢到了先攻" : "你可以多抽一张牌";
								setTimeout(function() {
									bang.delete();
								}, 1500);
								if (!bo) coin.classList.add("second");
								get.HSF("eee", ["hs_exchange"]);
							}, 1000);
						}, 200);
						setTimeout(function() {
							ty(zhu, true);
						}, ddsj * 1000);
					}, 500);
				}
			}, 500);
			"step 1"
			if (event.hs_testing) {
				game.zhu.cardPile.give(game.zhu.cardPile.getCards("h").slice(0, 3), game.zhu);
				game.zhu.next.cardPile.give(game.zhu.next.cardPile.getCards("h").slice(0, 3), game.zhu.next);
			} else {
				game.zhu.cardPile.give(game.zhu.cardPile.getCards("h").randomGets(3), game.zhu);
				game.zhu.next.cardPile.give(game.zhu.next.cardPile.getCards("h").randomGets(3), game.zhu.next);
			}
			"step 2"
			if (!event.hs_testing) game.delay(2);
			"step 3"
			var ele = document.querySelector("#handcards1>div");
			ele.style.transition = "all 0.5s";
			ele.towork = true;
			"step 4"
			if (!event.hs_testing) game.delay();
			"step 5"
			game.me.mana.listen(function() {
				if (this.classList.contains("memana")) lib.hearthstone.funcs.clickmana();
			});
			game.enemy.mana.listen(function() {
				if (this.classList.contains("memana")) lib.hearthstone.funcs.clickmana();
			});
			"step 6"
			ui.arena.classList.remove("hs_exchange");
			get.HSF("checkhand");
			lib.hearthstone.hs_absl = ui.hs_testfl.getBoundingClientRect().left;
			if (!event.hs_testing) game.delay(2);
			"step 7"
			var coin = ui.arena.querySelector(".hs_coin.second");
			if (coin) {
				coin.classList.add("gain");
				coin.delete();
			}
			game.zhu.next.hs_gain("幸运币", null, false);
			"step 8"
			game.delay(0.5);
			game.me.hs_drawDeck2(i => get.translation(i.name) == "克罗诺姆"); //对战开始时：从牌库里抽到这张牌 ZZADAN
			"step 9"
			ui.arena.classList.add("recovering");
			ui.background.style.transition = "all 3s";
			ui.background.style.filter = "brightness(100%)";
			var i = 0;
			var inte = setInterval(function() {
				game.me.style.filter = "brightness(" + (25 + i * 0.25) + "%)";
				game.enemy.style.filter = "brightness(" + (25 + i * 0.25) + "%)";
				i++;
			}, 10);
			game.pause();
			setTimeout(function() {
				clearInterval(inte);
				game.me.style.filter = "";
				game.enemy.style.filter = "";
				ui.arena.classList.remove("hs_exchange2");
				ui.arena.classList.remove("recovering");
				game.resume();
				setTimeout(function() {
					ui.background.style.transition = "";
				}, 1000);
			}, 3000);
			"step 10"
			/*代码修改：增加时机：游戏开始时*/
			event.trigger("gameStart");
			"step 11"
			/*代码修改：开局后执行作弊代码*/
			if (_status.hs_zuobi_list) {
				var next = game.createEvent("hs_zuobi_list", false);
				next.setContent(function() {
					for (const args of _status.hs_zuobi_list) {
						get.HSF("作弊", args);
					}
					delete _status.hs_zuobi_list;
				});
			}
			"step 12"
			/*代码修改：现在第一个回合也能触发回合开始时扳机了*/
			_status.event.player = game.zhu;
			event.trigger("phaseBegin");
			"step 13"
		},
		emptyHSevent() { //无阶段事件
			"step 0"
			get.HSF("event", [event.name.slice(0, -2), {
				player: player
			}]);
			"step 1"
			get.HSF("checkdeath");
		},
		emptyHSwait() { //什么都不发生
			"step 0"
			game.delay();
			"step 1"
		},
		checkwin() { //胜负判定
			"step 0"
			/*代码修改：如果是投降，血没扣完也死*/
			if (game.me.hp <= 0 || game.me.istouxiang) game.me.hs_losing = true;
			if (game.enemy.hp <= 0) game.enemy.hs_losing = true;
			if (game.me.hs_losing || game.enemy.hs_losing) get.HSF("think");
			else event.finish();
			"step 1"
			var df = function(p) {
				if (p.hs_losing) {
					p.removegjz("dongjied");
					//代码修改，增加投降语音
					if (p.istouxiang) {
						p.HSFT("投降");
					} else {
						p.HSF("Aud3", ["死亡"]);
					}
				}
			};
			df(game.me);
			df(game.enemy);
			get.HSF("checkfellow");
			if (game.me.hs_losing && game.enemy.hs_losing) {
				game.me.$die();
				game.enemy.$die();
				game.players.removeArray([game.me, game.enemy]);
				game.dead.addArray([game.me, game.enemy]);
				game.over("平局");
			} else if (game.me.hs_losing) game.me.die();
			else game.enemy.die();
			"step 2"
		},
		hs_use_minor() { //使用随从
			"step 0"
			//扣费阶段
			event.usingcost = cards[0].cost();
			player.HSF("usemana", [event.usingcost]);
			player.sctp("field", t => {
				t.buff.forEach(o => {
					if (o.used === false && o.countphase == player && o.name == "hs_cost" && o.type2 == "cost" && o.fil(card, player)) o.used = true;
				});
			});
			//检测是否能触发战吼和连击
			var name = get.HSF("tr", [card.name]);
			game.log(player, "使用了", card);
			var hasEff = get.subtype(card) == "HS_effect";
			if (hasEff) {
				var info = lib.skill[name];
				if (info.active && info.active(player)) event.active = true;
				event.onc = {
					type: "lianji",
					can: true,
					needtarget: false,
					tgs: [],
					will: true,
				};
				if (info.battleRoal) {
					event.onc.type = "battleRoal";
					if (info.battleRoal.filter) {
						var nf = get.HSF("strfil", [info.battleRoal.filter]);
						info.battleRoal.filter = nf;
						if (!nf(player, cards[0])) event.onc.can = false;
					}
				}
				var tp = event.onc.type;
				if (!info[tp]) event.onc.can = false;
				if (tp == "lianji" && !event.active) event.onc.can = false;
				if (event.onc.can) {
					if (info[tp].filterTarget) {
						event.onc.needtarget = true;
						event.onc.tgs = game.filterPlayer(function(target) {
							return player.HSF("canbetarget", [null, target, "battleroal"]) && info[tp].filterTarget(card, player, target);
						});
						if (event.onc.tgs.length == 0) event.onc.can = false;
					}
				}
				event.info = info;
			}
			"step 1"
			//扔牌动画
			get.HSF("checkfellow");
			game.me.HSF("hs_testfl");
			player.lose(cards, ui.special);
			event.node = player.$throw(cards, 500);
			//game.delay(0.5);
			"step 2"
			get.HSF("checkhand");
			"step 3"
			//创建随从
			var pos = player.settlehsFL();
			const fellow = lib.element.HSfellow.create(player, pos, cards);
			//播放入场动画
			var rcdhs = fellow.hs_rcdh(pos, null, null, null, "落地");
			event.rcdh = rcdhs[0];
			event.rctm = rcdhs[1];
			player.actcharacterlist.add(fellow).sort(lib.sort.position);
			//扔牌动画结束
			if (event.node) event.node.moveDelete(fellow);
			event.link = fellow;
			"step 4"
			//等待入场动画完成
			var plp = function() {
				get.HSF("Aud", [card, "play", player]);
			};
			setTimeout(plp, event.rctm);
			player.HSF("hsdouble");
			game.log(player, "召唤了", event.link);
			get.HSF("morefocus", event.link.linkCard);
			get.HSF("arrange");
			"step 5"
			//选目标
			if (event.onc && event.onc.can && event.onc.needtarget) {
				var info = event.info;
				var tgs = event.onc.tgs;
				var tp = event.onc.type;
				if (tgs.includes(game.me)) get.HSF("clickmana", [false]);
				var next = player.chooseTarget((info.prompt || get.HSF("prompt", [card])), function(card, player, target) {
					return tgs.includes(target);
				}, true);
				next.set("pl", player);
				var ai = () => 1;
				if (info[tp].aifamily) {
					switch (info[tp].aifamily) {
						case "damage":
							ai = function(target) {
								var player = _status.event.pl;
								return get.dmgEffect(target, player, player) + 0.1;
							};
							break;
						case "recover":
							ai = function(target) {
								var player = _status.event.pl;
								return get.rcvEffect(target, player, player);
							};
							break;
						case "atk":
							ai = function(target) {
								var player = _status.event.pl;
								if (target.summoned && !target.hasgjz("chongfeng")) return 0;
								if (target.getLeader() != player) return 0;
								return target.ATK == 0 ? 3 : target.ATK;
							};
						case "hp":
							ai = function(target) {
								var player = _status.event.pl;
								if (target.getLeader() != player) return 0;
								return target.hp;
							};
						default:
					}
				}
				next.set("ai", ai);
			} else {
				game.delay(event.rctm / 1000);
				event.goto(7);
			}
			"step 6"
			event.target = result.targets[0];
			"step 7"
			//随从进场，效果可以触发
			event.link.hs_yin(event.rctm);
			_status.hsAttendSeq.ad(event.link);
			event.link.HSF("uptris");
			game.delay(get.hslegend(event.link) ? 2.4 : 1.9);
			"step 8"
			/*代码修改：手动光环刷新*/
			get.HSF("updateauras", [true]);
			//反制阶段
			get.HSF("event", ["useCardBefore", {
				player: player,
				card: card,
				cards: cards,
				target: target,
				targets: targets,
			}]);
			"step 9"
			player.actionHistory[player.actionHistory.length - 1].useCard.push(event);
			if (!game.getGlobalHistory().useCard) game.getGlobalHistory().useCard = [];
			game.getGlobalHistory().useCard.push(event);
			if (player.stat[player.stat.length - 1].card[card.name] == undefined) {
				player.stat[player.stat.length - 1].card[card.name] = 1;
			} else {
				player.stat[player.stat.length - 1].card[card.name]++;
			}
			//抉择变形
			event.link.hs_juezetrans(card);
			"step 10"
			//增加"预召唤"的时机
			get.HSF("event", ["summonBefore", {
				player: player,
				card: cards[0],
				link: event.link
			}]);
			"step 11"
			//使用时事件
			get.HSF("event", ["useCard", {
				player: player,
				card: card,
				cards: cards,
				target: target,
				targets: targets,
				link: event.link
			}]);
			"step 12"
			//增加"召唤时"的时机
			get.HSF("event", ["summonSucc", {
				player: player,
				card: cards[0],
				link: event.link
			}]);
			"step 13"
			//过载
			var info = get.info(card);
			if (info.hs_gz) {
				var num = info.hs_gz;
				player.addMark("hs_mana_owed", num, false);
				game.log(player, "过载了", num, "个法力水晶");
				player.HSF("updatemana");
				get.HSF("event", ["overload", {
					player: player,
					card: card,
					cards: cards,
					num: num,
				}]);
			}
			"step 14"
			//死亡阶段
			get.HSF("checkdeath");
			if (!event.onc) event.goto(21);
			"step 15"
			//战吼次数
			if (event.onc.can && event.link.triggers.battleRoal) {
				event.zh_num = 1;
				event.zhed = 0;
				if (player.hasAuras("doublebattleroal")) event.zh_num = 2;
				if (event.link.triggers.battleRoal.bonus) event.zh_num += event.link.triggers.battleRoal.bonus(player, event.link);
				event.battleRoal_con = event.link.triggers.battleRoal;
			} else {
				if (event.onc.type == "battleRoal") event.link.addTempClass("zhanhou");
				event.goto(19);
			}
			"step 16"
			//重选目标
			if (target) get.HSF("event", ["battleRoalTo", {
				player: player,
				card: card,
				cards: cards,
				target: target,
				targets: targets,
			}]);
			"step 17"
			//战吼
			event.link.addTempClass("zhanhou");
			if (!target || target.HSF("alive", [true])) {
				var cancel = false;
				var recheck = event.info.battleRoal.recheck;
				if (["机械", "存活", "龙牌", "空手"].includes(event.info.battleRoal.filter)) recheck = "filter";
				if (recheck) {
					if (typeof recheck == "string") {
						if (recheck == "filter" && event.info.battleRoal.filter) {
							var fs = event.info.battleRoal.filter;
							var ff = function(e, p, f) {
								return fs(p);
							};
							recheck = ff;
						} else {
							var arr = recheck.split(",");
							if (arr.length == 1) {
								var f = get.HSA("funcs")[arr[0]];
								if (f) recheck = f;
								else get.hs_alt("战吼recheck:", recheck);
							} else {
								var fs = arr.map(i => get.HSA("funcs")[i]);
								var ff = function(e, p, f) {
									return ff.fs.every(i => i(e, p, f));
								};
								ff.fs = fs;
								recheck = ff;
							}
						}

					}
					if (!recheck(null, player, event.link, event.info.battleRoal)) cancel = true;
				}
				if (!cancel) event.toRun = event.link.hs_battleRoal(event.target, event.battleRoal_con, event.active);
			}
			"step 18"
			event.zhed++;
			if (event.zhed < event.zh_num) {
				get.HSF("updateauras", [true]);
				game.delay();
				event.goto(17);
			}
			"step 19"
			if (event.onc && event.onc.type == "lianji" && event.onc.can) {
				event.link.addTempClass("zhanhou");
				if (target) event.link.HSline(target, "green");
				event.insert(event.info.lianji.effect, {
					fellow: event.link,
					player: player,
					target: target,
				});
			}
			"step 20"
			//抉择
			if (event.info.jueze) event.link.hs_jueze(event.info.jueze);
			"step 21"
			//死亡阶段
			get.HSF("checkdeath");
			"step 22"
			//交换顺序
			//使用后事件
			player.hs_state.useCard++;
			get.HSF("event", ["useCardAfter", {
				player: player,
				card: card,
				cards: cards,
				target: target,
				targets: targets,
				link: event.link
			}]);
			"step 23";
			//交换顺序
			//增加"召唤后"的时机
			if (event.link.HSF("alive")) get.HSF("event", ["summonAfter", {
				player: player,
				card: cards[0],
				link: event.link
			}]);
			"step 24"
			//死亡阶段
			get.HSF("checkdeath");
			"step 25"
			get.HSF("think");
		},
		hs_use_spell() { //使用法术
			"step 0"
			var info = get.info(card);
			event.info = info;
			if (info.active && info.active(player)) event.active = true;
			if (player.HSF("manamax") == 10 && ["hs_WildGrowth", "hs_AstralCommunion"].includes(card.name)) event.hs_guosheng = true;
			event.usingcost = cards[0].cost();
			player.HSF("usemana", [event.usingcost]);
			player.lose(cards, ui.special);
			/*代码修改：如果是奥秘，就不显示扔牌动画，改为*/
			if (get.subtype(card) != "HS_secret") {
				event.node = player.$throw(cards, 1000);
				game.delay(0.5);
			}
			"step 1"
			get.HSF("checkhand");
			if (event.node) event.node.delete();
			"step 2"
			//法术进场
			/*代码修改：如果是奥秘，不显示详情*/
			if (get.subtype(card) == "HS_secret") get.HSF("morefocus", [event.info.rnature]);
			else get.HSF("morefocus", cards);
			get.HSF("updateauras", [true]);
			_status.hsAttendSeq.ad(cards[0]);
			"step 3"
			//反制阶段
			get.HSF("event", ["useCardBefore", {
				player: player,
				card: card,
				cards: cards,
				target: target,
				targets: targets,
				active: event.active,
				usingcost: event.usingcost
			}]);
			"step 4"
			if (event.hs_fanzhied) {
				player.discardPile.directgain(cards);
				_status.hsAttendSeq.cl(cards);
				game.delay();
			} else {
				player.actionHistory[player.actionHistory.length - 1].useCard.push(event);
				if (!game.getGlobalHistory().useCard) game.getGlobalHistory().useCard = [];
				game.getGlobalHistory().useCard.push(event);
				if (player.stat[player.stat.length - 1].card[card.name] == undefined) {
					player.stat[player.stat.length - 1].card[card.name] = 1;
				} else {
					player.stat[player.stat.length - 1].card[card.name]++;
				}
				//更换牌
				get.HSF("event", ["useCardBegin", {
					player: player,
					card: card,
					cards: cards,
					target: target,
					targets: targets,
					active: event.active,
					usingcost: event.usingcost
				}]);
			}
			"step 5"
			player.sctp("field", t => {
				t.buff.forEach(o => {
					if (o.used === false && o.countphase == player && o.name == "hs_cost" && o.type2 == "cost" && o.fil(card, player)) o.used = true;
				});
			});
			if (event.hs_fanzhied) event.goto(12);
			else {
				//使用时事件
				get.HSF("event", ["useCard", {
					player: player,
					card: card,
					cards: cards,
					target: target,
					targets: targets,
					active: event.active,
					usingcost: event.usingcost
				}]);
			}
			"step 6"
			//过载
			if (event.info.hs_gz) {
				var num = event.info.hs_gz;
				player.addMark("hs_mana_owed", num, false);
				game.log(player, "过载了", num, "个法力水晶");
				player.HSF("updatemana");
				get.HSF("event", ["overload", {
					player: player,
					card: card,
					cards: cards,
					num: num,
				}]);
			}
			"step 7"
			//死亡阶段
			get.HSF("checkdeath");
			"step 8"
			//计算次数
			"step 9"
			//重选目标
			if (targets) get.HSF("event", ["useCardTo", {
				player: player,
				card: card,
				cards: cards,
				target: target,
				targets: targets,
				active: event.active,
				usingcost: event.usingcost
			}]);
			"step 10"
			//结算效果
			if (get.subtype(card) == "HS_secret") {
				if (player.use_secret) player.use_secret(cards[0]);
			} else {
				event.toRun = player.hs_spellEffect(cards[0], target, event.active);
			}
			"step 11"
			//送墓
			game.delay(0.5);
			get.HSF("updateauras", [true]);
			if (get.subtype(card) != "HS_secret") {
				if (cards[0].hs_temp || get.info(card).hs_token) player.heroskill.pos.directgain(cards);
				else player.discardPile.directgain(cards);
				_status.hsAttendSeq.cl(cards);
			}
			get.HSF("checkfellow");
			"step 12"
			//死亡阶段
			get.HSF("checkdeath");
			"step 13"
			//使用后事件
			ui.clear();
			player.hs_state.useCard++;
			if (!event.hs_fanzhied) get.HSF("event", ["useCardAfter", {
				player: player,
				card: card,
				cards: cards,
				target: target,
				targets: targets,
				active: event.active,
				usingcost: event.usingcost
			}]);
			"step 14"
			//死亡阶段
			get.HSF("checkdeath");
			"step 15"
			if (!event.hs_fanzhied && event.hs_guosheng) player.hs_gain("法力过剩");
			"step 16"
			get.HSF("think");
		},
		hs_use_weapon() { //使用武器
			"step 0"
			get.HSF("clickmana", [false]);
			event.usingcost = cards[0].cost();
			player.HSF("usemana", [event.usingcost]);
			game.log(player, "使用了", card);
			var info = get.info(card);
			var info2 = info.weaponeffect;
			var name = card.name;
			if (info2 && info2.battleRoal) {
				event.hasbattleroal = true;
				event.canzh = true;
				if (info2.battleRoal.filter) {
					var nf = get.HSF("strfil", [info2.battleRoal.filter]);
					info2.battleRoal.filter = nf;
					if (!nf(player, cards[0])) event.canzh = false;
				}
				if (info2.battleRoal.filterTarget) {
					event.needtarget = true;
					event.canzhtg = game.filterPlayer(function(target) {
						return player.HSF("canbetarget", [null, target, "battleroal"]) && (info2.battleRoal.filterTarget === true || info2.battleRoal.filterTarget(card, player, target));
					});
					if (event.canzhtg.length == 0) event.canzh = false;
				}
			}
			event.cinfo = info;
			event.info2 = info2;
			if (info2.active && info2.active(player)) event.active = true;
			player.lose(cards, ui.special);
			event.node = player.$throw(cards, 1000);
			game.delay(0.5);
			"step 1"
			get.HSF("checkhand");
			if (event.node) event.node.delete();
			"step 2"
			//武器进场
			get.HSF("morefocus", cards);
			var c = cards[0];
			event.div = player.addweapon(c);
			player.predata_weapon = event.div;
			_status.hsAttendSeq.ad(c);
			"step 3"
			game.delay();
			"step 4"
			player.actionHistory[player.actionHistory.length - 1].useCard.push(event);
			if (!game.getGlobalHistory().useCard) game.getGlobalHistory().useCard = [];
			game.getGlobalHistory().useCard.push(event);
			if (player.stat[player.stat.length - 1].card[card.name] == undefined) {
				player.stat[player.stat.length - 1].card[card.name] = 1;
			} else {
				player.stat[player.stat.length - 1].card[card.name]++;
			}
			event.div.hs_yin();
			"step 5"
			//战吼选目标
			if (event.div.triggers.battleRoal) {
				if (event.needtarget && event.canzh) {
					var info = event.info2;
					var tgs = event.canzhtg;
					if (tgs.includes(game.me)) get.HSF("clickmana", [false]);
					var next = player.chooseTarget((info.prompt || get.HSF("prompt", [card])), function(card, player, target) {
						return tgs.includes(target);
					}, true);
					next.set("pl", player);
					var ai = () => 1;
					if (info.battleRoal.aifamily) {
						switch (info.battleRoal.aifamily) {
							case "damage":
								ai = function(target) {
									var player = _status.event.pl;
									return get.dmgEffect(target, player, player) + 0.1;
								};
								break;
							case "recover":
								ai = function(target) {
									var player = _status.event.pl;
									return get.rcvEffect(target, player, player);
								};
								break;
							case "atk":
								ai = function(target) {
									var player = _status.event.pl;
									if (target.summoned && !target.hasgjz("chongfeng")) return 0;
									if (target.getLeader() != player) return 0;
									return target.ATK == 0 ? 3 : target.ATK;
								};
							case "hp":
								ai = function(target) {
									var player = _status.event.pl;
									if (target.getLeader() != player) return 0;
									return target.hp;
								};
							default:
						}
					}
					next.set("ai", ai);
				}
			} else event.goto(7);
			"step 6"
			if (event.hasbattleroal) {
				if (event.canzh) {
					if (event.needtarget) {
						if (result.bool) {
							event.willzh = true;
							event.target = result.targets[0];
						} else event.willzh = false;
					} else event.willzh = true;
				} else event.willzh = false;
			}
			"step 7"
			//使用时事件
			get.HSF("event", ["useCard", {
				player: player,
				card: card,
				cards: cards,
				target: target,
				targets: targets,
			}]);
			"step 8"
			//过载
			if (event.cinfo.hs_gz) {
				var num = event.cinfo.hs_gz;
				player.addMark("hs_mana_owed", num, false);
				game.log(player, "过载了", num, "个法力水晶");
				player.HSF("updatemana");
				get.HSF("event", ["overload", {
					player: player,
					card: card,
					cards: cards,
					num: num,
				}]);
			}
			"step 9"
			//死亡阶段
			get.HSF("checkdeath");
			"step 10"
			//战吼次数
			if (event.div.triggers.battleRoal) {
				event.zh_num = player.hasAuras("doublebattleroal") ? 2 : 1;
				if (event.div.triggers.battleRoal.bonus) event.zh_num += event.div.triggers.battleRoal.bonus(player, event.div);
				event.zhed = 0;
			} else event.goto(14);
			"step 11"
			//重选目标
			if (targets) get.HSF("event", ["useCardTo", {
				player: player,
				card: card,
				cards: cards,
				target: target,
				targets: targets,
			}]);
			"step 12"
			//战吼
			event.div.addTempClass("zhanhou");
			if (event.willzh && (!target || target.HSF("alive", [true]))) {
				var cancel = false;
				var recheck = event.info2.battleRoal.recheck;
				if (recheck) {
					if (typeof recheck == "string") {
						var arr = recheck.split(",");
						if (arr.length == 1) {
							var f = get.HSA("funcs")[arr[0]];
							if (f) recheck = f;
							else get.hs_alt("战吼recheck:", recheck);
						} else {
							var fs = arr.map(i => get.HSA("funcs")[i]);
							var ff = function(e, p, f) {
								return ff.fs.every(i => i(e, p, f));
							};
							ff.fs = fs;
							recheck = ff;
						}

					}
					if (!recheck(null, player, event.link, event.info.battleRoal)) cancel = true;
				}
				if (!cancel) event.toRun = event.div.hs_battleRoal(event.target, event.div.triggers.battleRoal, event.active);
			}
			"step 13"
			event.zhed++;
			if (event.zhed < event.zh_num) {
				get.HSF("updateauras", [true]);
				game.delay();
				event.goto(12);
			}
			"step 14"
			//摧毁旧武器
			if (player.data_weapon) player.data_weapon.HSF("cuihui");
			delete player.predata_weapon;
			player.data_weapon = event.div;
			game.log(player, "装备了", card);
			get.HSF("event", ["equipAfter", {
				player: player,
				div: event.div,
				card: cards[0],
			}]);
			"step 15"
			//死亡阶段
			get.HSF("checkdeath");
			"step 16"
			//使用后事件
			player.hs_state.useCard++;
			get.HSF("event", ["useCardAfter", {
				player: player,
				card: card,
				cards: cards,
				target: target,
				targets: targets,
			}]);
			"step 17"
			//死亡阶段
			get.HSF("checkdeath");
			"step 18"
			get.HSF("think");
		},
		hs_use_heroskill() { //使用英雄技能
			"step 0"
			if (!event.filterTarget) event.goto(3);
			if (event.randomHT) {
				var t = event.randomHT(player);
				event.target = t;
				if (!event.target) event.finish();
			}
			"step 1"
			//英雄技能选目标
			var fil = event.filterTarget;
			player.chooseTarget(get.prompt2(event.skill), function(c, p, t) {
				return p.HSF('canbetarget', [null, t, 'heroskill']) && fil(null, p, t);
			}).set('ai', event.ai);
			"step 2"
			if (result.bool && result.targets[0]) event.target = result.targets[0];
			else event.finish();
			"step 3"
			player.hs_state.hrsk++;
			get.HSF("morefocus", [player.heroskill]);
			player.HSF("usemana", [event.cost]);
			player.sctp("field", t => {
				t.buff.forEach(o => {
					if (o.used === false && o.countphase == player && o.name == "hrskcost" && o.type2 == "cost" && o.fil(null, player)) o.used = true;
				});
			});
			"step 4"
			//重选目标
			get.HSF("event", ["useHeroskillTo", {
				player: player,
				target: target,
			}]);
			"step 5"
			//英雄技能结算
			player.heroskill.using = true;
			player.heroskill.used++;
			"step 6"
			player.heroskill.available = false;
			player.logSkill(event.skill, target, false);
			player.heroskill.pos.HSline(target, "green");
			player.hs_heroskillEffect(target, get.info(event.skill).effect);
			"step 7"
			delete player.heroskill.using;
			player.heroskill.classList.add("used");
			"step 8"
			game.delay();
			"step 9"
			/*代码修改：插入死亡阶段*/
			//死亡阶段
			get.HSF("checkdeath");
			"step 10"
			//激励
			get.HSF("jilievent", [{
				player: player,
				target: target,
			}]);
			"step 11"
			//死亡阶段
			get.HSF("checkdeath");
			"step 12"
			get.HSF("think");
		},
		hs_dmgrcvbt() { //战斗伤害
			"step 0"
			event.i = 0;
			event.evnum = event.evts.length;
			game.delay(2);
			"step 1"
			event.cur = event.evts[event.i];
			event.source = event.cur.source;
			event.player = event.cur.player;
			event.num = event.cur.num;
			if (event.num <= 0) event.goto(11);
			"step 2"
			_status.hs_noupdate = true;
			"step 3"
			//伤害步骤开始
			if (player.hasgjz("mianyi")) {
				game.log(player, "的免疫抵消了", event.num, "点伤害");
				event.num = 0;
			}
			if (event.num <= 0) event.goto(11);
			else {
				//预伤害扳机1(改变目标)
				get.HSF("event", ["hsdmgBefore", {
					player: player,
					source: event.source,
					num: event.num,
				}]);
			}
			"step 4"
			if (player.hasgjz("mianyi")) {
				game.log(player, "的免疫抵消了", event.num, "点伤害");
				event.num = 0;
				event.goto(11);
			} else {
				if (event.source && event.source.hasgjz("qianxing")) event.source.removegjz("qianxing");
				//预伤害扳机2(改变伤害量)
				get.HSF("event", ["hsdmgBegin1", {
					player: player,
					source: event.source,
					num: event.num,
				}]);
			}
			"step 5"
			if (event.num <= 0) event.goto(11);
			else {
				//预伤害扳机3(防止伤害)
				get.HSF("event", ["hsdmgBegin2", {
					player: player,
					source: event.source,
					num: event.num,
				}]);
			}
			"step 6"
			if (event.num <= 0) event.goto(11);
			"step 7"
			if (player.hasgjz("shengdun")) {
				player.removegjz("shengdun");
				game.log(player, "的圣盾抵消了", event.num, "点伤害");
				event.num = 0;
				event.goto(11);
			}
			event.cur.num = event.num;
			"step 8"
			//伤害结算
			event.change = (function(e, p) {
				var n = -1 * e.num;
				var max = p.maxHp;
				var hp = p.hp;
				var hj = p.hujia;
				var zz = Math.min(0, hj + n);
				if (p.aurasEffed("hs_mlnh")) {
					if (zz + hj + hp < 1) {
						var cg = 1 - hj - hp - zz;
						e.num -= cg;
						zz = 1 - hj - hp;
					}
				}
				return zz;
			})(event, player);
			var obj = {
				num: event.num,
				type: "damage",
				player: player,
				source: event.source,
			};
			obj.player[obj.type](obj.source, obj.num).hs_dmgrcv = true;
			"step 9"
			//伤害抖动
			_status.hs_noupdate = false;
			player.updatehsfl(event.change);
			"step 10"
			"step 11"
			event.i++;
			if (event.i < event.evnum) event.goto(1);
			"step 12"
			event.evts = event.evts.filter(i => i.num > 0);
			if (event.evts.length) {
				//结算伤害事件
				get.HSF("evts", ["hsdmg", event.evts]);
			}
			"step 13"
			//清除状态
			_status.hs_noupdate = false;
			get.HSF("checkfellow");
		},
		hs_dmgrcvaoe() { //aoe伤害&&回复
			"step 0"
			event.i = 0;
			event.evts = [];
			event.targets = event.targets.filter(fl => !fl.hs_losing);
			event.evnum = event.targets.length;
			event.orinum = event.num;
			//nosort:特殊顺序aoe
			if (!event.nosort) event.targets.sort(lib.sort.attendseq);
			_status.hs_noupdate = true;
			if (event.nodelay) game.delay(0.5);
			else game.delay(2);
			"step 1"
			event.target = event.targets[event.i];
			event.num = event.orinum;
			event.cur = {
				card: event.card,
				type: event.type,
				source: event.source,
				player: event.target,
				num: event.orinum,
				nature: event.nature,
			};
			if (event.expo && event.expo[0] == event.target) {
				event.num = event.expo[1];
				event.cur.expo = true;
				delete event.expo;
			}
			event.player = event.cur.player;
			event.evts.add(event.cur);
			"step 2"
			//奥金尼
			if (event.type == "recover" && event.source && event.source.getLeader().hasAuras("auchenai")) event.cur.type = "damage";
			"step 3"
			//伤害增减阶段(光环，法强)
			if (event.cur.type == "damage" && event.source) {
				if (card && get.type(card) == "HS_spell") {
					var res = event.source.countFq();
					if (get.info(card).doubleD) res *= 2;
					event.num += res;
				}
				const auras = event.source.sctp("field").reduce((x, y) => x.concat(y.buff.filter(i => i.ghwork("damage", event.source, [y.getLeader(), y, event.source, event]))), []);
				auras.sort(lib.sort.attendseq);
				auras.forEach(i => {
					let val = i.value;
					if (typeof val == "function") val = val(event.source, event.num, event);
					event.num += val;
				});
			}
			"step 4"
			//伤害翻倍阶段(维纶光环)
			if ((event.card && get.type(event.card) == "HS_spell" || event.hs_heroskill) && event.source && event.source.hasAuras("velen")) {
				event.num *= event.source.HSF("countvelen");
			}
			"step 5"
			//伤害步骤开始
			if (event.cur.type == "recover") event.goto(10);
			else {
				if (event.cur.num > 0 && player.hasgjz("mianyi")) {
					game.log(player, "的免疫抵消了", event.cur.num, "点伤害");
					event.num = 0;
				}
				if (event.num <= 0) event.goto(12);
				else {
					//预伤害扳机1(改变目标)
					get.HSF("event", ["hsdmgBefore", {
						player: player,
						source: event.source,
						num: event.num,
					}]);
				}
			}
			"step 6"
			if (event.cur.num > 0 && player.hasgjz("mianyi")) {
				game.log(player, "的免疫抵消了", event.num, "点伤害");
				event.num = 0;
				event.goto(12);
			} else {
				if (event.source && event.source.hasgjz("qianxing")) event.source.removegjz("qianxing");
				//预伤害扳机2(改变伤害量)
				get.HSF("event", ["hsdmgBegin1", {
					player: player,
					source: event.source,
					num: event.num,
				}]);
			}
			"step 7"
			if (event.num <= 0) event.goto(12);
			else {
				//预伤害扳机3(防止伤害)
				get.HSF("event", ["hsdmgBegin2", {
					player: player,
					source: event.source,
					num: event.num,
				}]);
			}
			"step 8"
			if (event.num <= 0) event.goto(12);
			"step 9"
			if (player.hasgjz("shengdun")) {
				player.removegjz("shengdun");
				game.log(player, "的圣盾抵消了", event.num, "点伤害");
				event.num = 0;
				event.goto(12);
			}
			"step 10"
			event.cur.num = event.num;
			//伤害结算
			event.cur.change = (function(e, p) {
				var bo = e.cur.type == "recover";
				var n = (bo ? 1 : -1) * e.cur.num;
				var max = p.maxHp;
				var hp = p.hp;
				var hj = p.hujia;
				if (bo) return Math.min(n, max - hp);
				else {
					var zz = Math.min(0, hj + n);
					if (p.aurasEffed("hs_mlnh")) {
						if (zz + hj + hp < 1) {
							var cg = 1 - hj - hp - zz;
							e.num -= cg;
							zz = 1 - hj - hp;
						}
					}
					return zz;
				}
			})(event, player);
			if (event.num != 0 && (event.cur.change != 0 || event.type == "damage")) event.cur.cantri = true;
			"step 11"
			"step 12"
			event.i++;
			if (event.i < event.evnum) event.goto(1);
			"step 13"
			event.evts = event.evts.filter(i => i.cantri);
			if (event.evts.length) get.HSF("dmgrcvdh", [event.evts]);
			"step 14"
			if (event.evts.length) {
				//结算伤害事件
				var n = "hs" + (event.evts[0].type == "damage" ? "dmg" : "rcv");
				get.HSF("evts", [n, event.evts]);
			}
			"step 15"
			//清除状态
			_status.hs_noupdate = false;
			get.HSF("checkfellow");
		},
		hs_dmgrcv() { //伤害&&回复
			"step 0"
			if (player.hs_losing) return;
			_status.hs_noupdate = true;
			//奥金尼
			if (event.type == "recover" && event.source && event.source.getLeader().hasAuras("auchenai")) event.type = "damage";
			"step 1"
			//伤害增减阶段(光环，法强)
			if (event.type == "damage" && event.source) {
				if (card && get.type(card) == "HS_spell") {
					var res = event.source.countFq();
					if (get.info(card).doubleD) res *= 2;
					event.num += res;
				}
				const auras = event.source.sctp("field").reduce((x, y) => x.concat(y.buff.filter(i => i.ghwork("damage", event.source, [y.getLeader(), y, event.source, event]))), []);
				auras.sort(lib.sort.attendseq);
				auras.forEach(i => {
					let val = i.value;
					if (typeof val == "function") val = val(event.source, event.num, event);
					event.num += val;
				});
			}
			"step 2"
			//伤害翻倍阶段(维纶光环)
			if ((card && get.type(card) == "HS_spell" || event.hs_heroskill) && event.source && event.source.hasAuras("velen")) {
				event.num *= event.source.HSF("countvelen");
			}
			"step 3"
			//伤害步骤开始
			if (event.type == "recover") event.goto(9);
			else {
				if (player.hasgjz("mianyi")) {
					game.log(player, "的免疫抵消了", event.num, "点伤害");
					event.num = 0;
				}
				if (event.num <= 0) event.goto(13);
				else {
					//预伤害扳机1(改变目标)
					get.HSF("event", ["hsdmgBefore", {
						player: player,
						source: event.source,
						num: event.num,
					}]);
				}
			}
			"step 4"
			if (player.hasgjz("mianyi")) {
				game.log(player, "的免疫抵消了", event.num, "点伤害");
				event.num = 0;
				event.goto(13);
			} else {
				if (event.source && event.source.hasgjz("qianxing")) event.source.removegjz("qianxing");
				//预伤害扳机2(改变伤害量)
				get.HSF("event", ["hsdmgBegin1", {
					player: player,
					source: event.source,
					num: event.num,
				}]);
			}
			"step 5"
			if (event.num <= 0) event.goto(13);
			else {
				//预伤害扳机3(防止伤害)
				get.HSF("event", ["hsdmgBegin2", {
					player: player,
					source: event.source,
					num: event.num,
				}]);
			}
			"step 6"
			if (event.num <= 0) event.goto(13);
			"step 7"
			game.delay(0.7);
			"step 8"
			if (player.hasgjz("shengdun")) {
				player.removegjz("shengdun");
				game.log(player, "的圣盾抵消了", event.num, "点伤害");
				event.num = 0;
				event.goto(11);
			}
			"step 9"
			//伤害结算
			if (event.num == 0) event.goto(11);
			else {
				event.change = (function(e, p) {
					var bo = e.type == "recover";
					var n = (bo ? 1 : -1) * e.num;
					var max = p.maxHp;
					var hp = p.hp;
					var hj = p.hujia;
					if (bo) return Math.min(n, max - hp);
					else {
						var zz = Math.min(0, hj + n);
						if (p.aurasEffed("hs_mlnh")) {
							if (zz + hj + hp < 1) {
								var cg = 1 - hj - hp - zz;
								e.num -= cg;
								zz = 1 - hj - hp;
							}
						}
						return zz;
					}
				})(event, player);
				var obj = {
					num: event.num,
					type: event.type,
					player: event.player,
					source: event.nosource ? undefined : event.source,
					nature: event.nature,
				};
				obj.player[obj.type](obj.source, obj.num, obj.nature).hs_dmgrcv = true;
			}
			"step 10"
			//伤害抖动
			_status.hs_noupdate = false;
			if (event.num != 0 && (event.change != 0 || event.type == "damage")) event.cantri = true;
			player.updatehsfl(event.change);
			"step 11"
			if (event.炸服(evt => evt.player.hp < -40)) return;
			"step 12"
			//伤害事件
			if (event.cantri) get.HSF("event", ["hs" + (event.type == "damage" ? "dmg" : "rcv"), {
				card: event.card,
				player: player,
				source: event.source,
				num: event.num,
			}]);
			"step 13"
			//清除状态
			_status.hs_noupdate = false;
			get.HSF("checkfellow");
		},
		/*代码修改：新增*/
		hs_dmgrcvNotaoe() { //非aoe的群体伤害
			"step 0"
			event.tgs = event.targets.filter(f => event.tgfilter(player, f));
			if (!event.nosort) event.tgs.sort(lib.sort.attendseq);
			event.i = 0;
			event.xhcs = event.tgs.length;
			if (event.xhcs == 0) {
				game.delay();
				return;
			}
			"step 1"
			event.cur = event.tgs[event.i];
			if (event.tgfilter(player, event.cur)) {
				var sz = event.num;
				if (typeof sz == "function") sz = sz(player, event.cur);
				if (event.line) event.source.HSline(event.cur, "green");
				event.cur.hs_dmgrcv(sz, event.source, event.type, event.nature, event.card, event.cards);
			}
			"step 2"
			event.i++;
			if (event.i < event.xhcs) event.goto(1);
		},
	},
	constants: constant,
	get: hsget,
	funcs: funcs,
	eval_heroskill(name, obj, p) { //生成英雄技能
		if (!obj) {
			get.hs_alt(name + "没有详细内容！");
			return;
		}
		lib.skill[name] = get.copy(mb);
		delete lib.skill[name].eff;
		lib.translate[name] = obj[0];
		lib.translate[name + "_info"] = obj[1];
		if (obj[1].indexOf("召唤") >= 0) lib.skill[name].summoneff = true;
		lib.skill[name].rnature = obj[2];
		if (get.HSA("diy").includes(obj[2])) lib.skill[name].diy = true;
		lib.skill[name].cost = obj[3];
		let effect = obj[4];
		if (typeof effect == "string") effect = [effect];
		lib.skill[name].effect = get.hsrfunc(effect);
		if (obj[5]) {
			let f = function(str, pp) {
				if (str == "all") lib.skill[name].filterT = lib.filter.all;
				else if (str.indexOf("function") == 0) eval("lib.skill[name].filterT=str");
				else lib.skill[name].filterT = get.strfunc("card,player,target", "return player.sctp('" + str + "',target);");
			};
			let g = function(a) {
				var mm = a.split(":")[1];
				if (a.indexOf("F:") == 0) f(mm, (p || game.me));
				else if (a.indexOf("f:") == 0) {
					lib.skill[name].extrafilter = get.strfunc("player", mm);
				} else if (a.indexOf("R:") == 0) {
					if (mm.indexOf("function") == 0) eval("lib.skill[name].randomHT=" + mm + ";");
					else lib.skill[name].randomHT = get.strfunc("player", "return player.sctp('" + mm + "').randomGet();");
				}
			};
			if (typeof obj[5] == "string") g(obj[5]);
			else {
				g(obj[5][0]);
				var mk = obj[5][1];
				if (mk.indexOf("function") == 0) eval("lib.skill[name].hrskai=str");
				else lib.skill[name].hrskai = get.strfunc("target", "var player=get.player();" + mk);
			}
		}
		if (obj[6]) lib.skill[name].ai = obj[6];
		lib.skill[name].filter = function(event, player) {
			if (event.isMine() && !player.presshrskbt) {
				//console.log("情况1");
				return false;
			}
			var skill = player.heroskill;
			if (!skill.available) {
				//console.log("使用过");
				return false;
			}
			if (player.HSF("mana") < skill.cost) {
				//console.log("法力不足");
				return false;
			}
			if (lib.skill[skill.skill].summoneff && player.hs_full()) {
				//console.log("没空召怪");
				return false;
			}
			if (skill.filterTarget && !game.hasPlayer(target => {
					return player.HSF("canbetarget", [null, target, "heroskill"]) && skill.filterTarget(null, player, target);
				})) {
				//console.log("无目标");
				return false;
			} else if (skill.randomHT && !skill.randomHT(player)) return false;
			else if (skill.extrafilter && !skill.extrafilter(player)) return false;
			else return true;
		};
	},
	heroskill: heroskill,
	shijian: {
		//重要事件内容
		baseinit() { //基础初始化
			//卡牌导入游戏
			hearthstone.cardPack.mode_RD = Object.keys(hearthstone.cardPack.monsterRD).map(i => hearthstone.funcs.createrd(i));
			for (let i in hearthstone.loadTrans) lib.translate[i] = hearthstone.loadTrans[i];
			for (let i in hearthstone.rdrd_card.spell) hearthstone.cardPack.spel_RD.add(i);
			for (let i in hearthstone.rdrd_card.trap) hearthstone.cardPack.trap_RD.add(i);
			for (let i in hearthstone.rdrd_card.weapon) hearthstone.cardPack.weap_RD.add(i);
			//其他js的内容转入lib，然后删掉
			lib.hearthstone = get.copy(window.hearthstone);
			delete window.hearthstone;
			//导入角色，技能和翻译
			for (let i in lib.hearthstone.player) lib.element.player[i] = lib.hearthstone.player[i];
			for (let i in lib.hearthstone.card) lib.element.card[i] = lib.hearthstone.card[i];
			for (let i in lib.hearthstone.content) lib.element.content[i] = lib.hearthstone.content[i];
			for (let i in lib.hearthstone.get) get[i] = lib.hearthstone.get[i];
			//导入部分不可或缺的自定义函数
			get.HSF("createrd"); //给所有怪兽添加描述、卡图
			get.HSF("qwe"); //新增属性势力
			lib.hearthstone.css_editdeck = lib.init.css(`${basic.extensionDirectoryPath}explore/style/`, 'editdeck');
			ui.arena.classList.add("hs_preinit");
		},
		preinit(trigger) { //设置检查
			//如果是开局，跳过，开局不抽牌
			if (trigger.name == "gameDraw") trigger.cancel();
			//如果区域有牌（非乱斗模式才有可能），弃掉所有牌
			game.me.discard(game.me.getCards("hej"));
			game.me.next.discard(game.me.next.getCards("hej"));

			_status.hs_entergame = true;
			//如果装了十周年，关掉，然后重启
			if (game.hasExtension("十周年UI")) {
				get.hs_alt("炉石普通：本扩展未适配十周年UI！已为您关闭十周年UI扩展，自动重启。");
				game.saveConfig("extension_十周年UI_enable", false);
				game.reload();
				return;
			}
			//关闭伤害抖动
			lib.config.damage_shake = false;
			//关闭历史记录栏
			if (lib.config.show_log != "off") {
				game.saveConfig("show_log", "off");
				ui.arenalog.style.display = "none";
				ui.arenalog.innerHTML = "";
			}
			//布局改成新版
			if (lib.config.layout != "nova") {
				game.saveConfig("layout", "nova");
				game.reload();
				return;
			}
			//手牌显示改成默认
			ui.arena.classList.remove("oblongcard");
			ui.window.classList.remove("oblongcard");
			//边框改成宽
			if (lib.config.player_border != "wide") {
				lib.config.player_border = "wide";
				ui.window.dataset.player_border = "wide";
			}
			//高度改成矮
			if (lib.config.player_height != "short") {
				ui.arena.dataset.player_height_nova = "short";
				ui.arena.classList.remove("uslim_player");
				ui.arena.classList.remove("lslim_player");
				ui.arena.classList.remove("slim_player");
			}
			//玩家添加攻击力的div
			game.countPlayer(function(current) {
				current.node.atk = ui.create.div(".hs_atk", current);
				current.node.atk.hide();
				current.uninit();
			});
			//载入css样式
			ui.arena.classList.add("hscss");
			ui.arena.classList.add("hs1me");
			ui.arena.classList.add("hs1enemy");
			lib.hearthstone.css_common = lib.init.css(`${basic.extensionDirectoryPath}explore/style/`, "common");
			var css = window.decadeUI ? 'HS_decade' : 'HS';
			lib.hearthstone.css_mode = lib.init.css(`${basic.extensionDirectoryPath}explore/style/`, css);
			lib.hearthstone.css_mode.mode = css;
			if (get.HSF("cfg", ["hs_big_img"])) {
				ui.arena.classList.add("hs_big_img");
				_status.big_img = true;
				lib.hearthstone.css_big_img = lib.init.css(`${basic.extensionDirectoryPath}explore/style/`, "big_img");
			}
		},
		init() { //游戏初始化(给怪随从卡加ai，制作相应的随从，增加排序方式，设置ai默认卡组等)
			//<--感谢群友"三十功名尘与土"提供的自适应缩放代码
			var scalef = () => {
				var scale = Math.min(window.innerWidth / 1070, window.innerHeight / 596) + 0.001;
				game.documentZoom = scale;
				lib.config.extension_炉石普通_HS_customzoom = scale / game.deviceZoom;
				ui.updatez();
			}
			//如果不是移动端，缩放时自动改变缩放倍数
			if (!lib.device) window.addEventListener('resize', scalef);
			//200ms后更改缩放倍数，然后清除定时器
			var inter = setInterval(function() {
				var scale = Math.min(window.innerWidth / 1070, window.innerHeight / 596) + 0.001;
				if (game.documentZoom != scale) {
					scalef();
					clearInterval(inter);
				}
			}, 200);
			//-->
			//更改背景音乐
			hs_Music();
			//记录下directgain函数，暂不做打算
			lib.hearthstone.drgf = lib.element.player.directgain;
			//冰属性伤害不触发弃牌
			lib.skill.icesha_skill.filter = function() {
				return false
			};
			game.swapPlayer = function(player, player2) { //换人函数
				var swap2 = function(a, arr) { //交换me和enemy的类名
					if (Array.isArray(arr)) arr.forEach(name => swap2(a, name));
					else {
						if (Array.isArray(a)) {
							a.forEach(div => swap2(div, arr));
						} else {
							if (a.classList.contains("me" + arr)) {
								a.classList.remove("me" + arr);
								a.classList.add("enemy" + arr);
							} else {
								a.classList.remove("enemy" + arr);
								a.classList.add("me" + arr);
							}
						}
					}
				};
				if (player2) {
					if (player == game.me) game.swapPlayer(player2);
					else if (player2 == game.me) game.swapPlayer(player);
				} else {
					if (player == game.me) return;
					if (player.isMin()) {
						get.hs_alt("game.swapPlayer:不能和随从交换控制权");
						return;
					}
					var players = game.players;
					for (let i = 0; i < players.length; i++) {
						players[i].style.transition = 'all 0s';
					}
					game.addVideo('swapPlayer', player, get.cardsInfo(player.getCards('h')));

					_status.hsbo = !_status.hsbo;
					var num = 7;
					//交换英雄技能、水晶、武器
					players.forEach(p => {
						if (p.isMin()) {
							if (p.dataset.enemy == '0') p.dataset.enemy = '1';
							else p.dataset.enemy = '0';
							if (parseInt(p.dataset.position) > num) p.dataset.position = parseInt(p.dataset.position) - num + "";
							else p.dataset.position = parseInt(p.dataset.position) + num + "";
						} else {
							if (p == game.me) {
								p.dataset.position = "1";
							} else {
								p.dataset.position = "0";
							}
							p.heroskill.style.transition = 'all 0s';
							p.mana.style.transition = 'all 0s';
							if (p.data_weapon) {
								p.data_weapon.style.transition = 'all 0s';
								swap2(p.data_weapon, ["wp"]);
							}
							swap2(p.heroskill, ["heroskill"]);
							swap2(p.mana, ["mana"]);
						}
					});
					get.HSF("arrange");
					//交换敌人的手牌数显示
					var c1 = lib.hearthstone.mecard;
					lib.hearthstone.mecard = lib.hearthstone.enemycard;
					lib.hearthstone.enemycard = c1;
					var c2 = ui.hs_enemycount.querySelector(".card");
					var c3 = c2 == c1 ? lib.hearthstone.mecard : lib.hearthstone.enemycard;
					ui.hs_enemycount.removeChild(c2);
					ui.hs_enemycount.appendChild(c3);
					player.appendChild(player.node.count);
					player.node.count.className = "count";
					ui.hs_enemycount.appendChild(game.me.node.count);
					game.me.node.count.className = "ec";
					ui.hs_medeckcontainer.style.transition = 'all 0s';
					ui.hs_enemydeckcontainer.style.transition = 'all 0s';
					ui.hs_medeckbox.style.transition = 'all 0s';
					ui.hs_enemydeckbox.style.transition = 'all 0s';
					swap2([ui.hs_medeckcontainer, ui.hs_enemydeckcontainer], "deckcontainer");
					swap2([ui.hs_medeckbox, ui.hs_enemydeckbox], "deckbox");
					swap2([game.me.heroskill.pos, player.heroskill.pos], "heroskillpos");
					game.me.discardPile.classList.remove("hs_me");
					game.me.discardPile.classList.add("hs_enemy");
					player.discardPile.classList.remove("hs_enemy");
					player.discardPile.classList.add("hs_me");
					//交换奥秘区
					game.me.secretbd.classList.remove("secretmebd");
					game.me.secretbd.classList.add("secretenemybd");
					player.secretbd.classList.remove("secretenemybd");
					player.secretbd.classList.add("secretmebd");
					if (_status.currentPhase == game.enemy) {
						ui.hs_endbtn.innerHTML = "回合结束";
						ui.hs_endbtn.classList.remove("hs_oppo");
					} else {
						ui.hs_endbtn.innerHTML = "对手回合";
						ui.hs_endbtn.classList.add("hs_oppo");
					}
					get.HSF("clickmana", [false]);
					get.HSF("arrange");

					game.me.node.handcards1.remove();
					game.me.node.handcards2.remove();
					game.enemy = game.me;
					game.me = player;
					ui.handcards1 = player.node.handcards1.addTempClass('start').fix();
					ui.handcards2 = player.node.handcards2.addTempClass('start').fix();
					ui.handcards1Container.appendChild(ui.handcards1);
					ui.handcards2Container.appendChild(ui.handcards2);

					var ele = document.querySelector("#handcards1>div");
					ele.style.transition = "all 0.5s";
					ele.towork = true;

					ui.updatehl();
				}
				if (game.me.isAlive()) {
					if (ui.auto) ui.auto.show();
					//将transition都还原
					setTimeout(function() {
						for (let i = 0; i < players.length; i++) {
							players[i].style.transition = '';
							if (!players[i].isMin()) {
								players[i].heroskill.style.transition = '';
								players[i].mana.style.transition = '';
								if (players[i].data_weapon) players[i].data_weapon.style.transition = '';
							}
						}
						ui.hs_medeckcontainer.style.transition = '';
						ui.hs_enemydeckcontainer.style.transition = '';
						ui.hs_medeckbox.style.transition = '';
						ui.hs_enemydeckbox.style.transition = '';
					}, 100);
				}
			};
			//左右互搏的自动换人
			lib.skill.hs_autoswap = {
				trigger: {
					player: "phaseBegin",
				},
				filter(event, player) {
					var mode = get.HSF("cfg", ["HS_duelMode"]);
					if (mode == "single") {
						if (event.player != game.me) return true;
					}
				},
				silent: true,
				content() {
					game.swapPlayer(player);
					player.addTempSkill("hs_autoswap_msk");
				},
			};
			//移除技能时换回去
			lib.skill.hs_autoswap_msk = {
				onremove(player) {
					game.swapPlayer(player.getOppo());
				},
			};
			game.addGlobalSkill("hs_autoswap");
			//不播放伤害抖动
			lib.config.damage_shake = false;
			//确定场地
			ui.arena.classList.add("hs_kaichang");
			ui.arena.classList.add("hs_kaichang2");
			//拼装英雄技能
			lib.hearthstone.base_heroskill = {};
			for (let i in lib.hearthstone.heroskill) {
				var obj = lib.hearthstone.heroskill[i];
				var name = "hs_hero_legend_" + i;
				lib.hearthstone.eval_heroskill(name, obj);
				lib.hearthstone.base_heroskill[name] = lib.skill[name];
			}
			//生成缺省的随从技能
			get.HSF("tl2");
			//根据随从卡牌制作随从
			for (let i of lib.hearthstone.cardPack.mode_RD) {
				var name = get.HSF("tr", [i]);
				var info = get.info({
					name: i
				});
				if (!info) {
					get.hs_alt(i + "导入monster失败");
					lib.card[i] = {};
				}
				for (let j in lib.hearthstone.monster) {
					lib.card[i][j] = lib.hearthstone.monster[j];
				}
				get.HSF("setAi", [i]);
				lib.character[name] = ["none", (info.rnature || "hs_neutral"), info.HP, [],
					["noDefaultPicture", "minskin", `ext:${basic.extensionName}/resource/asset/card/${i}.jpg`, "des:" + lib.translate[i + "_info"]]
				];
				lib.translate[name] = lib.translate[i];
			}
			var tempa = lib.hearthstone.cardPack.spel_RD.concat(lib.hearthstone.cardPack.trap_RD);
			for (let i of tempa) {
				get.HSF("setResult", [i, lib.hearthstone.cardPack.trap_RD.includes(i)]);
			}
			lib.sort.attendseq = function(a, b) { //按入场顺序排序
				var seq = _status.hsAttendSeq;
				var p1 = a.early || 0;
				var p2 = b.early || 0;
				if (p1 > p2) return -1;
				else if (p1 < p2) return 1;
				var p1 = a.later || 0;
				var p2 = b.later || 0;
				if (p1 > p2) return 1;
				else if (p1 < p2) return -1;
				if (seq.ind(a) > seq.ind(b)) return 1;
				else return -1;
			};
			lib.sort.hs_duel = function(m, n) { //卡片排序
				var a = m,
					b = n;
				if (typeof a == "string") a = {
					name: m
				};
				if (typeof b == "string") b = {
					name: n
				};
				var info1 = get.info(a),
					info2 = get.info(b);

				var c1 = info1.cost,
					c2 = info2.cost;
				if (c1 > c2) return 1;
				if (c1 < c2) return -1;
				var type = ["HS_minor", "HS_spell", "HS_weapon"];
				var subtype = ["HS_normal", "HS_effect", "HS_normalS", "HS_secret"];
				if (type.indexOf(get.type(a)) > type.indexOf(get.type(b))) return 1;
				if (type.indexOf(get.type(a)) < type.indexOf(get.type(b))) return -1;
				if (subtype.indexOf(get.subtype(a)) > subtype.indexOf(get.subtype(b))) return 1;
				if (subtype.indexOf(get.subtype(a)) < subtype.indexOf(get.subtype(b))) return -1;

				if (info1.hs_legend && !info2.hs_legend) return 1;
				if (!info1.hs_legend && info2.hs_legend) return -1;
				if (info1.rnature != info2.rnature) {
					if (!info1.rnature || info1.rnature == "hs_neutral") return 1;
					else if (!info2.rnature || info2.rnature == "hs_neutral") return -1;
					else {
						if (info1.rnature > info2.rnature) return 1;
						if (info1.rnature < info2.rnature) return -1;
					}
				}
				if (a.name > b.name) return 1;
				if (a.name < b.name) return -1;
				if (get.hstype(a) == "card") return parseInt(a.cardid) - parseInt(b.cardid);
				if (a > b) return 1;
				if (a < b) return -1;
			};
			if (!lib.storage.hs_deck) lib.storage.hs_deck = {};
			//以下是各决斗者的默认卡组
			var deck = lib.hearthstone.constants.dftDeck;
			for (let i in deck) {
				lib.storage.hs_deck[i + "_ai"] = deck[i];
			}
			//更改更新手牌函数，用于自动折叠手牌
			const ins = function(str) {
				str = str.replace(new RegExp("112", "g"), "(ui.arena.classList.contains('hs_view')?70:(ui.arena.classList.contains('hs_exchange')?(ui.arena.classList.contains('hs_first')?144:100):Math.max(44,120-10*game.me.countCards('h'))))");
				return str;
			};
			ui.updatehl = lib.element.HSstring.nf(ui.updatehl, ins);
		},
		postinit() { //剩余设置及ui
			lib.hearthstone.css_func = document.createElement("style");
			lib.hearthstone.css_func.innerHTML = get.HSF("css_func");
			document.head.appendChild(lib.hearthstone.css_func);

			if (!_status.connectMode && get.HSF("cfg", ["HS_debug"])) ui.brawfo = ui.create.system("调试按钮", function() {
				if (true && this.inter) {
					clearInterval(this.inter)
					delete this.inter;
					if (_status.customcss_e) document.head.removeChild(_status.customcss_e);
					delete _status.customcss_e;
					delete _status.customcss
				} else {
					this.inter = setInterval(function() {
						if (lib.hearthstone.css_editdeck) lib.hearthstone.css_editdeck.href = `${basic.extensionDirectoryPath}explore/style/editdeck.css?time=${Math.random()}`;
						if (lib.hearthstone.css_common) lib.hearthstone.css_common.href = `${basic.extensionDirectoryPath}explore/style/common.css?time=${Math.random()}`;
						if (lib.hearthstone.css_mode) lib.hearthstone.css_mode.href = `${basic.extensionDirectoryPath}explore/style/${lib.hearthstone.css_mode.mode}.css?time=${Math.random()}`;
						if (lib.hearthstone.css_big_img) lib.hearthstone.css_big_img.href = `${basic.extensionDirectoryPath}explore/style/big_img.css?time=${Math.random()}`;
						if (_status.customcss) {
							if (!_status.customcss_e) {
								_status.customcss_e = document.createElement("style");
								document.head.appendChild(_status.customcss_e);
							}
							_status.customcss_e.innerHTML = _status.customcss;
						}
					}, 1000);
				}
			});
			//下面的代码加上后，游戏开始编辑卡组时，点卡牌可以看详情
			var cfd = ui.create.dialog;
			ui.create.dialog = function() {
				var res = cfd.apply(ui, arguments);
				if (res && res.buttons && res.buttons.length) {
					res.buttons.forEach(i => i.listen(function() {
						get.HSF("morefocus", [this]);
					}));
				}
				return res;
			};
			document.onclick = function() {
				var items = Array.from(document.querySelectorAll(".card.rdcreated"));
				if (items && items.length) items.forEach(i => {
					if (!i.rd_checked) {
						i.listen(function() {
							i.rd_checked = true;
							get.HSF("morefocus", [this]);
						});
					}
				});
			};
			get.HSF("morezone");
			lib.hearthstone.upF = lib.element.player.update;
			lib.hearthstone.chhF = lib.element.player.changeHujia;
			game.zhu = game.me;
			game.enemy = game.me.next;
			game.me.classList.add("bright");
			game.enemy.classList.add("bright");
			game.me.identity = "zhu";
			game.enemy.identity = "fan";
			game.me.side = true;
			game.enemy.side = false;
			var list = get.HSA("duelist");
			list = list.concat(get.HSA("skin"));
			list.forEach(i => {
				let job = lib.character[i][1];
				let heroskill = lib.hearthstone.base_heroskill;
				let tg;
				//添加基础英雄技能
				for (let j in heroskill) {
					if (heroskill[j].rnature == job) {
						tg = j;
						break;
					}
				}
				if (!tg) {
					get.hs_alt("找不到" + job + "对应的英雄技能！");
					return;
				}
				lib.character[i][3] = [tg];
			});
			_status.characterList = list;
		},
		entermode() {
			var next = game.createEvent('entermode', false);
			next.setContent(function() {
				"step 0"
				var mode = get.HSF("cfg", ["HS_duelMode"]);
				if (mode == "testing") {
					_status.fixed_mode = mode;
					lib.hearthstone.shijian.testing();
					event.finish();
				} else lib.hearthstone.shijian.chooseCharacter();
				"step 1"
				var mode = get.HSF("cfg", ["HS_duelMode"]);
				if (mode == "watching") {
					get.HSF("newdeckbuilder");
				} else {
					if (mode == "brawl") lib.hearthstone.shijian.brawl();
					else if (mode == "challenge") lib.hearthstone.shijian.challenge();
					else lib.hearthstone.shijian.deckBuild();
				}
			});
		},
		chooseCharacter() { //选人
			var next = game.createEvent('chooseCharacter', false);
			next.showConfig = true;
			next.setContent(function() {
				"step 0"
				var list = _status.characterList;
				event.list = list;
				ui.arena.classList.add('choose-character');

				//到此结束
				get.HSF("Aud2", ["选英雄"]);
				var pro = "请选择要出场的决斗者";
				var dialog = ui.create.dialog(pro, 'hidden');
				dialog.add('0/1');
				dialog.add([list.slice(0), 'character']);
				dialog.open();
				game.me.chooseButton(dialog, true);
				"step 1"
				game.me.init(result.links[0]);
				game.me.update();
				game.me.node.hp.innerHTML = game.me.hp;
				event.list.randomSort();
				const cdmode = get.HSF("cfg", ["HS_duelMode"]);
				const cofg = get.HSF("cfg", ["HS_aichosen"]);
				_status.fixed_mode = cdmode;
				let tbo = cofg == "player";
				if (cdmode == "watching") event.goto(3);
				else {
					if (cdmode == "challenge") {
						event.list = get.HSF("hs_preboss");
						tbo = true;
					}
					const p = tbo ? game.me : game.enemy;
					const pro = tbo ? "请选择电脑要出场的决斗者" : "请选择要出场的决斗者";
					var dialog = ui.create.dialog(pro, 'hidden');
					dialog.add('0/1');
					dialog.add([event.list, 'character']);
					dialog.open();
					p.chooseButton(dialog, true).set("ai", () => Math.random());
				}
				event.cdmode = cdmode;
				"step 2"
				if (event.cdmode == "challenge") {
					_status.brawlboss = result.links[0];
				} else {
					game.enemy.init(result.links[0]);
					game.enemy.update();
					game.enemy.node.hp.innerHTML = game.enemy.hp;
				}
			});
		},
		testing() { //测试卡效
			var next = game.createEvent('testing', false);
			next.setContent(function() {
				const obj = get.HSA("testing")[0];
				_status.hs_testing_obj = obj;
				//选人
				game.me.init(obj.me);
				game.me.update();
				game.me.node.hp.innerHTML = game.me.hp;
				game.enemy.init(obj.enemy);
				game.enemy.update();
				game.enemy.node.hp.innerHTML = game.enemy.hp;
				//设置场景
				const func = function(str) {
					const p = game[str];
					const keyHanders = {
						startmana(player, obj) {
							get.HSF("作弊", ["水晶", obj, player]);
						},
						heroskill_usable(player, obj) {
							get.HSF("作弊", ["code", function(player) {
								player.heroskill.extrausable = obj;
							}, player]);
						},
						zerocost(player, obj) {
							get.HSF("作弊", ["code", function(player) {
								player.addaurasbuff({
									name: "hs_cost",
									value: 0,
									subtype: "final",
									ghfilter(card, fellow, target) {
										return target == fellow.getLeader();
									},
								});
							}, player]);
						},
						deck(player, obj) {
							player.deckCards = [];
							for (const name of obj) {
								player.deckCards.addArray(get.hs_deck2(name));
							}
						},
						hand(player, obj) {
							for (const name of obj) {
								get.HSF("作弊", ["获得", name, player])
							}
						},
						fellow(player, obj) {
							for (const name of obj) {
								get.HSF("作弊", ["特召", name, player]);
							}
						},
						secret(player, obj) {
							for (const name of obj) {
								get.HSF("作弊", ["奥秘", name, player]);
							}
						},
						weapon(player, obj) {
							get.HSF("作弊", ["武器", obj, player]);
						},
					};
					const keys = Object.keys(keyHanders);
					for (const key of keys) {
						const rkey = str + key;
						if (obj[rkey]) {
							keyHanders[key](p, obj[rkey]);
						}
					}
					for (const key of ["startmana", "heroskill_usable", "zerocost"]) {
						if (obj[key]) {
							keyHanders[key](p, obj[key]);
						}
					}
				};
				func("me");
				func("enemy");
				//其他代码
				if (obj.othercode) {
					_status.brawlcommd = [];
					_status.brawlcommd.push(function() {
						obj.othercode();
					});
				}
				//选标题
				get.HSF("作弊", ["code", function(player) {
					game.me.chooseControl("ok", true).set("dialog", [obj.dialog, obj.intro]);
				}, player]);
			});
		},
		brawl() { //乱斗模式
			var next = game.createEvent('brawl', false);
			next.setContent(function() {
				"step 0"
				event.list = get.HSA("brawlscene").map(i => i.name);
				game.me.chooseControlList("选一个要玩的乱斗", event.list, true);
				"step 1"
				event.det = get.HSA("brawlscene")[result.index];
				event.stage = event.det.name;
				game.me.chooseControl("ok", true).set("dialog", [event.stage, event.det.intro]);
				"step 2"
				var deck = event.det.deck;
				var build = function(p, d) {
					p.deckCards = [];
					for (const n in d) {
						if (n == "certain") {
							for (let i = 0; i < d.certain[1]; i++) {
								p.deckCards.add(get.chscard(d.certain[0]));
							}
						} else if (n == "randomjobcard") {
							for (let i = 0; i < d.randomjobcard; i++) {
								var job = p.group;
								var kc = get.hskachi("all", (c, info) => info.rnature == job);
								p.deckCards.add(get.chscard(kc.randomGet()));
							}
						} else if (n == "randomneutral") {
							for (let i = 0; i < d.randomneutral; i++) {
								var job = p.group;
								var kc = get.hskachi("all", (c, info) => !info.rnature);
								p.deckCards.add(get.chscard(kc.randomGet()));
							}
						} else if (n == "randomSpell") {
							for (let i = 0; i < d.randomSpell; i++) {
								var job = p.group;
								var kc = get.hskachi("HS_spell", (c, info) => info.rnature == job);
								p.deckCards.add(get.chscard(kc.randomGet()));
							}
						} else if (n == "random") {
							for (let i = 0; i < d.random; i++) {
								const job = p.group;
								var kc = get.hskachi("all", (c, info) => !info.rnature || info.rnature == job);
								p.deckCards.add(get.chscard(kc.randomGet()));
							}
						}
					}
				};
				build(game.me, deck);
				build(game.enemy, deck);
				const type = event.det.type;
				if (type == "specialrule") {
					for (var i in event.det.rules) {
						if (i == "phaseDraw") _status.hs_specialPhaseDraw = event.det.rules[i];
					}
				}
			});
		},
		challenge() { //挑战首领
			var next = game.createEvent('challenge', false);
			next.setContent(function() {
				const zwname = get.translation(_status.brawlboss);
				event.stage = "挑战" + zwname;
				const det = get.HSA("challengescene").find(i => i.name == event.stage);
				const diy = det.diy;
				if (diy) game.enemy.classList.add("diyleader");
				get.HSF("hs_boss", [zwname, det.prepare, det.meprepare]);
			});
		},
		deckBuild() { //组卡
			var next = game.createEvent('deckBuild', false);
			next.setContent(function() {
				get.hs_deck(game.me);
				get.hs_deck(game.enemy);
				if (!_status.auto && !get.HSF("cfg", ["HS_nobuilder"])) get.HSF("newdeckbuilder");
			});
		},
		reach() { //开始进入炉石世界
			var next = game.createEvent('reach', false);
			next.setContent(function() {
				game.countPlayer(function(current) {
					lib.element.HSleader.create(current);
				});
				ui.control.style.transitionDuration = '0s';
				ui.refresh(ui.control);
				ui.arena.classList.remove('choose-character');
				setTimeout(function() {
					ui.control.style.transitionDuration = '';
				}, 500);
				"step 4"
				//主玩家机制
				_status.hsbo = Math.random() < 0.5;
				var id1 = get.hs_id(game.me);
				var id2 = get.hs_id(game.enemy);
				_status.hsAttendSeq = [id1, id2];
				if (!_status.hsbo) _status.hsAttendSeq.reverse();
				_status.hsAttendSeq.log = {};
				_status.hsAttendSeq.log2 = id => _status.hsAttendSeq.log[id];
				_status.hsAttendSeq.ind = function(o) {
					return this.indexOf(get.hs_id(o));
				};
				_status.hsAttendSeq.ad = function(o) {
					const that = this;
					if (!o || o.length === 0) return;
					if (o.length) o.forEach(i => that.add(i));
					else {
						var id = get.hs_id(o);
						if (id) {
							that.add(id);
							_status.hsAttendSeq.log[id] = o;
						}
					}
				};
				_status.hsAttendSeq.cl = function(objs) {
					const that = this;
					if (objs) {
						if (objs.length) {
							objs.forEach(j => _status.hsAttendSeq.cl(j));
							return;
						} else {
							var ind = that.ind(objs);
							if (ind >= 0) {
								delete _status.hsAttendSeq.log[that[ind]];
								that[ind] = null;
							}
						}
					}
					var ids = game.me.sctp("field").concat(game.dead).reduce((x, y) => {
						var res = [];
						res.add(get.hs_id(y));
						if (y.buff && y.buff.length) res.addArray(y.buff.map(i => get.hs_id(i)));
						x = x.concat(res);
						return x;
					}, []);
					_status.hsAttendSeq.forEach(i => {
						if (null == i) _status.hsAttendSeq.remove(i);
						if (!ids.includes(i)) {
							delete _status.hsAttendSeq.log[i];
							_status.hsAttendSeq.remove(i);
						}
					});
				};
				_status.hs_dead_All = {}; //死者名单
				_status.hs_dead_All[game.me.playerid] = [];
				_status.hs_dead_All[game.enemy.playerid] = [];
				_status.hs_dead = {}; //本回合死亡名单
				_status.hs_dead[game.me.playerid] = [];
				_status.hs_dead[game.enemy.playerid] = [];
				_status.hs_state = {
					deadfellow: 0,
				};
			});
		},
		XJBG() { //瞎xx改(专属技能，场地区域，备份当前背景，添加"查看场上"按钮，角色添加专属技能，系统写入剩下的自定义函数)
			ui.hs_endbtn = ui.create.div(".hs_endbtn", ui.arena);
			ui.hs_endbtn.innerHTML = "回合结束";
			ui.hs_endbtn.listen(function() {
				if (game.me.HSF("phaseUse")) {
					_status.hsbattling = false;
					if (_status.hs_pressatker) _status.hs_pressatker.classList.remove("hs_atkprepare");
					delete _status.hs_pressatker;
					delete _status.hs_pressdef;
					ui.click.cancel();
				}
			});
			//定时任务
			ui.hs_endbtn.inter = setInterval(function() {
				get.HSF("checkui");
				if (_status.hs_starttime && _status.currentPhase?.aurasEffed("hs_Nozdormu")) {
					const now = new Date();
					if (now - _status.hs_starttime >= 15000) {
						const evt = _status.event.getParent("phaseUse");
						if (evt) evt.skipped = true;
					}
				}
			}, 500);
			//创建牌库区、法力水晶、英雄技能
			const createSecret = function(side) { //创建牌库区
				var p = game[side];
				p.secrets = [];
				let secretbd = ui.create.div(`.secretbd.secret${side}bd`, ui.arena);
				let secret1 = ui.create.div(".secret", secretbd);
				let secret2 = ui.create.div(".secret", secretbd);
				let secret3 = ui.create.div(".secret", secretbd);
				let secret4 = ui.create.div(".secret", secretbd);
				/*代码修改：现在pos和挂奥秘的顺序有关*/
				secret1.dataset.pos = "x";
				secret2.dataset.pos = "x";
				secret3.dataset.pos = "x";
				secret4.dataset.pos = "x";
				secret1.dataset.rnature = "hs_mage";
				secret2.dataset.rnature = "hs_hunter";
				secret3.dataset.rnature = "hs_paladin";
				secret4.dataset.rnature = "hs_rogue";
				var f = function() {
					//代码修改：如果点的是敌方奥秘区，无反应
					if (!game.me.secretbd.list.includes(this)) return;
					var job = this.dataset.rnature;
					/*代码修改，将c改成c.linkCard[0]，这样可以显示详情，at(-1)是显示最近的奥秘*/
					var cd = game.me.secrets.filter(c => get.rnature(c.linkCard[0]) == job).at(-1);
					if (cd) get.HSF("morefocus", cd.linkCard);
				}
				secret1.listen(f);
				secret2.listen(f);
				secret3.listen(f);
				secret4.listen(f);
				p.secretbd = secretbd;
				p.secretbd.list = [secret1, secret2, secret3, secret4];
			};
			const createDeck = function(side) { //创建牌库区
				let udeckcontainer = `hs_${side}deckcontainer`;
				let cdeckcontainer = `.${side}deckcontainer`;
				let deckcontainer = ui.create.div(cdeckcontainer, ui.arena);
				let udeckbox = `hs_${side}deckbox`;
				let cdeckbox = `.${side}deckbox`;
				let udeck = `hs_${side}deck`;
				let u = `hs_${side}`;

				ui[udeckbox] = ui.create.div(cdeckbox, ui.arena);
				ui.arena.insertBefore(ui[udeckbox], deckcontainer);
				ui[udeckcontainer] = deckcontainer;
				ui[udeck] = ui.create.player(deckcontainer, true);
				let decklencontainer = ui.create.div(".decklencontainer", ui[udeck]);
				ui[u] = ui.create.player(ui.arena, true);
				ui[u].classList.add(u);
				let bk = get.hscardback(game[side]);
				let path = "url('" + lib.assetURL + "extension/" + bk + "')";
				let cardx = ui.create.card(ui.special, "noclick", true);
				cardx.style.backgroundImage = path;
				cardx.style.backgroundSize = "100% 100%";
				lib.hearthstone[side + "card"] = cardx;

				ui[udeck].node.avatar.show();
				ui[udeck].node.avatar.style.background = path;
				var f = function() {
					if (ui.arena.classList.contains("hs_exchange2")) return;
					var that = ui.arena;
					if (this == ui.hs_medeckcontainer || this == ui.hs_enemydeckcontainer) that = this;
					else that = this.nextSibling;
					that.classList.add("hs_check");
					var count = that.querySelector(".count");
					count.show();
					if (!that.hs_check) that.hs_check = setTimeout(function() {
						delete that.hs_check;
						that.classList.remove("hs_check");
						count.hide();
					}, 3000);
				}
				deckcontainer.listen(f);
				ui[udeck].hide();
				ui[udeck].name = "牌库";
				ui[u].style.transition = "all 0s";
				ui[u].name = "墓地";
				game[side].cardPile = ui[udeck];
				game[side].discardPile = ui[u];
			};
			//法力水晶
			const createMana = function(side) {
				let camana = `.hs_mana.${side}mana`;
				let p = game[side];
				p.mana = ui.create.div(camana, ui.arena, "0");
				p.mana.locked = ui.create.div(".manalk.lock", p.mana);
				p.mana.owed = ui.create.div(".manalk.owe", p.mana);
				p.mana.locked.hide();
				p.mana.owed.hide();
			};
			//英雄技能
			const createHeroskill = function(str) {
				var p = game[str];
				p.heroskill = ui.create.div(".hs_hrsk." + str + "heroskill", ui.arena);
				p.heroskill.frontface = ui.create.div(".frontface", p.heroskill);
				p.heroskill.frontface.zhezhao = ui.create.div(".skillzhezhao", p.heroskill.frontface);
				p.heroskill.backface = ui.create.div(".backface", p.heroskill);
				p.heroskill.pos = ui.create.player(ui.arena, true);
				p.heroskill.pos.name = "移除";
				p.heroskill.pos.classList.add(str + "heroskillpos");
				p.heroskill.skill = lib.character[p.name][3][0];
				p.heroskill.divcost = ui.create.div(".hs_hrskct", p.heroskill.frontface, p.HSF("hs_num") + "");
				get.HSF("longP", [p.heroskill, function() {
					get.HSF("morefocus", [this]);
				}]);
				p.heroskill.listen(function(e) {
					if (!this.classList.contains("meheroskill")) return;
					if (game.me.HSF("phaseUse")) {
						if (game.me.HSF("canhrsk")) ui.click.skill(this.skill);
						else {
							if (!game.me.heroskill.available) game.me.HSFT("普通错误");
							else if (game.me.heroskill.cost > game.me.HSF("mana")) game.me.HSFT("法力值不够");
							else if (lib.skill[game.me.heroskill.skill].summoneff && game.me.hs_full()) game.me.HSFT("满场七随从");
							else game.me.HSFT("普通错误");
						}
					}
					e.stopPropagation();
				});
				p.update();
				p.heroskill.init = function(pp, skill) { //初始化英雄技能
					var dire = "heroskill",
						name = skill.replace("_legend", "");
					if (skill.indexOf("hs_leader") == 0) dire = "boss";
					this.frontface.style.backgroundImage = `url('${basic.extensionDirectoryPath}resource/image/${dire}/${name}.jpg')`;
					var info = get.info(skill);
					if (info.diy || skill.indexOf("hs_leader_hs_") == 0) this.classList.add("hs_diyhrsk");
					else this.classList.remove("hs_diyhrsk");
					this.buff = [];
					this.skill = skill;
					this.usable = 1;
					this.used = 0;
					this.hrskai = info.hrskai || function() {
						return 1
					};
					this.extrafilter = info.extrafilter;
					this.filterT = info.filterT;
					this.filterTarget = info.filterT;
					this.ranHT = info.randomHT;
					this.randomHT = info.randomHT;
					this.baseCost = pp.HSF("hs_num", [skill]);
					this.cost = this.baseCost;
					this.name = get.translation(skill);
					this.content = info.effect;
				};
				p.heroskill.init(p, p.heroskill.skill);
			};
			for (let str of ["me", "enemy"]) {
				createSecret(str);
				createDeck(str);
				createMana(str);
				createHeroskill(str);
			}
			get.HSF("checkall", ["hand", "heroskill"]);
			//手牌区缩回原因
			_status.hdcsST = null;
			ui.hs_testfl = ui.create.div(".player.minskin", ui.arena);
			ui.hs_testfl.name = "占位";
			ui.hs_testfl.dataset.position = "d0";
			ui.hs_testfl.num = 2;
			ui.hs_testfl.dataset.enemy = "0";
			ui.hs_testfl.classList.add("testfl");
			ui.hs_surrender = ui.create.div(".surrender", ui.arena);
			ui.hs_surrender.listen(function() {
				var func = get.HSF("surrender");
				if (game.me.HSF("phaseUse")) {
					ui.click.skill("hs_surrender");
				} else {
					var next = game.createEvent("hs_surrender", false);
					next.setContent(func);
				}
			});
			lib.onover.push(get.HSF("nextduel"));
			lib.onover.push(function(bo) {
				if (bo == true) get.HSF("Aud2", ["胜利"]);
				else get.HSF("Aud2", ["失败"]);
			});
			for (let i in lib.hearthstone.constants.ski) {
				lib.skill["rdrd_" + i] = {};
				var ar = lib.hearthstone.constants.ski[i];
				lib.translate["rdrd_" + i] = ar[0];
				lib.translate["rdrd_" + i + "_info"] = ar[1];
			}
			ui.monsterzone = ui.create.div(".monsterzone", ui.arena);
			ui.zonearena = ui.create.div(".zonearena", ui.arena);
			ui.hs_enemycount = ui.create.div(".hs_enemycount", ui.arena);
			ui.hs_enemycount.appendChild(lib.hearthstone.enemycard);
			ui.hs_enemycount.appendChild(game.enemy.node.count);
			game.enemy.node.count.className = "ec";
			var ski = get.HSA("ski");
			for (let i in ski) {
				lib.skill["hshs_" + i] = {};
				var ar = ski[i];
				lib.translate["hshs_" + i] = ar[0];
				lib.translate["hshs_" + i + "_info"] = ar[1];
			}
			var eventFs = { //事件方法
				炸服(func) {
					if (func(this)) {
						get.hs_alt("炉石普通：怀疑你在炸服，游戏强制终止");
						get.HSF("checkwin", [this, true]);
						this.finish();
						return true;
					}
				},
			};
			for (let i in eventFs) {
				lib.element.event[i] = eventFs[i];
			}
			lib.element.content.phaseDraw = function() {
				"step 0"
				get.HSF("checkwin", [event]);
				"step 1"
				if (_status.hs_specialPhaseDraw) {
					_status.hs_specialPhaseDraw(player);
				} else if (!(_status.hs_testing_obj || _status.brawlnophasedraw && player.name == _status.brawlboss)) player.draw();
				"step 2"
				get.HSF("checkdeath");
				"step 3"
				/*修改代码：增加checkhand，修复了托管时手牌不重新调整间距的bug*/
				if (game.me.countCards("h", ca => {
						return lib.filter.filterCard(ca);
					}) && player == game.me) {
					ui.arena.classList.add("hs_view");
					get.HSF("checkhand");
				}
				"step 4"
				get.HSF("think");
				"step 5"
			};
			get.attitude = function(a, b) {
				return a.side == b.side ? 10 : -10;
			};
			_status.hs_willbug = true;
			var nodeintroF = get.nodeintro;
			get.nodeintro = function(node, simple, evt) {
				var resnode = nodeintroF(node, simple, evt);
				if (ui.arena.classList.contains("hscss") && get.hstype(node) == "player" && game.players.includes(node)) {
					var cost = 0;
					if (node.isMin()) {
						var buffs = node.buff.filter(i => i.iswork() && i.type == "hs_power");
						buffs.forEach(i => {
							cost += i.value;
						});
					} else cost = node.countFq();
					if (cost > 0) resnode.add("法强：<span class='bluetext'>" + cost + "</span>");
				}
				return resnode;
			};
			var next = game.createEvent("XJBG", false);
			next.setContent(function() {
				"step 0"
				if (_status.brawlcommd && _status.brawlcommd.length) {
					_status.brawlcommd.forEach(i => i());
				}
				ui.arena.hs_myturn = ui.create.div(".hs_myturn", ui.arena);
				ui.arena.hs_myturn.rune = ui.create.div(".hs_rune", ui.arena.hs_myturn);
				ui.arena.hs_myturn.img = ui.create.div(".hs_img", ui.arena.hs_myturn);
				ui.arena.hs_myturn.img.text = ui.create.div(".hs_img_text", ui.arena.hs_myturn.img, "你的回合");
				ui.arena.classList.remove("hs_preinit");
				ui.morezone.hide();
				ui.background.style.transition = "all 1s";
				document.body.style.transition = "all 1s";
				ui.background.style.filter = "brightness(0%)";
				document.body.style.filter = "brightness(0%)";
				ui.arena.classList.add("hs_black");
				"step 1"
				"step 2"
				ui.create.div(".bright.hs_vs", ui.arena);
				var n1 = ui.create.div(".bright.hs_mefull", ui.arena);
				var n2 = ui.create.div(".bright.hs_enemyfull", ui.arena);
				game.me.appendChild(n1);
				game.enemy.appendChild(n2);
				n1.innerHTML = get.HSA("fullname")[game.me.name.split("_")[1]] || get.translation(game.me.name);
				n2.innerHTML = get.HSA("fullname")[game.enemy.name.split("_")[1]] || get.translation(game.enemy.name);
				var n1 = ui.create.div(".bright.hs_mejob", ui.arena);
				var n2 = ui.create.div(".bright.hs_enemyjob", ui.arena);
				n1.innerHTML = get.HS_trans(game.me.group);
				n2.innerHTML = get.HS_trans(game.enemy.group);
				game.me.appendChild(n1);
				game.enemy.appendChild(n2);
				game.delay(2);
				"step 3"
				setTimeout(function() {
					document.body.style.filter = "brightness(100%)";
				}, 400);
				ui.arena.classList.remove("hs_black");
				ui.background.style.filter = "brightness(25%)";
				ui.arena.classList.add("hs_exchange");
				ui.arena.classList.add("hs_exchange2");
				"step 4"
				if (game.me.deckCards) {
					ui.hs_medeck.directgain(game.me.deckCards);
					ui.hs_medeck.hs_sort();
				}
				if (game.enemy.deckCards) {
					ui.hs_enemydeck.directgain(game.enemy.deckCards);
					ui.hs_enemydeck.hs_sort();
				}
				delete game.me.deckCards;
				delete game.enemy.deckCards;
				get.HSF("checkdeck");
				if (get.HSF("cfg", ["HS_debug"])) {
					window.lib = lib;
					window.ui = ui;
					window.game = game;
					window.get = get;
					window.ai = ai;
					window._status = _status;
				}
				"step 5"
				ui.hs_medeck.show();
				ui.hs_enemydeck.show();
				delete ui.hs_medeck.forcecount;
				delete ui.hs_enemydeck.forcecount;
				if (_status.hs_testing_obj || get.HSF("cfg", ["HS_debug"])) game.delayx(2);
				else game.delayx(get.HSF("Aud4"));
			});
		},
	},
	//编辑卡组自定义变量
	custom: {},
	//自定义变量
	ranvv: {}
};