interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container = ({ children, className = ''}: ContainerProps) => (
    <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
        {children}
    </div>
);

export default Container;