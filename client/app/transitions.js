
//import { animate, stop } from "liquid-fire";

export default function() {

  this.transition(
    this.fromRoute('login'),
    this.toRoute('houses'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

}
