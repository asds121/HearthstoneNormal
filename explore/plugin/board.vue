<script>
import { ref, onMounted, handleError } from "../../../../game/vue.esm-browser.js";
import { lib, game, ui, get, ai, _status } from "../noname.js";
import { removeExtension } from "./main.js";

export default {
	setup() {
		let extensions = lib.config.extensions.slice(0);
		if (lib.config.extensionSort && Array.isArray(lib.config.extensionSort)) {
			extensions.sort((a, b) => {
				return lib.config.extensionSort.indexOf(`extension_${a}`) - lib.config.extensionSort.indexOf(`extension_${b}`);
			});
		};
		let list = extensions.map(item => {
			return {
				name: item,
				hide: lib.config.hiddenPlayPack.includes(`extension_${item}`),
				enable: lib.config[`extension_${item}_enable`] === true,
			};
		});
		let extensionList = ref(list);
		return {
			removeExtension: name => {
				let conf = confirm(`你确定要删除扩展《${name}》吗？此操作会删除所有文件。`);
				if (conf) {
					game.removeExtension(name);
					if (!lib.config.extensions.includes(name)) {
						let ext = extensionList.value.find((item) => item.name == name);
						if (ext) extensionList.value.remove(ext);
					}
				}
			},
			swapExtension: (index1, index2) => {
				let valList = extensionList.value;
				[valList[index1], valList[index2]] = [valList[index2], valList[index1]];
				game.saveConfig("extensionSort", valList.map(item => `extension_${item.name}`));
			},
			imageDir: `${lib.assetURL}extension/炉石普通/resource/image/`,
			handleExtensionEnable: (name, enable) => {
				game.saveConfig(`extension_${name}_enable`, enable);
			},
			handleExtensionHide: (name, hide) => {
				if (hide && name == "炉石普通") {
					alert("隐藏《炉石普通》后，如您需要令其重新显示，请在控制台执行：game.saveConfig('hiddenPlayPack',[])");
				}
				if (hide) {
					lib.config.hiddenPlayPack.add(`extension_${name}`);
				} else {
					lib.config.hiddenPlayPack.remove(`extension_${name}`);
				}
				game.saveConfig("hiddenPlayPack", lib.config.hiddenPlayPack);
			},
			extensionList
		};
	}
};

</script>

<template>
<div id="hs-main-container">
	<table style="width:100%;height:100%;color:black;">
		<tr class="hs-table" style="height: 40px;" v-for="(extensionItem,index) in extensionList" :key="extensionItem.name">
			<td style="color:gold;">《{{ extensionItem.name }}》</td>
			<td>
				<input type="checkbox" v-model="extensionItem.hide" @change="(val)=>handleExtensionHide(extensionItem.name,val.target.checked)" />
				<span @click="extensionItem.hide=!extensionItem.hide;handleExtensionHide(extensionItem.name,extensionItem.hide);">隐藏</span>
			</td>
			<td>
				<input type="checkbox" v-model="extensionItem.enable" @change="" />
				<span @click="extensionItem.enable=!extensionItem.enable;handleExtensionEnable(extensionItem.name,extensionItem.enable)">开启</span>
			</td>
			<td>
				<img class="hs-image-button" @click="swapExtension(index,index+1)" v-show="index < extensionList.length-1" width="20" height="20" :src="imageDir+'direction_down.png'"></img>
				<img class="hs-image-button" @click="swapExtension(index,index-1)" v-show="index > 0" width="20" height="20" :src="imageDir+'direction_up.png'"></img>
			</td>
			<td>
				<img class="hs-image-button" @click="removeExtension(extensionItem.name)" v-show="extensionItem.name !== '炉石普通'" width="20" height="20" :src="imageDir+'remove.png'"></img>
			</td>
		</tr>
	</table>
</div>
</template>

<style>
#hs-main-container {
	width: 100%;
	height: 100%;
	display: flex;
	position: absolute;
	align-items: flex-start;
	flex-direction: column;
	left: 0px;
	top: 0px;
	overflow: scroll;
}

.hs-table {}

.hs-table>td {
	display: table-cell;
	text-align: center;
	vertical-align: middle;
}

.hs-image-button {
	display: inline-block;
	height: 20px;
	width: 20px;
	background-size: 100% 100%;
	background-position: center;
}
</style>