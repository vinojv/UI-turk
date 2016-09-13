export default function push (text) {
  return {
      type: "PUSH",
      data: text
  }
};