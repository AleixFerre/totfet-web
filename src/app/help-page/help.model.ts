export interface HelpVideo {
  videoEmbedUrl: string;
  description: string;
}

export enum OperatingSystem {
  Android = 'Android',
  iOS = 'iOS',
  Windows = 'Windows',
  Mac = 'Mac',
}

export const VIDEOS: Record<OperatingSystem, HelpVideo> = {
  [OperatingSystem.Android]: {
    videoEmbedUrl: 'https://www.youtube.com/embed/M9ApPBdhH1c',
    description: 'Seguiu aquests senzills passos per instal·lar la nostra aplicació al vostre dispositiu Android. Gaudiu de totes les funcionalitats amb només uns quants tocs.',
  },
  [OperatingSystem.iOS]: {
    videoEmbedUrl: 'https://www.youtube.com/embed/HpZaPRx4KlM',
    description: 'Descobriu com instal·lar la nostra aplicació en el vostre dispositiu iOS de manera ràpida i fàcil. Comenceu a utilitzar-la en pocs minuts.',
  },
  [OperatingSystem.Windows]: {
    videoEmbedUrl: 'https://www.youtube.com/embed/XmKJeRT3Jp4',
    description: 'Apreneu a instal·lar la nostra aplicació en el vostre ordinador amb Windows seguint aquesta guia pas a pas. Comenceu a gaudir de totes les seves funcionalitats avui mateix.',
  },
  [OperatingSystem.Mac]: {
    videoEmbedUrl: 'https://www.youtube.com/embed/bFKu5UmtOXg',
    description: 'Instal·leu la nostra aplicació al vostre Mac amb aquesta senzilla guia. Obtingueu totes les funcions que necessiteu en només uns quants passos.',
  },
};
