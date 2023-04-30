import { Tool, ToolExports } from "./Tool";

const regex_export_const = new RegExp(/export\sconst\s(?<name>\w+)\s=\s(?<params>\(.*\))[\n\r\s=>]*{/, `gm`);
const regex_export_function = new RegExp(/export\sfunction\s(?<name>\w+)(?<params>\(.*\))[\n\r\s]*{/, `gm`);

function replaceExportFunctions(src: string) {
	let function_names = [];

	//! replace `export const`
	regex_export_const.lastIndex = 0;
	let matches = regex_export_const.exec(src);
	let out = src;
	while (matches !== null) {
		if (matches.groups === undefined || matches.groups.name === undefined || matches.groups.params === undefined) {
			continue;
		}
		function_names.push(matches.groups.name);
		out = out.replaceAll(matches[0], `const ${matches.groups.name} = ${matches.groups.params} => {`);
		matches = regex_export_const.exec(src)
	}
	regex_export_const.lastIndex = 0;

	//! replace `export function`
	regex_export_function.lastIndex = 0;
	matches = regex_export_function.exec(src);
	while (matches !== null) {
		if (matches.groups === undefined || matches.groups.name === undefined || matches.groups.params === undefined) {
			continue;
		}
		function_names.push(matches.groups.name);
		out = out.replaceAll(matches[0], `const ${matches.groups.name} = ${matches.groups.params} => {`);
		matches = regex_export_function.exec(src)
	}
	regex_export_function.lastIndex = 0;
	out = `(function () { ${out}\n\nreturn {${function_names.join(`, `)}};\n})()`
	return out;
}

export function importTool(tool: Tool, src: string): ToolExports {
	const fixed_src = replaceExportFunctions(src);
	try {
		const tool_exports = eval(fixed_src);
		console.log(`loaded ${Object.keys(tool_exports).length} exports for tool: ${tool.name}`);
		return tool_exports;
	}
	catch (e) {
		console.error(`error when loading tool: ${tool.name}`, e);
	}
	return {};
}