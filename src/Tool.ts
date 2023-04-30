export type Tool = {
	name: string;
	type: ToolType;
	loaded: boolean;
	src: string;
	size: number;
	exports: ToolExports
};

export enum ToolType {
	Unknown,
	Library,
	User
}

export type ToolExports = Record<string, Function>;