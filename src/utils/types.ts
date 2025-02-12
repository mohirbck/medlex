// Umumiy interfacelar
export interface Term {
    id: string;
    title: {
      uz: string;
      ru: string;
      en: string;
      la: string;
    };
    description: {
      uz: string;
      ru: string;
      en: string;
      la: string;
    };
    imageUrl: string;
}

export type LanguageCode = 'uz' | 'ru' | 'en' | 'la';

export interface Language {
    code: LanguageCode;
    label: string;
}