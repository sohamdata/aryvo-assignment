import { FormProvider as Form } from 'react-hook-form';

interface FormProviderProps {
    children: React.ReactNode;
    methods: any;
    onSubmit: any;
    className?: string;
}

export default function FormProvider({ children, onSubmit, methods, className }: FormProviderProps) {
    return (
        <Form {...methods}>
            <form onSubmit={onSubmit} className={className}>{children}</form>
        </Form>
    );
}
