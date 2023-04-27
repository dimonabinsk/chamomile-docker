export function fixed(state) {


  let lastScrollTop = 0;
  window.onscroll = () => {
    let scrollDistance = window.scrollY;
    if (scrollDistance > lastScrollTop || scrollDistance === 0) {
      state = false;
    } else {
      
      state = true;
    }
    lastScrollTop = scrollDistance;
  };
  return state;
}
