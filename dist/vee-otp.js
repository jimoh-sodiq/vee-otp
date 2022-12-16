import { defineComponent as g, ref as i, computed as y, h as p, Fragment as V } from "vue";
const C = g({
  name: "OtpContainer",
  props: {
    as: {
      type: [Object, String],
      required: !1,
      default: void 0
    }
  },
  emits: ["update:modelValue"],
  setup(h, { slots: v, emit: s }) {
    const t = i(new Array(v.default().length).fill("")), o = i(new Array(v.default().length).fill("")), f = y(() => o.value.join("")), c = y(() => {
      const a = [];
      return t.value.forEach((e, u) => {
        t.value[u] !== "" && a.push(u);
      }), a;
    }), d = (a, e) => {
      const u = a.target.value, l = [...o.value];
      l[e] = u.substring(u.length - 1), o.value = l, s("update:modelValue", f.value);
    }, I = (a, e) => {
      (!t.value[e].value || t.value[e].value) && a.key === "ArrowRight" && (a.preventDefault(), m(e)), t.value[e].value && (a.preventDefault(), m(e)), (!t.value[e].value || t.value[e].value) && a.key === "ArrowLeft" && (a.preventDefault(), b(e)), !t.value[e].value && a.key === "Backspace" && (a.preventDefault(), b(e));
    }, m = (a) => {
      for (let e = a + 1; e < t.value.length; e++)
        if (t.value[e] !== "") {
          if (t.value[e].disabled)
            continue;
          t.value[e].focus();
          return;
        }
    }, b = (a) => {
      for (let e = a - 1; e >= 0; e--)
        if (t.value[e] !== "") {
          if (t.value[e].disabled)
            continue;
          t.value[e].focus();
          return;
        }
    }, O = async (a) => {
      const e = await navigator.clipboard.readText(), u = c.value.length, l = e.trim().substring(0, u);
      c.value.forEach((r, n) => {
        o.value[r], l[n] !== "" && t.value[r].type === "number" && !t.value[r].disabled && typeof l[n] == "number" ? o.value[r] = +l[n] : typeof l[n] == "string" && !t.value[r].disabled && t.value[r].type === "number" && l[n] !== "" ? (o.value[r] = +l[n] ? +l[n] : "", t.value[r].value = "") : l[n] !== "" && !t.value[r].disabled && t.value[r].type !== "number" && (o.value[r] = l[n]);
      }), s("update:modelValue", f.value);
    }, w = V;
    return () => p(h.as || w, [
      v.default().map((a, e) => a.type === k ? p(
        "input",
        {
          onKeyup: (u) => I(u, e),
          onInput: (u) => d(u, e),
          onPaste: (u) => O(),
          ref: (u) => {
            t.value[e] = u;
          },
          disabled: a.props.disabled,
          class: a.props.class,
          type: a.props.type,
          value: o.value[e]
        },
        { name: "sodiq" }
      ) : p(a))
    ]);
  }
}), k = g({
  name: "OtpInput",
  setup() {
    return () => p("input");
  }
});
export {
  C as OtpContainer,
  k as OtpInput
};
