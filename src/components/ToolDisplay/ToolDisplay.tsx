import { Component } from "solid-js";
import { Tool } from "../../Tool";

import styles from "./ToolDisplay.module.css";
import { importTool } from "../../tool_importer";
import { useTools } from "../../contexts/ToolsContext";

type ToolDisplayProps = {
	tool: Tool;
};

const ToolDisplay: Component<ToolDisplayProps> = (props) => {
	const [tools, { updateTool }] = useTools();
	const { tool } = props;

	const loadTool = async (t: Tool) => {
		console.log(`loading tool`, t);
		const res = await fetch(/* @vite-ignore */ t.src);
		const text = await res.text();
		const tool_exports = importTool(t, text);
		updateTool({ ...t, exports: tool_exports, loaded: true });
	};

	return (
		<div class={styles.ToolDisplay}>
			<div class={styles.line}>
				<span>name:</span>
				<a href={tool.src}>{tool.name}</a>
			</div>
			<div class={styles.line}>
				<span>loaded:</span>
				<span>{tool.loaded ? `true` : `false`}</span>
			</div>
			<div class={styles.line}>
				<span>type:</span>
				<span>{tool.type}</span>
			</div>
			<div class={styles.line}>
				<span>{tool.size}kb</span>
				<button onClick={(e) => loadTool(tool)}>load</button>
			</div>
			<div class={styles.line}>
				<span>exports: {Object.keys(tool.exports)?.length ?? `N/A`}</span>
				<button
					onClick={(e) => {
						const input = prompt(`input please`);
						const res = tool.exports.doExampleThings(input);
						console.log(`result from tool exported function`, res);
					}}
				>
					exec
				</button>
			</div>
		</div>
	);
};

export default ToolDisplay;
