import { FC, ReactNode } from 'react';

export interface IButtonVariant {
  gradient: string,
  outline_white: string,
}

export interface IButtonProps {
  className?: string;
  variant: keyof IButtonVariant;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const buttonVariant: IButtonVariant = {
  gradient: 'button image_centerY',
  outline_white: 'button image_centerY shadow_unset bg_transparent button_outline',
}

const Button: FC<IButtonProps> = ({ variant = buttonVariant.gradient, children, className, onClick, disabled }) => {
  return (
    <button className={ [className || '', variant].join(' ') } onClick={ () => onClick } disabled={ disabled || false }>
      { children }
    </button>
  );
};

export default Button;