import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'danger' | 'ghost' | 'subtle' | 'danger-ghost';
  size?: 'xs' | 'sm' | 'md';
  children?: React.ReactNode;
  icon?: React.ReactNode; // Optional icon prop
  iconPosition?: 'left' | 'right'; // Optional icon position
}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>((
  {
    variant = 'default',
    size = 'xs', // Defaulting to xs as it's common in the app
    children,
    className = '',
    icon,
    iconPosition = 'left',
    ...props
  },
  ref
) => {
  const baseStyle =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variantStyles = {
    default:
      'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-400',
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
    ghost: // Transparent background, text color based on context, subtle hover
      'text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-400',
    subtle: // Light gray background, for less prominent actions
      'bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-400',
    'danger-ghost': // Added definition for danger-ghost
      'text-slate-500 hover:bg-red-100 hover:text-red-600 focus-visible:ring-red-400',
  };

  const sizeStyles = {
    xs: 'px-2.5 py-1.5 text-xs', // Adjusted from px-2 py-1.5 to px-2.5 py-1.5 for better balance
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
  };

  return (
    <button
      ref={ref}
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim()}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className={children ? 'mr-1.5' : ''}>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className={children ? 'ml-1.5' : ''}>{icon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button; 
