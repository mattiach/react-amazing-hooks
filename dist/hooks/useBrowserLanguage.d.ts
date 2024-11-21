type TextFormat = 'uppercase' | 'capitalize' | 'lowercase';
declare const useBrowserLanguage: (format?: "short" | "full", textFormat?: TextFormat) => string;
export default useBrowserLanguage;
