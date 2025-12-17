import { createApp, onMounted, ref, handleError } from "../../../../game/vue.esm-browser.js";
import { lib, game, ui, get, ai, _status } from "../noname.js";
import App from "./board.vue";

function getFileList(path) {
	return new Promise((resolve, reject) => {
		game.getFileList(path, (folders, files) => {
			resolve([folders, files]);
		}, reject);
	});
};
//wef-export
class Task {
	constructor(parent) {
		this.parent = parent;
		this.doing = false;
		this.done = false;
		this.progressListeners = [];
		this.taskListeners = [];
	}

	doTask() {
		this.doing = true;
		this.updateProgress();
		return Promise.resolve(this.taskContent());
	}

	getProgress() {
		return this.progress ? this.progress : 0;
	}

	updateProgress() {
		this.progressListeners.forEach(listener => listener(this.getProgress()));
		if (this.parent) {
			this.parent.updateProgress();
		}
	}

	callTaskListener(event, params) {
		this.taskListeners.forEach(listener => listener(event, params));
	}

	doneTask() {
		this.progress = 1;
		this.done = true;
		this.updateProgress();
		if (this.parent && (this.parent instanceof GroupTask)) {
			this.parent.onChildDone();
		}
		this.callTaskListener("done");
	}

	taskContent() {}
};
//wef-export
class GroupTask extends Task {
	constructor(parent) {
		super(parent);
		this.children = [];
	}

	getChildren() {
		return new Promise((resolve) => {
			this.children = [];
			resolve();
		});
	}

	getProgress() {
		if (!this.children || this.children.length == 0) return 0;
		return this.children.reduce((previous, current) => {
			return previous + current.getProgress();
		}, 0) / this.children.length;
	}

	taskContent() {
		this.getChildren().then(() => {
			return Promise.all(this.children.map(child => child.doTask().catch(e => {
				this.callTaskListener("error", e);
				console.log(e);
			}).then(() => {
				return Promise.resolve(this.onChildDone());
			})));
		}).then(() => {
			return Promise.resolve(this.onAllChildrenDone());
		}).then(() => {
			this.doneTask();
		}).catch(e => {
			alert(e);
			this.callTaskListener("failure", e);
		});
	}

	onAllChildrenDone() {}

	onChildDone() {}
};


class FileDeleteTask extends Task {
	constructor(parent, path) {
		super(parent);
		this.path = path;
	}

	taskContent() {
		return game.promises.removeFile(this.path);
	}
};

class DirDeleteTask extends GroupTask {
	constructor(parent, path) {
		super(parent);
		this.path = path;
	}

	getChildren() {
		return getFileList(this.path).then(ret => {
			let [folders, files] = ret;
			this.children = [];
			folders.forEach(folder => this.children.push(new DirDeleteTask(this, `${this.path}/${folder}`)));
			files.forEach(file => this.children.push(new FileDeleteTask(this, `${this.path}/${file}`)));
		}).catch(e => {
			this.callTaskListener("failure", e);
		});
	}
	//注释
	onAllChildrenDone() {
		return (new FileDeleteTask(null, this.path)).doTask();
	}
	//@todo
};
//export
async function checkExtensionFileExist(name) {
	let [folders, files] = await getFileList(`extension`);
	return folders.includes(name);
};

export function openExtensionManagerBoard() {
	if (!lib.config.hs_mentioned) {
		alert("此面板的设置均有在重启后才能生效。");
		game.saveConfig("hs_mentioned", true);
	}
	let app = createApp(App);
	let back = ui.create.div(".hs-main-window-back");
	let inner = ui.create.div(".hs-main-window-center", back);
	inner.listen(e => {
		e.stopPropagation();
	});
	back.listen(() => {
		back.delete();
	});
	document.body.appendChild(back);
	app.mount(inner);
};
//export
function clearExtensionConfig(name) {
	lib.config.extensions.remove(name);
	game.saveConfig("extensions", lib.config.extensions);
	game.removeExtension(name);
};
export function removeExtension(name) {
	return new Promise((resolve, reject) => {
		let back = ui.create.div(".hs-main-window-back-progress");
		let inner = ui.create.div(".hs-main-window-progress", back);
		document.body.appendChild(back);
		let done = function() {
			clearExtensionConfig(name);
			alert(`《${name}》已成功删除`);
			back.delete();
			resolve();
		};
		let onFail = function() {
			alert(`无法删除扩展《${name}》。`);
			back.delete();
			resolve();
		};
		createApp({
			setup() {
				let progress = ref(0);
				let text = ref(`正在删除扩展《${name}》`);
				onMounted(async () => {
					if (!await checkExtensionFileExist(name)) {
						alert(`未找到扩展《${name}》的文件，将直接删除配置。`);
						done();
						return;
					}
					let task = new DirDeleteTask(null, `extension/${name}`);
					task.progressListeners.push((p) => {
						progress.value = p;
					});
					task.taskListeners.push((e, err) => {
						if (e == "done") {
							done();
						} else if (e == "failure") {
							onFail();
						} else if (e == "error") {
							console.log(err);
						}
					});
					task.doTask();
				});
				return {
					progress,
					text
				};
			},
			template: `<div style="display:block;color:white;font-size:25px;">{{text}}<br><br><span>进度{{progress.toFixed(2) * 100}}%</span></div>`,
		}).mount(inner);
	});
};