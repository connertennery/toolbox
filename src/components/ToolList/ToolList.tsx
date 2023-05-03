import { Component, For } from "solid-js";
import { Tool, ToolType } from "../../Tool";

import styles from "./ToolList.module.css";
import { importTool } from "../../tool_importer";
import { useTools } from "../../contexts/ToolsContext";
import ToolDisplay from "../ToolDisplay/ToolDisplay";
import { GitHubApiResponse } from "../../github";

type ToolListProps = {};

const ToolList: Component<ToolListProps> = (props) => {
	const [tools, { addTool }] = useTools();

	const refreshTools = async () => {
		console.log(`refreshing tools`);
		const url = new URL(
			"https://api.github.com/repos/connertennery/toolbox/contents/tools",
		);
		const fetchResponse = await fetch(url);
		const availableTools: GitHubApiResponse = await fetchResponse.json();
		console.log(`availableTools`, availableTools);

		availableTools.forEach((file) => {
			addTool({
				name: file.name,
				type: ToolType.Unknown,
				loaded: false,
				src: file.download_url,
				size: file.size,
				exports: {},
			});
		});

		// const imp = await import(/* @vite-ignore */ url.href);
		// console.log(`imp`, imp);
	};

	const loadTool = async (t: Tool) => {
		console.log(`loading tool`, t);
		const res = await fetch(/* @vite-ignore */ t.src);
		const text = await res.text();
		const tool_exports = importTool(t, text);
	};

	return (
		<div class={styles.ToolList}>
			<button
				onclick={(e) => {
					refreshTools();
				}}
			>
				refresh tools
			</button>
			<For each={tools}>
				{(tool: Tool) => {
					return <ToolDisplay tool={tool} />;
				}}
			</For>
		</div>
	);
};

export default ToolList;
