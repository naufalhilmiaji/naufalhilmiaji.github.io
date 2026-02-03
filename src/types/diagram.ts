export interface DiagramNode {
    label: string;
    emphasis?: boolean;
    children?: DiagramNode[];
}
