import {
	lib,
	game,
	ui,
	get,
	ai,
	_status
} from "../../noname.js";
export const GVG = {
	name: "地精大战侏儒",
	en: "GVG",
	minor: {
		info: {
			"Annoy Tron": ["吵吵机器人", "ordinary", "嘲讽，圣盾", ["HS_effect", "2", "", "machine", "1", "2"]],
			"Snowchugger": ["碎雪机器人", "ordinary", "冻结任何受到该随从伤害的角色。", ["HS_effect", "2", "hs_mage", "machine", "2", "3"]],
			"Dr boom": ["砰砰博士", "legend", "战吼： 召唤两个1/1的砰砰机器人。警告：该机器人随时可能爆炸。", ["HS_effect", "7", "", "none", "7", "7"],
				["legend", "battleRoal:['砰砰机器人',2]"]
			],
			"Boom Bot": ["砰砰机器人", "essential", "亡语：随机对一个敌人造成1-4点伤害。", ["HS_effect", "1", "", "machine", "1", "1"],
				["tokened"]
			],
			"Piloted Shredder": ["载人收割机", "ordinary", "亡语：随机召唤一个法力值消耗为（2）的随从。", ["HS_effect", "4", "", "machine", "4", "3"]],
			"Piloted Sky Golem": ["载人飞天魔像", "epic", "亡语：随机召唤一个法力值消耗为（4）的随从。", ["HS_effect", "6", "", "machine", "6", "4"]],
			"Arcane Nullifier X21": ["施法者克星X-21", "rare", "嘲讽，无法成为法术或英雄技能的目标。", ["HS_effect", "4", "", "machine", "2", "5"]],
			"Jeeves": ["基维斯", "rare", "在每个玩家的回合结束时，该玩家抽若干牌，直至其手牌数量达到3张。", ["HS_effect", "4", "", "machine", "1", "4"]],
			"Force Tank Max": ["强袭坦克", "ordinary", "圣盾", ["HS_effect", "8", "", "machine", "7", "7"]],
			"Target Dummy": ["活动假人", "rare", "嘲讽", ["HS_effect", "0", "", "machine", "0", "2"]],
			"Spider Tank": ["蜘蛛坦克", "ordinary", "“我想在这家伙上面装上一门炮，你觉得怎么样?”菲兹布里兹看着蜘蛛运输装置说道。", ["HS_normal", "3", "", "machine", "3", "4"]],
			"Explosive Sheep": ["自爆绵羊", "ordinary", "亡语：对所有随从造成2点伤害。", ["HS_effect", "2", "", "machine", "1", "1"]],
			"Harvest Golem": ["麦田傀儡", "ordinary", "亡语：召唤一个2/1的损坏的傀儡。", ["HS_effect", "3", "", "machine", "2", "3"],
				["deathRattle:损坏的傀儡"]
			],
			"Damaged Golem": ["损坏的傀儡", "essential", "", ["HS_normal", "1", "", "machine", "2", "1"],
				["token"]
			],
			"Flying Machine": ["飞行器", "ordinary", "风怒", ["HS_effect", "3", "", "machine", "1", "4"]],
			"Antique Healbot": ["老式治疗机器人", "ordinary", "战吼：为你的英雄恢复8点生命值。", ["HS_effect", "5", "", "machine", "3", "3"]],
			"Mechwarper": ["机械跃迁者", "ordinary", "你的机械的法力值消耗减少（1）点。", ["HS_effect", "2", "", "machine", "2", "3"]],
			"Cogmaster": ["齿轮大师", "ordinary", "如果你控制任何机械，便获得+2攻击力。", ["HS_effect", "1", "", "none", "1", "2"]],
			"Shielded Minibot": ["护盾机器人", "ordinary", "圣盾", ["HS_effect", "2", "hs_paladin", "machine", "2", "2"]],
			"Soot Spewer": ["煤烟喷吐装置", "rare", "法术伤害+1", ["HS_effect", "3", "hs_mage", "machine", "3", "3"]],
			"Junkbot": ["回收机器人", "epic", "每当一个友方机械死亡，便获得+2/+2。", ["HS_effect", "5", "", "machine", "1", "5"]],
			"Mimirons Head": ["米米尔隆的头部", "legend", "在你的回合开始时，如果你控制至少三个机械，则消灭这些机械，并将其组合成V-07-TR-0N。", ["HS_effect", "5", "", "machine", "4", "5"],
				["legend"]
			],
			"V-07-TR-0N": ["V-07-TR-0N", "legend", "冲锋，超级风怒", ["HS_effect", "8", "", "machine", "4", "8"],
				["tokened"]
			],
			"Whirling Zap-o-matic": ["自动漩涡打击装置", "ordinary", "风怒", ["HS_effect", "2", "hs_shaman", "machine", "3", "2"]],
			"Cobalt Guardian": ["钴制卫士", "rare", "每当你召唤一个机械，便获得圣盾。", ["HS_effect", "5", "hs_paladin", "machine", "6", "3"]],
			"Micro Machine": ["微型战斗机甲", "ordinary", "在每个回合开始时，获得+1攻击力。", ["HS_effect", "2", "", "machine", "1", "2"]],
			"Fel Reaver": ["魔能机甲", "epic", "每当你的对手使用一张卡牌时，便移除你的牌库顶的三张牌。", ["HS_effect", "5", "", "machine", "8", "8"]],
			"Foe Reaper 4000": ["死神4000型", "legend", "同时对其攻击目标相邻的随从造成伤害。", ["HS_effect", "8", "", "machine", "6", "9"]],
			"Upgraded Repair Bot": ["高级修理机器人", "rare", "战吼：使一个友方机械获得+4生命值。", ["HS_effect", "5", "hs_priest", "machine", "5", "5"],
				["rareEff", "battleRoal:fltbuff>mine_,machine：H4"]
			],
			"Flame Leviathan": ["烈焰巨兽", "legend", "当你抽到该牌时，对所有角色造成2点伤害。", ["HS_effect", "7", "hs_mage", "machine", "7", "7"],
				["addhand:get.HSF('lavaeffect',['all',2,'lava',player]);"]
			],
			"Sneeds Old Shredder": ["斯尼德的伐木机", "legend", "亡语：随机召唤一个传说随从。", ["HS_effect", "8", "", "machine", "5", "7"],
				["legend", "deathRattle:['range:传说']"]
			],
			"Clockwork Giant": ["发条巨人", "epic", "你的对手每有一张手牌，该牌的法力值消耗便减少（1）点。", ["HS_effect", "12", "", "machine", "8", "8"],
				["changecost:return p.getOppo().countCards('h');"]
			],
			"Enhance O Mechano": ["强化机器人", "epic", "战吼：随机使你的其他随从分别获得风怒，嘲讽，或者圣盾效果中的一种。", ["HS_effect", "4", "", "machine", "3", "2"]],
			"Iron Juggernaut": ["钢铁战蝎", "legend", "战吼：将一张“地雷” 牌洗入你对手的牌库。当抽到“地雷”时，便会受到10点伤害。", ["HS_effect", "6", "hs_warrior", "machine", "6", "5"]],
			"Wee Spellstopper": ["小个子扰咒师", "epic", "相邻的随从无法成为法术或英雄技能的目标。", ["HS_effect", "4", "hs_mage", "none", "2", "5"]],
			"Imp2": ["小鬼", "essential", "", ["HS_normal", "1", "hs_warlock", "demon", "1", "1"],
				["tokened", "nosearch"]
			],
			"Queen of Pain": ["痛苦女王", "rare", "吸血", ["HS_effect", "2", "hs_warlock", "demon", "1", "4"]],
			"Mogor the Ogre": ["食人魔勇士穆戈尔", "legend", "所有随从有50%几率攻击错误的敌人。", ["HS_effect", "6", "", "none", "7", "6"]],
			"Mini-Mage": ["小个子法师", "epic", "潜行，法术伤害+1", ["HS_effect", "3", "", "none", "3", "1"]],
			"Bomb Lobber": ["榴弹投手", "rare", "战吼：随机对一个敌方随从造成4点伤害。", ["HS_effect", "5", "", "none", "3", "3"]],
			"Recombobulator": ["侏儒变形师", "epic", "战吼： 将一个友方随从随机变形成为一个法力值消耗相同的随从。", ["HS_effect", "2", "", "none", "3", "2"]],
			"Gnomeregan Infantry": ["诺莫瑞根步兵", "ordinary", "冲锋，嘲讽", ["HS_effect", "3", "", "none", "1", "4"]],
			"Madder Bomber": ["疯狂爆破者", "rare", "战吼：造成6点伤害，随机分配到所有其他角色身上。", ["HS_effect", "5", "", "none", "5", "4"]],
			"Dunemaul Shaman": ["砂槌萨满祭司", "rare", "风怒，过载：（1），50%几率攻击错误的敌人。", ["HS_effect", "4", "hs_shaman", "none", "5", "4"]],
			"Ogre Brute": ["食人魔步兵", "ordinary", "50%几率攻击错误的敌人。", ["HS_effect", "3", "", "none", "4", "4"]],
			"Gilblin Stalker": ["海地精猎手", "ordinary", "潜行", ["HS_effect", "2", "", "none", "2", "3"]],
			"Ogre Ninja": ["食人魔忍者", "rare", "潜行，50%几率攻击错误的敌人。", ["HS_effect", "5", "hs_rogue", "none", "6", "6"]],
			"Shieldmaiden": ["盾甲侍女", "rare", "战吼：获得5点护甲值。", ["HS_effect", "6", "hs_warrior", "none", "5", "5"]],
			"Gahzrilla": ["加兹瑞拉", "legend", "每当该随从受到伤害，便使其攻击力翻倍。", ["HS_effect", "7", "hs_hunter", "wildbeast", "6", "9"]],
			"Vitality Totem": ["活力图腾", "rare", "在你的回合结束时，为你的英雄恢复4点生命值。", ["HS_effect", "2", "hs_shaman", "totem", "0", "3"]],
			"Shrinkmeister": ["缩小射线工程师", "ordinary", "战吼：在本回合中，使一个随从获得-2攻击力。", ["HS_effect", "2", "hs_priest", "none", "3", "2"]],
			"One-eyed Cheat": ["独眼欺诈者", "rare", "每当你召唤一个海盗，便获得潜行。", ["HS_effect", "2", "hs_rogue", "pirate", "4", "1"]],
			"Mal Ganis": ["玛尔加尼斯", "legend", "你的其他恶魔获得+2/+2。你的英雄获得免疫。", ["HS_effect", "9", "hs_warlock", "demon", "9", "7"]],
			"Blingtron 3000": ["布林顿3000型", "legend", "战吼：为每个玩家装备一把武器。", ["HS_effect", "5", "", "machine", "3", "4"]],
			"Puddlestomper": ["淤泥践踏者", "ordinary", "他非常崇拜伟大的鱼人先知摩戈尔！（哪个鱼人不是呢？）", ["HS_normal", "2", "", "murloc", "3", "2"]],
			"Malorne": ["玛洛恩", "legend", "亡语：将该随从洗入你的牌库。", ["HS_effect", "7", "hs_druid", "wildbeast", "9", "7"]],
			"Druid of the Fang": ["尖牙德鲁伊", "ordinary", "战吼：如果你控制任何野兽，将该随从变形成为7/7。", ["HS_effect", "5", "hs_druid", "none", "4", "4"],
				["rareEff"]
			],
			"Druid of the Fang2": ["尖牙德鲁伊", "essential", "", ["HS_normal", "5", "hs_druid", "wildbeast", "7", "7"],
				["token", "nosearch"]
			],
			"Clockwork Gnome": ["发条侏儒", "ordinary", "亡语：将一张零件牌置入你的手牌。", ["HS_effect", "1", "", "machine", "2", "1"],
				["deathRattle:rangain>零件"]
			],
			"Tinkertown Technician": ["工匠镇技师", "ordinary", "战吼：如果你控制一个机械，便获得+1/+1并将一张零件牌置入你的手牌。", ["HS_effect", "3", "", "none", "3", "3"],
				["rareEff"]
			],
			"Goblin Blastmage": ["地精炎术师", "rare", "战吼：如果你控制任何机械，则造成4点伤害，随机分配到所有敌人身上。", ["HS_effect", "4", "hs_mage", "none", "5", "4"],
				["rareEff"]
			],
			"Toshley": ["托什雷", "legend", "战吼，亡语：将一张零件牌置入你的手牌。", ["HS_effect", "6", "", "none", "5", "7"],
				["battleRoal:rangain>零件", "deathRattle:rangain>零件"]
			],
			"Mech-Bear-Cat": ["机械野兽", "rare", "每当该随从受到伤害，将一张零件牌置入你的手牌。", ["HS_effect", "6", "hs_druid", "machine", "7", "6"],
				["受伤:rangain>零件"]
			],
			"Shadowboxer": ["暗影打击装甲", "rare", "每当一个角色获得治疗，便随机对一个敌人造成1点伤害。", ["HS_effect", "2", "hs_priest", "machine", "2", "3"]],
			"Shadowbomber": ["暗影投弹手", "epic", "战吼：对每个英雄造成3点伤害。", ["HS_effect", "1", "hs_priest", "none", "2", "1"]],
			"Mechanical Yeti": ["机械雪人", "ordinary", "亡语：使每个玩家获得一张零件牌。", ["HS_effect", "4", "", "machine", "4", "5"]],
			"Voljin": ["沃金", "legend", "战吼：与另一个随从交换生命值。", ["HS_effect", "5", "hs_priest", "none", "6", "2"]],
			"King of Beasts": ["百兽之王", "rare", "嘲讽，战吼：你每控制一个其他野兽，便获得+1攻击力。", ["HS_effect", "5", "hs_hunter", "wildbeast", "2", "6"]],
			"Mekgineer Thermaplugg": ["瑟玛普拉格", "legend", "每当一个敌方随从死亡，召唤一个麻风侏儒。", ["HS_effect", "9", "", "machine", "9", "7"]],
			"Trade Prince Gallywix": ["加里维克斯", "legend", "每当你的对手施放一个法术，获得该法术的复制，并使其获得一个幸运币。", ["HS_effect", "6", "hs_rogue", "none", "5", "8"]],
			"Quartermaster": ["军需官", "epic", "战吼：使你的白银之手新兵获得+2/+2。", ["HS_effect", "5", "hs_paladin", "none", "2", "5"],
				["rareEff"]
			],
			"Goblin Auto-Barber": ["地精自动理发装置", "ordinary", "战吼：使你的武器获得+1攻击力。", ["HS_effect", "2", "hs_rogue", "machine", "3", "2"]],
			"Iron Sensei": ["钢铁武道家", "rare", "在你的回合结束时，使另一个友方机械获得+2/+2。", ["HS_effect", "3", "hs_rogue", "machine", "2", "2"]],
			"Grove Tender": ["林地树妖", "rare", "抉择：使每个玩家获得一个法力水晶；或每个玩家抽一张牌。", ["HS_effect", "3", "hs_druid", "none", "2", "4"]],
			"Steamwheedle Sniper": ["热砂港狙击手", "epic", "你的英雄技能能够以随从为目标。", ["HS_effect", "2", "hs_hunter", "none", "2", "3"]],
			"Ships Cannon": ["船载火炮", "ordinary", "在你召唤一个海盗后，随机对一个敌人造成2点伤害。", ["HS_effect", "2", "", "machine", "2", "3"]],
			"Floating Watcher": ["漂浮观察者", "ordinary", "每当你的英雄在你的回合受到伤害，便获得+2/+2。", ["HS_effect", "5", "hs_warlock", "demon", "4", "4"]],
			"Anima Golem": ["心能魔像", "epic", "在每个回合结束时，如果该随从是你唯一的随从，则消灭该随从。", ["HS_effect", "6", "hs_warlock", "machine", "9", "9"]],
			"Scarlet Purifier": ["血色净化者", "rare", "战吼： 对所有具有亡语的随从造成2点伤害。", ["HS_effect", "3", "hs_paladin", "none", "4", "3"],
				["rareEff"]
			],
			"Lost Tallstrider": ["迷失的陆行鸟", "ordinary", "在它的屁股上印着这样一串文字：“如果你找到它，请将它归还至莫高雷。”", ["HS_normal", "4", "", "wildbeast", "5", "4"]],
			"Anodized Robo Cub": ["电镀机械熊仔", "ordinary", "嘲讽，抉择：+1攻击力；或者+1生命值。", ["HS_effect", "2", "hs_druid", "machine", "2", "2"]],
			"Lil Exorcist": ["小个子驱魔者", "rare", "嘲讽，战吼：每有一个会具有亡语的敌方随从，便获得+1/+1。", ["HS_effect", "3", "", "none", "2", "3"],
				["rareEff"]
			],
			"Warbot": ["战斗机器人", "ordinary", "激怒：+1攻击力。", ["HS_effect", "1", "hs_warrior", "machine", "1", "3"]],
			"Screwjank Clunker": ["废旧螺栓机甲", "rare", "战吼：使一个友方机械获得+2/+2。", ["HS_effect", "4", "hs_warrior", "machine", "2", "5"],
				["rareEff", "battleRoal:fltbuff>mine,machine：22"]
			],
			"Metaltooth Leaper": ["金刚刃牙兽", "rare", "战吼：使你的其他机械获得+2攻击力。", ["HS_effect", "3", "hs_hunter", "wildbeast", "3", "3"],
				["rareEff"]
			],
			"Siege Engine": ["重型攻城战车", "rare", "每当你获得护甲，该随从便获得 +1攻击力。", ["HS_effect", "5", "hs_warrior", "machine", "5", "5"]],
			"Stonesplinter Trogg": ["碎石穴居人", "ordinary", "每当你的对手施放一个法术，便获得+1攻击力。", ["HS_effect", "2", "", "none", "2", "3"]],
			"Burly Rockjaw Trogg": ["石腭穴居人壮汉", "ordinary", "每当你的对手施放一个法术，获得+2攻击力。", ["HS_effect", "4", "", "none", "3", "5"]],
			"Troggzor the Earthinator": ["颤地者特罗格佐尔", "legend", "每当你的对手施放一个法术，召唤一个石腭穴居人壮汉。", ["HS_effect", "7", "", "none", "6", "6"],
				["legend"]
			],
			"Goblin Sapper": ["地精工兵", "rare", "如果你对手的手牌数量大于或等于6张，便具有+4攻击力。", ["HS_effect", "3", "", "none", "2", "4"]],
			"Illuminator": ["明光祭司", "rare", "如果在你的回合结束时，你控制一个奥秘，则为你的英雄恢复4点生命值。", ["HS_effect", "3", "", "none", "2", "4"]],
			"Gazlowe": ["加兹鲁维", "legend", "每当你施放一个法力值消耗为（1）的法术，随机将一张机械牌置入你的手牌。", ["HS_effect", "6", "", "none", "3", "6"],
				["legend"]
			],
			"Hobgoblin": ["大胖", "epic", "每当你使用一张攻击力为1的随从牌，便使其获得+2/+2。", ["HS_effect", "3", "", "none", "2", "3"]],
			"Gnomish Experimenter": ["侏儒实验技师", "rare", "战吼：抽一张牌，如果该牌是随从牌，则将其变形成为一只小鸡。", ["HS_effect", "3", "", "none", "3", "2"]],
			"Chicken": ["小鸡", "essential", "", ["HS_effect", "1", "", "wildbeast", "1", "1"],
				["tokened"]
			],
			"Kezan Mystic": ["科赞秘术师", "rare", "战吼：随机获得一个敌方奥秘的控制权。", ["HS_effect", "4", "", "none", "4", "3"],
				["rareEff"]
			],
			"Siltfin Spiritwalker": ["沙鳞灵魂行者", "epic", "每当有其他友方鱼人死亡，便抽一张牌。 过载：（1）", ["HS_effect", "4", "hs_shaman", "murloc", "2", "5"]],
			"Fel Cannon": ["邪能火炮", "rare", "	在你的回合结束时，对一个非机械随从造成2点伤害。", ["HS_effect", "4", "hs_warlock", "machine", "3", "5"]],
			"Hemet Nesingwary": ["赫米特·奈辛瓦里", "legend", "战吼：消灭一个野兽。", ["HS_effect", "5", "", "none", "6", "3"],
				["legend", "rareEff"]
			],
			/*还没写*/
			"Bolvar Fordragon": ["伯瓦尔·弗塔根", "legend", "如果这张牌在你的手牌中，每当一个友方随从死亡，便获得+1攻击力。", ["HS_effect", "5", "hs_paladin", "none", "1", "7"],
				["legend"]
			]
		},
		skill: {
			hs_HemetNesingwary: {
				battleRoal: {
					filterTarget(card, player, target) {
						return target.isMin() && target.rkind == "wildbeast";
					},
					aifamily: "damage",
					async effect(event, trigger, player) {
						event.target.HSF("cuihui");
					},
				},
			},
			hs_KezanMystic: {
				battleRoal: {
					filter(player) {
						return player.getOppo().secrets.length;
					},
					async effect(event, trigger, player) {
						player.hs_ntrsecret(player.getOppo().secrets.randomGets(1));
					},
				},
			},
			hs_SiltfinSpiritwalker: {
				deathFL: {
					filter(event, player, fellow) {
						return event.link.getLeader() == player && event.link.rkind == "murloc";
					},
					async effect(event, trigger, player) {
						player.hs_drawDeck();
					},
				},
			},
			hs_FelCannon: {
				ending: {
					self: true,
					randomRT(player) {
						return player.sctp("mns").filter(fl => fl.rkind != "machine" && fl.canhsdmg()).randomGet();
					},
					async effect(event, trigger, player) {
						event.target.hs_dmgrcv("damage", 2, event.fellow);
					},
				},
			},
			"hs_FloatingWatcher": {
				hsdmg: {
					self: true,
					filter(evt, p, f) {
						return _status.currentPhase == p;
					},
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff([2, 2]);
					},
				},
			},
			hs_GnomishExperimenter: {
				async battleRoal(event, trigger, player) {
					const {
						result
					} = await player.hs_drawDeck();
					if (result.cards?.length > 0 && get.type(result.cards[0]) == "HS_minor") {
						const card = result.cards[0];
						card.name = "hs_Chicken_monster";
						get.chsinit(card);
					}
				},
			},
			hs_Hobgoblin: {
				useCard: {
					self: true,
					notlink: true,
					filter(evt, p, f) {
						return get.type(evt.card) == "HS_minor" && get.info(evt.card)?.ATK == 1;
					},
					randomRT(player, evt) {
						return evt.link;
					},
					async effect(event, trigger, player) {
						event.evt.link.addvaluebuff([2, 2]);
					},
				},
			},
			hs_GoblinSapper: {
				numgh: {
					name: "value",
					value: [4, 0],
					range(fellow, target) {
						return target == fellow;
					},
					ghfilter(card, fellow, target) {
						return fellow.getOppo2().countCards('h') >= 6;
					},
				},
			},
			hs_Illuminator: {
				ending: {
					filter(evt, p, f) {
						return p.secrets.length;
					},
					recheck: "filter",
					async effect(event, trigger, player) {
						player.hs_dmgrcv("recover", event.fellow, 4);
					},
				},
			},
			hs_Gazlowe: {
				useCard: {
					self: true,
					filter: "法术",
					filter2(evt, p, f) {
						return evt.usingcost == 1;
					},
					async effect(event, trigger, player) {
						player.hs_gain(get.hskachi('HS_minor', get.hsflt("机械")).randomGet());
					},
				},
			},
			hs_StonesplinterTrogg: {
				useCard: {
					self: false,
					filter: "法术",
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff(1);
					},
				},
			},
			hs_BurlyRockjawTrogg: {
				useCard: {
					self: false,
					filter: "法术",
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff(2);
					},
				},
			},
			hs_TroggzorTheEarthinator: {
				useCard: {
					self: false,
					filter: "法术",
					async effect(event, trigger, player) {
						event.fellow.SSfellow("石腭穴居人壮汉");
					},
				},
			},
			hs_MetaltoothLeaper: {
				battleRoal: {
					filter(player) {
						return player.sctp("mine", fl => fl.rkind == "machine");
					},
					async effect(event, trigger, player) {
						event.fellow.sctp("mine_", fl => {
							if (fl.rkind == "machine") fl.addvaluebuff(2);
						});
					},
				},
			},
			hs_SiegeEngine: {
				changeHujia: {
					filter(evt, p, f) {
						return evt.num > 0;
					},
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff(1);
					},
				},
			},
			hs_SteamwheedleSniper: {
				numgh: {
					name: "hrsktarget",
					ghfilter(p, f) {
						return p.heroskill.skill.indexOf("_shej") > 0;
					},
					range(fellow, target) {
						return target == fellow.getLeader();
					},
				},
			},
			"hs_ShipsCannon": {
				summonAfter: {
					self: true,
					notlink: true,
					filter(evt, player, fellow) {
						return evt.link.rkind == "pirate";
					},
					randomRT(player) {
						return player.sctp("opposide").filter(fl => fl.canhsdmg()).randomGet();
					},
					async effect(event, trigger, player) {
						event.target.hs_dmgrcv("damage", 2, event.fellow);
					},
				},
			},
			"hs_AnimaGolem": {
				ending: {
					filter(evt, p, f) {
						return p.sctp("mine").length == 1;
					},
					async effect(event, trigger, player) {
						event.fellow.HSF("cuihui");
					},
				},
			},
			hs_ScarletPurifier: {
				battleRoal: {
					filter(player) {
						return player.sctp("mns", f => f.HSF("alive") && f.classList.contains("wangyu"));
					},
					recheck: "filter",
					async effect(event, trigger, player) {
						event.fellow.hs_dmgrcvNotaoe(event.fellow, player.sctp("mns"), 2, (p, f) => f.HSF("alive") && f.classList.contains("wangyu")).line = true;
					},
				},
			},
			hs_AnodizedRoboCub: {
				jueze: ["hs_AttackMode", "hs_TankMode"],
			},
			hs_LilExorcist: {
				battleRoal: {
					filter(player) {
						return player.sctp("notmine", fl => fl.classList.contains("wangyu"));
					},
					async effect(event, trigger, player) {
						const num = player.sctp("notmine", fl => fl.classList.contains("wangyu"), true).length;
						if (num > 0) event.fellow.updateSelfBuff([num, num]);
					},
				},
			},
			//旧卡
			"hs_BoomBot": {
				deathRattle: {
					randomRT(player) {
						return player.HSF("randmgfil");
					},
					async effect(event, trigger, player) {
						event.target.hs_dmgrcv("damage", get.rand(1, 4), event.fellow);
					},
				},
			},

			"hs_Jeeves": {
				ending: {
					async effect(event, trigger, player) {
						const num = 3 - event.evt.player.countCards("h");
						if (num > 0) event.evt.player.hs_drawDeck(num);
					},
				},
			},
			"hs_Mechwarper": {
				numgh: {
					name: "hs_cost",
					value: 1,
					ghfilter(card, fellow, target) {
						return target == fellow.getLeader() && get.rkind(card) == "machine";
					},
				},
			},
			"hs_Cogmaster": {
				numgh: {
					name: "value",
					value: [2, 0],
					range(fellow, target) {
						return target == fellow;
					},
					ghfilter(card, fellow, target) {
						return fellow.sctp("mine", fl => fl.rkind == "machine");
					},
				},
			},
			"hs_Junkbot": {
				deathFL: {
					filter(event, player, fellow) {
						return event.link.getLeader() == player && event.link.rkind == "machine";
					},
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff([2, 2]);
					},
				},
			},
			"hs_MimironsHead": {
				beginning: {
					self: true,
					filter(evt, player) {
						return player.countFellow(fl => fl.rkind == "machine") >= 3;
					},
					recheck: "filter",
					async effect(event, trigger, player) {
						await get.HSF("cuihui", [player.filterFellow(fl => fl.rkind == "machine"), true]);
						await event.fellow.SSfellow("飞机");
					},
				},
			},
			"hs_CobaltGuardian": {
				summonBefore: {
					notlink: true,
					self: true,
					filter(evt) {
						return evt.link.rkind == "machine";
					},
					async effect(event, trigger, player) {
						event.fellow.addgjzbuff("shengdun");
					},
				},
			},
			"hs_FelReaver": {
				useCard: {
					filter(evt, p) {
						return evt.player == p.getOppo();
					},
					async effect(event, trigger, player) {
						player.hs_shaohui(3);
					},
				},
			},
			"hs_EnhanceOMechano": {
				battleRoal: {
					async effect(event, trigger, player) {
						event.fellow.sctp("mine_", i => {
							i.addgjzbuff(["fengnu", "chaofeng", "shengdun"].randomGet());
						});
					},
				},
			},
			"hs_IronJuggernaut": {
				async battleRoal(event, trigger, player) {
					player.getOppo().HSF("addtodeck", ["地雷"]);
				},
			},
			"hs_WeeSpellstopper": {
				numgh: {
					name: "ability",
					value: ["momian"],
					range(fellow, target) {
						return fellow.sctp("neighbor", target);
					},
				},
			},
			"hs_MogorTheOgre": {
				attackBefore: {
					half: true,
					filter(evt, p, f) {
						return evt.player.isMin() && evt.player.sctp("opposide").length >= 2;
					},
					recheck: "filter",
					async effect(event, trigger, player) {
						const ntg = event.evt.player.sctp("opposide").filter(i => i != event.evt.target).randomGet();
						event.orievt.victim = ntg;
						event.orievt.triedeff.add(event.obj);
					},
				},
			},
			"hs_Recombobulator": {
				battleRoal: {
					filterTarget(card, player, target) {
						return player.sctp("mine", target);
					},
					async effect(event, trigger, player) {
						const cost = event.target.linkCard[0].cost();
						const name = get.hskachi("HS_minor", (c, info) => info.cost == cost).randomGet() || event.target.linkCard[0].name;
						event.target.HSF("convert", [name]);
					},
				},
			},
			"hs_Shieldmaiden": {
				async battleRoal(event, trigger, player) {
					player.hs_atkhj([0, 5]);
				},
			},
			"hs_Gahzrilla": {
				hsdmg: {
					fl: true,
					async effect(event, trigger, player) {
						event.fellow.updateSelfBuff(event.fellow.ATK);
					},
				},
			},
			"hs_Shrinkmeister": {
				battleRoal: {
					filterTarget(card, player, target) {
						return player.sctp("mns", target);
					},
					aifamily: "damage",
					async effect(event, trigger, player) {
						event.target.addvaluebuff(-2, 1);
					},
				},
			},
			"hs_One-eyedCheat": {
				summonSucc: {
					self: true,
					notlink: true,
					filter(evt, player, fellow) {
						return get.rkind(evt.card) == "pirate";
					},
					async effect(event, trigger, player) {
						event.fellow.addgjzbuff("qianxing");
					},
				},
			},
			"hs_MalGanis": {
				numgh: {
					auras: [{
						name: "value",
						value: [2, 2],
						range(fellow, target) {
							return target.rkind == "demon" && fellow.sctp("mine_", target);
						},
					}, {
						name: "ability",
						value: ["mianyi"],
						range(fellow, target) {
							return target == fellow.getLeader();
						},
					}],
				},
			},
			"hs_Blingtron3000": {
				async battleRoal(event, trigger, player) {
					player.sctp("main", p => {
						p.hs_weapon(get.hskachi("HS_weapon").randomGet());
					});
				},
			},
			"hs_Malorne": {
				async deathRattle(event, trigger, player) {
					event.fellow.HSF("backtodeck");
				},
			},
			"hs_DruidOfTheFang": {
				battleRoal: {
					filter(p) {
						return p.hasFellow(fl => fl.rkind == "wildbeast");
					},
					async effect(event, trigger, player) {
						event.fellow.HSF("convert", ["hs_DruidOfTheFang2_monster"]);
					},
				},
			},
			"hs_TinkertownTechnician": {
				battleRoal: {
					filter: "机械",
					async effect(event, trigger, player) {
						event.fellow.addvaluebuff([1, 1]);
						const f = get.hsflt("零件", "all");
						player.hs_gain(get.hskachi("all", f, true).randomGet());
					},
				},
			},
			"hs_GoblinBlastmage": {
				battleRoal: {
					filter: "机械",
					async effect(event, trigger, player) {
						event.fellow.hs_Missiles(4);
					},
				},
			},
			"hs_MechanicalYeti": {
				async deathRattle(event, trigger, player) {
					const f = get.hsflt("零件", "all");
					player.sctp("main", t => {
						event.fellow.HSline(t, "green");
						t.hs_gain(get.hskachi("all", f, true).randomGet());
					});
				},
			},
			"hs_Voljin": {
				battleRoal: {
					filterTarget(card, player, target) {
						return player.sctp("mns", target);
					},
					async effect(event, trigger, player) {
						const hp1 = event.target.hp;
						const hp2 = event.fellow.hp;
						event.target.addvaluefinal([0, hp2]);
						event.fellow.addvaluefinal([0, hp1]);
					},
				},
			},
			"hs_KingOfBeasts": {
				async battleRoal(event, trigger, player) {
					const num = event.fellow.sctp("mine_").filter(fl => fl.rkind == "wildbeast").length;
					if (num > 0) event.fellow.addvaluebuff(num);
				},
			},
			"hs_MekgineerThermaplugg": {
				deathFL: {
					filter(evt, p) {
						return evt.link.getLeader() == p.getOppo();
					},
					async effect(event, trigger, player) {
						event.fellow.SSfellow("麻风侏儒");
					},
				},
			},
			"hs_TradePrinceGallywix": {
				useCard: {
					self: false,
					filter: "法术",
					filter2(evt) {
						return evt.card.name != "hs_GallywixsCoin";
					},
					async effect(event, trigger, player) {
						player.hs_gain(event.evt.card.name);
						event.evt.player.hs_gain("hs_GallywixsCoin");
					},
				},
			},
			"hs_Quartermaster": {
				battleRoal: {
					filter(player) {
						return player.sctp("mine", fl => {
							return get.translation(fl.name) == "白银之手新兵";
						});
					},
					async effect(event, trigger, player) {
						player.sctp("mine_", fl => {
							if (get.translation(fl.name) == "白银之手新兵") fl.addvaluebuff([2, 2]);
						});
					},
				},
			},
			"hs_GoblinAuto-Barber": {
				async battleRoal(event, trigger, player) {
					if (player.data_weapon) player.data_weapon.addvaluebuff([1, 0]);
				},
			},
			"hs_IronSensei": {
				ending: {
					self: true,
					randomRT(p, evt, f) {
						return f.sctp("mine_").filter(fl => fl.rkind == "machine").randomGet();
					},
					async effect(event, trigger, player) {
						event.target.addvaluebuff([2, 2]);
					},
				},
			},
			"hs_GroveTender": {
				jueze: ["hs_GiftOfMana", "hs_GiftOfCards"],
			},

		},
	},
	spell: {
		info: {
			hs_Darkbomb: ["暗色炸弹", "ordinary", "damage:3", 2, "hs_warlock"],
			hs_TinkersSharpswordOil: ["修补匠的磨刀油", "ordinary", "使你的武器获得+3攻击力。连击：随机使一个友方随从获得+3攻击力。", 4, "hs_rogue"],
			hs_CallPet: ["召唤宠物", "rare", "抽一张牌。如果该牌是野兽牌，则其法力值消耗减少（4）点。", 2, "hs_hunter"],
			hs_Sabotage: ["暗中破坏", "epic", "随机消灭一个敌方随从，连击：并且摧毁你对手的武器。", 4, "hs_rogue"],
			hs_Crackle: ["连环爆裂", "ordinary", ["damage:(get.rand(0,3)+3)", "造成3到6点伤害，过载：（1）"], 2, "hs_shaman", ["thunder"]],
			hs_BouncingBlade: ["弹射之刃", "epic", "随机对一个随从造成1点伤害。重复此效果，直到某个随从死亡。", 3, "hs_warrior"],
			hs_Implosion: ["小鬼爆破", "rare", "对一个随从造成 2- 4点伤害。每造成1点伤害，便召唤一个1/1的小鬼。", 4, "hs_warlock"],
			hs_Crush: ["重碾", "epic", ["kill:1", "消灭一个随从。如果你控制任何受伤的随从，该法术的法力值消耗减少（4）点。"], 7, "hs_warrior", ["cgct:return p.sctp('mine',t=>t.isDamaged())?4:0;"]],
			hs_MusterForBattle: ["作战动员", "rare", ["summon:['白银之手新兵',3]", "召唤三个1/1的白银之手新兵，装备一把1/4的武器。"], 3, "hs_paladin", ["weapon:'圣光的正义'"]],
			hs_UnstablePortal: ["不稳定的传送门", "rare", "随机将一张随从牌置入你的手牌。该牌的法力值消耗减少（3）点。", 2, "hs_mage"],
			hs_EchoOfMedivh: ["麦迪文的残影", "epic", "复制你的所有随从，并将其置入你的手牌。", 4, "hs_mage"],
			hs_VelenSChosen: ["维伦的恩泽", "ordinary", ["buff:24,q1", "使一个随从获得+2/+4和法术伤害+1。"], 3, "hs_priest"],
			hs_Flamecannon: ["烈焰轰击", "ordinary", ["damage:4", "随机对一个敌方随从造成4点伤害。"], 2, "hs_mage", ["fire", "only:randmgfl"]],
			hs_BurrowingMine: ["地雷", "essential", "抽到时施放，你受到10点伤害。", 6, "hs_warrior", ["token", "hsdraw:player.hs_dmgrcv('damage', 10, 'fire');"]],
			hs_SealOfLight: ["光明圣印", "ordinary", ["recover:4", "为你的英雄恢复4点生命值，并在本回合中获得+2攻击力。"], 2, "hs_paladin", ["only:me", "atkhj:[2,0]"]],
			hs_Recycle: ["回收", "rare", "将一个敌方随从洗入你对手的牌库。", 6, "hs_druid"],
			hs_ArmorPlating: ["重型护甲", "essential", ["buff:H1", "使一个随从获得+1生命值。"], 1, "hs_neutral", ["token"]],
			hs_WhirlingBlades: ["旋风之刃", "essential", ["buff:A1", "使一个随从获得+1攻击力。"], 1, "hs_neutral", ["token"]],
			hs_RustyHorn: ["生锈的号角", "essential", ["buff:chaofeng", "使一个随从获得嘲讽。"], 1, "hs_neutral", ["token"]],
			hs_EmergencyCoolant: ["紧急冷冻剂", "essential", ["buff:dongjied", "冻结一个随从。"], 1, "hs_neutral", ["token"]],
			hs_FinickyCloakfield: ["隐秘力场", "essential", "直到你的下个回合，使一个友方随从获得潜行。", 1, "hs_neutral", ["token"]],
			hs_TimeRewinder: ["时间回溯装置", "essential", "将一个友方随从移回你的手牌。", 1, "hs_neutral", ["token"]],
			hs_ReversingSwitch: ["形体改造仪", "essential", "使一个随从的攻击力和生命值互换。", 1, "hs_neutral", ["token"]],
			hs_FeignDeath: ["假死", "epic", "触发所有友方随从的亡语。", 2, "hs_hunter"],
			hs_LightOfTheNaaru: ["纳鲁之光", "rare", ["recover:3", "恢复3点生命值。如果目标仍处于受伤状态，则召唤一个圣光护卫者。"], 1, "hs_priest", ["other:if(target.HSF('alive')&&target.isDamaged())player.SSfellow('圣光护卫者');"]],
			hs_GallywixsCoin: ["加里维克斯的幸运币", "essential", "在本回合中，获得一个法力水晶。（不会触发加里维克斯的效果。）", 0, "hs_neutral", ["token"]],
			hs_Demonheart: ["恶魔之心", "epic", "对一个随从造成5点伤害，如果该随从是友方恶魔，则改为使其获得+5/+5。", 5, "hs_warlock"],
			hs_TreeofLife: ["生命之树", "epic", "为所有角色恢复所有生命值。", 9, "hs_druid"],
			hs_AncestorsCall: ["先祖召唤", "epic", "每个玩家从手牌中随机将一个随从置入战场。", 4, "hs_shaman"],
			hs_CobraShot: ["眼镜蛇射击", "ordinary", "对一个随从和敌方英雄造成3点伤害。", 5, "hs_hunter"],
			hs_Lightbomb: ["圣光炸弹", "epic", "对所有随从造成等同于其攻击力的伤害。", 6, "hs_priest"],
			hs_DarkWispers: ["黑暗私语", "epic", "抉择：召唤5个小精灵；或者使一个随从获得+5/+5和嘲讽。", 6, "hs_druid"],
			//抉择选项
			hs_GiftOfMana: ["水晶赠礼", "essential", "使每个玩家获得一个法力水晶。", 3, "hs_druid", ["token", "nosearch"]],
			hs_GiftOfCards: ["卡牌赠礼", "essential", "每个玩家抽一张牌。", 3, "hs_druid", ["token", "nosearch"]],
			hs_AttackMode: ["攻击模式", "essential", "+1攻击力。", 2, "hs_druid", ["token", "nosearch"]],
			hs_TankMode: ["坦克模式", "essential", "+1生命值。", 2, "hs_druid", ["token", "nosearch"]],
			hs_NaturesDefense: ["大自然的防线", "essential", ["summon:['小精灵',5]", "召唤5个小精灵。"], 6, "hs_druid", ["token", "nosearch"]],
			hs_CallTheGuardians: ["守护者的呼唤", "essential", ["buff:chaofeng,55", "+5/+5并具有嘲讽。"], 6, "hs_druid", ["token", "nosearch"]],
		},
		skill: {
			hs_DarkWispers: {
				async content(event, trigger, player) {
					player.hs_jueze(["hs_NaturesDefense", "hs_CallTheGuardians"], event.card);
				},
			},
			hs_Lightbomb: {
				async content(event, trigger, player) {
					player.hs_dmgrcvNotaoe(player, "damage", player.sctp("mns"), event.card).set("num", (p, f) => f.ATK);
				},
			},
			hs_CobraShot: {
				filterTarget(c, p, t) {
					return p.sctp("mns", t);
				},
				async content(event, trigger, player) {
					await event.target.hs_dmgrcv(player, event.card, "damage", 3);
					player.HSline(player.getOppo(), "green");
					await player.getOppo().hs_dmgrcv(player, event.card, "damage", 3);
				},
				spelldamage: 3,
			},
			hs_AncestorsCall: {
				async content(event, trigger, player) {
					player.sctp("heros", p => p.hs_join3());
				},
			},
			hs_TinkersSharpswordOil: {
				active(p) {
					return p.hs_state.useCard > 0;
				},
				async content(event, trigger, player) {
					const wp = player.data_weapon;
					if (wp) {
						player.HSline(wp, "green");
						wp.addvaluebuff([3, 0]);
					}
					if (event.active && player.countFellow()) {
						const tg = player.getFellow().randomGet();
						player.HSline(tg, "green");
						tg.addvaluebuff([3, 0]);
					}
				},
			},
			hs_CallPet: {
				async content(event, trigger, player) {
					player.hs_drawDeck().onbuff = function(cs) {
						if (get.rkind(cs[0]) == "wildbeast") cs[0].addhsbuff({
							name: "hs_cost",
							type: "hs_cost",
							value: 4,
							creator: event.cards[0],
							fellow: player,
						});
					};
				},
			},
			hs_Sabotage: {
				active(p) {
					return p.hs_state.useCard > 0;
				},
				sfilter(card, player) {
					const tg = player.HSF("ranxmfil");
					if (tg) return true;
					else {
						return player.hs_state.useCard > 0 && player.getOppo().data_weapon;
					}
				},
				async content(event, trigger, player) {
					const tg = player.HSF("ranxmfil");
					if (tg) {
						player.HSline(tg, "green");
						tg.HSF("cuihui");
					}
					if (event.active && player.getOppo().data_weapon) {
						const wp = player.getOppo().data_weapon;
						player.HSline(wp, "green");
						wp.HSF("cuihui");
					}
				},
			},
			hs_BouncingBlade: {
				sfilter(card, player) {
					return player.sctp("mns", t => t.canhsdmg("hp"));
				},
				async content(event, trigger, player) {
					let i = 0;
					let qd = player;
					while (!player.sctp("mns", t => t.hp <= 0) && player.HSF("randmgfil", ["mns", null, "hp"]) && i < 80) {
						const t = player.HSF("randmgfil", ["mns", null, "hp"]);
						qd.HSline(t, "green");
						qd = t;
						await t.hs_dmgrcv('damage', 1, player, event.card);
						i++;
					}
				},
			},
			hs_Implosion: {
				cost: 4,
				rnature: "hs_warlock",
				filterTarget(card, player, target) {
					return target.isMin();
				},
				async content(event, trigger, player) {
					const n = [2, 3, 4].randomGet();
					const a = event.target.hasgjz(["shengdun", "mianyi"]) ? 0 : player.countFq() + n;
					await event.target.hs_dmgrcv("damage", n, player, event.card);
					if (a > 0) await player.SSfellow(["hs_Imp2_monster", a]);
					else alert(a);
				},
				spelldamage: true,
			},
			hs_UnstablePortal: {
				async content(event, trigger, player) {
					const {
						result
					} = await player.hs_gain(get.hskachi("HS_minor").randomGet());
					result.cards[0].addhsbuff({
						name: "hs_cost",
						type: "hs_cost",
						value: 3,
						creator: event.cards[0],
						fellow: player,
					});
				},
			},
			hs_EchoOfMedivh: {
				buffeff: true,
				async content(event, trigger, player) {
					const arr = player.getFellow().sort(lib.sort.attendseq).map(i => i.linkCard[0].name);
					await player.hs_gain(arr);
				},
			},
			hs_Recycle: {
				filterTarget(card, player, target) {
					return player.sctp("notmine", target);
				},
				async content(event, trigger, player) {
					event.target.HSF("backtodeck", [player.getOppo()]);
				},
			},
			hs_FinickyCloakfield: {
				filterTarget(card, player, target) {
					return player.sctp("mine", target);
				},
				async content(event, trigger, player) {
					event.target.addgjzbuff("qianxing", 1.1).countphase = player.getOppo();
				},
			},
			hs_TimeRewinder: {
				filterTarget(card, player, target) {
					return player.sctp("mine", target);
				},
				async content(event, trigger, player) {
					event.target.HSF('backtohand');
				},
			},
			hs_ReversingSwitch: {
				filterTarget(card, player, target) {
					return player.sctp("mns", target);
				},
				async content(event, trigger, player) {
					event.target.hs_reverse();
				},
			},
			hs_FeignDeath: {
				async content(event, trigger, player) {
					const pls = player.sctp("mine").filter(fl => fl.classList.contains("wangyu")).sort(lib.sort.attendseq);
					const evnum = pls.length;
					let i = 0;
					if (evnum > 0) {
						pls.forEach(fl => {
							fl.addTempClass("wywy");
						});
						await game.delay();
						while (i < evnum) {
							const fl = pls[i];
							fl.HSF("morefocus");
							await fl.hs_deathRattle(fl.triggers.deathRattle);
							i++;
							if (i < evnum) await game.delay(0.5);
						}
					}
				},
			},
			hs_GallywixsCoin: {
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
			hs_Demonheart: {
				filterTarget(card, player, target) {
					return target.isMin();
				},
				spelldamage: true,
				async content(event, trigger, player) {
					if (player.sctp("mine", event.target) && event.target.rkind == "demon") event.target.addvaluebuff([5, 5]);
					else event.target.hs_dmgrcv("damage", 5, player, event.card);
				},
			},
			hs_GiftOfMana: {
				async content(event, trigger, player) {
					player.sctp("main", p => {
						p.HSF("gainmana", [1]);
					});
				},
			},
			hs_GiftOfCards: {
				async content(event, trigger, player) {
					get.HSF("crossDraw", [player, 1]);
				},
			},
			hs_TreeofLife: {
				async content(event, trigger, player) {
					player.hs_dmgrcvNotaoe(player, "recover", player.sctp("all"), event.card, (p, f) => f.isDamaged()).set("num", (p, f) => f.maxHp);
				},
			},
			hs_AttackMode: {
				async content(event, trigger, player) {
					event.fellow.updateSelfBuff([1, 0]);
				},
			},
			hs_TankMode: {
				async content(event, trigger, player) {
					event.fellow.updateSelfBuff([0, 1]);
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
			hs_Glaivezooka: ["重型刃弩", "ordinary", "战吼：随机使一个友方随从获得+1攻击力。", 2, "hs_hunter", 2, 2, ["battleRoal:ranbuff>mine：A1"]],
			hs_Powermace: ["动力战锤", "rare", "亡语：随机使一个友方机械获得+2/+2。", 3, "hs_shaman", 3, 2, ["deathRattle:fltbuff>mine,machine：22"]],
			hs_Coghammer: ["齿轮光锤", "epic", "战吼：随机使一个友方随从获得圣盾和嘲讽。", 3, "hs_paladin", 2, 3, ["battleRoal:ranbuff>mine：shengdun,chaofeng"]],
			hs_CogmastersWrench: ["齿轮大师的扳手", "epic", "如果你控制任何机械，便获得+2攻击力。", 3, "hs_rogue", 1, 3],
			hs_OgreWarmaul: ["食人魔战槌", "ordinary", "50%几率攻击错误的敌人。", 3, "hs_warrior", 4, 2],
		},
		skill: {
			hs_CogmastersWrench: {
				weaponeffect: {
					numgh: {
						name: "value",
						value: [2, 0],
						wpal: true,
						range(f, tg) {
							return tg.swt && f.getLeader() == tg.getLeader();
						},
						ghfilter(card, fellow, target) {
							return fellow.sctp("mine", fl => fl.rkind == "machine");
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
		二王: "玛尔加尼斯",
		传送门: "不稳定的传送门",
		傻子王: "食人魔勇士穆戈尔",
		缩小: "缩小射线工程师",
		老司机: "老式治疗机器人",
		打蛋器: "自动漩涡打击装置",
		花母鸡: "斯尼德的伐木机",
		四驱车: "烈焰巨兽",
		飞机头: "米米尔隆的头部",
		飞机: "V-07-TR-0N",
		王师傅: "齿轮大师",
		王阿姨: "吵吵机器人",
		马云爹: "瑟玛普拉格",
		谢娜: "科赞秘术师",
	}
};