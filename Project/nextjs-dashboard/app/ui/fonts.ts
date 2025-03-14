// primary font
import { Inter, Lusitana } from 'next/font/google';
 
// specify what subset you'd like to load. In this case, 'latin'
// https://fonts.google.com/knowledge/glossary/subsetting
export const inter = Inter({ subsets: ['latin'] });
// secondary font
export const lusitana = Lusitana({ subsets: ['latin'], weight: ['400', '700'] });