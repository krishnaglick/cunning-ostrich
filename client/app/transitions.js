
//import { animate, stop } from "liquid-fire";

export default function() {

  this.transition(
    this.fromRoute('login'),
    this.toRoute('dashboard'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('login'),
    this.toRoute('index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('index'),
    this.toRoute('dashboard'),
    this.use('toDown'),
    this.reverse('toUp')
  );

}
