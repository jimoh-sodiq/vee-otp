import { defineComponent, h, Fragment, computed, onMounted, ref } from "vue";
import type { Ref, VNode } from "vue";

export const OtpContainer = defineComponent({
  name: "OtpContainer",
  props: {
    as: {
      type: [Object, String],
      required: false,
      default: undefined,
    },
  },
  emits: ["update:modelValue"],

  setup(props, { slots, emit }: any) {
    // const inputCount = computed(() => {
    //   const slotCount = slots
    //     .default()
    //     .filter((slot: VNode) => slot.type === OtpInput).length;
    //   return slotCount;
    // });

    // initalize empty otp input values
    const otpInputRefs = ref(new Array(slots.default().length).fill(""));
    const otpHandler = ref(new Array(slots.default().length).fill(""));

    // the value to be sent to parent scope
    const otpValue = computed(() => {
      return otpHandler.value.join("");
    });

    const otpInputIndexLsit = computed(() => {
      const indexes: number[] = [];
      otpInputRefs.value.forEach((el, index) => {
        if (otpInputRefs.value[index] !== "") {
          indexes.push(index);
        }
      });
      return indexes;
    });

    const handleInput = (e: InputEvent, index: number) => {
      const targetValue = (e.target as HTMLInputElement).value;
      const temporalOtp = [...otpHandler.value];
      temporalOtp[index] = targetValue.substring(targetValue.length - 1);
      otpHandler.value = temporalOtp;
      emit("update:modelValue", otpValue.value);
    };

    const handleKeyup = (e: KeyboardEvent, index: number) => {
      if (
        (!otpInputRefs.value[index].value || otpInputRefs.value[index].value) &&
        e.key === "ArrowRight"
      ) {
        e.preventDefault();
        focusNext(index);
      }
      if (otpInputRefs.value[index].value) {
        e.preventDefault();
        focusNext(index);
      }

      if (
        (!otpInputRefs.value[index].value || otpInputRefs.value[index].value) &&
        e.key === "ArrowLeft"
      ) {
        e.preventDefault();
        focusPrev(index);
      }
      if (!otpInputRefs.value[index].value && e.key === "Backspace") {
        e.preventDefault();
        focusPrev(index);
      }
    };

    const focusNext = (currentIndex: number) => {
      for (let i = currentIndex + 1; i < otpInputRefs.value.length; i++) {
        // console.log(otpInputRefs.value[i]);
        if (otpInputRefs.value[i] !== "") {
          if (otpInputRefs.value[i].disabled) {
            continue;
          }
          otpInputRefs.value[i].focus();
          return;
        }
      }
      return;
    };

    const focusPrev = (currentIndex: number) => {
      for (let i = currentIndex - 1; i >= 0; i--) {
        if (otpInputRefs.value[i] !== "") {
          if (otpInputRefs.value[i].disabled) {
            continue;
          }
          otpInputRefs.value[i].focus();
          return;
        }
      }
      return;
    };

    const clearAll = () => {
      console.log("all cleared");
      otpHandler.value = new Array(slots.default().length).fill("");
      emit("update:modelValue", otpValue.value);
    };

    const handlePasteInput = async (event: ClipboardEvent) => {
      const clipboardText = await navigator.clipboard.readText();
      const otpLength = otpInputIndexLsit.value.length;
      const shortClipboardText = clipboardText.trim().substring(0, otpLength);
      otpInputIndexLsit.value.forEach((index, idx) => {
        otpHandler.value[index];
        if (
          shortClipboardText[idx] !== "" &&
          otpInputRefs.value[index].type === "number" &&
          !otpInputRefs.value[index].disabled &&
          typeof shortClipboardText[idx] === "number"
        ) {
          otpHandler.value[index] = +shortClipboardText[idx];
        } else if (
          typeof shortClipboardText[idx] === "string" &&
          !otpInputRefs.value[index].disabled &&
          otpInputRefs.value[index].type === "number" &&
          shortClipboardText[idx] !== ""
        ) {
          otpHandler.value[index] = +shortClipboardText[idx]
            ? +shortClipboardText[idx]
            : "";
          otpInputRefs.value[index].value = "";
        } else if (
          shortClipboardText[idx] !== "" &&
          !otpInputRefs.value[index].disabled &&
          otpInputRefs.value[index].type !== "number"
        ) {
          otpHandler.value[index] = shortClipboardText[idx];
        }
      });
      emit("update:modelValue", otpValue.value);
    };

    const tag = Fragment;
    return () =>
      h(props.as || tag, [
        slots.default().map((slot: any, i: number) => {
          return slot.type === OtpInput
            ? h(
                "input",
                {
                  onKeyup: (event: KeyboardEvent) => handleKeyup(event, i),
                  onInput: (event: InputEvent) => handleInput(event, i),
                  onPaste: (event: ClipboardEvent) => handlePasteInput(event),
                  ref: (el) => {
                    otpInputRefs.value[i] = el;
                  },
                  disabled: slot.props.disabled,
                  class: slot.props.class,
                  type: slot.props.type,
                  value: otpHandler.value[i],
                },
                { name: "sodiq" }
              )
            : h(slot);
        }),
      ]);
  },
});

export const OtpInput = defineComponent({
  name: "OtpInput",
  setup() {
    return () => h("input");
  },
});
