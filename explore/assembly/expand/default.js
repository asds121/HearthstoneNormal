import {
	lib,
	game,
	ui,
	get,
	ai,
	_status
} from "../../noname.js";

export const DEFAULT = {
	name: "经典怀旧",
	en: "DEFAULT",
	minor: {
		info: {
			"Panther": ["猎豹", "essential", "", ["HS_normal", "2", "hs_druid", "wildbeast", "3", "2"],
				["tokened"]
			],
			"Homing Chicken": ["导航小鸡", "essential", "在你的回合开始时，消灭该随从，并抽三张牌。", ["HS_effect", "1", "", "machine", "0", "1"],
				["tokened"]
			],
			"Emboldener 3000": ["壮胆机器人3000型", "essential", "在你的回合结束时，随机使一个随从获得+1/+1。", ["HS_effect", "1", "", "machine", "0", "4"],
				["tokened"]
			],
			"Poultryizer": ["变鸡器", "essential", "在你的回合开始时，随机将一个随从变为1/1的小鸡。", ["HS_effect", "1", "", "machine", "0", "3"],
				["tokened"]
			],
			"Repair Bot": ["修理机器人", "essential", "在你的回合结束时，为一个受伤的角色恢复6点生命值。", ["HS_effect", "1", "", "machine", "0", "3"],
				["tokened"]
			],
			"Chicken2": ["小鸡", "essential", "小鸡快跑！", ["HS_normal", "0", "", "wildbeast", "1", "1"],
				["tokened", "nosearch"]
			],
			"SpellBender": ["扰咒师", "essential", "", ["HS_normal", "0", "hs_mage", "none", "1", "3"],
				["token"]
			],
			"Kirin Tor Mage": ["肯瑞托法师", "epic", "战吼：在本回合中，你使用的下一个奥秘的法力值消耗为（0）点。", ["HS_effect", "3", "hs_mage", "none", "4", "3"]],
			"Ethereal Arcanist": ["虚灵奥术师", "rare", "如果在你的回合结束时，你控制一个奥秘，该随从便获得+2/+2。", ["HS_effect", "4", "hs_mage", "none", "3", "3"]],
			"Demolisher": ["攻城车", "rare", "在你的回合开始时，随机对一个敌人造成2点伤害。", ["HS_effect", "3", "", "machine", "1", "4"]],
			"Blood Knight": ["血骑士", "epic", "战吼：所有随从失去圣盾。每有一个随从失去圣盾，便获得+3/+3。", ["HS_effect", "3", "", "none", "3", "3"]],
			"Elite Tauren Chieftain": ["精英牛头人酋长", "legend", "战吼：让两位玩家都具有摇滚的能力！（双方各获得一张强力和弦牌）", ["HS_effect", "5", "", "machine", "5", "5"],
				["legend"]
			],
			"Gelbin Mekkatorque": ["格尔宾·梅卡托克", "legend", "战吼：召唤一项惊人的发明。", ["HS_effect", "6", "", "none", "6", "6"],
				["legend"]
			],
			"Starving Buzzard": ["饥饿的秃鹫", "essential", "每当你召唤一个野兽，抽一张牌。", ["HS_effect", "2", "hs_hunter", "wildbeast", "2", "1"]],
			"River Crocolisk": ["淡水鳄", "essential", "“左撇子”爱德华·史密斯曾经试着从一条淡水鳄的嘴里把行李夺回来。", ["HS_normal", "2", "", "wildbeast", "2", "3"]],
			"Murloc Raider": ["鱼人袭击者", "essential", "姆啦啦咯哈姆噶啊啊嘎，姆啦嘎嘎咯，啵啦啦嗯嘞噶哈，姆啦嗝，咯啦哈哈吧啦咯。加尔鲁什咯嘛啦喝，嘛啦咯呵！", ["HS_normal", "1", "", "murloc", "2", "1"]],
			"Murloc Tidehunter": ["鱼人猎潮者", "essential", "战吼：召唤一个1/1的鱼人斥候。", ["HS_effect", "2", "", "murloc", "2", "1"],
				["battleRoal:鱼人斥候"]
			],
			"Murloc Scout": ["鱼人斥候", "essential", "", ["HS_normal", "1", "", "murloc", "1", "1"],
				["token"]
			],
			"Murloc": ["鱼人", "essential", "", ["HS_normal", "0", "", "murloc", "1", "1"],
				["tokened"]
			],
			"Goldshire Footman": ["闪金镇步兵", "essential", "嘲讽", ["HS_effect", "1", "", "none", "1", "2"]],
			"Wolfrider": ["狼骑兵", "essential", "冲锋", ["HS_effect", "3", "", "none", "3", "1"]],
			"Raging Worgen": ["暴怒的狼人", "ordinary", "激怒：+1攻击力并具有风怒。", ["HS_effect", "3", "", "none", "3", "3"]],
			"Cruel Taskmaster": ["严酷的监工", "ordinary", "战吼：对一个随从造成1点伤害，并使其获得+2攻击力。", ["HS_effect", "2", "hs_warrior", "none", "2", "2"],
				['battleRoal:buff>A2,d1']
			],
			"Stonetusk Boar": ["石牙野猪", "essential", "冲锋", ["HS_effect", "1", "", "wildbeast", "1", "1"]],
			"Frostwolf Grunt": ["霜狼步兵", "essential", "嘲讽", ["HS_effect", "2", "", "none", "2", "2"]],
			"Archmage Antonidas": ["大法师安东尼达斯", "legend", "每当你施放一个法术，便将一张火球术置入你的手牌。", ["HS_effect", "7", "hs_mage", "none", "5", "7"],
				["legend"]
			],
			"Ragnaros the Firelord": ["炎魔之王拉格纳罗斯", "legend", "无法攻击。在你的回合结束时，随机对一个敌人造成8点伤害。", ["HS_effect", "8", "", "none", "8", "8"],
				["legend", "anm:fireatk"]
			],
			"Argent Squire": ["银色侍从", "ordinary", "圣盾", ["HS_effect", "1", "", "none", "1", "1"]],
			"Injured Blademaster": ["负伤剑圣", "rare", "战吼：对自身造成4点伤害。", ["HS_effect", "3", "", "none", "4", "7"]],
			"Socerer s Apprentice": ["巫师学徒", "ordinary", "你的法术的法力值消耗减少（1）点。", ["HS_effect", "2", "hs_mage", "none", "3", "2"]],
			"Worgen Infiltrator": ["狼人渗透者", "ordinary", "潜行", ["HS_effect", "1", "", "none", "2", "1"]],
			"Doomsayer": ["末日预言者", "epic", "在你的回合开始时，消灭所有随从。", ["HS_effect", "2", "", "none", "0", "7"]],
			"Mana Wyrm": ["法力浮龙", "ordinary", "每当你施放一个法术，便获得+1攻击力。", ["HS_effect", "1", "hs_mage", "none", "1", "3"]],
			"Bloodmage Thalnos": ["血法师萨尔诺斯", "legend", "法术伤害+1，亡语：抽一张牌。", ["HS_effect", "2", "", "none", "1", "1"],
				["legend"]
			],
			"Malygos": ["玛里苟斯", "legend", "法术伤害+5", ["HS_effect", "9", "", "dragon", "4", "12"],
				["legend"]
			],
			"Water Elemental": ["水元素", "essential", "冻结任何受到该随从伤害的角色。", ["HS_effect", "4", "hs_mage", "none", "3", "6"]],
			"Grommash Hellscream": ["格罗玛什·地狱咆哮", "legend", "冲锋，激怒：+6攻击力。", ["HS_effect", "8", "hs_warrior", "none", "4", "9"],
				["legend"]
			],
			"Azure Drake": ["碧蓝幼龙", "rare", "法术伤害+1，战吼：抽一张牌。", ["HS_effect", "5", "", "dragon", "4", "4"]],
			"Argent Commander": ["银色指挥官", "rare", "冲锋，圣盾", ["HS_effect", "6", "", "none", "4", "2"]],
			"Elven Archer": ["精灵弓箭手", "essential", "战吼：造成1点伤害。", ["HS_effect", "1", "", "none", "1", "1"]],
			"Leper Gnome": ["麻风侏儒", "ordinary", "亡语：对敌方英雄造成2点伤害。", ["HS_effect", "1", "", "none", "2", "1"]],
			"Abusive Sergeant": ["叫嚣的中士", "ordinary", "战吼：在本回合中，使一个随从获得+2攻击力。", ["HS_effect", "1", "", "none", "2", "1"]],
			"Flame Imp": ["烈焰小鬼", "ordinary", "战吼：对你的英雄造成3点伤害。", ["HS_effect", "1", "hs_warlock", "demon", "3", "2"],
				["anm:fireatk"]
			],
			"Voidwalker": ["虚空行者", "essential", "嘲讽", ["HS_effect", "1", "hs_warlock", "demon", "1", "3"]],
			"Doomguard": ["末日守卫", "rare", "冲锋，战吼：随机弃两张牌。", ["HS_effect", "5", "hs_warlock", "demon", "5", "7"]],
			"Knife Juggler": ["飞刀杂耍者", "rare", "在你召唤一个随从后，随机对一个敌人造成1点伤害。", ["HS_effect", "2", "", "none", "3", "2"]],
			"Onyxia": ["奥妮克希亚", "legend", "战吼：召唤数条1/1的雏龙，直到你的随从数量达到上限。", ["HS_effect", "9", "", "dragon", "8", "8"],
				["legend", "battleRoal:['雏龙',7]"]
			],
			"Whelp": ["雏龙", "essential", "", ["HS_normal", "1", "", "dragon", "1", "1"],
				["tokened"]
			],
			"Auchenai Soulpriest": ["奥金尼灵魂祭司", "rare", "你的恢复生命值的牌和技能改为造成等量的伤害。", ["HS_effect", "4", "hs_priest", "none", "3", "5"],
				["skillgh:auchenai"]
			],
			"Prophet Velen": ["先知维伦", "legend", "使你的法术和英雄技能的伤害和治疗效果翻倍。", ["HS_effect", "7", "hs_priest", "none", "7", "7"],
				["legend", "skillgh:velen"]
			],
			"Illidan Stormrage": ["伊利丹·怒风", "legend", "每当你使用一张牌时，召唤一个2/1的埃辛诺斯之焰。", ["HS_effect", "6", "", "demon", "7", "5"],
				["legend", "useCard:埃辛诺斯之焰"]
			],
			"Flame of Azzinoth": ["埃辛诺斯之焰", "essential", "", ["HS_normal", "1", "", "none", "2", "1"],
				["token"]
			],
			"Defender of Argus": ["阿古斯防御者", "rare", "战吼：使相邻的随从获得+1/+1和嘲讽。", ["HS_effect", "4", "", "none", "2", "3"]],
			"Acolyte of Pain": ["苦痛侍僧", "ordinary", "每当该随从受到伤害，抽一张牌。", ["HS_effect", "3", "", "none", "1", "3"]],
			"Warsong Commander": ["战歌指挥官", "essential", "每当你召唤一个攻击力小于或等于3的随从，使其获得冲锋。", ["HS_effect", "3", "hs_warrior", "none", "2", "3"]],
			"Deathwing": ["死亡之翼", "legend", "战吼： 消灭所有其他随从，并弃掉你的手牌。", ["HS_effect", "10", "", "dragon", "12", "12"],
				["legend"]
			],
			"Leokk": ["雷欧克", "essential", "你的其他随从获得+1攻击力。", ["HS_effect", "3", "hs_hunter", "wildbeast", "2", "4"],
				["token"]
			],
			"Huffer": ["霍弗", "essential", "冲锋", ["HS_effect", "3", "hs_hunter", "wildbeast", "4", "2"],
				["token"]
			],
			"Misha": ["米莎", "essential", "嘲讽", ["HS_effect", "3", "hs_hunter", "wildbeast", "4", "4"],
				["token"]
			],
			"Dire Wolf Alpha": ["恐狼前锋", "ordinary", "相邻的随从获得+1攻击力。", ["HS_effect", "2", "", "wildbeast", "2", "2"]],
			"Silverback Patriarch": ["银背族长", "essential", "嘲讽", ["HS_effect", "3", "", "wildbeast", "1", "4"]],
			"Murloc Warleader": ["鱼人领军", "epic", "所有其他鱼人获得+2/+1。", ["HS_effect", "3", "", "murloc", "3", "3"]],
			"Grimscale Oracle": ["暗鳞先知", "essential", "所有其他鱼人获得+1攻击力。", ["HS_effect", "1", "", "murloc", "1", "1"]],
			"Bluegill Warrior": ["蓝腮战士", "ordinary", "冲锋", ["HS_effect", "2", "", "murloc", "2", "1"]],
			"Old Murk Eye": ["老瞎眼", "legend", "冲锋，在战场上每有一个其他鱼人便获得+1攻击力。", ["HS_effect", "4", "", "murloc", "2", "4"],
				["legend"]
			],
			"Faerie Dragon": ["精灵龙", "ordinary", "无法成为法术或英雄技能的目标。", ["HS_effect", "2", "", "dragon", "3", "2"]],
			"Sunfury Protector": ["日怒保卫者", "rare", "战吼：使相邻的随从获得嘲讽。", ["HS_effect", "2", "", "none", "2", "3"]],
			"Tauren Warrior": ["牛头人战士", "ordinary", "嘲讽，激怒：+3攻击力。", ["HS_effect", "3", "", "none", "2", "3"]],
			"Leeroy Jenkins": ["火车王里诺艾", "legend", "冲锋，战吼：为你的对手召唤两条1/1的雏龙。", ["HS_effect", "5", "", "none", "6", "2"],
				["legend", "battleRoal:['雏龙',2],true"]
			],
			"the Beast": ["比斯巨兽", "legend", "亡语：为你的对手召唤1个3/3的芬克·恩霍尔。", ["HS_effect", "6", "", "wildbeast", "9", "7"],
				["legend", "deathRattle:['芬克'],true"]
			],
			"Finkle Einhorn": ["芬克·恩霍尔", "legend", "", ["HS_normal", "3", "", "none", "3", "3"],
				["legend", "token"]
			],
			"Silvermoon Guardian": ["银月城卫兵", "ordinary", "圣盾", ["HS_effect", "4", "", "none", "3", "3"]],
			"Scarlet Crusader": ["血色十字军战士", "ordinary", "圣盾", ["HS_effect", "3", "", "none", "3", "1"]],
			"Shieldbearer": ["持盾卫士", "ordinary", "嘲讽", ["HS_effect", "1", "", "none", "0", "4"]],
			"MWarden": ["魔古山守望者", "ordinary", "嘲讽", ["HS_effect", "4", "", "none", "1", "7"]],
			"Young Dragonhawk": ["幼龙鹰", "ordinary", "风怒", ["HS_effect", "1", "", "wildbeast", "1", "1"]],
			"RAssassin": ["拉文霍德刺客", "rare", "潜行", ["HS_effect", "7", "", "none", "7", "5"]],
			"JPanther": ["丛林猎豹", "ordinary", "潜行", ["HS_effect", "3", "", "wildbeast", "4", "2"]],
			"Stranglethorn Tiger": ["荆棘谷猛虎", "ordinary", "潜行", ["HS_effect", "5", "", "wildbeast", "5", "5"]],
			"Fen": ["沼泽爬行者", "ordinary", "嘲讽", ["HS_effect", "5", "", "none", "3", "6"]],
			"Venture Co Mercenary": ["风险投资公司雇佣兵", "ordinary", "你的随从牌的法力值消耗增加（3）点。", ["HS_effect", "5", "", "none", "7", "6"]],
			"Baron Geddon": ["迦顿男爵", "legend", "在你的回合结束时，对所有其他角色造成2点伤害。", ["HS_effect", "7", "", "none", "7", "5"],
				["legend"]
			],
			"King Krush": ["暴龙王克鲁什", "legend", "冲锋", ["HS_effect", "9", "hs_hunter", "wildbeast", "8", "8"],
				["legend"]
			],
			"Savannah Highmane": ["长鬃草原狮", "rare", "亡语：召唤两只2/2的土狼。", ["HS_effect", "6", "hs_hunter", "wildbeast", "6", "5"],
				["deathRattle:['土狼',2]"]
			],
			"Hyena": ["土狼", "essential", "", ["HS_normal", "2", "hs_hunter", "wildbeast", "2", "2"],
				["tokened"]
			],
			"Timber Wolf": ["森林狼", "essential", "你的其他野兽获得+1攻击力。", ["HS_effect", "1", "hs_hunter", "wildbeast", "1", "1"]],
			"Tundra Rhino": ["苔原犀牛", "essential", "你的野兽获得冲锋。", ["HS_effect", "5", "hs_hunter", "wildbeast", "2", "5"]],
			"Northshire Cleric": ["北郡牧师", "ordinary", "每当一个随从获得治疗时，抽一张牌。", ["HS_effect", "1", "hs_priest", "none", "1", "3"]],
			"Silver Hand Recruit": ["白银之手新兵", "essential", "", ["HS_normal", "1", "hs_paladin", "none", "1", "1"],
				["token"]
			],
			"Aldor Peacekeeper": ["奥尔多卫士", "rare", "战吼：使一个敌方随从的攻击力变为1。", ["HS_effect", "3", "hs_paladin", "none", "3", "3"],
				["battleRoal:embuff>a1"]
			],
			"Treant1": ["树人", "essential", "冲锋，在回合结束时，消灭该随从。", ["HS_effect", "1", "hs_druid", "none", "2", "2"],
				["token", "nosearch"]
			],
			"Treant3": ["树人", "essential", "嘲讽", ["HS_effect", "2", "hs_druid", "none", "2", "2"],
				["tokened", "nosearch"]
			],
			"Molten Giant": ["熔核巨人", "epic", "你的英雄每受到1点伤害，该牌的法力值消耗便减少（1）点。", ["HS_effect", "20", "", "none", "8", "8"],
				["changecost:return p.getDamagedHp();"]
			],
			"Sea Giant": ["海巨人", "epic", "战场上每有一个其他随从，该牌的法力值消耗便减少（1）点。", ["HS_effect", "10", "", "none", "8", "8"],
				["changecost:return p.sctp('mns').length;"]
			],
			"Mountain Giant": ["山岭巨人", "epic", "你每有一张其他手牌，该牌的法力值消耗便减少（1）点。", ["HS_effect", "12", "", "none", "8", "8"],
				["changecost:return p.countCards('h')-1;"]
			],
			"Mirror Image": ["镜像", "essential", "嘲讽", ["HS_effect", "0", "hs_mage", "none", "0", "2"],
				["token"]
			],
			"Wisp": ["小精灵", "ordinary", "如果你用足够多的小精灵攻击艾瑞达领主的话，他就会爆炸。但这是为什么呢？", ["HS_normal", "0", "", "none", "1", "1"]],
			"Chillwind Yeti": ["冰风雪人", "essential", "他梦想着有一天能够下山开一间拉面店。但他没有那个勇气。", ["HS_normal", "4", "", "none", "4", "5"]],
			"Wild Pyromancer": ["狂野炎术师", "rare", "在你施放一个法术后，对所有随从造成1点伤害。", ["HS_effect", "2", "", "none", "3", "2"]],
			"Alexstrasza": ["阿莱克丝塔萨", "legend", "战吼：将一方英雄的剩余生命值变为15。", ["HS_effect", "9", "", "dragon", "8", "8"],
				["legend"]
			],
			"Frothing Berserker": ["暴乱狂战士", "rare", "每当一个随从受到伤害，便获得+1攻击力。", ["HS_effect", "3", "hs_warrior", "none", "2", "4"]],
			"Armor Smith": ["铸甲师", "rare", "每当一个友方随从受到伤害，便获得1点护甲值。", ["HS_effect", "2", "hs_warrior", "none", "1", "4"]],
			"Loot Hoarder": ["战利品贮藏者", "ordinary", "亡语：抽一张牌。", ["HS_effect", "2", "", "none", "2", "1"]],
			"Windfury Harpy": ["风怒鹰身人", "ordinary", "风怒", ["HS_effect", "6", "", "none", "4", "5"]],
			"Millhouse Manastorm": ["米尔豪斯·法力风暴", "legend", "战吼：下个回合敌方法术的法力值消耗为（0）点。", ["HS_effect", "2", "", "none", "4", "4"],
				["legend"]
			],
			"Novice Engineer": ["工程师学徒", "essential", "战吼：抽一张牌。", ["HS_effect", "2", "", "none", "1", "1"]],
			"Gnomish Inventor": ["侏儒发明家", "essential", "战吼：抽一张牌。", ["HS_effect", "4", "", "none", "2", "4"]],
			"Sun Walker": ["烈日行者", "rare", "嘲讽，圣盾", ["HS_effect", "6", "", "none", "4", "5"]],
			"Amani Berserker": ["阿曼尼狂战士", "ordinary", "激怒：+3攻击力。", ["HS_effect", "2", "", "none", "2", "3"]],
			"Dark Iron Dwarf": ["黑铁矮人", "ordinary", "战吼：在本回合中，使一个随从获得+2攻击力。", ["HS_effect", "4", "", "none", "4", "4"]],
			"Scavenging Hyena": ["食腐土狼", "ordinary", "每当一个友方野兽死亡，便获得+2/+1。", ["HS_effect", "2", "hs_hunter", "wildbeast", "2", "2"]],
			"Cult Master": ["诅咒教派领袖", "ordinary", "在一个友方随从死亡后，抽一张牌。", ["HS_effect", "4", "", "none", "4", "2"]],
			"Flesheating Ghoul": ["腐肉食尸鬼", "ordinary", "每当一个随从死亡，便获得+1攻击力。", ["HS_effect", "3", "", "none", "3", "3"]],
			"Succubus": ["魅魔", "ordinary", "战吼：随机弃一张牌。", ["HS_effect", "2", "hs_warlock", "demon", "4", "3"],
				["quetu"]
			],
			"Ironbeak Owl": ["铁喙猫头鹰", "ordinary", "战吼：沉默一个随从。", ["HS_effect", "2", "", "wildbeast", "2", "1"],
				["battleRoal:buff>cm"]
			],
			"Spellbreaker": ["破法者", "ordinary", "战吼：沉默一个随从。", ["HS_effect", "4", "", "none", "4", "3"],
				["battleRoal:buff>cm"]
			],
			"ColdlightOracle": ["寒光智者", "rare", "战吼：每个玩家抽两张牌。", ["HS_effect", "3", "", "murloc", "2", "2"]],
			"Ancient Watcher": ["上古看守者", "rare", "无法攻击。", ["HS_effect", "2", "", "none", "4", "5"]],
			"Voodoo Doctor": ["巫医", "essential", "战吼：恢复2点生命值。", ["HS_effect", "1", "", "none", "2", "1"]],
			"Earthen Ring Farseer": ["大地之环先知", "ordinary", "战吼：恢复3点生命值。", ["HS_effect", "3", "", "none", "3", "3"]],
			"Senjin Shieldmasta": ["森金持盾卫士", "essential", "嘲讽", ["HS_effect", "4", "", "none", "3", "5"]],
			"Boulderfist Ogre": ["石拳食人魔", "essential", "“我非常厉害，绝对值这个价格！”", ["HS_normal", "6", "", "none", "6", "7"]],
			//从这里开始放嘲讽
			"Lord of the Arena": ["竞技场主宰", "essential", "嘲讽", ["HS_effect", "6", "", "none", "6", "5"]],
			"Booty Bay Bodyguard": ["藏宝海湾保镖", "essential", "嘲讽", ["HS_effect", "5", "", "none", "5", "4"]],
			"Ironfur Grizzly": ["铁鬃灰熊", "essential", "嘲讽", ["HS_effect", "3", "", "wildbeast", "3", "3"]],
			"Stormwind Knight": ["暴风城骑士", "essential", "冲锋", ["HS_effect", "4", "", "none", "2", "5"]],
			"Korkron Elite": ["库卡隆精英卫士", "essential", "冲锋", ["HS_effect", "4", "hs_warrior", "none", "4", "3"]],
			"Emperor Cobra": ["帝王眼镜蛇", "rare", "剧毒", ["HS_effect", "3", "", "wildbeast", "2", "3"]],
			"Thrallmar Farseer": ["萨尔玛先知", "ordinary", "风怒", ["HS_effect", "3", "", "none", "2", "3"]],
			//结束
			"Lorewalker Cho": ["游学者周卓", "legend", "每当一个玩家施放一个法术，复制该法术，将其置入另一个玩家的手牌。", ["HS_effect", "2", "", "none", "0", "4"],
				["legend"]
			],
			"Questing Adventurer": ["任务达人", "rare", "每当你使用一张牌时，便获得+1/+1。", ["HS_effect", "3", "", "none", "2", "2"]],
			"Mad Bomber": ["疯狂投弹者", "ordinary", "战吼：造成3点伤害，随机分配到所有其他角色身上。", ["HS_effect", "2", "", "none", "3", "2"]],
			"Abomination": ["憎恶", "rare", "嘲讽，亡语：对所有角色造成2点伤害。", ["HS_effect", "5", "", "none", "4", "4"]],
			"Angry Chicken": ["愤怒的小鸡", "rare", "激怒：+5攻击力。", ["HS_effect", "1", "", "wildbeast", "1", "1"]],
			"Imp Master": ["小鬼召唤师", "rare", "你的回合结束时，对该随从造成1点伤害并召唤一个1/1的小鬼。", ["HS_effect", "3", "", "none", "1", "5"],
				["guimu:小鬼"]
			],
			"Imp": ["小鬼", "essential", "", ["HS_normal", "1", "", "demon", "1", "1"],
				["token"]
			],
			"Stormwind Champion": ["暴风城勇士", "essential", "你的其他随从获得+1/+1。", ["HS_effect", "7", "", "none", "6", "6"]],
			"Faceless Manipulator": ["无面操纵者", "epic", "战吼：选择一个随从，成为它的复制。", ["HS_effect", "5", "", "none", "3", "3"]],
			"Ironforge Rifleman": ["铁炉堡火枪手", "essential", "战吼：造成1点伤害。", ["HS_effect", "3", "", "none", "2", "2"]],
			"Stormpike Commando": ["雷矛特种兵", "essential", "战吼：造成2点伤害。", ["HS_effect", "5", "", "none", "4", "2"]],
			"Nightblade": ["夜刃刺客", "essential", "战吼：对敌方英雄造成3点伤害。", ["HS_effect", "5", "", "none", "4", "4"]],
			"Twilight Drake": ["暮光幼龙", "rare", "战吼： 你每有一张手牌，便获得+1生命值。", ["HS_effect", "4", "", "dragon", "4", "1"]],
			"Dragonling Mechanic": ["机械幼龙技工", "essential", "战吼：召唤一个2/1的机械幼龙。", ["HS_effect", "4", "", "none", "2", "4"],
				["battleRoal:机械幼龙"]
			],
			"Mechanical Dragonling": ["机械幼龙", "essential", "", ["HS_normal", "1", "", "machine", "2", "1"],
				["token"]
			],
			"Sheep": ["绵羊", "essential", "", ["HS_normal", "1", "", "wildbeast", "1", "1"],
				["token"]
			],
			"Guardian of Kings": ["列王守卫", "essential", "战吼：为你的英雄恢复6点生命值。", ["HS_effect", "7", "hs_paladin", "none", "5", "6"]],
			"Violet Teacher": ["紫罗兰教师", "rare", "每当你施放一个法术，便召唤一个1/1的紫罗兰学徒。", ["HS_effect", "4", "", "none", "3", "5"],
				["法前:紫罗兰学徒"]
			],
			"Violet Apprentice": ["紫罗兰学徒", "essential", "", ["HS_normal", "1", "", "none", "1", "1"],
				["tokened"]
			],
			"Silver Hand Knight": ["白银之手骑士", "ordinary", "战吼：召唤一个2/2的侍从。", ["HS_effect", "5", "", "none", "4", "4"],
				["battleRoal:侍从"]
			],
			"Squire": ["侍从", "essential", "", ["HS_normal", "1", "", "none", "2", "2"],
				["token"]
			],
			"Raid Leader": ["团队领袖", "essential", "你的其他随从获得+1攻击力。", ["HS_effect", "3", "", "none", "2", "2"]],
			"Mana Wraith": ["法力怨魂", "rare", "召唤所有随从的法力值消耗增加（1）点。", ["HS_effect", "2", "", "none", "2", "2"]],
			"Hound": ["猎犬", "essential", "冲锋", ["HS_effect", "1", "hs_hunter", "wildbeast", "1", "1"],
				["tokened"]
			],
			"Cairne Bloodhoof": ["凯恩·血蹄", "legend", "亡语：召唤一个4/5的贝恩·血蹄。", ["HS_effect", "6", "", "none", "4", "5"],
				["deathRattle:贝恩·血蹄"]
			],
			"Baine Bloodhoof": ["贝恩·血蹄", "essential", "", ["HS_normal", "4", "", "none", "4", "5"],
				["token"]
			],
			"Salty Dog": ["熟练的水手", "ordinary", "他喜欢在船上颠簸的感觉，比在陆地上走路更有安全感。", ["HS_normal", "5", "", "pirate", "7", "4"]],
			"War Golem": ["作战傀儡", "essential", "傀儡们从来不会胆怯，但是出于某种原因，当你对它们施放“恐惧”的时候，它们依然会逃跑。也许这就是天性？或是想要融入这个世界的渴望？", ["HS_normal", "7", "", "none", "7", "7"]],
			"Core Hound": ["熔火恶犬", "essential", "你无法驯服一头熔火恶犬。你只能通过训练让它在吃掉你之前先吃掉其他人。", ["HS_normal", "7", "", "wildbeast", "9", "5"]],
			"Dread Infernal": ["恐惧地狱火", "essential", "战吼：对所有其他角色造成1点伤害。", ["HS_effect", "6", "hs_warlock", "demon", "6", "6"]],
			"Pit Lord": ["深渊领主", "epic", "战吼：对你的英雄造成5点伤害。", ["HS_effect", "4", "hs_warlock", "demon", "5", "6"]],
			"Priestess of Elune": ["艾露恩的女祭司", "ordinary", "战吼：为你的英雄恢复4点生命值。", ["HS_effect", "6", "", "none", "5", "4"]],
			"Ogre Magi": ["食人魔法师", "essential", "法术伤害+1", ["HS_effect", "4", "", "none", "4", "4"]],
			"Archmage": ["大法师", "essential", "法术伤害+1", ["HS_effect", "6", "", "none", "4", "7"]],
			"Dalaran Mage": ["达拉然法师", "essential", "法术伤害+1", ["HS_effect", "3", "", "none", "1", "4"]],
			"Kobold Geomancer": ["狗头人地卜师", "essential", "法术伤害+1", ["HS_effect", "2", "", "none", "2", "2"]],
			"Fire Elemental": ["火元素", "essential", "战吼：造成3点伤害。", ["HS_effect", "6", "hs_shaman", "none", "6", "5"]],
			"Southsea Captain": ["南海船长", "epic", "你的其他海盗获得+1/+1。", ["HS_effect", "3", "", "pirate", "3", "3"]],
			"Tongue Totem": ["火舌图腾", "essential", "相邻的随从获得+2攻击力。", ["HS_effect", "2", "hs_shaman", "totem", "0", "3"]],
			"Razorfen Hunter": ["剃刀猎手", "essential", "战吼：召唤一个 1/1 的野猪。", ["HS_effect", "3", "", "none", "2", "3"],
				["battleRoal:野猪"]
			],
			"Boar": ["野猪", "essential", "", ["HS_normal", "1", "", "wildbeast", "1", "1"],
				["token"]
			],
			"Ironbark Protector": ["埃隆巴克保护者", "essential", "嘲讽", ["HS_effect", "8", "hs_druid", "", "8", "8"]],
			"Patient Assassin": ["耐心的刺客", "epic", "潜行，剧毒", ["HS_effect", "2", "hs_rogue", "none", "1", "1"]],
			"Reckless Rocketeer": ["鲁莽火箭兵", "essential", "冲锋", ["HS_effect", "6", "", "none", "5", "2"]],
			"Nat Pagle": ["纳特·帕格", "legend", "在你的回合开始时，你有50%的几率额外抽一张牌。", ["HS_effect", "2", "", "none", "0", "4"],
				["legend"]
			],
			"Gruul": ["格鲁尔", "legend", "在每个回合结束时，获得+1/+1。", ["HS_effect", "8", "", "none", "7", "7"],
				["legend"]
			],
			"Magma Rager": ["岩浆暴怒者", "essential", "尽管现在每个人都能单刷熔火之心了，但他依然觉得自己很厉害。", ["HS_normal", "3", "", "none", "5", "1"]],
			"Houndmaster": ["驯兽师", "essential", "战吼：使一个友方野兽获得+2/+2和嘲讽。", ["HS_effect", "4", "hs_hunter", "none", "4", "3"],
				["rareEff", "battleRoal:fltbuff>mine_,wildbeast：22,chaofeng"]
			],
			"Argent Protector": ["银色保卫者", "ordinary", "战吼：使一个其他友方随从获得圣盾。", ["HS_effect", "2", "hs_paladin", "none", "2", "2"],
				["battleRoal:mebuff>shengdun"]
			],
			"Frost Elemental": ["冰霜元素", "ordinary", "战吼：冻结一个角色。", ["HS_effect", "6", "", "none", "5", "5"],
				["battleRoal:allbuff>dongjied"]
			],
			"Wrath of Air Totem": ["空气之怒图腾", "essential", "法术伤害+1", ["HS_effect", "1", "hs_shaman", "totem", "0", "2"],
				["token"]
			],
			"Searing Totem": ["灼热图腾", "essential", "", ["HS_normal", "1", "hs_shaman", "totem", "1", "1"],
				["token"]
			],
			"Stoneclaw Totem": ["石爪图腾", "essential", "嘲讽", ["HS_effect", "1", "hs_shaman", "totem", "0", "2"],
				["token"]
			],
			"Healing Totem": ["治疗图腾", "essential", "在你的回合结束时，为所有友方随从恢复1点生命值。", ["HS_effect", "1", "hs_shaman", "totem", "0", "2"],
				["token", "结束:aoercv>player.sctp('mine'),1"]
			],
			"Arathi Weaponsmith": ["阿拉希武器匠", "ordinary", "战吼：装备一把2/2的武器。", ["HS_effect", "4", "hs_warrior", "none", "3", "3"],
				["battleRoal:weapon>'战斧'"]
			],
			"Tirion Fordring": ["提里奥·弗丁", "legend", "圣盾，嘲讽，亡语：装备一把5/3的灰烬使者。", ["HS_effect", "8", "hs_paladin", "none", "6", "6"],
				["legend", "deathRattle:weapon>'灰烬使者'"]
			],
			"AlAkir the Windlord": ["风领主奥拉基尔", "legend", "冲锋，圣盾，嘲讽，风怒", ["HS_effect", "8", "hs_shaman", "none", "3", "5"]],
			"Young Priestess": ["年轻的女祭司", "rare", "在你的回合结束时，随机使另一个友方随从获得+1生命值。", ["HS_effect", "1", "", "none", "2", "1"],
				["结束:mine_buff>H1"]
			],
			"Blood Imp": ["鲜血小鬼", "ordinary", "潜行，在你的回合结束时，随机使另一个友方随从获得+1生命值。", ["HS_effect", "1", "hs_warlock", "demon", "0", "1"],
				["结束:mine_buff>H1"]
			],
			"Summoning Portal": ["召唤传送门", "ordinary", "你的随从牌的法力值消耗减少（2）点，但不能少于（1）点。", ["HS_effect", "4", "hs_warlock", "none", "0", "4"]],
			"Void Terror": ["虚空恐魔", "rare", "战吼：消灭该随从两侧的随从，并获得他们的攻击力和生命值。", ["HS_effect", "3", "hs_warlock", "demon", "3", "3"]],
			"Hogger": ["霍格", "legend", "在你的回合结束时，召唤一个2/2并具有嘲讽的豺狼人。", ["HS_effect", "6", "", "none", "4", "4"],
				["legend", "ending:豺狼人"]
			],
			"Gnoll": ["豺狼人", "essential", "嘲讽", ["HS_effect", "2", "", "none", "2", "2"],
				["tokened"]
			],
			"Shattered Sun Cleric": ["破碎残阳祭司", "essential", "战吼：使一个友方随从获得+1/+1。", ["HS_effect", "3", "", "none", "3", "2"],
				["battleRoal:mebuff>11"]
			],
			"Tinkmaster Overspark": ["工匠大师欧沃斯巴克", "legend", "战吼： 随机使另一个随从变形成为一个5/5的魔暴龙或一个1/1的松鼠。", ["HS_effect", "3", "", "none", "3", "3"],
				["legend"]
			],
			"Devilsaur": ["魔暴龙", "essential", "", ["HS_normal", "5", "", "wildbeast", "5", "5"],
				["tokened"]
			],
			"Squirrel": ["松鼠", "essential", "", ["HS_normal", "1", "", "wildbeast", "1", "1"],
				["token"]
			],
			"Dust Devil": ["尘魔", "ordinary", "风怒，过载：（2）", ["HS_effect", "1", "hs_shaman", "none", "3", "1"]],
			"Neptulon": ["耐普图隆", "legend", "战吼：随机将四张鱼人牌置入你的手牌，过载：（3）", ["HS_effect", "7", "hs_shaman", "none", "7", "7"],
				["legend", "battleRoal:rangain>4鱼人"]
			],
			"Earth Elemental": ["土元素", "epic", "嘲讽，过载：（3）", ["HS_effect", "5", "hs_shaman", "none", "7", "8"]],
			"Master of Disguise": ["伪装大师", "rare", "战吼：使一个友方随从获得潜行。", ["HS_effect", "4", "hs_rogue", "none", "4", "4"],
				["battleRoal:mebuff>qianxing"]
			],
			"Spirit Wolf": ["幽灵狼", "essential", "嘲讽", ["HS_effect", "2", "hs_shaman", "none", "2", "3"],
				["tokened"]
			],
			"Mana Tide Totem": ["法力之潮图腾", "rare", "在你的回合结束时，抽一张牌。", ["HS_effect", "3", "hs_shaman", "totem", "0", "3"]],
			"Bloodsail Raider": ["血帆袭击者", "ordinary", "战吼：获得等同于你的武器攻击力的攻击力。", ["HS_effect", "2", "", "pirate", "2", "3"],
				["rareEff"]
			],
			"Dread Corsair": ["恐怖海盗", "ordinary", "嘲讽，你的武器每有1点攻击力，该牌的法力值消耗便减少（1）点。", ["HS_effect", "4", "", "pirate", "3", "3"],
				["changecost:return p.data_weapon?p.data_weapon.ATK:0;"]
			],
			"Southsea Deckhand": ["南海船工", "ordinary", "如果你装备一把武器，该随从具有冲锋。", ["HS_effect", "1", "", "pirate", "2", "1"]],
			"Arcane Golem": ["奥术傀儡", "rare", "冲锋，战吼：使你的对手获得一个法力水晶。", ["HS_effect", "3", "", "none", "4", "2"]],
			"Felguard": ["恶魔卫士", "rare", "嘲讽，战吼：摧毁你的一个法力水晶。", ["HS_effect", "3", "hs_warlock", "demon", "3", "5"]],
			"Gadgetzan Auctioneer": ["加基森拍卖师", "rare", "每当你施放一个法术，便抽一张牌。", ["HS_effect", "6", "", "none", "4", "4"]],
			"Murloc Tidecaller": ["鱼人招潮者", "rare", "每当有玩家召唤一个鱼人，便获得+1攻击力。", ["HS_effect", "1", "", "murloc", "1", "2"]],
			"King Mukla": ["穆克拉", "legend", "战吼：使你的对手获得两根香蕉。", ["HS_effect", "3", "", "wildbeast", "5", "5"],
				["legend"]
			],
			"Frog": ["青蛙", "essential", "嘲讽", ["HS_effect", "0", "", "wildbeast", "0", "1"],
				["token"]
			],
			"Windspeaker": ["风语者", "essential", "战吼：使一个友方随从获得风怒。", ["HS_effect", "4", "hs_shaman", "none", "4", "3"],
				["battleRoal:mebuff>fengnu"]
			],
			"Acidic Swamp Ooze": ["酸性沼泽软泥怪", "essential", "战吼： 摧毁对手的武器。", ["HS_effect", "2", "", "none", "3", "2"],
				["rareEff"]
			],
			"Bloodsail Corsair": ["血帆海盗", "rare", "战吼：使对手的武器失去1点耐久度。", ["HS_effect", "1", "", "pirate", "1", "2"],
				["rareEff"]
			],
			"Harrison Jones": ["哈里森·琼斯", "legend", "战吼：摧毁对手的武器，并抽数量等同于其耐久度的牌。", ["HS_effect", "5", "", "none", "5", "4"],
				["rareEff"]
			],
			"Mana Addict": ["魔瘾者", "rare", "在本回合中，每当你施放一个法术，便获得+2攻击力。", ["HS_effect", "2", "", "none", "1", "3"]],
			"Stampeding Kodo": ["狂奔科多兽", "rare", "战吼：随机消灭一个攻击力小于或等于2的敌方随从。", ["HS_effect", "5", "", "wildbeast", "3", "5"],
				["rareEff"]
			],
			"Sylvanas Windrunner": ["希尔瓦娜斯·风行者", "legend", "亡语：随机获得一个敌方随从的控制权。", ["HS_effect", "6", "", "none", "5", "5"]],
			"Mind Control Tech": ["精神控制技师", "rare", "战吼：如果你的对手拥有4个或者更多随从，随机获得其中一个的控制权。", ["HS_effect", "3", "", "none", "3", "3"],
				["rareEff"]
			],
			"Cabal Shadow Priest": ["秘教暗影祭司", "epic", "战吼：获得一个攻击力小于或等于2的敌方随从的控制权。", ["HS_effect", "6", "hs_priest", "none", "4", "5"],
				["rareEff"]
			],
			"Shadow of Nothing": ["空无之影", "epic", "控心术无效！你对手的牌库中没有随从牌了！", ["HS_normal", "0", "hs_priest", "none", "0", "1"],
				["token"]
			],
			"Captains Parrot": ["船长的鹦鹉", "epic", "战吼：从你的牌库中抽一张海盗牌。", ["HS_effect", "2", "", "wildbeast", "1", "1"]],
			"Worthless Imp": ["游荡小鬼", "essential", "你的恶魔用完了！但至少...还有小鬼。", ["HS_normal", "1", "hs_warlock", "demon", "1", "1"],
				["tokened"]
			],
			"Captain Greenskin": ["绿皮船长", "legend", "战吼：使你的武器获得+1/+1。", ["HS_effect", "5", "", "pirate", "5", "4"],
				["rareEff"]
			],
			"Defias Ringleader": ["迪菲亚头目", "ordinary", "连击：召唤一个2/1的迪菲亚强盗。", ["HS_effect", "2", "hs_rogue", "none", "2", "2"],
				["lianji:迪菲亚强盗"]
			],
			"Defias Bandit": ["迪菲亚强盗", "essential", "", ["HS_normal", "1", "hs_rogue", "none", "2", "1"],
				["tokened"]
			],
			"Pint-Sized Summoner": ["小个子召唤师", "rare", "你每个回合使用的第一张随从牌的法力值消耗减少（1）点。", ["HS_effect", "2", "", "none", "2", "2"]],
			"Lightwell": ["光明之泉", "rare", "在你的回合开始时，随机为一个受伤的友方角色恢复3点生命值。", ["HS_effect", "2", "hs_priest", "none", "0", "5"]],
			"Lightspawn": ["光耀之子", "ordinary", "该随从的攻击力始终等同于其生命值。", ["HS_effect", "4", "hs_priest", "none", "0", "5"]],
			"Unbound Elemental": ["无羁元素", "ordinary", "在你使用一张具有过载的牌后，便获得+1/+1。", ["HS_effect", "3", "hs_shaman", "none", "2", "4"]],
			"Ancient Mage": ["年迈的法师", "rare", "战吼：使相邻的随从获得法术伤害+1。", ["HS_effect", "4", "", "none", "2", "5"]],
			"Edwin VanCleef": ["艾德温·范克里夫", "legend", "连击：在本回合中，使用此牌前每使用一张其他牌，便获得+2/+2。", ["HS_effect", "3", "hs_rogue", "none", "2", "2"],
				["lianji:const num = 2 * (player.hs_state.useCard - 1);event.fellow.addvaluebuff([num, num]);"]
			],
			"SI7 Agent": ["军情七处特工", "rare", "连击：造成2点伤害。", ["HS_effect", "3", "hs_rogue", "none", "3", "3"]],
			"Lord Jaraxxus": ["加拉克苏斯大王", "legend", "战吼：消灭你的英雄，并用加拉克苏斯大王替换之。", ["HS_effect", "9", "hs_warlock", "demon", "3", "15"]],
			"Infernal": ["地狱火", "essential", "", ["HS_normal", "6", "hs_warlock", "demon", "6", "6"],
				["tokened"]
			],
			"Ysera": ["伊瑟拉", "legend", "在你的回合结束时，将一张梦境牌置入你的手牌。", ["HS_effect", "9", "", "dragon", "4", "12"],
				["结束:rangain>梦境"]
			],
			"Emerald Drake": ["翡翠幼龙", "essential", "", ["HS_normal", "4", "hs_dream", "dragon", "7", "6"],
				["tokened"]
			],
			"Laughing Sister": ["欢笑的姐妹", "essential", "无法成为法术或英雄技能的目标。", ["HS_effect", "3", "hs_dream", "none", "3", "5"],
				["token"]
			],
			"Crazed Alchemist": ["疯狂的炼金师", "rare", "战吼：使一个随从的攻击力和生命值互换。", ["HS_effect", "2", "", "none", "2", "2"]],
			"Treant": ["树人", "essential", "", ["HS_normal", "2", "hs_druid", "none", "2", "2"],
				["tokened"]
			],
			"Bloodfen Raptor": ["血沼迅猛龙", "essential", "“去杀30条迅猛龙。”——赫米特·奈辛瓦里", ["HS_normal", "2", "", "wildbeast", "3", "2"]],
			"Oasis Snapjaw": ["绿洲钳嘴龟", "essential", "它的梦想是能够像它的偶像那样飞行和吐息火焰，但这样的梦想永远无法实现。", ["HS_normal", "4", "", "wildbeast", "2", "7"]],
			"Gurubashi Berserker": ["古拉巴什狂暴者", "essential", "每当该随从受到伤害，便获得+3攻击力。", ["HS_effect", "5", "", "none", "2", "7"]],
			"Frostwolf Warlord": ["霜狼督军", "essential", "战吼：战场上每有一个其他友方随从，便获得+1/+1。", ["HS_effect", "5", "", "none", "4", "4"]],
			"Darkscale Healer": ["暗鳞治愈者", "essential", "战吼：为所有友方角色恢复2点生命值。", ["HS_effect", "5", "", "none", "4", "5"]],
			"Temple Enforcer": ["圣殿执行者", "ordinary", "战吼：使一个友方随从获得+3生命值。", ["HS_effect", "6", "hs_priest", "none", "6", "6"],
				["quetu", "battleRoal:mebuff>H3"]
			],
			"Lightwarden": ["圣光护卫者", "rare", "每当一个角色获得治疗，便获得+2攻击力。", ["HS_effect", "1", "", "none", "1", "2"]],
			"The Black Knight": ["黑骑士", "legend", "战吼：消灭一个具有嘲讽的敌方随从。", ["HS_effect", "6", "", "none", "4", "5"],
				["rareEff"]
			],
			"Hungry Crab": ["鱼人杀手蟹", "epic", "战吼：消灭一个鱼人，并获得+2/+2。", ["HS_effect", "1", "", "wildbeast", "1", "2"],
				["rareEff"]
			],
			"Youthful Brewmaster": ["年轻的酒仙", "ordinary", "战吼：使一个友方随从从战场上移回你的手牌。", ["HS_effect", "2", "", "none", "3", "2"]],
			"Ancient Brewmaster": ["年迈的酒仙", "ordinary", "战吼：使一个友方随从从战场上移回你的手牌。", ["HS_effect", "4", "", "none", "5", "4"]],
			"Spiteful Smith": ["恶毒铁匠", "ordinary", "激怒：你的武器获得+2攻击力。", ["HS_effect", "5", "", "none", "4", "6"]],
			"Kidnapper": ["劫持者", "epic", "连击：将一个随从移回其拥有者的手牌。", ["HS_effect", "6", "hs_rogue", "none", "5", "3"]],
			"Secretkeeper": ["奥秘守护者", "rare", "每当有一张奥秘牌被使用时，便获得+1/+1。", ["HS_effect", "1", "", "none", "1", "2"]],
			"Defender": ["防御者", "essential", "", ["HS_normal", "1", "hs_paladin", "none", "2", "1"],
				["tokened"]
			],
			"Druid of the Claw": ["利爪德鲁伊", "ordinary", "抉择：冲锋；或者获得+2生命值并具有嘲讽。", ["HS_effect", "5", "hs_druid", "none", "4", "4"]],
			"Druid of the Claw1": ["利爪德鲁伊", "ordinary", "冲锋", ["HS_effect", "5", "hs_druid", "none", "4", "4"],
				["tokened", "nosearch"]
			],
			"Druid of the Claw2": ["利爪德鲁伊", "ordinary", "嘲讽", ["HS_effect", "5", "hs_druid", "none", "4", "6"],
				["tokened", "nosearch"]
			],
			"Ancient of Lore": ["知识古树", "epic", "抉择：抽两张牌；或者恢复5点生命值。", ["HS_effect", "7", "hs_druid", "none", "5", "5"]],
			"Keeper of the Grove": ["丛林守护者", "rare", "抉择：造成2点伤害；或者沉默一个随从。", ["HS_effect", "4", "hs_druid", "none", "2", "4"]],
			"Cenarius": ["塞纳留斯", "legend", "抉择：使你的所有其他随从获得+2/+2；或者召唤两个2/2并具有嘲讽的树人。", ["HS_effect", "9", "hs_druid", "none", "5", "8"],
				["legend"]
			],
			"Ancient of War": ["战争古树", "rare", "抉择：+5攻击力；或者+5生命值并具有嘲讽。", ["HS_effect", "7", "hs_druid", "none", "5", "5"]],
			"Big Game Hunter": ["王牌猎人", "epic", "战吼： 消灭一个攻击力大于或等于7的随从。", ["HS_effect", "3", "", "none", "4", "2"],
				["rareEff"]
			],
			"Master Swordsmith": ["铸剑师", "rare", "在你的回合结束时，随机使另一个友方随从获得+1攻击力。", ["HS_effect", "2", "", "none", "1", "3"],
				["结束:mine_buff>A1"]
			],
			"Alarm-o-Bot": ["报警机器人", "ordinary", "在你的回合开始时，随机将你的手牌中的一张随从牌与该随从交换。", ["HS_effect", "3", "", "machine", "0", "3"]],
			"Nozdormu": ["诺兹多姆", "legend", "所有玩家只有15秒的时间来进行他们的回合。", ["HS_effect", "9", "", "dragon", "8", "8"]],
			"Coldlight Seer": ["寒光先知", "rare", "战吼：使所有其他鱼人获得+2生命值。", ["HS_effect", "3", "", "murloc", "2", "3"],
				["rareEff"]
			],
			"Snake": ["蛇", "essential", "", ["HS_normal", "0", "hs_hunter", "wildbeast", "1", "1"],
				["token"]
			],
			//乱斗模式
			"Pirate": ["血帆袭击者", "essential", "", ["HS_normal", "2", "", "pirate", "2", "3"],
				["quetu", "token", "nosearch", "othermode"]
			],
		},
		skill: {
			hs_EliteTaurenChieftain: {
				async battleRoal(event, trigger, player) {
					const f = get.hsflt("和弦", "all");
					player.sctp("heros", p => p.hs_gain(get.hskachi("all", f, true).randomGet()));
				},
			},
			hs_GelbinMekkatorque: {
				async battleRoal(event, trigger, player) {
					event.fellow.SSfellow("cdset:惊人的发明");
				},
			},
			hs_RepairBot: {
				ending: {
					self: true,
					randomRT(player) {
						return player.sctp("mns", fl => fl.isDamaged(), true).randomGet();
					},
					async effect(event, trigger, player) {
						event.target.hs_dmgrcv('recover', 6, event.fellow);
					},
				},
			},
			hs_Poultryizer: {
				beginning: {
					self: true,
					randomRT(player) {
						return player.sctp("mns").randomGet();
					},
					async effect(event, trigger, player) {
						event.target.HSF("convert", ["hs_Chicken2_monster"]);
					},
				},
			},
			hs_Emboldener3000: {
				ending: {
					self: true,
					randomRT(player) {
						return player.sctp("mns").randomGet();
					},
					async effect(event, trigger, player) {
						event.target.addvaluebuff([1, 1]);
					},
				},
			},
			hs_HomingChicken: {
				beginning: {
					self: true,
					async effect(event, trigger, player) {
						event.fellow.HSF("cuihui");
						player.hs_drawDeck(3);
					},
				},
			},
			hs_KirinTorMage: {
				async battleRoal(event, trigger, player) {
					player.addcostbuff(0, c => get.subtype(c) == "HS_secret").subtype = "final";
				},
			},
			hs_BloodKnight: {
				async battleRoal(event, trigger, player) {
					const num = 3 * player.sctp("mns", fl => {
						if (fl.hasgjz("shengdun")) {
							fl.removegjz("shengdun");
							return true;
						}
					}, true).length;
					if (num > 0) event.fellow.updateSelfBuff([num, num]);
				},
			},
			hs_StarvingBuzzard: {
				summonSucc: {
					notlink: true,
					self: true,
					filter(evt) {
						return evt.link.rkind == "wildbeast";
					},
					async effect(event, trigger, player) {
						player.hs_drawDeck();
					},
				},
			},
			hs_EtherealArcanist: {
				ending: {
					filter(evt, p, f) {
						return p.secrets.length;
					},
					recheck: "filter",
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff([2, 2]);
					},
				},
			},
			hs_ColdlightSeer: {
				battleRoal: {
					filter(player) {
						return player.sctp("mns", fl => fl.rkind == "murloc");
					},
					async effect(event, trigger, player) {
						event.fellow.sctp("mns_", fl => {
							if (fl.rkind == "murloc") fl.addvaluebuff([0, 2]);
						});
					},
				},
			},
			hs_Nozdormu: {
				numgh: {
					name: "hs_Nozdormu",
					value: 15,
					range(f, t) {
						return t == _status.currentPhase;
					},
				},
			},
			"hs_Alarm-o-Bot": {
				beginning: {
					self: true,
					filter(evt, p, f) {
						return p.countFellow() < 7 && p.countCards("h", ca => get.type(ca) == "HS_minor") > 0;
					},
					recheck: "filter",
					async effect(event, trigger, player) {
						player.hs_join3();
						event.fellow.HSF("backtohand");
					},
				},
			},
			//旧卡
			"hs_RagingWorgen": {
				jinu: {
					ability: "fengnu",
				},
			},
			"hs_InjuredBlademaster": {
				async battleRoal(event, trigger, player) {
					event.fellow.hs_dmgrcv("damage", 4, "self");
				},
			},
			"hs_SocererSApprentice": {
				numgh: {
					name: "hs_cost",
					value: 1,
					ghfilter(card, fellow, target) {
						return target == fellow.getLeader() && get.type(card) == "HS_spell";
					},
				},
			},
			"hs_Doomsayer": {
				beginning: {
					self: true,
					async effect(event, trigger, player) {
						get.HSF("lavaeffect", ["cuihui"]);
					},
				},
			},
			"hs_KnifeJuggler": {
				summonAfter: {
					self: true,
					notlink: true,
					randomRT(player) {
						return player.HSF("randmgfil");
					},
					async effect(event, trigger, player) {
						event.target.hs_dmgrcv("damage", event.fellow);
					},
				},
			},
			"hs_DefenderOfArgus": {
				async battleRoal(event, trigger, player) {
					const pls = event.fellow.sctp("neighbor");
					pls.forEach(i => {
						i.addautovaluebuff([1, 1], get.hs_id(event.fellow));
						i.addgjzbuff("chaofeng");
					});
				},
			},
			"hs_WarsongCommander": {
				summonSucc: {
					self: true,
					notlink: true,
					filter(event, player, fellow) {
						return get.rATK(event.card) <= 3;
					},
					randomRT(player, evt) {
						return evt.link;
					},
					async effect(event, trigger, player) {
						event.target.addTempClass("chongfeng2");
						event.target.addgjzbuff("chongfeng");
					},
				},
			},
			"hs_Deathwing": {
				async battleRoal(event, trigger, player) {
					get.HSF("lavaeffect", ["cuihui", "minors_", "lava", "fellow"]);
					player.hs_discard("all");
				},
			},
			"hs_Leokk": {
				numgh: {
					name: "value",
					value: [1, 0],
					range(fellow, target) {
						return fellow.sctp("mine_", target);
					},
				},
			},
			"hs_DireWolfAlpha": {
				numgh: {
					name: "value",
					value: [1, 0],
					range(fellow, target) {
						return fellow.sctp("neighbor", target);
					},
				},
			},
			"hs_MurlocWarleader": {
				numgh: {
					name: "value",
					value: [2, 1],
					range(fellow, target) {
						return target.rkind == "murloc" && fellow.sctp("mns_", target);
					},
				},
			},
			"hs_GrimscaleOracle": {
				numgh: {
					name: "value",
					value: [1, 0],
					range(fellow, target) {
						return target.rkind == "murloc" && fellow.sctp("mns_", target);
					},
				},
			},
			"hs_OldMurkEye": {
				numgh: {
					name: "value",
					value(fellow) {
						return [game.countPlayer(fl => fl != fellow && fl.rkind == "murloc"), 0];
					},
					range(fellow, target) {
						return target == fellow;
					},
				},
			},
			"hs_SunfuryProtector": {
				async battleRoal(event, trigger, player) {
					const pls = event.fellow.sctp("neighbor").filter(i => null !== i);
					pls.forEach(i => {
						i.addgjzbuff("chaofeng");
					});
				},
			},
			"hs_VentureCoMercenary": {
				numgh: {
					name: "hs_cost",
					value: -3,
					ghfilter(card, fellow, target) {
						return target == fellow.getLeader() && get.type(card) == "HS_minor";
					},
				},
			},
			"hs_TimberWolf": {
				numgh: {
					name: "value",
					value: [1, 0],
					range(fellow, target) {
						return target.rkind == "wildbeast" && fellow.sctp("mine_", target);
					},
				},
			},
			"hs_TundraRhino": {
				numgh: {
					name: "ability",
					value: ["chongfeng"],
					range(fellow, target) {
						return target.rkind == "wildbeast" && fellow.sctp("mine", target);
					},
				},
			},
			"hs_NorthshireCleric": {
				hsrcv: {
					filter(evt) {
						return evt.player.isMin();
					},
					async effect(event, trigger, player) {
						player.hs_drawDeck();
					},
				},
			},
			"hs_Treant1": {
				ending: {
					async effect(event, trigger, player) {
						event.fellow.HSF("cuihui");
					},
				},
			},
			"hs_Alexstrasza": {
				battleRoal: {
					filterTarget(card, player, target) {
						return player.sctp("heros", target);
					},
					async effect(event, trigger, player) {
						event.target.hs_dm = Math.max(0, event.target.maxHp - 15);
						if (event.target.maxHp < 15) event.target.addvaluebuff([0, 15 - event.target.maxHp]);
						event.target.update();
					},
				},
			},
			"hs_FrothingBerserker": {
				hsdmg: {
					filter(evt, p, t) {
						return evt.player.isMin();
					},
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff(1);
					},
				},
			},
			"hs_ArmorSmith": {
				hsdmg: {
					filter(evt, p, t) {
						return p.sctp("mine", evt.player);
					},
					async effect(event, trigger, player) {
						player.changeHujia();
					},
				},
			},
			"hs_MillhouseManastorm": {
				async battleRoal(event, trigger, player) {
					const o = player.getOppo();
					const t = event.fellow;
					o.addaurasbuff({
						name: "hs_cost",
						value: 0,
						subtype: "final",
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
			"hs_ScavengingHyena": {
				deathFL: {
					filter(event, player, fellow) {
						return event.link.getLeader() == player && event.link.rkind == "wildbeast";
					},
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff([2, 1]);
					},
				},
			},
			"hs_CultMaster": {
				deathFL: {
					filter(event, player, fellow) {
						return event.link.getLeader() == player;
					},
					async effect(event, trigger, player) {
						player.hs_drawDeck();
					},
				},
			},
			"hs_FlesheatingGhoul": {
				deathFL: {
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff(1);
					},
				},
			},
			"hs_ColdlightOracle": {
				async battleRoal(event, trigger, player) {
					get.HSF("crossDraw", [player, 2]);
				},
			},
			"hs_LorewalkerCho": {
				useCard: {
					filter: "法术",
					async effect(event, trigger, player) {
						event.evt.player.getOppo().hs_gain(event.evt.card.name);
					},
				},
			},
			"hs_StormwindChampion": {
				numgh: {
					name: "value",
					value: [1, 1],
					range(fellow, target) {
						return fellow.sctp("mine_", target);
					},
				},
			},
			"hs_FacelessManipulator": {
				battleRoal: {
					filterTarget(card, player, target) {
						return target.isMin();
					},
					async effect(event, trigger, player) {
						event.fellow.HSF("convert", [event.target.name + "_monster", true, event.target]);
					},
				},
			},
			"hs_TwilightDrake": {
				async battleRoal(event, trigger, player) {
					const num = player.countCards("h");
					if (num > 0) event.fellow.addvaluebuff([0, num]);
				},
			},
			"hs_RaidLeader": {
				inherit: "hs_Leokk",
			},
			"hs_ManaWraith": {
				numgh: {
					name: "hs_cost",
					value: -1,
					ghfilter(card, fellow, target) {
						return get.type(card) == "HS_minor";
					},
				},
			},
			"hs_SouthseaCaptain": {
				numgh: {
					name: "value",
					value: [1, 1],
					range(fellow, target) {
						return target.rkind == "pirate" && fellow.sctp("mine_", target);
					},
				},
			},
			"hs_TongueTotem": {
				numgh: {
					name: "value",
					value: [2, 0],
					range(fellow, target) {
						return fellow.sctp("neighbor", target);
					},
				},
			},
			"hs_ArathiWeaponsmith": {
				async battleRoal(event, trigger, player) {
					player.hs_weapon("战斧");
				},
			},
			"hs_SummoningPortal": {
				numgh: {
					early: 1,
					name: "hs_cost",
					value(card, cost) {
						return Math.min(2, cost - 1);
					},
					ghfilter(card, fellow, target) {
						return get.type(card) == "HS_minor" && target == fellow.getLeader();
					},
				},
			},
			"hs_VoidTerror": {
				async battleRoal(event, trigger, player) {
					const pls = event.fellow.sctp("neighbor");
					event.fellow.HSline(pls, "green");
					if (pls.length) {
						pls.forEach(i => i.HSF("cuihui"));
						const arr = pls.reduce((x, y) => {
							x[0] += y.ATK;
							x[1] += y.hp;
							return x;
						}, [0, 0]);
						event.fellow.addvaluebuff(arr);
					}
				},
			},
			"hs_TinkmasterOverspark": {
				battleRoal: {
					randomRT(p, evt) {
						return evt.fellow.sctp("mns_").randomGet();
					},
					async effect(event, trigger, player) {
						event.target.HSF("convert", [
							["松鼠", "魔暴龙"].randomGet()
						]);
					},
				},
			},
			"hs_BloodsailRaider": {
				battleRoal: {
					filter(player) {
						return player.data_weapon;
					},
					async effect(event, trigger, player) {
						event.fellow.addvaluebuff(player.data_weapon.ATK);
					},
				},
			},
			"hs_SouthseaDeckhand": {
				numgh: {
					name: "ability",
					value: ["chongfeng"],
					range(fellow, target) {
						return target == fellow;
					},
					ghfilter(card, fellow, target) {
						return fellow.getLeader().data_weapon != undefined;
					},
				},
			},
			"hs_MurlocTidecaller": {
				summonBefore: {
					notlink: true,
					filter(evt) {
						return evt.link.rkind == "murloc";
					},
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff(1);
					},
				},
			},
			"hs_KingMukla": {
				async battleRoal(event, trigger, player) {
					player.getOppo().hs_gain(["香蕉", 2]);
				},
			},
			"hs_AcidicSwampOoze": {
				battleRoal: {
					randomRT(p) {
						return p.getOppo().data_weapon;
					},
					async effect(event, trigger, player) {
						event.target.HSF("cuihui");
					},
				},
			},
			"hs_BloodsailCorsair": {
				battleRoal: {
					randomRT(p) {
						return p.getOppo().data_weapon;
					},
					async effect(event, trigger, player) {
						event.target.hs_dmgrcv(1);
					},
				},
			},
			"hs_HarrisonJones": {
				battleRoal: {
					randomRT(p) {
						return p.getOppo().data_weapon;
					},
					async effect(event, trigger, player) {
						event.target.HSF("cuihui");
						player.hs_drawDeck(event.target.hp);
					},
				},
			},
			"hs_ManaAddict": {
				useCard: {
					self: true,
					filter: "法术",
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff(2, 1)
					},
				},
			},
			"hs_StampedingKodo": {
				battleRoal: {
					randomRT(p) {
						return p.HSF("ranxmfil", [null, t => t.ATK <= 2]);
					},
					async effect(event, trigger, player) {
						event.target.HSF("cuihui");
					},
				},
			},
			"hs_SylvanasWindrunner": {
				deathRattle: {
					randomRT(p) {
						return p.HSF("ranxmfil");
					},
					async effect(event, trigger, player) {
						event.target.toNTRed(player);
					},
				},
			},
			"hs_MindControlTech": {
				battleRoal: {
					filter(p) {
						return p.getOppo().countFellow() >= 4;
					},
					recheck: "filter",
					randomRT(p) {
						return p.HSF("ranxmfil");
					},
					async effect(event, trigger, player) {
						event.target.toNTRed(player);
					},
				},
			},
			"hs_CabalShadowPriest": {
				battleRoal: {
					filterTarget(card, player, target) {
						return player.sctp("notmine", target) && target.ATK <= 2;
					},
					async effect(event, trigger, player) {
						event.target.toNTRed(player);
					},
				},
			},
			"hs_CaptainsParrot": {
				async battleRoal(event, trigger, player) {
					player.hs_drawDeck2(c => get.rkind(c) == "pirate");
				},
			},
			"hs_CaptainGreenskin": {
				battleRoal: {
					randomRT(p) {
						return p.data_weapon;
					},
					async effect(event, trigger, player) {
						event.target.addvaluebuff([1, 1]);
					},
				},
			},
			"hs_Pint-SizedSummoner": {
				onadd(f) {
					f.addcostbuff(1, (c, p) => {
						const evts = p.getHistory("useCard", e => get.type(e.card) == "HS_minor");
						if (evts.length) return false;
						return get.type(c) == "HS_minor";
					}, Infinity, Infinity);
				},
			},
			"hs_Lightspawn": {
				numgh: {
					name: "value",
					later: 1,
					value(f, atk, hp) {
						return [f.hp, 0];
					},
					subtype: "final",
					range(fellow, target) {
						return fellow == target;
					},
				},
			},
			"hs_UnboundElemental": {
				useCard: {
					self: true,
					notlink: true,
					filter(evt, p, f) {
						return get.info(evt.cards[0]).hs_gz;
					},
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff([1, 1])
					},
				},
			},
			"hs_AncientMage": {
				async battleRoal(event, trigger, player) {
					const tgs = event.fellow.sctp("neighbor");
					tgs.forEach(i => {
						i.addFqbuff("hs_power", 1);
					});
				},
			},
			"hs_LordJaraxxus": {
				async battleRoal(event, trigger, player) {
					if (!event.fellow.HSF("alive")) return;
					await event.fellow.HSF("standup");
					player.init(event.fellow.name);
					player.clearSkills(true);
					player.classList.remove("minskin");
					player.baseHP = 15;
					player.hs_dm = 0;
					player.hujia = 0;
					player.removegjz("dongjied");
					player.rkind = "demon";
					player.updatehsfl();
					await player.HSF('changeHeroskill', ['地狱火！']);
					await player.hs_weapon("血怒");
				},
			},
			"hs_CrazedAlchemist": {
				battleRoal: {
					filterTarget(card, player, target) {
						return player.sctp("mns", target);
					},
					async effect(event, trigger, player) {
						event.target.hs_reverse();
					},
				},
			},
			"hs_FrostwolfWarlord": {
				async battleRoal(event, trigger, player) {
					const num = event.fellow.sctp("mine_").length;
					if (num > 0) event.fellow.addvaluebuff([num, num]);
				},
			},
			"hs_DarkscaleHealer": {
				async battleRoal(event, trigger, player) {
					player.hs_dmgrcvaoe("recover", 2, player.sctp("myside"));
				},
			},
			"hs_TheBlackKnight": {
				battleRoal: {
					filterTarget(card, player, target) {
						return player.sctp("notmine", target) && target.hasgjz("chaofeng");
					},
					aifamily: "damage",
					async effect(event, trigger, player) {
						event.target.HSF("cuihui");
					},
				},
			},
			"hs_HungryCrab": {
				battleRoal: {
					filterTarget(card, player, target) {
						return target.isMin() && target.rkind == "murloc";
					},
					aifamily: "damage",
					async effect(event, trigger, player) {
						event.target.HSF("cuihui");
						event.fellow.addvaluebuff([2, 2]);
					},
				},
			},
			"hs_YouthfulBrewmaster": {
				battleRoal: {
					filterTarget(card, player, target) {
						return player.sctp("mine", target);
					},
					async effect(event, trigger, player) {
						event.target.HSF("backtohand");
					},
				},
			},
			"hs_AncientBrewmaster": {
				inherit: "hs_YouthfulBrewmaster",
			},
			"hs_SpitefulSmith": {
				jinu: {},
				numgh: {
					name: "value",
					value: [2, 0],
					wpal: true,
					range(f, tg) {
						return tg.swt && tg.getLeader() == f.getLeader();
					},
					ghfilter(card, fellow, target) {
						return fellow.isDamaged();
					},
				},
			},
			"hs_Kidnapper": {
				prompt: "将一个随从移回其拥有者的手牌",
				active(p, c) {
					return p.hs_state.useCard > 0;
				},
				lianji: {
					filterTarget(card, player, target) {
						return target.isMin();
					},
					async effect(event, trigger, player) {
						event.target.HSF('backtohand');
					},
				},
			},
			"hs_Secretkeeper": {
				useCard: {
					filter(evt, p, f) {
						return get.subtype(evt.card) == "HS_secret";
					},
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff([1, 1]);
					},
				},
			},
			"hs_DruidOfTheClaw": {
				juezetrans: true,
			},
			"hs_AncientOfLore": {
				jueze: ["hs_AncientTeachings", "hs_AncientSecrets"],
			},
			"hs_KeeperOfTheGrove": {
				jueze: ["hs_Moonfire2", "hs_Dispel"],
			},
			"hs_Cenarius": {
				jueze: ["hs_DemigodsFavor", "hs_ShandosLesson"],
			},
			"hs_AncientOfWar": {
				jueze: ["hs_Uproot", "hs_Rooted"],
			},
			"hs_BigGameHunter": {
				battleRoal: {
					filterTarget(card, player, target) {
						return player.sctp("mns", target) && target.ATK >= 7;
					},
					aifamily: "damage",
					async effect(event, trigger, player) {
						event.target.HSF("cuihui");
					},
				},
			},


			//随从新卡定位

		},
	},
	spell: {
		info: { //伤害
			hs_ArcaneMissiles: ["奥术飞弹", "essential", "飞弹:3", 1, "hs_mage"],
			hs_Fireball: ["火球术", "essential", "damage:6", 4, "hs_mage", ["fire"]],
			hs_Frostbolt: ["寒冰箭", "essential", ["damage:3", "对一个角色造成3点伤害，并使其冻结。"], 2, "hs_mage", ["ice", "frost"]],
			hs_Soulfire: ["灵魂之火", "essential", ["damage:4", "造成4点伤害，随机弃一张牌。"], 1, "hs_warlock", ["fire", "discard1"]],
			hs_MortalCoil: ["死亡缠绕", "essential", ["damage:1", "对一个随从造成1点伤害。如果“死亡缠绕”消灭该随从，抽一张牌。"], 1, "hs_warlock", ["only:fellow", "des:draw1"]],
			hs_TailSwipe: ["扫尾", "essential", "damage:4", 4, "hs_neutral", ["token"]],
			hs_KillCommand: ["杀戮命令", "essential", ["damage:3", "造成3点伤害。如果你控制一个野兽，则改为造成5点伤害。"], 3, "hs_hunter", ["activecon:ys", "activenum:5"]],
			hs_Whirlwind: ["旋风斩", "essential", ["damage:1", "对所有随从造成1点伤害。"], 1, "hs_warrior", ["blade"]],
			hs_Moonfire: ["月火术", "essential", "damage:1", 0, "hs_druid"],
			hs_HolySmite: ["神圣惩击", "essential", "damage:2", 1, "hs_priest"],
			hs_ArcaneShot: ["奥术射击", "essential", "damage:2", 1, "hs_hunter"],
			hs_ShadowBolt: ["暗影箭", "essential", ["damage:4", "对一个随从造成4点伤害。"], 3, "hs_warlock", ["only:fellow"]],
			hs_Hellfire: ["地狱烈焰", "essential", ["damage:3", "对所有角色造成3点伤害。"], 4, "hs_warlock", ["fire", "lava:all"]],
			hs_Flamestrike: ["烈焰风暴", "essential", ["damage:4", "对所有敌方随从造成4点伤害。"], 7, "hs_mage", ["fire", "aoe:notmine"]],
			hs_AvengingWrath: ["复仇之怒", "epic", "飞弹:8", 6, "hs_paladin"],
			hs_HolyFire: ["神圣之火", "rare", ["damage:5", "造成5点伤害。为你的英雄恢复5点生命值。"], 6, "hs_priest", ["xxx"]],
			hs_DrainLife: ["吸取生命", "essential", ["damage:2", "造成2点伤害。为你的英雄恢复2点生命值。"], 3, "hs_warlock", ["xxx"]],
			hs_Starfire: ["星火术", "essential", ["damage:5", "造成5点伤害。抽一张牌。"], 6, "hs_druid", ["draw1"]],
			hs_Pyroblast: ["炎爆术", "epic", "damage:10", 10, "hs_mage", ["fire"]],
			hs_HolyNova: ["神圣新星", "essential", ["damage:2", "对所有敌人造成2点伤害，为所有友方角色恢复2点生命值。"], 5, "hs_priest", ["aoe:opposide", "rcvmyside:2"]],
			hs_MindBlast: ["心灵震爆", "ordinary", "damage:5", 2, "hs_priest", ["only:enemy"]],
			hs_Consecration: ["奉献", "essential", ["damage:2", "对所有敌人造成2点伤害。"], 4, "hs_paladin", ["aoe:opposide"]],
			hs_HammerOfWrath: ["愤怒之锤", "essential", ["damage:3", "造成3点伤害。抽一张牌。"], 4, "hs_paladin", ["draw1"]],
			hs_Slam: ["猛击", "ordinary", ["damage:2", "对一个随从造成2点伤害，如果它依然存活，则抽一张牌。"], 2, "hs_warrior", ["only:fellow", "nodes:draw1"]],
			hs_SinisterStrike: ["影袭", "essential", ["damage:3", "对敌方英雄造成 3点伤害。"], 1, "hs_rogue", ["only:enemy"]],
			hs_FrostShock: ["冰霜震击", "essential", ["damage:1", "对一个敌方角色造成1点伤害，并使其冻结。"], 1, "hs_shaman", ["ice", "only:opposide", "frost"]],
			hs_LightningBolt: ["闪电箭", "ordinary", ["damage:3", "造成3点伤害，过载：（1）"], 1, "hs_shaman", ["thunder"]],
			hs_LavaBurst: ["熔岩爆裂", "rare", ["damage:5", "造成5点伤害，过载：（2）"], 3, "hs_shaman", ["fire"]],
			hs_Backstab: ["背刺", "essential", ["damage:2", "对一个未受伤的随从造成2点伤害。"], 0, "hs_rogue", ["only:fellow,healthy"]],
			hs_Shiv: ["毒刃", "essential", ["damage:1", "造成1点伤害。抽一张牌。"], 2, "hs_rogue", ["draw1"]],
			hs_FanOfKnives: ["刀扇", "essential", "damage:1", 3, "hs_rogue", ["aoe:notmine", "draw1"]],
			hs_Blizzard: ["暴风雪", "rare", ["damage:2", "对所有敌方随从造成2点伤害，并使其冻结。"], 6, "hs_mage", ["ice", "aoe:notmine", "bh"]],
			hs_MortalStrike: ["致死打击", "rare", ["damage:4", "造成4点伤害；如果你的生命值小于或等于12点，则改为造成6点伤害。"], 4, "hs_warrior", ["activecon:dmg", "activenum:6"]],
			hs_ShieldSlam: ["盾牌猛击", "epic", ["damage:(player.hujia)", "你每有1点护甲值，便对一个随从造成1点伤害。"], 1, "hs_warrior", ["only:fellow"]],
			hs_Cleave: ["顺劈斩", "essential", ["damage:2", "随机对两个敌方随从造成2点伤害。"], 2, "hs_warrior", ["only:randmgfl2"]],
			hs_MultiShot: ["多重射击", "essential", ["damage:3", "随机对两个敌方随从造成3点伤害。"], 4, "hs_hunter", ["only:randmgfl2"]],
			hs_ForkedLightning: ["叉状闪电", "ordinary", ["damage:2", "随机对两个敌方随从造成2点伤害，过载：（2）"], 1, "hs_shaman", ["thunder", "only:randmgfl2"]],
			hs_Eviscerate: ["刺骨", "ordinary", ["damage:2", "造成2点伤害；连击：改为造成4点伤害。"], 2, "hs_rogue", ["activecon:lianji", "activenum:4"]],
			hs_Headcrack: ["裂颅之击", "rare", ["damage:2", "对敌方英雄造成2点伤害；连击：在下个回合将其移回你的手牌。"], 3, "hs_rogue", ["only:enemy", "activecon:lianji", "other:if(event.active)player.addhsbuff({name:'llzj',temp:1.1,countphase:player.getOppo(),onremove:function(p){p.hs_gain('裂颅之击');},});"]],
			hs_HolyWrath: ["神圣愤怒", "rare", ["damage:(player.cardPile.countCards('h')?player.cardPile.getCards('h')[0].cost():0)", "抽一张牌，并造成等同于其法力值消耗的伤害。"], 5, "hs_paladin", ["draw1"]],
			hs_BaneOfDoom: ["末日灾祸", "epic", ["damage:2", "对一个角色造成2点伤害。如果“末日灾祸”消灭该角色，随机召唤一个恶魔。"], 5, "hs_warlock", ["des:player.SSfellow(get.hskachi('HS_minor',(c,info)=>info.rkind=='demon').randomGet());"]],
			hs_ArcaneExplosion: ["魔爆术", "essential", ["damage:1", "对所有敌方随从造成1点伤害。"], 2, "hs_mage", ["aoe:notmine"]],

			//治疗
			hs_LayOnHands: ["圣疗术", "epic", ["recover:8", "恢复8点生命值，抽三张牌。"], 8, "hs_paladin", ["draw3"]],
			hs_HolyLight: ["圣光术", "essential", "recover:6", 2, "hs_paladin"],
			hs_HealingTouch: ["治疗之触", "essential", "recover:8", 3, "hs_druid"],
			hs_AncestralHealing: ["先祖治疗", "essential", "recover:target.maxHp", 0, "hs_shaman", ["only:fellow", "buff:chaofeng"]],

			//消灭
			hs_SiphonSoul: ["灵魂虹吸", "rare", ["kill:1", "消灭一个随从，为你的英雄恢复3点生命值。"], 6, "hs_warlock", ["xx:3"]],
			hs_SacrificialPact: ["牺牲契约", "essential", ["kill:1", "消灭一个恶魔，为你的英雄恢复5点生命值。"], 0, "hs_warlock", ["xx:5", "only:demon"]],
			hs_Naturalize: ["自然平衡", "ordinary", ["kill:1", "消灭一个随从，你的对手抽两张牌。"], 1, "hs_druid", ["gift:2"]],
			hs_ShadowWordDeath: ["暗言术：灭", "essential", ["kill:1", "消灭一个攻击力大于或等于5的随从。"], 3, "hs_priest", ["only:灭"]],
			hs_ShadowWordPain: ["暗言术：痛", "essential", ["kill:1", "消灭一个攻击力小于或等于3的随从。"], 2, "hs_priest", ["only:痛"]],
			hs_Execute: ["斩杀", "essential", ["kill:1", "消灭一个受伤的敌方随从。"], 1, "hs_warrior", ["only:enm,伤"]],
			hs_TwistingNether: ["扭曲虚空", "epic", ["kill:all", "消灭所有随从。"], 8, "hs_warlock"],
			hs_Assassinate: ["刺杀", "essential", ["kill:1", "消灭一个敌方随从。"], 5, "hs_rogue", ["only:enm"]],
			hs_DeadlyShot: ["致命射击", "ordinary", ["kill:1", "随机消灭一个敌方随从。"], 3, "hs_hunter", ["only:ranxmfl"]],

			//召唤
			hs_AnimalCompanion: ["动物伙伴", "essential", ["summon:['cdset:动物伙伴']", "随机召唤一个野兽伙伴。"], 3, "hs_hunter"],
			hs_ForceOfNature: ["自然之力", "epic", ["summon:['hs_Treant1_monster',3]", "召唤三个2/2并具有冲锋的树人，在回合结束时，消灭这些树人。"], 6, "hs_druid"],
			hs_MirrorImage: ["镜像", "essential", ["summon:['hs_MirrorImage_monster',2]", "召唤两个0/2，并具有嘲讽的随从。"], 1, "hs_mage"],
			hs_UnleashTheHounds: ["关门放狗", "ordinary", ["summon:['猎犬',player.sctp('notmine').length]", "战场上每有一个敌方随从，便召唤一个1/1并具有冲锋的猎犬。"], 3, "hs_hunter", ["fg"]],
			hs_FeralSpirit: ["野性狼魂", "rare", ["summon:['幽灵狼',2]", "召唤两只2/3并具有嘲讽的幽灵狼。过载：（2）"], 3, "hs_shaman"],

			//抽牌
			hs_ExcessMana: ["法力过剩", "rare", ["draw:1", "抽一张牌。（你最多可以拥有十个法力水晶。）"], 0, "hs_druid", ["token"]],
			hs_ArcaneIntellect: ["奥术智慧", "essential", "draw:2", 3, "hs_mage"],
			hs_DivineFavor: ["神恩术", "rare", ["draw:p=>Math.max(0,p.getOppo().countCards('h')-p.countCards('h'))", "抽若干数量的牌，直到你的手牌数量等同于你对手的手牌数量。"], 3, "hs_paladin"],
			hs_BattleRage: ["战斗怒火", "ordinary", ["draw:p=>p.sctp('myside').filter(t=>t.isDamaged()).length", "每有一个受伤的友方角色，便抽一张牌。"], 2, "hs_warrior"],
			hs_Sprint: ["疾跑", "essential", "draw:4", 7, "hs_rogue"],

			//buff
			hs_HuntersMark: ["猎人印记", "essential", ["buff:h1", "使一个随从的生命值变为1。"], 0, "hs_hunter", ["damage"]],
			hs_PowerWordShield: ["真言术：盾", "essential", ["buff:H2", "使一个随从获得+2生命值。 抽一张牌。"], 1, "hs_priest", ["draw1"]],
			hs_InnerRage: ["怒火中烧", "ordinary", ["buff:A2,d1", "对一个随从造成1点伤害，该随从获得+2攻击力。"], 0, "hs_warrior"],
			hs_Charge: ["冲锋", "essential", ["buff:A2,chongfeng", "使一个友方随从获得+2攻击力和冲锋。"], 3, "hs_warrior", ["sctp:mine"]],
			hs_MarkOfWild: ["野性印记", "essential", ["buff:chaofeng,22", "使一个随从获得嘲讽和+2/+2。（+2攻击力/+2生命值）"], 2, "hs_druid"],
			hs_BlessingOfMight: ["力量祝福", "essential", ["buff:A3", "使一个随从获得+3攻击力。"], 1, "hs_paladin"],
			hs_Humility: ["谦逊", "essential", ["buff:a1", "使一个随从的攻击力变为1。"], 1, "hs_paladin"],
			hs_HandOfProtection: ["保护之手", "essential", ["buff:shengdun", "使一个随从获得圣盾。"], 1, "hs_paladin"],
			hs_BlessingOfKings: ["王者祝福", "essential", ["buff:44", "使一个随从获得+4/+4。（+4攻击力/+4生命值）"], 4, "hs_paladin"],
			hs_EarthShock: ["大地震击", "ordinary", ["buff:cm,d1", "沉默一个随从，然后对其造成1点伤害。"], 1, "hs_shaman"],
			hs_Bananas: ["香蕉", "ordinary", ["buff:11", "使一个随从获得+1/+1。"], 1, "hs_neutral", ["token"]],
			hs_Windfury: ["风怒", "essential", ["buff:fengnu", "使一个随从获得风怒。"], 2, "hs_shaman"],
			hs_Rampage: ["狂暴", "ordinary", ["buff:33", "使一个受伤的随从获得+3/+3。"], 2, "hs_warrior", ["only:伤"]],
			hs_ColdBlood: ["冷血", "ordinary", ["buff:A2", "使一个随从获得+2攻击力；连击：改为获得+4攻击力。"], 1, "hs_rogue", ["activecon:lianji", "onlianji:A4"]],

			//咆哮
			hs_Bloodlust: ["嗜血", "essential", ["咆哮:3", "在本回合中，使你的所有随从获得+3攻击力。"], 5, "hs_shaman", ["temp"]],

			//变形
			hs_Polymorph: ["变形术", "essential", ["bxs:绵羊", "使一个随从变形成为1/1的绵羊。"], 4, "hs_mage"],
			hs_Hex: ["妖术", "essential", ["bxs:hs_Frog_monster", "使一个随从变形成为一只0/1并具有嘲讽的青蛙。"], 3, "hs_shaman"],

			//其他简化
			//叠甲
			hs_ShieldBlock: ["盾牌格挡", "essential", "获得5点护甲值。抽一张牌。", 3, "hs_warrior", ["atkhj:[0,5]", "draw1"]],
			hs_Claw: ["爪击", "essential", "使你的英雄获得2点护甲值，并在本回合中获得+2攻击力。", 1, "hs_druid", ["atkhj:[2,2]"]],
			hs_Bite: ["撕咬", "rare", "使你的英雄获得4点护甲值，并在本回合中获得+4攻击力。", 4, "hs_druid", ["atkhj:[4,4]"]],
			hs_HeroicStrike: ["英勇打击", "essential", "在本回合中，使你的英雄获得+4攻击力。", 2, "hs_warrior", ["atkhj:[4,0]"]],
			hs_FrostNova: ["冰霜新星", "essential", "冻结所有敌方随从。", 3, "hs_mage", ["bh"]],

			//其他
			hs_CircleOfHealing: ["治疗之环", "ordinary", "为所有随从恢复4点生命值。", 0, "hs_priest"],
			hs_SavageRoar: ["野蛮咆哮", "essential", "在本回合中，使你的所有角色获得+2攻击力。", 3, "hs_druid"],
			hs_InnerFire: ["心灵之火", "ordinary", "使一个随从的攻击力等同于其生命值。", 1, "hs_priest"],
			hs_DivineSpirit: ["神圣之灵", "ordinary", "使一个随从的生命值翻倍。", 2, "hs_priest"],
			hs_MassDispel: ["群体驱散", "rare", "沉默所有敌方随从，抽一张牌。", 4, "hs_priest"],
			hs_Equality: ["生而平等", "rare", "将所有随从的生命值变为1", 2, "hs_paladin"],
			hs_Flare: ["照明弹", "rare", "所有随从失去潜行，摧毁所有敌方奥秘，抽一张牌。", 2, "hs_hunter"],
			hs_WildGrowth: ["野性成长", "essential", "获得一个空的法力水晶。", 2, "hs_druid"],
			hs_DeadlyPoison: ["致命药膏", "essential", "使你的武器获得+2攻击力。", 1, "hs_rogue"],
			hs_BladeFlurry: ["剑刃乱舞", "rare", "摧毁你的武器，对所有敌人造成等同于其攻击力的伤害。", 2, "hs_rogue"],
			hs_BlessingOfWisdom: ["智慧祝福", "ordinary", "选择一个随从，每当其进行攻击，便抽一张牌。", 1, "hs_paladin"],
			hs_BlessedChampion: ["受祝福的勇士", "rare", "使一个随从的攻击力翻倍。", 5, "hs_paladin"],
			hs_CommandingShout: ["命令怒吼", "rare", "在本回合中，你的随从的生命值无法被降到1点以下。抽一张牌。", 2, "hs_warrior"],
			hs_RockbiterWeapon: ["石化武器", "essential", "在本回合中，使一个友方角色获得+3攻击力。", 1, "hs_shaman"],
			hs_IceLance: ["冰枪术", "ordinary", "冻结一个角色，如果该角色已被冻结，则改为对其造成4点伤害。", 1, "hs_mage", ["bq:damage"]],
			hs_Silence: ["沉默", "ordinary", "沉默一个随从。", 0, "hs_priest"],
			hs_PowerOverwhelming: ["力量的代价", "ordinary", "使一个友方随从获得+4/+4，该随从会在回合结束时死亡。", 1, "hs_warlock"],
			hs_TheCoin: ["幸运币", "essential", "在本回合中，获得一个法力水晶。", 0, "hs_neutral"],
			hs_Innervate: ["激活", "essential", "在本回合中，获得两个法力水晶。", 4, "hs_warlock"],
			hs_MindVision: ["心灵视界", "essential", "随机复制对手手牌中的一张牌，将其置入你的手牌。", 1, "hs_priest"],
			hs_Swipe: ["横扫", "essential", ["damage:4", "对一个敌人造成4点伤害，并对所有其他敌人造成1点伤害。"], 4, "hs_druid"],
			hs_ConeOfCold: ["冰锥术", "ordinary", "冻结一个随从和其相邻的随从，并对它们造成1点伤害。", 4, "hs_mage"],
			hs_ExplosiveShot: ["爆炸射击", "rare", "对一个随从造成5点伤害，并对其相邻的随从造成2点伤害。", 5, "hs_hunter"],
			hs_Upgrade: ["升级", "rare", "如果你装备一把武器，使它获得+1/+1。否则，装备一把1/3的武器。", 1, "hs_warrior"],
			hs_FarSight: ["视界术", "epic", "抽一张牌，该牌的法力值消耗减少（3）点。", 3, "hs_shaman"],
			hs_MindControl: ["精神控制", "essential", "获得一个敌方随从的控制权。", 10, "hs_priest"],
			hs_ShadowMadness: ["暗影狂乱", "rare", "直到回合结束，获得一个攻击力小于或等于3的敌方随从的控制权。", 4, "hs_priest"],
			hs_Thoughtsteal: ["思维窃取", "ordinary", "复制你对手的牌库中的两张牌，并将其置入你的手牌。", 3, "hs_priest", ["gain:player.getOppo().cardPile.getCards('h').map(i=>i.name).randomGets(2)"]],
			hs_Mindgames: ["控心术", "epic", "随机将你对手的牌库中的一张随从牌的复制置入战场。", 4, "hs_priest"],
			hs_SenseDemons: ["感知恶魔", "ordinary", "从你的牌库中抽两张恶魔牌。", 3, "hs_warlock"],
			hs_Conceal: ["隐藏", "ordinary", "直到你的下个回合，使所有友方随从获得潜行。", 1, "hs_rogue"],
			hs_Betrayal: ["背叛", "ordinary", "使一个敌方随从对其相邻的随从造成等同于其攻击力的伤害。", 2, "hs_rogue"],
			hs_Preparation: ["伺机待发", "epic", "在本回合中，你所施放的下一个法术的法力值消耗减少（3）点。", 0, "hs_rogue"],
			hs_TotemicMight: ["图腾之力", "essential", "使你的图腾获得+2生命值。", 0, "hs_shaman"],
			hs_Shadowflame: ["暗影烈焰", "rare", "消灭一个友方随从，对所有敌方随从造成等同于其攻击力的伤害。", 4, "hs_warlock"],
			hs_Corruption: ["腐蚀术", "essential", "选择一个敌方随从，在你的回合开始时，消灭该随从。", 1, "hs_warlock"],
			hs_Shadowstep: ["暗影步", "ordinary", "将一个友方随从移回你的手牌，它的法力值消耗减少（2）点。", 0, "hs_rogue"],
			hs_Sap: ["闷棍", "essential", "将一个敌方随从移回你对手的手牌。", 2, "hs_rogue"],
			hs_Vanish: ["消失", "ordinary", "将所有随从移回其拥有者的手牌。", 6, "hs_rogue"],
			hs_Dream: ["梦境", "essential", "将一个敌方随从移回你对手的手牌。", 0, "hs_dream", ["token"]],
			hs_Nightmare: ["梦魇", "essential", "使一个随从获得+5/+5，在你的下个回合开始时，消灭该随从。", 0, "hs_dream", ["token"]],
			hs_YseraAwakens: ["伊瑟拉苏醒", "essential", "对除了伊瑟拉之外的所有角色造成5点伤害。", 2, "hs_dream", ["token"]],
			hs_SoulOfTheForest: ["丛林之魂", "ordinary", "使你的所有随从获得“亡语：召唤一个2/2的树人”。", 4, "hs_druid"],
			hs_Brawl: ["绝命乱斗", "epic", "随机选择一个随从，消灭除了该随从外的所有其他随从。", 5, "hs_warrior"],
			hs_Demonfire: ["恶魔之火", "ordinary", "对一个随从造成2点伤害，如果该随从是友方恶魔，则改为使其获得+2/+2。", 2, "hs_warlock"],
			hs_Wrath: ["愤怒", "ordinary", "抉择：对一个随从造成3点伤害；或者造成1点伤害并抽一张牌。", 2, "hs_druid"],
			hs_Nourish: ["滋养", "rare", "抉择：获得两个法力水晶；或者抽三张牌。", 5, "hs_druid"],
			hs_LightningStorm: ["闪电风暴", "rare", "对所有敌方随从造成2到3点伤害，过载：（2）", 3, "hs_shaman"],
			hs_Tracking: ["追踪术", "essential", "检视你的牌库顶的三张牌，抽其中一张，弃掉其余牌。", 1, "hs_hunter"],
			hs_AncestralSpirit: ["先祖之魂", "rare", "使一个随从获得“亡语：再次召唤该随从。”", 2, "hs_shaman"],
			hs_MarkofNature: ["自然印记", "ordinary", "抉择：使一个随从获得+4攻击力；或者+4生命值和嘲讽。", 3, "hs_druid"],
			hs_Shadowform: ["暗影形态", "epic", "你的英雄技能变为“造成2点伤害”，如果已经处于暗影形态下：改为“造成3点伤害”。", 2, "hs_priest"],
			hs_Starfall: ["星辰坠落", "rare", "抉择：对一个随从造成5点伤害；或者对所有敌方随从造成2点伤害。", 5, "hs_druid"],
			hs_PoweroftheWild: ["野性之力", "ordinary", "抉择：使你的所有随从获得+1/+1；或者召唤一只3/2的猎豹。", 2, "hs_druid"],
			hs_Savagery: ["野蛮之击", "rare", ["damage:(player.ATK)", "对一个随从造成等同于你的英雄攻击力的伤害。"], 1, "hs_druid", ["only:fellow"]],
			hs_BestialWrath: ["狂野怒火", "epic", "在本回合中，使一个野兽获得+2攻击力和免疫。", 1, "hs_hunter"],
			hs_IAmMurloc: ["我是鱼人", "essential", ["summon:['鱼人',[3,4,5].randomGet()]", "召唤三个、四个或者五个1/1的鱼人。"], 4, "hs_neutral", ["token"]],
			hs_RoguesDoIt: ["潜行者的伎俩", "essential", ["damage:4", "造成 4点伤害。抽一张牌。"], 4, "hs_neutral", ["draw1", "token"]],
			hs_PowerOfTheHorde: ["部落的力量", "essential", ["summon:['cdset:部落勇士']", "随机召唤一名部落勇士。"], 4, "hs_neutral", ["token"]],
			//抉择选项
			hs_DruidOfTheClaw1jz: ["猎豹形态", "ordinary", "冲锋", 0, "hs_druid", ["token", "nosearch"]],
			hs_DruidOfTheClaw2jz: ["熊形态", "ordinary", "+2生命值并具有嘲讽。", 0, "hs_druid", ["token", "nosearch"]],
			hs_SolarWrath: ["阳炎之怒", "essential", ["damage:3", "对一个随从造成3点伤害。"], 2, "hs_druid", ["token", "nosearch", "only:fellow"]],
			hs_NaturesWrath: ["自然之怒", "essential", ["damage:1", "对一个随从造成1点伤害，抽一张牌。"], 2, "hs_druid", ["token", "nosearch", "only:fellow", "draw1"]],
			hs_AncientTeachings: ["古老的教诲", "essential", "draw:2", 7, "hs_druid", ["token", "nosearch"]],
			hs_AncientSecrets: ["古老的秘密", "essential", "recover:5", 7, "hs_druid", ["token", "nosearch"]],
			hs_Moonfire2: ["月火术", "essential", "damage:2", 4, "hs_druid", ["token", "nosearch"]],
			hs_Dispel: ["禁魔", "essential", "沉默一个随从。", 4, "hs_druid", ["token", "nosearch"]],
			hs_RampantGrowth: ["快速生长", "essential", "获得两个法力水晶。", 5, "hs_druid", ["token", "nosearch"]],
			hs_Enrich: ["摄取养分", "essential", "draw:3", 5, "hs_druid", ["token", "nosearch"]],
			hs_DemigodsFavor: ["半神的恩赐", "essential", "使你的所有其他随从获得+2/+2。", 9, "hs_druid", ["token", "nosearch"]],
			hs_ShandosLesson: ["恩师的教诲", "essential", "召唤两个2/2并具有嘲讽的树人。", 9, "hs_druid", ["token", "nosearch"]],
			hs_Uproot: ["拔根", "essential", "+5攻击力。", 7, "hs_druid", ["token", "nosearch"]],
			hs_Rooted: ["扎根", "essential", "+5生命值并具有嘲讽。", 7, "hs_druid", ["token", "nosearch"]],
			hs_Starlord: ["星辰领主", "essential", ["damage:5", "对一个随从造成5点伤害。"], 5, "hs_druid", ["token", "nosearch", "only:fellow"]],
			hs_StellarDrift: ["星辰漂流", "essential", ["damage:2", "对所有敌方随从造成2点伤害。"], 5, "hs_druid", ["token", "nosearch", "aoe:notmine"]],
			hs_LeaderOfThePack: ["兽群领袖", "essential", ["咆哮:1", "使你的所有随从获得+1/+1。"], 2, "hs_druid", ["token", "nosearch"]],
			hs_SummonAPanther: ["召唤猎豹", "essential", ["summon:'猎豹'", "召唤一只3/2的猎豹。"], 2, "hs_druid", ["token", "nosearch"]],
			hs_TigersFury: ["猛虎之怒", "essential", ["buff:A4", "+4攻击力。"], 3, "hs_druid", ["token", "nosearch"]],
			hs_ThickHide: ["皮糙肉厚", "essential", ["buff:H4,chaofeng", "+4生命值并具有嘲讽。"], 3, "hs_druid", ["token", "nosearch"]],
		},
		skill: {
			//法术卡  定位
			hs_AncestralSpirit: {
				filterTarget(card, player, target) {
					return target.isMin();
				},
				async content(event, trigger, player) {
					event.target.addtriggerbuff(event.card);
				},
				delayeffect: {
					async deathRattle(event, trigger, player) {
						event.fellow.SSfellow(event.fellow.linkCard[0].name);
					},
				},
			},
			hs_MarkofNature: {
				sfilter(card, player) {
					return player.sctp("mns").length;
				},
				async content(event, trigger, player) {
					player.hs_jueze(["hs_TigersFury", "hs_ThickHide"], event.card);
				},
			},
			hs_Shadowform: {
				async content(event, trigger, player) {
					let hrsk = "心灵尖刺";
					if (player.heroskill.skill == "hs_hero_xljcam") hrsk = "心灵碎裂";
					player.HSF('changeHeroskill', [hrsk]);
				},
			},
			hs_Starfall: {
				sfilter(card, player) {
					return player.sctp("mns").length;
				},
				async content(event, trigger, player) {
					player.hs_jueze(["hs_Starlord", "hs_StellarDrift"], event.card);
				},
			},
			hs_PoweroftheWild: {
				async content(event, trigger, player) {
					player.hs_jueze(["hs_LeaderOfThePack", "hs_SummonAPanther"], event.card);
				},
			},
			hs_BestialWrath: {
				filterTarget(card, player, target) {
					return player.sctp("mine", target) && target.rkind == "wildbeast";
				},
				async content(event, trigger, player) {
					event.target.addvaluebuff(2, 1);
					event.target.addgjzbuff("mianyi", 1);
				},
				spellbuff: true,
			},
			hs_IceLance: {
				filterTarget: true,
				async content(event, trigger, player) {
					if (!event.target.hasgjz("dongjied")) event.target.addgjzbuff("dongjied");
					else event.target.hs_dmgrcv("damage", 4, "ice");
				},
			},
			hs_Silence: {
				filterTarget(card, player, target) {
					return target.isMin();
				},
				async content(event, trigger, player) {
					event.target.hs_silence();
				},
				ai: {
					result: {
						target(player, target) {
							if (target.triggers.deathRattle || target.classList.contains("guanghuan") || target.buff.length > 3) return -1;
							else return 0;
						},
					},
				},
			},
			hs_PowerOverwhelming: {
				filterTarget(card, player, target) {
					return target.isMin() && target.getLeader() == player;
				},
				async content(event, trigger, player) {
					event.target.addvaluebuff([4, 4]);
					event.target.addtriggerbuff(event.card);
				},
				spellbuff: true,
				delayeffect: {
					ending: {
						async effect(event, trigger, player) {
							event.fellow.HSF("cuihui");
						},
					},
				},
			},
			hs_TheCoin: {
				hs_token: true,
				cost: 0,
				rnature: "hs_neutral",
				async content(event, trigger, player) {
					player.HSF("gaintempmana");
				},
				ai: {
					result: {
						player(player) {
							if (player.HSF("manamax") < 3) return 0;
							const cs = player.getCards("h", ca => ((player.HSF("mana") + 1) == ca.cost()));
							return cs.length;
						},
					},
				},
			},
			hs_Innervate: {
				cost: 0,
				rnature: "hs_druid",
				async content(event, trigger, player) {
					player.HSF("gaintempmana", [2]);
				},
				ai: {
					result: {
						player(player) {
							if (player.HSF("manamax") < 3) return 0;
							const cs = player.getCards("h", ca => ((player.HSF("mana") + 2) == ca.cost()));
							return cs.length;
						},
					},
				},
			},
			hs_CircleOfHealing: {
				async content(event, trigger, player) {
					player.hs_dmgrcvaoe(4, player, event.card, "recover", player.sctp("mns"));
				},
			},
			hs_SavageRoar: {
				async content(event, trigger, player) {
					player.getFellowN(fl => {
						fl.addvaluebuff(2, 1);
					});
				},
			},
			hs_InnerFire: {
				filterTarget(card, player, target) {
					return target.isMin();
				},
				async content(event, trigger, player) {
					event.target.addvaluefinal(event.target.hp);
				},
			},
			hs_DivineSpirit: {
				filterTarget(card, player, target) {
					return target.isMin();
				},
				async content(event, trigger, player) {
					event.target.addvaluebuff([0, event.target.hp]);
				},
				spellbuff: true,
			},
			hs_MassDispel: {
				async content(event, trigger, player) {
					player.sctp("notmine", t => t.hs_silence());
					player.hs_drawDeck();
				},
			},
			hs_Equality: {
				async content(event, trigger, player) {
					player.sctp("mns").forEach(i => {
						i.addvaluefinal([0, 1]);
					});
				},
			},
			hs_Flare: {
				async content(event, trigger, player) {
					player.sctp("mns", t => t.removegjz("qianxing"));
					await player.getOppo().hs_cuihuisecret();
					await player.hs_drawDeck();
				},
			},
			hs_WildGrowth: {
				async content(event, trigger, player) {
					player.HSF("gainmana", [1, true]);
				},
			},
			hs_DeadlyPoison: {
				sfilter(card, player) {
					return player.data_weapon;
				},
				async content(event, trigger, player) {
					player.addwpbuff(2);
				},
			},
			hs_BladeFlurry: {
				sfilter(card, player) {
					return player.data_weapon;
				},
				async content(event, trigger, player) {
					const atk = player.data_weapon.ATK;
					player.data_weapon.HSF("cuihui");
					get.HSF("bladeeffect", ['opposide', atk, player]);
				},
			},
			hs_BlessingOfWisdom: {
				filterTarget(card, player, target) {
					return target.isMin();
				},
				async content(event, trigger, player) {
					event.target.addtriggerbuff(event.card);
				},
				delayeffect: {
					attackBegin: {
						fl: true,
						filter: "存活",
						async effect(event, trigger, player) {
							event.obj.relabuff.player.hs_drawDeck();
						},
					},
				},
			},
			hs_BlessedChampion: {
				filterTarget(card, player, target) {
					return target.isMin();
				},
				async content(event, trigger, player) {
					event.target.addvaluebuff(event.target.ATK);
				},
				spellbuff: true,
			},
			hs_CommandingShout: {
				async content(event, trigger, player) {
					await player.hs_drawDeck();
					player.addaurasbuff({
						name: "hs_mlnh",
						range(fellow, target) {
							return fellow.sctp("mine", target);
						},
						temp: 1,
					});
				},
			},
			hs_RockbiterWeapon: {
				filterTarget(card, player, target) {
					return player.sctp("myside", target);
				},
				async content(event, trigger, player) {
					event.target.addvaluebuff(3, 1);
				},
				ai: {
					result: {
						player(player, target) {
							const t = target;
							const bo = t.HSF("canatk") && game.hasPlayer(tg => {
								if (!t.HSF("canbetarget", [null, tg, "attack"])) return false;
								return tg.side != player.side;
							});
							if (bo) return target.ATK + 0.1;
							else return -1;
						},
					},
				},
			},
			hs_MindVision: {
				sfilter(card, player) {
					return player.getOppo().countCards("h");
				},
				async content(event, trigger, player) {
					player.hs_gain(player.getOppo().getCards("h").map(i => i.name).randomGet());
				},
			},
			hs_Swipe: {
				filterTarget(card, player, target) {
					return player.sctp("opposide", target);
				},
				async content(event, trigger, player) {
					player.hs_dmgrcvaoe(1, event.card, player, "damage", [event.target].concat(event.target.sctp("myside_").sort(lib.sort.attendseq)), [event.target, 4]).nosort = true;
				},
				spelldamage: 4,
			},
			hs_ConeOfCold: {
				filterTarget(card, player, target) {
					return player.sctp("mns", target);
				},
				async content(event, trigger, player) {
					const tgs = [event.target.leftseat, event.target.rightseat, event.target].filter(i => i);
					const next = player.hs_dmgrcvaoe(1, "ice", event.card, player, "damage", tgs);
					next.nosort = true;
					await next;
					tgs.filter(i => i.HSF("alive", [true])).forEach(i => i.addgjzbuff("dongjied"));
				},
				spelldamage: 1,
			},
			hs_ExplosiveShot: {
				filterTarget(card, player, target) {
					return player.sctp("mns", target);
				},
				async content(event, trigger, player) {
					const tgs = [event.target, event.target.leftseat, event.target.rightseat].filter(i => i);
					player.hs_dmgrcvaoe(2, "fire", event.card, player, "damage", tgs, [event.target, 5]).nosort = true;
				},
				spelldamage: 5,
			},
			hs_Upgrade: {
				async content(event, trigger, player) {
					if (player.data_weapon) player.data_weapon.addvaluebuff([1, 1]);
					else player.hs_weapon("重斧");
				},
			},
			hs_FarSight: {
				async content(event, trigger, player) {
					player.hs_drawDeck().onbuff = function(cs) {
						cs[0].addhsbuff({
							name: "hs_cost",
							type: "hs_cost",
							value: 3,
							creator: event.cards[0],
							fellow: player,
						});
					};
				},
			},
			hs_MindControl: {
				filterTarget(card, player, target) {
					return player.sctp("notmine", target);
				},
				async content(event, trigger, player) {
					event.target.toNTRed(player);
				},
				spelldestroy: true,
			},
			hs_ShadowMadness: {
				filterTarget(card, player, target) {
					return player.sctp("notmine", target) && target.ATK <= 3;
				},
				async content(event, trigger, player) {
					event.target.toNTRed(player, true);
				},
			},
			hs_Mindgames: {
				async content(event, trigger, player) {
					const cs = player.getOppo().cardPile.getCards("h", {
						type: "HS_minor"
					}).map(i => i.name);
					player.SSfellow(cs.randomGet() || "空无之影", undefined, undefined, ["复活"]);
				},
			},
			hs_SenseDemons: {
				async content(event, trigger, player) {
					player.hs_drawDeck2(c => get.rkind(c) == "demon", 2, "游荡小鬼");
				},
			},
			hs_Conceal: {
				async content(event, trigger, player) {
					player.countFellow(fl => {
						fl.addgjzbuff("qianxing", 1.1).countphase = player.getOppo();
					});
				},
			},
			hs_Betrayal: {
				filterTarget(c, p, t) {
					return p.sctp("notmine", t);
				},
				async content(event, trigger, player) {
					const tgs = event.target.sctp("neighbor_");
					if (event.target.ATK && tgs && tgs.length) player.hs_dmgrcvaoe("damage", event.target.ATK, event.target, tgs).nosort = true;
				},
			},
			hs_Preparation: {
				async content(event, trigger, player) {
					player.addcostbuff(3, c => get.type(c) == "HS_spell");
				},
			},
			hs_TotemicMight: {
				async content(event, trigger, player) {
					player.countFellow(fl => {
						if (fl.rkind == "totem") fl.addvaluebuff([0, 2]);
					});
				},
			},
			hs_Shadowflame: {
				filterTarget(c, p, t) {
					return p.sctp("mine", t);
				},
				async content(event, trigger, player) {
					await player.hs_dmgrcvaoe(player, event.card, event.target.ATK, player.sctp("notmine"));
					event.target.HSF("cuihui");
				},
			},
			hs_Corruption: {
				filterTarget(card, player, target) {
					return player.sctp("notmine", target);
				},
				async content(event, trigger, player) {
					event.target.addtriggerbuff({
						info: {
							beginning: {
								filter(evt, p, f) {
									return evt.player != f.getLeader();
								},
								async effect(event, trigger, player) {
									event.fellow.HSF("cuihui");
								},
							},
						},
					});
				},
				spelldamage: true,
			},
			hs_Shadowstep: {
				filterTarget(card, player, target) {
					return player.sctp("mine", target);
				},
				async content(event, trigger, player) {
					const {
						result
					} = await event.target.HSF("backtohand");
					if (result.cards?.length) {
						result.cards[0].addhsbuff({
							name: "hs_cost",
							type: "hs_cost",
							value: 2,
							creator: event.cards[0],
							fellow: player,
						});
					}
				},
			},
			hs_Sap: {
				filterTarget(card, player, target) {
					return player.sctp("notmine", target);
				},
				async content(event, trigger, player) {
					event.target.HSF("backtohand");
				},
			},
			hs_Vanish: {
				async content(event, trigger, player) {
					const pls = player.sctp("mns").sort(lib.sort.attendseq);
					pls.forEach(fl => {
						fl.HSF("backtohand");
					});
				},
			},
			hs_Dream: {
				filterTarget(card, player, target) {
					return player.sctp("mns", target);
				},
				async content(event, trigger, player) {
					event.target.HSF("backtohand");
				},
			},
			hs_Nightmare: {
				filterTarget(card, player, target) {
					return target.isMin();
				},
				async content(event, trigger, player) {
					event.target.addvaluebuff([5, 5]);
					const obj = event.target.addtriggerbuff(event.card);
					obj.value[0].srcp = player;
				},
				spellbuff: true,
				delayeffect: {
					beginning: {
						filter(evt, p, f, i) {
							if (i) return evt.player == i.srcp;
						},
						async effect(event, trigger, player) {
							event.fellow.HSF("cuihui");
						},
					},
				},
			},
			hs_YseraAwakens: {
				async content(event, trigger, player) {
					player.hs_dmgrcvaoe(player, event.card, 5, player.sctp("all").filter(i => get.translation(i.name) != "伊瑟拉"));
				},
				spelldamage: 5,
			},
			hs_SoulOfTheForest: {
				async content(event, trigger, player) {
					player.sctp("mine", fl => {
						fl.addtriggerbuff(event.card);
					});
				},
				delayeffect: {
					async deathRattle(event, trigger, player) {
						event.fellow.SSfellow("树人");
					},
				},
			},
			hs_Brawl: {
				sfilter(card, player) {
					return player.sctp("mns").length > 1;
				},
				async content(event, trigger, player) {
					if (player.sctp("mns").length < 2) return;
					const lucky = player.sctp('mns').randomGet();
					get.HSF('lavaeffect', ['cuihui', lucky.sctp('mns_'), 'lava']);
				},
			},
			hs_Demonfire: {
				filterTarget(card, player, target) {
					return target.isMin();
				},
				spelldamage: true,
				async content(event, trigger, player) {
					if (player.sctp("mine", event.target) && event.target.rkind == "demon") event.target.addvaluebuff([2, 2]);
					else event.target.hs_dmgrcv("damage", 2);
				},
			},
			hs_Wrath: {
				sfilter(card, player) {
					return player.sctp("mns").length;
				},
				async content(event, trigger, player) {
					player.hs_jueze(["hs_SolarWrath", "hs_NaturesWrath"], event.card);
				},
			},
			hs_AncientSecrets: {
				async content(event, trigger, player) {
					player.hs_dmgrcv("recover", 5);
				},
			},
			hs_Dispel: {
				filterTarget(card, player, target) {
					return target.isMin();
				},
				async content(event, trigger, player) {
					event.target.hs_silence();
				},
				ai: {
					result: {
						target(player, target) {
							if (target.triggers.deathRattle || target.classList.contains("guanghuan") || target.buff.length > 3) return -1;
							else return 0;
						},
					},
				},
			},
			hs_Nourish: {
				async content(event, trigger, player) {
					player.hs_jueze(["hs_RampantGrowth", "hs_Enrich"], event.card);
				},
			},
			hs_RampantGrowth: {
				async content(event, trigger, player) {
					player.HSF("gainmana", [2]);
				},
			},
			hs_DemigodsFavor: {
				async content(event, trigger, player) {
					event.fellow.sctp("mine_", fl => fl.addvaluebuff([2, 2]));
				},
			},
			hs_ShandosLesson: {
				async content(event, trigger, player) {
					event.fellow.SSfellow(["hs_Treant3_monster", 2]);
				},

			},
			hs_Uproot: {
				async content(event, trigger, player) {
					event.fellow.addvaluebuff(5);
				},
			},
			hs_Rooted: {
				async content(event, trigger, player) {
					event.fellow.addvaluebuff([0, 5]);
					event.fellow.addgjzbuff("chaofeng");
				},
			},
			hs_LightningStorm: {
				async content(event, trigger, player) {
					player.hs_dmgrcvNotaoe(player, event.card, player.sctp("notmine"), "thunder").set("num", () => get.rand(2, 3));
				},
				spelldamage: 2,
			},
			hs_Tracking: {
				sfilter(card, player) {
					return player.cardPile.countCards("h") >= 3;
				},
				async content(event, trigger, player) {
					const cs = player.cardPile.getCards("h");
					if (cs.length < 3) return;
					const {
						result
					} = await player.hs_discover().set("fixedres", cs.randomGets(3)).set("nogain", true);
					player.hs_drawDeck2(result.links);
				},
			},


			//法术新卡定位
		},
	},
	trap: {
		info: {
			//奥秘
			hs_IceBarrier: ["寒冰护体", "ordinary", "奥秘：当你的英雄受到攻击时，获得8点护甲值。", 3, "hs_mage"],
			hs_Counterspell: ["法术反制", "rare", "奥秘：当你的对手施放一个法术时，反制该法术。", 3, "hs_mage"],
			hs_Spellbender: ["扰咒术", "epic", "奥秘：当一个敌方法术以一个随从为目标时，召唤一个1/3的随从并使其成为新的目标。", 3, "hs_mage"],
			hs_Vaporize: ["蒸发", "rare", "奥秘：当一个随从攻击你的英雄，将其消灭。", 3, "hs_mage"],
			hs_MirrorEntity: ["镜像实体", "ordinary", "奥秘：当你的对手使用一张随从牌时，召唤一个该随从的复制。", 3, "hs_mage"],
			hs_IceBlock: ["寒冰屏障", "epic", "奥秘：当你的英雄将要承受致命伤害时，防止这些伤害，并使其在本回合中获得免疫。", 3, "hs_mage"],
			hs_Snipe: ["狙击", "ordinary", "奥秘：在你的对手使用一张随从牌后，对该随从造成2点伤害", 2, "hs_hunter"],
			hs_SnakeTrap: ["毒蛇陷阱", "ordinary", "奥秘：当你的随从受到攻击时，召唤三条1/1的蛇。", 2, "hs_hunter"],
			hs_ExplosiveTrap: ["爆炸陷阱", "ordinary", "奥秘：当你的英雄受到攻击，对所有敌人造成2点伤害。", 2, "hs_hunter"],
			hs_FreezingTrap: ["冰冻陷阱", "ordinary", "奥秘：当一个敌方随从攻击时，将其移回拥有者的手牌，并且法力值消耗增加（2）点。", 2, "hs_hunter"],
			hs_EyeForAnEye: ["以眼还眼", "ordinary", "奥秘：当你的英雄受到伤害时，对敌方英雄造成等量伤害。", 1, "hs_paladin"],
			hs_Repentance: ["忏悔", "ordinary", "奥秘： 在你的对手使用一张随从牌后，使该随从的生命值降为1。", 1, "hs_paladin"],
			hs_NobleSacrifice: ["崇高牺牲", "ordinary", "奥秘：当一个敌人攻击时，召唤一个2/1的防御者，并使其成为攻击的目标。", 1, "hs_paladin"],
			hs_Misdirection: ["误导", "rare", "奥秘：当一个敌人攻击你的英雄时，改为该敌人随机攻击另一个角色。", 2, "hs_hunter"],
			hs_Redemption: ["救赎", "ordinary", "奥秘：当一个友方随从死亡时，使其回到战场，并具有1点生命值。", 1, "hs_paladin"],


		},
		skill: {
			//奥秘定位
			hs_SnakeTrap: {
				secret: {
					attackBefore: {
						filter: "对方回合",
						filter2(evt, p, f) {
							return p.countFellow() < 7 && p.sctp("mine", evt.target);
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							player.SSfellow(["蛇", 3]);
						},
					},
				},
			},
			hs_Counterspell: {
				secret: {
					useCardBefore: {
						self: false,
						filter: "对方回合",
						filter2(evt, p, f) {
							return get.type(evt.card) == "HS_spell";
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							event.orievt.hs_fanzhied = true;
						},
					},
				},
			},
			hs_Snipe: {
				secret: {
					useCardAfter: {
						notlink: true,
						filter: "对方回合",
						filter2(evt, p, f) {
							return evt.player == p.getOppo() && get.type(evt.card) == "HS_minor" && evt.link && evt.link.HSF("alive") && !evt.link.hasgjz("mianyi");
						},
						randomRT(p, evt, f) {
							return evt.link;
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							event.target.hs_dmgrcv("damage", 4, player, event.card);
						},
					},
				},
			},
			hs_Spellbender: {
				secret: {
					useCardTo: {
						self: false,
						filter: "对方回合",
						filter2(evt, p, f) {
							return p.countFellow() < 7 && get.type(evt.card) == "HS_spell" && evt.target?.isMin();
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							const {
								result
							} = await player.SSfellow("扰咒师");
							const ntg = result.target;
							if (ntg) event.orievt.target = ntg;
						},
					},
				},
			},
			hs_IceBarrier: {
				secret: {
					attackBegin: {
						tg: true,
						filter: "对方回合",
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							player.changeHujia(8);
						},
					},
				},
			},
			hs_Vaporize: {
				secret: {
					attackBegin: {
						tg: true,
						filter: "对方回合",
						filter2(evt, p, f) {
							return evt.player.isMin() && evt.player.HSF("alive");
						},
						randomRT(p, evt, f) {
							return evt.player;
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							event.target.HSF("cuihui");
						},
					},
				},
			},
			hs_MirrorEntity: {
				secret: {
					useCardAfter: {
						notlink: true,
						filter: "对方回合",
						filter2(evt, p, f) {
							return p.sctp("mine").length < 7 && evt.player == p.getOppo() && get.type(evt.card) == "HS_minor" && evt.link;
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							player.SSfellow(event.evt.card.name, undefined, "落地", ["分裂"]).set("fellow", event.evt.link);
						},
					},
				},
			},
			hs_IceBlock: {
				secret: {
					hsdmgBegin2: {
						self: true,
						filter: "对方回合",
						filter2(evt, p, f) {
							return evt.num >= p.hp + p.hujia;
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							event.orievt.num = 0;
							player.addgjzbuff("mianyi", 1);
						},
					},
				},
			},
			hs_ExplosiveTrap: {
				secret: {
					attackBefore: {
						tg: true,
						filter: "对方回合",
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							await player.hs_dmgrcvaoe(2, player, event.card, "fire", player.sctp('opposide'));
						},
					},
				},
			},
			hs_FreezingTrap: {
				secret: {
					attackBefore: {
						filter: "对方回合",
						filter2(evt, p, f) {
							return evt.player.getLeader() == p.getOppo() && evt.player.isMin() && evt.player.HSF("alive");
						},
						randomRT(p, evt, f) {
							if (evt.player.HSF("alive")) return evt.player;
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							const {
								result
							} = await event.target.HSF("backtohand");
							if (result.cards?.length) {
								result.cards[0].addhsbuff({
									name: "hs_cost",
									type: "hs_cost",
									value: -2,
									fellow: player,
								});
							}
						},
					},
				},
			},
			hs_EyeForAnEye: {
				secret: {
					hsdmg: {
						self: true,
						filter: "对方回合",
						randomRT(p, evt, f) {
							return p.getOppo();
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							event.target.hs_dmgrcv(player, event.card, "damage", event.evt.num);
						},
					},
				},
			},
			hs_Repentance: {
				secret: {
					useCardAfter: {
						notlink: true,
						filter: "对方回合",
						filter2(evt, p, f) {
							const tg = p.getOppo().sctp("mine").filter(fl => fl.linkCard[0] == evt.cards[0])[0];
							return tg && tg.hp > 1 && evt.player == p.getOppo() && get.type(evt.card) == "HS_minor";
						},
						randomRT(p, evt, f) {
							return p.getOppo().sctp("mine").filter(fl => fl.linkCard[0] == evt.cards[0])[0];
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							event.target.addvaluefinal([0, 1]);
						},
					},
				},
			},
			hs_NobleSacrifice: {
				secret: {
					attackBefore: {
						filter: "对方回合",
						filter2(evt, p, f) {
							return p.countFellow() < 7 && evt.player.getLeader() == p.getOppo();
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							const {
								result
							} = await player.SSfellow("防御者");
							const ntg = result.target;
							if (ntg) event.orievt.victim = ntg;
						},
					},
				},
			},
			hs_Misdirection: {
				secret: {
					attackBefore: {
						tg: true,
						filter: "对方回合",
						filter2(evt, p, f) {
							return evt.player.getLeader() == p.getOppo() && evt.player.HSF("alive") && game.hasPlayer(tg => {
								return tg != evt.player && tg != p && tg.HSF("alive") && !tg.hasgjz("mianyi");
							});
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							const ntg = game.filterPlayer().remove(player).remove(event.evt.player).randomGet();
							if (ntg) {
								player.HSline(ntg, "green");
								event.orievt.victim = ntg;
							}
						},
					},
				},
			},
			hs_Redemption: {
				secret: {
					deathFL: {
						filter: "对方回合",
						filter2(evt, p) {
							return evt.link.getLeader() == p;
						},
						async effect(event, trigger, player) {
							event.obj.blink();
							event.obj.tuichang();
							player.hs_revive(event.evt.link.linkCard[0].name, 1);
						},
					},
				},
			},

		},
	},
	weapon: {
		info: {
			hs_WickedKnife: ["邪恶短刀", "essential", "", 1, "hs_rogue", 1, 2, ["token"]],
			hs_BattleAxe: ["战斧", "essential", "", 1, "hs_warrior", 2, 2, ["token"]],
			hs_LightsJustice: ["圣光的正义", "essential", "", 1, "hs_paladin", 1, 4],
			hs_PoisonedDagger: ["浸毒匕首", "essential", "", 1, "hs_rogue", 2, 2, ["token"]],
			hs_Ashbringer: ["灰烬使者", "essential", "", 5, "hs_paladin", 5, 3, ["token", "legend"]],
			hs_Doomhammer: ["毁灭之锤", "epic", "风怒，过载：（2）", 5, "hs_shaman", 2, 8],
			hs_StormforgedAxe: ["雷铸战斧", "ordinary", "过载：（1）", 2, "hs_shaman", 2, 3],
			hs_FieryWarAxe: ["炽炎战斧", "essential", "", 2, "hs_warrior", 3, 2],
			hs_AssassinsBlade: ["刺客之刃", "essential", "", 5, "hs_rogue", 3, 4],
			hs_ArcaniteReaper: ["奥金斧", "essential", "", 5, "hs_warrior", 5, 2],
			hs_EaglehornBow: ["鹰角弓", "rare", "每当一个友方奥秘被揭示时，便获得+1耐久度。", 3, "hs_hunter", 3, 2],
			hs_TruesilverChampion: ["真银圣剑", "essential", "每当你的英雄进攻，便为其恢复2点生命值。", 4, "hs_paladin", 4, 2],
			hs_SwordOfJustice: ["公正之剑", "epic", "在你召唤一个随从后，使其获得+1/+1，这把武器失去1点耐久度。", 3, "hs_paladin", 1, 5],
			hs_HeavyAxe: ["重斧", "essential", "", 1, "hs_warrior", 1, 3, ["token"]],
			hs_PerditionsBlade: ["毁灭之刃", "rare", "战吼：造成1点伤害。连击：改为造成2点伤害。", 3, "hs_rogue", 2, 2],
			hs_BloodFury: ["血怒", "legend", "", 3, "hs_warlock", 3, 8, ["token"]],
			hs_Gorehowl: ["血吼", "epic", "攻击随从不会消耗耐久度，改为降低1点攻击力。", 7, "hs_warrior", 7, 1],
			hs_GladiatorsLongbow: ["角斗士的长弓", "epic", "你的英雄在攻击时具有免疫。", 7, "hs_hunter", 5, 2],

		},
		skill: {
			hs_EaglehornBow: {
				weaponeffect: {
					secretBegin: {
						self: true,
						async effect(event, trigger, player) {
							event.fellow.addvaluebuff([0, 1]);
						},
					},
				},
			},
			hs_TruesilverChampion: {
				weaponeffect: {
					attackBegin: {
						self: true,
						async effect(event, trigger, player) {
							player.hs_dmgrcv("recover", 2);
						},
					},
				},
			},
			hs_SwordOfJustice: {
				weaponeffect: {
					summonAfter: {
						self: true,
						randomRT(p, evt) {
							return evt.link;
						},
						async effect(event, trigger, player) {
							event.target.addvaluebuff([1, 1]);
							await event.fellow.hs_dmgrcv(1);
						},
					},
				},
			},
			hs_PerditionsBlade: {
				weaponeffect: {
					active(p, c) {
						return p.hs_state.useCard > 0;
					},
					battleRoal: {
						filterTarget: true,
						aifamily: "damage",
						async effect(event, trigger, player) {
							event.target.hs_dmgrcv("damage", event.active ? 2 : 1);
						},
					},
				},
			},
			hs_Gorehowl: {
				weaponeffect: {
					attackBegin: {
						direct: true,
						filter(evt, p, f) {
							return evt.player == p && evt.target.isMin();
						},
						async effect(event, trigger, player) {
							const obj = player.data_weapon.addgjzbuff("wpmianyi");
							obj.temptri = "attack";
							get.HSF("checkfellow");
						},
					},
					attackEnd: {
						direct: true,
						filter(evt, p, f) {
							return evt.player == p && evt.target.isMin();
						},
						async effect(event, trigger, player) {
							player.data_weapon.addvaluebuff(-1);
						},
					},
				},
			},
			hs_GladiatorsLongbow: {
				weaponeffect: {
					hsdmgBegin2: {
						direct: true,
						self: true,
						filter2(evt, p, f) {
							return _status.hsbattling && _status.hs_xvlie.attacker == p;
						},
						async effect(event, trigger, player) {
							event.orievt.num = 0;
						},
					},
					attackBefore: {
						direct: true,
						filter(evt, p, f) {
							return evt.player == p;
						},
						async effect(event, trigger, player) {
							const obj = player.addgjzbuff("mianyi");
							obj.temptri = "attack";
							get.HSF("checkfellow");
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
	cdan: {
		小熊猫: "年轻的酒仙",
		冰箱: "寒冰屏障",
		北京龙: "诺兹多姆",
	}
};