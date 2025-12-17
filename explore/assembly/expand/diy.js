import {
	lib,
	game,
	ui,
	get,
	ai,
	_status
} from "../../noname.js";

export const DIY = {
	name: "魔蛛之域的支配者",
	en: "DIY",
	minor: {
		info: {
			"King Togwaggle": ["托瓦格尔国王", "rare", "战吼：与你的对手交换牌库，你的对手获得一张“赎金”法术牌，可以将牌库交换回来。", ["HS_effect", "8", "", "none", "5", "5"]],
			"Azalina Soulthief": ["窃魂者阿扎莉娜", "rare", "战吼：将你的手牌替换成对手手牌的复制。", ["HS_effect", "7", "", "none", "3", "3"]],
			"Dirty Rat": ["卑劣的脏鼠", "rare", "嘲讽，战吼：你的对手将一个随机随从从其手牌置入战场。", ["HS_effect", "2", "", "none", "2", "6"],
				["quetu"]
			],
			"Gu Fu": ["野性之心古夫", "essential", "抽一张牌或者获得一个法力水晶。", ["HS_effect", "0", "", "none", "0", "1"],
				["diy", "token"]
			],
			"Gu Dan": ["鲜血掠夺者古尔丹", "essential", "召唤所有在本局对战中死亡的友方恶魔。", ["HS_effect", "0", "", "none", "0", "1"],
				["diy", "token"]
			],
			"White Spotted Spider": ["白斑蜘蛛", "essential", "亡语：抽一张牌。", ["HS_effect", "0", "hs_corruptor", "wildbeast", "0", "1"],
				["diy", "token"]
			],
			"Poisonous Spider": ["剧毒蜘蛛", "essential", "剧毒", ["HS_effect", "1", "hs_corruptor", "wildbeast", "1", "1"],
				["diy", "token"]
			],
			"Snake-haired Girl": ["蛇发女妖", "ordinary", "冲锋，剧毒", ["HS_effect", "4", "hs_corruptor", "none", "1", "1"],
				["diy"]
			],
			"Goblin Warlock": ["哥布林术士", "essential", "亡语：将一张白斑蜘蛛置入你的手牌。", ["HS_effect", "1", "hs_corruptor", "goblin", "1", "1"],
				["diy"]
			],
			"Forbidden Master": ["禁术法师", "epic", "剧毒，嘲讽", ["HS_effect", "4", "hs_corruptor", "none", "2", "4"],
				["diy"]
			],
			"Daughter of Medusa": ["美杜莎之女", "legend", "剧毒", ["HS_effect", "3", "hs_corruptor", "none", "1", "4"],
				["legend", "diy"]
			],
			"Goblin Warrior": ["哥布林战士", "rare", "剧毒，战吼：将一张萃毒置入你的手牌。", ["HS_effect", "3", "hs_corruptor", "goblin", "2", "2"],
				["diy"]
			],
			"Goblin Miner": ["哥布林矿工", "ordinary", "战吼：对一个随机敌人造成一点伤害，你每有一个其他哥布林，多执行一次。", ["HS_effect", "2", "hs_corruptor", "goblin", "0", "3"],
				["diy"]
			],
			"Goblin Engineer": ["哥布林工程师", "rare", "每当你施放一个法术，便随机对一个敌人造成1点伤害。", ["HS_effect", "1", "hs_corruptor", "goblin", "1", "1"],
				["diy"]
			],
			"Spider Queen": ["蜘蛛人女王", "epic", "你的白斑蜘蛛和剧毒蜘蛛获得+2/+2，每当一个友方随从死亡，获得+1攻击力。", ["HS_effect", "5", "hs_corruptor", "none", "1", "6"],
				["diy"]
			],
			"Goblin Bandit": ["哥布林悍匪", "epic", "战吼：消灭一个嘲讽随从，并对其拥有者造成3点伤害。", ["HS_effect", "5", "hs_corruptor", "goblin", "3", "3"],
				["diy", "rareEff"]
			],
			"Denseforest Marsh Dragon": ["密林沼龙", "epic", "每当你的一个随从死亡后，依次获得如下效果之一：+2生命值，你的法术牌费用-1，剧毒，+2/+2。", ["HS_effect", "3", "hs_corruptor", "dragon", "1", "4"],
				["diy"]
			],
			"Denseforest Mage": ["密林法师", "rare", "亡语：对你的英雄造成两点伤害，抽一张牌并使其费用-1。", ["HS_effect", "2", "hs_corruptor", "none", "3", "2"],
				["diy"]
			],
			"Eye of the Devil": ["恶魔之眼", "ordinary", "亡语：对手随机弃一张牌。", ["HS_effect", "4", "hs_corruptor", "none", "3", "2"],
				["diy"]
			],
			"Denseforest Shooter": ["密林射手", "rare", "风怒，战吼：若你的手牌更多，+2/+2。", ["HS_effect", "4", "hs_corruptor", "none", "2", "3"],
				["diy", "rareEff"]
			],
			"Robin Hood， the Dark Ranger": ["黯色游侠·罗宾汉", "legend", "战吼：若你的手牌更多，对所有其他敌方造成2点伤害并抽一张牌，否则将你的手牌数补至与敌方相同。", ["HS_effect", "6", "hs_corruptor", "none", "4", "6"],
				["diy"]
			],


			//diy
			//客串
			"Saltfish Pigeon": ["咸鱼鸽鸽", "legend", "冲锋，战吼：场上每有一个其他随从，获得一点攻击力，亡语：将一张咸鱼鸽鸽置入你的手牌。", ["HS_effect", "4", "", "none", "0", "1"],
				["legend", "diy"]
			],
			"Hide Sea": ["藏海", "legend", "战吼：造成2点伤害，亡语：为你的英雄恢复3点生命值。", ["HS_effect", "1", "", "none", "0", "1"],
				["legend", "diy"]
			],
			"Zayuliming": ["无冕黎明", "legend", "战吼：对一名受伤的随从造成3点伤害并冻结。若其存活，获得“你的法术牌费用-1”。", ["HS_effect", "3", "hs_mage", "none", "0", "5"],
				["legend", "diy"]
			],
			"Wuzhong Brother": ["无中咕咕", "legend", "每回合限一次，每当你使用法术牌或随从牌后，将一张同类型的牌置入你的手牌。", ["HS_effect", "2", "", "none", "0", "1"],
				["legend", "diy"]
			],
			//其他
			"New Year Firecracker": ["新年爆竹", "legend", "亡语：对手随机弃一张牌。", ["HS_effect", "1", "", "none", "1", "1"],
				["legend", "diy"]
			],
			"Silver Recruiter": ["白银募兵者", "rare", "你的回合结束时，对该随从造成1点伤害并召唤一个1/1的白银之手新兵。", ["HS_effect", "4", "hs_paladin", "none", "3", "6"],
				["guimu:白银之手新兵", "diy"]
			],
		},
		skill: {
			"hs_DirtyRat": {
				async battleRoal(event, trigger, player) {
					player.getOppo().hs_join3();
				},
			},
			"hs_AzalinaSoulthief": {
				async battleRoal(event, trigger, player) {
					const bb = player.getOppo().countCards("h");
					const hhs = player.countCards("h");
					if (hhs > 0) player.heroskill.pos.directgain(player.getCards("h"));
					if (bb > 0) player.hs_gain(player.getOppo().getCards("h").map(i => i.name));
				},
			},
			"hs_KingTogwaggle": {
				async battleRoal(event, trigger, player) {
					const nng = player.cardPile.getCards("h");
					const mmg = player.getOppo().cardPile.getCards("h");
					player.heroskill.pos.directgain(nng);
					player.heroskill.pos.directgain(mmg);
					player.cardPile.directgain(mmg);
					player.getOppo().cardPile.directgain(nng);
					player.getOppo().hs_gain("赎金");

				},
			},
			"hs_GoblinMiner": {
				battleRoal: {
					randomRT(player) {
						return player.HSF("randmgfil", ["opposide"]);
					},
					bonus(p, f) {
						return p.countFellow(fl => fl != f && fl.rkind == "goblin");
					},
					async effect(event, trigger, player) {
						event.target.hs_dmgrcv("damage", 1, event.fellow);
					},
				},
			},
			"hs_SpiderQueen": {
				numgh: {
					name: "value",
					value: [1, 1],
					range(fellow, target) {
						const name = get.translation(target.name);
						return fellow.sctp("mine", target) && (
							name.slice(-2) == "蜘蛛" || ["迈克斯纳"].includes(name));
					},
				},
				deathFL: {
					filter(event, player, fellow) {
						return event.link.getLeader() == player;
					},
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff(1);
					},
				},
			},
			"hs_GoblinBandit": {
				battleRoal: {
					filterTarget(card, player, target) {
						return target.isMin() && target.hasgjz("chaofeng");
					},
					aifamily: "damage",
					async effect(event, trigger, player) {
						event.target.HSF("cuihui");
						event.target.getLeader().hs_dmgrcv("damage", 3, event.fellow);
					},
				},
			},
			"hs_DenseforestMarshDragon": {
				deathFL: {
					count: 0, //发动计数
					filter(event, player, fellow, obj) {
						return obj.count < 4 && event.link.getLeader() == player;
					},
					async effect(event, trigger, player) {
						const num = event.obj.count;
						if (num == 0) event.fellow.addvaluebuff([0, 2]);
						else if (num == 1) event.fellow.addaurasbuff({
							name: "hs_cost",
							value: 1,
							ghfilter(card, fellow, target) {
								return target == fellow.getLeader() && get.type(card) == "HS_spell";
							}
						});
						else if (num == 2) event.fellow.addgjzbuff("jvdu");
						else if (num == 3) event.fellow.addvaluebuff([2, 2]);
						event.obj.count++;
					},
				},
			},
			"hs_DenseforestMage": {
				deathRattle: {
					randomRT(player) {
						return player;
					},
					async effect(event, trigger, player) {
						await event.target.hs_dmgrcv("damage", 2, event.fellow);
						const next = event.target.hs_drawDeck();
						next.onbuff = function(cs) {
							cs[0].addhsbuff({
								name: "hs_cost",
								type: "hs_cost",
								value: 1,
								creator: event.fellow,
								fellow: event.fellow,
							});
						};
						await next;
					},
				},
			},
			"hs_EyeOfTheDevil": {
				inherit: "hs_NewYearFirecracker",
			},
			"hs_DenseforestShooter": {
				battleRoal: {
					filter: "手多",
					async effect(event, trigger, player) {
						event.fellow.addvaluebuff([2, 2]);
					},
				},
			},
			"hs_RobinHood，TheDarkRanger": {
				async battleRoal(event, trigger, player) {
					const l = player.countCards("h") - player.getOppo().countCards("h");
					if (l > 0) {
						await player.hs_dmgrcvaoe("damage", 2, player.sctp("opposide"), event.fellow);
						await player.hs_drawDeck();
					} else if (l < 0) await player.hs_drawDeck(-l);
				},
			},
			//diy
			"hs_SaltfishPigeon": {
				async battleRoal(event, trigger, player) {
					event.fellow.addautovaluebuff(get.HSF("minors").length - 1, get.hs_id(event.fellow));
				},
			},
			"hs_Zayuliming": {
				battleRoal: {
					filterTarget(card, player, target) {
						return player.sctp("mns", target) && target.isDamaged();
					},
					async effect(event, trigger, player) {
						await event.target.hs_dmgrcv("damage", 3, "ice", event.fellow);
						event.target.addgjzbuff('dongjied');
						if (event.target.HSF("alive")) event.fellow.addaurasbuff({
							name: "hs_cost",
							value: 1,
							ghfilter(card, fellow, target) {
								return target == fellow.getLeader() && get.type(card) == "HS_spell";
							}
						});
					},
				},
			},
			"hs_WuzhongBrother": {
				useCardAfter: {
					self: true,
					notlink: true,
					filter(evt, p, f) {
						if (f.getStat().hs_WuzhongBrother) return false;
						return ["HS_minor", "HS_spell"].includes(get.type(evt.card));
					},
					async effect(event, trigger, player) {
						const type = get.type(event.evt.card);
						const m = get.hskachi(type);
						player.hs_gain(m.randomGet());
						event.fellow.getStat().hs_WuzhongBrother = 1;
					},
				},
			},
			"hs_NewYearFirecracker": {
				deathRattle: {
					randomRT(player) {
						return player.getOppo();
					},
					async effect(event, trigger, player) {
						await game.delay();
						await event.target.hs_discard();
					},
				},
			},
		},
	},
	spell: {
		info: {
			hs_QuenchingPoison: ["萃毒", "rare", "消灭你的一个随从，召唤一个剧毒蜘蛛。如果目标随从有剧毒，该随从每有一点生命值额外召唤一个剧毒蜘蛛。", 0, "hs_corruptor"],
			hs_TeaParty: ["茶话会", "epic", "你所有随从本回合+2攻击力并永久+2生命值。", 4, "hs_corruptor"],
			hs_DeadLandSummon: ["死域召唤", "epic", "召唤若干个随从直到你满场，它们的法力值消耗之和为5。", 4, "hs_corruptor"],
			hs_CauseAndEffect: ["殊途同归", "legend", "消灭一个你的随从，召唤3个1/1的复制。", 4, "hs_corruptor"],
			hs_TreasureHunt: ["寻宝", "epic", "消灭一个你的随从，为你的英雄恢复1点生命值，抽一张牌。", 1, "hs_corruptor"],
			hs_GuardingHeart: ["守护之心", "ordinary", "目标随从+1生命并获得嘲讽。", 1, "hs_corruptor"],
			hs_PoisonousFog: ["毒雾", "epic", "你每控制一个剧毒随从，便对随机一名敌方角色造成1点伤害。", 1, "hs_corruptor"],
			hs_Vine: ["蔓生", "rare", ["damage:2", "对一名随从造成2点伤害，如果其依然存活，其-2攻击力。"], 2, "hs_corruptor", ["only:fellow", "nodes:shrink2"]],
			hs_ToxinSputtering: ["毒液溅射", "rare", ["damage:2", "对目标随从造成2点伤害，如果你的手牌更多，伤害+1。"], 1, "hs_corruptor", ["activecon:moreh", "activenum:3"]],
			hs_EvilEnergyRelease: ["能量释放", "ordinary", ["kill:1", "消灭一个你的随从，对所有敌方造成2点伤害。"], 3, "hs_corruptor", ["only:self", "fx"]],
			hs_SpiderTerritory: ["魔蛛之域", "epic", ["summon:['白斑蜘蛛',3]", "召唤3只白斑蜘蛛。"], 4, "hs_corruptor"],
			//diy
			hs_FrostwoodFalls: ["霜林瀑布", "ordinary", ["buff:dongjied,H4,chaofeng", "冻结目标随从，其获得+4生命值和嘲讽。"], 2, "hs_mage"],
			hs_ZhengLiXingNang: ["整理行囊", "legend", "将手牌洗回牌库。抽三张牌。将此牌回手。", 2, ""],
			hs_HeShiBi: ["和氏璧", "legend", "获得3点法力直到回合结束，抽一张牌，然后将和氏璧归还牌库。", 0, ""],
			hs_ShuJin: ["赎金", "legend", "与你的对手交换牌库。", 5, "",
				["token"]
			],
			hs_QianNvYeBen: ["倩女夜奔", "legend", "抽空对方牌库", 0, ""],
			hs_YeGuFu: ["野性之心古夫", "legend", "将你的法力值上限变为20。获得一个法力水晶。抽一张牌。", 5, ""],
			hs_YeGuDan: ["鲜血掠夺者古尔丹", "legend", "战吼：召唤所有在本局对战中死亡的友方恶魔。", 10, ""],

		},
		skill: {
			"hs_YeGuDan": {
				async content(event, trigger, player) {
					const hp = player.hp;
					const hj = player.hujia;
					player.init("hs_GuDan");
					player.hp = hp;
					player.hujia = hj;
					player.clearSkills(true);
					player.classList.remove("minskin");
					player.rkind = "";
					player.updatehsfl();
					await player.HSF('changeHeroskill', ['生命虹吸！']);
					player.changeHujia(5);
					await player.hs_revive(function(p, a, b) {
						const list = a[p.playerid].slice(0).filter(c => get.rkind(c) == "demon");
						const list2 = [];
						list.forEach(i => list2.push(list.randomGet()));
						return list2;
					});
				},
			},
			"hs_YeGuFu": {
				async content(event, trigger, player) {
					const hp = player.hp;
					const hj = player.hujia;
					player.init("hs_GuFu");
					player.hp = hp;
					player.hujia = hj;
					player.clearSkills(true);
					player.classList.remove("minskin");
					player.rkind = "";
					player.updatehsfl();
					await player.HSF('changeHeroskill', ['培育！']);
					player.changeHujia(5);
					player.HSF('gainmana', [1]);
					await player.hs_drawDeck();
					player.storage.hs_mana_limit = 20;

				},
			},
			"hs_QianNvYeBen": {
				async content(event, trigger, player) {
					const nng = player.getOppo().cardPile.getCards("h");
					player.heroskill.pos.directgain(nng);
				},
			},
			"hs_ShuJin": {
				async content(event, trigger, player) {
					const nng = player.cardPile.getCards("h");
					const mmg = player.getOppo().cardPile.getCards("h");
					player.heroskill.pos.directgain(nng);
					player.heroskill.pos.directgain(mmg);
					player.cardPile.directgain(mmg);
					player.getOppo().cardPile.directgain(nng);

				},
			},
			hs_HeShiBi: {
				async content(event, trigger, player) {
					player.HSF("gaintempmana", [3]);
					await player.hs_drawDeck();
					await player.HSF("addtodeck", ["和氏璧"]);
				},
			},
			hs_ZhengLiXingNang: {
				async content(event, trigger, player) {
					const cs = player.getCards('h');
					await player.HSF("addtodeck", [cs]);
					player.$give(cs, player.discardPile, false);
					await player.hs_drawDeck(5);
					await player.hs_gain("整理行囊");
				},
			},
			hs_TreasureHunt: {
				cost: 1,
				rnature: "hs_corruptor",
				filterTarget(card, player, target) {
					return target.isMin() && target.getLeader() == player;
				},
				async content(event, trigger, player) {
					event.target.HSF("cuihui");
					await player.hs_dmgrcv("recover");
					await player.hs_drawDeck();
				},
				ai: {
					order: 9.9,
					result: {
						target(player, target) {
							if (target.name == "hs_WhiteSpottedSpider") return 6;
							const val = (target.triggers.deathRattle ? 3 : 0) - target.ATK + 1;
							if (player.hp >= 4) return val;
							else return val + 1.5;
						},
					},
				},
			},
			hs_GuardingHeart: {
				cost: 1,
				rnature: "hs_corruptor",
				filterTarget(card, player, target) {
					return target.isMin();
				},
				async content(event, trigger, player) {
					event.target.addvaluebuff([0, 1]);
					event.target.addgjzbuff("chaofeng");
				},
				ai: {
					order: 8.9,
					result: {
						target(player, target) {
							const val = target.HSF("hasCFeff") ? 0 : 1;
							const val2 = !val && target.hp == 0 ? 2 : target.ATK;
							const val3 = target.triggers.deathRattle ? 3 : 0;
							return 1 + val + val2 + val3;
						},
					},
				},
			},
			hs_PoisonousFog: {
				cost: 1,
				rnature: "hs_corruptor",
				sfilter(card, player) {
					return player.countFellow(fl => fl.hasgjz("jvdu")) + player.countFq() > 0;
				},
				async content(event, trigger, player) {
					const num = player.countFellow(fl => fl.hasgjz("jvdu")) + player.countFq();
					player.hs_Missiles(num);
				},
				ai: {
					order: 9,
					result: {
						player(player) {
							return player.countFellow(fl => fl.hasgjz("jvdu")) - 1.9;
						},
					},
				},
				spelldamage: true,
			},
			hs_QuenchingPoison: {
				filterTarget(card, player, target) {
					return target.isMin() && target.getLeader() == player;
				},
				async content(event, trigger, player) {
					const num = 1 + (event.target.hasgjz("jvdu") ? event.target.hp : 0);
					await event.target.HSF("cuihui", [true]);
					player.SSfellow(["剧毒蜘蛛", num]);
				},
				ai: {
					order: 9.1,
					result: {
						player: 1,
					},
				},
			},
			hs_TeaParty: {
				buffeff: true,
				async content(event, trigger, player) {
					player.countFellow(fl => {
						fl.addvaluebuff(2, 1);
						fl.addvaluebuff([0, 2]);
					})
				},
			},
			hs_DeadLandSummon: {
				summoneff: true,
				async content(event, trigger, player) {
					let num = 5;
					while (player.countFellow() < 7 && num > 0) {
						let c;
						if (player.countFellow() == 6) {
							c = get.hskachi("HS_minor", (ca, info) => info.cost == num).randomGet();
						} else {
							c = get.hskachi("HS_minor", (ca, info) => info.cost <= num).randomGet();
						}
						await player.SSfellow(c);
						num -= lib.card[c].cost;
					}
				},
			},
			hs_CauseAndEffect: {
				hs_legend: true,
				filterTarget(card, player, target) {
					return target.isMin() && target.getLeader() == player;
				},
				async content(event, trigger, player) {
					const n = event.target.linkCard[0].name;
					await event.target.HSF("cuihui", [true]);
					await player.SSfellow([n, 3], undefined, undefined, ["复制"]);
				},
				ai: {
					order: 9.1,
					result: {
						player: 1,
					},
				},
			},
		},
	},
	trap: {
		info: {},
		skill: {},
	},
	weapon: {
		info: {
			hs_KingSlayer: ["弑君者", "legend", "亡语：将一张死域召唤置入你的手牌。", 4, "hs_corruptor", 4, 2, ["legend"]],
		},
		skill: {},
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
		罗宾汉: "黯色游侠·罗宾汉",
	}
};