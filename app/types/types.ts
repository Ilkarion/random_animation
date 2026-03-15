// types.ts
import { ReactNode } from 'react';

export interface HelixCardData {
  id: string | number;
  centerContent: ReactNode;
  leftContent: ReactNode;
  rightContent: ReactNode;
  bgColor?: string; // Цвет фона при активации этой карточки
}

export interface PlanetData {
  id: string;
  name: string;
  desc: string;
  gradient: string;
  shadow: string;
  bgColor: string;
  textColor: string;
}


export interface CarouselItemData {
  id: string | number;
  visualContent: ReactNode; // Любой TSX-компонент!
  title: string;
  description: string;
  bgColor?: string;
  textColor?: string;
}