import type { VNode } from "vue";
export declare const OtpContainer: import("vue").DefineComponent<{
    as: {
        type: (ObjectConstructor | StringConstructor)[];
        required: false;
        default: any;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    as: {
        type: (ObjectConstructor | StringConstructor)[];
        required: false;
        default: any;
    };
}>> & {
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {
    as: string | Record<string, any>;
}>;
export declare const OtpInput: import("vue").DefineComponent<{}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
