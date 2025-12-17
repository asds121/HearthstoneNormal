import {
	lib,
	game,
	ui,
	get,
	ai,
	_status
} from "../../noname.js";
import {
	basic
} from "../../utility.js";

export const skill = {
	skill: {
		"hs_start": { //开局之后重构万物的技能，包括设置样式，重新选人，组卡组，XJBG(瞎xx改)，然后僵硬联动整理手牌扩展
			trigger: {
				global: ["gameDrawBefore", "phaseEnd"],
			},
			silent: true,
			unique: true,
			charlotte: true,
			filter(event, player) {
				var bo = game.players.length == 2 && !_status.hs_entergame;
				if (game.players.length > 2) {
					console.error(`你觉得炉石传说是${get.cnNumber(game.players.length)}个人玩的吗？`);
				}
				return bo;
			},
			content() {
				"step 0"
				window.hearthstone.shijian.baseinit();
				"step 1"
				if (!lib.hearthstone) {
					game.me.say("加载失败");
					event.finish();
				}
				"step 2"
				lib.hearthstone.shijian.preinit(trigger);
				"step 3"
				lib.hearthstone.shijian.init();
				"step 4"
				lib.hearthstone.shijian.postinit();
				"step 5"
				lib.hearthstone.shijian.entermode();
				"step 6"
				lib.hearthstone.shijian.reach();
				"step 7"
				lib.hearthstone.shijian.XJBG();
				"step 8"
				event.insert(lib.element.content.greeting, {});
			},
		},
		"hs_summonlimit": { //自己进行操作的技能
			trigger: {
				global: ["phaseBefore", "phaseZhunbeiBegin", "chooseToUseBegin"],
			},
			filter(event, player) {
				if (event.name == "chooseToUse") {
					if (player == game.me) {
						game.me.HSF("hs_testfl");
					}
					get.HSF("checkall");
					event.prompt = "";
					return false;
				} else return event.player.isMin();
			},
			silent: true,
			unique: true,
			fixed: true,
			charlotte: true,
			content() {
				trigger.cancel(null, null, "notrigger");
			},
			mod: {
				cardEnabled2(card, player) {
					var cost = player.HSF("mana");
					if (card.cost && cost < card.cost()) return false;
					if (get.type(card.name) == "HS_minor") {
						if (player.countFellow() == 7) return false;
					} else if (get.type(card.name) == "HS_spell") {
						var info = get.info(card);
						if (get.subtype(card) == "HS_secret" && !player.canaddsecret(card)) return false;
						if (info.summoneff && player.hs_full()) return false;
						if (info.buffeff && !player.hasFellow()) return false;
						if (info.randomRT && !info.randomRT(player)) return false;
						if (info.sfilter && !info.sfilter(card, player)) return false;
					}
				},
				maxHandcardFinal(player, num) {
					return 10;
				},
			},
			global: "hs_summonlimit_a",
			subSkill: {
				a: {
					mod: {
						targetEnabled(card, player, target) {
							if (!player.HSF("canbetarget", [card, target, "card"])) return false;
						},
					},
				},
			},
		},
		/*代码修改：重写战斗阶段及ai*/
		"hs_battlephase": { //战斗阶段
			charlotte: true,
			enable: "phaseUse",
			direct: true,
			unique: true,
			fixed: true,
			charlotte: true,
			filter(event, player) {
				if (_status.event.isMine()) return false;
				return player.getFellowN(t => t.HSF("canatk") && game.hasPlayer(tg => {
					if (!t.HSF("canbetarget", [null, tg, "attack"])) return false;
					return tg.side != player.side;
				})).length > 0;
			},
			selectTarget: 2,
			complexTarget: true,
			complexSelect: true,
			multitarget: true,
			line: false,
			filterTarget(card, player, target) {
				var num = ui.selected.targets.length;
				if (num == 0) {
					return target.HSF("canatk");
				} else {
					var atk = ui.selected.targets[0];
					if (!atk.HSF("canbetarget", [null, target, "attack"])) return false;
					return target.side != player.side;
				}
			},
			content() {
				"step 0"
				_status.hsbattling = true;
				event.attacker = targets[0];
				event.victim = targets[1];
				"step 1"
				var t = event.attacker;
				t.classList.add("hs_atkprepare");
				if (t.isMin()) get.HSF("Aud", [t, "attack"]);
				else t.HSFT("攻击");
				"step 2"
				event.predate = new Date().getTime();
				"step 3"
				var jg = Math.round((new Date().getTime() - event.predate) / 100) / 10;
				var atk = event.attacker;
				var dl = 0;
				if (event.isMine()) {
					if (atk.isMin()) dl = 0.5;
					else dl = 1;
				} else {
					if (!atk.isMin()) dl = 1.5;
				}
				if (dl - jg > 0) game.delay(dl - jg);
				"step 4"
				event.attacker.hs_attack(event.victim);
				"step 5"
				if (!event.isMine()) get.HSF("think");
				"step 6"
				_status.hsbattling = false;
			},
			ai: {
				order: 0.1,
				result: {
					target(player, target) {
						var t = target;
						var num = ui.selected.targets.length;
						if (num == 0) {
							var base = 4;
							if (t.triggers.deathRattle && t.hp < 3) base += 3;
							if (t.triggers.hsdmg && t.triggers.hsdmg.fl) base += 3;
							if (t.hasgjz("shengdun")) base += 3;
							if (t.hasgjz("qianxing")) base -= 2;
							if (t.hasgjz("guanghuan")) base -= 3;
							if (t.hasgjz("jvdu")) base += 3;
							return base + t.ATK;
						} else {
							var atk = ui.selected.targets[0];
							var base = 40;
							if (t.triggers.deathRattle) base -= 10;
							if (t.triggers.hsdmg && t.triggers.hsdmg.fl) base -= 6;
							if (t.hasgjz("guanghuan")) base += 3;
							if (atk.hasgjz("shengdun") || t.hasgjz("shengdun")) {
								if (atk.hasgjz("shengdun")) base += atk.ATK + t.ATK;
								if (t.hasgjz("shengdun")) base -= atk.ATK;
							} else if (atk.hasgjz("jvdu") || t.hasgjz("jvdu")) {
								if (atk.hasgjz("jvdu")) base += t.ATK + t.hp;
								if (t.hasgjz("jvdu")) {
									if (atk.isMin()) base -= atk.ATK + atk.hp;
									else base += atk.ATK + atk.hp;
								}
							} else {
								var val1 = atk.ATK + atk.hp;
								var val2 = t.ATK + t.hp;
								if (atk.ATK >= t.hp) base += val2;
								if (atk.hp <= t.ATK) base -= val1;
								else base += Math.min(t.hp, atk.ATK) - Math.min(atk.hp, t.ATK);
							}
							if (base > 0) {
								if (!t.isMin()) {
									if (atk.ATK >= t.hp + t.hujia) return -(base + 100);
								}
								if (!atk.isMin()) {
									if (target.ATK >= atk.hp + atk.hujia) return 100;
									if (atk.ATK < target.hp && target.ATK > 2) return 10;
								}
								return -base;
							}
							return 1 / (base - 1);
						}
					},
				},
			},
		},
		"_hs_damage": { //伤害计算步骤
			silent: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: null,
			firstDo: true,
			mode: "hs_hearthstone",
			trigger: {
				player: ["changeHp"],
			},
			filter(event, player, name) {
				return _status.gameStarted;
			},
			content() {
				if (trigger.parent && !trigger.parent.hs_dmgrcv) {
					player.updatehsfl(trigger.num);
				}
			},
		},
		"_hs_ADchange": { //回合开始和回合结束时清除状态
			direct: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 1,
			mode: "hs_hearthstone",
			trigger: {
				player: ["phaseBegin", "phaseZhunbeiBegin", "phaseJieshuBegin", "phaseEnd"],
			},
			filter(event, player, name) {
				return _status.gameStarted && [game.me, game.enemy].includes(event.player);
			},
			content() {
				"step 0"
				"step 1"
				if (trigger.name != "phase") {
					_status.hdcsST = null;
					var bo = trigger.name == "phaseJieshu";
					if (bo) get.HSF("clickmana", [false]);
					get.HSF("xvlie", [(bo ? "ending" : "beginning") + "xl", {
							player: player,
						},
						true
					]);
				} else if (event.triggername == "phaseBegin") {
					_status.hs_state = {
						jobdone: false,
						deadfellow: 0,
					};
					player.hs_state.atks = 0;
					player.hs_state.useCard = 0;
					get.HSF("clickmana", [false]);
					get.HSF("checkcanatk");
					if (player == game.me) {
						ui.arena.hs_myturn.addTempClass("active", 1400);
						get.HSF("Aud2", ["轮到你"]);
					}
					player.mana.locked.hide();
					player.storage.hs_mana_locked = player.storage.hs_mana_owed;
					player.storage.hs_mana_owed = 0;
					player.storage.hs_mana_used = player.storage.hs_mana_locked;
					if (player.storage.hs_mana_locked > 0) {
						player.mana.owed.show();
						player.mana.owed.classList.remove("owe");
						player.mana.owed.classList.add("lock");
						var tmp = player.mana.locked;
						player.mana.locked = player.mana.owed;
						player.mana.owed = tmp;
						setTimeout(function() {
							tmp.classList.remove("lock");
							tmp.classList.add("owe");
						}, 500);
					}
					var num = 1;
					player.HSF("gainmana", [num, true]);
					player.HSF("recovermana", ["all"]);
					player.HSF("updatemana");
					var skill = player.heroskill;
					skill.used = 0;
					get.HSF("checkheroskill");
					if (trigger.player == game.me) {
						ui.hs_endbtn.innerHTML = "回合结束";
						ui.hs_endbtn.classList.remove("hs_oppo");
					} else {
						ui.hs_endbtn.innerHTML = "对手回合";
						ui.hs_endbtn.classList.add("hs_oppo");
					}
					game.countPlayer(function(fl) {
						fl.hs_attacked = 0;
					});
					player.sctp("field", t => {
						var bin = [];
						t.buff.forEach(o => {
							if (o.temp > 0 && o.temp < 1) bin.add(o);
						});
						t.removehsbuff(bin);
					});
					var toflush = [];
					player.sctp("field", t => {
						t.buff.forEach(o => {
							if (o.countphase == player && o.type2 == "cost" && o.used == true) toflush.add(o);
						});
					});
					if (toflush.length > 0) {
						toflush.sort(lib.sort.attendseq);
						_status.hsAttendSeq.cl(toflush);
						toflush.forEach(i => {
							i.used = false;
							_status.hsAttendSeq.ad(i);
						});
					}
					_status.hs_starttime = new Date();
				} else {
					ui.hs_endbtn.classList.remove("active");
					player.storage.hs_mana_temp = 0;
					if (player.HSF("mana") < 0) player.HSF("recovermana", [-player.HSF("mana"), false]);
					player.HSF("updatemana");
					game.countPlayer(function(fl) {
						if (fl.hasgjz("dongjied")) {
							if (player == fl.getLeader()) {
								if (fl.willjiedong || fl.HSF("canatk", [null, true])) fl.removegjz("dongjied");
								else fl.willjiedong = true;
							} else fl.willjiedong = true;
						}
						delete fl.summoned;
						var bin = [];
						for (var i of fl.buff) {
							if (typeof i.sleep == "number") {
								i.sleep--;
								if (i.sleep == 0) {
									if (i.type == "auras") i.sleep = true;
									else delete i.sleep;
								}
							} else if (i.temp) {
								if (!i.countphase || i.countphase == player) i.temp--;
								if (i.used == true) i.limit--;
								if (i.temp == 0 || i.limit == 0) bin.add(i);
							}
						}
						fl.removehsbuff(bin);
						if (!fl.isMin()) {
							var bin2 = [];
							for (var i of fl.heroskill.buff) {
								if (i.temp) {
									if (!i.countphase || i.countphase == player) i.temp--;
									if (i.temp == 0) bin2.add(i);
								}
							}
							bin2.forEach(i => {
								fl.removehsbuff.call(fl.heroskill, i);
							});
						}
					});
					var id1 = game.me.playerid;
					var id2 = game.enemy.playerid;
					_status.hsAttendSeq.cl();
					_status.hs_dead = {};
					_status.hs_dead[id1] = [];
					_status.hs_dead[id2] = [];
					get.HSF("checkfellow");
				}
				"step 3"
			},
		},
	},

	translate: {
		"hs_start": "重构",
		"hs_start_info": "进入炉石普通的世界",
	},
};