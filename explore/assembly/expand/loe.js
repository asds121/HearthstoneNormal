import {
	lib,
	game,
	ui,
	get,
	ai,
	_status
} from "../../noname.js";

export const LOE = {
	name: "探险者协会",
	en: "LOE",
	minor: {
		info: {
			"Murloc Tinyfin": ["鱼人宝宝", "ordinary", "鱼人宝宝实在是太可爱了，以至于谁见了都想抱一抱，结果因窒息所导致的死亡率极高。", ["HS_normal", "0", "", "murloc", "1", "1"]],
			"Brann Bronzebeard": ["布莱恩·铜须", "legend", "你的战吼会触发两次。", ["HS_effect", "3", "", "none", "2", "4"],
				["legend", "skillgh:doublebattleroal"]
			],
			"Reno Jackson": ["雷诺·杰克逊", "legend", "战吼：如果你的牌库里没有相同的牌，则为你的英雄恢复所有生命值。", ["HS_effect", "6", "", "none", "4", "6"],
				["legend", "rareEff"]
			],
			"Obsidian Destroyer": ["黑曜石毁灭者", "ordinary", "在你的回合结束时，召唤一只1/1并具有嘲讽的甲虫。", ["HS_effect", "7", "hs_warrior", "none", "7", "7"],
				["ending:圣甲虫"]
			],
			"Scarab": ["圣甲虫", "essential", "嘲讽", ["HS_effect", "1", "hs_warrior", "wildbeast", "1", "1"],
				["token"]
			],
			"Tunnel Trogg": ["坑道穴居人", "ordinary", "每当你过载时，每一个被锁的法力水晶会使其获得+1攻击力。", ["HS_effect", "1", "hs_shaman", "none", "1", "3"]],
			"Jungle Moonkin": ["丛林枭兽", "rare", "每个玩家获得法术伤害+2。", ["HS_effect", "4", "hs_druid", "none", "4", "4"]],
			"Mounted Raptor": ["骑乘迅猛龙", "ordinary", "亡语：随机召唤一个法力值消耗为（1）的随从。", ["HS_effect", "3", "hs_druid", "wildbeast", "3", "2"]],
			"Fierce Monkey": ["凶暴猿猴", "ordinary", "嘲讽", ["HS_effect", "3", "hs_warrior", "wildbeast", "3", "4"]],
			"Pit Snake": ["深渊巨蟒", "ordinary", "剧毒", ["HS_effect", "1", "hs_rogue", "wildbeast", "2", "1"]],
			"Tomb Pillager": ["盗墓匪贼", "ordinary", "亡语：将一个幸运币置入你的手牌。", ["HS_effect", "4", "hs_rogue", "none", "5", "4"],
				["deathRattle:gain>'幸运币'"]
			],
			"Huge Toad": ["巨型蟾蜍", "ordinary", "亡语：随机对一个敌人造成1点伤害。", ["HS_effect", "2", "", "wildbeast", "3", "2"]],
			"Keeper of Uldaman": ["奥达曼守护者", "ordinary", "战吼： 将一个随从的攻击力和生命值变为3。", ["HS_effect", "4", "hs_paladin", "none", "3", "4"],
				["battleRoal:buff>a3,h3"]
			],
			"Reliquary Seeker": ["遗物搜寻者", "rare", "战吼：如果你拥有六个其他随从，便获得+4/+4。", ["HS_effect", "1", "hs_warlock", "none", "1", "1"],
				["rareEff"]
			],
			"Elise Starseeker": ["伊莉斯·逐星", "legend", "战吼：将“黄金猿藏宝图”洗入你的牌库。", ["HS_effect", "4", "", "none", "3", "5"]],
			"Golden Monkey": ["黄金猿", "essential", "嘲讽，战吼：将你的手牌和牌库里的卡牌替换成传说随从。", ["HS_effect", "4", "", "none", "6", "6"],
				["token"]
			],
			"Dark Peddler": ["黑市摊贩", "ordinary", "战吼：发现一张 法力值消耗为（1）的卡牌。", ["HS_effect", "2", "hs_warlock", "none", "2", "2"]],
			"Arch-Thief Rafaam": ["虚灵大盗拉法姆", "legend", "战吼：发现一张强大的神器牌。", ["HS_effect", "9", "", "none", "7", "8"]],
			"Mummy Zombie": ["木乃伊僵尸", "essential", "", ["HS_normal", "3", "", "none", "3", "3"],
				["token"]
			],
			"Museum Curator": ["博物馆馆长", "ordinary", "战吼：发现一张亡语牌。", ["HS_effect", "2", "hs_priest", "none", "1", "2"]],
			"Jeweled Scarab": ["宝石甲虫", "ordinary", "战吼：发现一张法力值消耗为（3）的卡牌。", ["HS_effect", "2", "", "wildbeast", "1", "1"]],
			"Gorillabot A-3": ["A3型机械金刚", "ordinary", "战吼：如果你控制其他任何机械，则发现一张机械牌。", ["HS_effect", "4", "", "machine", "3", "4"],
				["rareEff"]
			],
			"Ethereal Conjurer": ["虚灵巫师", "ordinary", "战吼：发现一张法术牌。", ["HS_effect", "5", "hs_mage", "none", "6", "3"]],
			"Fossilized Devilsaur": ["石化魔暴龙", "ordinary", "战吼：如果你控制一个野兽，便获得嘲讽。", ["HS_effect", "8", "", "undead", "8", "8"]],
			"Anubisath Sentinel": ["阿努比萨斯哨兵", "ordinary", "亡语：随机使一个友方随从获得+3/+3。", ["HS_effect", "5", "", "none", "4", "4"],
				["deathRattle:mebuff>33"]
			],
			"Wobbling Runts": ["摇摆的俾格米", "rare", "亡语：召唤三个2/2的俾格米。", ["HS_effect", "6", "", "none", "2", "6"]],
			"Rascally Runt": ["俾格米蛮兵", "essential", "", ["HS_normal", "2", "", "none", "2", "2"],
				["tokened"]
			],
			"Wily Runt": ["俾格米刺客", "essential", "", ["HS_normal", "2", "", "none", "2", "2"],
				["tokened"]
			],
			"Grumbly Runt": ["俾格米斥候", "essential", "", ["HS_normal", "2", "", "none", "2", "2"],
				["tokened"]
			],
			"Ancient Shade": ["远古暗影", "ordinary", "战吼：将一张“远古诅咒”牌洗入你的牌库。当你抽到该牌，便会受到7点伤害。", ["HS_effect", "4", "", "undead", "7", "4"]],
			"Tomb Spider": ["墓穴蜘蛛", "ordinary", "战吼：发现一张野兽牌。", ["HS_effect", "4", "", "wildbeast", "3", "3"]],
			"Desert Camel": ["大漠沙驼", "ordinary", "战吼：从双方的牌库中各将一个法力值消耗为（1）的随从置入战场。", ["HS_effect", "3", "hs_hunter", "wildbeast", "2", "4"]],
			"Rumbling Elemental": ["顽石元素", "ordinary", "在你使用一张具有战吼的随从牌后，随机对一个敌人造成2点伤害。", ["HS_effect", "4", "hs_shaman", "elemental", "2", "6"]],
			"Eerie Statue": ["诡异的雕像", "rare", "除非它是战场上唯一的一个随从，否则无法进行攻击。", ["HS_effect", "4", "", "none", "7", "7"]],
			"Naga Sea Witch": ["纳迦海巫", "epic", "你的卡牌法力值消耗为（5）点。", ["HS_effect", "8", "", "naga", "5", "5"]],
			"Djinni of Zephyrs": ["西风灯神", "epic", "在你对一个其他友方随从施放法术后，将法术效果复制在此随从身上。", ["HS_effect", "5", "", "elemental", "4", "6"]],
			"Summoning Stone": ["召唤石", "rare", "每当你施放一个法术，随机召唤一个法力值消耗相同的随从。", ["HS_effect", "5", "", "none", "0", "6"]],
			"Animated Armor": ["复活的铠甲", "rare", "你的英雄每次只会受到1点伤害。", ["HS_effect", "4", "hs_mage", "none", "4", "4"]],
			"Unearthed Raptor": ["石化迅猛龙", "rare", "战吼：选择一个友方随从，获得其亡语的复制。", ["HS_effect", "3", "hs_rogue", "undead", "3", "4"]],
			"Sir Finley Mrrgglton": ["芬利·莫格顿爵士", "legend", "战吼：发现一个新的基础英雄技能。", ["HS_effect", "1", "", "murloc", "1", "3"],
				["legend"]
			],
		},
		skill: {
			hs_SirFinleyMrrgglton: {
				async battleRoal(event, trigger, player) {
					const next = player.hs_discover();
					const list = Object.keys(lib.hearthstone.base_heroskill).remove(player.heroskill.skill).randomGets(3);
					next.fixedres = list.map(i => {
						const card = get.chscard("小精灵");
						card.mana.hide();
						card.setBackgroundImage(`${get.HSA("extpath")}resource/image/heroskill/${i.replace("_legend","")}.jpg`);
						card._name = i;
						return card;
					});
					next.nogain = true;
					const {
						result
					} = await next;
					player.HSF("changeHeroskill", [result.links[0]._name]);
				},
			},
			hs_UnearthedRaptor: {
				battleRoal: {
					filterTarget(card, player, target) {
						return player.sctp("mine", target) && target.classList.contains("wangyu") && target.triggers.deathRattle?.length > 0;
					},
					async effect(event, trigger, player) {
						if (!event.fellow.triggers.deathRattle) event.fellow.triggers.deathRattle = [];
						const obj = {
							creator: event.fellow,
							player: player,
							fellow: event.fellow,
							type: "trigger",
							value: [],
						};
						event.target.triggers.deathRattle.forEach(eff => {
							const eff2 = get.copy(eff);
							eff2.creator = event.fellow;
							eff2.player = player;
							eff2.fellow = event.fellow;
							eff2.relabuff = obj;
							obj.value.push(eff2);
							event.fellow.triggers.deathRattle.add(eff2);
						});
						event.fellow.addhsbuff(obj);
						event.fellow.updatehsfl();
					},
				},
			},
			hs_AnimatedArmor: {
				hsdmgBegin1: {
					self: true,
					later: 2,
					filter(evt, p, f) {
						return evt.num > 1;
					},
					async effect(event, trigger, player) {
						event.orievt.num = 1;
					},
				},
			},
			hs_SummoningStone: {
				useCard: {
					self: true,
					filter: "法术",
					async effect(event, trigger, player) {
						const num = event.evt.usingcost;
						event.fellow.SSfellow("range:" + num);
					},
				},
			},
			hs_DjinniOfZephyrs: {
				useCardAfter: {
					self: true,
					filter(evt, p, f) {
						return get.type(evt.card) == "HS_spell" && evt.target && evt.targets.length == 1 && f.sctp("mine_", evt.target);
					},
					async effect(event, trigger, player) {
						const evt = event.evt;
						player.use_effect({
							player: player,
							target: event.fellow,
							targets: [event.fellow],
							card: evt.card,
							cards: evt.cards,
							active: evt.active,
						});
					},
				},
			},
			hs_NagaSeaWitch: {
				numgh: {
					name: "hs_cost",
					value: 5,
					subtype: "final",
					ghfilter(card, fellow, target) {
						return target == fellow.getLeader();
					},
				},
			},
			hs_EerieStatue: {
				noattack: true,
				numgh: {
					name: "canattack",
					type: "auras",
					ghfilter(p, t) {
						return p.sctp("mns").length == 1;
					},
					range(fellow, target) {
						return target == fellow;
					},
				},
			},
			//旧卡
			"hs_DesertCamel": {
				async battleRoal(event, trigger, player) {
					player.hs_join2((ca, info) => info.cost == 1);
					player.getOppo().hs_join2((ca, info) => info.cost == 1);
				},
			},
			"hs_RumblingElemental": {
				useCardAfter: {
					self: true,
					notlink: true,
					filter(evt, player, fellow) {
						return get.rGJZ(evt.cards[0], "battleRoal");
					},
					randomRT(player) {
						return player.sctp("opposide").filter(fl => fl.canhsdmg()).randomGet();
					},
					async effect(event, trigger, player) {
						event.target.hs_dmgrcv("damage", 2, event.fellow);
					},
				},
			},
			"hs_WobblingRunts": {
				async deathRattle(event, trigger, player) {
					player.SSfellow(["俾格米蛮兵"]);
					player.SSfellow(["俾格米刺客"]);
					player.SSfellow(["俾格米斥候"]);
				},
			},
			"hs_AncientShade": {
				async battleRoal(event, trigger, player) {
					player.HSF("addtodeck", ["远古诅咒"]);
				},
			},
			"hs_FossilizedDevilsaur": {
				battleRoal: {
					filter(p) {
						return p.hasFellow(t => t.rkind == "wildbeast");
					},
					async effect(event, trigger, player) {
						event.fellow.addgjzbuff("chaofeng");
					},
				},
			},
			"hs_TombSpider": {
				async battleRoal(event, trigger, player) {
					player.hs_discover((ca, info) => info.rkind == "wildbeast", event.fellow.linkCard[0]);
				},
			},
			"hs_RenoJackson": {
				battleRoal: {
					filter: "宇宙",
					async effect(event, trigger, player) {
						player.hs_dmgrcv("recover", player.maxHp, event.fellow);
					},
				},
			},
			"hs_TunnelTrogg": {
				overload: {
					self: true,
					async effect(event, trigger, player) {
						event.fellow.addvaluebuff(event.evt.num);
					},
				},
			},
			"hs_JungleMoonkin": {
				numgh: {
					name: "hs_power",
					value: 2,
				},
			},
			"hs_ReliquarySeeker": {
				battleRoal: {
					filter(p) {
						return p.countFellow() >= 6;
					},
					async effect(event, trigger, player) {
						event.fellow.addvaluebuff([4, 4]);
					},
				},
			},
			"hs_EliseStarseeker": {
				async battleRoal(event, trigger, player) {
					player.HSF("addtodeck", ["黄金猿藏宝图"]);
				},
			},
			"hs_GoldenMonkey": {
				async battleRoal(event, trigger, player) {
					const hs = player.countCards("h");
					const ds = player.cardPile.countCards("h");
					if (hs > 0) player.heroskill.pos.directgain(player.getCards("h"));
					if (ds > 0) player.heroskill.pos.directgain(player.cardPile.getCards("h"));
					const kc = get.hskachi('all', get.hsflt("传说"));
					for (let i = 0; i < hs; i++) {
						player.hs_gain(kc.randomGet());
					}
					const dz = [];
					for (let i = 0; i < ds; i++) {
						dz.push(kc.randomGet());
					}
					if (dz.length) player.HSF("addtodeck", [dz]);
				},
			},
			"hs_DarkPeddler": {
				async battleRoal(event, trigger, player) {
					player.hs_discover((ca, info) => info.cost == 1, event.fellow.linkCard[0]);
				},
			},
			"hs_Arch-ThiefRafaam": {
				async battleRoal(event, trigger, player) {
					player.hs_discover()
						.fixedres = ["hs_LanternOfPower", "hs_TimepieceOfHorror", "hs_MirrorOfDoom"];
				},
			},
			"hs_MuseumCurator": {
				async battleRoal(event, trigger, player) {
					player.hs_discover((ca, info) => get.rGJZ(ca, "deathRattle"), event.fellow.linkCard[0]);
				},
			},
			"hs_JeweledScarab": {
				async battleRoal(event, trigger, player) {
					player.hs_discover((ca, info) => info.cost == 3, event.fellow.linkCard[0]);
				},
			},
			"hs_GorillabotA-3": {
				battleRoal: {
					filter(p) {
						return p.hasFellow(t => t.rkind == "machine");
					},
					async effect(event, trigger, player) {
						player.hs_discover((ca, info) => info.rkind == "machine", event.fellow.linkCard[0]);
					},
				},
			},
			"hs_EtherealConjurer": {
				async battleRoal(event, trigger, player) {
					player.hs_discover((ca, info) => info.type == "HS_spell", event.fellow.linkCard[0]);
				},
			},

		},
	},
	spell: {
		info: {
			hs_ExplorersHat: ["探险帽", "rare", "使一个随从获得+1/+1，以及“亡语：将一张“探险帽”置入你的手牌。”", 2, "hs_hunter"],
			hs_ForgottenTorch: ["老旧的火把", "ordinary", ["damage:3", "造成3点伤害。将一张可造成6点伤害的“炽烈的火把”洗入你的牌库。"], 3, "hs_mage", ["fire", "other:player.HSF('addtodeck',['炽烈的火把']);"]],
			hs_RoaringTorch: ["炽烈的火把", "essential", "damage:6", 3, "hs_mage", ["fire", "token"]],
			hs_EveryfinIsAwesome: ["鱼人恩典", "rare", ["咆哮:2", "使你的所有随从获得+2/+2。你每控制一个鱼人，该牌的法力值消耗便减少（1）点。"], 7, "hs_shaman", ["cgct:return p.countFellow(t=>t.rkind=='murloc');"]],
			hs_Entomb: ["埋葬", "ordinary", "选择一个敌方随从。将该随从洗入你的牌库。", 6, "hs_priest"],
			hs_ExcavatedEvil: ["极恶之咒", "rare", ["damage:3", "对所有随从造成3点伤害。将该牌洗入你对手的牌库。"], 5, "hs_priest", ["aoe:mns", "other:player.getOppo().HSF('addtodeck',['极恶之咒']);"]],
			hs_MapToTheGoldenMonkey: ["黄金猿藏宝图", "essential", "将“黄金猿”洗入你的牌库。抽一张牌。", 2, "hs_neutral", ["token"]],
			hs_RavenIdol: ["乌鸦神像", "ordinary", "抉择：发现一张随从牌；或者发现一张法术牌。", 1, "hs_druid"],
			hs_LanternOfPower: ["能量之光", "essential", "使一个随从获得+10/+10。", 10, "hs_neutral", ["token"]],
			hs_TimepieceOfHorror: ["恐怖丧钟", "essential", "飞弹:10", 10, "hs_neutral", ["token"]],
			hs_MirrorOfDoom: ["末日镜像", "ordinary", "召唤数个3/3的木乃伊僵尸，直到你的随从数量达到上限。", 10, "hs_neutral", ["token"]],
			hs_AnyfinCanHappen: ["亡者归来", "rare", "召唤七个在本局对战中死亡的鱼人。", 10, "hs_paladin"],
			hs_CurseofRafaam: ["拉法姆的诅咒", "ordinary", "使你的对手获得一张“诅咒”。在对手的回合开始时，如果它在对手的手牌中，则造成2点伤害。", 2, "hs_warlock"],
			hs_Cursed: ["诅咒", "essential", "如果这张牌在你的手牌中，在你的回合开始时，你的英雄受到2点伤害。", 2, "hs_warlock", ["token"]],
			hs_AncientCurse: ["远古诅咒", "essential", "抽到时施放，你受到7点伤害。", 4, "hs_neutral", ["token", "hsdraw:player.hs_dmgrcv('damage', 7);"]],
			//抉择选项
			hs_BreakFree: ["冲破束缚", "essential", "抉发现一张随从牌。", 1, "hs_druid", ["token", "nosearch"]],
			hs_Awakened: ["梦醒时分", "essential", "发现一张法术牌。", 1, "hs_druid", ["token", "nosearch"]],
		},
		skill: {
			hs_CurseofRafaam: {
				async content(event, trigger, player) {
					player.getOppo().hs_gain("诅咒");
					player.getOppo().addtriggerbuff(event.card);
				},
				delayeffect: {
					beginning: {
						uniquename: "hs_Cursed",
						uniquebuff: true,
						self: true,
						filter(evt, p, f) {
							return p.countCards("h", "hs_Cursed") > 0;
						},
						async effect(event, trigger, player) {
							const num = player.countCards("h", "hs_Cursed");
							for (let i = 0; i < num; i++) {
								await player.hs_dmgrcv("damage", 2, player);
							}
						},
					},
				},
			},
			hs_Cursed: {
				async content(event, trigger, player) {},
				ai: {
					order: 10,
					result: {
						player(player, target) {
							if (player.hp + player.hujia >= 25) return 0;
							else return 1;
						},
					},
				},
			},
			hs_AnyfinCanHappen: {
				async content(event, trigger, player) {
					player.hs_revive(function(p, a, b) {
						const list = a[p.playerid].concat(a[p.getOppo().playerid]).filter(c => get.rkind(c) == "murloc");
						const list2 = [];
						list.forEach(i => list2.push(list.randomGet()));
						return list2;
					});
				},
			},
			hs_ExplorersHat: {
				filterTarget(card, player, target) {
					return target.isMin();
				},
				async content(event, trigger, player) {
					event.target.addvaluebuff([1, 1]);
					event.target.addtriggerbuff(event.card);
				},
				delayeffect: {
					async deathRattle(event, trigger, player) {
						player.hs_gain("探险帽");
					},
				},
			},
			hs_Entomb: {
				filterTarget(card, player, target) {
					return player.sctp("notmine", target);
				},
				async content(event, trigger, player) {
					event.target.HSF("backtodeck", [player]);
				},
			},
			hs_MapToTheGoldenMonkey: {
				async content(event, trigger, player) {
					await player.HSF("addtodeck", ["黄金猿"]);
					await player.hs_drawDeck();
				},
			},
			hs_RavenIdol: {
				async content(event, trigger, player) {
					player.hs_jueze(["hs_BreakFree", "hs_Awakened"], event.card);
				},
			},
			hs_BreakFree: {
				async content(event, trigger, player) {
					player.hs_discover((c, info) => info.type == "HS_minor", event.card);
				},
			},
			hs_Awakened: {
				async content(event, trigger, player) {
					player.hs_discover((c, info) => info.type == "HS_spell", event.card);
				},
			},
			hs_LanternOfPower: {
				spellbuff: true,
				filterTarget(c, p, t) {
					return p.sctp('mns', t)
				},
				async content(event, trigger, player) {
					event.target.addvaluebuff([10, 10]);
				},
			},
			hs_MirrorOfDoom: {
				async content(event, trigger, player) {
					player.SSfellow(["木乃伊僵尸", 7]);
				},
			},

		},
	},
	trap: {
		info: {
			hs_SacredTrial: ["审判", "ordinary", "奥秘：在你的对手使用一张随从牌后，如果他控制至少三个随从，则将其消灭。", 1, "hs_paladin"],
			hs_DartTrap: ["毒镖陷阱", "ordinary", "奥秘：在对方使用英雄技能后，随机对一个敌人造成5点伤害。", 2, "hs_hunter"],
		},
		skill: {
			hs_SacredTrial: {
				secret: {
					useCardAfter: {
						filter: "对方回合",
						filter2(evt, p) {
							const em = p.getOppo();
							const tg = em.sctp("mine").filter(fl => fl.linkCard[0] == evt.cards[0])[0];
							return tg && tg.HSF("alive") && evt.player == em && get.type(evt.card) == "HS_minor" && em.sctp("mine").length > 3;
						},
						randomRT(p, evt, f) {
							return p.getOppo().sctp("mine").filter(fl => fl.linkCard[0] == evt.cards[0])[0];
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							event.target.HSF("cuihui");
						},
					},
				},
			},
			hs_DartTrap: {
				secret: {
					heroskillAfter: {
						self: false,
						filter: "对方回合",
						randomRT(p, evt, f) {
							return p.sctp("opposide").filter(fl => fl.canhsdmg()).randomGet();
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							await event.target.hs_dmgrcv("damage", 5, player, event.card);
						},
					},
				},
			},

		},
	},
	weapon: {
		info: {
			hs_CursedBlade: ["诅咒之刃", "rare", "你的英雄受到的所有伤害效果翻倍。", 1, "hs_warrior", 2, 3],
		},
		skill: {
			hs_CursedBlade: {
				weaponeffect: {
					hsdmgBegin1: {
						self: true,
						later: 1,
						async effect(event, trigger, player) {
							event.orievt.num *= 2;
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
		天师: "坑道穴居人",
		铜须: "布莱恩·铜须",
		发财: "雷诺·杰克逊",
		挖宝: "伊莉斯·逐星",
		板娘: "芬利·莫格顿爵士",
	}
};