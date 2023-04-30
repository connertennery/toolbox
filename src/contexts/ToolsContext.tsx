import { createSignal, createContext, useContext, Component, ParentComponent } from "solid-js";
import { Tool } from "../Tool";
import { createStore } from "solid-js/store";

const ToolsContext = createContext<Tool[]>([]);

export const ToolsProvider: ParentComponent = (props) => {
	const [tools, setTools] = createStore<Tool[]>([]);
	const toolsSetter = [
		tools,
		{
			update() {
				setTools(t => t);
			},
		}
	];

	return (
		<ToolsContext.Provider value={[]}>
			{props.children}
		</ToolsContext.Provider>
	);
}

export function useTools() { return useContext(ToolsContext); }