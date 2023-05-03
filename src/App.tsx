import { Component, For } from "solid-js";
import { createStore } from "solid-js/store";

import styles from "./App.module.css";
import { Tool, ToolType } from "./Tool";
import ToolList from "./components/ToolList/ToolList";
import { ToolsProvider } from "./contexts/ToolsContext";

const App: Component = () => {
	return (
		<div class={styles.App}>
			<ToolsProvider>
				<header class={styles.header}>
					<span style={{ "font-weight": "bold" }}>toolbox</span>
					<span>about</span>
				</header>
				<div class={styles.main}>
					<ToolList />
				</div>
			</ToolsProvider>
		</div>
	);
};

export default App;
