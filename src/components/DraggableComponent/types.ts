export default interface IProps {
    data: any;
    uniqueId: string;
    isSelected: boolean | string;
    onClick: () => void;
}

export enum ElementTypes {
    Label = 'Label',
    Input = 'Input',
    Button = 'Button',
}

export const dndIdentifier = 'components';