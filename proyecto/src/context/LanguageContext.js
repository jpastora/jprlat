import { createContext, useContext } from 'react'
import { DEFAULT_LANGUAGE, getContent } from '../data/translations.js'

/*
  Contexto de idioma. El Provider vive en App.jsx.
  Valor por defecto: español, para que cualquier consumidor tenga
  contenido válido incluso fuera del Provider.
*/
export const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: getContent(DEFAULT_LANGUAGE),
})

export function useLanguage() {
  return useContext(LanguageContext)
}
