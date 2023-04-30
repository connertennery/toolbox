import { Component, For } from 'solid-js';
import { createStore } from 'solid-js/store'

import styles from './App.module.css';
import ToolDisplay from './components/ToolDisplay';
import { Tool, ToolType } from './Tool';

type GitHubApiResponse = {
	_links: {
		git: string,
		html: string,
		self: string
	}
	download_url: string,
	git_url: string,
	html_url: string,
	name: string,
	path: string,
	sha: string,
	size: number,
	type: string,
	url: string
}[]

const App: Component = () => {
	const [tools, setTools] = createStore<Tool[]>([]);

	const refreshTools = async () => {
		console.log(`refreshing tools`);
		const url = new URL('https://api.github.com/repos/connertennery/toolbox/contents/tools');
		const fetchResponse = await fetch(url);
		const availableTools: GitHubApiResponse = await fetchResponse.json();
		console.log(`availableTools`, availableTools);

		availableTools.forEach((file) => {
			addTool({ name: file.name, type: ToolType.Unknown, loaded: false, src: file.download_url, size: file.size, exports: {} })
		});

		// const imp = await import(/* @vite-ignore */ url.href);
		// console.log(`imp`, imp);
	}

	const addTool = (tool: Tool) => {
		setTools([...tools, tool]);
	}

	return (
		<div class={styles.App}>
			<header class={styles.header}>
				<span style={{ "font-weight": "bold" }}>toolbox</span>
				<span>about</span>
			</header>
			<div class={styles.main}>
				<button onclick={(e) => { refreshTools() }}>refresh tools</button>
				<For each={tools}>
					{
						(tool: Tool) => {
							return <ToolDisplay tool={tool}></ToolDisplay>
						}
					}
				</For>
			</div>
		</div >
	);
};

export default App;
