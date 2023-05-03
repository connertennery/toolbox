import { createContext, useContext, ParentComponent } from "solid-js";
import { Tool } from "../Tool";
import { createStore, produce } from "solid-js/store";

const contextCreator = () => {
	const [tools, setTools] = createStore<Tool[]>([]);
	const toolsContextValue = [
		tools,
		{
			addTool(tool: Tool) {
				const match = tools.find((t) => t === tool);
				if (!match) {
					// setTools((store) => [...store, tool]);
					setTools(
						produce((store) => {
							store.push(tool);
						}),
					);
				}
			},
			removeTool(tool: Tool) {
				setTools(
					produce((store) => {
						store.splice(
							store.findIndex((t) => t === tool),
							1,
						);
					}),
				);
			},
			updateTool(tool: Tool) {
				const index = tools.findIndex((t) => t.name === tool.name);
				if (index >= 0) {
					setTools(
						produce((store) => {
							store[index] = tool;
						}),
					);
				}
			},
			updateTools() {
				setTools((store) => [...store]);
			},
		},
	] as const;
	return toolsContextValue;
};

const toolsContextValue = contextCreator();

const ToolsContext =
	createContext<ReturnType<typeof contextCreator>>(toolsContextValue);

export const ToolsProvider: ParentComponent = (props) => {
	// const toolsContextValue = contextCreator();

	return (
		<ToolsContext.Provider value={toolsContextValue}>
			{props.children}
		</ToolsContext.Provider>
	);
};

export const useTools = () => {
	return useContext(ToolsContext);
};
