import Editor from "@monaco-editor/react";

const MonacoEditor = ({ language, value, onChange, label }) => {
	return (
		<div className='flex flex-1 flex-col'>
			<div className='text-neutral-300 text-sm'>{label}</div>
			<Editor
				theme='vs-dark'
				language={language === "js" ? "javascript" : language}
				value={value}
				onChange={(newValue) => onChange(newValue)}
				options={{
					minimap: { enabled: false },
					fontSize: 14,
					wordWrap: "on",
					scrollBeyondLastLine: false,
					automaticLayout: true,
					tabSize: 2,
				}}
			/>
		</div>
	);
};

export default MonacoEditor;
