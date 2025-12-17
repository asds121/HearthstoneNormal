import {
	lib,
	game,
	ui,
	get,
	ai,
	_status
} from "../../noname.js";

export const TGT = {
	name: "冠军的试炼",
	en: "TGT",
	minor: {
		info: {
			"Crowd Favorite": ["人气选手", "epic", "每当你使用一张具有战吼的牌，便获得+1/+1。", ["HS_effect", "4", "", "none", "4", "4"]],
			"Nerubian2": ["蛛魔", "essential", "", ["HS_normal", "4", "hs_rogue", "none", "4", "4"],
				["tokened", "nosearch"]
			],
			"Sapling": ["树苗", "essential", "", ["HS_normal", "1", "hs_druid", "none", "1", "1"],
				["tokened"]
			],
			"Aviana": ["艾维娜", "legend", "你的随从牌的法力值消耗为（1）点。", ["HS_effect", "9", "hs_druid", "none", "5", "5"],
				["legend", "quetu"]
			],
			"Wildwalker": ["荒野行者", "ordinary", "战吼：使一个友方野兽获得+3生命值。", ["HS_effect", "4", "hs_druid", "none", "4", "4"],
				["rareEff", "battleRoal:fltbuff>mine_,wildbeast：H3"]
			],
			"Darnassus Aspirant": ["达纳苏斯豹骑士", "rare", "战吼：获得一个空的法力水晶。亡语：失去一个法力水晶。", ["HS_effect", "2", "hs_druid", "none", "2", "3"]],
			"Shady Dealer": ["走私商贩", "rare", "战吼：如果你控制任何海盗，便获得+1/+1。", ["HS_effect", "3", "hs_rogue", "none", "4", "3"]],
			"Alexstraszas Champion": ["阿莱克丝塔萨的勇士", "rare", "战吼：如果你的手牌中有龙牌，便获得+1攻击力和冲锋。", ["HS_effect", "2", "hs_warrior", "none", "2", "3"],
				["rareEff"]
			],
			"Buccaneer": ["锈水海盗", "ordinary", "每当你装备一把武器，使武器获得+1攻击力。", ["HS_effect", "1", "hs_rogue", "pirate", "2", "1"]],
			"Undercity Valiant": ["幽暗城勇士", "ordinary", "连击：造成1点伤害。", ["HS_effect", "2", "hs_rogue", "none", "3", "2"]],
			"Justicar Trueheart": ["裁决者图哈特", "legend", "战吼：以更强的英雄技能来替换你的初始英雄技能。", ["HS_effect", "6", "", "none", "6", "3"],
				["legend"]
			],
			"Sea Reaver": ["破海者", "epic", "当你抽到该牌时，对你的随从造成1点伤害。", ["HS_effect", "6", "hs_warrior", "none", "6", "7"],
				["addhand:get.HSF('lavaeffect',['mine',1,'blade',player]);"]
			],
			"Cutpurse": ["窃贼", "rare", "每当该随从攻击一方英雄，会将幸运币置入你的手牌。", ["HS_effect", "2", "hs_rogue", "none", "2", "2"]],
			"Gormok the Impaler": ["穿刺者戈莫克", "legend", "战吼：如果你拥有至少四个其他随从，则造成4点伤害。", ["HS_effect", "4", "", "none", "4", "4"],
				["legend", "rareEff"]
			],
			"Shado-Pan Rider": ["影踪骁骑兵", "ordinary", "连击：获得+3攻击力。", ["HS_effect", "5", "hs_rogue", "none", "3", "7"],
				["lianji:event.fellow.addvaluebuff(3);"]
			],
			"Stablemaster": ["兽栏大师", "epic", "战吼：在本回合中，使一个友方野兽获得免疫。", ["HS_effect", "3", "hs_hunter", "none", "4", "2"],
				["rareEff", "battleRoal:fltbuff>mine_,wildbeast：mianyi:1"]
			],
			"Skycapn Kragg": ["天空上尉库拉格", "legend", "冲冲冲冲锋，每有一个友方海盗，该牌的法力值消耗便减少（1）点。", ["HS_effect", "7", "", "pirate", "4", "6"],
				["changecost:return p.countFellow(fl=>fl.rkind=='pirate');"]
			],
			"Evil Heckler": ["邪灵拷问者", "ordinary", "嘲讽", ["HS_effect", "4", "", "none", "5", "4"]],
			"Sparring Partner": ["格斗陪练师", "rare", "嘲讽，战吼：使一个随从获得嘲讽。", ["HS_effect", "2", "hs_warrior", "none", "3", "2"],
				["battleRoal:buff>chaofeng"]
			],
			"Magnataur Alpha": ["猛犸人头领", "epic", "同时对其攻击目标相邻的随从造成伤害。", ["HS_effect", "4", "hs_warrior", "none", "5", "3"]],
			"Fearsome Doomguard": ["恐怖末日守卫", "ordinary", "恐怖都写在名字里了，还能有比这更恐怖的家伙吗？", ["HS_normal", "7", "hs_warlock", "demon", "6", "8"]],
			"Dreadscale": ["恐鳞", "legend", "在你的回合结束时，对所有其他随从造成1点伤害。", ["HS_effect", "3", "hs_hunter", "wildbeast", "4", "2"],
				["legend"]
			],
			"Tiny Knight of Evil": ["小鬼骑士", "rare", "每当你弃掉一张牌时，便获得+1/+1。", ["HS_effect", "2", "hs_warlock", "demon", "3", "2"]],
			"Spellslinger": ["嗜法者", "ordinary", "战吼：随机将一张法术牌置入每个玩家的手牌。", ["HS_effect", "3", "hs_mage", "none", "3", "4"]],
			"Bolf Ramshield": ["博尔夫·碎盾", "legend", "每当你的英雄受到伤害，便会由该随从来承担。", ["HS_effect", "6", "", "none", "3", "9"],
				["legend"]
			],
			"Confessor Paletress": ["银色神官帕尔崔丝", "legend", "激励：随机召唤一个传说随从。", ["HS_effect", "7", "hs_priest", "none", "5", "4"],
				["legend", "jili:['range:传说']"]
			],
			"Murloc Knight": ["鱼人骑士", "ordinary", "激励：随机召唤一个鱼人。", ["HS_effect", "4", "hs_paladin", "murloc", "3", "4"],
				["jili:['range:鱼人']"]
			],
			"Lowly Squire": ["低阶侍从", "ordinary", "激励：获得+1攻击力。", ["HS_effect", "1", "", "none", "1", "2"]],
			"Silver Hand Regent": ["白银之手教官", "ordinary", "激励：召唤一个1/1的白银之手新兵。", ["HS_effect", "3", "", "none", "3", "3"],
				["jili:白银之手新兵"]
			],
			"Savage Combatant": ["狂野争斗者", "rare", "激励：在本回合中，使你的英雄获得+2攻击力。", ["HS_effect", "4", "hs_druid", "wildbeast", "5", "4"]],
			"Nexus-Champion Saraad": ["虚灵勇士萨兰德", "legend", "激励：随机将一张法术牌置入你的手牌。", ["HS_effect", "5", "", "none", "4", "5"],
				["legend", "jili:rangain>法术"]
			],
			"Spawn of Shadows": ["暗影子嗣", "rare", "激励：对每个英雄造成4点伤害。", ["HS_effect", "4", "hs_priest", "none", "5", "4"]],
			"Thunder Bluff Valiant": ["雷霆崖勇士", "rare", "激励：使你的图腾获得+2攻击力。", ["HS_effect", "5", "hs_shaman", "none", "3", "6"]],
			"Tournament Medic": ["赛场医师", "ordinary", "激励：为你的英雄恢复2点生命值。", ["HS_effect", "4", "", "none", "1", "8"]],
			"Dalaran Aspirant": ["达拉然铁骑士", "ordinary", "激励：获得法术伤害+1。", ["HS_effect", "4", "hs_mage", "none", "3", "5"]],
			"Wyrmrest Agent": ["龙眠教官", "rare", "战吼：如果你的手牌中有龙牌，便获得+1攻击力和嘲讽。", ["HS_effect", "2", "hs_priest", "none", "1", "4"],
				["rareEff"]
			],
			"Silent Knight": ["沉默的骑士", "ordinary", "潜行，圣盾", ["HS_effect", "3", "", "none", "2", "2"]],
			"Ram Wrangler": ["暴躁的牧羊人", "rare", "战吼：如果你控制任何野兽，则随机召唤一个野兽。", ["HS_effect", "5", "hs_hunter", "none", "3", "3"],
				["rareEff"]
			],
			"Shadowfiend": ["暗影魔", "epic", "每当你抽一张牌时，使其法力值消耗减少（1）点。", ["HS_effect", "3", "hs_priest", "none", "3", "3"]],
			"Boar1": ["野猪", "essential", "冲锋", ["HS_effect", "3", "", "wildbeast", "4", "2"],
				["tokened", "nosearch"]
			],
			"Totem Golem": ["图腾魔像", "ordinary", "过载：（1）", ["HS_effect", "2", "hs_shaman", "totem", "3", "4"]],
			"Twilight Guardian": ["暮光守护者", "epic", "战吼：如果你的手牌中有龙牌，便获得+1攻击力和嘲讽。", ["HS_effect", "4", "", "dragon", "2", "6"],
				["rareEff"]
			],
			"Ice Rager": ["冰霜暴怒者", "ordinary", "再怎么说他也要比岩浆暴怒者冷静多了。", ["HS_normal", "3", "", "none", "5", "2"]],
			"Rhonin": ["罗宁", "legend", "亡语：将三张奥术飞弹置入你的手牌。", ["HS_effect", "8", "hs_mage", "none", "7", "7"],
				["legend", "deathRattle:gain>['奥术飞弹',3]"]
			],
			"Frigid Snobold": ["雪地狗头人", "ordinary", "法术伤害+1", ["HS_effect", "4", "", "none", "2", "6"]],
			"Clockwork Knight": ["发条骑士", "ordinary", "战吼：使一个友方机械获得+1/+1。", ["HS_effect", "5", "", "machine", "5", "5"],
				["rareEff", "battleRoal:fltbuff>mine,machine：11"]
			],
			"Captured Jormungar": ["俘获的冰虫", "ordinary",
				"你可以把它养着做宠物。但你要保证每天准点喂食，还要清理它的水缸！", ["HS_normal", "7", "", "wildbeast", "5", "9"]
			],
			"Frost Giant": ["冰霜巨人", "epic", "在本局对战中，每当你使用一次英雄技能，该牌的法力值消耗便减少（1）点。", ["HS_effect", "10", "", "none", "8", "8"],
				["changecost:return p.hs_state.hrsk;"]
			],
			"Argent Horserider": ["银色骑手", "ordinary", "冲锋，圣盾", ["HS_effect", "3", "", "none", "2", "1"]],
			"Mogors Champion": ["穆戈尔的勇士", "rare", "50%几率攻击错误的敌人。", ["HS_effect", "6", "", "none", "8", "5"]],
			"Tournament Attendee": ["赛场观众", "ordinary", "嘲讽", ["HS_effect", "1", "", "none", "2", "1"]],
			"Pit Fighter": ["格斗士", "ordinary", "他们的血液里充斥着尚武精神，想要打一架吗？", ["HS_normal", "5", "", "none", "5", "6"]],
			"North Sea Kraken": ["北海海怪", "ordinary", "战吼：造成4点伤害。", ["HS_effect", "9", "", "none", "9", "7"]],
			"Flame Juggler": ["火焰杂耍者", "ordinary", "战吼：随机对一个敌人造成1点伤害。", ["HS_effect", "2", "", "none", "2", "3"]],
			"Holy Champion": ["神圣勇士", "ordinary", "每当一个角色获得治疗，便获得+2攻击力。", ["HS_effect", "4", "hs_priest", "none", "3", "5"]],
			"Eydis Darkbane": ["黑暗邪使艾蒂丝", "legend", "每当你以该随从为目标施放一个法术时，便随机对一个敌人造成3点伤害。", ["HS_effect", "3", "", "undead", "3", "4"]],
			"Acidmaw": ["酸喉", "legend", "每当有其他随从受到伤害，将其消灭。", ["HS_effect", "7", "hs_hunter", "wildbeast", "4", "2"]],
			"Grand Crusader": ["十字军统领", "epic", "战吼：随机将一张圣骑士牌置入你的手牌。", ["HS_effect", "6", "", "none", "5", "5"],
				["battleRoal:rangain>hs_paladin"]
			],
			"Muklas Champion": ["穆克拉的勇士", "ordinary", "激励：使你的其他随从获得+1/+1。", ["HS_effect", "5", "", "wildbeast", "4", "3"]],
			"Kvaldir Raider": ["克瓦迪尔劫掠者", "ordinary", "激励：获得+2/+2。", ["HS_effect", "5", "", "none", "4", "4"]],
			"Injured Kvaldir": ["受伤的克瓦迪尔", "rare", "战吼：对自身造成3点伤害。", ["HS_effect", "1", "", "none", "2", "4"]],
			"Recruiter": ["征募官", "epic", "激励：将一个2/2的侍从置入你的手牌。", ["HS_effect", "5", "", "none", "5", "4"],
				["jili:gain>'侍从'"]
			],
			"Anubarak": ["阿努巴拉克", "legend", "亡语：将该随从移回你的手牌，召唤一个4/4的蛛魔。", ["HS_effect", "9", "hs_rogue", "none", "8", "4"]],
			"Warhorse Trainer": ["战马训练师", "ordinary", "你的白银之手新兵获得+1攻击力。", ["HS_effect", "3", "hs_paladin", "none", "3", "4"]],
			"Mysterious Challenger": ["神秘挑战者", "epic", "战吼：将每种不同的奥秘从你的牌库中置入战场。", ["HS_effect", "6", "hs_paladin", "none", "6", "6"]],
			"Eadric the Pure": ["纯洁者耶德瑞克", "legend", "战吼：使所有敌方随从的攻击力变为1。", ["HS_effect", "7", "hs_paladin", "none", "3", "7"]],
			"Void Crusher": ["虚空碾压者", "rare", "激励：随机消灭每个玩家的一个随从。", ["HS_effect", "6", "hs_warlock", "demon", "5", "4"]],
			"Gadgetzan Jouster": ["加基森枪骑士", "ordinary", "战吼：揭示双方牌库里的一张随从牌。如果你的牌法力值消耗较大，则获得+1/+1。", ["HS_effect", "1", "", "none", "1", "2"]],
			"Boneguard Lieutenant": ["白骨卫士军官", "ordinary", "激励：获得+1生命值。", ["HS_effect", "2", "", "undead", "3", "2"]],
			"Argent Watchman": ["银色警卫", "rare", "无法攻击。 激励：在本回合中可正常进行攻击。", ["HS_effect", "2", "", "none", "2", "4"]],
			"Garrison Commander": ["要塞指挥官", "epic", "每个回合你可以使用两次英雄技能。", ["HS_effect", "2", "", "none", "2", "3"]],
			"Lance Carrier": ["持枪侍从", "ordinary", "战吼：使一个友方随从获得+2攻击力。", ["HS_effect", "2", "", "none", "1", "2"],
				["battleRoal:mebuff>A2"]
			],
			"Coliseum Manager": ["角斗场主管", "rare", "激励：将该随从移回你的手牌。", ["HS_effect", "3", "", "none", "2", "5"]],
			"Fencing Coach": ["击剑教头", "rare", "战吼：你的下一个英雄技能的法力值消耗减少（2）点。", ["HS_effect", "3", "", "none", "2", "2"]],
			"Lights Champion": ["圣光勇士", "rare", "战吼：沉默一个恶魔。", ["HS_effect", "3", "", "none", "4", "3"],
				["battleRoal:fltbuff>mns,demon：cm"]
			],
			"Saboteur": ["破坏者", "rare", "战吼：下个回合敌方英雄技能的法力值消耗增加5点。", ["HS_effect", "3", "", "none", "4", "3"]],
			"Master of Ceremonies": ["庆典司仪", "epic", "战吼：如果你控制任何具有法术伤害的随从，便获得+2/+2。", ["HS_effect", "3", "", "none", "4", "2"],
				["rareEff"]
			],
			"Dragonhawk Rider": ["龙鹰骑士", "ordinary", "激励：在本回合中获得风怒。", ["HS_effect", "3", "", "none", "3", "3"]],
			"Armored Warhorse": ["重甲战马", "rare", "战吼：揭示双方牌库里的一张随从牌。如果你的牌法力值消耗较大，则获得冲锋。", ["HS_effect", "4", "", "wildbeast", "5", "3"]],
			"Refreshment Vendor": ["零食商贩", "ordinary", "战吼：为每个英雄恢复4点生命值。", ["HS_effect", "4", "", "none", "3", "5"]],
			"Maiden of the Lake": ["湖之仙女", "ordinary", "你的英雄技能的法力值消耗为（1）点。", ["HS_effect", "4", "", "none", "2", "6"]],
			"The Skeleton Knight": ["骷髅骑士", "legend", "亡语：揭示双方牌库里的一张随从牌。如果你的牌法力值消耗较大，则将骷髅骑士移回你的手牌。", ["HS_effect", "6", "", "undead", "7", "4"],
				["legend"]
			],
			"Icehowl": ["冰吼", "legend", "冲锋，无法攻击英雄。", ["HS_effect", "9", "", "none", "10", "10"],
				["legend"]
			],
			"Chillmaw": ["冰喉", "legend", "嘲讽，亡语：如果你的手牌中有龙牌，则对所有随从造成3点伤害。", ["HS_effect", "7", "", "dragon", "6", "6"],
				["legend"]
			],
			"Sideshow Spelleater": ["杂耍吞法者", "epic", "战吼：复制对手的英雄技能。", ["HS_effect", "6", "", "none", "6", "5"]],
			"Master Jouster": ["大师级枪骑士", "rare", "战吼：揭示双方牌库里的一张随从牌。如果你的牌法力值消耗较大，则获得嘲讽和圣盾。", ["HS_effect", "6", "", "none", "5", "6"]],
			"Kodorider": ["科多兽骑手", "epic", "激励：召唤一个3/5的作战科多兽。", ["HS_effect", "6", "", "none", "3", "5"],
				["jili:作战科多兽"]
			],
			"War Kodo": ["作战科多兽", "essential", "", ["HS_normal", "5", "", "none", "3", "5"],
				["tokened"]
			],
			/*不好写*/
			"Knight of the Wild": ["荒野骑士", "rare", "每当你召唤一个野兽，该随从牌的法力值消耗减少（1）点。", ["HS_effect", "7", "hs_druid", "none", "6", "6"]],
			"Druid of the Saber": ["刃牙德鲁伊", "ordinary", "抉择：将该随从变形成为2/1并具有冲锋；或者将该随从变形成为3/2并具有潜行。", ["HS_effect", "2", "hs_druid", "none", "2", "1"]],
			"Druid of the Saber1": ["刃牙德鲁伊", "ordinary", "冲锋", ["HS_effect", "2", "hs_druid", "wildbeast", "2", "1"],
				["tokened", "nosearch"]
			],
			"Druid of the Saber2": ["刃牙德鲁伊", "ordinary", "潜行", ["HS_effect", "2", "hs_druid", "wildbeast", "3", "2"],
				["tokened", "nosearch"]
			],
			"Varian Wrynn": ["瓦里安·乌瑞恩", "legend", "战吼：抽三张牌。将抽到的随从牌直接置入战场。", ["HS_effect", "10", "hs_warrior", "none", "7", "7"],
				["legend"]
			],
			"Orgrimmar Aspirant": ["奥格瑞玛狼骑士", "ordinary", "激励：使你的武器获得+1攻击力。", ["HS_effect", "3", "hs_warrior", "none", "3", "3"]],
			"Wrathguard": ["愤怒卫士", "ordinary", "每当该随从受到伤害，对你的英雄造成等量的伤害。", ["HS_effect", "2", "hs_warlock", "demon", "4", "3"]],
			"Dreadsteed": ["恐惧战马", "epic", "亡语：在回合结束时召唤一个恐惧战马。", ["HS_effect", "4", "hs_warlock", "demon", "1", "1"]],
			"Wilfred Fizzlebang": ["威尔弗雷德·菲兹班", "legend", "你通过英雄技能抽到的卡牌，其法力值消耗为（0）点。", ["HS_effect", "6", "hs_warlock", "none", "4", "4"],
				["legend"]
			],
			"Fallen Hero": ["英雄之魂", "rare", "你的英雄技能会额外造成1点伤害。", ["HS_effect", "2", "hs_mage", "undead", "3", "2"]],
			"Coldarra Drake": ["考达拉幼龙", "epic", "你可以使用任意次数的英雄技能。", ["HS_effect", "6", "hs_mage", "dragon", "6", "6"]],
			"Brave Archer": ["神勇弓箭手", "ordinary", "激励：如果你没有其他手牌，则对敌方英雄造成2点伤害。", ["HS_effect", "1", "hs_hunter", "none", "2", "1"]],
			"Kings Elekk": ["皇家雷象", "ordinary", "战吼：揭示双方牌库里的一张随从牌。如果你的牌法力值消耗较大，抽这张牌。", ["HS_effect", "2", "hs_hunter", "wildbeast", "3", "2"]],
			"Tuskarr Totemic": ["海象人图腾师", "ordinary", "战吼：随机召唤一个基础图腾。", ["HS_effect", "3", "hs_shaman", "none", "3", "2"]],
			"Draenei Totemcarver": ["德莱尼图腾师", "rare", "战吼：每有一个友方图腾，便获得+1/+1。", ["HS_effect", "4", "hs_shaman", "none", "4", "5"],
				["rareEff"]
			],
			/*不好写*/
			"The Mistcaller": ["唤雾者伊戈瓦尔", "legend", "战吼：使你的手牌和牌库里的所有随从牌获得+1/+1。", ["HS_effect", "6", "hs_shaman", "undead", "4", "4"],
				["legend"]
			],
			"Fjola Lightbane": ["光明邪使菲奥拉", "legend", "每当你以该随从为目标施放一个法术时，便获得圣盾。", ["HS_effect", "3", "", "undead", "3", "4"]],
			"Tuskarr Jouster": ["海象人龟骑士", "epic", "战吼：揭示双方牌库里的一张随从牌。如果你的牌法力值消耗较大，则为你的英雄恢复7点生命值。", ["HS_effect", "5", "hs_paladin", "none", "5", "5"]],
		},
		skill: {
			hs_DruidOfTheSaber: {
				juezetrans: true,
			},
			hs_DraeneiTotemcarver: {
				battleRoal: {
					filter(player) {
						return player.sctp("mine", fl => fl.rkind == "totem");
					},
					async effect(event, trigger, player) {
						const num = player.sctp("mine", fl => fl.rkind == "totem", true).length;
						event.fellow.updateSelfBuff([num, num]);
					},
				},
			},
			hs_VarianWrynn: {
				async battleRoal(event, trigger, player) {
					let num = 3,
						i = 0;
					while (i < num) {
						const hs = player.cardPile.getCards("h");
						if (hs.length > 0 && !player.hs_full() && get.type(hs[0]) == "HS_minor") {
							await player.hs_join2(hs.slice(0, 1));
						} else await player.hs_drawDeck();
						await game.delay();
						i++;
					}
				},
			},
			"hs_FjolaLightbane": {
				useCard: {
					filter: "法术目标",
					self: true,
					async effect(event, trigger, player) {
						event.fellow.addgjzbuff("shengdun");
					}
				}
			},
			"hs_TuskarrJouster": {
				async battleRoal(event, trigger, player) {
					const {
						result
					} = await player.hs_compare();
					if (result.bool) await player.hs_dmgrcv(event.fellow, "recover", 7);
				}
			},
			"hs_KingsElekk": {
				async battleRoal(event, trigger, player) {
					await player.hs_compare((p, evt) => {
						p.hs_drawDeck2([evt.c1]);
					});
				},
			},
			"hs_ArmoredWarhorse": {
				async battleRoal(event, trigger, player) {
					const {
						result
					} = await player.hs_compare();
					if (result.bool) event.fellow.addgjzbuff("chongfeng");
				}
			},
			"hs_GadgetzanJouster": {
				async battleRoal(event, trigger, player) {
					const {
						result
					} = await player.hs_compare();
					if (result.bool) event.fellow.updateSelfBuff([1, 1]);
				}
			},
			"hs_TuskarrTotemic": {
				async battleRoal(event, trigger, player) {
					event.fellow.SSfellow("cdset:图腾");
				}
			},
			"hs_MasterJouster": {
				async battleRoal(event, trigger, player) {
					const {
						result
					} = await player.hs_compare();
					if (result.bool) {
						event.fellow.addgjzbuff("chaofeng");
						event.fellow.addgjzbuff("shengdun");
					}
				}
			},
			hs_ColiseumManager: {
				async jili(event, trigger, player) {
					event.fellow.HSF("backtohand");
				},
			},
			hs_Icehowl: {
				numgh: {
					name: "noattack",
					ghfilter(f, t) {
						return !t.isMin();
					},
					range(fellow, target) {
						return target == fellow;
					},
				},
			},
			hs_Chillmaw: {
				deathRattle: {
					filter(evt, p, f) {
						return p.countCards("h", ca => get.rkind(ca) == "dragon") > 0;
					},
					async effect(event, trigger, player) {
						get.HSF("lavaeffect", ["damage", 3, "lava", event.fellow]);
					},
				},
			},
			hs_ArgentWatchman: {
				async jili(event, trigger, player) {
					event.fellow.addaurasbuff({
						name: "canattack",
						range(fellow, target) {
							return target == fellow;
						},
						temp: 1,
					});
				},
			},
			hs_WilfredFizzlebang: {
				drawAfter: {
					self: true,
					filter(evt, p, f) {
						return evt.hs_heroskill;
					},
					async effect(event, trigger, player) {
						event.evt.card.addhsbuff({
							name: "hs_cost",
							type: "hs_cost",
							subtype: "final",
							value: 0,
							creator: event.fellow,
							fellow: event.fellow,
						});
					},
				},
			},
			hs_FallenHero: {
				numgh: {
					name: "damage",
					value: 1,
					ghfilter(p, f, t, evt) {
						return evt.hs_heroskill;
					},
					range(fellow, target) {
						return target == fellow.getLeader();
					},
				},
			},
			hs_DragonhawkRider: {
				async jili(event, trigger, player) {
					event.fellow.addgjzbuff("fengnu", 1);
				},
			},
			hs_MaidenOfTheLake: {
				numgh: {
					name: "hrskcost",
					subtype: "final",
					value: 1,
					range(fellow, target) {
						return target == fellow.getLeader();
					},
				},
			},
			hs_OrgrimmarAspirant: {
				jili: {
					filter(evt, p, f) {
						return p.data_weapon;
					},
					recheck: "filter",
					async effect(event, trigger, player) {
						player.addwpbuff(1);
					},
				},
			},
			hs_Wrathguard: {
				hsdmg: {
					fl: true,
					randomRT(p) {
						return p;
					},
					async effect(event, trigger, player) {
						event.target.hs_dmgrcv("damage", event.fellow, event.evt.num);
					},
				},
			},
			hs_FencingCoach: {
				async battleRoal(event, trigger, player) {
					player.addturnbuff("hrskcost", 2, () => true, Infinity);
				},
			},
			hs_Saboteur: {
				async battleRoal(event, trigger, player) {
					const o = player.getOppo();
					const t = event.fellow;
					t.HSline(o.heroskill, "green");
					player.addhsbuff.call(o.heroskill, {
						name: "hs_cost",
						type: "hs_cost",
						value: -5,
						temp: 1,
						countphase: o,
						creator: t,
						fellow: t,
					});
				},
			},
			hs_MasterOfCeremonies: {
				battleRoal: {
					filter(player, card) {
						return player.countFq() > 0;
					},
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff([2, 2]);
					},
				},
			},
			hs_GarrisonCommander: {
				numgh: {
					name: "hrskusable",
					value: 2,
					range(fellow, target) {
						return target == fellow.getLeader();
					},
				},
			},
			hs_ColdarraDrake: {
				numgh: {
					name: "hrskusable",
					value: Infinity,
					range(fellow, target) {
						return target == fellow.getLeader();
					},
				},
			},
			hs_TheSkeletonKnight: {
				async deathRattle(event, trigger, player) {
					const {
						result
					} = await player.hs_compare();
					if (result.bool) await event.fellow.HSF("backtohand");
				}
			},
			hs_SideshowSpelleater: {
				async battleRoal(event, trigger, player) {
					const hrsk = player.getOppo().heroskill;
					await player.HSF("changeHeroskill", [hrsk.skill]);
					for (const i of hrsk.buff) {
						get.HSF("copybuff", [i, player.heroskill]);
					}
				},
			},
			hs_Dreadsteed: {
				async deathRattle(event, trigger, player) {
					player.addtriggerbuff({
						info: lib.skill.hs_Dreadsteed.delayeffect
					}, 1);
				},
				delayeffect: {
					ending: {
						async effect(event, trigger, player) {
							player.SSfellow("恐惧战马");
						},
					},
				},
			},
			hs_BraveArcher: {
				jili: {
					filter(evt, p, f) {
						return p.num("h") == 0;
					},
					randomRT(p) {
						return p.getOppo();
					},
					async effect(event, trigger, player) {
						event.target.hs_dmgrcv("damage", event.fellow, 2);
					},
				},
			},
			//旧卡
			"hs_CrowdFavorite": {
				useCard: {
					self: true,
					notlink: true,
					filter(evt, player, fellow) {
						return get.rGJZ(evt.cards[0], "battleRoal");
					},
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff([1, 1])
					},
				},
			},
			"hs_Aviana": {
				numgh: {
					name: "hs_cost",
					value: 1,
					subtype: "final",
					ghfilter(card, fellow, target) {
						return target == fellow.getLeader() && get.type(card) == "HS_minor";
					},
				},
			},
			"hs_SavageCombatant": {
				async jili(event, trigger, player) {
					player.addvaluebuff(2, 1);
				},
			},
			"hs_ThunderBluffValiant": {
				async jili(event, trigger, player) {
					player.sctp("mine", fl => {
						if (fl.rkind == "totem") fl.addvaluebuff(2);
					});
				},
			},
			"hs_DalaranAspirant": {
				async jili(event, trigger, player) {
					event.fellow.addFqbuff("hs_power", 1);
				},
			},
			"hs_DarnassusAspirant": {
				async battleRoal(event, trigger, player) {
					player.HSF("gainmana", [1, true]);
				},
				async deathRattle(event, trigger, player) {
					player.HSF("removemana", [1]);
				},
			},
			"hs_ShadyDealer": {
				battleRoal: {
					filter(player) {
						return player.sctp("mns", t => t.rkind == "pirate");
					},
					async effect(event, trigger, player) {
						event.fellow.addvaluebuff([1, 1]);
					},
				},
			},
			"hs_AlexstraszasChampion": {
				battleRoal: {
					filter: "龙牌",
					async effect(event, trigger, player) {
						event.fellow.addvaluebuff(1);
						event.fellow.addgjzbuff("chongfeng");
					},
				},
			},
			"hs_Buccaneer": {
				equipAfter: {
					self: true,
					async effect(event, trigger, player) {
						player.addwpbuff(event.evt.div, 1);
					},
				},
			},
			"hs_JusticarTrueheart": {
				async battleRoal(event, trigger, player) {
					const sk = player.heroskill.skill;
					const oo = get.HSA("exhrsk")[sk.slice(-4)];
					if (oo) {
						const nsk = sk.replace("_legend", "") + "ex";
						lib.hearthstone.eval_heroskill(nsk, oo);
						player.HSF("changeHeroskill", [nsk]);
					}
				},
			},
			"hs_Cutpurse": {
				attackBegin: {
					fl: true,
					filter(evt, p, f) {
						return !evt.target.isMin() && f.HSF("alive");
					},
					recheck: "filter",
					async effect(event, trigger, player) {
						player.hs_gain("幸运币");
					},
				},
			},
			"hs_GormokTheImpaler": {
				prompt: "战吼：如果你拥有至少四个其他随从，则造成4点伤害。",
				battleRoal: {
					aifamily: "damage",
					filter(p) {
						return p.countFellow() >= 4;
					},
					filterTarget: lib.filter.all,
					async effect(event, trigger, player) {
						event.target.hs_dmgrcv('damage', event.fellow, 4);
					},
				},
			},
			"hs_TinyKnightOfEvil": {
				discard: {
					self: true,
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff([1, 1]);
					},
				},
			},
			"hs_Spellslinger": {
				async battleRoal(event, trigger, player) {
					player.sctp("heros", t => t.hs_gain(get.hskachi("HS_spell").randomGet()));
				},
			},
			"hs_BolfRamshield": {
				hsdmgBefore: {
					self: true,
					recheck(evt, p) {
						return evt.evt.player == p;
					},
					async effect(event, trigger, player) {
						event.orievt.player = event.fellow;
					},
				},
			},
			"hs_WyrmrestAgent": {
				battleRoal: {
					filter: "龙牌",
					async effect(event, trigger, player) {
						event.fellow.addautovaluebuff(1, get.hs_id(event.fellow));
						event.fellow.addgjzbuff("chaofeng");
					},
				},
			},
			"hs_RamWrangler": {
				battleRoal: {
					filter(p) {
						return p.hasFellow(t => t.rkind == "wildbeast");
					},
					async effect(event, trigger, player) {
						event.fellow.SSfellow("range:野兽");
					},
				},
			},
			"hs_Shadowfiend": {
				drawAfter: {
					self: true,
					async effect(event, trigger, player) {
						event.evt.card.addhsbuff({
							name: "hs_cost",
							type: "hs_cost",
							value: 1,
							creator: event.fellow,
							fellow: event.fellow,
						});
					},
				},
			},
			"hs_TwilightGuardian": {
				inherit: "hs_WyrmrestAgent",
			},
			"hs_Acidmaw": {
				hsdmg: {
					filter(evt, p, f) {
						return f.sctp("mns_", evt.player);
					},
					randomRT(p, evt) {
						return evt.player;
					},
					async effect(event, trigger, player) {
						event.target.HSF("cuihui");
					},
				},
			},
			"hs_MuklasChampion": {
				async jili(event, trigger, player) {
					event.fellow.sctp("mine_", fl => {
						fl.addvaluebuff([1, 1]);
					});
				},
			},
			"hs_InjuredKvaldir": {
				async battleRoal(event, trigger, player) {
					event.fellow.hs_dmgrcv("damage", 3, "self");
				},
			},
			"hs_Anubarak": {
				async deathRattle(event, trigger, player) {
					await event.fellow.HSF("backtohand");
					await player.SSfellow("hs_Nerubian2_monster");
				},
			},
			"hs_WarhorseTrainer": {
				numgh: {
					name: "value",
					value: [1, 0],
					range(fellow, target) {
						return get.translation(target.name) == "白银之手新兵" && fellow.sctp("mine_", target);
					},
				},
			},
			"hs_MysteriousChallenger": {
				async battleRoal(event, trigger, player) {
					let cs = player.cardPile.getCards("h", c => get.subtype(c) == "HS_secret" && player.canaddsecret(c));
					while (cs.length > 0) {
						const cho = cs.randomGet();
						player.cardPile.lose([cho], ui.special);
						player.discardPile.HSline(player, "green");
						await player.use_secret(cho);
						cs = player.cardPile.getCards("h", c => get.subtype(c) == "HS_secret" && player.canaddsecret(c));
					}
				},
			},
			"hs_EadricThePure": {
				async battleRoal(event, trigger, player) {
					player.getOppo().sctp("mine", fl => {
						fl.addvaluefinal(1);
					});
				},
			},
			"hs_VoidCrusher": {
				async jili(event, trigger, player) {
					player.sctp("main", pl => {
						const tg = pl.sctp("mine").filter(fl => fl.HSF("alive")).randomGet();
						if (tg) {
							event.fellow.HSline(tg, "green");
							tg.HSF("cuihui");
						}
					});
				},
			},


		},
	},
	spell: {
		info: {
			hs_Mulch: ["腐根", "epic", ["kill:1", "消灭一个随从。随机将一张随从牌置入对手的手牌。"], 3, "hs_druid", ["gift2"]],
			hs_AstralCommunion: ["星界沟通", "epic", "获得十个法力水晶。弃掉你的手牌。", 4, "hs_druid"],
			hs_Burgle: ["剽窃", "rare", "随机将两张（你对手职业的）卡牌置入你的手牌。", 3, "hs_rogue", ["gain:player.getOppo().group=='hs_neutral'?['幸运币','幸运币']:get.hskachi('all',(c,info)=>info.rnature==player.getOppo().group).randomGets(2)"]],
			hs_FistOfJaraxxus: ["加拉克苏斯之拳", "rare", "当你使用或弃掉这张牌时，随机对一个敌人造成4点伤害。", 4, "hs_warlock"],
			hs_SealOfChampions: ["英勇圣印", "ordinary", ["buff:A3,shengdun", "使一个随从获得+3攻击力和圣盾。"], 3, "hs_paladin"],
			hs_Bash: ["怒袭", "ordinary", ["damage:3", "造成3点伤害。获得3点护甲值。"], 3, "hs_warrior", ["atkhj:[0,3]"]],
			hs_Powershot: ["强风射击", "rare", "对一个随从及其相邻的随从造成2点伤害。", 3, "hs_hunter"],
			hs_PolymorphBoar: ["变形术：野猪", "rare", ["bxs:hs_Boar1_monster", "使一个随从变形成为一个4/2并具有冲锋的野猪。"], 3, "hs_mage"],
			hs_FlashHeal: ["快速治疗", "ordinary", "recover:5", 1, "hs_priest"],
			hs_HealingWave: ["治疗波", "rare", "恢复7点生命值。揭示双方牌库里的一张随从牌。如果你的牌法力值消耗较大，改为恢复14点生命值。", 3, "hs_shaman"],
			hs_BeneathTheGrounds: ["危机四伏", "epic", "将三张伏击牌洗入你对手的牌库。当你的对手抽到该牌，便为你召唤一个4/4的蛛魔。", 3, "hs_rogue"],
			hs_NerubianAmbush: ["蛛魔伏击", "essential", "抽到时施放，为你的对手召唤一个4/4的蛛魔。", 3, "hs_rogue", ["token", "hsdraw:player.SSfellow('hs_Nerubian2_monster',true);"]],
			hs_AncestralKnowledge: ["先祖知识", "ordinary", ["draw:2", "抽两张牌。过载：（2）"], 2, "hs_shaman"],
			hs_Confuse: ["迷乱", "epic", "将所有随从的攻击力和生命值互换。", 2, "hs_priest"],
			hs_PowerWordGlory: ["真言术：耀", "ordinary", "选择一个随从。每当其进行攻击，为你的英雄恢复4点生命值。", 1, "hs_priest"],
			hs_FlameLance: ["炎枪术", "ordinary", ["damage:8", "对一个随从造成8点伤害。"], 5, "hs_mage", ["fire", "only:fellow"]],
			hs_ArcaneBlast: ["奥术冲击", "epic", ["damage:2", "对一个随从造成2点伤害。该法术受到的法术伤害增益效果翻倍。"], 1, "hs_mage", ["only:fellow", "doubleD"]],
			hs_Bolster: ["加固", "ordinary", "使你具有嘲讽的随从获得+2/+2。", 2, "hs_warrior"],
			hs_ElementalDestruction: ["元素毁灭", "epic", "对所有随从造成4到5点伤害。过载：（5）", 3, "hs_shaman"],
			hs_LivingRoots: ["活体根须", "ordinary", "抉择：造成2点伤害；或者召唤两个1/1的树苗。", 1, "hs_druid"],
			hs_BallofSpiders: ["天降蛛群", "rare", ["summon:['结网蛛', 3]", "召唤三个1/1的结网蛛。"], 6, "hs_hunter"],
			hs_LockandLoad: ["子弹上膛", "epic", "在本回合中，每当你施放一个法术，随机将一张猎人卡牌置入你的手牌。", 1, "hs_hunter"],
			hs_DarkBargain: ["黑暗交易", "epic", "随机消灭两个敌方随从，随机弃两张牌。", 6, "hs_warlock"],
			hs_Convert: ["策反", "rare", "将一个敌方随从的一张复制置入你的手牌。", 2, "hs_priest", ["only:enm"]],
			hs_Demonfuse: ["恶魔融合", "ordinary", ["buff:33", "使一个恶魔获得+3/+3，使你的对手获得一个法力水晶。"], 2, "hs_warlock", ["only:demon", "other:player.getOppo().HSF('gainmana',[1]);"]],
			hs_EnterTheColiseum: ["精英对决", "epic", "除了每个玩家攻击力最高的随从之外，消灭所有其他随从。", 6, "hs_paladin"],
			//抉择选项
			hs_OneTwoTrees: ["并蒂树苗", "essential", ["summon:['树苗', 2]", "召唤两个1/1的树苗。"], 1, "hs_druid", ["token", "nosearch"]],
			hs_GraspingRoots: ["缠人根须", "essential", "damage:2", 1, "hs_druid", ["token", "nosearch"]],
			hs_DruidOfTheSaber1jz: ["雄狮形态", "ordinary", "", 2, "hs_druid", ["token", "nosearch"]],
			hs_DruidOfTheSaber2jz: ["黑豹形态", "ordinary", "", 2, "hs_druid", ["token", "nosearch"]],
		},
		skill: {
			hs_Convert: {
				async content(event, trigger, player) {
					player.hs_gain(event.target.linkCard[0].name);
				},
				spellgain: true,
			},
			hs_EnterTheColiseum: {
				sfilter(card, player) {
					return player.sctp("mine").length && player.sctp("notmine").length;
				},
				async content(event, trigger, player) {
					const memax = Math.max.apply(Math, player.sctp("mine").map(fl => fl.ATK));
					const enmmax = Math.max.apply(Math, player.sctp("notmine").map(fl => fl.ATK));
					const melucky = player.sctp("mine").filter(fl => fl.ATK == memax).randomGet();
					const enmlucky = player.sctp("notmine").filter(fl => fl.ATK == enmmax).randomGet();
					const willdie = player.sctp("mns").removeArray([melucky, enmlucky]);
					willdie.forEach(fl => {
						fl.HSF("cuihui");
					});
				},
			},
			hs_LockandLoad: {
				async content(event, trigger, player) {
					player.addtriggerbuff(event.card, 1);
				},
				delayeffect: {
					useCard: {
						self: true,
						filter: "法术",
						async effect(event, trigger, player) {
							const f = get.hsflt("猎人");
							await player.hs_gain(get.hskachi('all', f).randomGet());
						},
					},
				},
			},
			hs_DarkBargain: {
				sfilter(card, player) {
					return player.sctp("notmine").filter(t => t.HSF("alive")).length >= 2
				},
				randomRT(p) {
					const fls = p.sctp("notmine").filter(t => t.HSF("alive"));
					if (fls.length < 2) return false;
					return fls.randomGets(2);
				},
				tgs: true,
				async content(event, trigger, player) {
					event.targets.forEach(fl => {
						fl.HSF("cuihui");
					});
					await player.hs_discard(2);
				},
			},
			hs_ElementalDestruction: {
				async content(event, trigger, player) {
					player.hs_dmgrcvNotaoe(player, event.card, player.sctp("mns"), "thunder").set("num", () => get.rand(4, 5));
				},
				spelldamage: 4,
			},
			hs_LivingRoots: {
				async content(event, trigger, player) {
					player.hs_jueze(["hs_GraspingRoots", "hs_OneTwoTrees"], event.card);
				},
			},
			//旧卡
			hs_AstralCommunion: {
				async content(event, trigger, player) {
					if (player.HSF("manamax") < 10) player.HSF("gainmana", [10]);
					await player.hs_discard("all");
				},
			},
			hs_FistOfJaraxxus: {
				randomRT(player) {
					return player.HSF("randmgfil");
				},
				async content(event, trigger, player) {
					event.target.hs_dmgrcv("damage", 4);
				},
				sameeffect: "discarded",
			},
			hs_Powershot: {
				filterTarget(card, player, target) {
					return player.sctp("mns", target);
				},
				async content(event, trigger, player) {
					const tgs = [event.target, event.target.leftseat, event.target.rightseat].filter(i => i);
					player.hs_dmgrcvaoe(2, event.card, player, "damage", tgs).nosort = true;
				},
				spelldamage: 2,
			},
			hs_HealingWave: {
				filterTarget: true,
				async content(event, trigger, player) {
					const {
						result
					} = await player.hs_compare();
					const num = result.bool ? 14 : 7;
					event.target.hs_dmgrcv("recover", num);
				},
				spellrecover: 7,
			},
			hs_BeneathTheGrounds: {
				async content(event, trigger, player) {
					player.getOppo().HSF("addtodeck", [
						["蛛魔伏击", 3]
					]);
				},
			},
			hs_Confuse: {
				async content(event, trigger, player) {
					player.sctp("mns", t => {
						t.hs_reverse();
					});
				},
			},
			hs_PowerWordGlory: {
				filterTarget(card, player, target) {
					return target.isMin();
				},
				async content(event, trigger, player) {
					const obj = event.target.addtriggerbuff(event.card);
					obj.pren = player == event.target.getLeader();
				},
				delayeffect: {
					attackBegin: {
						fl: true,
						filter: "存活",
						async effect(event, trigger, player) {
							const p = event.obj.relabuff.player;
							const pren = p == event.fellow.getLeader();
							const pren2 = event.obj.relabuff.pren;
							p.hs_dmgrcv("recover", 4, pren == pren2 ? p : p.getOppo());
						},
					},
				},
			},
			hs_Bolster: {
				async content(event, trigger, player) {
					player.sctp("mine", fl => {
						if (fl.hasgjz("chaofeng")) fl.addvaluebuff([2, 2]);
					})
				},
			},

		},
	},
	trap: {
		info: {
			hs_CompetitiveSpirit: ["争强好胜", "rare", "奥秘：在你的回合开始时，使你的所有随从获得+1/+1。", 1, "hs_paladin"],
			hs_BearTrap: ["捕熊陷阱", "ordinary", "奥秘：在你的英雄受到攻击后，召唤一只3/3并具有嘲讽的灰熊。", 2, "hs_hunter"],
			hs_Effigy: ["轮回", "rare", "奥秘：当一个友方随从死亡时，随机召唤一个法力值消耗相同的随从。", 3, "hs_mage"], //类型:火焰
		},
		skill: {
			hs_CompetitiveSpirit: {
				secret: {
					beginning: {
						self: true,
						filter(evt, p, f) {
							return p.sctp("mine").length > 0;
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							player.sctp("mine", fl => {
								fl.addvaluebuff([1, 1]);
							})
						},
					},
				},
			},
			hs_BearTrap: {
				secret: {
					attackEnd: {
						tg: true,
						filter: "对方回合",
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							await player.SSfellow("铁鬃灰熊");
						},
					},
				},
			},
			hs_Effigy: {
				secret: {
					deathFL: {
						filter: "对方回合",
						filter2(evt, p) {
							return evt.link.getLeader() == p;
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							await player.SSfellow("range:" + event.evt.link.linkCard[0].cost());
						},
					},
				},
			},
		},
	},
	weapon: {
		info: {
			hs_ChargedHammer: ["灌魔之锤", "epic", "亡语：你的英雄技能改为“造成 2点伤害”。", 4, "hs_shaman", 2, 4, ["deathRattle:cghrsk>雷霆震击"]],
			hs_KingsDefender: ["国王护卫者", "rare", "战吼：如果你控制任何具有嘲讽的随从，便获得+1耐久度。", 3, "hs_warrior", 3, 2, ["rareEff"]],
			hs_ArgentLance: ["白银之枪", "rare", "战吼：揭示双方牌库里的一张随从牌。如果你的牌法力值消耗较大，+1耐久度。", 2, "hs_paladin", 2, 2],
			hs_PoisonedBlade: ["淬毒利刃", "epic", "你的英雄技能不会取代该武器，改为+1攻击力。", 4, "hs_rogue", 1, 3],

		},
		skill: {
			hs_KingsDefender: {
				weaponeffect: {
					battleRoal: {
						filter(p) {
							return p.hasFellow(fl => fl.hasgjz("chaofeng"));
						},
						async effect(event, trigger, player) {
							event.fellow.addvaluebuff([0, 1]);
						},
					},
				},
			},
			hs_ArgentLance: {
				weaponeffect: {
					async battleRoal(event, trigger, player) {
						player.hs_compare(function(p, evt) {
							event.fellow.addvaluebuff([0, 1]);
						});
					},
				},
			},
			hs_PoisonedBlade: {
				weaponeffect: {
					equipBefore: {
						charlotte: true,
						filter(evt, p) {
							return evt.player == p && evt.heroskill;
						},
						async effect(event, trigger, player) {
							event.orievt.cancel();
						},
					},
					heroskillAfter: {
						self: true,
						async effect(event, trigger, player) {
							event.fellow.updateSelfBuff(1);
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
		萨兰德: "虚灵勇士萨兰德",
		图哈特: "裁决者图哈特",
		林志玲: "银色神官帕尔崔丝",
		猪: "变形术：野猪",
		穿刺: "穿刺者戈莫克",
		尔康: "纯洁者耶德瑞克",
		三王: "威尔弗雷德·菲兹班",
		瓦王: "瓦里安·乌瑞恩",
	}
};