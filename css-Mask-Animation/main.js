const para = document.getElementById("para");
const mask = document.getElementById("mask");
const maskSize = 300;
const maskDefaultSize = 30;
mask.style.maskSize = `${maskDefaultSize}px`;

let paraHovered = false;
let maskHovered = true;
mask.addEventListener("mouseenter", (mouse) => {
  mask.style.background = "rgba(58, 9, 190,1)";
  maskHovered = true;
});
mask.addEventListener("mouseleave", (mouse) => {
  mask.style.background = "rgba(12,12,21,0)";
  maskHovered = false;
});

para.addEventListener("mouseenter", (mouse) => {
  paraHovered = true;
  mask.style.maskSize = `${maskSize}px`;
});
para.addEventListener("mouseleave", (mouse) => {
  mask.style.maskSize = `${maskDefaultSize}px`;
  paraHovered = false;
});
mask.addEventListener("mousemove", (e) => {
  let MaskPos = mask.getBoundingClientRect();
  if (maskHovered) {
    mask.style.maskPosition = `
  ${
    paraHovered
      ? e.clientX - MaskPos.left - maskSize / 2
      : e.clientX - MaskPos.left - maskDefaultSize / 2
  }px ${
      paraHovered
        ? e.clientY - MaskPos.top - maskSize / 2
        : e.clientY - MaskPos.top - maskDefaultSize / 2
    }px`;
  }
  console.log("mask.left: ", MaskPos.left);
});
