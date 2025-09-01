

export const backtopEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export const backtopProps = {
  target: {
    type: String,
    default: null,
  },
  visibilityHeight: {
    type: Number,
    default: 200,
  },
  right: {
    type: Number,
    default: 40,
  },
  bottom: {
    type: Number,
    default: 40,
  },
};