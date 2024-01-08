import { FC, ReactNode } from 'react';

export interface ICardVariant {
  dark: string,
  outline: string,
  light: string,
}

export interface ICardProps {
  className?: string;
  variant: keyof ICardVariant;
  children?: ReactNode;
}

const cardVariant: ICardVariant = {
  dark: 'relative card block_row gap-20',
  light: 'relative card block_row gap-20',
  outline: 'relative card block_row gap-20 bg_transparent',
}

const Card: FC<ICardProps> = ({ variant = cardVariant.dark, children, className }) => {
  return (
    <div className={ [className || '', variant].join(' ') }>
      { children }
    </div>
  );
};

export default Card;