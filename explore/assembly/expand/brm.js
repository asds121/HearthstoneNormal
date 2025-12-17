import {
	lib,
	game,
	ui,
	get,
	ai,
	_status
} from "../../noname.js";

export const BRM = {
	name: "黑石山的火焰",
	en: "BRM",
	minor: {
		info: {
			"Blackwing Corruptor": ["黑翼腐蚀者", "ordinary", "战吼：如果你的手牌中有龙牌，则造成3点伤害。", ["HS_effect", "5", "", "none", "5", "4"],
				["rareEff"]
			],
			"Blackwing Technician": ["黑翼技师", "ordinary", "战吼：如果你的手牌中有龙牌，便获得+1/+1。", ["HS_effect", "3", "", "none", "2", "4"],
				["rareEff"]
			],
			"Dragonkin Sorcerer": ["龙人巫师", "ordinary", "每当你以该随从为目标施放一个法术时，便获得+1/+1。", ["HS_effect", "4", "", "dragon", "3", "5"]],
			"Drakonid Crusher": ["龙人打击者", "ordinary", "战吼：如果你对手的生命值小于或等于15点，便获得+3/+3。", ["HS_effect", "6", "", "dragon", "6", "6"],
				["rareEff"]
			],
			"Emperor Thaurissan": ["索瑞森大帝", "legend", "在你的回合结束时，你所有手牌的法力值消耗减少（1）点。", ["HS_effect", "6", "", "none", "5", "5"],
				["legend"]
			],
			"Grim Patron": ["恐怖的奴隶主", "rare", "在该随从受到伤害并没有死亡后，召唤另一个恐怖的奴隶主。", ["HS_effect", "5", "", "none", "3", "3"]],
			"Nefarian": ["奈法利安", "legend", "战吼：随机将两张（你对手职业的）法术牌置入你的手牌。", ["HS_effect", "9", "", "dragon", "8", "8"],
				["legend"]
			],
			"Twilight Whelp": ["暮光雏龙", "ordinary", "战吼：如果你的手牌中有龙牌，便获得+2生命值。", ["HS_effect", "1", "hs_priest", "dragon", "2", "1"],
				["rareEff"]
			],
			"Flame Waker": ["火妖", "rare", "在你施放一个法术后，造成2点伤害，随机分配到所有敌人身上。", ["HS_effect", "3", "hs_mage", "none", "2", "4"]],
			"Imp3": ["小鬼", "essential", "", ["HS_normal", "1", "hs_warlock", "demon", "1", "1"],
				["tokened", "nosearch"]
			],
			"Imp Gang Boss": ["小鬼首领", "ordinary", "每当该随从受到伤害，召唤一个1/1的小鬼。", ["HS_effect", "3", "hs_warlock", "demon", "2", "4"],
				["hsdmg:hs_Imp3_monster"]
			],
			"Chromaggus": ["克洛玛古斯", "legend", "每当你抽一张牌时，将该牌的另一张复制置入你的手牌。", ["HS_effect", "8", "", "dragon", "6", "8"]],
			"Axe Flinger": ["掷斧者", "ordinary", "每当该随从受到伤害，对敌方英雄造成2点伤害。", ["HS_effect", "4", "hs_warrior", "none", "2", "5"]],
			"Majordomo Executus": ["管理者埃克索图斯", "legend", "亡语：用炎魔之王拉格纳罗斯替换你的英雄。", ["HS_effect", "9", "", "none", "9", "7"]],
			"Dragon Consort": ["龙王配偶", "rare", "战吼：你的下一张龙牌的法力值消耗减少（2）点。", ["HS_effect", "5", "hs_paladin", "dragon", "5", "5"]],
			"Hungry Dragon": ["饥饿的巨龙", "ordinary", "战吼：为你的对手随机召唤一个法力值消耗为（1）的随从。", ["HS_effect", "4", "", "dragon", "5", "6"]],
			"Rend Blackhand": ["雷德·黑手", "legend", "战吼：如果你的手牌中有龙牌，则消灭一个传说随从。", ["HS_effect", "7", "", "none", "8", "4"],
				["rareEff"]
			],
			"Volcanic Drake": ["火山幼龙", "ordinary", "在本回合中每有一个随从死亡，该牌的 法力值消耗就减少（1）点。", ["HS_effect", "6", "", "dragon", "6", "4"],
				["changecost:return _status.hs_state.deadfellow;"]
			],
			"Dragon Egg": ["龙蛋", "rare", "每当该随从受到伤害，便召唤一条2/1的雏龙。", ["HS_effect", "1", "", "none", "0", "2"],
				["受伤:黑色雏龙"]
			],
			"Black Whelp": ["黑色雏龙", "essential", "", ["HS_normal", "1", "", "dragon", "2", "1"],
				["token"]
			],
			"Druid of the Flame": ["烈焰德鲁伊", "ordinary", "抉择：将该随从变形成为5/2；或者将该随从变形成为2/5。", ["HS_effect", "3", "hs_druid", "none", "2", "2"]],
			"Druid of the Flame1": ["烈焰德鲁伊", "ordinary", "", ["HS_normal", "3", "hs_druid", "wildbeast", "5", "2"],
				["tokened", "nosearch"]
			],
			"Druid of the Flame2": ["烈焰德鲁伊", "ordinary", "", ["HS_normal", "3", "hs_druid", "wildbeast", "2", "5"],
				["tokened", "nosearch"]
			],
			"Volcanic Lumberer": ["火山邪木", "rare", "嘲讽，在本回合中每有一个随从死亡，该牌的法力值消耗就减少（1）点。", ["HS_effect", "9", "hs_druid", "none", "7", "8"],
				["changecost:return _status.hs_state.deadfellow;"]
			],
			"Core Rager": ["熔火怒犬", "rare", "战吼：如果你没有其他手牌，则获得+3/+3。", ["HS_effect", "4", "hs_hunter", "wildbeast", "4", "4"],
				["rareEff"]
			],
			"Dark Iron Skulker": ["黑铁潜藏者", "rare", "战吼：对所有未受伤的敌方随从造成2点伤害。", ["HS_effect", "5", "hs_rogue", "none", "4", "3"],
				["rareEff"]
			],
			"Fireguard Destroyer": ["火焰驱逐者", "ordinary", "战吼：获得1-4点攻击力。过载：（1）", ["HS_effect", "4", "hs_shaman", "elemental", "3", "6"]],
		},
		skill: {
			hs_DruidOfTheFlame: {
				juezetrans: true,
			},
			"hs_BlackwingCorruptor": {
				prompt: "战吼：造成3点伤害。",
				battleRoal: {
					filter: "龙牌",
					aifamily: "damage",
					filterTarget: lib.filter.all,
					async effect(event, trigger, player) {
						event.target.hs_dmgrcv('damage', event.fellow, 3);
					},
				},
			},
			"hs_BlackwingTechnician": {
				battleRoal: {
					filter: "龙牌",
					async effect(event, trigger, player) {
						event.fellow.addautovaluebuff([1, 1], get.hs_id(event.fellow));
					},
				},
			},
			"hs_DrakonidCrusher": {
				battleRoal: {
					filter(p) {
						return p.getOppo().hp <= 15;
					},
					async effect(event, trigger, player) {
						event.fellow.addautovaluebuff([3, 3], get.hs_id(event.fellow));
					},
				},
			},
			"hs_EmperorThaurissan": {
				ending: {
					self: true,
					async effect(event, trigger, player) {
						const t = event.fellow;
						player.countCards("h", ca => {
							ca.addhsbuff({
								name: "hs_cost",
								type: "hs_cost",
								uniquename: get.hs_id(t),
								value: 1,
								creator: t,
								fellow: t,
							});
						});
					},
				},
			},
			"hs_GrimPatron": {
				hsdmg: {
					fl: true,
					filter: "存活",
					async effect(event, trigger, player) {
						event.fellow.SSfellow("恐怖的奴隶主");
					},
				},
			},
			"hs_Nefarian": {
				async battleRoal(event, trigger, player) {
					const oppo = player.getOppo();
					const job = lib.character[oppo.name][1];
					event.fellow.HSFT(get.HS_trans(job));
					const kachi = get.hskachi("HS_spell", (a, b) => b.rnature == job);
					if (!kachi.length || kachi[0] == "hs_TheCoin") kachi = ["扫尾"];
					const cs = [kachi.randomGet(), kachi.randomGet()];
					player.hs_gain(cs, oppo);
				},
			},
			"hs_TwilightWhelp": {
				battleRoal: {
					filter: "龙牌",
					async effect(event, trigger, player) {
						event.fellow.addautovaluebuff([0, 2], get.hs_id(event.fellow));
					},
				},
			},
			"hs_FlameWaker": {
				useCardAfter: {
					self: true,
					filter: "法术",
					async effect(event, trigger, player) {
						event.fellow.hs_Missiles(2);
					},
				},
			},
			"hs_Chromaggus": {
				drawAfter: {
					self: true,
					async effect(event, trigger, player) {
						player.hs_gain(event.evt.card.name);
					},
				},
			},
			"hs_MajordomoExecutus": {
				async deathRattle(event, trigger, player) {
					player.init("hs_RagnarosTheFirelord");
					player.clearSkills(true);
					player.classList.remove("minskin");
					player.baseHP = 8;
					player.hs_dm = 0;
					player.hujia = 0;
					player.removegjz("dongjied");
					player.rkind = "";
					player.updatehsfl();
					await player.HSF('changeHeroskill', ['死吧，虫子！']);
				},
			},
			"hs_DragonConsort": {
				async battleRoal(event, trigger, player) {
					player.addcostbuff(2, c => get.rkind(c) == "dragon", Infinity);
				},
			},
			"hs_HungryDragon": {
				async battleRoal(event, trigger, player) {
					event.fellow.SSfellow('range:1', true);
				},
			},
			hs_RendBlackhand: {
				prompt: "消灭一个传说随从",
				battleRoal: {
					filter: "龙牌",
					aifamily: "damage",
					filterTarget(c, p, t) {
						return p.sctp("mns", t) && get.hslegend(t);
					},
					async effect(event, trigger, player) {
						event.target.HSF("cuihui");
					},
				},
			},
			"hs_CoreRager": {
				battleRoal: {
					filter: "空手",
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff([3, 3]);
					},
				},
			},
			hs_DarkIronSkulker: {
				battleRoal: {
					filter(player) {
						return player.sctp("notmine", f => f.HSF("alive") && f.isHealthy());
					},
					recheck: "filter",
					async effect(event, trigger, player) {
						event.fellow.hs_dmgrcvNotaoe(event.fellow, player.sctp("notmine"), 2, (p, f) => f.HSF("alive") && f.isHealthy()).line = true;
					},
				},
			},
			"hs_FireguardDestroyer": {
				async battleRoal(event, trigger, player) {
					event.fellow.updateSelfBuff(get.rand(1, 4));
				},
			},
		},
	},
	spell: {
		info: {
			hs_QuickShot: ["快速射击", "ordinary", ["damage:3", "造成3点伤害。如果你没有其他手牌，则抽一张牌。"], 2, "hs_hunter", ["activecon:yh", "activeeff:draw1"]],
			hs_LavaShock: ["熔岩震击", "rare", ["damage:2", "造成2点伤害。将你所有过载的法力水晶解锁。"], 2, "hs_shaman", ["fire", "other:player.HSF('unlockmana');"]],
			hs_Revenge: ["复仇打击", "rare", ["damage:1", "对所有随从造成1点伤害。如果你的生命值小于或等于12点，则改为造成3点伤害。"], 2, "hs_warrior", ["activecon:dmg", "activenum:3", "blade"]],
			hs_Resurrect: ["复活术", "rare", "随机召唤一个在本局对战中死亡的友方随从。", 2, "hs_priest"],
			hs_GangUp: ["夜幕奇袭", "ordinary", "选择一个随从。将该随从的三张复制洗入你的牌库。", 2, "hs_rogue"],
			hs_DragonsBreath: ["龙息术", "ordinary", ["damage:4", "造成4点伤害。在本回合中每有一个随从死亡，该牌的法力值消耗就减少（1）点。"], 5, "hs_mage",
				["cgct:return _status.hs_state.deadfellow;"]
			],
			hs_SolemnVigil: ["严正警戒", "ordinary", ["draw:2", "抽两张牌。在本回合中每有一个随从死亡，该牌的法力值消耗就减少（1）点。"], 5, "hs_paladin",
				["cgct:return _status.hs_state.deadfellow;"]
			],
			hs_Demonwrath: ["恶魔之怒", "rare", "对所有非恶魔随从造成2点伤害。", 3, "hs_warlock"],
			//抉择选项
			hs_DruidOfTheFlame1jz: ["火焰猎豹形态", "ordinary", "", 3, "hs_druid", ["token", "nosearch"]],
			hs_DruidOfTheFlame2jz: ["火鹰形态", "ordinary", "", 3, "hs_druid", ["token", "nosearch"]],
		},
		skill: {
			hs_Resurrect: {
				sfilter(card, player) {
					return _status.hs_dead_All[player.playerid].length > 0;
				},
				async content(event, trigger, player) {
					player.hs_revive();
				},
			},
			hs_GangUp: {
				filterTarget(card, player, target) {
					return player.sctp("mns", target);
				},
				async content(event, trigger, player) {
					player.HSF("addtodeck", [
						[event.target.linkCard[0].name, 3]
					]);
				},
			},
			hs_Demonwrath: {
				async content(event, trigger, player) {
					const tgs = player.sctp("mns").filter(fl => fl.rkind != "demon");
					if (tgs.length) get.HSF("lavaeffect", ["damage", 2, "lava", player]).set("pls", tgs);
				},
			},
		},
	},
	trap: {
		info: {},
		skill: {},
	},
	weapon: {
		info: {},
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
		黑手: "雷德·黑手",
		多彩狗: "克洛玛古斯",
		管理者: "管理者埃克索图斯",
	}
};