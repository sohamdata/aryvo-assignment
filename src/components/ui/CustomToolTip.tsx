import { Tooltip } from 'react-tooltip';

interface CustomTooltipProps {
    id: string;
    content: string;
    place?: 'top' | 'right' | 'bottom' | 'left';
    child: React.ReactNode;
}

const CustomTooltip = ({ id, content, place, child }: CustomTooltipProps) => {
    return (
        <div
            data-tooltip-id={id}
            data-tooltip-content={content}
            data-tooltip-place={place ?? 'bottom'}
            className="z-40"
        >
            <Tooltip id={id} />
            {child}
        </div>
    );
};

export default CustomTooltip;

