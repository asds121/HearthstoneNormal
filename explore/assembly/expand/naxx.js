import {
	lib,
	game,
	ui,
	get,
	ai,
	_status
} from "../../noname.js";

export const NAXX = {
	name: "纳克萨玛斯的诅咒",
	en: "NAXX",
	minor: {
		info: {
			"Sludge Belcher": ["淤泥喷射者", "rare", "嘲讽。亡语：召唤一个1/2并具有嘲讽的泥浆怪。", ["HS_effect", "5", "", "none", "3", "5"],
				["deathRattle:泥浆怪"]
			],
			"Slime": ["泥浆怪", "essential", "嘲讽", ["HS_effect", "1", "", "none", "1", "2"],
				["tokened"]
			],
			"Shade of Naxxramas": ["纳克萨玛斯之影", "epic", "潜行。在你的回合开始时，获得+1/+1。", ["HS_effect", "3", "", "none", "2", "2"]],
			"Baron Rivendare": ["瑞文戴尔男爵", "legend", "你的随从的亡语将触发两次。", ["HS_effect", "4", "", "none", "1", "7"],
				["legend", "skillgh:doubledeathrattle"]
			],
			"KelThuzad": ["克尔苏加德", "legend", "在每个回合结束时，召唤所有在本回合中死亡的友方随从。", ["HS_effect", "8", "", "undead", "6", "8"],
				["legend"]
			],
			"Nerubian Egg": ["蛛魔之卵", "rare", "亡语：召唤一个4/4的蛛魔。", ["HS_effect", "2", "", "none", "0", "2"],
				["deathRattle:蛛魔"]
			],
			"Nerubian": ["蛛魔", "essential", "", ["HS_normal", "4", "", "none", "4", "4"],
				["token"]
			],
			"Haunted Creeper": ["鬼灵爬行者", "ordinary", "亡语：召唤两只1/1的鬼灵蜘蛛。", ["HS_effect", "2", "", "wildbeast", "1", "2"],
				["deathRattle:['鬼灵蜘蛛',2]"]
			],
			"Spectral Spider": ["鬼灵蜘蛛", "essential", "", ["HS_normal", "1", "", "none", "1", "1"],
				["tokened"]
			],
			"Loatheb": ["洛欧塞布", "legend", "战吼：下个回合敌方法术的法力值消耗增加（5）点。", ["HS_effect", "5", "", "undead", "5", "5"],
				["legend"]
			],
			"Zombie Chow": ["肉用僵尸", "ordinary", "亡语：为敌方英雄恢复5点生命值。", ["HS_effect", "1", "", "none", "2", "3"]],
			"Nerubar Weblord": ["尼鲁巴蛛网领主", "ordinary", "具有战吼的随从法力值消耗增加（2）点。", ["HS_effect", "2", "", "none", "1", "4"]],
			"Spectral Knight": ["鬼灵骑士", "ordinary", "无法成为法术或英雄技能的目标。", ["HS_effect", "5", "", "none", "4", "6"]],
			"Unstable Ghoul": ["蹒跚的食尸鬼", "ordinary", "嘲讽，亡语：对所有随从造成1点伤害。", ["HS_effect", "2", "", "none", "1", "3"]],
			"Webspinner": ["结网蛛", "ordinary", "亡语：随机将一张野兽牌置入你的手牌。", ["HS_effect", "1", "hs_hunter", "wildbeast", "1", "1"],
				["deathRattle:rangain>野兽"]
			],
			"Undertaker": ["送葬者", "ordinary", "每当你召唤一个具有亡语的随从，便获得+1攻击力。", ["HS_effect", "1", "", "none", "1", "2"]],
			"Treant2": ["树人", "essential", "", ["HS_normal", "2", "hs_druid", "none", "2", "2"],
				["tokened", "nosearch"]
			],
			"Dark Cultist": ["黑暗教徒", "ordinary", "亡语：随机使一个友方随从获得+3生命值。", ["HS_effect", "3", "hs_priest", "none", "3", "4"],
				["deathRattle:mebuff>H3"]
			],
			"Anubar Ambusher": ["阿努巴尔伏击者", "ordinary", "亡语： 随机将一个友方随从移回你的手牌。", ["HS_effect", "4", "hs_rogue", "none", "5", "5"]],
			"Mad Scientist": ["疯狂的科学家", "ordinary", "亡语： 将一个奥秘从你的牌库中置入战场。", ["HS_effect", "2", "", "none", "2", "2"]],
			"Deathlord": ["死亡领主", "rare", "嘲讽，亡语：你的对手将一个随从从其牌库置入战场。", ["HS_effect", "3", "", "none", "2", "8"]],
			"Voidcaller": ["空灵召唤者", "ordinary", "亡语： 随机将一张恶魔牌从你的手牌置入战场。", ["HS_effect", "4", "hs_warlock", "none", "3", "4"]],
			"Feugen": ["费尔根", "legend", "如果斯塔拉格也在本局对战中死亡，召唤塔迪乌斯", ["HS_effect", "5", "", "undead", "4", "7"],
				["legend"]
			],
			"Stalagg": ["斯塔拉格", "legend", "如果费尔根也在本局对战中死亡，召唤塔迪乌斯。", ["HS_effect", "5", "", "undead", "7", "4"],
				["legend"]
			],
			"Thaddius": ["塔迪乌斯", "legend", "", ["HS_normal", "10", "", "undead", "11", "11"],
				["legend", "tokened"]
			],
			"Maexxna": ["迈克斯纳", "legend", "剧毒", ["HS_effect", "6", "", "wildbeast", "2", "8"],
				["legend"]
			],
			"Wailing Soul": ["哀嚎的灵魂", "rare", "战吼：沉默你的其他随从", ["HS_effect", "4", "", "undead", "3", "5"]],
			"Stoneskin Gargoyle": ["岩肤石像鬼", "ordinary", "在你的回合开始时，为该随从恢复所有生命值", ["HS_effect", "3", "", "undead", "1", "4"]],
			"Dancing Swords": ["舞动之剑", "ordinary", "亡语：你的对手抽一张牌", ["HS_effect", "3", "", "none", "4", "4"]],
			"Echoing Ooze": ["分裂软泥怪", "epic", "战吼：在回合结束时，召唤一个该随从的复制", ["HS_effect", "2", "", "none", "1", "2"]],
		},
		skill: {
			"hs_Deathlord": {
				async deathRattle(event, trigger, player) {
					player.getOppo().hs_join2();
				},
			},
			"hs_KelThuzad": {
				ending: {
					async effect(event, trigger, player) {
						player.hs_revive(function(p, a, b) {
							const list = b.slice(0).sort(lib.sort.attendseq).map(i => i.name);
							return list;
						});
					},
				},
			},
			"hs_Loatheb": {
				async battleRoal(event, trigger, player) {
					const o = player.getOppo();
					const t = event.fellow;
					o.addaurasbuff({
						name: "hs_cost",
						uniquename: get.hs_id(t),
						value: -5,
						ghfilter(card, fellow, target) {
							return target == fellow && get.type(card) == "HS_spell";
						},
						temp: 1,
						countphase: o,
						creator: t,
						fellow: t,
					});
				},
			},
			"hs_NerubarWeblord": {
				numgh: {
					name: "hs_cost",
					value: -2,
					ghfilter(card, fellow, target) {
						return get.type(card) == "HS_minor" && get.rGJZ(card, "battleRoal");
					},
				},
			},
			"hs_Undertaker": {
				summonSucc: {
					self: true,
					notlink: true,
					filter(evt, player, fellow) {
						return get.rGJZ(evt.card, "deathRattle");
					},
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff(1);
					},
				},
			},
			"hs_AnubarAmbusher": {
				deathRattle: {
					randomRT(p) {
						return p.sctp("mine")
							.randomGet();
					},
					async effect(event, trigger, player) {
						event.target.HSF("backtohand");
					},
				},
			},
			"hs_MadScientist": {
				async deathRattle(event, trigger, player) {
					const cs = player.cardPile.getCards("h", c => get.subtype(c) == "HS_secret" && player.canaddsecret(c));
					if (cs.length > 0) {
						const cho = cs.randomGet();
						player.cardPile.lose([cho], ui.special);
						player.discardPile.HSline(player, "green");
						player.use_secret(cho);
					}
				},
			},
			"hs_Voidcaller": {
				async deathRattle(event, trigger, player) {
					player.hs_join3(c => get.rkind(c) == "demon");
				},
			},
			hs_Feugen: {
				async deathRattle(event, trigger, player) {
					const arr = _status.hs_dead_All[player.playerid].concat(_status.hs_dead_All[player.getOppo().playerid]);
					if (arr.includes("hs_Stalagg_monster")) player.SSfellow("hs_Thaddius_monster");
				},
			},
			hs_Stalagg: {
				async deathRattle(event, trigger, player) {
					const arr = _status.hs_dead_All[player.playerid].concat(_status.hs_dead_All[player.getOppo().playerid]);
					if (arr.includes("hs_Feugen_monster")) player.SSfellow("hs_Thaddius_monster");
				},
			},
			hs_WailingSoul: {
				async battleRoal(event, trigger, player) {
					event.fellow.sctp("mine_", t => t.hs_silence());
				},
			},
			hs_StoneskinGargoyle: {
				beginning: {
					self: true,
					async effect(event, trigger, player) {
						event.fellow.hs_dmgrcv("recover", event.fellow, event.fellow.maxHp);
					},
				},
			},
			hs_DancingSwords: {
				async deathRattle(event, trigger, player) {
					player.getOppo().hs_drawDeck();
				},
			},
			hs_EchoingOoze: {
				async battleRoal(event, trigger, player) {
					event.fellow.addtriggerbuff({
						info: lib.skill.hs_EchoingOoze.delayeffect
					});
				},
				delayeffect: {
					ending: {
						filter: "存活",
						async effect(event, trigger, player) {
							event.fellow.removehsbuff(event.obj.relabuff);
							event.fellow.SSfellow(event.fellow.linkCard[0].name, undefined, "落地", ["分裂"]);
						},
					},
				},
			},



		},
	},
	spell: {
		info: {
			hs_Reincarnate: ["转生", "ordinary", "消灭一个随从，然后将其复活，并具有所有生命值。", 2, "hs_shaman"],
			hs_PoisonSeeds: ["剧毒之种", "ordinary", "消灭所有随从，并召唤等量的2/2树人代替他们。", 4, "hs_druid"],
		},
		skill: {
			hs_Reincarnate: {
				filterTarget(card, player, target) {
					return target.isMin();
				},
				async content(event, trigger, player) {
					const n = event.target.linkCard[0].name;
					await event.target.HSF("cuihui", [true]);
					await player.SSfellow(n, (event.target.getLeader() != player));
				},
				ai: {
					order: 9.1,
					result: {
						player: 1,
					},
				},
			},
			hs_PoisonSeeds: {
				async content(event, trigger, player) {
					const pls = player.sctp("main");
					const num1 = pls[0].countFellow();
					const num2 = pls[1].countFellow();
					if (player.sctp("mns").length) await get.HSF("cuihui", [player.sctp("mns"), true]);
					if (num1 > 0) await pls[0].SSfellow(["hs_Treant2_monster", num1]);
					if (num2 > 0) await pls[1].SSfellow(["hs_Treant2_monster", num2]);
				},
			},
		},
	},
	trap: {
		info: {
			hs_Avenge: ["复仇", "ordinary", "奥秘：当你的随从死亡时，随机使一个友方随从获得+3/+2。", 1, "hs_paladin"],
			hs_Duplicate: ["复制", "ordinary", "奥秘：当一个友方随从死亡时，将两张该随从的复制置入你的手牌。", 3, "hs_mage"],
		},
		skill: {
			hs_Avenge: {
				secret: {
					deathFL: {
						filter: "对方回合",
						filter2(evt, p) {
							return evt.link.getLeader() == p;
						},
						randomRT(p) {
							return p.sctp("mine").randomGet();
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							event.target.addvaluebuff([3, 2]);
						},
					},
				},
			},
			hs_Duplicate: {
				secret: {
					deathFL: {
						filter: "对方回合",
						filter2(evt, p) {
							return evt.link.getLeader() == p;
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							player.hs_gain([event.evt.link.linkCard[0].name, 2]);
						},
					},
				},
			},
		},
	},
	weapon: {
		info: {
			hs_DeathsBite: ["死亡之咬", "ordinary", "亡语：对所有随从造成1点伤害。", 4, "hs_warrior", 4, 2],

			//冒险模式
			hs_Hook: ["铁钩", "essential", "风怒，亡语：将这把武器移回你的手牌。", 3, "hs_leader", 4, 8, ["token"]],

		},
		skill: {
			//冒险模式
			hs_Hook: {
				weaponeffect: {
					deathRattle: {
						async effect(event, trigger, player) {
							player.hs_gain("铁钩");
						},
					},
				},
			},
		},
	},
	hero: {
		info: {},
		skill: {},
	},
	location: {
		info: {},
		skill: {},
	},
	cdan: { //缩写
		董大师: "淤泥喷射者",
		影子: "纳克萨玛斯之影",
		男爵: "瑞文戴尔男爵",
		克总: "克尔苏加德",
		大表弟: "塔迪乌斯",
		圆软: "分裂软泥怪",
	}
};