const slides = document.querySelectorAll(".slide"); //to get data
counter = 0;

// console.log(slides);
slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`; //Index * 100  multiply becasue the 100% widht become into by previous one and its juping next image//
});

const slideImage = () => {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`; // to  transoform slides into next silde
  });
};

let gallery = document.querySelectorAll(".image-item"); //all image store in the varibale to make one galllery

//Add image border
const takborder = () => {
  gallery.forEach((image, index) => {
    image.style.border = "5px"; //to make a border
  });

  const selectedImageIndex = Math.abs(counter) % gallery.length;
  // Add border to the selected image
  gallery[selectedImageIndex].style.border = "2px solid white"; //distcutring the array
};

const changeImageByIndex = (index) => {
  if (index >= 0 && index < gallery.length) {
    // to change the postion and border of all image
    gallery.forEach((image, index) => {
      image.style.border = "none";
    });
    console.log(slides[index]);
    slides[index].style.left = "0";
    gallery[index].style.border = "2px solid gray"; //to take the border into grey color
  }
};

function minuscounter() {
  //to revecing the image
  counter - 1;
}
function goNext() {
  // to take next image
  counter--;
  minuscounter();
  slideImage();
  takborder();
}
function goPrev() {
  counter++;
  slideImage();
  takborder();
}

gallery.forEach((image, index) => {
  image.addEventListener("click", () => {
    // image.style.border = "none"; toclick image
  });
});

// gallery

const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(
    ".slider-wrapper .slide-button"
  );
  const sliderScrollbar = document.querySelector(
    ".container .slider-scrollbar"
  );
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition =
      sliderScrollbar.getBoundingClientRect().width -
      scrollbarThumb.offsetWidth;
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;
      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });
  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };
  imageList.addEventListener("scroll", () => {
    updateScrollThumbPosition();
  });
};
function goPrev() {
  counter++;
  if (counter >= gallery.length - 1) {
    counter = 0;
  }
  slideImage();
  takborder();
  changeImageByIndex();
}
function goNext() {
  counter--;
  if (counter <= 0) {
    counter = gallery.length - 2;
  }
  slideImage();
  takborder();
  changeImageByIndex();
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
