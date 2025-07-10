interface ErrorComponentProps {
    error: string | object | null;
}

function ErrorComponent({ error }: ErrorComponentProps) {
    if (!error) return null;

    const errorMessage = typeof error === 'string' 
        ? error 
        : Object.values(error).join(', ');

    return (
        <div className="text-red-600">
            <p>{errorMessage}</p>
        </div>
    );
}

export default ErrorComponent;