export default interface IProps {
    data: any;
    uniqueId: string;
    isSelected: boolean | string;
    onClick: () => void;
}