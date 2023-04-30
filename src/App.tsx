import type { Component } from 'solid-js';
import { createStore } from 'solid-js/store'

import styles from './App.module.css';

type Tool = {
	name: string,
	type: `lib` | `usr`,
	loaded: boolean,
}

const App: Component = () => {
	const [tools, setTools] = createStore<Tool[]>([]);

	const refreshTools = async () => {
		console.log(`refreshing tools`);
		// const url = new URL('/tools/*.js', window.origin);
		// const url = new URL('/tools/', window.origin);
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
			</div>
		</div >
	);
};

export default App;
